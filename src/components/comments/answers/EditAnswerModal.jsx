import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { FieldArray, FormikProvider, useFormik } from "formik";
import React from "react";
import { useImperativeHandle } from "react";
import { Fragment } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { editAnswer, editQuestion } from "../../../api/ApiClient";
import Loading from "../../elements/loading";

function EditAnswerModal({updateData}, ref) {
  const [open, setOpen] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const editQuestionMutation = useMutation(
    (data) => editAnswer(questionData?.id, data),
    {
      onSuccess: (res) => {
        updateData(questionData?.id)
        setOpen(false)
      },
    }
  );

  const formik = useFormik({
    initialValues: questionData,
    onSubmit: (data) => {
      editQuestionMutation.mutate(data);
      console.log("SDvsdvsdvsd", data);
    },
  });
  useImperativeHandle(ref, () => ({
    openModal(questionData) {
      setOpen(!open);
      formik.setValues(questionData);
      setQuestionData(questionData);
      console.log("DSvdsvsdvs", questionData);
    },
  }));

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={() => setOpen(!open)}>
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
                <div className="rounded-md p-3 flex gap-2 items-center bg-cyann text-white w-full">
                  <div className="flex flex-row gap-4">
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
                        d="M8.50008 17.6905C7.89008 17.6905 7.33008 17.4705 6.92008 17.0705C6.43008 16.5805 6.22008 15.8705 6.33008 15.1205L6.76008 12.1105C6.84008 11.5305 7.22008 10.7805 7.63008 10.3705L15.5101 2.49055C17.5001 0.500547 19.5201 0.500547 21.5101 2.49055C22.6001 3.58055 23.0901 4.69055 22.9901 5.80055C22.9001 6.70055 22.4201 7.58055 21.5101 8.48055L13.6301 16.3605C13.2201 16.7705 12.4701 17.1505 11.8901 17.2305L8.88008 17.6605C8.75008 17.6905 8.62008 17.6905 8.50008 17.6905ZM16.5701 3.55055L8.69008 11.4305C8.50008 11.6205 8.28008 12.0605 8.24008 12.3205L7.81008 15.3305C7.77008 15.6205 7.83008 15.8605 7.98008 16.0105C8.13008 16.1605 8.37008 16.2205 8.66008 16.1805L11.6701 15.7505C11.9301 15.7105 12.3801 15.4905 12.5601 15.3005L20.4401 7.42055C21.0901 6.77055 21.4301 6.19055 21.4801 5.65055C21.5401 5.00055 21.2001 4.31055 20.4401 3.54055C18.8401 1.94055 17.7401 2.39055 16.5701 3.55055Z"
                        fill="white"
                      />
                      <path
                        d="M19.8501 9.83027C19.7801 9.83027 19.7101 9.82027 19.6501 9.80027C17.0201 9.06027 14.9301 6.97027 14.1901 4.34027C14.0801 3.94027 14.3101 3.53027 14.7101 3.41027C15.1101 3.30027 15.5201 3.53027 15.6301 3.93027C16.2301 6.06027 17.9201 7.75027 20.0501 8.35027C20.4501 8.46027 20.6801 8.88027 20.5701 9.28027C20.4801 9.62027 20.1801 9.83027 19.8501 9.83027Z"
                        fill="white"
                      />
                    </svg>
                    ویرایش پاسخ
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
                
                  <div className=" flex flex-col w-full">
                    <div className="bg-[#DBEEF6] rounded-[6px] p-4">
                      <div className="flex flex-row justify-between items-center ">
                        <p className="text-[#222427] ">متن پاسخ:</p>
                        <div className="text-[#222427] flex flex-row gap-2 cursor-pointer"
                            onClick={()=>navigator.clipboard.writeText(formik.values?.body).then(res=>
                                toast.success("با موفقیت کپی شد")
                                )}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.1 22.75H6.9C2.99 22.75 1.25 21.01 1.25 17.1V12.9C1.25 8.99 2.99 7.25 6.9 7.25H11.1C15.01 7.25 16.75 8.99 16.75 12.9V17.1C16.75 21.01 15.01 22.75 11.1 22.75ZM6.9 8.75C3.8 8.75 2.75 9.8 2.75 12.9V17.1C2.75 20.2 3.8 21.25 6.9 21.25H11.1C14.2 21.25 15.25 20.2 15.25 17.1V12.9C15.25 9.8 14.2 8.75 11.1 8.75H6.9Z"
                              fill="#222427"
                            />
                            <path
                              d="M17.1 16.75H16C15.59 16.75 15.25 16.41 15.25 16V12.9C15.25 9.8 14.2 8.75 11.1 8.75H8C7.59 8.75 7.25 8.41 7.25 8V6.9C7.25 2.99 8.99 1.25 12.9 1.25H17.1C21.01 1.25 22.75 2.99 22.75 6.9V11.1C22.75 15.01 21.01 16.75 17.1 16.75ZM16.75 15.25H17.1C20.2 15.25 21.25 14.2 21.25 11.1V6.9C21.25 3.8 20.2 2.75 17.1 2.75H12.9C9.8 2.75 8.75 3.8 8.75 6.9V7.25H11.1C15.01 7.25 16.75 8.99 16.75 12.9V15.25Z"
                              fill="#222427"
                            />
                          </svg>
                          کپی متن در کلیپبورد
                        </div>
                      </div>

                      <textarea
                        className="bg-[#FFFFFF] border-[1px] border-[#717C94] text-[#222427] rounded-lg w-full p-4 outline-none mt-6"
                        rows={8}
                        placeholder="بدنه"
                        id="body"
                        name="body"
                        value={formik.values?.body}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />

                    
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 flex flex-row justify-center items-center font-Kalameh text-white rounded-[3px] text-[14px] bg-[#00838F]"
                      onClick={formik.handleSubmit}
                    >
                      {editQuestionMutation.isLoading ? (
                        <Loading className="w-12  text-white animate-pulse" />
                      ) : (
                        <p className="p-3"> تایید ویرایش</p>
                      )}
                    </button>
                  </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default React.forwardRef(EditAnswerModal);
