import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../public/images/icons/addIcon";
import EditIcon from "../../../public/images/icons/editIcon";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import { colors, colorsDelete } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "../../components/elements/Tooltip";

const Colors = () => {
  let maxHeightTable = window?.innerHeight - 281;
  const [colorsData, setColorsData] = useState();
  const [colorIds, setColorIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const navigate = useNavigate();
  const colorsMutation = useMutation(colors, {
    onSuccess: (res) => {
      setColorsData(res?.data?.data);
    },
  });
  const colorsDeleteMutation = useMutation(colorsDelete, {
    onSuccess: () => {
      colorsMutation?.mutate({ filterData });
    },
  });
  useEffect(() => {
    colorsMutation?.mutate({ filterData });
  }, []);
  const selectAll = (e) => {
    if (e?.target?.checked) {
      setColorIds([]);
      for (let color of colorsData) {
        setColorIds((prev) => [...prev, color?.id]);
      }
    } else {
      setColorIds([]);
    }
  };

  const groupDelete = () => {
    for (let id of colorIds) {
      colorsDeleteMutation?.mutate({ id });
    }
    setColorIds([]);
  };

  const handleEditColor = (item) => {
    navigate("/brand/edit", { state: item });
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
                d="M9.6 18.75c-2.4 0-4.35-1.95-4.35-4.35 0-1.96 1.32-3.69 3.21-4.2.37-.1.75.09.89.45.33.83 1.04 1.47 1.9 1.7.47.13 1.03.13 1.5 0 .37-.1.76.09.9.44a4.37 4.37 0 01-1.15 4.84c-.79.72-1.82 1.12-2.9 1.12zm-1.31-6.88a2.85 2.85 0 00-1.54 2.53c0 1.57 1.28 2.85 2.85 2.85.7 0 1.38-.26 1.9-.73a2.822 2.822 0 00.91-2.59c-.53.05-1.07 0-1.56-.14a4.356 4.356 0 01-2.56-1.92z"
              ></path>
              <path
                fill="#222427"
                d="M12 13.95c-.4 0-.79-.05-1.15-.15a4.373 4.373 0 01-2.89-2.59c-.2-.51-.3-1.05-.3-1.6 0-2.4 1.95-4.35 4.35-4.35 2.4 0 4.35 1.95 4.35 4.35 0 .55-.1 1.09-.3 1.6A4.341 4.341 0 0112 13.95zm0-7.2a2.855 2.855 0 00-2.65 3.9c.33.83 1.04 1.47 1.9 1.7.47.13 1.03.13 1.5 0 .87-.24 1.58-.87 1.9-1.7A2.855 2.855 0 0012 6.75z"
              ></path>
              <path
                fill="#222427"
                d="M14.4 18.75c-1.08 0-2.11-.4-2.9-1.12a.75.75 0 010-1.12 2.82 2.82 0 00.75-3.16.762.762 0 01.5-1 2.88 2.88 0 001.9-1.7.75.75 0 01.89-.45c1.89.51 3.21 2.24 3.21 4.2 0 2.4-1.95 4.35-4.35 4.35zm-1.28-1.8a2.855 2.855 0 004.13-2.55c0-1.08-.61-2.05-1.54-2.53-.44.72-1.09 1.3-1.85 1.66a4.318 4.318 0 01-.74 3.42z"
              ></path>
              <path
                fill="#222427"
                d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9z"
              ></path>
            </svg>
            رنگ ها
          </h5>
          <Link to={"/colors/add"}>
            <button className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium">
              <AddIcon className="fill-white" />
              افزودن رنگ جدید
            </button>
          </Link>
        </div>
        <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                colorsData?.length !== 0 &&
                colorsData?.length === colorIds?.length
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
              placeholder="جستجو در رنگ ها"
              onChange={(e) => setFilterData(e?.target?.value)}
            />
          </div>
          <button
            className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
            onClick={() => {
              colorsMutation?.mutate({ filterData });
            }}
          >
            جستجو
          </button>
        </div>
        <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg">
          <div className="w-full grid grid-cols-6 gap-x-2 items-center h-11 px-5">
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <p className="font-KalamehMed text-sm font-medium">ایکون</p>
            </div>
            <div className="col-span-1">
              <p className="font-KalamehMed text-sm font-medium">نام فارسی</p>
            </div>
            <div className="col-span-1">
              <p className="font-KalamehMed text-sm font-medium">نام انگلیسی</p>
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
          {colorsMutation?.isLoading || colorsDeleteMutation?.isLoading ? (
            <div className="w-full flex items-center justify-center mt-5">
              <Loading className="w-14 h-14 text-blacklead animate-pulse" />
            </div>
          ) : (
            colorsData?.map((color) => (
              <div className="w-full bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-3 px-5 mt-4 grid grid-cols-6 gap-x-4 items-center">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={
                      colorIds.findIndex((cId) => cId === color?.id) === -1
                        ? false
                        : true
                    }
                    onChange={() =>
                      setColorIds((prev) => {
                        const colorId = prev.findIndex(
                          (cId) => cId === color?.id
                        );

                        if (colorId === -1) {
                          return [...prev, color?.id];
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
                  <img
                    src={color?.media?.icon?.file}
                    alt="item pic"
                    className="object-contain max-h-11"
                  />
                </div>

                <div className="col-span-1">
                  <p className="font-KalamehMed text-sm font-medium">
                    {color?.name_fa}
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-KalamehMed text-sm font-medium">
                    {color?.name_en}
                  </p>
                </div>

                <div className="col-span-1 justify-self-center">
                  <p className="font-Kalameh text-sm">
                    {color?.products_count} محصول
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
                    to={`/colors/${color?.id}`}
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
                      colorsDeleteMutation?.mutate({
                        id: color?.id,
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

export default Colors;
