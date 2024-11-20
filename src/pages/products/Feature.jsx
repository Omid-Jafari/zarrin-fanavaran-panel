import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../public/images/icons/addIcon";
import EditIcon from "../../../public/images/icons/editIcon";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import { feature, featureDelete } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "../../components/elements/Tooltip";

const Feature = () => {
  let maxHeightTable = window?.innerHeight - 281;
  const [featuresData, setFeaturesData] = useState();
  const [featureIds, setFeatureIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const featuresMutation = useMutation(feature, {
    onSuccess: (res) => {
      setFeaturesData(res?.data?.data);
    },
  });
  const featuresDeleteMutation = useMutation(featureDelete, {
    onSuccess: () => {
      featuresMutation?.mutate({ filterData });
    },
  });
  useEffect(() => {
    featuresMutation?.mutate({ filterData });
  }, []);
  const selectAll = (e) => {
    if (e?.target?.checked) {
      setFeatureIds([]);
      for (let feature of featuresData) {
        setFeatureIds((prev) => [...prev, feature?.id]);
      }
    } else {
      setFeatureIds([]);
    }
  };

  const groupDelete = () => {
    for (let id of featureIds) {
      featuresDeleteMutation?.mutate({ id });
    }
    setFeatureIds([]);
  };

  return (
    <>
      <div className="w-full pt-5 px-5">
        <div className="w-full flex items-center justify-between">
          <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#222427"
                d="M15.33 22.75c-.42 0-.85-.15-1.18-.45l-2-1.83c-.08-.07-.24-.07-.33 0L9.83 22.3c-.66.61-1.69.6-2.35 0l-2-1.83c-.08-.07-.24-.07-.33 0l-.99.91c-.91.83-1.63.7-1.98.54-.35-.16-.94-.6-.94-1.85v-7.89c0-6.03 4.82-10.93 10.75-10.93s10.75 4.9 10.75 10.93v7.89c0 1.25-.59 1.7-.94 1.85-.35.15-1.07.29-1.98-.54l-1-.91c-.08-.07-.24-.07-.32 0l-2 1.83c-.32.3-.74.45-1.17.45zM12 18.91c.42 0 .85.15 1.17.45l2 1.83c.08.07.24.07.32 0l2-1.83c.66-.6 1.69-.6 2.35 0l1 .91c.17.15.28.22.35.24.03-.07.06-.21.06-.45v-7.89c0-5.2-4.15-9.43-9.25-9.43s-9.25 4.23-9.25 9.43v7.89c0 .24.04.38.06.45.07-.03.19-.09.35-.24l1-.91c.66-.6 1.69-.6 2.35 0l2 1.83c.08.07.24.07.32 0l2-1.83c.32-.3.75-.45 1.17-.45z"
              ></path>
              <path
                fill="#222427"
                d="M12 16.07c-1.57 0-3.14-.49-4.45-1.47a.75.75 0 01.9-1.2 5.94 5.94 0 007.1 0 .75.75 0 01.9 1.2A7.423 7.423 0 0112 16.07zM12 11.75c-1.52 0-2.75-1.23-2.75-2.75S10.48 6.25 12 6.25 14.75 7.48 14.75 9s-1.23 2.75-2.75 2.75zm0-4a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
              ></path>
            </svg>
            ویژگی های عمومی
          </h5>
          <Link to={"/feature/add"}>
            <button className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium">
              <AddIcon className="fill-white" />
              افزودن ویژگی
            </button>
          </Link>
        </div>
        <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                featuresData?.length !== 0 &&
                featuresData?.length === featureIds?.length
              }
              onChange={(e) => selectAll(e)}
            />
            <span className="font-KalamehMed font-medium">انتخاب همه</span>
          </div>
          <button
            className="font-KalamehMed font-medium text-sm h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 text-[#CA3636] rounded-[4px] flex items-center gap-1"
            onClick={() => groupDelete()}
          >
            <DeleteIcon className="fill-[#CA3636]" />
            حذف
          </button>
          <div className="flex-1 flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#222427"
                d="M11.5 21.75c-5.65 0-10.25-4.6-10.25-10.25S5.85 1.25 11.5 1.25s10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25zm0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75zM22 22.75c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
              ></path>
            </svg>
            <input
              type="text"
              className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none"
              placeholder="جستجو در ویژگی های عمومی"
              onChange={(e) => setFilterData(e?.target?.value)}
            />
          </div>
          <button
            className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
            onClick={() => {
              featuresMutation?.mutate({ filterData });
            }}
          >
            جستجو
          </button>
        </div>
        <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg">
          <div className="w-full grid grid-cols-5 gap-x-2 items-center h-11 px-5">
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <p className="font-KalamehMed text-sm font-medium">آیکون</p>
            </div>
            <div className="col-span-1">
              <p className="font-KalamehMed text-sm font-medium">نام</p>
            </div>
            <div className="col-span-1 justify-self-center">
              <p className="font-KalamehMed text-sm font-medium">
                تعداد محصولات
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-full overflow-y-scroll hide-scrollbar"
          style={{ maxHeight: maxHeightTable }}
        >
          {featuresMutation?.isLoading || featuresDeleteMutation?.isLoading ? (
            <div className="w-full flex items-center justify-center mt-5">
              <Loading className="w-14 h-14 text-blacklead animate-pulse" />
            </div>
          ) : (
            featuresData?.map((feature) => (
              <div className="w-full bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-3 px-5 mt-4 grid grid-cols-5 gap-x-4 items-center">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={
                      featureIds.findIndex((cId) => cId === feature?.id) === -1
                        ? false
                        : true
                    }
                    onChange={() =>
                      setFeatureIds((prev) => {
                        const featureId = prev.findIndex(
                          (cId) => cId === feature?.id
                        );

                        if (featureId === -1) {
                          return [...prev, feature?.id];
                        } else {
                          return [
                            ...prev.slice(0, featureId),
                            ...prev.slice(featureId + 1),
                          ];
                        }
                      })
                    }
                  />
                </div>
                <div className="col-span-1">
                  <img
                    src={feature?.media?.icon?.file}
                    alt="item pic"
                    className="object-contain max-h-11"
                  />
                </div>

                <div className="col-span-1">
                  <p className="font-KalamehMed text-sm font-medium">
                    {feature?.name}
                  </p>
                </div>

                <div className="col-span-1 justify-self-center">
                  <p className="font-Kalameh text-sm">
                    {feature?.products_count} محصول
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-end gap-5 ">
                  <Tooltip
                    svgIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="fill-[#003E43] hover:fill-[#4FB3BF] transition-colors duration-500"
                      >
                        <path d="M12 16.33c-2.39 0-4.33-1.94-4.33-4.33S9.61 7.67 12 7.67s4.33 1.94 4.33 4.33-1.94 4.33-4.33 4.33zm0-7.16c-1.56 0-2.83 1.27-2.83 2.83s1.27 2.83 2.83 2.83 2.83-1.27 2.83-2.83S13.56 9.17 12 9.17z"></path>
                        <path d="M12 21.02c-3.76 0-7.31-2.2-9.75-6.02-1.06-1.65-1.06-4.34 0-6 2.45-3.82 6-6.02 9.75-6.02s7.3 2.2 9.74 6.02c1.06 1.65 1.06 4.34 0 6-2.44 3.82-5.99 6.02-9.74 6.02zm0-16.54c-3.23 0-6.32 1.94-8.48 5.33-.75 1.17-.75 3.21 0 4.38 2.16 3.39 5.25 5.33 8.48 5.33 3.23 0 6.32-1.94 8.48-5.33.75-1.17.75-3.21 0-4.38-2.16-3.39-5.25-5.33-8.48-5.33z"></path>
                      </svg>
                    }
                    title="مشاهده"
                  />

                  <Link
                    to={`/feature/${feature?.id}`}
                    className="focus:outline-none"
                  >
                    <Tooltip
                      svgIcon={
                        <EditIcon className="fill-[#003E43] hover:fill-[#4FB3BF] transition-colors duration-500" />
                      }
                      title="ویرایش"
                    />
                  </Link>
                  <button
                    onClick={() =>
                      featuresDeleteMutation?.mutate({
                        id: feature?.id,
                      })
                    }
                    className="focus:outline-none"
                  >
                    <Tooltip
                      svgIcon={
                        <DeleteIcon className="fill-[#CA3636] hover:fill-[#7D3C45] transition-colors duration-500" />
                      }
                      title="حذف"
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Feature;
