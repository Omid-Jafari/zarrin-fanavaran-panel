import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMediaCategory from "../../../components/category/add-media-category";
import { useMutation } from "@tanstack/react-query";
import { addAdmin } from "../../../api/ApiClient";
import Loading from "../../../components/elements/loading";
import * as Yup from "yup";
import SelectBox from "../../../components/common/selectBox";
import { EmailOutlined } from "@mui/icons-material";
import { adminRoleOptions } from "../../../utils/adminRoleOptions";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [OpenImageModal, setOpenImageModal] = useState(false);
  const [showImgMedia, setshowImgMedia] = useState(null);
  const options = adminRoleOptions()?.options;
  const loading = adminRoleOptions()?.loading;

  const addAdminMutataion = useMutation((data) => addAdmin(data), {
    onSuccess: (res) => {
      navigate(-1);
      formik.resetForm();
    },
  });
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      mobile_number: "",
      avatar_id: null,
      role_id: 1,
      email: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("لطفا نام را وارد کنید"),
      last_name: Yup.string().required("لطفا نام خانوادگی را وارد کنید"),
      password: Yup.string()
        .required("لطفا رمز عبور را وارد کنید")
        .matches(
          /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/,
          "رمز عبور حداقل باید شامل یک حروف خاص مانند !@#$% باشد"
        )
        .min(8, "رمز عبور نباید کمتر از 8 کاراکتر باشد"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "رمز عبور مطابقت ندارد")
        .required("لطفا تکرار رمز عبور را وارد کنید"),
      mobile_number: Yup.string()
        .required("لطفا شماره موبایل را وارد کنید")
        .matches(
          /^(\+98?)?{?(0?9[0-9]{9,9}}?)$/,
          "الگوی شماره موبایل وارد شده اشتباه می باشد. شماره موبایل باید 11 رقمی باشد و با 09 یا +98 شروع شود"
        ),
      avatar_id: Yup.number()
        .required("لطفا عکس پروفایل را وارد کنید")
        .nullable(),
      email: Yup.string().email("فرمت رایانامه وارد شده صحیح نیست"),
    }),
    onSubmit: (values) => {
      addAdminMutataion.mutate(values);
    },
  });
  const selectedItemForImg = (item) => {
    setshowImgMedia(item?.file);
    formik.setFieldValue("avatar_id", item?.id);
  };

  const getValue = (value) => {
    formik.setFieldValue("role_id", value);
  };
  return (
    <>
      <AddMediaCategory
        open={OpenImageModal}
        setOpen={setOpenImageModal}
        selectedItem={selectedItemForImg}
      />
      <div className="w-full p-5">
        <div className="w-full flex items-center justify-between">
          <h5 className="font-KalamehMed text-lg font-medium flex items-center text-black gap-2">
            افزودن ادمین:
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
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                  fill="#00838F"
                />
                <path
                  d="M9 10.75C7.48 10.75 6.25 9.52 6.25 8C6.25 6.48 7.48 5.25 9 5.25C10.52 5.25 11.75 6.48 11.75 8C11.75 9.52 10.52 10.75 9 10.75ZM9 6.75C8.31 6.75 7.75 7.31 7.75 8C7.75 8.69 8.31 9.25 9 9.25C9.69 9.25 10.25 8.69 10.25 8C10.25 7.31 9.69 6.75 9 6.75Z"
                  fill="#00838F"
                />
                <path
                  d="M2.67002 19.6986C2.43002 19.6986 2.19002 19.5786 2.05002 19.3686C1.82002 19.0286 1.91002 18.5586 2.26002 18.3286L7.19002 15.0186C8.27002 14.2886 9.76002 14.3786 10.74 15.2086L11.07 15.4986C11.57 15.9286 12.42 15.9286 12.91 15.4986L17.07 11.9286C18.13 11.0186 19.8 11.0186 20.87 11.9286L22.5 13.3286C22.81 13.5986 22.85 14.0686 22.58 14.3886C22.31 14.6986 21.84 14.7386 21.52 14.4686L19.89 13.0686C19.39 12.6386 18.54 12.6386 18.04 13.0686L13.88 16.6386C12.82 17.5486 11.15 17.5486 10.08 16.6386L9.75002 16.3486C9.29002 15.9586 8.53002 15.9186 8.02002 16.2686L3.09002 19.5786C2.96002 19.6586 2.81002 19.6986 2.67002 19.6986Z"
                  fill="#00838F"
                />
              </svg>
              انتخاب آواتار:
            </div>
            <div className="flex items-center gap-4 w-5/6 bg-white rounded-lg p-4">
              <img
                src={
                  formik.values.avatar_id
                    ? showImgMedia
                    : "/images/common/DefaultAvatarPic.png"
                }
                className="w-44 h-44 rounded-full object-cover overflow-hidden"
                alt=""
              />
              <button
                type="button"
                onClick={(e) => setOpenImageModal(!OpenImageModal)}
                className="rounded bg-primary h-11 flex items-center gap-2 px-3 group text-white hover:bg-blacklead transition-colors duration-500"
              >
                <div className="flex flex-col items-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    fill="none"
                    viewBox="0 0 25 24"
                  >
                    <path
                      fill="#fff"
                      d="M5.615 21.52c-.61 0-1.18-.21-1.59-.6-.52-.49-.77-1.23-.68-2.03l.37-3.24c.07-.61.44-1.42.87-1.86l8.21-8.69c2.05-2.17 4.19-2.23 6.36-.18s2.23 4.19.18 6.36l-8.21 8.69c-.42.45-1.2.87-1.81.97l-3.22.55c-.17.01-.32.03-.48.03zm10.39-16.61c-.77 0-1.44.48-2.12 1.2l-8.21 8.7c-.2.21-.43.71-.47 1l-.37 3.24c-.04.33.04.6.22.77.18.17.45.23.78.18l3.22-.55c.29-.05.77-.31.97-.52l8.21-8.69c1.24-1.32 1.69-2.54-.12-4.24-.8-.77-1.49-1.09-2.11-1.09z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M17.415 12.95h-.07a6.86 6.86 0 01-6.11-5.78c-.06-.41.22-.79.63-.86.41-.06.79.22.86.63a5.372 5.372 0 004.78 4.52c.41.04.71.41.67.82-.05.38-.38.67-.76.67z"
                    ></path>
                  </svg>
                  <div className="bg-white h-[2px] rounded-full w-[2px] group-hover:w-full transition-all duration-500"></div>
                </div>
                ویرایش تصویر
              </button>
            </div>
          </div>
          {formik.errors.avatar_id && formik.touched.avatar_id && (
            <small className="text-red-700">{formik.errors.avatar_id}</small>
          )}
          <div className="w-full flex flex-row justify-center items-center gap-3">
            <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21.75H7C2.59 21.75 1.25 20.41 1.25 16V8C1.25 3.59 2.59 2.25 7 2.25H17C21.41 2.25 22.75 3.59 22.75 8V16C22.75 20.41 21.41 21.75 17 21.75ZM7 3.75C3.42 3.75 2.75 4.43 2.75 8V16C2.75 19.57 3.42 20.25 7 20.25H17C20.58 20.25 21.25 19.57 21.25 16V8C21.25 4.43 20.58 3.75 17 3.75H7Z"
                  fill="#00838F"
                />
                <path
                  d="M19 8.75H14C13.59 8.75 13.25 8.41 13.25 8C13.25 7.59 13.59 7.25 14 7.25H19C19.41 7.25 19.75 7.59 19.75 8C19.75 8.41 19.41 8.75 19 8.75Z"
                  fill="#00838F"
                />
                <path
                  d="M19 12.75H15C14.59 12.75 14.25 12.41 14.25 12C14.25 11.59 14.59 11.25 15 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75Z"
                  fill="#00838F"
                />
                <path
                  d="M19 16.75H17C16.59 16.75 16.25 16.41 16.25 16C16.25 15.59 16.59 15.25 17 15.25H19C19.41 15.25 19.75 15.59 19.75 16C19.75 16.41 19.41 16.75 19 16.75Z"
                  fill="#00838F"
                />
                <path
                  d="M8.49994 12.0419C7.08994 12.0419 5.93994 10.8919 5.93994 9.48187C5.93994 8.07187 7.08994 6.92188 8.49994 6.92188C9.90994 6.92188 11.0599 8.07187 11.0599 9.48187C11.0599 10.8919 9.90994 12.0419 8.49994 12.0419ZM8.49994 8.42188C7.91994 8.42188 7.43994 8.90187 7.43994 9.48187C7.43994 10.0619 7.91994 10.5419 8.49994 10.5419C9.07994 10.5419 9.55994 10.0619 9.55994 9.48187C9.55994 8.90187 9.07994 8.42188 8.49994 8.42188Z"
                  fill="#00838F"
                />
                <path
                  d="M11.9999 17.0817C11.6199 17.0817 11.2899 16.7917 11.2499 16.4017C11.1399 15.3217 10.2699 14.4517 9.17991 14.3517C8.71991 14.3117 8.25991 14.3117 7.79991 14.3517C6.70991 14.4517 5.83991 15.3117 5.72991 16.4017C5.68991 16.8117 5.31991 17.1217 4.90991 17.0717C4.49991 17.0317 4.19991 16.6617 4.23991 16.2517C4.41991 14.4517 5.84991 13.0217 7.65991 12.8617C8.20991 12.8117 8.76991 12.8117 9.31991 12.8617C11.1199 13.0317 12.5599 14.4617 12.7399 16.2517C12.7799 16.6617 12.4799 17.0317 12.0699 17.0717C12.0499 17.0817 12.0199 17.0817 11.9999 17.0817Z"
                  fill="#00838F"
                />
              </svg>
              نام:
            </div>
            <input
              className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
              placeholder="نام به فارسی"
              id="first_name"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.first_name && formik.touched.first_name && (
            <small className="text-red-700">{formik.errors.first_name}</small>
          )}
          <div className="w-full flex flex-row justify-center items-center gap-3">
            <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21.75H7C2.59 21.75 1.25 20.41 1.25 16V8C1.25 3.59 2.59 2.25 7 2.25H17C21.41 2.25 22.75 3.59 22.75 8V16C22.75 20.41 21.41 21.75 17 21.75ZM7 3.75C3.42 3.75 2.75 4.43 2.75 8V16C2.75 19.57 3.42 20.25 7 20.25H17C20.58 20.25 21.25 19.57 21.25 16V8C21.25 4.43 20.58 3.75 17 3.75H7Z"
                  fill="#00838F"
                />
                <path
                  d="M19 8.75H14C13.59 8.75 13.25 8.41 13.25 8C13.25 7.59 13.59 7.25 14 7.25H19C19.41 7.25 19.75 7.59 19.75 8C19.75 8.41 19.41 8.75 19 8.75Z"
                  fill="#00838F"
                />
                <path
                  d="M19 12.75H15C14.59 12.75 14.25 12.41 14.25 12C14.25 11.59 14.59 11.25 15 11.25H19C19.41 11.25 19.75 11.59 19.75 12C19.75 12.41 19.41 12.75 19 12.75Z"
                  fill="#00838F"
                />
                <path
                  d="M19 16.75H17C16.59 16.75 16.25 16.41 16.25 16C16.25 15.59 16.59 15.25 17 15.25H19C19.41 15.25 19.75 15.59 19.75 16C19.75 16.41 19.41 16.75 19 16.75Z"
                  fill="#00838F"
                />
                <path
                  d="M8.49994 12.0419C7.08994 12.0419 5.93994 10.8919 5.93994 9.48187C5.93994 8.07187 7.08994 6.92188 8.49994 6.92188C9.90994 6.92188 11.0599 8.07187 11.0599 9.48187C11.0599 10.8919 9.90994 12.0419 8.49994 12.0419ZM8.49994 8.42188C7.91994 8.42188 7.43994 8.90187 7.43994 9.48187C7.43994 10.0619 7.91994 10.5419 8.49994 10.5419C9.07994 10.5419 9.55994 10.0619 9.55994 9.48187C9.55994 8.90187 9.07994 8.42188 8.49994 8.42188Z"
                  fill="#00838F"
                />
                <path
                  d="M11.9999 17.0817C11.6199 17.0817 11.2899 16.7917 11.2499 16.4017C11.1399 15.3217 10.2699 14.4517 9.17991 14.3517C8.71991 14.3117 8.25991 14.3117 7.79991 14.3517C6.70991 14.4517 5.83991 15.3117 5.72991 16.4017C5.68991 16.8117 5.31991 17.1217 4.90991 17.0717C4.49991 17.0317 4.19991 16.6617 4.23991 16.2517C4.41991 14.4517 5.84991 13.0217 7.65991 12.8617C8.20991 12.8117 8.76991 12.8117 9.31991 12.8617C11.1199 13.0317 12.5599 14.4617 12.7399 16.2517C12.7799 16.6617 12.4799 17.0317 12.0699 17.0717C12.0499 17.0817 12.0199 17.0817 11.9999 17.0817Z"
                  fill="#00838F"
                />
              </svg>
              نام خانوادگی:
            </div>
            <input
              className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
              placeholder="نام خانوادگی به فارسی"
              id="last_name"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.last_name && formik.touched.last_name && (
            <small className="text-red-700">{formik.errors.last_name}</small>
          )}
          <div className="w-full flex flex-row justify-center items-center gap-3">
            <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                  fill="#00838F"
                />
                <path
                  d="M8.80999 18.2503C8.73999 18.2503 8.65999 18.2503 8.58999 18.2303L7.39999 18.0703C6.67999 17.9703 6.04999 17.3503 5.93999 16.6103L5.76999 15.4003C5.69999 14.9203 5.89999 14.3103 6.24999 13.9503L8.52999 11.6703C8.18999 10.0503 8.67999 8.37031 9.86999 7.19031C11.78 5.28031 14.9 5.28031 16.81 7.19031C17.74 8.12031 18.25 9.35031 18.25 10.6603C18.25 11.9703 17.74 13.2103 16.81 14.1303C15.62 15.3103 13.94 15.8003 12.33 15.4603L10.04 17.7403C9.74999 18.0503 9.25999 18.2503 8.80999 18.2503ZM13.34 7.25031C12.47 7.25031 11.59 7.58031 10.93 8.25031C10.03 9.15031 9.70999 10.4603 10.08 11.6803C10.16 11.9503 10.09 12.2303 9.88999 12.4303L7.30999 15.0103C7.28999 15.0403 7.24999 15.1503 7.24999 15.1903L7.41999 16.3903C7.42999 16.4503 7.53999 16.5603 7.59999 16.5703L8.79999 16.7403C8.84999 16.7303 8.94999 16.7103 8.97999 16.6803L11.57 14.0903C11.77 13.8903 12.06 13.8303 12.32 13.9103C13.53 14.2903 14.84 13.9703 15.74 13.0703C16.38 12.4303 16.74 11.5703 16.74 10.6603C16.74 9.75031 16.39 8.89031 15.74 8.25031C15.09 7.59031 14.21 7.25031 13.34 7.25031Z"
                  fill="#00838F"
                />
                <path
                  d="M10.45 17.0294C10.26 17.0294 10.07 16.9594 9.92003 16.8094L9.06003 15.9494C8.77003 15.6594 8.77003 15.1794 9.06003 14.8894C9.35003 14.5994 9.83003 14.5994 10.12 14.8894L10.98 15.7494C11.27 16.0394 11.27 16.5194 10.98 16.8094C10.84 16.9594 10.65 17.0294 10.45 17.0294Z"
                  fill="#00838F"
                />
                <path
                  d="M13.3801 11.8016C13.2401 11.8016 13.1101 11.7816 12.9901 11.7316C12.8701 11.6816 12.7601 11.6016 12.6701 11.5116C12.4801 11.3216 12.3701 11.0716 12.3701 10.8016C12.3701 10.5416 12.4801 10.2816 12.6701 10.1016C12.9001 9.86158 13.2501 9.75158 13.5701 9.82158C13.6301 9.84158 13.7001 9.85158 13.7601 9.88158C13.8201 9.91158 13.8801 9.94158 13.9301 9.97158C13.9801 10.0116 14.0401 10.0516 14.0801 10.1016C14.2701 10.2816 14.3801 10.5416 14.3801 10.8016C14.3801 10.9416 14.3501 11.0616 14.3001 11.1916C14.2501 11.3116 14.1801 11.4216 14.0801 11.5116C13.8901 11.7016 13.6401 11.8016 13.3801 11.8016Z"
                  fill="#00838F"
                />
              </svg>
              رمز عبور:
            </div>
            <input
              type="password"
              className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
              placeholder="حداقل 8 کاراکتر"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <small className="text-red-700">{formik.errors.password}</small>
          )}
          <div className="w-full flex flex-row justify-center items-center gap-3">
            <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                  fill="#00838F"
                />
                <path
                  d="M8.80999 18.2503C8.73999 18.2503 8.65999 18.2503 8.58999 18.2303L7.39999 18.0703C6.67999 17.9703 6.04999 17.3503 5.93999 16.6103L5.76999 15.4003C5.69999 14.9203 5.89999 14.3103 6.24999 13.9503L8.52999 11.6703C8.18999 10.0503 8.67999 8.37031 9.86999 7.19031C11.78 5.28031 14.9 5.28031 16.81 7.19031C17.74 8.12031 18.25 9.35031 18.25 10.6603C18.25 11.9703 17.74 13.2103 16.81 14.1303C15.62 15.3103 13.94 15.8003 12.33 15.4603L10.04 17.7403C9.74999 18.0503 9.25999 18.2503 8.80999 18.2503ZM13.34 7.25031C12.47 7.25031 11.59 7.58031 10.93 8.25031C10.03 9.15031 9.70999 10.4603 10.08 11.6803C10.16 11.9503 10.09 12.2303 9.88999 12.4303L7.30999 15.0103C7.28999 15.0403 7.24999 15.1503 7.24999 15.1903L7.41999 16.3903C7.42999 16.4503 7.53999 16.5603 7.59999 16.5703L8.79999 16.7403C8.84999 16.7303 8.94999 16.7103 8.97999 16.6803L11.57 14.0903C11.77 13.8903 12.06 13.8303 12.32 13.9103C13.53 14.2903 14.84 13.9703 15.74 13.0703C16.38 12.4303 16.74 11.5703 16.74 10.6603C16.74 9.75031 16.39 8.89031 15.74 8.25031C15.09 7.59031 14.21 7.25031 13.34 7.25031Z"
                  fill="#00838F"
                />
                <path
                  d="M10.45 17.0294C10.26 17.0294 10.07 16.9594 9.92003 16.8094L9.06003 15.9494C8.77003 15.6594 8.77003 15.1794 9.06003 14.8894C9.35003 14.5994 9.83003 14.5994 10.12 14.8894L10.98 15.7494C11.27 16.0394 11.27 16.5194 10.98 16.8094C10.84 16.9594 10.65 17.0294 10.45 17.0294Z"
                  fill="#00838F"
                />
                <path
                  d="M13.3801 11.8016C13.2401 11.8016 13.1101 11.7816 12.9901 11.7316C12.8701 11.6816 12.7601 11.6016 12.6701 11.5116C12.4801 11.3216 12.3701 11.0716 12.3701 10.8016C12.3701 10.5416 12.4801 10.2816 12.6701 10.1016C12.9001 9.86158 13.2501 9.75158 13.5701 9.82158C13.6301 9.84158 13.7001 9.85158 13.7601 9.88158C13.8201 9.91158 13.8801 9.94158 13.9301 9.97158C13.9801 10.0116 14.0401 10.0516 14.0801 10.1016C14.2701 10.2816 14.3801 10.5416 14.3801 10.8016C14.3801 10.9416 14.3501 11.0616 14.3001 11.1916C14.2501 11.3116 14.1801 11.4216 14.0801 11.5116C13.8901 11.7016 13.6401 11.8016 13.3801 11.8016Z"
                  fill="#00838F"
                />
              </svg>
              تکرار رمز عبور:
            </div>
            <input
              type="password"
              className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
              placeholder="حداقل 8 کاراکتر"
              id="password_confirmation"
              name="password_confirmation"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.password_confirmation &&
            formik.touched.password_confirmation && (
              <small className="text-red-700">
                {formik.errors.password_confirmation}
              </small>
            )}
          <div className="w-full flex flex-row justify-center items-center gap-3">
            <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 22.75H9C4.59 22.75 3.25 21.41 3.25 17V7C3.25 2.59 4.59 1.25 9 1.25H15C19.41 1.25 20.75 2.59 20.75 7V17C20.75 21.41 19.41 22.75 15 22.75ZM9 2.75C5.42 2.75 4.75 3.43 4.75 7V17C4.75 20.57 5.42 21.25 9 21.25H15C18.58 21.25 19.25 20.57 19.25 17V7C19.25 3.43 18.58 2.75 15 2.75H9Z"
                  fill="#00838F"
                />
                <path
                  d="M14 6.25H10C9.59 6.25 9.25 5.91 9.25 5.5C9.25 5.09 9.59 4.75 10 4.75H14C14.41 4.75 14.75 5.09 14.75 5.5C14.75 5.91 14.41 6.25 14 6.25Z"
                  fill="#00838F"
                />
                <path
                  d="M12 19.8617C10.73 19.8617 9.69995 18.8317 9.69995 17.5617C9.69995 16.2917 10.73 15.2617 12 15.2617C13.27 15.2617 14.3 16.2917 14.3 17.5617C14.3 18.8317 13.27 19.8617 12 19.8617ZM12 16.7517C11.56 16.7517 11.2 17.1117 11.2 17.5517C11.2 17.9917 11.56 18.3517 12 18.3517C12.44 18.3517 12.8 17.9917 12.8 17.5517C12.8 17.1117 12.44 16.7517 12 16.7517Z"
                  fill="#00838F"
                />
              </svg>
              شماره موبایل:
            </div>
            <input
              className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
              // type="number"
              placeholder="09"
              id="mobile_number"
              name="mobile_number"
              value={formik.values.mobile_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.mobile_number && formik.touched.mobile_number && (
            <small className="text-red-700">
              {formik.errors.mobile_number}
            </small>
          )}{" "}
          <div className="w-full flex flex-row justify-center items-center gap-3">
            <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
              <EmailOutlined
                color="#00838F"
                className="text-[#00838F] text-[24px]"
              />
              رایانامه
            </div>
            <input
              className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
              type="email"
              placeholder="info@admin.com"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <small className="text-red-700">{formik.errors.email}</small>
          )}
          <div className="w-full flex flex-row justify-center items-center gap-3">
            <div className="w-1/6 bg-white rounded-lg p-4 font-medium text-sm flex items-center gap-2 font-KalamehMed text-primary">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 22.7517H7.99998C3.37998 22.7517 2.51998 20.6017 2.29998 18.5117L1.54998 10.5017C1.43998 9.45172 1.40998 7.90172 2.44998 6.74172C3.34998 5.74172 4.83998 5.26172 6.99998 5.26172H17C19.17 5.26172 20.66 5.75172 21.55 6.74172C22.59 7.90172 22.56 9.45172 22.45 10.5117L21.7 18.5017C21.48 20.6017 20.62 22.7517 16 22.7517ZM6.99998 6.75172C5.30998 6.75172 4.14998 7.08172 3.55998 7.74172C3.06998 8.28172 2.90998 9.11172 3.03998 10.3517L3.78998 18.3617C3.95998 19.9417 4.38998 21.2517 7.99998 21.2517H16C19.6 21.2517 20.04 19.9417 20.21 18.3517L20.96 10.3617C21.09 9.11172 20.93 8.28172 20.44 7.74172C19.85 7.08172 18.69 6.75172 17 6.75172H6.99998Z"
                  fill="#00838F"
                />
                <path
                  d="M16 6.75C15.59 6.75 15.25 6.41 15.25 6V5.2C15.25 3.42 15.25 2.75 12.8 2.75H11.2C8.75 2.75 8.75 3.42 8.75 5.2V6C8.75 6.41 8.41 6.75 8 6.75C7.59 6.75 7.25 6.41 7.25 6V5.2C7.25 3.44 7.25 1.25 11.2 1.25H12.8C16.75 1.25 16.75 3.44 16.75 5.2V6C16.75 6.41 16.41 6.75 16 6.75Z"
                  fill="#00838F"
                />
                <path
                  d="M12 16.75C9.25 16.75 9.25 15.05 9.25 14.03V13C9.25 11.59 9.59 11.25 11 11.25H13C14.41 11.25 14.75 11.59 14.75 13V14C14.75 15.04 14.75 16.75 12 16.75ZM10.75 12.75C10.75 12.83 10.75 12.92 10.75 13V14.03C10.75 15.06 10.75 15.25 12 15.25C13.25 15.25 13.25 15.09 13.25 14.02V13C13.25 12.92 13.25 12.83 13.25 12.75C13.17 12.75 13.08 12.75 13 12.75H11C10.92 12.75 10.83 12.75 10.75 12.75Z"
                  fill="#00838F"
                />
                <path
                  d="M14 14.7683C13.63 14.7683 13.3 14.4883 13.26 14.1083C13.21 13.6983 13.5 13.3183 13.91 13.2683C16.55 12.9383 19.08 11.9383 21.21 10.3883C21.54 10.1383 22.01 10.2183 22.26 10.5583C22.5 10.8883 22.43 11.3583 22.09 11.6083C19.75 13.3083 16.99 14.3983 14.09 14.7683C14.06 14.7683 14.03 14.7683 14 14.7683Z"
                  fill="#00838F"
                />
                <path
                  d="M9.99999 14.7809C9.96999 14.7809 9.93999 14.7809 9.90999 14.7809C7.16999 14.4709 4.49999 13.4709 2.18999 11.8909C1.84999 11.6609 1.75999 11.1909 1.98999 10.8509C2.21999 10.5109 2.68999 10.4209 3.02999 10.6509C5.13999 12.0909 7.56999 13.0009 10.07 13.2909C10.48 13.3409 10.78 13.7109 10.73 14.1209C10.7 14.5009 10.38 14.7809 9.99999 14.7809Z"
                  fill="#00838F"
                />
              </svg>
              انتخاب نقش:
            </div>
            <SelectBox
              status={formik.values.role_id}
              getValue={(e) => getValue(e)}
              options={options}
              className="w-5/6"
              height="56px"
              loading={loading}
            />
          </div>
          <button
            className="bg-primary text-white rounded-[4px] font-Kalameh flex flex-row justify-center items-center gap-2 h-[44px]"
            type="button"
            onClick={formik.handleSubmit}
          >
            {addAdminMutataion.isLoading ? (
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

export default AddAdmin;
