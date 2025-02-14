import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../public/images/icons/addIcon";
import EditIcon from "../../../public/images/icons/editIcon";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import { guarantees, guaranteesDelete } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "../../components/elements/Tooltip";

const Guarantee = () => {
  let maxHeightTable = window?.innerHeight - 281;
  const [guaranteesData, setGuaranteesData] = useState();
  const [guaranteeIds, setGuaranteeIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const navigate = useNavigate();
  const guaranteesMutation = useMutation(guarantees, {
    onSuccess: (res) => {
      setGuaranteesData(res?.data?.data);
    },
  });
  const guaranteesDeleteMutation = useMutation(guaranteesDelete, {
    onSuccess: () => {
      guaranteesMutation?.mutate({});
    },
  });
  useEffect(() => {
    guaranteesMutation?.mutate({});
  }, []);
  const selectAll = (e) => {
    if (e?.target?.checked) {
      setGuaranteeIds([]);
      for (let guarantee of guaranteesData) {
        setGuaranteeIds((prev) => [...prev, guarantee?.id]);
      }
    } else {
      setGuaranteeIds([]);
    }
  };

  const groupDelete = () => {
    for (let id of guaranteeIds) {
      guaranteesDeleteMutation?.mutate({ id });
    }
    setGuaranteeIds([]);
  };

  return (
    <>
      <div className="w-full px-5 pt-5">
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
                d="M12 15.75c-4.14 0-7.5-3.25-7.5-7.25S7.86 1.25 12 1.25c4.14 0 7.5 3.25 7.5 7.25s-3.36 7.25-7.5 7.25zm0-13c-3.31 0-6 2.58-6 5.75s2.69 5.75 6 5.75 6-2.58 6-5.75-2.69-5.75-6-5.75z"
              ></path>
              <path
                fill="#222427"
                d="M15.62 22.75c-.28 0-.56-.07-.85-.2l-2.69-1.27a.543.543 0 00-.18 0l-2.67 1.26c-.59.28-1.21.27-1.69-.04-.5-.32-.79-.91-.78-1.61l.01-7.38c0-.41.32-.77.75-.75.41 0 .75.34.75.75l-.01 7.38c0 .22.06.33.09.34.02.01.11.02.25-.05l2.68-1.27c.43-.2 1.02-.2 1.45 0l2.69 1.27c.14.07.23.06.25.05.03-.02.09-.13.09-.34v-7.56c0-.41.34-.75.75-.75s.75.34.75.75v7.56c0 .71-.29 1.29-.79 1.61-.26.17-.55.25-.85.25z"
              ></path>
            </svg>
            گارانتی ها
          </h5>
          <Link to={"/guarantees/add"}>
            <button className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium">
              <AddIcon className="fill-white" />
              افزودن گارانتی
            </button>
          </Link>
        </div>
        <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                guaranteesData?.length !== 0 &&
                guaranteesData?.length === guaranteeIds?.length
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
              placeholder="جستجو در گارانتی ها"
              onChange={(e) => setFilterData(e?.target?.value)}
            />
          </div>
          <button
            className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
            onClick={() => {
              guaranteesMutation?.mutate({ filterData });
            }}
          >
            جستجو
          </button>
        </div>
        <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg">
          <div className="w-full grid grid-cols-4 gap-x-2 items-center h-11 px-5">
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <p className="font-KalamehMed text-sm font-medium">نام فارسی</p>
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
          {guaranteesMutation?.isLoading ||
          guaranteesDeleteMutation?.isLoading ? (
            <div className="w-full flex items-center justify-center mt-5">
              <Loading className="w-14 h-14 text-blacklead animate-pulse" />
            </div>
          ) : (
            guaranteesData?.map((guarantee) => (
              <div className="w-full bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-3 px-5 mt-4 grid grid-cols-4 gap-x-4 items-center">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={
                      guaranteeIds.findIndex((cId) => cId === guarantee?.id) ===
                      -1
                        ? false
                        : true
                    }
                    onChange={() =>
                      setGuaranteeIds((prev) => {
                        const colorId = prev.findIndex(
                          (cId) => cId === guarantee?.id
                        );

                        if (colorId === -1) {
                          return [...prev, guarantee?.id];
                        } else {
                          return [
                            ...prev.slice(0, colorId),
                            ...prev.slice(colorId + 1),
                          ];
                        }
                      })
                    }
                  />
                </div>

                <div className="col-span-1">
                  <p className="font-KalamehMed text-sm font-medium">
                    {guarantee?.name}
                  </p>
                </div>

                <div className="col-span-1 justify-self-center">
                  <p className="font-Kalameh text-sm">
                    {guarantee?.products_count} محصول
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
                    to={`/guarantees/${guarantee?.id}`}
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
                      guaranteesDeleteMutation?.mutate({
                        id: guarantee?.id,
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

export default Guarantee;
