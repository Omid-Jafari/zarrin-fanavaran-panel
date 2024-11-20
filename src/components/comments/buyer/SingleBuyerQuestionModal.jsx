import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import * as Yup from "yup";
import { useFormik } from "formik";

import {
  approveComment,
  approveQuestion,
  editComment,
  singleComment,
  singleQuestion,
} from "../../../api/ApiClient";
import Loading from "../../elements/loading";
import QuestionRejectModal from "./../QuestionRejectModal";
import EditQuestionModal from "./../EditQuestionModal";

const SingleBuyerQuestionModal = (props, ref) => {
  const [open, setOpen] = useState(false);
  const rejectCommentModal = useRef();
  const EditQuestionModalRef = useRef();
  const [questionData, setQuestionData] = useState([]);
  const openReject = () => {
    rejectCommentModal.current.openModal();
  };
  const singleQuestionMutate = useMutation((id) => singleQuestion(id), {
    onSuccess: (res) => {
      setQuestionData(res?.data?.data);
    },
  });
  const editCommentMutate = useMutation(
    (data) => editComment(questionData?.id, data),
    {
      onSuccess: (res) => {},
    }
  );
  const approveQuestionMutate = useMutation((id) => approveQuestion(id), {
    onSuccess: () => {
      setOpen(false);
    },
  });
  useImperativeHandle(ref, () => ({
    openModal(id) {
      console.log("VDsvsdvsdv", id);
      setOpen(!open);
      singleQuestionMutate.mutate(id);
    },
  }));

  const formik = useFormik({
    initialValues: {
      title: questionData?.title,
      body: questionData?.body,
      strengths: questionData?.strengths,
      weaknesses: questionData?.weaknesses,
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

  const OpenQuestionModal = () => {
    EditQuestionModalRef.current.openModal(questionData);
  };
  const updateEditedData = (id) => {
    console.log("cascascascascasc");
    singleQuestionMutate.mutate(id);
  };
  return (
    <>
      <QuestionRejectModal
        ref={rejectCommentModal}
        singleCommentMutate={singleQuestionMutate}
        id={questionData?.id}
        formik={formik}
      />
      <EditQuestionModal
        updateData={(id) => updateEditedData(id)}
        ref={EditQuestionModalRef}
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
                  <div className="rounded-md p-3 flex gap-1 items-center bg-cyann text-white w-full">
                    <div className="flex flex-row gap-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 22.3194C7.72 22.3194 7.42998 22.2494 7.16998 22.1094C6.59998 21.8094 6.25 21.2094 6.25 20.5694V19.1495C3.23 18.8395 1.25 16.6194 1.25 13.4394V7.43945C1.25 3.99945 3.56 1.68945 7 1.68945H17C20.44 1.68945 22.75 3.99945 22.75 7.43945V13.4394C22.75 16.8794 20.44 19.1894 17 19.1894H13.23L8.96997 22.0295C8.67997 22.2195 8.34 22.3194 8 22.3194ZM7 3.17944C4.42 3.17944 2.75 4.84944 2.75 7.42944V13.4295C2.75 16.0095 4.42 17.6795 7 17.6795C7.41 17.6795 7.75 18.0195 7.75 18.4295V20.5595C7.75 20.6895 7.83 20.7495 7.88 20.7795C7.93 20.8095 8.03001 20.8395 8.14001 20.7695L12.59 17.8095C12.71 17.7295 12.86 17.6795 13.01 17.6795H17.01C19.59 17.6795 21.26 16.0095 21.26 13.4295V7.42944C21.26 4.84944 19.59 3.17944 17.01 3.17944H7V3.17944Z"
                          fill="white"
                        />
                        <path
                          d="M11.9998 12.1094C11.5898 12.1094 11.2498 11.7694 11.2498 11.3594V11.1494C11.2498 9.98941 12.0998 9.4194 12.4198 9.1994C12.7898 8.9494 12.9098 8.77941 12.9098 8.51941C12.9098 8.01941 12.4998 7.60938 11.9998 7.60938C11.4998 7.60938 11.0898 8.01941 11.0898 8.51941C11.0898 8.92941 10.7498 9.26941 10.3398 9.26941C9.92984 9.26941 9.58984 8.92941 9.58984 8.51941C9.58984 7.18941 10.6698 6.10938 11.9998 6.10938C13.3298 6.10938 14.4098 7.18941 14.4098 8.51941C14.4098 9.65941 13.5698 10.2294 13.2598 10.4394C12.8698 10.6994 12.7498 10.8694 12.7498 11.1494V11.3594C12.7498 11.7794 12.4098 12.1094 11.9998 12.1094Z"
                          fill="white"
                        />
                        <path
                          d="M12 14.5996C11.58 14.5996 11.25 14.2596 11.25 13.8496C11.25 13.4396 11.59 13.0996 12 13.0996C12.41 13.0996 12.75 13.4396 12.75 13.8496C12.75 14.2596 12.42 14.5996 12 14.5996Z"
                          fill="white"
                        />
                      </svg>
                       سئوال از خریدار
                    </div>

                    <button
                      onClick={() => setOpen(false)}
                      className="flex gap-1 mr-auto bg-cyann font-semibold font-KalamehSemi rounded-lg hover:bg-[#E0E3E3] transition-colors duration-500 p-[10px] "
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.56994 19.3191C9.37994 19.3191 9.18994 19.2491 9.03994 19.0991L2.96994 13.0291C2.67994 12.7391 2.67994 12.2591 2.96994 11.9691L9.03994 5.89914C9.32994 5.60914 9.80994 5.60914 10.0999 5.89914C10.3899 6.18914 10.3899 6.66914 10.0999 6.95914L4.55994 12.4991L10.0999 18.0391C10.3899 18.3291 10.3899 18.8091 10.0999 19.0991C9.95994 19.2491 9.75994 19.3191 9.56994 19.3191Z"
                          fill="#ffffff"
                        />
                        <path
                          d="M20.4999 13.25H3.66992C3.25992 13.25 2.91992 12.91 2.91992 12.5C2.91992 12.09 3.25992 11.75 3.66992 11.75H20.4999C20.9099 11.75 21.2499 12.09 21.2499 12.5C21.2499 12.91 20.9099 13.25 20.4999 13.25Z"
                          fill="#ffffff"
                        />
                      </svg>
                    </button>
                  </div>
                  {singleQuestionMutate?.isLoading ? (
                    <div className="w-full flex justify-center">
                      <Loading className="w-20 h-20 text-blacklead animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <div className="w-full flex justify-between items-center ">
                        <div className="px-3 py-2 bg-blue-lightt rounded-md h-10 flex items-center text-sm">
                          {questionData?.status_info?.name}
                        </div>
                      </div>
                      <div className="text-sm ">
                        {questionData?.related?.name}
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
                        {questionData?.user?.full_name} :
                      </div>
                      {/* <div className="w-full bg-blue-lightt p-4 rounded-lg flex flex-col gap-2">
                        <label className="text-sm">عنوان دیدگاه :</label>
                        <input
                          type="text"
                          className="rounded-lg outline-0 border border-black bg-[#EFF1F1] p-2 h-11"
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
                      </div> */}
                      <textarea
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

                      <div className="w-full bg-blue-lightt rounded p-3 flex items-center gap-3 ">
                        <p className="font-medium font-KalamehMed text-sm">
                          تغییر وضعیت به :
                        </p>
                        <button
                          onClick={() => {
                            formik.handleSubmit();
                            approveQuestionMutate.mutate(questionData?.id);
                          }}
                          className="flex py-3 gap-2 transition-colors w-28 h-11 justify-center duration-300 items-center text-white font-medium font-KalamehMed text-sm rounded bg-primary hover:bg-blacklead mr-auto"
                        >
                          {approveQuestionMutate?.isLoading ? (
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
                      {/* editBotton */}
                      <div
                        className="w-full transition-all hover:bg-[#4FB3BF] duration-500 cursor-pointer bg-[#EFF1F1] rounded-[4px] p-3  flex gap-1 flex-row text-[16px] justify-center items-center font-KalamehMed"
                        onClick={OpenQuestionModal}
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
                      </div>
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

export default React.forwardRef(SingleBuyerQuestionModal);
