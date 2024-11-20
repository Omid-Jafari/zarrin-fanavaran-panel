import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_COLOR_VALIDATION_SCHEMA } from "../../constant/formik/validation_schema";
import AddMediaCategory from "../../components/category/add-media-category";
import { useMutation } from "@tanstack/react-query";
import { addColor } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";

const AddColor = () => {
  const navigate = useNavigate();
  const [OpenForIconMedia, setOpenForIconMedia] = useState(false);
  const [showIconMedia, setshowIconMedia] = useState(null);

  const addColorMutataion = useMutation((data) => addColor(data), {
    onSuccess: (res) => {
      navigate(-1);
      formik.resetForm();
    },
  });
  const formik = useFormik({
    initialValues: {
      name_fa: "",
      name_en: "",
      icon_id: "",
    },
    validationSchema: () => ADD_COLOR_VALIDATION_SCHEMA(),
    onSubmit: (values) => {
      addColorMutataion.mutate(values);
    },
  });
  const selectedItemForIcon = (item) => {
    setshowIconMedia(item?.file);
    formik.values.icon_id = item.id;
  };

  return (
    <div className="w-full p-5">
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
              d="M9.6 18.75c-2.4 0-4.35-1.95-4.35-4.35 0-1.96 1.32-3.69 3.21-4.2.37-.1.75.09.89.45.33.83 1.04 1.47 1.9 1.7.47.13 1.03.13 1.5 0 .37-.1.76.09.9.44a4.37 4.37 0 01-1.15 4.84c-.79.72-1.82 1.12-2.9 1.12zm-1.31-6.88a2.85 2.85 0 00-1.54 2.53c0 1.57 1.28 2.85 2.85 2.85.7 0 1.38-.26 1.9-.73a2.822 2.822 0 00.91-2.59c-.53.05-1.07 0-1.56-.14a4.356 4.356 0 01-2.56-1.92z"
            ></path>
            <path
              fill="#222427"
              d="M12 13.95c-.4 0-.79-.05-1.15-.15a4.373 4.373 0 01-2.89-2.59c-.2-.51-.3-1.05-.3-1.6 0-2.4 1.95-4.35 4.35-4.35 2.4 0 4.35 1.95 4.35 4.35 0 .55-.1 1.09-.3 1.6A4.341 4.341 0 0112 13.95zm0-7.2a2.855 2.855 0 00-2.65 3.9c.33.83 1.04 1.47 1.9 1.7.47.13 1.03.13 1.5 0 .87-.24 1.58-.87 1.9-1.7A2.855 2.855 0 0012 6.75z"
            ></path>
            <path
              fill="#222427"
              d="M14.4 18.75c-1.08 0-2.11-.4-2.9-1.12a.75.75 0 010-1.12 2.82 2.82 0 00.75-3.16.762.762 0 01.5-1 2.88 2.88 0 001.9-1.7.75.75 0 01.89-.45c1.89.51 3.21 2.24 3.21 4.2 0 2.4-1.95 4.35-4.35 4.35zm-1.28-1.8a2.855 2.855 0 004.13-2.55c0-1.08-.61-2.05-1.54-2.53-.44.72-1.09 1.3-1.85 1.66a4.318 4.318 0 01-.74 3.42z"
            ></path>
            <path
              fill="#222427"
              d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9z"
            ></path>
          </svg>
          رنگ ها
        </h5>
        <button
          onClick={() => navigate(-1)}
          className="flex flex-row justify-between bg-[#EFF1F1] text-white rounded-[4px] p-[10px] "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.13 19.0586H7.13C6.72 19.0586 6.38 18.7186 6.38 18.3086C6.38 17.8986 6.72 17.5586 7.13 17.5586H15.13C17.47 17.5586 19.38 15.6486 19.38 13.3086C19.38 10.9686 17.47 9.05859 15.13 9.05859H4.13C3.72 9.05859 3.38 8.71859 3.38 8.30859C3.38 7.89859 3.72 7.55859 4.13 7.55859H15.13C18.3 7.55859 20.88 10.1386 20.88 13.3086C20.88 16.4786 18.3 19.0586 15.13 19.0586Z"
              fill="#222427"
            />
            <path
              d="M6.43006 11.5589C6.24006 11.5589 6.05006 11.4889 5.90006 11.3389L3.34006 8.77891C3.05006 8.48891 3.05006 8.00891 3.34006 7.71891L5.90006 5.15891C6.19006 4.86891 6.67006 4.86891 6.96006 5.15891C7.25006 5.44891 7.25006 5.92891 6.96006 6.21891L4.93006 8.24891L6.96006 10.2789C7.25006 10.5689 7.25006 11.0489 6.96006 11.3389C6.82006 11.4889 6.62006 11.5589 6.43006 11.5589Z"
              fill="#222427"
            />
          </svg>

          <p className="text-[16px] text-[#222427] mr-1">بازگشت</p>
        </button>
      </div>

      <div className="w-full">
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full bg-blue-lightt rounded-lg p-6 mt-4 flex flex-col gap-5 ">
            <div className="w-full flex flex-row justify-center items-center gap-3">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                نام رنگ فارسی:*
              </div>
              <input
                className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
                placeholder="برای مثال: قرمز"
                name="name_fa"
                onChange={formik.handleChange}
                value={formik.values.name_fa}
              />
            </div>
            {formik.errors.name_fa && formik.touched.name_fa && (
              <small className="text-red-700">{formik.errors.name_fa}</small>
            )}
            <div className="w-full flex flex-row justify-center items-center gap-3">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                نام رنگ انگلیسی:*
              </div>
              <input
                className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
                placeholder="For Example: Red"
                name="name_en"
                onChange={formik.handleChange}
                value={formik.values.name_en}
              />
            </div>
            {formik.errors.name_en && formik.touched.name_en && (
              <small className="text-red-700">{formik.errors.name_en}</small>
            )}
            <div className="w-full flex flex-row justify-start items-center gap-6 ">
              <div
                className="flex flex-row"
                onClick={(e) => setOpenForIconMedia(!OpenForIconMedia)}
              >
                <div className="bg-primary flex w-[90px] h-[90px] rounded-lg z-30 cursor-pointer flex-col justify-around py-3 items-center">
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
                      d="M8.81994 9.75043C7.96994 9.75043 7.11994 9.43043 6.46994 8.78043C6.17994 8.49043 6.17994 8.01043 6.46994 7.72043C6.75994 7.43043 7.23994 7.43043 7.52994 7.72043C8.23994 8.43043 9.39994 8.43043 10.1099 7.72043C10.3999 7.43043 10.8799 7.43043 11.1699 7.72043C11.4599 8.01043 11.4599 8.49043 11.1699 8.78043C10.5199 9.42043 9.66994 9.75043 8.81994 9.75043Z"
                      fill="#003E43"
                    />
                    <path
                      d="M15.1798 9.75043C14.3298 9.75043 13.4798 9.43043 12.8298 8.78043C12.5398 8.49043 12.5398 8.01043 12.8298 7.72043C13.1198 7.43043 13.5998 7.43043 13.8898 7.72043C14.5998 8.43043 15.7598 8.43043 16.4698 7.72043C16.7598 7.43043 17.2398 7.43043 17.5298 7.72043C17.8198 8.01043 17.8198 8.49043 17.5298 8.78043C16.8798 9.42043 16.0298 9.75043 15.1798 9.75043Z"
                      fill="#003E43"
                    />
                    <path
                      d="M12 19.15C9.1 19.15 6.75 16.79 6.75 13.9C6.75 12.99 7.49 12.25 8.4 12.25H15.6C16.51 12.25 17.25 12.99 17.25 13.9C17.25 16.79 14.9 19.15 12 19.15ZM8.4 13.75C8.32 13.75 8.25 13.82 8.25 13.9C8.25 15.97 9.93 17.65 12 17.65C14.07 17.65 15.75 15.97 15.75 13.9C15.75 13.82 15.68 13.75 15.6 13.75H8.4Z"
                      fill="white"
                    />
                  </svg>
                  <span className="font-Kalameh text-white text-sm">
                    انتخاب ایکون
                  </span>
                </div>
                <AddMediaCategory
                  open={OpenForIconMedia}
                  setOpen={setOpenForIconMedia}
                  selectedItem={(e) => selectedItemForIcon(e)}
                />
                <div
                  className={`w-[220px] h-[90px] ${
                    showIconMedia != null ? "h-[90px]" : "h-0 hidden"
                  } transition-all ease-linear rounded-tl-lg rounded-bl-lg bg-white -mr-2 flex justify-center items-center`}
                >
                  <img
                    className="max-w-[77px] max-h-[60px] w-full object-contain"
                    src={showIconMedia}
                  />
                </div>
              </div>
            </div>
            {formik.errors.icon_id && formik.touched.icon_id && (
              <small className="text-red-700">{formik.errors.icon_id}</small>
            )}

            <button
              className="bg-primary text-white rounded-[4px] font-Kalameh flex flex-row justify-center items-center gap-2 h-[44px]"
              type="button"
              onClick={formik.handleSubmit}
            >
              {addColorMutataion.isLoading ? (
                <Loading className="w-16 h-16 text-blacklead animate-pulse" />
              ) : (
                <>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H16.5C16.91 11.25 17.25 11.59 17.25 12C17.25 12.41 16.91 12.75 16.5 12.75Z"
                      fill="white"
                    />
                    <path
                      d="M12.5 16.75C12.09 16.75 11.75 16.41 11.75 16V8C11.75 7.59 12.09 7.25 12.5 7.25C12.91 7.25 13.25 7.59 13.25 8V16C13.25 16.41 12.91 16.75 12.5 16.75Z"
                      fill="white"
                    />
                    <path
                      d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H15.5C20.93 1.25 23.25 3.57 23.25 9V15C23.25 20.43 20.93 22.75 15.5 22.75ZM9.5 2.75C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V9C21.75 4.39 20.11 2.75 15.5 2.75H9.5Z"
                      fill="white"
                    />
                  </svg>
                  ذخیره رنگ
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
