import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { allCategory } from "../../api/ApiClient";
import CategoryElement from "./category-element";

function CategoryBelectBox({ formik }) {
  const [openSelectOption, setopenSelectOption] = useState(false);
  const [category, setcategory] = useState([]);
  const [selectedCategory, setSelectedCategoty] = useState(
    formik.values?.parent_id
  );
  const allCategoryquery = useQuery(
    ["allCategoryquery"],
    async () => allCategory(),
    {
      onSuccess: (res) => {
        setcategory(res.data?.data);
      },
    }
  );
  useEffect(() => {
    formik.values.parent_id = selectedCategory?.id;
  }, [selectedCategory]);

  return (
    <div
      className={`w-full bg-white rounded-lg p-4 flex flex-col font-Kalameh
      text-black placeholder:text-[#C4C7C7] transition-all ease-linear duration-200 absolute z-40 cursor-pointer
     ${openSelectOption ? " h-80  border-primary border-2" : "h-[55px]"} `}
      onClick={(e) => setopenSelectOption(!openSelectOption)}
    >
      {" "}
      <div className="w-full flex flex-row justify-between">
        <p
          className={`${
            openSelectOption ? "font-bold cursor-text text-[#003E43]" : ""
          }`}
        >
          {" "}
          {selectedCategory?.name}
        </p>{" "}
        <svg
          width="24"
          height="25"
          className={` ${
            openSelectOption ? "rotate-180" : "rotate-0"
          } transition-all ease-linear duration-200`}
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.9202 8.67969H11.6902H6.08024C5.12024 8.67969 4.64024 9.83969 5.32024 10.5197L10.5002 15.6997C11.3302 16.5297 12.6802 16.5297 13.5102 15.6997L15.4802 13.7297L18.6902 10.5197C19.3602 9.83969 18.8802 8.67969 17.9202 8.67969Z"
            fill="#222427"
          />
        </svg>
      </div>
      <div
        className={`mt-3  flex-col text-[#222427] font-Kalameh  overflow-y-scroll  ${
          openSelectOption ? "flex" : "hidden"
        }`}
      >
        <p
          onClick={(e) => setSelectedCategoty({ name: "دسته مادر", id: "0" })}
          className="font-bold text-[#003E43] cursor-pointer"
        >
          دسته مادر
        </p>
        {category.map((item) => (
          <div className="border-r-2 border-primary px-3">
            <CategoryElement
              setCategoryTitle={setSelectedCategoty}
              item={item}
            />
          </div>
        ))}
      </div>
      {/* <div className="w-full h-64 bg-white absolute top-14 left-1 border-primary border-2  rounded-lg p-4">
        dslvkdslkvklds
      </div> */}
    </div>
  );
}

export default CategoryBelectBox;
