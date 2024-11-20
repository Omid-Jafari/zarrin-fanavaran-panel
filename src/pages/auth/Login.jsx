import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LOGIN_VALIDATION_SCHEMA } from "../../constant/formik/validation_schema";
import Loading from "../../components/elements/loading";
import { loginUser } from "../../api/ApiClient";
import UserContext from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";

function Login() {
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useContext(UserContext);
  const { isLogin, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const loginMutation = useMutation((values) => loginUser(values), {
    onSuccess: (res) => {
      localStorage.setItem("userData", JSON.stringify(res?.data?.data));
      localStorage.setItem("login", true);
      localStorage.setItem("token", res?.data?.data?.access_token);

      dispatch({
        type: "LOGIN",
        user: res?.data?.data,
        isLogin: res?.data?.success,
      });
      setloading(false);
      navigate("/", { replace: true });
      // window.location = "/";
    },
    onError: (err) => {
      setloading(false);
    },
  });
  const formik = useFormik({
    initialValues: {
      password: null,
      mobile_number: "",
    },

    validationSchema: LOGIN_VALIDATION_SCHEMA,
    onSubmit: (values) => {
      setloading(true);

      loginMutation.mutate(values);
    },
  });
  useEffect(() => {
    if (user?.isLogin && user?.user?.access_token != null) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <Dialog.Panel className="relative w-1/3 transition-all flex flex-col items-start">
                  <div
                    className=" bg-gray-500 bg-opacity-75 rounded-full w-7 h-7 cursor-pointer  flex items-center justify-center -mb-3 z-10 mr-5"
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="22"
                      fill="none"
                      viewBox="0 0 24 22"
                    >
                      <path
                        fill="#DBEEF6"
                        d="M12 0C6.49 0 2 4.49 2 10s4.49 10 10 10 10-4.49 10-10S17.51 0 12 0zm3.36 12.3c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22s-.38-.07-.53-.22l-2.3-2.3-2.3 2.3c-.15.15-.34.22-.53.22s-.38-.07-.53-.22a.754.754 0 010-1.06l2.3-2.3-2.3-2.3a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 2.3-2.3c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2.3 2.3 2.3 2.3z"
                      ></path>
                    </svg>
                  </div>
                  <div className="bg-blue-lightt text-right shadow-xl rounded-[8px] p-4 w-full flex flex-col">
                    <h2 className="text-center">لوگو</h2>
                    <div className="w-full rounded-md bg-white p-4">
                      <h4 className="font-semibold font-KalamehSemi text-[#545456]">
                        آخه چراااااااا؟ تو که ادمینی خیر سرت
                      </h4>
                      <p className="text-primary text-sm pt-2 pb-3">
                        دیگه کاریه که شده اشکال نداره ، شمارت بزار برو بکس باهات
                        هماهنگ میکنن
                      </p>
                      <p className="text-[#545456] text-sm py-3">
                        شماره موبایل
                      </p>
                      <div className="px-3 bg-blue-lightt text-black rounded-md w-full h-10 flex justify-start items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#545456"
                            d="M15 22.75H9c-4.41 0-5.75-1.34-5.75-5.75V7c0-4.41 1.34-5.75 5.75-5.75h6c4.41 0 5.75 1.34 5.75 5.75v10c0 4.41-1.34 5.75-5.75 5.75zm-6-20c-3.58 0-4.25.68-4.25 4.25v10c0 3.57.67 4.25 4.25 4.25h6c3.58 0 4.25-.68 4.25-4.25V7c0-3.57-.67-4.25-4.25-4.25H9z"
                          ></path>
                          <path
                            fill="#545456"
                            d="M14 6.25h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75zM12 19.86a2.3 2.3 0 110-4.6 2.3 2.3 0 010 4.6zm0-3.11c-.44 0-.8.36-.8.8 0 .44.36.8.8.8.44 0 .8-.36.8-.8 0-.44-.36-.8-.8-.8z"
                          ></path>
                        </svg>
                        <input
                          type="text"
                          placeholder="شماره موبایل خود را وارد کنید"
                          className=" text-right bg-transparent focus:outline-none font-KalamehMed placeholder:text-[#545456] placeholder:text-opacity-[.6] px-3"
                        />
                      </div>
                      <button
                        type="submit"
                        className="text-[#F9FCFD] bg-primary mt-5 flex justify-center items-center rounded-md w-full h-11"
                      >
                        تایید شماره
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="w-full min-h-screen flex justify-center حط-5 items-center font-medium font-KalamehMed">
        <div className="text-black w-1/2 flex flex-col justify-center px-10">
          <h5 className="text-black ">ورود به پنل کاربری :</h5>
          <form onSubmit={formik.handleSubmit} className="w-full pt-5">
            <div className="w-full py-3 flex flex-col">
              <input
                name="mobile_number"
                type="text"
                x-model="input3"
                className="appearance-none px-3 bg-blue-lightt text-black rounded-md w-full h-11 text-right  focus:outline-none font-KalamehMed placeholder:text-[#C4C7C7]"
                placeholder="شماره موبایل"
                onChange={formik.handleChange}
                value={formik.values.mobile_number}
              />
              {formik.errors.mobile_number && formik.touched.mobile_number && (
                <small className="text-red-700">
                  {formik.errors.mobile_number}
                </small>
              )}
            </div>
            <div className="w-full py-3 flex flex-col">
              <input
                name="password"
                type="password"
                x-model="input3"
                className="appearance-none px-3 bg-blue-lightt text-black rounded-md w-full h-11 text-right  focus:outline-none font-KalamehMed placeholder:text-[#C4C7C7]"
                placeholder="رمز ورود"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <small className="text-red-700">{formik.errors.password}</small>
              )}
            </div>
            <div className="w-full py-3 flex justify-center">
              <button
                type="submit"
                className="text-white bg-primary flex justify-center items-center rounded-md w-full h-11"
              >
                {loading ? (
                  <Loading className="w-36 h-36 text-blacklead animate-pulse" />
                ) : (
                  "ورود"
                )}
              </button>
            </div>
            <div className="pt-2">
              <button
                className="flex items-center focus:outline-none text-blacklead font-semibold font-KalamehSemi"
                type="button"
                onClick={(e) => {
                  e.preventDefault;
                  setOpen(!open);
                }}
              >
                ادمین سایتم اما رمزم یادم رفته :D
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="mx-1"
                >
                  <path
                    fill="#003E43"
                    d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"
                  ></path>
                  <path
                    fill="#003E43"
                    d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <img src="/images/Login.png" className="w-full" alt="" />
        </div>
      </div>
    </>
  );
}

export default Login;
