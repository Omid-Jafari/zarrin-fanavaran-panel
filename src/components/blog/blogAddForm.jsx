import React, { useEffect, useState } from "react";
import { useCategoryOptions } from "../../utils/hooks/useCategoryOptions";
import slugPersian from "../../utils/slugPersian";
import AddMediaCategory from "../category/add-media-category";
import CategoryBelectBox from "../category/category-select-box";
import SelectBox from "../common/selectBox";
import TagInput from "../elements/tag-input";
import RelatedBlogsModal from "./RelatedBlogsModal";

const BlogAddForm = (props) => {
  const { formik, blogData } = props;
  const [blogModal, setBlogModal] = useState(false);
  const [OpenForMainMedia, setOpenForMainMedia] = useState(false);
  const [showMainMadia, setshowMainMadia] = useState(null);
  const { categoryLoading, categoryOptions } = useCategoryOptions();
  useEffect(() => {
    setshowMainMadia(blogData?.media?.main?.file || null);
  }, [blogData]);

  const selectedItemForMain = (item) => {
    setshowMainMadia(item?.file);
    formik.values.main_id = item.id;
  };
  const selectCategory = (item) => {
    formik.setFieldValue("blog_category_id", item);
  };

  return (
    <>
      <RelatedBlogsModal
        blogModal={blogModal}
        formik={formik}
        setBlogModal={setBlogModal}
      />
      <div className="flex-1 bg-blue-lightt rounded-lg pt-14 px-4 pb-4 flex flex-col gap-5 ">
        <div className="w-full flex flex-row justify-center items-center gap-[18px]">
          <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
            عنوان صفحه:
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
            پیوند صفحه:*
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
        <div className="w-full flex flex-row justify-center items-start gap-[18px]">
          <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43] ">
            انتخاب دسته :*
          </div>
          <div className="w-5/6 relative">
            <SelectBox
              status={formik.values.blog_category_id}
              getValue={selectCategory}
              options={categoryOptions}
              loading={categoryLoading}
              className="w-full"
              height="56px"
            />
          </div>
          {formik.errors.blog_category_id &&
            formik.touched.blog_category_id && (
              <small className="text-red-700">
                {formik.errors.blog_category_id}
              </small>
            )}
        </div>
        <div className="w-full flex flex-row justify-center items-start gap-[18px]">
          <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
            خلاصه متن:*
          </div>
          <textarea
            rows={3}
            className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh 
    text-black placeholder:text-[#C4C7C7]"
            placeholder=" برای مثال: لوازم الکترونیکی"
            name="summary"
            onChange={formik.handleChange}
            value={formik.values.summary}
          />
        </div>

        <div className="w-full flex flex-row justify-start items-center gap-6 ">
          <div
            className="flex flex-row"
            onClick={(e) => setOpenForMainMedia(!OpenForMainMedia)}
          >
            <div className="bg-primary hover:bg-blacklead transition-colors duration-500 flex w-[90px] cursor-pointer h-[90px] rounded-lg z-30 flex-col justify-center items-center">
              <>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 10.75C7.48 10.75 6.25 9.52 6.25 8C6.25 6.48 7.48 5.25 9 5.25C10.52 5.25 11.75 6.48 11.75 8C11.75 9.52 10.52 10.75 9 10.75ZM9 6.75C8.31 6.75 7.75 7.31 7.75 8C7.75 8.69 8.31 9.25 9 9.25C9.69 9.25 10.25 8.69 10.25 8C10.25 7.31 9.69 6.75 9 6.75Z"
                    fill="#F9FCFD"
                  />
                  <path
                    d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H13C13.41 1.25 13.75 1.59 13.75 2C13.75 2.41 13.41 2.75 13 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"
                    fill="#F9FCFD"
                  />
                  <path
                    d="M21.25 5.75H15.75C15.34 5.75 15 5.41 15 5C15 4.59 15.34 4.25 15.75 4.25H21.25C21.66 4.25 22 4.59 22 5C22 5.41 21.66 5.75 21.25 5.75Z"
                    fill="#003E43"
                  />
                  <path
                    d="M18.5 8.5C18.09 8.5 17.75 8.16 17.75 7.75V2.25C17.75 1.84 18.09 1.5 18.5 1.5C18.91 1.5 19.25 1.84 19.25 2.25V7.75C19.25 8.16 18.91 8.5 18.5 8.5Z"
                    fill="#003E43"
                  />
                  <path
                    d="M2.6698 19.6996C2.4298 19.6996 2.1898 19.5796 2.0498 19.3696C1.8198 19.0296 1.9098 18.5596 2.2498 18.3296L7.1798 15.0196C8.2598 14.2996 9.7498 14.3796 10.7298 15.2096L11.0598 15.4996C11.5598 15.9296 12.4098 15.9296 12.8998 15.4996L17.0598 11.9296C18.1298 11.0196 19.7898 11.0196 20.8598 11.9296L22.4898 13.3296C22.7998 13.5996 22.8398 14.0696 22.5698 14.3896C22.2998 14.6996 21.8298 14.7396 21.5098 14.4696L19.8798 13.0696C19.3798 12.6396 18.5298 12.6396 18.0398 13.0696L13.8798 16.6396C12.8198 17.5496 11.1498 17.5496 10.0798 16.6396L9.7498 16.3496C9.2898 15.9596 8.52981 15.9196 8.01981 16.2696L3.0998 19.5796C2.9598 19.6596 2.8098 19.6996 2.6698 19.6996Z"
                    fill="#F9FCFD"
                  />
                </svg>
              </>
              <span className="font-Kalameh text-white text-sm">
                انتخاب عکس
              </span>
              <AddMediaCategory
                open={OpenForMainMedia}
                setOpen={setOpenForMainMedia}
                selectedItem={(e) => selectedItemForMain(e)}
              />
            </div>

            <div
              className={`w-[220px] h-[90px] ${
                showMainMadia != null ? "h-[90px]" : "h-0 hidden"
              } transition-all ease-linear rounded-tl-lg rounded-bl-lg bg-white -mr-2 flex justify-center items-center`}
            >
              <img className="w-[77px] h-[60px]" src={showMainMadia} />
            </div>
          </div>
          <button
            onClick={() => setBlogModal(!blogModal)}
            className="flex items-center gap-3 rounded-[4px] px-3 h-11 bg-cyann text-white transition-colors hover:bg-primary duration-500 font-medium font-KalamehMed text-sm mr-auto"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M16 22.75H8c-3.65 0-5.75-2.1-5.75-5.75V7c0-3.65 2.1-5.75 5.75-5.75h8c3.65 0 5.75 2.1 5.75 5.75v10c0 3.65-2.1 5.75-5.75 5.75zm-8-20C5.14 2.75 3.75 4.14 3.75 7v10c0 2.86 1.39 4.25 4.25 4.25h8c2.86 0 4.25-1.39 4.25-4.25V7c0-2.86-1.39-4.25-4.25-4.25H8z"
              ></path>
              <path
                fill="#fff"
                d="M9 11.11a1.244 1.244 0 01-1.25-1.24V2c0-.41.34-.75.75-.75h7c.41 0 .75.34.75.75v7.86c0 .5-.29.95-.75 1.14-.45.2-.98.11-1.35-.23L12 8.8l-2.15 1.98c-.24.22-.54.33-.85.33zm3-3.9c.3 0 .61.11.85.33l1.9 1.75V2.75h-5.5v6.54l1.9-1.75c.24-.22.55-.33.85-.33zM17.5 14.75h-4.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.25c.41 0 .75.34.75.75s-.34.75-.75.75zM17.5 18.75H9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8.5c.41 0 .75.34.75.75s-.34.75-.75.75z"
              ></path>
            </svg>
            مقالات محصول
          </button>
        </div>
        {formik.errors.main_id && formik.touched.main_id && (
          <small className="text-red-700">{formik.errors.main_id}</small>
        )}

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
            <small className="text-red-700">{formik.errors.canonical}</small>
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
            <small className="text-red-700">{formik.errors.meta_title}</small>
          )}
        </div>

        <div className="w-full flex flex-row justify-center items-start gap-[18px]">
          <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
            متا_دیسکریپشن:{" "}
          </div>
          <textarea
            rows={3}
            className="w-5/6 bg-white rounded-lg p-4 outline-none font-Kalameh text-black placeholder:text-[#C4C7C7]"
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
      </div>
    </>
  );
};

export default BlogAddForm;
