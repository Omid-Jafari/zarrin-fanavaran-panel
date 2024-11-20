import { Dialog, Transition } from "@headlessui/react";
import React, { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { singleAdminPassword } from "../../api/ApiClient";
import Loading from "../elements/loading";

const PasswordChangeModal = (props, ref) => {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const singleAdminPasswordMutate = useMutation(
    (data) => singleAdminPassword(id, data),
    {
      onSuccess: (res) => {
        setOpen(false);
      },
    }
  );
  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(!open);
    },
  }));
  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("لطفا رمز عبور را وارد کنید")
        .matches(
          /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/,
          "رمز عبور حداقل باید شامل یک حروف خاص مانند !@#$% باشد"
        )
        .min(8, "رمز عبور نباید کمتر از 8 کاراکتر باشد"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "رمز عبور مطابقت ندارد")
        .required("لطفا تکرار رمز عبور را وارد کنید"),
    }),

    onSubmit: (data) => {
      singleAdminPasswordMutate?.mutate(data);
    },
  });
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
              <Dialog.Panel className="relative transform rounded-[8px] w-1/3 bg-white shadow-xl transition-all sm:my-8">
                <div className="bg-cyann w-full p-4 font-medium font-KalamehMed text-white rounded-t-lg">
                  تنظیم زمان انتشار:
                </div>
                <div className="w-full flex gap-7 p-5 flex-col">
                  <div className="w-full flex gap-5 items-center justify-between">
                    <p className="font-medium font-KalamehMed min-w-[85px]">
                      رمز عبور:
                    </p>
                    <input
                      type="password"
                      className="flex-1 flex bg-[#DBEEF6] rounded-lg min-w-0 p-3 outline-none"
                      placeholder="حداقل 8 کاراکتر"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <small className="text-red-700">
                      {formik.errors.password}
                    </small>
                  )}
                  <div className="w-full flex gap-5 items-center justify-between">
                    <p className="font-medium font-KalamehMed min-w-[85px]">
                      تکرار رمز عبور:
                    </p>
                    <input
                      type="password"
                      className="flex-1 flex bg-[#DBEEF6] rounded-lg min-w-0 p-3 outline-none"
                      placeholder="حداقل 8 کاراکتر"
                      id="password_confirmation"
                      name="password_confirmation"
                      value={formik.values.password_confirmation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.errors.password_confirmation &&
                    formik.touched.password_confirmation && (
                      <small className="text-red-700">
                        {formik.errors.password_confirmation}
                      </small>
                    )}
                  <div className="w-full flex items-center justify-end gap-3">
                    <button
                      onClick={formik.handleSubmit}
                      className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 w-1/2 text-white rounded-[4px] font-KalamehMed font-medium"
                    >
                      {singleAdminPasswordMutate?.isLoading ? (
                        <Loading className="text-white w-10 h-10 animate-pulse" />
                      ) : (
                        "تایید"
                      )}
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="font-KalamehMed font-medium h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 w-1/2 rounded-[4px] flex items-center justify-center gap-1"
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default React.forwardRef(PasswordChangeModal);
