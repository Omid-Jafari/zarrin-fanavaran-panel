import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import CommentSingle from "./CommentSingle";

const CommentHistory = (props, ref) => {
  const {} = props;
  const [open, setOpen] = useState(false);
  const [commentHistory, setCommentHistory] = useState([]);
  useImperativeHandle(ref, () => ({
    openModal(commentsData) {
      setOpen(!open);
      setCommentHistory(commentsData);
    },
  }));
  const commentSingleModal = useRef();
  const openCommentSingleModal = (id) => {
    commentSingleModal.current.openModal(id);
  };
  return (
    <>
      <CommentSingle ref={commentSingleModal} />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[8px] w-2/5 bg-white shadow-xl transition-all items-end sm:my-8 p-5 flex flex-col gap-4">
                  <button
                    onClick={() => setOpen(false)}
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
                  <div className="rounded-md p-3 flex gap-2 items-center bg-cyann text-white w-full">
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
                    دیدگاه و پرسش و پاسخ ها
                  </div>
                  {commentHistory?.map((comment) => (
                    <div
                      onClick={() => openCommentSingleModal(comment?.id)}
                      className={`w-full p-3 justify-center flex-col min-h-[50px] rounded-lg flex gap-2 text-xs font-medium font-KalamehMed bg-blue-lightt cursor-pointer `}
                    >
                      <div className="w-full gap-3 flex justify-between items-center">
                        <p className="">{comment?.related?.name}</p>
                        <p className="text-cyann">
                          {comment?.created_at_for_humans}
                        </p>
                      </div>
                      <div className="w-full flex justify-between items-center font-light font-Kalameh text-blacklead">
                        {comment?.title}
                      </div>
                      <div className="mr-auto cursor-pointer">
                        <svg
                          width="49"
                          height="49"
                          viewBox="0 0 49 49"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_dd_4820_44519)">
                            <rect
                              x="3"
                              y="3"
                              width="44"
                              height="44"
                              rx="4"
                              fill="white"
                              shape-rendering="crispEdges"
                            />
                            <path
                              d="M24.9999 29.3299C22.6099 29.3299 20.6699 27.3899 20.6699 24.9999C20.6699 22.6099 22.6099 20.6699 24.9999 20.6699C27.3899 20.6699 29.3299 22.6099 29.3299 24.9999C29.3299 27.3899 27.3899 29.3299 24.9999 29.3299ZM24.9999 22.1699C23.4399 22.1699 22.1699 23.4399 22.1699 24.9999C22.1699 26.5599 23.4399 27.8299 24.9999 27.8299C26.5599 27.8299 27.8299 26.5599 27.8299 24.9999C27.8299 23.4399 26.5599 22.1699 24.9999 22.1699Z"
                              fill="#4FB3BF"
                            />
                            <path
                              d="M25.0001 34.0205C21.2401 34.0205 17.6901 31.8205 15.2501 28.0005C14.1901 26.3505 14.1901 23.6605 15.2501 22.0005C17.7001 18.1805 21.2501 15.9805 25.0001 15.9805C28.7501 15.9805 32.3001 18.1805 34.7401 22.0005C35.8001 23.6505 35.8001 26.3405 34.7401 28.0005C32.3001 31.8205 28.7501 34.0205 25.0001 34.0205ZM25.0001 17.4805C21.7701 17.4805 18.6801 19.4205 16.5201 22.8105C15.7701 23.9805 15.7701 26.0205 16.5201 27.1905C18.6801 30.5805 21.7701 32.5205 25.0001 32.5205C28.2301 32.5205 31.3201 30.5805 33.4801 27.1905C34.2301 26.0205 34.2301 23.9805 33.4801 22.8105C31.3201 19.4205 28.2301 17.4805 25.0001 17.4805Z"
                              fill="#222427"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_dd_4820_44519"
                              x="0"
                              y="0"
                              width="49"
                              height="49"
                              filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dx="-1" dy="-1" />
                              <feGaussianBlur stdDeviation="1" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.0622569 0 0 0 0 0.0881375 0 0 0 0 0.0916667 0 0 0 0.15 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_4820_44519"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dx="1" dy="1" />
                              <feGaussianBlur stdDeviation="0.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.67 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="effect1_dropShadow_4820_44519"
                                result="effect2_dropShadow_4820_44519"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect2_dropShadow_4820_44519"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  ))}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default React.forwardRef(CommentHistory);
