import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const WishListHistory = (props, ref) => {
  const {} = props;
  const [open, setOpen] = useState(false);
  const [wishListHistory, setWishListHistory] = useState([]);
  useImperativeHandle(ref, () => ({
    openModal(transaction) {
      setOpen(!open);
      setWishListHistory(transaction);
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
                      d="M17.1999 22.7504C15.2599 22.7504 13.4399 21.7204 12.4499 20.0504C11.9299 19.2104 11.6499 18.2104 11.6499 17.2004C11.6499 14.1404 14.1399 11.6504 17.1999 11.6504C20.2599 11.6504 22.7499 14.1404 22.7499 17.2004C22.7499 18.2204 22.4699 19.2104 21.9399 20.0704C20.9599 21.7204 19.1399 22.7504 17.1999 22.7504ZM17.1999 13.1504C14.9699 13.1504 13.1499 14.9704 13.1499 17.2004C13.1499 17.9404 13.3499 18.6604 13.7299 19.2804C14.4699 20.5204 15.7599 21.2504 17.1999 21.2504C18.6399 21.2504 19.9299 20.5203 20.6599 19.2903C21.0499 18.6603 21.2499 17.9404 21.2499 17.2004C21.2499 14.9704 19.4299 13.1504 17.1999 13.1504Z"
                      fill="#fff"
                    />
                    <path
                      d="M16.51 19.1298C16.32 19.1298 16.13 19.0598 15.98 18.9098L14.8 17.7298C14.51 17.4398 14.51 16.9598 14.8 16.6698C15.09 16.3798 15.57 16.3798 15.86 16.6698L16.53 17.3398L18.56 15.4598C18.87 15.1798 19.34 15.1998 19.62 15.4998C19.9 15.7998 19.88 16.2798 19.58 16.5598L17.02 18.9198C16.88 19.0698 16.69 19.1298 16.51 19.1298Z"
                      fill="#fff"
                    />
                    <path
                      d="M12 21.6497C11.69 21.6497 11.38 21.6097 11.13 21.5197C8.57 20.6497 1.25 16.4096 1.25 8.68964C1.25 5.18964 4.08 2.34961 7.56 2.34961C9.22 2.34961 10.83 3.01964 12 4.18964C13.17 3.01964 14.78 2.34961 16.44 2.34961C19.92 2.34961 22.75 5.18964 22.75 8.68964C22.75 10.6396 22.28 12.5096 21.35 14.2596C21.24 14.4696 21.03 14.6197 20.79 14.6497C20.55 14.6797 20.31 14.5996 20.14 14.4196C19.36 13.5996 18.32 13.1396 17.2 13.1396C14.97 13.1396 13.15 14.9596 13.15 17.1896C13.15 18.1796 13.52 19.1396 14.19 19.8896C14.35 20.0696 14.41 20.3096 14.36 20.5396C14.31 20.7696 14.15 20.9696 13.94 21.0696C13.54 21.2496 13.18 21.3996 12.85 21.5096C12.61 21.6096 12.31 21.6497 12 21.6497ZM7.56 3.84961C4.91 3.84961 2.75 6.01964 2.75 8.68964C2.75 15.5296 9.32 19.3096 11.62 20.0996C11.81 20.1696 12.19 20.1596 12.37 20.0996C12.4 20.0896 12.43 20.0796 12.46 20.0696C11.93 19.2096 11.65 18.2196 11.65 17.1996C11.65 14.1396 14.14 11.6497 17.2 11.6497C18.36 11.6497 19.5 12.0196 20.44 12.6996C20.98 11.4196 21.25 10.0796 21.25 8.68964C21.25 6.01964 19.09 3.84961 16.44 3.84961C14.94 3.84961 13.5 4.56966 12.6 5.77966C12.32 6.15966 11.68 6.15966 11.4 5.77966C10.5 4.56966 9.06 3.84961 7.56 3.84961Z"
                      fill="#fff"
                    />
                  </svg>
                  لیست علاقه مندی ها
                </div>
                {wishListHistory?.map((wish) => (
                  <div className="w-full rounded-md bg-blue-lightt p-4 flex items-center gap-4">
                    <img
                      src={wish?.main_item_info?.file}
                      className="w-16 h-16 object-contain"
                      alt=""
                    />
                    <div
                      className="line-clamp-1 text-sm font-medium font-KalamehMed"
                      title={wish?.name_fa}
                    >
                      {wish?.name_fa}
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

export default React.forwardRef(WishListHistory);
