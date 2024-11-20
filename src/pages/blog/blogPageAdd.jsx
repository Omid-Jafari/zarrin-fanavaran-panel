import { useFormik } from "formik";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_BLOG_VALIDATION_SCHEMA } from "../../constant/formik/validation_schema";
import slugPersian from "../../utils/slugPersian";
import { useMutation } from "@tanstack/react-query";
import { addBlog } from "../../api/ApiClient";
import BlogAddForm from "../../components/blog/blogAddForm";
import { addBlogsStatus } from "../../constant/addBlogsStatus";
import PublishingBlogModal from "../../components/blog/PublishingBlogModal";
import PublishBlogModal from "../../components/blog/PublishBlogModal";
import AddBlogSidebar from "../../components/blog/addBlogSidebar";

function BlogPageAdd() {
  const navigate = useNavigate();
  const publishingModalRef = useRef();
  const publishModalRef = useRef();

  const publishingBlog = (body) => {
    publishingModalRef.current.toggleModal();
    publishingModalRef.current.getValue(body);
  };
  const publishBlog = (body) => {
    publishModalRef.current.toggleModal();
    publishModalRef.current.getValue(body);
  };
  const addBlogMutataion = useMutation((data) => addBlog(data), {
    onSuccess: (res) => {
      navigate(-1);
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      blog_category_id: 1,
      relative_ids: [],
      name: "",
      slug: "",
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
      canonical: "",
      status: "",
      main_id: "",
      summary: "",
    },
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
        addBlogMutataion.mutate(body);
      }
    },
    validate: (res) => {},
  });

  return (
    <>
      <PublishingBlogModal
        addBlogMutataion={addBlogMutataion}
        ref={publishingModalRef}
      />
      <PublishBlogModal
        addBlogMutataion={addBlogMutataion}
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
          <BlogAddForm formik={formik} />
          <AddBlogSidebar formik={formik} />
        </div>
      </div>
    </>
  );
}

export default BlogPageAdd;
