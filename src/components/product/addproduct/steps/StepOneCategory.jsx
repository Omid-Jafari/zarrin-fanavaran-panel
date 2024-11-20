import React, { useContext, useEffect, useState } from "react";
import AddProductContext from "../../../../context/product/AddProductContext";
import BrandSelectBox from "../../../category/brand-select-box";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddProductCategorySelectBox from "../../../category/add-product-category-select-box";
import SelectCategory from "../../../category/SelectCategory";

function StepOneCategory() {
  const { step,productData, dispatch } = useContext(AddProductContext);
  const [searchCategory, setsearchCategory] = useState("")
  
  const handleNextStep = () => {
    dispatch({
      type: "STEP",
      step: step + 1,
    });
  };
const handleAddData=(data)=>{
  dispatch({
    type: "ADD",
    productData:data,
  });
  handleNextStep()
}

  const formik=useFormik({
    initialValues:{
      category_ids: [],
    },
    validationSchema:Yup.object({
      category_ids:Yup.array().of(Yup.string())
      .min(1,"لطفا  دسنه بندی  را انتخاب کنید کنید"),
    }),
    onSubmit:(data)=>{
      handleAddData(data)
      console.log("dvsdbvsdb",data);
       
    },
    validate:rr=>{
      console.log("Dvdsvvsv",rr);
    }
  })

  useEffect(() => {
    formik.values.category_ids=productData?.category_ids?productData?.categories:[]
    
  }, [productData])
  console.log("productData",formik.values.category_ids);

  const handleSearchCategory=(s)=>{
    setsearchCategory(s)
  }

  return (
    <div className="flex flex-col justify-between items-center  w-full h-full">
      <div className="w-full h-full flex flex-col justify-between ">
        <div className=" w-full flex flex-col">
          <p className="text-[14px] text-black font-Kalameh">
            انتخاب دسته بندی:
          </p>
          <p className="text-[14px] text-[#5C5F5F]  font-Kalameh">
            ( محصول شما در کدام دسته قرار می‌گیرد؟ )
          </p>
          <div className="flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-full mt-4 mr-auto">
            <input
              type="text"
              // disabled={true}
              className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none"
              placeholder="جستجو در دسته‌بندی‌ها"
              onChange={(e) => handleSearchCategory(e?.target?.value)}
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
        </div>

        <div className="bg-white w-full h-full items-start flex mt-5 mb-4 rounded-lg p-4 flex-col gap-2">
        <div className="w-5/6 relative">
                {/* <AddProductCategorySelectBox formik={formik}  searchCategory={searchCategory} /> */}
                <SelectCategory formik={formik}  searchCategory={searchCategory} ids={productData.category_ids}/>
              </div>
              {formik.errors.category_ids && formik.touched.category_ids && (
                <small className="text-red-700">
                  {formik.errors.category_ids}
                </small>
              )}
        </div>
      </div>

      {/* buttons */}
      <div className="w-full flex items-center justify-end">
        <button
        type="button"
          className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
          onClick={() => formik.handleSubmit()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
              fill="white"
            />
            <path
              d="M13.26 16.2802C13.07 16.2802 12.88 16.2102 12.73 16.0602L9.20001 12.5302C8.91001 12.2402 8.91001 11.7602 9.20001 11.4702L12.73 7.94016C13.02 7.65016 13.5 7.65016 13.79 7.94016C14.08 8.23016 14.08 8.71016 13.79 9.00016L10.79 12.0002L13.79 15.0002C14.08 15.2902 14.08 15.7702 13.79 16.0602C13.65 16.2102 13.46 16.2802 13.26 16.2802Z"
              fill="white"
            />
          </svg>
          مرحله بعد
        </button>
      </div>
    </div>
  );
}

export default StepOneCategory;
