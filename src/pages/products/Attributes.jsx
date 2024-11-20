import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../public/images/icons/addIcon";
import EditIcon from "../../../public/images/icons/editIcon";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import {
  attributes,
  categoriesFilterData,
  attributesDelete,
} from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Tooltip from "../../components/elements/Tooltip";

const Attributes = () => {
  let maxHeightTable = window?.innerHeight - 281;
  const [attributesData, setAttributesData] = useState([]);
  const [filtersData, setFiltersData] = useState();
  const [filterCatInput, setFilterCatInput] = useState("");
  const [attributesIds, setAttributesIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [subMenu, setSubMenu] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category_ids = searchParams.get("category_ids");
  const [filterCatIds, setFilterCatIds] = useState(
    category_ids?.split(",")?.map(Number) || []
  );
  const attributesMutation = useMutation(attributes, {
    onSuccess: (res) => {
      setAttributesData(res?.data?.data);
    },
  });
  const categoriesFilterDataMutation = useMutation(categoriesFilterData, {
    onSuccess: (res) => {
      setFiltersData(res?.data?.data);
    },
  });
  const attributesDeleteMutation = useMutation(attributesDelete, {
    onSuccess: () => {
      attributesMutation?.mutate({
        filterData,
        category_ids: category_ids?.replaceAll(",", "&category_ids=[]"),
      });
    },
  });
  useEffect(() => {
    categoriesFilterDataMutation?.mutate({ filterData: filterCatInput });
  }, [filterCatInput]);
  useEffect(() => {
    const stringData = filterCatIds?.map((value) => `${value}`).join(",");
    navigate(`/attributes${stringData ? `?category_ids=${stringData}` : ""}`);
  }, [filterCatIds]);
  useEffect(() => {
    attributesMutation?.mutate({
      filterData,
      category_ids: category_ids?.replaceAll(",", "&category_ids[]="),
    });
  }, [category_ids]);

  const selectAll = (e) => {
    if (e?.target?.checked) {
      setAttributesIds([]);
      for (let attribute of attributesData) {
        setAttributesIds((prev) => [...prev, attribute?.id]);
      }
    } else {
      setAttributesIds([]);
    }
  };
  const groupDelete = () => {
    for (let id of attributesIds) {
      attributesDeleteMutation?.mutate({ id });
    }
    setAttributesIds([]);
  };
  const handleEditCategory = (item) => {
    navigate("/categories/edit", { state: item });
  };
  const openSubmenu = (filter) => {
    setSubMenu({
      show: subMenu?.show && subMenu?.id == filter?.id ? false : true,
      id: filter.id,
    });
  };
  return (
    <>
      <div className="w-full px-5 pt-5">
        <div className="w-full flex items-center justify-between">
          <h5 className="font-KalamehMed text-lg font-medium flex items-center text-black gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#222427"
                d="M19.42 11.75H16c-.41 0-.75-.34-.75-.75V4.01c0-.74.29-1.43.81-1.95s1.21-.81 1.95-.81h.01c1.25.01 2.43.5 3.33 1.39.9.91 1.39 2.11 1.39 3.36v2.42c.01 1.99-1.33 3.33-3.32 3.33zm-2.67-1.5h2.67c1.16 0 1.83-.67 1.83-1.83V6c0-.86-.34-1.68-.95-2.3-.61-.6-1.43-.94-2.28-.95h-.01c-.33 0-.65.13-.89.37s-.37.55-.37.89v6.24z"
              ></path>
              <path
                fill="#222427"
                d="M9 23.33c-.47 0-.91-.18-1.24-.52L6.1 21.14a.246.246 0 00-.33-.02L4.05 22.4c-.53.4-1.23.47-1.83.17-.6-.3-.97-.9-.97-1.57V6c0-3.02 1.73-4.75 4.75-4.75h12c.41 0 .75.34.75.75s-.34.75-.75.75c-.69 0-1.25.56-1.25 1.25v17c0 .67-.37 1.27-.97 1.57-.6.3-1.3.24-1.83-.16l-1.71-1.28a.243.243 0 00-.32.02l-1.68 1.68c-.33.32-.77.5-1.24.5zm-3.09-3.76c.46 0 .91.17 1.25.52l1.66 1.67c.06.06.14.07.18.07.04 0 .12-.01.18-.07l1.68-1.68c.62-.62 1.6-.68 2.29-.15l1.7 1.27c.11.08.21.05.26.02.05-.03.14-.09.14-.22V4c0-.45.11-.88.3-1.25H6C3.78 2.75 2.75 3.78 2.75 6v15c0 .14.09.2.14.23.06.03.16.05.26-.03l1.71-1.28c.31-.23.68-.35 1.05-.35z"
              ></path>
              <path
                fill="#222427"
                d="M12 13.76H9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75s-.34.75-.75.75zM12 9.76H9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75s-.34.75-.75.75zM5.97 10.01c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5.97 14.01c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
              ></path>
            </svg>
            ویژگی های محصول:
          </h5>
          <Link
            to={"/attributes/add"}
            className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
          >
            <AddIcon className="fill-white" />
            افزودن ویژگی جدید
          </Link>
        </div>
        <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                attributesIds?.length === attributesData?.length &&
                attributesData?.length !== 0
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
              placeholder="جستجو در ویژگی ها"
              onChange={(e) => setFilterData(e?.target?.value)}
            />
          </div>
          <button
            className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
            onClick={() => {
              attributesMutation?.mutate({
                filterData,
                category_ids: category_ids?.replaceAll(",", "&category_ids[]="),
              });
            }}
          >
            جستجو
          </button>
        </div>
        <div className="flex items-start">
          <div className="flex-1 w-full pl-5">
            <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg">
              <div className="w-full grid grid-cols-6 gap-x-2 items-center h-11 px-5">
                <div className="col-span-1"></div>
                <div className="col-span-1">
                  <p className="font-KalamehMed text-sm font-medium">
                    نام ویژگی
                  </p>
                </div>
                <div className="col-span-1">
                  <p className="font-KalamehMed text-sm font-medium">آیکون</p>
                </div>
                <div className="col-span-1">
                  <p className="font-KalamehMed text-sm font-medium">
                    سردسته مادر
                  </p>
                </div>
                <div className="col-span-1 justify-self-center">
                  <p className="font-KalamehMed text-sm font-medium">
                    تعداد محصول
                  </p>
                </div>
              </div>
            </div>
            {attributesMutation?.isLoading ||
            attributesDeleteMutation?.isLoading ? (
              <div className="w-full flex items-center justify-center mt-5">
                <Loading className="w-14 h-14 text-blacklead animate-pulse" />
              </div>
            ) : attributesData?.length === 0 && filterData ? (
              <div className="w-full flex justify-center mt-5">
                متاسفانه هیچ موردی یافت نشد
              </div>
            ) : (
              <div
                className="overflow-y-scroll hide-scrollbar"
                style={{ maxHeight: maxHeightTable }}
              >
                {attributesData?.map((attribute) => (
                  <div className="w-full bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-3 px-5 mt-4 grid grid-cols-6 gap-x-4 items-center">
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={
                          attributesIds.findIndex(
                            (cId) => cId === attribute?.id
                          ) === -1
                            ? false
                            : true
                        }
                        onChange={() =>
                          setAttributesIds((prev) => {
                            const categoryId = prev.findIndex(
                              (cId) => cId === attribute?.id
                            );

                            if (categoryId === -1) {
                              return [...prev, attribute?.id];
                            } else {
                              return [
                                ...prev.slice(0, categoryId),
                                ...prev.slice(categoryId + 1),
                              ];
                            }
                          })
                        }
                      />
                    </div>

                    <div className="col-span-1">
                      <p className="font-KalamehMed text-sm font-medium">
                        {attribute?.name}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <img
                        src={attribute?.media?.icon?.file}
                        alt="logo pic"
                        className="object-contain max-h-11"
                      />
                    </div>
                    <div className="col-span-1">
                      <p
                        className="font-KalamehMed text-sm font-medium truncate"
                        title={attribute?.categories?.map(
                          (category) => `${category?.name} ، `
                        )}
                      >
                        {attribute?.categories?.map(
                          (category) => `${category?.name} ، `
                        )}
                      </p>
                    </div>
                    <div className="col-span-1 justify-self-center">
                      <p className="font-Kalameh text-sm">
                        {attribute?.products_count} محصول
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
                        to={`/attributes/${attribute?.id}`}
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
                          attributesDeleteMutation?.mutate({
                            id: attribute?.id,
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
                ))}
              </div>
            )}
          </div>
          <div className="w-[20%] sticky top-0 min-w-[225px] bg-[#DBEEF6] rounded-lg p-4 mt-4">
            <h6 className="font-KalamehMed text-sm font-medium flex items-center text-black gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#222427"
                  d="M10.94 22.65c-.48 0-.95-.12-1.39-.36a2.699 2.699 0 01-1.41-2.38v-5.3c0-.5-.33-1.25-.64-1.63L3.76 9.02c-.63-.63-1.11-1.71-1.11-2.52V4.2c0-1.6 1.21-2.85 2.75-2.85h13.2c1.52 0 2.75 1.23 2.75 2.75v2.2c0 1.05-.63 2.24-1.22 2.83l-4.33 3.83c-.42.35-.75 1.12-.75 1.74V19c0 .89-.56 1.92-1.26 2.34l-1.38.89c-.45.28-.96.42-1.47.42zM5.4 2.85c-.7 0-1.25.59-1.25 1.35v2.3c0 .37.3 1.09.68 1.47l3.81 4.01c.51.63 1.01 1.68 1.01 2.62v5.3c0 .65.45.97.64 1.07.42.23.93.23 1.32-.01l1.39-.89c.28-.17.56-.71.56-1.07v-4.3c0-1.07.52-2.25 1.27-2.88l4.28-3.79c.34-.34.75-1.15.75-1.74V4.1c0-.69-.56-1.25-1.25-1.25H5.4z"
                ></path>
                <path
                  fill="#222427"
                  d="M6 10.75a.83.83 0 01-.4-.11.76.76 0 01-.24-1.04l4.93-7.9a.747.747 0 111.27.79l-4.93 7.9c-.14.23-.38.36-.63.36z"
                ></path>
              </svg>
              فیلتر توسط:
            </h6>
            <div className="bg-white rounded-lg p-3 mt-3 flex flex-col">
              <h6 className="text-sm">دسته بندی&nbsp;:</h6>
              <div className="flex items-center bg-[#EFF1F1] rounded-lg h-10 w-full p-2 mt-3">
                <input
                  type="text"
                  placeholder="جستجوی محصول"
                  className="flex-1 w-full focus:outline-none ml-2 bg-transparent placeholder:text-[#C4C7C7] text-sm"
                  onChange={(e) => setFilterCatInput(e?.target?.value)}
                  value={filterCatInput}
                />
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
              </div>
              {categoriesFilterDataMutation?.isLoading ? (
                <div className="w-full flex justify-center">
                  <Loading className="w-14 h-14 text-blacklead animate-pulse" />
                </div>
              ) : filtersData?.length === 0 && filterData ? (
                <div className="w-full flex justify-center mt-5">
                  متاسفانه هیچ ویژگی یافت نشد
                </div>
              ) : (
                filtersData?.map((filter) => (
                  <div
                    key={filter?.id}
                    className="flex flex-wrap items-center justify-between mt-3"
                  >
                    <div className="flex items-center w-full">
                      <input
                        type="checkbox"
                        className="w-3 h-3 bg-[#EFF1F1] border-[#8E9191]"
                        checked={
                          filterCatIds.findIndex(
                            (cId) => cId === filter?.id
                          ) === -1
                            ? false
                            : true
                        }
                        onChange={() =>
                          setFilterCatIds((prev) => {
                            const categoryId = prev.findIndex(
                              (cId) => cId === filter?.id
                            );

                            if (categoryId === -1) {
                              return [...prev, filter?.id];
                            } else {
                              return [
                                ...prev.slice(0, categoryId),
                                ...prev.slice(categoryId + 1),
                              ];
                            }
                          })
                        }
                      />
                      <p className="pr-2">{filter?.name}</p>
                      {filter?.children && filter?.children?.length !== 0 && (
                        <button
                          className="mr-auto"
                          onClick={() => openSubmenu(filter)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 20 20"
                            className={`${
                              subMenu?.show && filter?.id == subMenu?.id
                                ? "-rotate-180 transition-all duration-[300ms] ease-linear fill-primary"
                                : "transition-all duration-[300ms] ease-linear fill-[#222427]"
                            }`}
                          >
                            <path d="M10 14a2.272 2.272 0 01-1.608-.667L2.958 7.9a.629.629 0 010-.884.629.629 0 01.884 0l5.433 5.434c.4.4 1.05.4 1.45 0l5.433-5.434a.629.629 0 01.884 0 .629.629 0 010 .884l-5.434 5.433a2.272 2.272 0 01-1.608.666z"></path>
                          </svg>
                        </button>
                      )}
                    </div>
                    <div
                      className={`flex w-full flex-col px-1.5 overflow-hidden transition-all duration-500 ${
                        subMenu?.show && filter?.id == subMenu?.id
                          ? "max-h-96"
                          : "max-h-0"
                      }`}
                    >
                      {filter?.children?.map((child) => (
                        <div className="flex items-center border-r px-2 pt-0.5">
                          <input
                            type="checkbox"
                            className="w-3 h-3 bg-[#EFF1F1] border-[#8E9191]"
                            checked={
                              filterCatIds.findIndex(
                                (cId) => cId === child?.id
                              ) === -1
                                ? false
                                : true
                            }
                            onChange={() =>
                              setFilterCatIds((prev) => {
                                const categoryId = prev.findIndex(
                                  (cId) => cId === child?.id
                                );

                                if (categoryId === -1) {
                                  return [...prev, child?.id];
                                } else {
                                  return [
                                    ...prev.slice(0, categoryId),
                                    ...prev.slice(categoryId + 1),
                                  ];
                                }
                              })
                            }
                          />
                          <p className="pr-2">{child?.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attributes;
