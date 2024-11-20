import { Dialog, Transition } from "@headlessui/react";
import React, { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMutation } from "@tanstack/react-query";

import Loading from "../elements/loading";
import { rejectQuestion } from "../../api/ApiClient";

const QuestionRejectModal = (props, ref) => {
  const { singleCommentMutate, id, formik } = props;
  const [rejectingModal, setRejectingModal] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal() {
      setRejectingModal(!rejectingModal);
    },
  }));
  const rejectQuestionMutate = useMutation((data) => rejectQuestion(id, data), {
    onSuccess: () => {
      singleCommentMutate.mutate(id);
      setRejectingModal(false);
      rejectFormik.resetForm();
    },
  });
  const rejectFormik = useFormik({
    initialValues: { reject_reason: "" },
    validationSchema: Yup.object({
      reject_reason: Yup.string().required("لطفا علت را مشخص کنید"),
    }),

    onSubmit: (data) => {
      formik.handleSubmit();
      rejectQuestionMutate.mutate(data);
    },
  });
  return (
    <Transition.Root show={rejectingModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setRejectingModal(!rejectingModal)}
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
              <Dialog.Panel className="relative transform rounded-[8px] w-1/3 bg-white shadow-xl transition-all sm:my-8">
                <div className="bg-cyann w-full p-4 font-medium font-KalamehMed text-white">
                  مشخص کردن دلیل رد شدن
                </div>
                <div className="w-full flex gap-4 p-5 flex-col">
                  <div className="w-full flex gap-5 items-start justify-between">
                    <p className="font-medium font-KalamehMed w-14">علت:</p>
                    <div className="flex-1 flex bg-[#DBEEF6] rounded-lg">
                      <textarea
                        className="bg-blue-lightt rounded-lg w-full p-3 outline-none"
                        rows={3}
                        placeholder="اوه او قوانین رو رعایت نکرده"
                        id="reject_reason"
                        name="reject_reason"
                        value={rejectFormik.values?.reject_reason}
                        onBlur={rejectFormik.handleBlur}
                        onChange={rejectFormik.handleChange}
                      ></textarea>
                    </div>
                  </div>
                  {rejectFormik.errors.reject_reason &&
                    rejectFormik.touched.reject_reason && (
                      <div className="text-red-600 w-full text-sm">
                        {rejectFormik.errors.reject_reason}
                      </div>
                    )}
                  <div className="w-full flex items-center justify-end gap-3">
                    <button
                      onClick={rejectFormik.handleSubmit}
                      className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 w-24 text-white rounded-[4px] font-KalamehMed font-medium"
                    >
                      {rejectQuestionMutate?.isLoading ? (
                        <Loading className="w-10 h-10 text-white animate-pulse" />
                      ) : (
                        "تایید"
                      )}
                    </button>
                    <button
                      onClick={() => setRejectingModal(false)}
                      className="font-KalamehMed font-medium h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 w-24 rounded-[4px] flex items-center justify-center gap-1"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default React.forwardRef(QuestionRejectModal);
