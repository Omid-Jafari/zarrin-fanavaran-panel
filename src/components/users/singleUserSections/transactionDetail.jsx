import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";

const TransactionDetail = (props, ref) => {
  const {} = props;
  const [open, setOpen] = useState(false);
  const [transactionData, setTransactionData] = useState({});
  useImperativeHandle(ref, () => ({
    openModal(tran) {
      setOpen(!open);
      setTransactionData(tran);
    },
  }));
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(!open)}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-[8px] w-2/5  bg-white shadow-xl transition-all sm:my-8">
                <div className="bg-cyann w-full p-4 font-medium font-KalamehMed text-white">
                  تاریخچه تراکنش ها:
                </div>
                <div className="w-full flex flex-col items-start gap-4 p-4">
                  <div className="w-full bg-blue-lightt p-3 flex flex-col gap-3">
                    <div
                      className="w-full p-3 rounded-lg"
                      style={{
                        backgroundColor: transactionData?.status_info?.color,
                      }}
                    >{`${transactionData?.action_info?.name} - ${transactionData?.type_info?.name}(
                      ${transactionData?.status_info?.name})`}</div>
                    <div className="flex gap-3 w-full ">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#00838F"
                              d="M8 21.75h-.08a.751.751 0 01-.66-.83l2-18c.05-.41.42-.7.83-.66.41.05.71.42.66.83l-2 18c-.05.38-.37.66-.75.66zM14 21.75h-.08a.751.751 0 01-.66-.83l2-18c.05-.41.41-.7.83-.66.41.05.71.42.66.83l-2 18c-.05.38-.37.66-.75.66z"
                            ></path>
                            <path
                              fill="#00838F"
                              d="M21.5 9.75h-18c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75zM20.5 15.75h-18c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75z"
                            ></path>
                          </svg>
                          پیگیری تراکنش
                        </div>
                        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22.7504C8 22.7504 4.75 19.8804 4.75 16.3504V12.6504C4.75 12.2404 5.09 11.9004 5.5 11.9004C5.91 11.9004 6.25 12.2404 6.25 12.6504C6.25 15.2704 8.72 17.2504 12 17.2504C15.28 17.2504 17.75 15.2704 17.75 12.6504C17.75 12.2404 18.09 11.9004 18.5 11.9004C18.91 11.9004 19.25 12.2404 19.25 12.6504V16.3504C19.25 19.8804 16 22.7504 12 22.7504ZM6.25 16.4604C6.32 19.1104 8.87 21.2504 12 21.2504C15.13 21.2504 17.68 19.1104 17.75 16.4604C16.45 17.8704 14.39 18.7504 12 18.7504C9.61 18.7504 7.56 17.8704 6.25 16.4604Z"
                              fill="#00838F"
                            />
                            <path
                              d="M12 13.75C9.24 13.75 6.75999 12.51 5.54999 10.51C5.02999 9.66 4.75 8.67 4.75 7.65C4.75 5.93 5.52 4.31 6.91 3.09C8.27 1.9 10.08 1.25 12 1.25C13.92 1.25 15.72 1.9 17.09 3.08C18.48 4.31 19.25 5.93 19.25 7.65C19.25 8.67 18.97 9.65 18.45 10.51C17.24 12.51 14.76 13.75 12 13.75ZM12 2.75C10.44 2.75 8.98001 3.27 7.89001 4.23C6.83001 5.15 6.25 6.37 6.25 7.65C6.25 8.4 6.44999 9.1 6.82999 9.73C7.77999 11.29 9.76 12.25 12 12.25C14.24 12.25 16.22 11.28 17.17 9.73C17.56 9.1 17.75 8.4 17.75 7.65C17.75 6.37 17.17 5.15 16.1 4.21C15.01 3.27 13.56 2.75 12 2.75Z"
                              fill="#00838F"
                            />
                            <path
                              d="M12 18.75C7.87 18.75 4.75 16.13 4.75 12.65V7.65C4.75 4.12 8 1.25 12 1.25C13.92 1.25 15.72 1.9 17.09 3.08C18.48 4.31 19.25 5.93 19.25 7.65V12.65C19.25 16.13 16.13 18.75 12 18.75ZM12 2.75C8.83 2.75 6.25 4.95 6.25 7.65V12.65C6.25 15.27 8.72 17.25 12 17.25C15.28 17.25 17.75 15.27 17.75 12.65V7.65C17.75 6.37 17.17 5.15 16.1 4.21C15.01 3.27 13.56 2.75 12 2.75Z"
                              fill="#00838F"
                            />
                          </svg>
                          مبلغ تراکنش:
                        </div>
                        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#00838F"
                              d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
                            ></path>
                            <path
                              fill="#00838F"
                              d="M15.71 15.93a.67.67 0 01-.38-.11l-3.1-1.85c-.77-.46-1.34-1.47-1.34-2.36v-4.1c0-.41.34-.75.75-.75s.75.34.75.75v4.1c0 .36.3.89.61 1.07l3.1 1.85c.36.21.47.67.26 1.03a.77.77 0 01-.65.37z"
                            ></path>
                          </svg>
                          زمان تراکنش:
                        </div>
                        <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#00838F"
                              d="M19.42 11.75H16c-.41 0-.75-.34-.75-.75V4.01c0-.74.29-1.43.81-1.95s1.21-.81 1.95-.81h.01c1.25.01 2.43.5 3.33 1.39.9.91 1.39 2.11 1.39 3.36v2.42c.01 1.99-1.33 3.33-3.32 3.33zm-2.67-1.5h2.67c1.16 0 1.83-.67 1.83-1.83V6c0-.86-.34-1.68-.95-2.3-.61-.6-1.42-.94-2.28-.95h-.01c-.33 0-.65.13-.89.37s-.37.55-.37.89v6.24z"
                            ></path>
                            <path
                              fill="#00838F"
                              d="M9 23.33c-.47 0-.91-.18-1.24-.52L6.1 21.14a.246.246 0 00-.33-.02L4.06 22.4c-.53.4-1.23.47-1.83.17-.6-.3-.97-.9-.97-1.57V6c0-3.02 1.73-4.75 4.75-4.75h12c.41 0 .75.34.75.75s-.34.75-.75.75c-.69 0-1.25.56-1.25 1.25v17c0 .67-.37 1.27-.97 1.57-.59.3-1.3.23-1.83-.17l-1.71-1.28a.243.243 0 00-.32.02l-1.68 1.68c-.34.33-.78.51-1.25.51zm-3.09-3.76c.46 0 .91.17 1.25.52l1.66 1.67c.06.06.14.07.18.07.04 0 .12-.01.18-.07l1.68-1.68c.62-.62 1.6-.68 2.29-.15l1.7 1.27c.11.08.21.05.26.02.05-.03.14-.09.14-.22V4c0-.45.11-.88.3-1.25H6C3.78 2.75 2.75 3.78 2.75 6v15c0 .14.09.2.14.23.06.03.16.05.26-.03l1.71-1.28c.31-.23.68-.35 1.05-.35z"
                            ></path>
                            <path
                              fill="#00838F"
                              d="M12 9.75H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h6c.41 0 .75.34.75.75s-.34.75-.75.75zM11.25 13.75h-4.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.5c.41 0 .75.34.75.75s-.34.75-.75.75z"
                            ></path>
                          </svg>
                          بابت:
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
                          {transactionData?.reference_id}#
                        </div>
                        <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
                          {transactionData?.amount_prettified}
                          <span>تومان</span>
                        </div>
                        <div className="w-full flex gap-3 items-center">
                          <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
                            {transactionData?.jcreated_at?.split(" ")[1]}
                          </div>
                          <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
                            {transactionData?.jcreated_at?.split(" ")[0]}
                          </div>
                        </div>
                        <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
                          شماره ی سفارش #{transactionData?.related?.id}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex gap-1  bg-[#EFF1F1] font-semibold font-KalamehSemi rounded-lg hover:bg-[#E0E3E3] transition-colors duration-500 p-[10px] w-full items-center justify-center"
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default React.forwardRef(TransactionDetail);
