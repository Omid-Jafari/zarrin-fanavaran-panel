import EditIcon from "../../../public/images/icons/editIcon";
import Tooltip from "../../components/elements/Tooltip";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { productsPriceChange } from "../../api/ApiClient";
import toast from "react-hot-toast";
import Loading from "../../components/elements/loading";
import { useState } from "react";
import Checkbox from "../../components/common/checkbox";

const ChangePriceTable = (props) => {
  const { product, productsIds, setProductsIds, mutateProducts } = props;
  const [disabled, setDisabled] = useState(true);
  const productsPriceChangeMutate = useMutation(productsPriceChange, {
    onSuccess: () => {
      setDisabled(true);
      mutateProducts();
    },
  });
  const formik = useFormik({
    initialValues: {
      id: product?.id,
      price: product?.price,
      base_price: product?.base_price,
      discount_amount: product?.discount_in_amount,
      stock: product?.stock,
      discount_type: "AMOUNT",
    },
    validationSchema: Yup.object({
      base_price: Yup.string()
        .required("لطفا قیمت تمام شده محصول را وارد کنید")
        .notOneOf(["0"], "قیمت تمام شده نمی تواند صفر باشد"),
      price: Yup.string()
        .required("لطفا قیمت فروش محصول را وارد کنید")
        .notOneOf(["0"], "قیمت فروش نمی تواند صفر باشد"),
      stock: Yup.string()
        .required("لطفا تعداد محصول را وارد کنید")
        .notOneOf(["0"], "تعداد محصول نمی تواند صفر باشد"),
    }),

    onSubmit: (data) => {
      if (
        data.price !== product?.price ||
        data.base_price !== product?.base_price ||
        data.stock !== product?.stock ||
        data.discount_amount !== product?.discount_in_amount
      ) {
        productsPriceChangeMutate.mutate({ items: [{ ...data }] });
      } else {
        toast.error("چیزی را تغییر نداده اید");
      }
    },
  });

  return (
    <div
      className={`w-full flex items-center mt-4 rounded-lg p-0.5 ${
        productsIds.findIndex((cId) => cId === product?.id) === -1
          ? ""
          : "bg-blacklead"
      }`}
    >
      <div className="w-[2.129rem] flex justify-center">
        <Checkbox
          className="w-[18px] h-[18px] rounded-[2px] bg-blue-lightt relative cursor-pointer"
          id={product?.id}
          state={productsIds}
          setState={setProductsIds}
        />
      </div>
      <div
        className={`flex-1 transition-colors duration-500 rounded-lg flex flex-col w-full gap-3 px-3 py-4 ${
          disabled
            ? "bg-blue-lightt hover:bg-[#C0E2F0]"
            : "bg-[#C4C7C7] hover:bg-[#babebe]"
        }`}
      >
        {/* HEADER CONTENT */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full grid grid-cols-10 gap-x-4 items-center">
              <div
                className="col-span-4 truncate font-semibold font-KalamehSemi text-sm"
                title={product?.product?.name_fa}
              >
                {product?.product?.name_fa}
              </div>
              <div className="col-span-2 text-sm text-primary font-medium font-KalamehMed">
                قیمت تمام شده:
              </div>
              <div className="col-span-2 text-sm text-primary font-medium font-KalamehMed">
                قیمت فروش:{" "}
              </div>
              <div className="col-span-2 text-sm text-primary font-medium font-KalamehMed">
                تخفیف:{" "}
              </div>
            </div>
          </div>
          <div className="w-[24px]"></div>
        </div>
        {/* ROW CONTENT */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full grid grid-cols-10 gap-x-4 items-center">
              <div className="col-span-4 flex gap-2 items-center">
                <img
                  src={product?.color?.media?.icon?.file}
                  className="rounded-lg border-2 border-white overflow-hidden h-8 max-w-8 object-contain flex-none"
                  alt=""
                  title={product?.color?.name_fa}
                />
                {/* <p
                  className="text-xs font-KalamehMed font-medium truncate "
                  title={product?.gaurantee?.name}
                >
                  {product?.gaurantee?.name}
                </p> */}
                <div className="flex flex-col mr-auto gap-1">
                  <div className=" rounded-[4px] h-10 p-2 flex items-center gap-2 bg-white max-w-[150px]">
                    <input
                      disabled={disabled}
                      type="number"
                      className="outline-none min-w-0 w-full disabled:bg-white"
                      id="stock"
                      name="stock"
                      value={formik.values?.stock}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    عدد
                  </div>
                  {formik.errors.stock && formik.touched.stock && (
                    <div className="text-red-600 w-full text-xs">
                      {formik.errors.stock}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <div className="p-2 bg-white rounded-[4px] flex items-center gap-2 h-10 text-sm text-blacklead font-medium font-KalamehMed">
                  <input
                    disabled={disabled}
                    type="text"
                    placeholder="13,200,000"
                    className="flex-1 h-full min-w-0 outline-none disabled:bg-white"
                    id="base_price"
                    name="base_price"
                    value={formik.values?.base_price.toLocaleString()}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      const regex = /^[0-9]*$/;
                      if (
                        e.target.value === "" ||
                        regex.test(e.target.value?.replaceAll(",", ""))
                      ) {
                        formik.setFieldValue(
                          "base_price",
                          Number(e.target.value?.replaceAll(",", ""))
                        );
                      }
                    }}
                  />
                  تومان
                </div>
                {formik.errors.base_price && formik.touched.base_price && (
                  <div className="text-red-600 w-full text-xs">
                    {formik.errors.base_price}
                  </div>
                )}
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <div className="p-2 bg-white rounded-[4px] flex items-center gap-2 h-10 text-sm text-blacklead font-medium font-KalamehMed">
                  <input
                    disabled={disabled}
                    type="text"
                    placeholder="13,200,000"
                    className="flex-1 h-full min-w-0 outline-none disabled:bg-white"
                    id="price"
                    name="price"
                    value={formik.values?.price.toLocaleString()}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      const regex = /^[0-9]*$/;
                      if (
                        e.target.value === "" ||
                        regex.test(e.target.value?.replaceAll(",", ""))
                      ) {
                        formik.setFieldValue(
                          "price",
                          Number(e.target.value?.replaceAll(",", ""))
                        );
                      }
                    }}
                  />
                  تومان
                </div>
                {formik.errors.price && formik.touched.price && (
                  <div className="text-red-600 w-full text-xs">
                    {formik.errors.price}
                  </div>
                )}
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <div className="p-2 bg-white rounded-[4px] flex items-center gap-2 h-10 text-sm text-blacklead font-medium font-KalamehMed">
                  <input
                    disabled={disabled}
                    type="text"
                    placeholder="13,200,000"
                    className="flex-1 h-full min-w-0 outline-none disabled:bg-white"
                    id="discount_amount"
                    name="discount_amount"
                    value={formik.values?.discount_amount.toLocaleString()}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      const regex = /^[0-9]*$/;
                      if (
                        e.target.value === "" ||
                        regex.test(e.target.value?.replaceAll(",", ""))
                      ) {
                        formik.setFieldValue(
                          "discount_amount",
                          Number(e.target.value?.replaceAll(",", ""))
                        );
                      }
                    }}
                  />
                  تومان
                </div>
              </div>
            </div>
          </div>
          <div className="w-[40px] flex justify-end">
            {productsPriceChangeMutate?.isLoading ? (
              <Loading className="w-full h-auto text-blacklead animate-pulse" />
            ) : disabled ? (
              <button
                onClick={() => setDisabled(false)}
                className="w-full flex justify-end"
              >
                <Tooltip
                  svgIcon={
                    <EditIcon className="fill-[#00838F] hover:fill-[#4FB3BF] transition-colors duration-500" />
                  }
                  title="تغییر"
                />
              </button>
            ) : (
              <button
                onClick={() => formik.handleSubmit()}
                className="w-[40px] flex justify-end outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="40"
                  fill="none"
                  viewBox="0 0 41 40"
                >
                  <rect
                    width="40"
                    height="40"
                    x="0.5"
                    rx="8"
                    className="fill-[#4FB3BF] hover:fill-[#00838F] transition-colors duration-500"
                  ></rect>
                  <path
                    fill="#fff"
                    d="M23.5 30.75h-6c-5.43 0-7.75-2.32-7.75-7.75v-6c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20c-4.61 0-6.25 1.64-6.25 6.25v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-6c0-4.61-1.64-6.25-6.25-6.25h-6z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M19.08 23.58a.75.75 0 01-.53-.22l-2.83-2.83a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-5.67 5.67a.75.75 0 01-.53.22z"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePriceTable;
