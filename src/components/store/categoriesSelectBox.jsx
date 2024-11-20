import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useOnClickOutside } from "../../utils/OutSideClick";
import SelectCategory from "../category/SelectCategory";

const CategoriesSelectBox = (props) => {
  const { formik } = props;
  const [filterCategoryInput, setFilterCategoryInput] = useState("");
  const [catSub, setCatSub] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setCatSub(false));

  return (
    <div className="h-11 relative w-full" ref={ref}>
      <div
        className={`absolute top-0 left-0 w-full border-2 bg-blue-lightt rounded-lg text-black p-2 flex flex-col transition-all duration-500 overflow-hidden z-40 ${
          catSub ? "max-h-96 border-blacklead" : "max-h-11 border-transparent"
        }`}
      >
        <div
          onClick={() => setCatSub(!catSub)}
          className={`h-11 flex items-center justify-between cursor-pointer`}
        >
          {formik.values.all_categories === 1
            ? "همه دسته بندی ها"
            : "دسته بندی های انتخابی"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`transition-all z-20 duration-500 ease-in-expo fill-black ${
              catSub ? "-rotate-180" : "rotate-0"
            }`}
          >
            <path d="M17.92 8.18H6.08c-.96 0-1.44 1.16-.76 1.84l5.18 5.18c.83.83 2.18.83 3.01 0l1.97-1.97 3.21-3.21c.67-.68.19-1.84-.77-1.84z"></path>
          </svg>
        </div>
        <div
          className={`flex flex-col items-start justify-start w-full transition-all duration-500 overflow-hidden font-normal font-Kalameh text-sm ${
            catSub ? "max-h-96" : "max-h-0"
          }`}
        >
          {formik.values.all_categories === 0 ? (
            <>
              <div
                onClick={() => {
                  formik.setFieldValue("all_categories", 1);
                  setCatSub(false);
                }}
                className="w-full border-t-[1px] h-11 flex items-center border-[#C4C7C7] p-2 cursor-pointer"
              >
                همه دسته بندی ها
              </div>
              <div className="flex-1 flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-full">
                <input
                  type="text"
                  value={filterCategoryInput}
                  className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none py-2"
                  placeholder="جستجو در دسته بندی ها"
                  onChange={(e) => setFilterCategoryInput(e?.target?.value)}
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
              <div className="flex flex-col items-start gap-2 mt-2 w-full">
                <SelectCategory
                  formik={formik}
                  searchCategory={filterCategoryInput}
                  ids={formik.values.category_ids}
                />
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  formik.setFieldValue("all_categories", 1);
                  setCatSub(false);
                }}
                className="w-full border-t-[1px] h-11 flex items-center border-[#C4C7C7] p-2 cursor-pointer"
              >
                همه دسته بندی ها
              </div>

              <div
                onClick={() => {
                  formik.setFieldValue("all_categories", 0);
                }}
                className="w-full border-t-[1px] h-11 flex items-center border-[#C4C7C7] p-2 cursor-pointer"
              >
                دسته بندی های انتخابی
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSelectBox;
