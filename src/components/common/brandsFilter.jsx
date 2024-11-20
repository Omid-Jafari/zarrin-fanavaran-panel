import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { brandsFilterData } from "../../api/ApiClient";
import Loading from "../elements/loading";

const BrandsFilter = (props) => {
  const { setFilterBrandIds, filterBrandIds } = props;
  const [filtersBrandData, setFiltersBrandData] = useState();
  const [filterBrandInput, setFilterBrandInput] = useState("");
  const brandsFilterDataMutation = useMutation(brandsFilterData, {
    onSuccess: (res) => {
      setFiltersBrandData(res?.data?.data);
    },
  });
  useEffect(() => {
    brandsFilterDataMutation?.mutate({ filterData: filterBrandInput });
  }, [filterBrandInput]);
  return (
    <div className="bg-white rounded-lg p-3 mt-3 flex flex-col">
      <h6 className="text-sm">برند&nbsp;:</h6>
      <div className="flex items-center bg-[#EFF1F1] rounded-lg h-10 w-full p-2 mt-3">
        <input
          type="text"
          placeholder="جستجوی برند"
          className="flex-1 focus:outline-none ml-2 bg-transparent placeholder:text-[#C4C7C7] text-sm min-w-0"
          onChange={(e) => setFilterBrandInput(e?.target?.value)}
          value={filterBrandInput}
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
      {brandsFilterDataMutation?.isLoading ? (
        <div className="w-full flex justify-center">
          <Loading className="w-14 h-14 text-blacklead animate-pulse" />
        </div>
      ) : (
        filtersBrandData?.map((filter) => (
          <div
            key={filter?.id}
            className="flex flex-wrap items-center justify-between mt-3"
          >
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                className="w-3 h-3 bg-[#EFF1F1] border-[#8E9191]"
                checked={
                  filterBrandIds.findIndex((cId) => cId === filter?.id) === -1
                    ? false
                    : true
                }
                onChange={() =>
                  setFilterBrandIds((prev) => {
                    const brandId = prev.findIndex((cId) => cId === filter?.id);

                    if (brandId === -1) {
                      return [...prev, filter?.id];
                    } else {
                      return [
                        ...prev.slice(0, brandId),
                        ...prev.slice(brandId + 1),
                      ];
                    }
                  })
                }
              />
              <p className="pr-2">{filter?.name_fa}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BrandsFilter;
