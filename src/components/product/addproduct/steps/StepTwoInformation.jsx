import React, { useContext, useEffect, useState } from "react";
import AddProductContext from "../../../../context/product/AddProductContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import slugPersian from "../../../../utils/slugPersian";
import AddBrandModal from "../AddBrandModal";

function StepTwoInformation() {
  const { step, productData, dispatch } = useContext(AddProductContext);
  const [open, setOpen] = useState(false);
  const [brand, setbrand] = useState("");

  const handleNextStep = () => {
    dispatch({
      type: "STEP",
      step: step + 1,
    });
  };
  const handlepreviosStep = () => {
    dispatch({
      type: "STEP",
      step: step - 1,
    });
  };

  const formik = useFormik({
    initialValues: {
      name_fa: "",
      name_en: "",
      slug: "",
      brand_id: "",
      summary: "",
    },
    validationSchema: Yup.object({
      name_fa: Yup.string().required("لطفا نام محصول را وارد کنید"),
      name_en: Yup.string().required("لطفا نام محصول را وارد کنید"),
      brand_id: Yup.object().required("لطفا برند را وارد کنید"),
      summary: Yup.string().required("لطفا توضیحات را وارد کنید"),
    }),

    onSubmit: (data) => {
      console.log("vsdvsdvdsvdsv",data.name_fa);
      formik.values.slug = slugPersian(data.name_fa);
      handleAddData(data)
    },
    validate:rr=>{
      console.log("Dvdsvvsv",rr);
    }
  });

  const handleAddData=(data)=>{
 
    dispatch({
      type: "ADD",
      productData: data,
    });
    handleNextStep()
  }
console.log("vsdvsdvsdv",productData);
  useEffect(() => {
    
    formik.setValues({
      name_fa:productData?.name_fa!=undefined ?productData?.name_fa:'',
      name_en:productData?.name_en!=undefined ?productData?.name_en:'',
      slug:productData?.name_fa!=undefined ?productData?.name_fa:'',
      brand_id:productData?.brand_id!=undefined ?productData?.brand_id:'',
      summary:productData?.summary!=undefined ?productData?.summary:'',
    });

    // formik.values.name_fa=productData?.data?.name_fa!=undefined&&productData?.data?.name_fa
    // formik.values.name_en=productData?.data?.name_en
    // formik.values.slug=productData?.data?.slug
    // formik.values.brand_id=productData?.data?.brand_id
    // formik.values.summary=productData?.data?.summary
    
    }, [ productData])

    useEffect(() => {
     
    }, [])
    
  return (
    <div className="flex flex-col justify-between items-center  w-full h-full">
      <AddBrandModal
        open={open}
        setOpen={setOpen}
        formik={formik}
      />
      <div className="w-full h-full items-start flex mt-5 mb-4 rounded-lg  flex-col gap-2">
        <div className="w-full z-10 flex flex-row justify-center items-center gap-[18px]">
          <div className="w-1/6 bg-white text-sm rounded-lg p-2 h-full flex justify-center items-center font-bold text-[#003E43]">
            نام محصول فارسی:*
          </div>
          <input
            className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
            placeholder="برای مثال: گوشی موبایل سامسونگ مدل گلگسی اس 22"
            name="name_fa"
            onChange={formik.handleChange}
            value={formik.values.name_fa}
          />
        </div>
        {formik.errors.name_fa && formik.touched.name_fa && (
          <small className="text-red-700">{formik.errors.name_fa}</small>
        )}
        <div className="w-full  z-10  flex my-3  flex-row justify-center items-center gap-[18px]">
          <div className="w-1/6 bg-white  text-sm rounded-lg p-2 h-full flex justify-center items-center  font-bold text-[#003E43]">
            نام محصول انگلیسی:*
          </div>
          <input
            className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
            placeholder="برای مثال: Samsung Galaxy S22 Ultra 5G"
            name="name_en"
            onChange={formik.handleChange}
            value={formik.values.name_en}
          />
        </div>
        {formik.errors.name_en && formik.touched.name_en && (
          <small className="text-red-700">{formik.errors.name_en}</small>
        )}
        <div className="w-full  flex flex-row justify-center items-center gap-[18px]">
          <div className="w-1/6 bg-white text-sm rounded-lg p-2 h-full flex justify-center items-center  font-bold  text-[#003E43]">
            پیوند دسته:*
          </div>
          <input
            className="w-5/6 bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
            name="slug"
            placeholder="For example: Mobile"
            onChange={formik.handleChange}
            value={slugPersian(formik.values.name_fa)}
          />
        </div>
        {formik.errors.slug && formik.touched.slug && (
          <small className="text-red-700">{formik.errors.slug}</small>
        )}
        <div className="w-full flex flex-row justify-center my-3 gap-[18px] items-center ">
          <div className="w-1/6 bg-white text-sm rounded-lg p-2 h-full flex justify-center items-center  font-bold  text-[#003E43]">
            نام برند*
          </div>
          <div
            className=" w-5/6 h-full flex flex-row z-10"
            onClick={() => setOpen(true)}
          >
            <input
              className="w-full   bg-white rounded-r-[10px] p-4 z-10 outline-none font-Kalameh text-black placeholder:text-[#C4C7C7]"
              name="brand_id"
              disabled={true}
              onChange={formik.handleChange}
              value={formik.values?.brand_id?.name_fa}
            />
            <div className="bg-[#4FB3BF] cursor-pointer z-10 w-1/6 rounded-l-md h-full flex flex-row justify-center items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.53999 19.5196C4.92999 19.5196 4.35999 19.3096 3.94999 18.9196C3.42999 18.4296 3.17999 17.6896 3.26999 16.8896L3.63999 13.6496C3.70999 13.0396 4.07999 12.2296 4.50999 11.7896L12.72 3.09956C14.77 0.929561 16.91 0.869561 19.08 2.91956C21.25 4.96956 21.31 7.10956 19.26 9.27956L11.05 17.9696C10.63 18.4196 9.84999 18.8396 9.23999 18.9396L6.01999 19.4896C5.84999 19.4996 5.69999 19.5196 5.53999 19.5196ZM15.93 2.90956C15.16 2.90956 14.49 3.38956 13.81 4.10956L5.59999 12.8096C5.39999 13.0196 5.16999 13.5196 5.12999 13.8096L4.75999 17.0496C4.71999 17.3796 4.79999 17.6496 4.97999 17.8196C5.15999 17.9896 5.42999 18.0496 5.75999 17.9996L8.97999 17.4496C9.26999 17.3996 9.74999 17.1396 9.94999 16.9296L18.16 8.23956C19.4 6.91956 19.85 5.69956 18.04 3.99956C17.24 3.22956 16.55 2.90956 15.93 2.90956Z"
                  fill="white"
                />
                <path
                  d="M17.3399 10.9498C17.3199 10.9498 17.2899 10.9498 17.2699 10.9498C14.1499 10.6398 11.6399 8.26985 11.1599 5.16985C11.0999 4.75985 11.3799 4.37985 11.7899 4.30985C12.1999 4.24985 12.5799 4.52985 12.6499 4.93985C13.0299 7.35985 14.9899 9.21985 17.4299 9.45985C17.8399 9.49985 18.1399 9.86985 18.0999 10.2798C18.0499 10.6598 17.7199 10.9498 17.3399 10.9498Z"
                  fill="white"
                />
                <rect x="1" y="21" width="2" height="2" rx="1" fill="white" />
              </svg>

              <span className="text-white font-Kalameh text-sm ">ویرایش</span>
            </div>
          </div>
        </div>
        {formik.errors.brand_id && formik.touched.brand_id && (
          <small className="text-red-700">{formik.errors.brand_id}</small>
        )}
        <div className="w-full  z-10  flex flex-row justify-center items-start gap-[18px]">
          <div className="w-1/6  bg-white text-sm rounded-lg px-2 py-5  flex justify-center items-center  font-bold text-[#003E43]">
            توضیحات کوتاه:
          </div>{" "}
          <textarea
            className="w-5/6 outline-none bg-white h-[151px]  rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
            placeholder=" برای مثال: لوازم الکترونیکی"
            name="summary"
            onChange={formik.handleChange}
            value={formik.values.summary}
          />
          {formik.errors.summary && formik.touched.summary && (
            <small className="text-red-700">{formik.errors.summary}</small>
          )}
        </div>
      </div>

      <div className="w-full flex items-center justify-between">
        <button
          className="flex z-20 items-center justify-center gap-1.5 h-11 bg-white hover:hover:bg-cyann  transition-colors duration-500 px-3 text-black rounded-[4px] font-KalamehMed font-medium"
          onClick={() => handlepreviosStep()}
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
              fill="#222427"
            />
            <path
              d="M10.7399 16.2802C10.5499 16.2802 10.3599 16.2102 10.2099 16.0602C9.91993 15.7702 9.91993 15.2902 10.2099 15.0002L13.2099 12.0002L10.2099 9.00016C9.91993 8.71016 9.91993 8.23016 10.2099 7.94016C10.4999 7.65016 10.9799 7.65016 11.2699 7.94016L14.7999 11.4702C15.0899 11.7602 15.0899 12.2402 14.7999 12.5302L11.2699 16.0602C11.1199 16.2102 10.9299 16.2802 10.7399 16.2802Z"
              fill="#222427"
            />
          </svg>
          مرحله قبل
        </button>

        <button
        type="button"
          className="flex items-center justify-center gap-1.5 h-11 z-20 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
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

export default StepTwoInformation;
