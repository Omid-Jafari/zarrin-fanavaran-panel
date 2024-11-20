import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import Loading from "../../elements/loading";

const ReportsHandle = (props, ref) => {
  const { user, reports, formik, editCommentMutate } = props;
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal(id) {
      setOpen(!open);
      setActive(id);
    },
    closeModal() {
      setOpen(false);
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[8px] w-1/2 bg-white shadow-xl transition-all items-start sm:my-8 p-5 flex flex-col gap-5">
                  <div className="rounded-md p-3 flex gap-2 items-center bg-cyann text-white w-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 14.75C11.59 14.75 11.25 14.41 11.25 14V9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9V14C12.75 14.41 12.41 14.75 12 14.75Z"
                        fill="white"
                      />
                      <path
                        d="M12 18.0005C11.94 18.0005 11.87 17.9905 11.8 17.9805C11.74 17.9705 11.68 17.9505 11.62 17.9205C11.56 17.9005 11.5 17.8705 11.44 17.8305C11.39 17.7905 11.34 17.7505 11.29 17.7105C11.11 17.5205 11 17.2605 11 17.0005C11 16.7405 11.11 16.4805 11.29 16.2905C11.34 16.2505 11.39 16.2105 11.44 16.1705C11.5 16.1305 11.56 16.1005 11.62 16.0805C11.68 16.0505 11.74 16.0305 11.8 16.0205C11.93 15.9905 12.07 15.9905 12.19 16.0205C12.26 16.0305 12.32 16.0505 12.38 16.0805C12.44 16.1005 12.5 16.1305 12.56 16.1705C12.61 16.2105 12.66 16.2505 12.71 16.2905C12.89 16.4805 13 16.7405 13 17.0005C13 17.2605 12.89 17.5205 12.71 17.7105C12.66 17.7505 12.61 17.7905 12.56 17.8305C12.5 17.8705 12.44 17.9005 12.38 17.9205C12.32 17.9505 12.26 17.9705 12.19 17.9805C12.13 17.9905 12.06 18.0005 12 18.0005Z"
                        fill="white"
                      />
                      <path
                        d="M18.06 22.1598H5.93998C3.98998 22.1598 2.49998 21.4498 1.73998 20.1698C0.989976 18.8898 1.08998 17.2398 2.03998 15.5298L8.09998 4.62984C9.09998 2.82984 10.48 1.83984 12 1.83984C13.52 1.83984 14.9 2.82984 15.9 4.62984L21.96 15.5398C22.91 17.2498 23.02 18.8898 22.26 20.1798C21.5 21.4498 20.01 22.1598 18.06 22.1598ZM12 3.33984C11.06 3.33984 10.14 4.05984 9.40998 5.35984L3.35998 16.2698C2.67998 17.4898 2.56998 18.6098 3.03998 19.4198C3.50998 20.2298 4.54998 20.6698 5.94998 20.6698H18.07C19.47 20.6698 20.5 20.2298 20.98 19.4198C21.46 18.6098 21.34 17.4998 20.66 16.2698L14.59 5.35984C13.86 4.05984 12.94 3.33984 12 3.33984Z"
                        fill="white"
                      />
                    </svg>
                    گزارشات
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-auto cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      <path
                        d="M9.56994 18.8191C9.37994 18.8191 9.18994 18.7491 9.03994 18.5991L2.96994 12.5291C2.67994 12.2391 2.67994 11.7591 2.96994 11.4691L9.03994 5.39914C9.32994 5.10914 9.80994 5.10914 10.0999 5.39914C10.3899 5.68914 10.3899 6.16914 10.0999 6.45914L4.55994 11.9991L10.0999 17.5391C10.3899 17.8291 10.3899 18.3091 10.0999 18.5991C9.95994 18.7491 9.75994 18.8191 9.56994 18.8191Z"
                        fill="white"
                      />
                      <path
                        d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  {reports?.map((report) => (
                    <div className="p-3 bg-blue-lightt rounded-lg w-full flex flex-col gap-2">
                      <div className="w-full flex items-center gap-2 text-sm">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.1596 11.62C12.1296 11.62 12.1096 11.62 12.0796 11.62C12.0296 11.61 11.9596 11.61 11.8996 11.62C8.99957 11.53 6.80957 9.25 6.80957 6.44C6.80957 3.58 9.13957 1.25 11.9996 1.25C14.8596 1.25 17.1896 3.58 17.1896 6.44C17.1796 9.25 14.9796 11.53 12.1896 11.62C12.1796 11.62 12.1696 11.62 12.1596 11.62ZM11.9996 2.75C9.96957 2.75 8.30957 4.41 8.30957 6.44C8.30957 8.44 9.86957 10.05 11.8596 10.12C11.9096 10.11 12.0496 10.11 12.1796 10.12C14.1396 10.03 15.6796 8.42 15.6896 6.44C15.6896 4.41 14.0296 2.75 11.9996 2.75Z"
                            fill="#222427"
                          />
                          <path
                            d="M12.1696 22.55C10.2096 22.55 8.23961 22.05 6.74961 21.05C5.35961 20.13 4.59961 18.87 4.59961 17.5C4.59961 16.13 5.35961 14.86 6.74961 13.93C9.74961 11.94 14.6096 11.94 17.5896 13.93C18.9696 14.85 19.7396 16.11 19.7396 17.48C19.7396 18.85 18.9796 20.12 17.5896 21.05C16.0896 22.05 14.1296 22.55 12.1696 22.55ZM7.57961 15.19C6.61961 15.83 6.09961 16.65 6.09961 17.51C6.09961 18.36 6.62961 19.18 7.57961 19.81C10.0696 21.48 14.2696 21.48 16.7596 19.81C17.7196 19.17 18.2396 18.35 18.2396 17.49C18.2396 16.64 17.7096 15.82 16.7596 15.19C14.2696 13.53 10.0696 13.53 7.57961 15.19Z"
                            fill="#222427"
                          />
                        </svg>
                        {user?.full_name} : {report?.option?.name}
                      </div>
                      <div className="font-light text-sm">{report?.body}</div>
                    </div>
                  ))}
                  <button
                    className="bg-primary py-2 h-10 w-full flex items-center justify-center hover:bg-blacklead transition-colors duration-500 rounded text-white text-sm"
                    onClick={() => setOpen(false)}
                  >
                    بستن
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default React.forwardRef(ReportsHandle);
