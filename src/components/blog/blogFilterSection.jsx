import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { blogsStatusOptions } from "../../constant/blogsStatusOptions";
import { useCategoryOptions } from "../../utils/hooks/useCategoryOptions";
import PrimaryCategoryBox from "../common/primaryCategoryBox";
import PrimarySelectBox from "../common/primarySelectBox";

const BlogFilterSection = (props) => {
  const { status, category_id, searchParams, setSearchParams } = props;
  const { categoryLoading, categoryOptions } = useCategoryOptions();
  const selectStatus = (item) => {
    searchParams.delete("status");
    if (item) {
      setSearchParams(
        `${searchParams}&${new URLSearchParams({
          status: item,
        })}`
      );
    } else {
      setSearchParams(`${searchParams}`);
    }
  };
  const selectCategory = (item) => {
    searchParams.delete("category_id");
    if (item) {
      setSearchParams(
        `${searchParams}&${new URLSearchParams({
          category_id: item,
        })}`
      );
    } else {
      setSearchParams(`${searchParams}`);
    }
  };

  return (
    <div className="w-full flex items-center justify-between gap-3 rounded-lg bg-blue-lightt px-3 py-4">
      <div className="flex items-center gap-2 h-11 bg-white rounded-lg pr-2 text-primary w-[47%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="#00838F"
            d="M19 8.75c-2.07 0-3.75-1.68-3.75-3.75 0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75zm0-6c-1.24 0-2.25 1.01-2.25 2.25S17.76 7.25 19 7.25 21.25 6.24 21.25 5 20.24 2.75 19 2.75zM12 13.75H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75zM16 17.75H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9c.41 0 .75.34.75.75s-.34.75-.75.75z"
          ></path>
          <path
            fill="#00838F"
            d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h5c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75z"
          ></path>
        </svg>
        بر اساس وضعیت:
        <PrimarySelectBox
          status={status}
          getValue={selectStatus}
          options={blogsStatusOptions}
          className="flex-1"
          height="44px"
          nullable
        />
      </div>
      <div className="flex items-center gap-2 h-11 bg-white rounded-lg pr-2 text-primary w-[47%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="#00838F"
            d="M19 8.75c-2.07 0-3.75-1.68-3.75-3.75 0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75zm0-6c-1.24 0-2.25 1.01-2.25 2.25S17.76 7.25 19 7.25 21.25 6.24 21.25 5 20.24 2.75 19 2.75zM12 13.75H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75zM16 17.75H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9c.41 0 .75.34.75.75s-.34.75-.75.75z"
          ></path>
          <path
            fill="#00838F"
            d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h5c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75z"
          ></path>
        </svg>
        بر اساس دسته:
        <PrimarySelectBox
          status={category_id}
          getValue={selectCategory}
          options={categoryOptions}
          loading={categoryLoading}
          className="flex-1"
          height="44px"
          nullable
        />
      </div>
    </div>
  );
};

export default BlogFilterSection;
