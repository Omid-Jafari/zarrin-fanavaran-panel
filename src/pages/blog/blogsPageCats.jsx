import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "../../../public/images/icons/addIcon";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import { blogsCats, blogsCatsDelete } from "../../api/ApiClient";
import BlogCatsTable from "../../components/blog/BlogCatsTable";

const BlogsPageCats = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [blogIds, setBlogIds] = useState([]);

  const blogsCatsMutation = useMutation(blogsCats, {
    onSuccess: (res) => {
      setBlogsData(res?.data?.data);
    },
  });
  const blogsDeleteMutation = useMutation(blogsCatsDelete, {
    onSuccess: () => {
      blogsMutateFunc();
    },
  });
  const blogsMutateFunc = () => {
    blogsCatsMutation?.mutate({});
  };
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

  useEffect(() => {
    blogsMutateFunc();
  }, []);

  return (
    <div className="p-5 w-full flex flex-col gap-5">
      <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18.75H9C6.58 18.75 5.25 17.42 5.25 15V9C5.25 6.58 6.58 5.25 9 5.25H13C15.42 5.25 16.75 6.58 16.75 9V10C16.75 10.14 16.86 10.25 17 10.25C17.96 10.25 18.75 11.04 18.75 12V15C18.75 17.42 17.42 18.75 15 18.75ZM9 6.75C7.42 6.75 6.75 7.42 6.75 9V15C6.75 16.58 7.42 17.25 9 17.25H15C16.58 17.25 17.25 16.58 17.25 15V12C17.25 11.86 17.14 11.75 17 11.75C16.04 11.75 15.25 10.96 15.25 10V9C15.25 7.42 14.58 6.75 13 6.75H9Z"
            fill="#222427"
          />
          <path
            d="M12 10.75H10C9.59 10.75 9.25 10.41 9.25 10C9.25 9.59 9.59 9.25 10 9.25H12C12.41 9.25 12.75 9.59 12.75 10C12.75 10.41 12.41 10.75 12 10.75Z"
            fill="#222427"
          />
          <path
            d="M14 14.75H10C9.59 14.75 9.25 14.41 9.25 14C9.25 13.59 9.59 13.25 10 13.25H14C14.41 13.25 14.75 13.59 14.75 14C14.75 14.41 14.41 14.75 14 14.75Z"
            fill="#222427"
          />
          <path
            d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
            fill="#222427"
          />
        </svg>
        دسته بندی
      </h5>
      <div className="w-full flex items-center gap-3 rounded-lg bg-blue-lightt px-3 py-4">
        <Link
          to="/blog/page"
          className={`w-[10%] rounded h-11 flex items-center justify-center text-sm transition-all duration-500 bg-white hover:bg-[#478F95] hover:text-white hover:shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52]`}
        >
          صفحات
        </Link>
        <Link
          to="/blog/page/cats"
          className={`w-[10%] rounded h-11 flex items-center justify-center text-sm transition-all duration-500 shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52] bg-[#478F95] text-white`}
        >
          دسته بندی ها
        </Link>
        <Link
          to="/blog/page/cats/add"
          className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium mr-auto"
        >
          <AddIcon className="fill-white" />
          افزودن دسته جدید
        </Link>
      </div>
      <div className="w-full rounded-lg bg-blue-lightt flex items-center justify-between px-4 py-3 gap-4">
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
      </div>
      <BlogCatsTable
        setBlogIds={setBlogIds}
        blogIds={blogIds}
        blogsCatsMutation={blogsCatsMutation}
        blogsDeleteMutation={blogsDeleteMutation}
        blogsData={blogsData}
        setBlogsData={setBlogsData}
      />
    </div>
  );
};

export default BlogsPageCats;
