import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import * as Yup from "yup";
import Loading from "../elements/loading";
import CategoriesSelectBox from "./categoriesSelectBox";
import ProductSelectBox from "./productSelectBox";
import UserSelectBox from "./userSelectBox";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { editCoupon, singleCoupon } from "../../api/ApiClient";
import { useOnClickOutside } from "../../utils/OutSideClick";
import { pretifiedNumberOnchange } from "../../utils/PretifiedNumberOnchange";

const EditCoupon = (props, ref) => {
  const { mutateCoupons } = props;
  const [open, setOpen] = useState(false);
  const [couponData, setCouponData] = useState({});
  const datePickerRef = useRef();
  const datePickerContainerRef = useRef();
  const [chooseDiscount, setChooseDiscount] = useState(false);
  const singleCouponMutation = useMutation(singleCoupon, {
    onSuccess: (res) => {
      setCouponData(res?.data?.data);
    },
  });
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const generateString = (length) => {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    formik.setFieldValue("code", result);
  };
  const editCouponMutate = useMutation(
    (data) => editCoupon({ id: couponData?.id, body: data }),
    {
      onSuccess: () => {
        setOpen(false);
        formik.resetForm();
        mutateCoupons();
      },
    }
  );
  useImperativeHandle(ref, () => ({
    openModal(id) {
      setOpen(!open);
      singleCouponMutation.mutate(id);
    },
  }));
  const formik = useFormik({
    initialValues: {
      name: couponData?.name,
      code: couponData?.code,
      discount: couponData?.discount,
      discount_type: couponData?.discount_type,
      all_users: couponData?.all_users,
      all_categories: couponData?.all_categories,
      all_products: couponData?.all_products,
      expire_at:
        couponData?.jexpire_at ||
        new DateObject({ calendar: persian, locale: persian_fa }),
      product_ids: couponData?.products?.map((product) => product?.id),
      user_ids: couponData?.users?.map((user) => user?.id),
      category_ids: couponData?.categories?.map((category) => category?.id),
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("لطفا نام کد تخفیف را وارد کنید"),
      discount: Yup.string()
        .notOneOf(["0"], "مقدار تخفیف نمی تواند صفر باشد")
        .required("لطفا مقدار تخفیف را وارد کنید"),
      code: Yup.string().required("لطفا کد تخفیف را وارد کنید"),
      user_ids: Yup.array().when("all_users", {
        is: 0, //just an e.g. you can return a function
        then: Yup.array()
          .of(Yup.number())
          .min(1, "لطفا  حداقل یک کاربر انتخاب کنید"),
      }),
      product_ids: Yup.array().when("all_products", {
        is: 0, //just an e.g. you can return a function
        then: Yup.array()
          .of(Yup.number())
          .min(1, "لطفا  حداقل یک محصول انتخاب کنید"),
      }),
      category_ids: Yup.array().when("all_categories", {
        is: 0, //just an e.g. you can return a function
        then: Yup.array()
          .of(Yup.number())
          .min(1, "لطفا  حداقل یک دسته بندی انتخاب کنید"),
      }),
    }),
    onSubmit: (data) => {
      if (typeof data?.expire_at !== "string") {
        data.expire_at = data?.expire_at?.format("YYYY/MM/DD HH:mm:ss");
      }
      editCouponMutate.mutate(data);
    },
  });
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setChooseDiscount(false);
    }
  };
  useOnClickOutside(datePickerContainerRef, () =>
    datePickerRef.current.closeCalendar()
  );

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
          <div className="flex min-h-full items-end justify-center p-5 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-[8px] w-1/2 bg-white shadow-xl transition-all sm:my-8 flex flex-col items-start">
                <div className="bg-cyann p-3 text-white rounded-t-lg w-full">
                  ویرایش کد تخفیف:
                </div>
                {singleCouponMutation?.isLoading ? (
                  <div className="w-full flex justify-center items-center">
                    <Loading className="animate-pulse w-14 h-14 text-blacklead" />
                  </div>
                ) : (
                  <>
                    <div className="p-4 flex gap-3 w-full mt-4">
                      <div className="flex flex-col gap-5 font-medium font-KalamehMed">
                        <div className="h-11 flex items-center gap-2">
                          نام تگ:
                        </div>
                        {formik.errors.name && formik.touched.name && (
                          <div className="text-red-600 text-sm h-5"></div>
                        )}
                        <div className="h-11 flex items-center gap-2">
                          مقدار:
                        </div>
                        {formik.errors.discount && formik.touched.discount && (
                          <div className="text-red-600 text-sm h-5"></div>
                        )}
                        <div className="h-11 flex items-center gap-2">
                          کد تخفیف:
                        </div>
                        {formik.errors.code && formik.touched.code && (
                          <div className="text-red-600 text-sm h-5"></div>
                        )}
                        <div className="h-11 flex items-center gap-2">
                          کاربران:
                        </div>
                        {formik.errors.user_ids && formik.touched.user_ids && (
                          <div className="text-red-600 text-sm h-5"></div>
                        )}
                        <div className="h-11 flex items-center gap-2">
                          دسته ها:
                        </div>
                        {formik.errors.category_ids &&
                          formik.touched.category_ids && (
                            <div className="text-red-600 text-sm h-5"></div>
                          )}
                        <div className="h-11 flex items-center gap-2">
                          محصولات
                        </div>
                        {formik.errors.product_ids &&
                          formik.touched.product_ids && (
                            <div className="text-red-600 text-sm h-5"></div>
                          )}
                        <div className="h-11 flex items-center gap-2">
                          زمان انقضا:
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-5 font-medium font-KalamehMed">
                        <input
                          type="text"
                          className="rounded-md bg-blue-lightt outline-0 placeholder:text-[#C4C7C7] px-3 h-11 min-w-0"
                          placeholder="مثال: عید نوروز"
                          id="name"
                          name="name"
                          value={formik.values?.name}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.name && formik.touched.name && (
                          <div className="text-red-600 text-sm h-5">
                            {formik.errors.name}
                          </div>
                        )}
                        <div
                          className="w-full flex relative"
                          onBlur={handleBlur}
                        >
                          <input
                            type="text"
                            className="rounded-r-md bg-blue-lightt flex-1 outline-0 placeholder:text-[#C4C7C7] px-3 h-11 min-w-0"
                            placeholder={`${
                              formik.values.discount_type === "AMOUNT"
                                ? "مثال : 20,000"
                                : "مثال : 5"
                            }`}
                            id="discount"
                            name="discount"
                            value={formik.values?.discount?.toLocaleString()}
                            onBlur={formik.handleBlur}
                            onChange={(e) =>
                              pretifiedNumberOnchange({
                                formik: formik,
                                event: e,
                                formField: "discount",
                              })
                            }
                          />
                          <button
                            onClick={() => setChooseDiscount(!chooseDiscount)}
                            className="h-11 flex items-center justify-between gap-2 px-3 rounded-l-md bg-[#E0E3E3] w-[100px]"
                          >
                            {formik.values.discount_type === "AMOUNT"
                              ? "تومان"
                              : "درصد"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              className={`transition-all z-20 duration-500 ease-in-expo fill-black ${
                                chooseDiscount ? "-rotate-180" : "rotate-0"
                              }`}
                            >
                              <path d="M17.92 8.18H6.08c-.96 0-1.44 1.16-.76 1.84l5.18 5.18c.83.83 2.18.83 3.01 0l1.97-1.97 3.21-3.21c.67-.68.19-1.84-.77-1.84z"></path>
                            </svg>
                          </button>
                          <div
                            className={`flex flex-col absolute z-10 top-0 left-0 px-3 rounded-l-md bg-[#E0E3E3] w-[100px] overflow-hidden transition-all duration-300 ${
                              chooseDiscount ? "max-h-96" : "max-h-0"
                            }`}
                          >
                            <button
                              onClick={() => {
                                formik.setFieldValue("discount_type", "AMOUNT");
                                setChooseDiscount(false);
                              }}
                              className="h-11 outline-none w-full text-start"
                            >
                              تومان
                            </button>

                            <div className="w-full h-[1px] bg-white"></div>
                            <button
                              onClick={() => {
                                formik.setFieldValue(
                                  "discount_type",
                                  "PERCENT"
                                );
                                setChooseDiscount(false);
                              }}
                              className="h-11 outline-none w-full text-start"
                            >
                              درصد
                            </button>
                          </div>
                        </div>
                        {formik.errors.discount && formik.touched.discount && (
                          <div className="text-red-600 text-sm h-5">
                            {formik.errors.discount}
                          </div>
                        )}
                        <div className="w-full flex items-center gap-3">
                          <input
                            type="text"
                            className="rounded-md bg-blue-lightt flex-1 outline-0 placeholder:text-[#C4C7C7] px-3 h-11 min-w-0"
                            placeholder="gDGlkRsd"
                            id="code"
                            name="code"
                            value={formik.values?.code}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          <button
                            onClick={() => generateString(9)}
                            className="h-11 flex items-center justify-between gap-2 px-3 rounded bg-cyann hover:bg-primary text-white transition-colors duration-300 font-normal font-Kalameh"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M3.11 16.44V21.44V16.44Z" fill="white" />
                              <path
                                d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            ایجاد کد جدید
                          </button>
                        </div>
                        {formik.errors.code && formik.touched.code && (
                          <div className="text-red-600 text-sm h-5">
                            {formik.errors.code}
                          </div>
                        )}
                        <UserSelectBox formik={formik} />
                        {formik.errors.user_ids && formik.touched.user_ids && (
                          <div className="text-red-600 text-sm h-5">
                            {formik.errors.user_ids}
                          </div>
                        )}
                        <CategoriesSelectBox formik={formik} />
                        {formik.errors.category_ids &&
                          formik.touched.category_ids && (
                            <div className="text-red-600 text-sm h-5">
                              {formik.errors.category_ids}
                            </div>
                          )}
                        <ProductSelectBox formik={formik} />
                        {formik.errors.product_ids &&
                          formik.touched.product_ids && (
                            <div className="text-red-600 text-sm h-5">
                              {formik.errors.product_ids}
                            </div>
                          )}
                        <div
                          ref={datePickerContainerRef}
                          className=" flex items-center gap-2 justify-end w-fit"
                          dir="ltr"
                        >
                          <DatePicker
                            ref={datePickerRef}
                            format="YYYY/MM/DD HH:mm:ss"
                            plugins={[<TimePicker position="bottom" />]}
                            value={formik.values.expire_at}
                            onChange={(e) =>
                              formik.setFieldValue("expire_at", e)
                            }
                            calendar={persian}
                            locale={persian_fa}
                            inputClass="outline-none bg-[#DBEEF6] p-3 rounded-lg "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex gap-3 items-center p-5">
                      <button
                        onClick={formik.handleSubmit}
                        className="font-medium font-KalamehMed bg-primary rounded h-11 hover:bg-blacklead transition-colors duration-500 text-white flex items-center justify-center w-1/2"
                      >
                        {editCouponMutate?.isLoading ? (
                          <Loading className="animate-pulse text-white w-10 h-10" />
                        ) : (
                          "ذخیره"
                        )}
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className="font-medium font-KalamehMed bg-[#EFF1F1] rounded h-11 hover:bg-[#dadcdc] transition-colors duration-500 flex items-center justify-center w-1/2"
                      >
                        انصراف
                      </button>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default React.forwardRef(EditCoupon);
