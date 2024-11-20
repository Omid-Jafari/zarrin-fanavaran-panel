import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { productsPriceChange } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";

const GroupePriceChange = (props) => {
  const { selectedProducts, mutateProducts, setProductsIds } = props;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const previousPrices = JSON.parse(localStorage.getItem("previousPrices"));
  const expirePreviousPrices = localStorage.getItem("expirePreviousPrices");
  if (expirePreviousPrices) {
  }
  const getTime = () => {
    const now = new Date().getTime();
    let countDown;
    let distance = 1800000;
    countDown = now - expirePreviousPrices;
    distance = distance - countDown;
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    // if (seconds < -1) {
    //   localStorage.removeItem("previousPrices");
    //   localStorage.removeItem("expirePreviousPrices");
    // }
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [expirePreviousPrices]);
  const productsPriceChangeMutate = useMutation(productsPriceChange, {
    onSuccess: () => {
      mutateProducts();
      formik.resetForm();
      setProductsIds([]);
    },
  });
  const formik = useFormik({
    initialValues: {
      type: "",
      percent_amount: null,
      price_amount: "",
      amount_type: "PERCENT",
      operation: "PLUS",
    },
    validationSchema: Yup.object({
      percent_amount: Yup.number().when("amount_type", {
        is: "PERCENT", //just an e.g. you can return a function
        then: Yup.number()
          .notOneOf([0], "درصد نمی تواند صفر باشد")
          .required("فیلد درصد الزامی است"),
      }),
      price_amount: Yup.string().when("amount_type", {
        is: "PRICE", //just an e.g. you can return a function
        then: Yup.string()
          .notOneOf(["0"], "تومان نمی تواند صفر باشد")
          .required("فیلد تومان الزامی است"),
      }),
    }),

    onSubmit: (data) => {
      if (selectedProducts?.length === 0) {
        toast.error("لطفا حداقل یک محصول انتخاب کنید");
      } else {
        const sendBody = [];
        const saveDataLS = [];
        selectedProducts?.map((product) => {
          saveDataLS.push({
            id: product?.id,
            base_price: product?.base_price,
            price: product?.price,
            discount_type: product?.discount_type,
            discount_amount: product?.discount_amount,
            stock: product?.stock,
          });
          if (data?.type === "PRICE") {
            if (data?.amount_type === "PERCENT") {
              let Percent = (product?.price * data.percent_amount) / 100;
              let newPrice = product?.price;
              if (data?.operation === "PLUS") {
                newPrice += Percent;
              } else if (data?.operation === "MINUS") {
                newPrice -= Percent;
              }
              newPrice = Math.round(newPrice);
              sendBody.push({
                id: product?.id,
                base_price: product?.base_price,
                price: newPrice,
                discount_type: product?.discount_type,
                discount_amount: product?.discount_amount,
                stock: product?.stock,
              });
            } else if (data?.amount_type === "PRICE") {
              let newPrice = product?.price;
              if (data?.operation === "PLUS") {
                newPrice += +data?.price_amount;
              } else if (data?.operation === "MINUS") {
                newPrice -= +data?.price_amount;
              }
              newPrice = Math.round(newPrice);
              sendBody.push({
                id: product?.id,
                base_price: product?.base_price,
                price: newPrice,
                discount_type: product?.discount_type,
                discount_amount: product?.discount_amount,
                stock: product?.stock,
              });
            }
          } else if (data?.type === "DISCOUNT") {
            if (data?.amount_type === "PERCENT") {
              let discountPercent = data.percent_amount;
              let newDiscount = product?.discount_in_percent;
              if (data?.operation === "PLUS") {
                newDiscount += +discountPercent;
              } else if (data?.operation === "MINUS") {
                newDiscount -= +discountPercent;
              }
              sendBody.push({
                id: product?.id,
                base_price: product?.base_price,
                price: product?.price,
                discount_type: "PERCENT",
                discount_amount: newDiscount,
                stock: product?.stock,
              });
            } else if (data?.amount_type === "PRICE") {
              let discountAmount = data.price_amount;
              let newDiscount = product?.discount_in_amount;
              if (data?.operation === "PLUS") {
                newDiscount += +discountAmount;
              } else if (data?.operation === "MINUS") {
                newDiscount -= +discountAmount;
              }
              sendBody.push({
                id: product?.id,
                base_price: product?.base_price,
                price: product?.price,
                discount_type: "AMOUNT",
                discount_amount: newDiscount,
                stock: product?.stock,
              });
            }
          }
        });
        localStorage.setItem("previousPrices", JSON.stringify(saveDataLS));
        const time = new Date();
        localStorage.setItem("expirePreviousPrices", time.getTime());

        productsPriceChangeMutate.mutate({ items: sendBody });
      }
    },
  });
  const undoPriceChange = () => {
    productsPriceChangeMutate.mutate({ items: previousPrices });
    localStorage.removeItem("previousPrices");
    localStorage.removeItem("expirePreviousPrices");
  };
  return (
    <div className="w-full bg-blue-lightt rounded-lg px-4 py-2">
      <div className="w-full bg-white rounded-lg px-4 py-4 flex flex-col gap-3">
        <p className="text-sm font-medium font-KalamehMed">
          اعمال قیمت بر روی محصولات انتخابی:
        </p>
        <div className="w-full flex items-center gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <button
              className={`w-full rounded-lg outline-none px-3 h-[64px] flex items-center gap-2 font-medium font-KalamehMed group bg-blue-lightt hover:bg-[#C0E2F0] transition-all duration-500 focus:outline-none `}
              type="button"
              onClick={() => formik.setFieldValue("type", "PRICE")}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full relative border-[1.5px] border-primary flex items-center justify-center transition-all duration-500 box-border overflow-hidden `}
              >
                <div
                  className={` transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                    formik.values.type === "PRICE"
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                ></div>
              </div>
              اعمال قیمت
            </button>
            <button
              className={`w-full rounded-lg outline-none px-3 h-[64px] flex items-center gap-2 font-medium font-KalamehMed group bg-blue-lightt hover:bg-[#C0E2F0] transition-all duration-500 focus:outline-none `}
              type="button"
              onClick={() => formik.setFieldValue("type", "DISCOUNT")}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full relative border-[1.5px] border-primary flex items-center justify-center transition-all duration-500 box-border overflow-hidden `}
              >
                <div
                  className={` transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                    formik.values.type === "DISCOUNT"
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                ></div>
              </div>
              اعمال تخفیف
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className={`w-full py-2 rounded-lg outline-none px-3 h-[64px] flex items-center gap-2 font-medium font-KalamehMed group bg-blue-lightt hover:bg-[#C0E2F0] transition-all duration-500 focus:outline-none ${
                formik.values.type && formik.values.amount_type === "PERCENT"
                  ? "opacity-100"
                  : "opacity-30"
              }`}
              type="button"
              onClick={() => {
                formik.setFieldValue("amount_type", "PERCENT");
                formik.setFieldValue("price_amount", "");
              }}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full relative border-[1.5px] border-primary flex items-center justify-center transition-all duration-500 box-border overflow-hidden `}
              >
                <div
                  className={` transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                    formik.values.amount_type === "PERCENT"
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                ></div>
              </div>
              <input
                disabled={
                  !formik.values.type || formik.values.amount_type !== "PERCENT"
                }
                type="text"
                placeholder="0"
                className="flex-1 h-full rounded-lg min-w-0 outline-none disabled:bg-white px-2 text-center shadow-inner"
                id="percent_amount"
                name="percent_amount"
                value={formik.values?.percent_amount}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              درصد
            </button>
            {formik.errors.percent_amount && formik.touched.percent_amount && (
              <div className="text-red-600 w-full text-xs">
                {formik.errors.percent_amount}
              </div>
            )}
            <button
              className={`w-full py-2 rounded-lg outline-none px-3 h-[64px] flex items-center gap-2 font-medium font-KalamehMed group bg-blue-lightt hover:bg-[#C0E2F0] transition-all duration-500 focus:outline-none ${
                formik.values.type && formik.values.amount_type === "PRICE"
                  ? "opacity-100"
                  : "opacity-30"
              }`}
              type="button"
              onClick={() => {
                formik.setFieldValue("amount_type", "PRICE");
                formik.setFieldValue("percent_amount", 0);
              }}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full relative border-[1.5px] border-primary flex items-center justify-center transition-all duration-500 box-border overflow-hidden `}
              >
                <div
                  className={` transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                    formik.values.amount_type === "PRICE"
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                ></div>
              </div>
              <input
                disabled={
                  !formik.values.type || formik.values.amount_type !== "PRICE"
                }
                type="text"
                placeholder="20,000"
                className="flex-1 h-full rounded-lg min-w-0 outline-none disabled:bg-white px-2 text-center shadow-inner"
                id="price_amount"
                name="price_amount"
                value={formik.values?.price_amount.toLocaleString()}
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  const regex = /^[0-9]*$/;
                  if (
                    e.target.value === "" ||
                    regex.test(e.target.value?.replaceAll(",", ""))
                  ) {
                    formik.setFieldValue(
                      "price_amount",
                      Number(e.target.value?.replaceAll(",", ""))
                    );
                  }
                }}
              />
              تومان
            </button>
            {formik.errors.price_amount && formik.touched.price_amount && (
              <div className="text-red-600 w-full text-xs">
                {formik.errors.price_amount}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button
              className={`w-full rounded-lg outline-none px-3 h-[64px] flex items-center gap-2 font-medium font-KalamehMed group bg-blue-lightt hover:bg-[#C0E2F0] transition-all duration-500 focus:outline-none ${
                formik.values.type ? "opacity-100" : "opacity-30"
              }`}
              type="button"
              onClick={() => formik.setFieldValue("operation", "PLUS")}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full relative border-[1.5px] border-primary flex items-center justify-center transition-all duration-500 box-border overflow-hidden `}
              >
                <div
                  className={` transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                    formik.values.operation === "PLUS"
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                ></div>
              </div>
              افزایش قیمت
            </button>
            <button
              className={`w-full rounded-lg outline-none px-3 h-[64px] flex items-center gap-2 font-medium font-KalamehMed group bg-blue-lightt hover:bg-[#C0E2F0] transition-all duration-500 focus:outline-none ${
                formik.values.type ? "opacity-100" : "opacity-30"
              }`}
              type="button"
              onClick={() => formik.setFieldValue("operation", "MINUS")}
            >
              <div
                className={`w-[18px] h-[18px] rounded-full relative border-[1.5px] border-primary flex items-center justify-center transition-all duration-500 box-border overflow-hidden `}
              >
                <div
                  className={` transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                    formik.values.operation === "MINUS"
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                ></div>
              </div>
              کاهش قیمت
            </button>
          </div>
          <div className="w-[1px] h-[100px] bg-[#C4C7C7]"></div>
          {seconds > 0 && selectedProducts?.length === 0 ? (
            <button
              onClick={undoPriceChange}
              className={`flex items-center bg-cyann hover:bg-primary text-white gap-1 justify-center h-11 min-w-[250px] rounded transition-colors duration-500 text-sm`}
            >
              {productsPriceChangeMutate?.isLoading ? (
                <Loading className="w-[70px] h-auto text-blacklead animate-pulse" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M15.13 19.06h-8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8a4.26 4.26 0 004.25-4.25 4.26 4.26 0 00-4.25-4.25h-11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h11c3.17 0 5.75 2.58 5.75 5.75s-2.58 5.75-5.75 5.75z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M6.43 11.56c-.19 0-.38-.07-.53-.22L3.34 8.78a.754.754 0 010-1.06L5.9 5.16c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.93 8.25l2.03 2.03c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"
                    ></path>
                  </svg>
                  <span>بازگردانی تغییرات قیمت </span>
                  <span>
                    &nbsp;{minutes}:{seconds}
                  </span>
                </>
              )}
            </button>
          ) : (
            <button
              type="submit"
              onClick={() => formik.handleSubmit()}
              disabled={!formik.values.type}
              className={`flex items-center gap-3 justify-center h-11 min-w-[250px] rounded transition-colors duration-500 text-sm font-medium font-KalamehMed ${
                formik.values.type
                  ? "bg-cyann hover:bg-primary text-white"
                  : "bg-[#E0E3E3] text-[#C4C7C7]"
              }`}
            >
              <div className="" id="demo"></div>
              {productsPriceChangeMutate?.isLoading ? (
                <Loading className="w-[70px] h-auto text-blacklead animate-pulse" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path fill="#C4C7C7" d="M3.11 16.44v5-5z"></path>
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M22 12c0 5.52-4.48 10-10 10s-8.89-5.56-8.89-5.56m0 0h4.52m-4.52 0v5M2 12C2 6.48 6.44 2 12 2c6.67 0 10 5.56 10 5.56m0 0v-5m0 5h-4.44"
                    ></path>
                  </svg>
                  بروزرسانی قیمت‌ها
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupePriceChange;
