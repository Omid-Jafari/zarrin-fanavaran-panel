import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ADD_BLOG_CATEGORY_VALIDATION_SCHEMA } from "../../constant/formik/validation_schema";
import slugPersian from "../../utils/slugPersian";
import TagInput from "../../components/elements/tag-input";
import { useMutation } from "@tanstack/react-query";
import { addBlogCategory } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";

function BlogCategoryAdd() {
  const navigate = useNavigate();

  const addCategoryMutataion = useMutation((data) => addBlogCategory(data), {
    onSuccess: (res) => {
      navigate(-1);
      formik.resetForm();
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
      canonical: "",
    },
    validationSchema: ADD_BLOG_CATEGORY_VALIDATION_SCHEMA,
    onSubmit: (values, { errors }) => {
      values.slug = slugPersian(formik.values.name);
      addCategoryMutataion.mutate(values);
    },
    validate: (res) => {},
  });

  return (
    <div className="w-full p-5">
      <div className="w-full flex items-center justify-between">
        <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#222427"
              d="M19.9 22.75H4.1c-1.92 0-2.85-.98-2.85-2.98v-4.04c0-2.01.93-2.98 2.85-2.98h15.8c1.92 0 2.85.98 2.85 2.98v4.04c0 2-.93 2.98-2.85 2.98zm-15.8-8.5c-1.01 0-1.35.21-1.35 1.48v4.04c0 1.27.34 1.48 1.35 1.48h15.8c1.01 0 1.35-.21 1.35-1.48v-4.04c0-1.27-.34-1.48-1.35-1.48H4.1zM19.9 11.25H4.1c-1.92 0-2.85-.98-2.85-2.98V4.23c0-2.01.93-2.98 2.85-2.98h15.8c1.92 0 2.85.98 2.85 2.98v4.04c0 2-.93 2.98-2.85 2.98zM4.1 2.75c-1.01 0-1.35.21-1.35 1.48v4.04c0 1.27.34 1.48 1.35 1.48h15.8c1.01 0 1.35-.21 1.35-1.48V4.23c0-1.27-.34-1.48-1.35-1.48H4.1z"
            ></path>
          </svg>
          افزودن دسته بندی
        </h5>
        <button
          onClick={() => navigate(-1)}
          className="flex flex-row justify-between bg-[#EFF1F1] 
                      text-white rounded-[4px] p-[10px] "
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

      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full bg-blue-lightt rounded-lg pt-14 px-4 pb-4 mt-4 flex flex-col gap-5 ">
            <div className="w-full flex flex-row justify-center items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                نام دسته:*
              </div>
              <input
                className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh 
                text-black placeholder:text-[#C4C7C7]"
                placeholder=" برای مثال: لوازم الکترونیکی"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <small className="text-red-700">{formik.errors.name}</small>
              )}
            </div>

            <div className="w-full flex flex-row justify-center items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold  text-[#003E43]">
                پیوند دسته:*
              </div>
              <input
                className="w-5/6 bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
                name="slug"
                onChange={formik.handleChange}
                value={slugPersian(formik.values.name)}
              />
              {formik.errors.slug && formik.touched.slug && (
                <small className="text-red-700">{formik.errors.slug}</small>
              )}
            </div>

            <div className="w-full flex flex-row justify-center  items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                متا_کی ورد
              </div>
              <div className="w-5/6 bg-white  rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]">
                <TagInput formik={formik} />
              </div>
            </div>

            <div className="w-full flex flex-row justify-center items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                کانونیکال:
              </div>

              <input
                className="w-5/6 bg-white rounded-lg p-4 h-[51px] outline-none font-Kalameh text-black placeholder:text-[#C4C7C7]"
                name="canonical"
                onChange={formik.handleChange}
                value={slugPersian(formik.values.canonical)}
              />
              {formik.errors.canonical && formik.touched.canonical && (
                <small className="text-red-700">
                  {formik.errors.canonical}
                </small>
              )}
            </div>

            <div className="w-full flex flex-row justify-center items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                متا_تایتل:
              </div>
              <input
                className="w-5/6 bg-white rounded-lg p-4 h-[51px] outline-none font-Kalameh text-black placeholder:text-[#C4C7C7]"
                name="meta_title"
                onChange={formik.handleChange}
                value={slugPersian(formik.values.meta_title)}
              />
              {formik.errors.meta_title && formik.touched.meta_title && (
                <small className="text-red-700">
                  {formik.errors.meta_title}
                </small>
              )}
            </div>

            <div className="w-full flex flex-row justify-center items-start gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                متا_دیسکریپشن:{" "}
              </div>
              <input
                className="w-5/6 bg-white rounded-lg p-4 h-[51px] outline-none font-Kalameh text-black placeholder:text-[#C4C7C7]"
                name="meta_description"
                onChange={formik.handleChange}
                value={slugPersian(formik.values.meta_description)}
              />
              {formik.errors.meta_description &&
                formik.touched.meta_description && (
                  <small className="text-red-700">
                    {formik.errors.meta_description}
                  </small>
                )}
            </div>
            <button
              className="bg-primary hover:bg-blacklead transition-colors duration-500 text-white font-Kalameh flex flex-row justify-center items-center gap-2 h-[44px]"
              type="button"
              onClick={formik.handleSubmit}
            >
              {addCategoryMutataion.isLoading ? (
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
                  افزودن
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogCategoryAdd;
