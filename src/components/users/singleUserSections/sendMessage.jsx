import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import { useImperativeHandle } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useParams, useRoutes } from "react-router-dom";
import * as Yup from "yup";
import { postNotifications } from "../../../api/ApiClient";
import Loading from "../../../components/elements/loading";

const SendMessage = (props, ref) => {
  const { userData } = props;
  const [open, setOpen] = useState(false);
  const [successCopy, setSuccessCopy] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(!open);
    },
  }));
  const postNotificationsMutate = useMutation(postNotifications, {
    onSuccess: () => {
      formik.resetForm();
      setOpen(false);
    },
  });
  const formik = useFormik({
    initialValues: {
      message: "",
      types: ["SMS"],
      receivers: [userData?.id],
    },
    validationSchema: Yup.object({
      message: Yup.string().required("لطفا متن پیامک را وارد کنید"),
    }),

    onSubmit: (data) => {
      postNotificationsMutate.mutate(data);
    },
  });
  const showCopies = () => {
    setSuccessCopy(true);
    setTimeout(() => {
      setSuccessCopy(false);
    }, 1000);
  };
  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    if (formik.values.message) {
      textAreaRef.current.select();
      document.execCommand("copy");
      // This is just personal preference.
      // I prefer to not show the whole text area selected.
      e.target.focus();
      // setCopySuccess("Copied!");
      showCopies();
    }
  }
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
                <div className="p-4 w-full flex flex-col gap-4 text-sm">
                  <div className="w-full flex flex-col gap-4 p-4 bg-blue-lightt rounded-lg ">
                    <div className="">
                      ارسال اطلاعیه به کاربر : {userData?.full_name}
                    </div>
                    <div className="w-full flex justify-between items-center ">
                      <span>متن پیامک :</span>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 outline-none relative"
                      >
                        <svg
                          width="80"
                          height="71"
                          viewBox="0 0 80 71"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`absolute left-1/2 -translate-x-1/2 top-full transition-all duration-500 pointer-events-none z-10 ${
                            successCopy ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <path
                            d="M42.3956 7.1868L42.5728 7.71844C45.2167 15.6501 52.6393 21 61 21L19 21C27.3607 21 34.7833 15.6501 37.4272 7.71843L37.6044 7.1868C38.3718 4.8846 41.6282 4.8846 42.3956 7.1868Z"
                            fill="#717C94"
                          />
                          <rect
                            y="21"
                            width="80"
                            height="50"
                            rx="6"
                            fill="#717C94"
                          />
                          <path
                            d="M16.6865 49.608H20.3025C20.6545 49.608 20.9478 49.496 21.1825 49.272C21.4278 49.048 21.5505 48.7653 21.5505 48.424C21.5505 48.328 21.5185 48.1733 21.4545 47.96L20.0465 44.088L21.2945 43.64L23.1185 48.664C23.2145 48.9413 23.3852 49.1707 23.6305 49.352C23.8758 49.5227 24.1478 49.608 24.4465 49.608H24.6705C24.7772 49.608 24.8305 49.6613 24.8305 49.768V50.84C24.8305 50.9467 24.7772 51 24.6705 51H24.3985C23.9398 51 23.5292 50.8933 23.1665 50.68C22.8038 50.456 22.5372 50.1733 22.3665 49.832C21.9078 50.6107 21.2198 51 20.3025 51H16.6865V49.608ZM33.5101 51C33.0301 51 32.6035 50.8827 32.2301 50.648C31.8675 50.4027 31.5848 50.0773 31.3821 49.672C31.1901 49.2667 31.0941 48.8187 31.0941 48.328V45.816H32.1501V48.28C32.1501 48.6427 32.2835 48.9573 32.5501 49.224C32.8168 49.48 33.1368 49.608 33.5101 49.608H34.5181V45.32H35.8301V51H33.5101ZM24.7581 51C24.6515 51 24.5981 50.9467 24.5981 50.84V49.768C24.5981 49.6613 24.6515 49.608 24.7581 49.608H25.4941C25.8675 49.608 26.1821 49.48 26.4381 49.224C26.7048 48.9573 26.8381 48.6427 26.8381 48.28V45.816H27.9101V48.328C27.9101 48.8187 27.8088 49.2667 27.6061 49.672C27.4141 50.0773 27.1315 50.4027 26.7581 50.648C26.3955 50.8827 25.9741 51 25.4941 51H24.7581ZM29.5101 51.032C29.0301 51.032 28.6035 50.9147 28.2301 50.68C27.8675 50.4347 27.5848 50.1093 27.3821 49.704C27.1795 49.2987 27.0781 48.8507 27.0781 48.36V45.816H28.1661V48.312C28.1661 48.6853 28.2941 49 28.5501 49.256C28.8168 49.512 29.1368 49.64 29.5101 49.64C29.8728 49.64 30.1821 49.512 30.4381 49.256C30.7048 48.9893 30.8381 48.6747 30.8381 48.312V45.816H31.9101V48.36C31.9101 48.8507 31.8088 49.2987 31.6061 49.704C31.4141 50.1093 31.1315 50.4347 30.7581 50.68C30.3955 50.9147 29.9795 51.032 29.5101 51.032ZM29.6861 43.048H31.0941V44.456H29.6861V43.048ZM31.9261 43.048H33.3341V44.456H31.9261V43.048ZM30.8061 40.792H32.2141V42.2H30.8061V40.792ZM41.1947 48.136H42.5067V51.432C42.5067 51.8373 42.6027 52.2107 42.7947 52.552C42.9974 52.8933 43.2694 53.16 43.6107 53.352C43.9521 53.5547 44.3254 53.656 44.7307 53.656H48.2507C48.6241 53.656 48.9387 53.528 49.1947 53.272C49.4507 53.016 49.5787 52.7013 49.5787 52.328C49.5787 51.9653 49.4454 51.6507 49.1787 51.384C48.9227 51.128 48.6134 51 48.2507 51H45.6907V49.88H48.2347C48.7361 49.88 49.1947 49.9813 49.6107 50.184C50.0267 50.3867 50.3521 50.6693 50.5867 51.032C50.8321 51.4053 50.9547 51.8373 50.9547 52.328C50.9547 52.8187 50.8321 53.272 50.5867 53.688C50.3414 54.1147 50.0107 54.4507 49.5947 54.696C49.1787 54.9413 48.7254 55.064 48.2347 55.064H44.7307C44.0907 55.064 43.4987 54.904 42.9547 54.584C42.4107 54.264 41.9787 53.832 41.6587 53.288C41.3494 52.744 41.1947 52.1467 41.1947 51.496V48.136ZM45.2427 51V49.608H51.8187C51.9254 49.608 51.9787 49.6613 51.9787 49.768V50.84C51.9787 50.9467 51.9254 51 51.8187 51H45.2427ZM51.7444 49.768C51.7444 49.6613 51.7977 49.608 51.9044 49.608H52.8324C53.195 49.608 53.5097 49.48 53.7764 49.224C54.043 48.9573 54.1764 48.6427 54.1764 48.28V45.816H55.4884V48.28C55.4884 48.6533 55.6164 48.968 55.8724 49.224C56.139 49.48 56.459 49.608 56.8324 49.608H57.7444C57.851 49.608 57.9044 49.6613 57.9044 49.768V50.84C57.9044 50.9467 57.851 51 57.7444 51H56.8324C56.395 51 56.0004 50.8987 55.6484 50.696C55.2964 50.4933 55.019 50.216 54.8164 49.864C54.6244 50.216 54.3524 50.4933 54.0004 50.696C53.659 50.8987 53.2697 51 52.8324 51H51.9044C51.7977 51 51.7444 50.9467 51.7444 50.84V49.768ZM54.0964 54.728H55.5044V56.152H54.0964V54.728ZM52.9764 52.472H54.3844V53.896H52.9764V52.472ZM55.2164 52.472H56.6404V53.896H55.2164V52.472ZM57.6681 49.768C57.6681 49.6613 57.7215 49.608 57.8281 49.608H61.3161C61.7535 49.608 62.1268 49.4587 62.4361 49.16C62.7455 48.8507 62.9001 48.472 62.9001 48.024C62.9001 47.4373 62.6175 46.9733 62.0521 46.632L58.2441 44.12V43.032L61.3161 39.784L62.2121 40.632L59.5561 43.416L62.9161 45.624C63.3215 45.8907 63.6415 46.2373 63.8761 46.664C64.1108 47.08 64.2281 47.544 64.2281 48.056C64.2281 48.5893 64.0948 49.08 63.8281 49.528C63.5721 49.976 63.2201 50.3333 62.7721 50.6C62.3241 50.8667 61.8388 51 61.3161 51H57.8281C57.7215 51 57.6681 50.9467 57.6681 50.84V49.768Z"
                            fill="#F9FCFD"
                          />
                        </svg>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.1 22.75H6.9C2.99 22.75 1.25 21.01 1.25 17.1V12.9C1.25 8.99 2.99 7.25 6.9 7.25H11.1C15.01 7.25 16.75 8.99 16.75 12.9V17.1C16.75 21.01 15.01 22.75 11.1 22.75ZM6.9 8.75C3.8 8.75 2.75 9.8 2.75 12.9V17.1C2.75 20.2 3.8 21.25 6.9 21.25H11.1C14.2 21.25 15.25 20.2 15.25 17.1V12.9C15.25 9.8 14.2 8.75 11.1 8.75H6.9Z"
                            fill="#222427"
                          />
                          <path
                            d="M17.1 16.75H16C15.59 16.75 15.25 16.41 15.25 16V12.9C15.25 9.8 14.2 8.75 11.1 8.75H8C7.59 8.75 7.25 8.41 7.25 8V6.9C7.25 2.99 8.99 1.25 12.9 1.25H17.1C21.01 1.25 22.75 2.99 22.75 6.9V11.1C22.75 15.01 21.01 16.75 17.1 16.75ZM16.75 15.25H17.1C20.2 15.25 21.25 14.2 21.25 11.1V6.9C21.25 3.8 20.2 2.75 17.1 2.75H12.9C9.8 2.75 8.75 3.8 8.75 6.9V7.25H11.1C15.01 7.25 16.75 8.99 16.75 12.9V15.25Z"
                            fill="#222427"
                          />
                        </svg>
                        کپی متن در کلیپبورد
                      </button>
                    </div>
                    <textarea
                      ref={textAreaRef}
                      rows={8}
                      className="p-3 rounded-lg outline-none border border-[#717C94]"
                      placeholder="متن پیامک"
                      id="message"
                      name="message"
                      value={formik.values?.message}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.message && formik.touched.message && (
                      <div className="text-red-600 text-sm">
                        {formik.errors.message}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={formik.handleSubmit}
                    className="w-full flex items-center justify-center h-10 bg-primary rounded-[3px] py-3 text-white hover:bg-blacklead transition-colors duration-300"
                  >
                    {postNotificationsMutate?.isLoading ? (
                      <Loading className="w-9 h-9 text-white animate-pulse" />
                    ) : (
                      "ارسال پیام"
                    )}
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

export default React.forwardRef(SendMessage);
