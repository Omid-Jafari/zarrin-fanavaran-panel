import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADD_BLOG_VALIDATION_SCHEMA } from "../../constant/formik/validation_schema";
import slugPersian from "../../utils/slugPersian";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addBlog, editBlog, singleBlog } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import BlogAddForm from "../../components/blog/blogAddForm";
import { addBlogsStatus } from "../../constant/addBlogsStatus";
import PublishingBlogModal from "../../components/blog/PublishingBlogModal";
import PublishBlogModal from "../../components/blog/PublishBlogModal";

function BlogPageEdit() {
  const navigate = useNavigate();
  const publishingModalRef = useRef();
  const publishModalRef = useRef();
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});

  const singleBlogQuery = useQuery(["singleBlogQuery"], () => singleBlog(id), {
    onSuccess: (res) => {
      setBlogData(res.data?.data);
    },
  });
  console.log("blogData", blogData);
  const publishingBlog = (body) => {
    publishingModalRef.current.toggleModal();
    publishingModalRef.current.getValue(body);
  };
  const publishBlog = (body) => {
    publishModalRef.current.toggleModal();
    publishModalRef.current.getValue(body);
  };
  const editBlogMutataion = useMutation((data) => editBlog({ id, data }), {
    onSuccess: (res) => {
      navigate(-1);
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      blog_category_id: blogData?.category?.id || 1,
      relative_ids: blogData?.relatives || [],
      name: blogData?.name || "",
      slug: blogData?.slug || "",
      meta_title: blogData?.meta_title || "",
      meta_keywords: blogData?.meta_keywords || "",
      meta_description: blogData?.meta_description || "",
      canonical: blogData?.canonical || "",
      status: blogData?.status || "",
      main_id: blogData?.media?.main?.id || null,
      summary: "",
    },
    enableReinitialize: true,
    validationSchema: ADD_BLOG_VALIDATION_SCHEMA,
    onSubmit: (values, { errors }) => {
      let body = values;
      body.slug = slugPersian(values.name);
      body.relative_ids = body.relative_ids?.map((rel) => rel?.id);

      if (body.status === addBlogsStatus.PUBLISHING) {
        publishingBlog(body);
      } else if (body.status === addBlogsStatus.PUBLISHED) {
        publishBlog(body);
      } else if (body.status === addBlogsStatus.DRAFT) {
        editBlogMutataion.mutate(body);
      }
    },
    validate: (res) => {},
  });

  const submitForm = (status) => {
    formik.setFieldValue("status", status);
    formik.handleSubmit();
  };

  return (
    <>
      <PublishingBlogModal
        addBlogMutataion={editBlogMutataion}
        ref={publishingModalRef}
      />
      <PublishBlogModal
        addBlogMutataion={editBlogMutataion}
        ref={publishModalRef}
      />
      <div className="w-full p-5">
        <div className="w-full flex items-center justify-between">
          <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8101 20.1786C15.5501 20.1786 15.2801 20.1686 14.9901 20.1385C14.4701 20.0985 13.8801 19.9986 13.2701 19.8486L11.5901 19.4486C6.98007 18.3586 5.47007 15.9186 6.55007 11.3186L7.53007 7.12855C7.75007 6.17855 8.01007 5.40855 8.33007 4.76855C10.0501 1.21855 13.3401 1.53855 15.6801 2.08855L17.3501 2.47855C19.6901 3.02855 21.1701 3.89855 22.0001 5.22855C22.8201 6.55855 22.9501 8.26855 22.4001 10.6086L21.4201 14.7886C20.5601 18.4486 18.7701 20.1786 15.8101 20.1786ZM13.1201 3.24855C11.4501 3.24855 10.3901 3.93855 9.68007 5.41855C9.42007 5.95855 9.19007 6.62855 8.99007 7.46855L8.01007 11.6586C7.12007 15.4385 8.15007 17.0886 11.9301 17.9886L13.6101 18.3885C14.1501 18.5185 14.6601 18.5985 15.1201 18.6385C17.8401 18.9086 19.1901 17.7185 19.9501 14.4486L20.9301 10.2686C21.3801 8.33855 21.3201 6.98855 20.7201 6.01855C20.1201 5.04855 18.9401 4.38855 17.0001 3.93855L15.3301 3.54855C14.5001 3.34855 13.7601 3.24855 13.1201 3.24855Z"
                fill="#222427"
              />
              <path
                d="M8.33005 22.2516C5.76005 22.2516 4.12005 20.7116 3.07005 17.4616L1.79005 13.5116C0.370052 9.11164 1.64005 6.63164 6.02005 5.21164L7.60005 4.70164C8.12005 4.54164 8.51005 4.43164 8.86005 4.37164C9.15005 4.31164 9.43005 4.42164 9.60005 4.65164C9.77005 4.88164 9.80005 5.18164 9.68005 5.44164C9.42005 5.97164 9.19005 6.64164 9.00005 7.48164L8.02005 11.6716C7.13005 15.4516 8.16005 17.1016 11.9401 18.0016L13.6201 18.4016C14.1601 18.5316 14.6701 18.6116 15.1301 18.6516C15.4501 18.6816 15.7101 18.9016 15.8001 19.2116C15.8801 19.5216 15.7601 19.8416 15.5001 20.0216C14.8401 20.4716 14.0101 20.8516 12.9601 21.1916L11.3801 21.7116C10.2301 22.0716 9.23005 22.2516 8.33005 22.2516ZM7.78005 6.22164L6.49005 6.64164C2.92005 7.79164 2.07005 9.47164 3.22005 13.0516L4.50005 17.0016C5.66005 20.5716 7.34005 21.4316 10.9101 20.2816L12.4901 19.7616C12.5501 19.7416 12.6001 19.7216 12.6601 19.7016L11.6001 19.4516C6.99005 18.3616 5.48005 15.9216 6.56005 11.3216L7.54005 7.13164C7.61005 6.81164 7.69005 6.50164 7.78005 6.22164Z"
                fill="#222427"
              />
              <path
                d="M17.4901 10.5117C17.4301 10.5117 17.3701 10.5017 17.3001 10.4917L12.4501 9.26173C12.0501 9.16173 11.8101 8.75173 11.9101 8.35173C12.0101 7.95173 12.4201 7.71173 12.8201 7.81173L17.6701 9.04173C18.0701 9.14173 18.3101 9.55173 18.2101 9.95173C18.1301 10.2817 17.8201 10.5117 17.4901 10.5117Z"
                fill="#222427"
              />
              <path
                d="M14.5599 13.8889C14.4999 13.8889 14.4399 13.8789 14.3699 13.8689L11.4599 13.1289C11.0599 13.0289 10.8199 12.6189 10.9199 12.2189C11.0199 11.8189 11.4299 11.5789 11.8299 11.6789L14.7399 12.4189C15.1399 12.5189 15.3799 12.9289 15.2799 13.3289C15.1999 13.6689 14.8999 13.8889 14.5599 13.8889Z"
                fill="#222427"
              />
            </svg>
            افزودن صفحه بلاگ
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

        <div className="w-full flex gap-5 mt-5">
          <BlogAddForm formik={formik} blogData={blogData} />
          <div className="p-3 min-w-[190px] rounded-lg bg-[#DBEEF6]">
            <div className=" flex flex-col justify-start h-full items-center">
              <div className=" w-full rounded-[4px] bg-white flex flex-col justify-start items-center text-right p-2">
                <p className="w-full font-Kalameh text-sm text-black">
                  وضعیت :
                </p>
                <p className="w-full mt-1 font-Kalameh text-sm text-black">
                  {blogData?.status_info?.name}
                </p>
                <div className="w-full first-letter:flex flex-row justify-between mt-3 items-center">
                  <span className="text-[#C4C7C7] text-[12px]">
                    آخرین تغییر :{" "}
                  </span>
                  <span className="text-[#C4C7C7] text-[12px]">
                    {blogData?.jupdated_at}
                  </span>
                </div>
              </div>

              {/* item1 */}
              <button
                onClick={() => {
                  submitForm(addBlogsStatus.PUBLISHED);
                }}
                className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                    fill="white"
                  />
                  <path
                    d="M11.9999 17.472C10.5999 17.472 9.19994 16.942 8.12994 15.872C7.84994 15.592 7.59993 15.282 7.36993 14.912C7.14993 14.562 7.25992 14.1021 7.60992 13.8821C7.95992 13.6621 8.41995 13.772 8.63995 14.122C8.80995 14.402 8.98994 14.6221 9.18994 14.8221C10.7399 16.3721 13.2599 16.3721 14.8099 14.8221C15.4099 14.2221 15.79 13.4421 15.92 12.5721C15.98 12.1621 16.3599 11.862 16.7699 11.932C17.1799 11.992 17.4599 12.3721 17.4099 12.7821C17.2399 13.9721 16.7099 15.0421 15.8799 15.8821C14.7999 16.9421 13.3999 17.472 11.9999 17.472Z"
                    fill="white"
                  />
                  <path
                    d="M7.3399 12.081C7.2999 12.081 7.26991 12.0809 7.22991 12.0709C6.81991 12.0109 6.5299 11.6309 6.5899 11.2209C6.7599 10.0309 7.2899 8.96094 8.1199 8.12094C10.2499 5.99094 13.7199 5.99094 15.8599 8.12094C16.1399 8.40094 16.3899 8.71097 16.6199 9.09097C16.8399 9.44097 16.7299 9.90094 16.3799 10.1209C16.0299 10.3409 15.5699 10.2309 15.3499 9.88095C15.1799 9.61095 14.9999 9.38094 14.7999 9.18094C13.2499 7.63094 10.7299 7.63094 9.17989 9.18094C8.57989 9.78094 8.19991 10.5609 8.06991 11.4309C8.02991 11.8109 7.7099 12.081 7.3399 12.081Z"
                    fill="white"
                  />
                  <path
                    d="M7.82031 17.9317C7.41031 17.9317 7.07031 17.5917 7.07031 17.1817V14.5117C7.07031 14.1017 7.41031 13.7617 7.82031 13.7617H10.4903C10.9003 13.7617 11.2403 14.1017 11.2403 14.5117C11.2403 14.9217 10.9003 15.2617 10.4903 15.2617H8.57031V17.1817C8.57031 17.5917 8.24031 17.9317 7.82031 17.9317Z"
                    fill="white"
                  />
                  <path
                    d="M16.1797 10.2403H13.5098C13.0998 10.2403 12.7598 9.9003 12.7598 9.4903C12.7598 9.0803 13.0998 8.7403 13.5098 8.7403H15.4297V6.82031C15.4297 6.41031 15.7697 6.07031 16.1797 6.07031C16.5897 6.07031 16.9297 6.41031 16.9297 6.82031V9.4903C16.9297 9.9103 16.5897 10.2403 16.1797 10.2403Z"
                    fill="white"
                  />
                </svg>

                <span className="">بروز رسانی</span>
              </button>

              {/* item2 */}
              <Link
                to="#"
                className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 16.3299C9.61001 16.3299 7.67001 14.3899 7.67001 11.9999C7.67001 9.60992 9.61001 7.66992 12 7.66992C14.39 7.66992 16.33 9.60992 16.33 11.9999C16.33 14.3899 14.39 16.3299 12 16.3299ZM12 9.16992C10.44 9.16992 9.17001 10.4399 9.17001 11.9999C9.17001 13.5599 10.44 14.8299 12 14.8299C13.56 14.8299 14.83 13.5599 14.83 11.9999C14.83 10.4399 13.56 9.16992 12 9.16992Z" />
                  <path d="M12 21.0205C8.23999 21.0205 4.68999 18.8205 2.24999 15.0005C1.18999 13.3505 1.18999 10.6605 2.24999 9.00047C4.69999 5.18047 8.24999 2.98047 12 2.98047C15.75 2.98047 19.3 5.18047 21.74 9.00047C22.8 10.6505 22.8 13.3405 21.74 15.0005C19.3 18.8205 15.75 21.0205 12 21.0205ZM12 4.48047C8.76999 4.48047 5.67999 6.42047 3.51999 9.81047C2.76999 10.9805 2.76999 13.0205 3.51999 14.1905C5.67999 17.5805 8.76999 19.5205 12 19.5205C15.23 19.5205 18.32 17.5805 20.48 14.1905C21.23 13.0205 21.23 10.9805 20.48 9.81047C18.32 6.42047 15.23 4.48047 12 4.48047Z" />
                </svg>

                <span className=""> پیش نمایش</span>
              </Link>
              {/* {fromEdit() && (
            )} */}
              <button
                onClick={() => {
                  submitForm(addBlogsStatus.PUBLISHING);
                }}
                className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                    fill="white"
                  />
                  <path
                    d="M15.71 15.9317C15.58 15.9317 15.45 15.9017 15.33 15.8217L12.23 13.9717C11.46 13.5117 10.89 12.5017 10.89 11.6117V7.51172C10.89 7.10172 11.23 6.76172 11.64 6.76172C12.05 6.76172 12.39 7.10172 12.39 7.51172V11.6117C12.39 11.9717 12.69 12.5017 13 12.6817L16.1 14.5317C16.46 14.7417 16.57 15.2017 16.36 15.5617C16.21 15.8017 15.96 15.9317 15.71 15.9317Z"
                    fill="white"
                  />
                </svg>

                <span className="">زمان بندی</span>
              </button>

              {/* item3 */}
              <button
                onClick={() => {
                  submitForm(addBlogsStatus.DRAFT);
                }}
                className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
              >
                {/* addProductquery?.isLoading && productData?.status === "DRAFT" */}
                {false ? (
                  <div className="w-full flex justify-center">
                    <Loading className="w-10 h-10 text-blacklead animate-pulse" />
                  </div>
                ) : (
                  <>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z" />
                      <path d="M22 10.7505H18C14.58 10.7505 13.25 9.42048 13.25 6.00048V2.00048C13.25 1.70048 13.43 1.42048 13.71 1.31048C13.99 1.19048 14.31 1.26048 14.53 1.47048L22.53 9.47048C22.74 9.68048 22.81 10.0105 22.69 10.2905C22.57 10.5705 22.3 10.7505 22 10.7505ZM14.75 3.81048V6.00048C14.75 8.58048 15.42 9.25048 18 9.25048H20.19L14.75 3.81048Z" />
                      <path d="M13 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H13C13.41 12.25 13.75 12.59 13.75 13C13.75 13.41 13.41 13.75 13 13.75Z" />
                      <path d="M11 17.75H7C6.59 17.75 6.25 17.41 6.25 17C6.25 16.59 6.59 16.25 7 16.25H11C11.41 16.25 11.75 16.59 11.75 17C11.75 17.41 11.41 17.75 11 17.75Z" />
                    </svg>

                    <span className=""> انتقال به پیشنویس</span>
                  </>
                )}
              </button>

              {/* item4 */}
              <button
                //   onClick={handleDuplicateProduct}
                className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.4 22.75H7.6C3.21 22.75 1.25 20.79 1.25 16.4V12.6C1.25 8.21 3.21 6.25 7.6 6.25H10.6C11.01 6.25 11.35 6.59 11.35 7C11.35 7.41 11.01 7.75 10.6 7.75H7.6C4.02 7.75 2.75 9.02 2.75 12.6V16.4C2.75 19.98 4.02 21.25 7.6 21.25H11.4C14.98 21.25 16.25 19.98 16.25 16.4V13.4C16.25 12.99 16.59 12.65 17 12.65C17.41 12.65 17.75 12.99 17.75 13.4V16.4C17.75 20.79 15.79 22.75 11.4 22.75Z" />
                  <path d="M17 14.1505H13.8C10.99 14.1505 9.85001 13.0105 9.85001 10.2005V7.00048C9.85001 6.70048 10.03 6.42048 10.31 6.31048C10.59 6.19048 10.91 6.26048 11.13 6.47048L17.53 12.8705C17.74 13.0805 17.81 13.4105 17.69 13.6905C17.58 13.9705 17.3 14.1505 17 14.1505ZM11.35 8.81048V10.2005C11.35 12.1905 11.81 12.6505 13.8 12.6505H15.19L11.35 8.81048Z" />
                  <path d="M15.6 2.75H11.6C11.19 2.75 10.85 2.41 10.85 2C10.85 1.59 11.19 1.25 11.6 1.25H15.6C16.01 1.25 16.35 1.59 16.35 2C16.35 2.41 16.01 2.75 15.6 2.75Z" />
                  <path d="M7 5.75C6.59 5.75 6.25 5.41 6.25 5C6.25 2.93 7.93 1.25 10 1.25H12.62C13.03 1.25 13.37 1.59 13.37 2C13.37 2.41 13.03 2.75 12.62 2.75H10C8.76 2.75 7.75 3.76 7.75 5C7.75 5.41 7.41 5.75 7 5.75Z" />
                  <path d="M19.19 17.75C18.78 17.75 18.44 17.41 18.44 17C18.44 16.59 18.78 16.25 19.19 16.25C20.33 16.25 21.25 15.32 21.25 14.19V8C21.25 7.59 21.59 7.25 22 7.25C22.41 7.25 22.75 7.59 22.75 8V14.19C22.75 16.15 21.15 17.75 19.19 17.75Z" />
                  <path d="M22 8.75048H19C16.34 8.75048 15.25 7.66048 15.25 5.00048V2.00048C15.25 1.70048 15.43 1.42048 15.71 1.31048C15.99 1.19048 16.31 1.26048 16.53 1.47048L22.53 7.47048C22.74 7.68048 22.81 8.01048 22.69 8.29048C22.58 8.57048 22.3 8.75048 22 8.75048ZM16.75 3.81048V5.00048C16.75 6.83048 17.17 7.25048 19 7.25048H20.19L16.75 3.81048Z" />
                </svg>

                <span className="">دو برابر کردن</span>
              </button>
              {/* {fromEdit() && (
            )} */}

              {/* item5 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPageEdit;
