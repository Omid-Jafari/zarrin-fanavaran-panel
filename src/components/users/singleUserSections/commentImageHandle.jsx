import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import Loading from "../../elements/loading";

const CommentImageHandle = (props, ref) => {
  const { media, formik, editCommentMutate } = props;
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
                        d="M16.9 19.0098C16.59 19.0098 16.28 18.9197 16.01 18.7397L15.05 18.1097C14.78 17.9297 14.65 17.5898 14.74 17.2798C14.81 17.0498 14.84 16.7797 14.84 16.4797V12.4097C14.84 10.7797 13.82 9.75977 12.19 9.75977H5.39999C5.27999 9.75977 5.17 9.76978 5.06 9.77979C4.85 9.78979 4.65001 9.71977 4.49001 9.57977C4.33001 9.43977 4.25 9.23979 4.25 9.02979V6.25977C4.25 3.31977 6.31 1.25977 9.25 1.25977H17.75C20.69 1.25977 22.75 3.31977 22.75 6.25977V11.3597C22.75 12.8097 22.26 14.0897 21.36 14.9697C20.64 15.6997 19.64 16.1698 18.5 16.3098V17.4197C18.5 18.0197 18.17 18.5598 17.65 18.8398C17.41 18.9498 17.15 19.0098 16.9 19.0098ZM16.3 17.1298L16.95 17.4998C17.01 17.4698 17.01 17.4197 17.01 17.4097V15.5997C17.01 15.1897 17.35 14.8497 17.76 14.8497C18.81 14.8497 19.7 14.5198 20.31 13.8998C20.94 13.2798 21.26 12.3997 21.26 11.3497V6.24976C21.26 4.11976 19.89 2.74976 17.76 2.74976H9.25999C7.12999 2.74976 5.75999 4.11976 5.75999 6.24976V8.24976H12.2C14.64 8.24976 16.35 9.95978 16.35 12.3998V16.4697C16.34 16.6997 16.33 16.9198 16.3 17.1298Z"
                        fill="#fff"
                      />
                      <path
                        d="M6.07001 22.75C5.85001 22.75 5.62 22.7 5.41 22.59C4.94 22.34 4.64999 21.86 4.64999 21.32V20.56C3.76999 20.42 2.99 20.05 2.41 19.47C1.65 18.71 1.25 17.67 1.25 16.47V12.4C1.25 10.14 2.72999 8.48002 4.92999 8.27002C5.08999 8.26002 5.23999 8.25 5.39999 8.25H12.19C14.63 8.25 16.34 9.96002 16.34 12.4V16.47C16.34 16.91 16.29 17.32 16.18 17.69C15.73 19.49 14.2 20.62 12.19 20.62H9.7L6.87 22.5C6.63 22.67 6.35001 22.75 6.07001 22.75ZM5.39999 9.75C5.27999 9.75 5.17 9.76002 5.06 9.77002C3.62 9.90002 2.75 10.89 2.75 12.4V16.47C2.75 17.27 3 17.94 3.47 18.41C3.93 18.87 4.59999 19.12 5.39999 19.12C5.80999 19.12 6.14999 19.46 6.14999 19.87V21.18L9.05 19.25C9.17 19.17 9.32 19.12 9.47 19.12H12.19C13.51 19.12 14.44 18.46 14.73 17.3C14.8 17.05 14.84 16.77 14.84 16.47V12.4C14.84 10.77 13.82 9.75 12.19 9.75H5.39999Z"
                        fill="#fff"
                      />
                    </svg>
                    دیدگاه
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
                  <button
                    onClick={() => {
                      formik.setFieldValue("deleted_media_ids", [
                        ...formik.values.deleted_media_ids,
                        active,
                      ]);
                      formik.handleSubmit();
                    }}
                    className="flex p-3 gap-2 transition-colors h-11 justify-center duration-300 items-center text-white font-medium font-KalamehMed text-sm rounded bg-[#CA3636] hover:bg-[#d85454] "
                  >
                    {editCommentMutate?.isLoading ? (
                      <Loading className="w-10 h-10 text-white animate-pulse" />
                    ) : (
                      <>
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H16.5C16.91 11.25 17.25 11.59 17.25 12C17.25 12.41 16.91 12.75 16.5 12.75Z"
                            fill="#fff"
                          />
                          <path
                            d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H15.5C20.93 1.25 23.25 3.57 23.25 9V15C23.25 20.43 20.93 22.75 15.5 22.75ZM9.5 2.75C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V9C21.75 4.39 20.11 2.75 15.5 2.75H9.5Z"
                            fill="#fff"
                          />
                        </svg>
                        حذف این عکس از دیدگاه
                      </>
                    )}
                  </button>
                  <img
                    src={media?.filter((img) => img?.id === active)[0]?.file}
                    className="object-contain w-4/5 mx-auto max-h-[455px]"
                    alt=""
                  />
                  <div className="w-full flex flex-wrap gap-3 items-center">
                    {media?.map((img) => (
                      <div
                        onClick={() => setActive(img?.id)}
                        className={`rounded-md overflow-hidden cursor-pointer ${
                          active === img?.id ? "border-2 border-[#4FB3BF]" : ""
                        }`}
                      >
                        <img
                          src={img?.file}
                          className={`max-h-[70px] w-[70px] object-contain `}
                        />
                      </div>
                    ))}
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

export default React.forwardRef(CommentImageHandle);
