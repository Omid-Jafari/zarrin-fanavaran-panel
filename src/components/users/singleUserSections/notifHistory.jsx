import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const NotifHistory = (props, ref) => {
  const {} = props;
  const [open, setOpen] = useState(false);
  const [stockNotifHistory, setStockNotifHistory] = useState([]);
  useImperativeHandle(ref, () => ({
    openModal(stockNotificationsData) {
      setOpen(!open);
      setStockNotifHistory(stockNotificationsData);
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
                      d="M12 10.5195C11.59 10.5195 11.25 10.1795 11.25 9.76945V6.43945C11.25 6.02945 11.59 5.68945 12 5.68945C12.41 5.68945 12.75 6.02945 12.75 6.43945V9.76945C12.75 10.1895 12.41 10.5195 12 10.5195Z"
                      fill="#fff"
                    />
                    <path
                      d="M12.0199 20.3502C9.43987 20.3502 6.86987 19.9402 4.41987 19.1202C3.50987 18.8202 2.81987 18.1702 2.51987 17.3502C2.21987 16.5302 2.31987 15.5902 2.80987 14.7702L4.07987 12.6502C4.35987 12.1802 4.60987 11.3002 4.60987 10.7502V8.65023C4.60987 4.56023 7.92987 1.24023 12.0199 1.24023C16.1099 1.24023 19.4299 4.56023 19.4299 8.65023V10.7502C19.4299 11.2902 19.6799 12.1802 19.9599 12.6502L21.2299 14.7702C21.6999 15.5502 21.7799 16.4802 21.4699 17.3302C21.1599 18.1802 20.4799 18.8302 19.6199 19.1202C17.1699 19.9502 14.5999 20.3502 12.0199 20.3502ZM12.0199 2.75023C8.75987 2.75023 6.10987 5.40023 6.10987 8.66023V10.7602C6.10987 11.5702 5.78987 12.7402 5.36987 13.4302L4.09987 15.5602C3.83987 15.9902 3.77987 16.4502 3.92987 16.8502C4.07987 17.2502 4.41987 17.5502 4.89987 17.7102C9.49987 19.2402 14.5599 19.2402 19.1599 17.7102C19.5899 17.5702 19.9199 17.2502 20.0699 16.8302C20.2299 16.4102 20.1799 15.9502 19.9499 15.5602L18.6799 13.4402C18.2599 12.7502 17.9399 11.5802 17.9399 10.7702V8.67023C17.9299 5.40023 15.2799 2.75023 12.0199 2.75023Z"
                      fill="#fff"
                    />
                    <path
                      d="M11.9999 22.9003C10.9299 22.9003 9.87992 22.4603 9.11992 21.7003C8.35992 20.9403 7.91992 19.8903 7.91992 18.8203H9.41992C9.41992 19.5003 9.69992 20.1603 10.1799 20.6403C10.6599 21.1203 11.3199 21.4003 11.9999 21.4003C13.4199 21.4003 14.5799 20.2403 14.5799 18.8203H16.0799C16.0799 21.0703 14.2499 22.9003 11.9999 22.9003Z"
                      fill="#fff"
                    />
                  </svg>
                  لست اطلاع رسانی ها:
                </div>
                {stockNotifHistory?.map((notif) => (
                  <div
                    className={`w-full p-3 rounded-lg flex gap-5 text-xs font-medium font-KalamehMed bg-blue-lightt items-center min-h-[40px]`}
                  >
                    <div className="w-full">{notif?.message}</div>
                  </div>
                ))}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default React.forwardRef(NotifHistory);
