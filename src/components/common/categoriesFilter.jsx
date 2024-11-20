import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { categoriesFilterData } from "../../api/ApiClient";
import Loading from "../elements/loading";

const CategoriesFilter = (props) => {
  const { setFilterCatIds, filterCatIds, subMenu, openSubmenu } = props;
  const [filtersCatData, setFiltersCatData] = useState();
  const [filterCatInput, setFilterCatInput] = useState("");
  const categoriesFilterDataMutation = useMutation(categoriesFilterData, {
    onSuccess: (res) => {
      setFiltersCatData(res?.data?.data);
    },
  });
  useEffect(() => {
    categoriesFilterDataMutation?.mutate({ filterData: filterCatInput });
  }, [filterCatInput]);
  return (
    <div className="bg-white rounded-lg p-3 mt-3 flex flex-col">
      <h6 className="text-sm">دسته بندی&nbsp;:</h6>
      <div className="flex items-center bg-[#EFF1F1] rounded-lg h-10 w-full p-2 mt-3">
        <input
          type="text"
          placeholder="جستجوی دسته بندی"
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
      ) : (
        filtersCatData?.map((filter) => (
          <div
            key={filter?.id}
            className="flex flex-wrap items-center justify-between mt-3"
          >
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                className="w-3 h-3 bg-[#EFF1F1] border-[#8E9191]"
                checked={
                  filterCatIds.findIndex((cId) => cId === filter?.id) === -1
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
                <button className="mr-auto" onClick={() => openSubmenu(filter)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                    className={`ease-in-expo duration-[300ms] ${
                      subMenu?.show && filter?.id == subMenu?.id
                        ? "-rotate-180 transition-all fill-primary"
                        : "transition-all fill-[#222427]"
                    }`}
                  >
                    <path d="M10 14a2.272 2.272 0 01-1.608-.667L2.958 7.9a.629.629 0 010-.884.629.629 0 01.884 0l5.433 5.434c.4.4 1.05.4 1.45 0l5.433-5.434a.629.629 0 01.884 0 .629.629 0 010 .884l-5.434 5.433a2.272 2.272 0 01-1.608.666z"></path>
                  </svg>
                </button>
              )}
            </div>
            <div
              className={`flex w-full flex-col px-1.5 overflow-hidden transition-all duration-500 ease-linear ${
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
                      filterCatIds.findIndex((cId) => cId === child?.id) === -1
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
  );
};

export default CategoriesFilter;
