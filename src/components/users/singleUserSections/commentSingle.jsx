import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  approveComment,
  editComment,
  singleComment,
} from "../../../api/ApiClient";
import Loading from "../../elements/loading";
import * as Yup from "yup";
import { useFormik } from "formik";
import RejectComment from "./rejectComment";
import CommentImageHandle from "./commentImageHandle";
import ReportsHandle from "./reportsHandle";

const CommentSingle = (props, ref) => {
  const {} = props;
  const [open, setOpen] = useState(false);
  const [disableForm, setDisableForm] = useState(true);
  const rejectCommentModal = useRef();
  const reportCommentModal = useRef();
  const deletedMediaModal = useRef();
  const [commentData, setCommentData] = useState([]);
  const openReject = () => {
    rejectCommentModal.current.openModal();
  };
  const openReport = () => {
    reportCommentModal.current.openModal();
  };
  const openDeletedMediaModal = (id) => {
    deletedMediaModal.current.openModal(id);
  };
  const closeDeletedMediaModal = () => {
    deletedMediaModal.current.closeModal();
  };
  const singleCommentMutate = useMutation(singleComment, {
    onSuccess: (res) => {
      setCommentData(res?.data?.data);
    },
  });
  const editCommentMutate = useMutation(
    (data) => editComment(commentData?.id, data),
    {
      onSuccess: (res) => {
        setDisableForm(true);
        singleCommentMutate.mutate(commentData?.id);
        closeDeletedMediaModal();
      },
    }
  );
  const approveCommentMutate = useMutation(approveComment, {
    onSuccess: () => {
      setOpen(false);
    },
  });
  useImperativeHandle(ref, () => ({
    openModal(id) {
      setOpen(!open);
      singleCommentMutate.mutate(id);
    },
  }));
  const formik = useFormik({
    initialValues: {
      title: commentData?.title,
      body: commentData?.body,
      strengths: commentData?.strengths,
      weaknesses: commentData?.weaknesses,
      deleted_media_ids: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      // national_code:
      //   edit.national_code &&
      //   Yup.number().required("لطفا کد ملی را وارد کنید").nullable(),
      // first_name:
      //   edit.name && Yup.string().required("لطفا نام یوزر را وارد کنید"),
      // last_name:
      //   edit.name && Yup.string().required("لطفا نام یوزر را وارد کنید"),
      // born_at:
      //   edit.born_at &&
      //   Yup.string().required("لطفا تاریخ تولد یوزر را وارد کنید"),
    }),

    onSubmit: (data) => {
      editCommentMutate.mutate(data);
    },
  });
  return (
    <>
      <RejectComment
        ref={rejectCommentModal}
        singleCommentMutate={singleCommentMutate}
        id={commentData?.id}
        formik={formik}
      />
      <CommentImageHandle
        ref={deletedMediaModal}
        media={commentData?.media?.attachment}
        formik={formik}
        editCommentMutate={editCommentMutate}
      />
      <ReportsHandle
        ref={reportCommentModal}
        user={commentData?.user}
        reports={commentData?.reports}
        formik={formik}
        editCommentMutate={editCommentMutate}
      />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => setOpen(!open)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-[8px] w-1/2 bg-white shadow-xl transition-all items-start sm:my-8 p-5 flex flex-col gap-5">
                  {/* <button
                    onClick={() => setOpen(false)}
                    className="flex gap-1 mr-auto bg-[#EFF1F1] font-semibold font-KalamehSemi rounded-lg hover:bg-[#E0E3E3] transition-colors duration-500 p-[10px] "
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
                  </button> */}
                  <div className="rounded-md p-3 flex gap-2 items-center bg-cyann text-white w-full">
                    {disableForm ? (
                      <>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.9 19.0098C16.59 19.0098 16.28 18.9197 16.01 18.7397L15.05 18.1097C14.78 17.9297 14.65 17.5898 14.74 17.2798C14.81 17.0498 14.84 16.7797 14.84 16.4797V12.4097C14.84 10.7797 13.82 9.75977 12.19 9.75977H5.39999C5.27999 9.75977 5.17 9.76978 5.06 9.77979C4.85 9.78979 4.65001 9.71977 4.49001 9.57977C4.33001 9.43977 4.25 9.23979 4.25 9.02979V6.25977C4.25 3.31977 6.31 1.25977 9.25 1.25977H17.75C20.69 1.25977 22.75 3.31977 22.75 6.25977V11.3597C22.75 12.8097 22.26 14.0897 21.36 14.9697C20.64 15.6997 19.64 16.1698 18.5 16.3098V17.4197C18.5 18.0197 18.17 18.5598 17.65 18.8398C17.41 18.9498 17.15 19.0098 16.9 19.0098ZM16.3 17.1298L16.95 17.4998C17.01 17.4698 17.01 17.4197 17.01 17.4097V15.5997C17.01 15.1897 17.35 14.8497 17.76 14.8497C18.81 14.8497 19.7 14.5198 20.31 13.8998C20.94 13.2798 21.26 12.3997 21.26 11.3497V6.24976C21.26 4.11976 19.89 2.74976 17.76 2.74976H9.25999C7.12999 2.74976 5.75999 4.11976 5.75999 6.24976V8.24976H12.2C14.64 8.24976 16.35 9.95978 16.35 12.3998V16.4697C16.34 16.6997 16.33 16.9198 16.3 17.1298Z"
                            fill="#fff"
                          />
                          <path
                            d="M6.07001 22.75C5.85001 22.75 5.62 22.7 5.41 22.59C4.94 22.34 4.64999 21.86 4.64999 21.32V20.56C3.76999 20.42 2.99 20.05 2.41 19.47C1.65 18.71 1.25 17.67 1.25 16.47V12.4C1.25 10.14 2.72999 8.48002 4.92999 8.27002C5.08999 8.26002 5.23999 8.25 5.39999 8.25H12.19C14.63 8.25 16.34 9.96002 16.34 12.4V16.47C16.34 16.91 16.29 17.32 16.18 17.69C15.73 19.49 14.2 20.62 12.19 20.62H9.7L6.87 22.5C6.63 22.67 6.35001 22.75 6.07001 22.75ZM5.39999 9.75C5.27999 9.75 5.17 9.76002 5.06 9.77002C3.62 9.90002 2.75 10.89 2.75 12.4V16.47C2.75 17.27 3 17.94 3.47 18.41C3.93 18.87 4.59999 19.12 5.39999 19.12C5.80999 19.12 6.14999 19.46 6.14999 19.87V21.18L9.05 19.25C9.17 19.17 9.32 19.12 9.47 19.12H12.19C13.51 19.12 14.44 18.46 14.73 17.3C14.8 17.05 14.84 16.77 14.84 16.47V12.4C14.84 10.77 13.82 9.75 12.19 9.75H5.39999Z"
                            fill="#fff"
                          />
                        </svg>
                        دیدگاه
                      </>
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
                            d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                            fill="white"
                          />
                          <path
                            d="M8.49984 17.6905C7.88984 17.6905 7.32984 17.4705 6.91984 17.0705C6.42984 16.5805 6.21984 15.8705 6.32984 15.1205L6.75984 12.1105C6.83984 11.5305 7.21984 10.7805 7.62984 10.3705L15.5098 2.49055C17.4998 0.500547 19.5198 0.500547 21.5098 2.49055C22.5998 3.58055 23.0898 4.69055 22.9898 5.80055C22.8998 6.70055 22.4198 7.58055 21.5098 8.48055L13.6298 16.3605C13.2198 16.7705 12.4698 17.1505 11.8898 17.2305L8.87984 17.6605C8.74984 17.6905 8.61984 17.6905 8.49984 17.6905ZM16.5698 3.55055L8.68984 11.4305C8.49984 11.6205 8.27984 12.0605 8.23984 12.3205L7.80984 15.3305C7.76984 15.6205 7.82984 15.8605 7.97984 16.0105C8.12984 16.1605 8.36984 16.2205 8.65984 16.1805L11.6698 15.7505C11.9298 15.7105 12.3798 15.4905 12.5598 15.3005L20.4398 7.42055C21.0898 6.77055 21.4298 6.19055 21.4798 5.65055C21.5398 5.00055 21.1998 4.31055 20.4398 3.54055C18.8398 1.94055 17.7398 2.39055 16.5698 3.55055Z"
                            fill="white"
                          />
                          <path
                            d="M19.8501 9.83027C19.7801 9.83027 19.7101 9.82027 19.6501 9.80027C17.0201 9.06027 14.9301 6.97027 14.1901 4.34027C14.0801 3.94027 14.3101 3.53027 14.7101 3.41027C15.1101 3.30027 15.5201 3.53027 15.6301 3.93027C16.2301 6.06027 17.9201 7.75027 20.0501 8.35027C20.4501 8.46027 20.6801 8.88027 20.5701 9.28027C20.4801 9.62027 20.1801 9.83027 19.8501 9.83027Z"
                            fill="white"
                          />
                        </svg>
                        ویرایش دیدگاه
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-auto cursor-pointer"
                          onClick={() => setDisableForm(true)}
                        >
                          <path
                            d="M9.56994 18.8191C9.37994 18.8191 9.18994 18.7491 9.03994 18.5991L2.96994 12.5291C2.67994 12.2391 2.67994 11.7591 2.96994 11.4691L9.03994 5.39914C9.32994 5.10914 9.80994 5.10914 10.0999 5.39914C10.3899 5.68914 10.3899 6.16914 10.0999 6.45914L4.55994 11.9991L10.0999 17.5391C10.3899 17.8291 10.3899 18.3091 10.0999 18.5991C9.95994 18.7491 9.75994 18.8191 9.56994 18.8191Z"
                            fill="white"
                          />
                          <path
                            d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z"
                            fill="white"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                  {singleCommentMutate?.isLoading ? (
                    <div className="w-full flex justify-center">
                      <Loading className="w-20 h-20 text-blacklead animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <div className="w-full flex justify-between items-center ">
                        <div className="px-3 py-2 bg-blue-lightt rounded-md h-10 flex items-center text-sm">
                          {commentData?.status_info?.name}
                        </div>
                        <button
                          onClick={openReport}
                          className="px-3 py-2 bg-blue-lightt rounded-md h-10 flex items-center text-sm text-[#FF6B00]"
                        >
                          گزارشات : {commentData?.reports?.length}
                        </button>
                        <div
                          className={`px-3 py-2 bg-cyann rounded-md h-10 flex flex-row-reverse items-center gap-1 overflow-hidden ${
                            disableForm ? "opacity-100" : "opacity-50"
                          }`}
                        >
                          {Array.from([1, 2, 3, 4, 5]).map((item, index) =>
                            commentData?.rate > index ? (
                              <svg
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.7896 2.59356L15.5286 8.73756L22.2176 9.44406C22.6481 9.48956 22.8211 10.0231 22.4996 10.3126L17.5031 14.8151L18.8986 21.3956C18.9886 21.8191 18.5346 22.1486 18.1596 21.9326L12.3331 18.5711L6.50659 21.9321C6.13159 22.1481 5.67809 21.8186 5.76759 21.3951L7.16309 14.8146L2.16659 10.3121C1.84509 10.0226 2.01859 9.48906 2.44859 9.44356L9.13759 8.73706L11.8766 2.59306C12.0526 2.19806 12.6136 2.19806 12.7896 2.59356Z"
                                  fill="url(#paint0_linear_5331_41868)"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_5331_41868"
                                    x1="4.83759"
                                    y1="3.18056"
                                    x2="19.3791"
                                    y2="22.6336"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#FFDA1C" />
                                    <stop offset="1" stop-color="#FEB705" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            ) : (
                              <svg
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.59425 6.94065L10.333 0.797293L13.0719 6.94115L13.1893 7.20451L13.4761 7.2348L20.1647 7.94126L15.1684 12.4436L14.9541 12.6367L15.014 12.9188L16.4095 19.4993L16.4095 19.4995L16.4094 19.4995L16.4091 19.4993L10.5829 16.138L10.3331 15.9938L10.0832 16.138L4.25702 19.4988L4.25677 19.4984L5.6522 12.9183L5.71203 12.6362L5.49779 12.4431L0.501442 7.94076L7.1901 7.2343L7.47685 7.20401L7.59425 6.94065Z"
                                  stroke="url(#paint0_linear_5289_41875)"
                                />
                                <defs>
                                  <linearGradient
                                    id="paint0_linear_5289_41875"
                                    x1="2.83758"
                                    y1="1.18056"
                                    x2="17.3791"
                                    y2="20.6336"
                                    gradientUnits="userSpaceOnUse"
                                  >
                                    <stop stop-color="#FFDA1C" />
                                    <stop offset="1" stop-color="#FEB705" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            )
                          )}
                        </div>
                      </div>
                      <div className="text-sm ">
                        {commentData?.related?.name}
                      </div>
                      <div className="w-full flex items-center gap-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.1596 11.62C12.1296 11.62 12.1096 11.62 12.0796 11.62C12.0296 11.61 11.9596 11.61 11.8996 11.62C8.99957 11.53 6.80957 9.25 6.80957 6.44C6.80957 3.58 9.13957 1.25 11.9996 1.25C14.8596 1.25 17.1896 3.58 17.1896 6.44C17.1796 9.25 14.9796 11.53 12.1896 11.62C12.1796 11.62 12.1696 11.62 12.1596 11.62ZM11.9996 2.75C9.96957 2.75 8.30957 4.41 8.30957 6.44C8.30957 8.44 9.86957 10.05 11.8596 10.12C11.9096 10.11 12.0496 10.11 12.1796 10.12C14.1396 10.03 15.6796 8.42 15.6896 6.44C15.6896 4.41 14.0296 2.75 11.9996 2.75Z"
                            fill="#222427"
                          />
                          <path
                            d="M12.1696 22.55C10.2096 22.55 8.23961 22.05 6.74961 21.05C5.35961 20.13 4.59961 18.87 4.59961 17.5C4.59961 16.13 5.35961 14.86 6.74961 13.93C9.74961 11.94 14.6096 11.94 17.5896 13.93C18.9696 14.85 19.7396 16.11 19.7396 17.48C19.7396 18.85 18.9796 20.12 17.5896 21.05C16.0896 22.05 14.1296 22.55 12.1696 22.55ZM7.57961 15.19C6.61961 15.83 6.09961 16.65 6.09961 17.51C6.09961 18.36 6.62961 19.18 7.57961 19.81C10.0696 21.48 14.2696 21.48 16.7596 19.81C17.7196 19.17 18.2396 18.35 18.2396 17.49C18.2396 16.64 17.7096 15.82 16.7596 15.19C14.2696 13.53 10.0696 13.53 7.57961 15.19Z"
                            fill="#222427"
                          />
                        </svg>
                        {commentData?.user?.full_name} :
                      </div>
                      <div className="w-full bg-blue-lightt p-4 rounded-lg flex flex-col gap-2">
                        <label className="text-sm">عنوان دیدگاه :</label>
                        <input
                          disabled={disableForm}
                          type="text"
                          className="rounded-lg outline-0 border border-black bg-white disabled:bg-[#EFF1F1] p-2 h-11"
                          placeholder="عنوان"
                          id="title"
                          name="title"
                          value={formik.values?.title}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.title && formik.touched.title && (
                          <div className="text-red-600 text-sm">
                            {formik.errors.title}
                          </div>
                        )}
                      </div>
                      <textarea
                        disabled={disableForm}
                        className="bg-blue-lightt rounded-lg w-full p-4 outline-none"
                        rows={3}
                        placeholder="بدنه"
                        id="body"
                        name="body"
                        value={formik.values?.body}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.body && formik.touched.body && (
                        <div className="text-red-600 text-sm">
                          {formik.errors.body}
                        </div>
                      )}
                      <div className="w-full flex flex-wrap gap-3 items-center">
                        {commentData?.media?.attachment?.map((img) => (
                          <div
                            onClick={() => openDeletedMediaModal(img?.id)}
                            className="rounded-md overflow-hidden relative cursor-pointer"
                          >
                            <svg
                              className="absolute top-0 left-0 cursor-pointer z-10"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 0H18V12C18 15.3137 15.3137 18 12 18H0V0Z"
                                fill="#EA3838"
                              />
                              <rect
                                x="4"
                                y="8"
                                width="10"
                                height="2"
                                rx="1"
                                fill="white"
                              />
                            </svg>

                            <img
                              src={img?.file}
                              className="max-h-[70px] w-[70px] object-contain"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start gap-3 w-full ">
                        <div className="w-1/2 flex flex-col gap-3 p-3 bg-blue-lightt rounded-lg ">
                          <span className="flex items-center gap-2 text-[#0C971A]">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"
                                fill="#0C971A"
                              />
                              <path
                                d="M12 16.75C11.59 16.75 11.25 16.41 11.25 16V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V16C12.75 16.41 12.41 16.75 12 16.75Z"
                                fill="#0C971A"
                              />
                              <path
                                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                                fill="#0C971A"
                              />
                            </svg>
                            نقاط مثبت
                          </span>
                          {formik.values?.strengths?.map((strength, index) => (
                            <input
                              disabled={disableForm}
                              className="p-2 rounded-lg outline-none bg-white  border border-black disabled:border-transparent"
                              name={strength}
                              id={strength}
                              value={strength}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "strengths",
                                  formik.values?.strengths?.map((str, i) => {
                                    if (index === i) {
                                      return `${e.target.value}`;
                                    } else {
                                      return str;
                                    }
                                  })
                                )
                              }
                            />
                          ))}
                        </div>
                        <div className="w-1/2 flex flex-col gap-3 p-3 bg-blue-lightt rounded-lg ">
                          <span className="flex items-center gap-2 text-[#EA3838]">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H16.5C16.91 11.25 17.25 11.59 17.25 12C17.25 12.41 16.91 12.75 16.5 12.75Z"
                                fill="#EA3838"
                              />
                              <path
                                d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H15.5C20.93 1.25 23.25 3.57 23.25 9V15C23.25 20.43 20.93 22.75 15.5 22.75ZM9.5 2.75C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V9C21.75 4.39 20.11 2.75 15.5 2.75H9.5Z"
                                fill="#EA3838"
                              />
                            </svg>
                            نقاط منفی
                          </span>
                          {formik.values?.weaknesses?.map((weakness, index) => (
                            <input
                              disabled={disableForm}
                              className="p-2 rounded-lg outline-none bg-white  border border-black disabled:border-transparent"
                              name={weakness}
                              id={weakness}
                              value={weakness}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "weaknesses",
                                  formik.values?.weaknesses?.map((weak, i) => {
                                    if (index === i) {
                                      return `${e.target.value}`;
                                    } else {
                                      return weak;
                                    }
                                  })
                                )
                              }
                            />
                          ))}
                        </div>
                      </div>
                      {disableForm && (
                        <div className="w-full bg-blue-lightt rounded p-3 flex items-center gap-3 ">
                          <p className="font-medium font-KalamehMed text-sm">
                            تغییر وضعیت به :
                          </p>
                          <button
                            onClick={() => {
                              approveCommentMutate.mutate(commentData?.id);
                            }}
                            className="flex py-3 gap-2 transition-colors w-28 h-11 justify-center duration-300 items-center text-white font-medium font-KalamehMed text-sm rounded bg-primary hover:bg-blacklead mr-auto"
                          >
                            {approveCommentMutate?.isLoading ? (
                              <Loading className="w-10 h-10 text-white animate-pulse" />
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
                                    d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M10.5799 15.5796C10.3799 15.5796 10.1899 15.4996 10.0499 15.3596L7.21994 12.5296C6.92994 12.2396 6.92994 11.7596 7.21994 11.4696C7.50994 11.1796 7.98994 11.1796 8.27994 11.4696L10.5799 13.7696L15.7199 8.62961C16.0099 8.33961 16.4899 8.33961 16.7799 8.62961C17.0699 8.91961 17.0699 9.39961 16.7799 9.68961L11.1099 15.3596C10.9699 15.4996 10.7799 15.5796 10.5799 15.5796Z"
                                    fill="white"
                                  />
                                </svg>
                                منتشر شود
                              </>
                            )}
                          </button>
                          <button
                            onClick={
                              openReject
                              // formik.handleSubmit();
                              // rejectCommentMutate.mutate(commentData?.id);
                            }
                            className="flex py-3 gap-2 transition-colors w-28 h-11 justify-center duration-300 items-center text-white font-medium font-KalamehMed text-sm rounded bg-[#CA3636] hover:bg-[#d85454] "
                          >
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H16.5C16.91 11.25 17.25 11.59 17.25 12C17.25 12.41 16.91 12.75 16.5 12.75Z"
                                fill="#fff"
                              />
                              <path
                                d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H15.5C20.93 1.25 23.25 3.57 23.25 9V15C23.25 20.43 20.93 22.75 15.5 22.75ZM9.5 2.75C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V9C21.75 4.39 20.11 2.75 15.5 2.75H9.5Z"
                                fill="#fff"
                              />
                            </svg>
                            رد شود
                          </button>
                        </div>
                      )}
                      {disableForm ? (
                        <button
                          onClick={() => setDisableForm(false)}
                          className="w-full rounded py-3 flex justify-center gap-2 bg-[#EFF1F1] font-medium font-KalamehMed "
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                              fill="#222427"
                            />
                            <path
                              d="M8.49984 17.6905C7.88984 17.6905 7.32984 17.4705 6.91984 17.0705C6.42984 16.5805 6.21984 15.8705 6.32984 15.1205L6.75984 12.1105C6.83984 11.5305 7.21984 10.7805 7.62984 10.3705L15.5098 2.49055C17.4998 0.500547 19.5198 0.500547 21.5098 2.49055C22.5998 3.58055 23.0898 4.69055 22.9898 5.80055C22.8998 6.70055 22.4198 7.58055 21.5098 8.48055L13.6298 16.3605C13.2198 16.7705 12.4698 17.1505 11.8898 17.2305L8.87984 17.6605C8.74984 17.6905 8.61984 17.6905 8.49984 17.6905ZM16.5698 3.55055L8.68984 11.4305C8.49984 11.6205 8.27984 12.0605 8.23984 12.3205L7.80984 15.3305C7.76984 15.6205 7.82984 15.8605 7.97984 16.0105C8.12984 16.1605 8.36984 16.2205 8.65984 16.1805L11.6698 15.7505C11.9298 15.7105 12.3798 15.4905 12.5598 15.3005L20.4398 7.42055C21.0898 6.77055 21.4298 6.19055 21.4798 5.65055C21.5398 5.00055 21.1998 4.31055 20.4398 3.54055C18.8398 1.94055 17.7398 2.39055 16.5698 3.55055Z"
                              fill="#222427"
                            />
                            <path
                              d="M19.8501 9.83027C19.7801 9.83027 19.7101 9.82027 19.6501 9.80027C17.0201 9.06027 14.9301 6.97027 14.1901 4.34027C14.0801 3.94027 14.3101 3.53027 14.7101 3.41027C15.1101 3.30027 15.5201 3.53027 15.6301 3.93027C16.2301 6.06027 17.9201 7.75027 20.0501 8.35027C20.4501 8.46027 20.6801 8.88027 20.5701 9.28027C20.4801 9.62027 20.1801 9.83027 19.8501 9.83027Z"
                              fill="#222427"
                            />
                          </svg>
                          ویرایش متن
                        </button>
                      ) : (
                        <button
                          onClick={() => formik.handleSubmit()}
                          className="w-full rounded py-3 flex justify-center gap-2 bg-primary text-white font-medium font-KalamehMed "
                        >
                          تایید ویرایش
                        </button>
                      )}
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default React.forwardRef(CommentSingle);
