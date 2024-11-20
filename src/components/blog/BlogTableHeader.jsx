import React, { useState } from "react";
import DeleteIcon from "../../../public/images/icons/deleteIcon";

const BlogTableHeader = (props) => {
  const {
    search,
    blogsData,
    blogIds,
    setBlogIds,
    blogsDeleteMutation,
    searchParams,
    setSearchParams,
  } = props;

  const [filterData, setFilterData] = useState(search || "");

  const selectAll = (e) => {
    if (e?.target?.checked) {
      setBlogIds([]);
      for (let blog of blogsData) {
        setBlogIds((prev) => [...prev, blog?.id]);
      }
    } else {
      setBlogIds([]);
    }
  };
  const groupDelete = () => {
    for (let id of blogIds) {
      blogsDeleteMutation?.mutate({ id });
    }
    setBlogIds([]);
  };
  const selectSearch = () => {
    searchParams.delete("search");
    setSearchParams(
      `${searchParams}&${new URLSearchParams({
        search: filterData,
      })}`
    );
  };
  return (
    <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={
            blogsData?.length !== 0 && blogsData?.length === blogIds?.length
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
          placeholder="جستجو در صفحات"
          value={filterData}
          onChange={(e) => setFilterData(e?.target?.value)}
        />
      </div>
      <button
        className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
        onClick={selectSearch}
      >
        جستجو
      </button>
    </div>
  );
};

export default BlogTableHeader;
