import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addDepartment } from "../../../api/ApiClient";
import Loading from "../../../components/elements/loading";
import * as Yup from "yup";
import DepartmentAdminSelect from "../../../components/admin/departmentAdminSelect";

const AddDepartment = () => {
  const navigate = useNavigate();

  const addRoleMutataion = useMutation((data) => addDepartment(data), {
    onSuccess: (res) => {
      navigate(-1);
      formik.resetForm();
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      admin_ids: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("لطفا نام را وارد کنید"),
      admin_ids: Yup.array()
        .of(Yup.number())
        .min(1, "لطفا حداقل یک ادمین انتخاب کنید"),
    }),
    onSubmit: (values) => {
      addRoleMutataion.mutate(values);
    },
  });
  return (
    <>
      <div className="w-full p-5">
        <div className="w-full flex items-center justify-between">
          <h5 className="font-KalamehMed text-lg font-medium flex items-center text-black gap-2">
            افزودن نقش:
          </h5>
          <button
            onClick={() => navigate(-1)}
            className="flex gap-1  bg-[#EFF1F1] font-semibold font-KalamehSemi rounded-lg hover:bg-[#E0E3E3] transition-colors duration-500 p-[10px] "
          >
            بازگشت
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.56994 19.3191C9.37994 19.3191 9.18994 19.2491 9.03994 19.0991L2.96994 13.0291C2.67994 12.7391 2.67994 12.2591 2.96994 11.9691L9.03994 5.89914C9.32994 5.60914 9.80994 5.60914 10.0999 5.89914C10.3899 6.18914 10.3899 6.66914 10.0999 6.95914L4.55994 12.4991L10.0999 18.0391C10.3899 18.3291 10.3899 18.8091 10.0999 19.0991C9.95994 19.2491 9.75994 19.3191 9.56994 19.3191Z"
                fill="#222427"
              />
              <path
                d="M20.4999 13.25H3.66992C3.25992 13.25 2.91992 12.91 2.91992 12.5C2.91992 12.09 3.25992 11.75 3.66992 11.75H20.4999C20.9099 11.75 21.2499 12.09 21.2499 12.5C21.2499 12.91 20.9099 13.25 20.4999 13.25Z"
                fill="#222427"
              />
            </svg>
          </button>
        </div>
        <form className="w-full bg-blue-lightt rounded-lg p-6 mt-4 flex flex-col gap-5 ">
          <div className="w-full flex flex-row justify-center items-start gap-3">
            <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.27 22.75H4.23C2.22 22.75 1.25 21.82 1.25 19.9V4.1C1.25 2.18 2.23 1.25 4.23 1.25H8.27C10.28 1.25 11.25 2.18 11.25 4.1V19.9C11.25 21.82 10.27 22.75 8.27 22.75ZM4.23 2.75C2.96 2.75 2.75 3.09 2.75 4.1V19.9C2.75 20.91 2.96 21.25 4.23 21.25H8.27C9.54 21.25 9.75 20.91 9.75 19.9V4.1C9.75 3.09 9.54 2.75 8.27 2.75H4.23Z"
                  fill="#00838F"
                />
                <path
                  d="M19.77 13.75H15.73C13.72 13.75 12.75 12.82 12.75 10.9V4.1C12.75 2.18 13.73 1.25 15.73 1.25H19.77C21.78 1.25 22.75 2.18 22.75 4.1V10.9C22.75 12.82 21.77 13.75 19.77 13.75ZM15.73 2.75C14.46 2.75 14.25 3.09 14.25 4.1V10.9C14.25 11.91 14.46 12.25 15.73 12.25H19.77C21.04 12.25 21.25 11.91 21.25 10.9V4.1C21.25 3.09 21.04 2.75 19.77 2.75H15.73Z"
                  fill="#00838F"
                />
                <path
                  d="M19.77 22.75H15.73C13.72 22.75 12.75 21.82 12.75 19.9V18.1C12.75 16.18 13.73 15.25 15.73 15.25H19.77C21.78 15.25 22.75 16.18 22.75 18.1V19.9C22.75 21.82 21.77 22.75 19.77 22.75ZM15.73 16.75C14.46 16.75 14.25 17.09 14.25 18.1V19.9C14.25 20.91 14.46 21.25 15.73 21.25H19.77C21.04 21.25 21.25 20.91 21.25 19.9V18.1C21.25 17.09 21.04 16.75 19.77 16.75H15.73Z"
                  fill="#00838F"
                />
              </svg>
              عنوان دپارتمان:
            </div>
            <input
              className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
              placeholder="مثال: پشتیبانی"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.name && formik.touched.name && (
            <small className="text-red-700">{formik.errors.name}</small>
          )}
          <div className="w-full flex flex-row justify-center items-start gap-3">
            <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6201 9.62109H12.3701C11.9601 9.62109 11.6201 9.28109 11.6201 8.87109C11.6201 8.46109 11.9601 8.12109 12.3701 8.12109H17.6201C18.0301 8.12109 18.3701 8.46109 18.3701 8.87109C18.3701 9.28109 18.0401 9.62109 17.6201 9.62109Z"
                  fill="#00838F"
                />
                <path
                  d="M7.12006 10.3803C6.93006 10.3803 6.74006 10.3103 6.59006 10.1603L5.84006 9.41031C5.55006 9.12031 5.55006 8.64031 5.84006 8.35031C6.13006 8.06031 6.61006 8.06031 6.90006 8.35031L7.12006 8.57031L8.84006 6.85031C9.13006 6.56031 9.61006 6.56031 9.90006 6.85031C10.1901 7.14031 10.1901 7.62031 9.90006 7.91031L7.65006 10.1603C7.51006 10.3003 7.32006 10.3803 7.12006 10.3803Z"
                  fill="#00838F"
                />
                <path
                  d="M17.6201 16.6211H12.3701C11.9601 16.6211 11.6201 16.2811 11.6201 15.8711C11.6201 15.4611 11.9601 15.1211 12.3701 15.1211H17.6201C18.0301 15.1211 18.3701 15.4611 18.3701 15.8711C18.3701 16.2811 18.0401 16.6211 17.6201 16.6211Z"
                  fill="#00838F"
                />
                <path
                  d="M7.12006 17.3803C6.93006 17.3803 6.74006 17.3103 6.59006 17.1603L5.84006 16.4103C5.55006 16.1203 5.55006 15.6403 5.84006 15.3503C6.13006 15.0603 6.61006 15.0603 6.90006 15.3503L7.12006 15.5703L8.84006 13.8503C9.13006 13.5603 9.61006 13.5603 9.90006 13.8503C10.1901 14.1403 10.1901 14.6203 9.90006 14.9103L7.65006 17.1603C7.51006 17.3003 7.32006 17.3803 7.12006 17.3803Z"
                  fill="#00838F"
                />
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                  fill="#00838F"
                />
              </svg>
              افراد دپارتمان:
            </div>
            <DepartmentAdminSelect formik={formik} />
          </div>
          {formik.errors.admin_ids && formik.touched.admin_ids && (
            <small className="text-red-700">{formik.errors.admin_ids}</small>
          )}
          <button
            className="bg-primary text-white rounded-[4px] font-Kalameh flex flex-row justify-center items-center gap-2 h-[44px]"
            type="button"
            onClick={formik.handleSubmit}
          >
            {addRoleMutataion.isLoading ? (
              <Loading className="w-16 h-16 text-white animate-pulse" />
            ) : (
              <>
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
                    d="M10.5799 15.5816C10.3799 15.5816 10.1899 15.5016 10.0499 15.3616L7.21994 12.5316C6.92994 12.2416 6.92994 11.7616 7.21994 11.4716C7.50994 11.1816 7.98994 11.1816 8.27994 11.4716L10.5799 13.7716L15.7199 8.63156C16.0099 8.34156 16.4899 8.34156 16.7799 8.63156C17.0699 8.92156 17.0699 9.40156 16.7799 9.69156L11.1099 15.3616C10.9699 15.5016 10.7799 15.5816 10.5799 15.5816Z"
                    fill="white"
                  />
                </svg>
                تایید و افزودن
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddDepartment;
