import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";

const TransactionHistory = (props, ref) => {
  const { openTransactionDetailModal } = props;
  const [open, setOpen] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  useImperativeHandle(ref, () => ({
    openModal(transaction) {
      setOpen(!open);
      setTransactionHistory(transaction);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-[8px] w-2/5  bg-white shadow-xl transition-all sm:my-8">
                <div
                  className="bg-blue-lightt w-fit p-2 rounded-bl-[22px] cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#222427"
                      d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
                    ></path>
                    <path
                      fill="#222427"
                      d="M9.17 15.58c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l5.66-5.66c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L9.7 15.36c-.14.15-.34.22-.53.22z"
                    ></path>
                    <path
                      fill="#222427"
                      d="M14.83 15.58c-.19 0-.38-.07-.53-.22L8.64 9.7a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l5.66 5.66c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
                    ></path>
                  </svg>
                </div>
                <div className="w-full flex flex-col gap-4 p-4">
                  {transactionHistory?.map((tran) => (
                    <div
                      className="w-full rounded-md bg-blue-lightt p-3 flex flex-col cursor-pointer"
                      onClick={() => openTransactionDetailModal(tran)}
                    >
                      <div className="w-full items-center flex justify-between">
                        <div
                          className=""
                          style={{ color: tran?.status_info?.color }}
                        >{`${tran?.action_info?.name} ${tran?.status_info?.name}`}</div>
                        <div className="">{tran?.amount_prettified} تومان</div>
                      </div>
                      <div className="w-full items-center flex justify-between text-sm">
                        <div className="">{`شماره ی پیگیری: ${tran?.reference_id}`}</div>
                        <div className="">
                          {tran?.jcreated_at?.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default React.forwardRef(TransactionHistory);
