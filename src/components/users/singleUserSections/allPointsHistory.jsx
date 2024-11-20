import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";

const AllPointsHistory = (props, ref) => {
  const {} = props;
  const [open, setOpen] = useState(false);
  const [pointHistory, setPointHistory] = useState([]);
  useImperativeHandle(ref, () => ({
    openModal(pointsData) {
      setOpen(!open);
      setPointHistory(pointsData);
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
                        d="M12 16.75C11.6 16.75 11.2 16.72 10.82 16.65C8.7 16.34 6.77 15.12 5.55 13.31C4.7 12.03 4.25 10.54 4.25 9C4.25 4.73 7.73 1.25 12 1.25C16.27 1.25 19.75 4.73 19.75 9C19.75 10.54 19.3 12.03 18.45 13.31C17.22 15.13 15.29 16.34 13.15 16.66C12.8 16.72 12.4 16.75 12 16.75ZM12 2.75C8.55 2.75 5.75 5.55 5.75 9C5.75 10.25 6.11 11.45 6.79 12.47C7.78 13.93 9.33 14.91 11.05 15.16C11.69 15.27 12.32 15.27 12.91 15.16C14.66 14.91 16.21 13.92 17.2 12.46C17.88 11.44 18.24 10.24 18.24 8.98999C18.25 5.54999 15.45 2.75 12 2.75Z"
                        fill="#fff"
                      />
                      <path
                        d="M6.46933 22.59C6.32933 22.59 6.19933 22.57 6.05933 22.54C5.40933 22.39 4.90933 21.89 4.75933 21.24L4.40933 19.77C4.38933 19.68 4.31933 19.61 4.21933 19.58L2.56933 19.19C1.94933 19.04 1.45933 18.58 1.28933 17.97C1.11933 17.36 1.28933 16.7 1.73933 16.25L5.63933 12.35C5.79933 12.19 6.01933 12.11 6.23933 12.13C6.45933 12.15 6.65933 12.27 6.78933 12.46C7.77933 13.92 9.32933 14.91 11.0593 15.16C11.6993 15.27 12.3293 15.27 12.9193 15.16C14.6693 14.91 16.2193 13.92 17.2093 12.46C17.3293 12.27 17.5393 12.15 17.7593 12.13C17.9793 12.11 18.1993 12.19 18.3593 12.35L22.2593 16.25C22.7093 16.7 22.8793 17.36 22.7093 17.97C22.5393 18.58 22.0393 19.05 21.4293 19.19L19.7793 19.58C19.6893 19.6 19.6193 19.67 19.5893 19.77L19.2393 21.24C19.0893 21.89 18.5893 22.39 17.9393 22.54C17.2893 22.7 16.6193 22.47 16.1993 21.96L11.9993 17.13L7.79933 21.97C7.45933 22.37 6.97933 22.59 6.46933 22.59ZM6.08933 14.03L2.79933 17.32C2.70933 17.41 2.71933 17.51 2.73933 17.57C2.74933 17.62 2.79933 17.72 2.91933 17.74L4.56933 18.13C5.21933 18.28 5.71933 18.78 5.86933 19.43L6.21933 20.9C6.24933 21.03 6.34933 21.07 6.40933 21.09C6.46933 21.1 6.56933 21.11 6.65933 21.01L10.4893 16.6C8.78933 16.27 7.22933 15.36 6.08933 14.03ZM13.5093 16.59L17.3393 20.99C17.4293 21.1 17.5393 21.1 17.5993 21.08C17.6593 21.07 17.7493 21.02 17.7893 20.89L18.1393 19.42C18.2893 18.77 18.7893 18.27 19.4393 18.12L21.0893 17.73C21.2093 17.7 21.2593 17.61 21.2693 17.56C21.2893 17.51 21.2993 17.4 21.2093 17.31L17.9193 14.02C16.7693 15.35 15.2193 16.26 13.5093 16.59Z"
                        fill="#fff"
                      />
                      <path
                        d="M13.8901 12.8903C13.6301 12.8903 13.3201 12.8203 12.9501 12.6003L12.0001 12.0302L11.0501 12.5902C10.1801 13.1102 9.61014 12.8102 9.40014 12.6602C9.19014 12.5102 8.74014 12.0603 8.97014 11.0703L9.21014 10.0403L8.41014 9.30023C7.97014 8.86023 7.81014 8.33025 7.96014 7.85025C8.11014 7.37025 8.55014 7.03024 9.17014 6.93024L10.2401 6.75024L10.7501 5.63025C11.0401 5.06025 11.4901 4.74023 12.0001 4.74023C12.5101 4.74023 12.9701 5.07026 13.2501 5.64026L13.8401 6.82025L14.8301 6.94025C15.4401 7.04025 15.8801 7.38023 16.0401 7.86023C16.1901 8.34023 16.0301 8.87024 15.5901 9.31024L14.7601 10.1403L15.0201 11.0703C15.2501 12.0603 14.8001 12.5102 14.5901 12.6602C14.4801 12.7502 14.2401 12.8903 13.8901 12.8903ZM9.61014 8.39026L10.3001 9.08023C10.6201 9.40023 10.7801 9.94025 10.6801 10.3802L10.4901 11.1802L11.2901 10.7102C11.7201 10.4602 12.3001 10.4602 12.7201 10.7102L13.5201 11.1802L13.3401 10.3802C13.2401 9.93025 13.3901 9.40023 13.7101 9.08023L14.4001 8.39026L13.5301 8.24023C13.1101 8.17023 12.6901 7.86026 12.5001 7.48026L12.0001 6.50024L11.5001 7.50024C11.3201 7.87024 10.9001 8.19025 10.4801 8.26025L9.61014 8.39026Z"
                        fill="#fff"
                      />
                    </svg>
                    دریافت امتیازات کاربر
                  </div>
                  {pointHistory?.map((point) => (
                    <div
                      className={`w-full items-center min-h-[50px] p-3 rounded-lg flex gap-5 text-xs font-medium font-KalamehMed bg-blue-lightt `}
                    >
                      <div className="flex-1">{point?.title}</div>
                      <div
                        className={`${
                          point?.type === "DECREASE"
                            ? "text-red-700"
                            : "text-green-700"
                        }`}
                      >
                        {point?.amount} امتیاز
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

export default React.forwardRef(AllPointsHistory);
