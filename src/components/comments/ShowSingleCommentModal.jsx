import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import CommentsRates from "./CommentsRates";

function ShowSingleCommentModal({}, ref) {
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal(id) {
      setOpen(true);
      singleCommentMutate.mutate(id);
    },
  }));
  return (
    <div className="w-full absolute ">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={setOpen}>
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

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-2/4 transition-all  flex flex-col items-start ">
                  <div className="bg-white  text-right shadow-xl rounded-[10px]  w-full flex flex-col p-5">
                    <div className="w-full bg-[#4FB3BF] h-[54px] rounded-[6px] flex flex-row gap-3 items-center p-3">
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.9 19.0098C16.59 19.0098 16.28 18.9197 16.01 18.7397L15.05 18.1097C14.78 17.9297 14.65 17.5898 14.74 17.2798C14.81 17.0498 14.84 16.7797 14.84 16.4797V12.4097C14.84 10.7797 13.82 9.75977 12.19 9.75977H5.39999C5.27999 9.75977 5.17 9.76978 5.06 9.77979C4.85 9.78979 4.65001 9.71977 4.49001 9.57977C4.33001 9.43977 4.25 9.23979 4.25 9.02979V6.25977C4.25 3.31977 6.31 1.25977 9.25 1.25977H17.75C20.69 1.25977 22.75 3.31977 22.75 6.25977V11.3597C22.75 12.8097 22.26 14.0897 21.36 14.9697C20.64 15.6997 19.64 16.1698 18.5 16.3098V17.4197C18.5 18.0197 18.17 18.5598 17.65 18.8398C17.41 18.9498 17.15 19.0098 16.9 19.0098ZM16.3 17.1298L16.95 17.4998C17.01 17.4698 17.01 17.4197 17.01 17.4097V15.5997C17.01 15.1897 17.35 14.8497 17.76 14.8497C18.81 14.8497 19.7 14.5198 20.31 13.8998C20.94 13.2798 21.26 12.3997 21.26 11.3497V6.24976C21.26 4.11976 19.89 2.74976 17.76 2.74976H9.25999C7.12999 2.74976 5.75999 4.11976 5.75999 6.24976V8.24976H12.2C14.64 8.24976 16.35 9.95978 16.35 12.3998V16.4697C16.34 16.6997 16.33 16.9198 16.3 17.1298Z"
                            fill="white"
                          />
                          <path
                            d="M6.07001 22.75C5.85001 22.75 5.62 22.7 5.41 22.59C4.94 22.34 4.64999 21.86 4.64999 21.32V20.56C3.76999 20.42 2.99 20.05 2.41 19.47C1.65 18.71 1.25 17.67 1.25 16.47V12.4C1.25 10.14 2.72999 8.48002 4.92999 8.27002C5.08999 8.26002 5.23999 8.25 5.39999 8.25H12.19C14.63 8.25 16.34 9.96002 16.34 12.4V16.47C16.34 16.91 16.29 17.32 16.18 17.69C15.73 19.49 14.2 20.62 12.19 20.62H9.7L6.87 22.5C6.63 22.67 6.35001 22.75 6.07001 22.75ZM5.39999 9.75C5.27999 9.75 5.17 9.76002 5.06 9.77002C3.62 9.90002 2.75 10.89 2.75 12.4V16.47C2.75 17.27 3 17.94 3.47 18.41C3.93 18.87 4.59999 19.12 5.39999 19.12C5.80999 19.12 6.14999 19.46 6.14999 19.87V21.18L9.05 19.25C9.17 19.17 9.32 19.12 9.47 19.12H12.19C13.51 19.12 14.44 18.46 14.73 17.3C14.8 17.05 14.84 16.77 14.84 16.47V12.4C14.84 10.77 13.82 9.75 12.19 9.75H5.39999Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <p className="text-white">دیدگاه</p>
                    </div>

                    {/* buttons */}
                    <div className="w-full flex flex-row justify-between items-center mt-5">
                      <button className=" justify-center font-Kalameh text-sm h-11 bg-[#DBEEF6] hover:bg-[#478F95] transition-colors duration-500 px-8 text-[#000000] rounded-[4px] flex items-center gap-1">
                        {/* {comment?.status_info?.name} */}
                        در انطار برسی
                      </button>

                      <button className=" justify-center font-Kalameh text-sm h-11 bg-[#DBEEF6] hover:bg-[#478F95] transition-colors duration-500 px-8 text-[#FF6B00] rounded-[4px] flex items-center gap-1">
                        {/* {comment?.status_info?.name} */}
                        گزارشات 0
                      </button>
                      <div className="">
                        <CommentsRates rate={4} />
                      </div>
                    </div>

                    <div className="w-full flex flex-col  mt-5 px-2">
                      {/* titile */}
                      <p className="text-[12px] text-black font-bold">
                        {" "}
                        موبایل / شیائومی / شیائومی 11t pro
                      </p>
                      <div className="flex flex-row gap-1 flex-nowrap mt-4">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.11971 8.715C9.09721 8.715 9.08221 8.715 9.05971 8.715C9.02221 8.7075 8.96971 8.7075 8.92471 8.715C6.74971 8.6475 5.10721 6.9375 5.10721 4.83C5.10721 2.685 6.85471 0.9375 8.99971 0.9375C11.1447 0.9375 12.8922 2.685 12.8922 4.83C12.8847 6.9375 11.2347 8.6475 9.14221 8.715C9.13471 8.715 9.12721 8.715 9.11971 8.715ZM8.99971 2.0625C7.47721 2.0625 6.23221 3.3075 6.23221 4.83C6.23221 6.33 7.40221 7.5375 8.89471 7.59C8.93221 7.5825 9.03721 7.5825 9.13471 7.59C10.6047 7.5225 11.7597 6.315 11.7672 4.83C11.7672 3.3075 10.5222 2.0625 8.99971 2.0625Z"
                            fill="#222427"
                          />
                          <path
                            d="M9.12721 16.9125C7.65721 16.9125 6.17971 16.5375 5.06221 15.7875C4.01971 15.0975 3.44971 14.1525 3.44971 13.125C3.44971 12.0975 4.01971 11.145 5.06221 10.4475C7.31221 8.955 10.9572 8.955 13.1922 10.4475C14.2272 11.1375 14.8047 12.0825 14.8047 13.11C14.8047 14.1375 14.2347 15.09 13.1922 15.7875C12.0672 16.5375 10.5972 16.9125 9.12721 16.9125ZM5.68471 11.3925C4.96471 11.8725 4.57471 12.4875 4.57471 13.1325C4.57471 13.77 4.97221 14.385 5.68471 14.8575C7.55221 16.11 10.7022 16.11 12.5697 14.8575C13.2897 14.3775 13.6797 13.7625 13.6797 13.1175C13.6797 12.48 13.2822 11.865 12.5697 11.3925C10.7022 10.1475 7.55221 10.1475 5.68471 11.3925Z"
                            fill="#222427"
                          />
                        </svg>

                        <p className="text-[12px] text-black font-bold whitespace-nowrap">
                          {" "}
                          {/* {comment?.user?.first_name} */}
                          ss
                        </p>
                      </div>
                      {/* name */}
                      <div className="w-full bg-[#DBEEF6] p-5 flex flex-col rounded-[6px] mt-5">
                        <p className="text-[14px] font-KalamehMed text-black">
                          عنوان دیدگاه:
                        </p>
                        <div className=" w-full  rounded-[6px] text-[14px] p-2 mt-2 border-[1px] border-black bg-[#EFF1F1] font-KalamehMed">
                          عالی بود این محصول
                        </div>
                      </div>

                      {/* discription */}
                      <div className="w-full bg-[#DBEEF6] p-5 gap-5 flex flex-row rounded-[6px] mt-5 text-[12px] text-[#222427] font-Kalameh">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
                        بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                        <span>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-all z-10 duration-500 ease-in-rotate ${
                              false
                                ? "-rotate-180 fill-[#fff]"
                                : "rotate-0 fill-black"
                            }`}
                          >
                            <path
                              d="M17.92 8.17969H11.69H6.07999C5.11999 8.17969 4.63999 9.33969 5.31999 10.0197L10.5 15.1997C11.33 16.0297 12.68 16.0297 13.51 15.1997L15.48 13.2297L18.69 10.0197C19.36 9.33969 18.88 8.17969 17.92 8.17969Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>

                      {/* pics */}
                      <div className="w-full flex flex-row gap-2">
                        <div className="w-[73px] h-[73px] overflow-hidden relative rounded-[10px] mt-5 ">
                          <img
                            className="w-full h-full"
                            src="https://zarinkala.com/storage/محصولات/1655275034ieusy-cellphone4.png"
                          />
                          <span className="absolute z-10 top-0 left-0 cursor-pointer">
                            <svg
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
                          </span>
                        </div>
                      </div>

                      <div className="w-full flex flex-row gap-5 mt-5">
                        <div className="w-1/2 bg-[#DBEEF6] rounded-[8px] p-3 flex flex-col">
                          <div className=" flex flex-row gap-3 items-center">
                            <span>
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
                            </span>
                            <p className="font-KalamehMed text-[#0C971A] text-[14px]">
                              نقاط مثبت
                            </p>
                          </div>
                          <div className="w-full mt-3 bg-white p-2 flex flex-row justify-start items-center text-[#222427] font-Kalameh rounded-[6px]">
                            خوش دست بودن
                          </div>{" "}
                          <div className="w-full mt-3 bg-white p-2 flex flex-row justify-start items-center text-[#222427] font-Kalameh rounded-[6px]">
                            خوش دست بودن
                          </div>{" "}
                          <div className="w-full mt-3 bg-white p-2 flex flex-row justify-start items-center text-[#222427] font-Kalameh rounded-[6px]">
                            خوش دست بودن
                          </div>
                        </div>

                        <div className="w-1/2 bg-[#DBEEF6] rounded-[8px] p-3 flex flex-col">
                          <div className=" flex flex-row gap-3 items-center">
                            <span>
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
                            </span>
                            <p className="font-KalamehMed text-[#EA3838] text-[14px]">
                              نقاط منفی
                            </p>
                          </div>
                          <div className="w-full mt-3 bg-white p-2 flex flex-row justify-start items-center text-[#222427] font-Kalameh rounded-[6px]">
                            خوش دست بودن
                          </div>{" "}
                          <div className="w-full mt-3 bg-white p-2 flex flex-row justify-start items-center text-[#222427] font-Kalameh rounded-[6px]">
                            خوش دست بودن
                          </div>{" "}
                          <div className="w-full mt-3 bg-white p-2 flex flex-row justify-start items-center text-[#222427] font-Kalameh rounded-[6px]">
                            خوش دست بودن
                          </div>
                        </div>
                      </div>
                      {/* status */}
                      <div className="w-full flex flex-row items-center justify-between p-3 rounded-[4px] bg-[#DBEEF6] mt-5">
                        <p className="text-[14px] text-black font-KalamehMed">
                          تغییر وضعیت به:
                        </p>
                        <div className="flex flex-row gap-3">
                          <button className=" justify-center font-Kalameh text-sm h-11 bg-[#4FB3BF] hover:bg-[#478F95] transition-colors duration-500 px-4 text-white rounded-[4px] flex items-center gap-1">
                            {/* {comment?.status_info?.name} */}
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
                          </button>

                          <button className=" justify-center font-Kalameh text-sm h-11 bg-[#CA3636] hover:bg-[#a30a0a] transition-colors duration-500 px-4 text-white rounded-[4px] flex items-center gap-1">
                            {/* {comment?.status_info?.name} */}
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"
                                fill="white"
                              />
                              <path
                                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                                fill="white"
                              />
                            </svg>
                            رد شود
                          </button>
                        </div>
                      </div>

{/* editBotton */}
                      <div className="w-full transition-all hover:bg-[#4FB3BF] duration-500 cursor-pointer bg-[#EFF1F1] rounded-[4px] p-3 mt-5 flex gap-1 flex-row text-[16px] justify-center items-center font-KalamehMed">
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
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default React.forwardRef(ShowSingleCommentModal);
