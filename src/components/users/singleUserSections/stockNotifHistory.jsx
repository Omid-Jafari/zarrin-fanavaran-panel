import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const StockNotifHistory = (props, ref) => {
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
                      d="M12.0201 2.91016C8.71009 2.91016 6.02009 5.60016 6.02009 8.91016V11.8002C6.02009 12.4102 5.76009 13.3402 5.45009 13.8602L4.30009 15.7702C3.59009 16.9502 4.08009 18.2602 5.38009 18.7002C9.69009 20.1402 14.3401 20.1402 18.6501 18.7002C19.8601 18.3002 20.3901 16.8702 19.7301 15.7702L18.5801 13.8602C18.2801 13.3402 18.0201 12.4102 18.0201 11.8002V8.91016C18.0201 5.61016 15.3201 2.91016 12.0201 2.91016Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                    />
                    <path
                      d="M13.8699 3.19945C13.5599 3.10945 13.2399 3.03945 12.9099 2.99945C11.9499 2.87945 11.0299 2.94945 10.1699 3.19945C10.4599 2.45945 11.1799 1.93945 12.0199 1.93945C12.8599 1.93945 13.5799 2.45945 13.8699 3.19945Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.02 19.0605C15.02 20.7105 13.67 22.0605 12.02 22.0605C11.2 22.0605 10.44 21.7205 9.90002 21.1805C9.36002 20.6405 9.02002 19.8805 9.02002 19.0605"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                    />
                  </svg>
                  لیست خبرنامه محصول
                </div>
                {stockNotifHistory?.map((stockNotif) => (
                  <div className="w-full rounded-md bg-blue-lightt p-4 flex items-center gap-4">
                    <img
                      src={stockNotif?.product_item?.color?.media?.icon?.file}
                      title={stockNotif?.product_item?.color?.name_fa}
                      className="w-16 h-16 object-contain"
                      alt=""
                    />
                    <div
                      className="line-clamp-1 text-sm font-medium font-KalamehMed"
                      title={stockNotif?.product_item?.product?.name_fa}
                    >
                      {stockNotif?.product_item?.product?.name_fa}
                    </div>
                    <Link
                      to="#"
                      className=" flex gap-2 items-center rounded bg-primary text-white fill-white h-11 px-3 justify-center hover:bg-blacklead transition-colors duration-500 flex-grow-0 flex-shrink-0 text-sm mr-auto"
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9999 16.8299C9.60992 16.8299 7.66992 14.8899 7.66992 12.4999C7.66992 10.1099 9.60992 8.16992 11.9999 8.16992C14.3899 8.16992 16.3299 10.1099 16.3299 12.4999C16.3299 14.8899 14.3899 16.8299 11.9999 16.8299ZM11.9999 9.66992C10.4399 9.66992 9.16992 10.9399 9.16992 12.4999C9.16992 14.0599 10.4399 15.3299 11.9999 15.3299C13.5599 15.3299 14.8299 14.0599 14.8299 12.4999C14.8299 10.9399 13.5599 9.66992 11.9999 9.66992Z"
                          fill="white"
                        />
                        <path
                          d="M12.0001 21.5205C8.24008 21.5205 4.69008 19.3205 2.25008 15.5005C1.19008 13.8505 1.19008 11.1605 2.25008 9.50047C4.70008 5.68047 8.25008 3.48047 12.0001 3.48047C15.7501 3.48047 19.3001 5.68047 21.7401 9.50047C22.8001 11.1505 22.8001 13.8405 21.7401 15.5005C19.3001 19.3205 15.7501 21.5205 12.0001 21.5205ZM12.0001 4.98047C8.77008 4.98047 5.68008 6.92047 3.52008 10.3105C2.77008 11.4805 2.77008 13.5205 3.52008 14.6905C5.68008 18.0805 8.77008 20.0205 12.0001 20.0205C15.2301 20.0205 18.3201 18.0805 20.4801 14.6905C21.2301 13.5205 21.2301 11.4805 20.4801 10.3105C18.3201 6.92047 15.2301 4.98047 12.0001 4.98047Z"
                          fill="white"
                        />
                      </svg>
                      مشاهده محصول
                    </Link>
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

export default React.forwardRef(StockNotifHistory);
