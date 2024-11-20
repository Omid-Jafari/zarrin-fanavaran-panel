import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import {
  approveComment,
  editComment,
  singleComment,
} from "../../api/ApiClient";
import Loading from "../elements/loading";
import * as Yup from "yup";
import { useFormik } from "formik";

const LogSingleModal = (props, ref) => {
  const {} = props;
  const [open, setOpen] = useState(false);
  const [disableForm, setDisableForm] = useState(true);
  const [commentData, setCommentData] = useState([]);
  const singleCommentMutate = useMutation(singleComment, {
    onSuccess: (res) => {
      setCommentData(res?.data?.data);
    },
  });
  useImperativeHandle(ref, () => ({
    openModal(data) {
      setOpen(!open);
      setCommentData(data);
    },
  }));
  return (
    <>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[8px] w-4/5 bg-blue-lightt shadow-xl transition-all items-start sm:my-8 p-5 flex flex-col gap-5">
                  <div className="rounded-md p-3 flex gap-2 items-center bg-cyann text-white w-full">
                    جزئیات لاگ
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-auto cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      {console.log("commentData", commentData?.log)}
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.17004 14.8319L14.83 9.17188"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.83 14.8319L9.17004 9.17188"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="w-full flex gap-4">
                    <div className="bg-white rounded-lg w-1/2 p-4 flex flex-col items-start gap-5">
                      {commentData?.log?.attributes &&
                        Object.entries(commentData?.log?.attributes)?.map(
                          (attr) => (
                            <div className="flex flex-col gap-3 w-full text-sm font-medium font-KalamehMed items-start">
                              <div className="min-w-[40%] rounded h-11 bg-blue-lightt flex items-center px-3 text-primary ">
                                {attr[0]}
                              </div>
                              <div className="w-full rounded h-11 bg-blue-lightt flex items-center px-3">
                                {attr[1]}
                              </div>
                            </div>
                          )
                        )}
                    </div>
                    <div className="bg-white rounded-lg w-1/2 p-4 flex flex-col items-start gap-5">
                      {commentData?.log?.old &&
                        Object.entries(commentData?.log?.old)?.map((old) => (
                          <div className="flex flex-col gap-3 w-full text-sm font-medium font-KalamehMed items-start">
                            <div className="min-w-[40%] rounded h-11 flex items-center px-3 text-primary "></div>
                            <div className="w-full rounded h-11 bg-blue-lightt flex items-center px-3">
                              {old[1]}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default React.forwardRef(LogSingleModal);
