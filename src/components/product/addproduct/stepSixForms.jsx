import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import Loading from "../../elements/loading";
import toast from "react-hot-toast";

const StepSixForms = (props) => {
  const {
    color,
    index,
    setItems,
    guaranteesData,
    setGuaranteesData,
    guaranteesFilterDataMutation,
  } = props;
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      ...color,
    },
    validationSchema: Yup.object({
      stock: Yup.string().required("لطفا تعداد موجودی محصول را وارد کنید"),
      base_price: Yup.string().required(
        "لطفا قیمت تمام شده محصول را وارد کنید"
      ),
      price: Yup.string().required("لطفا قیمت فروش محصول را وارد کنید"),
      guarantee_id: Yup.number().required("لطفا گارانتی محصول را انتخاب کنید"),
    }),

    onSubmit: (data) => {
      formik.values.slug = slugPersian(data.name_fa);
    },
    validate: (rr) => {},
  });
  useEffect(() => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          return { ...formik.values };
        } else {
          return item;
        }
      })
    );
  }, [formik.values]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-2">
        <div className="h-[50px] w-[164px] px-3 flex items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
          موجودی محصول:
        </div>
        <div className="py-4 flex-1 px-4 flex bg-white rounded-lg flex-col gap-3">
          <div className="flex w-full items-center gap-2">
            <p className="font-medium font-KalamehMed text-sm">موجودی:*</p>
            <input
              type="number"
              placeholder="160"
              className="rounded-lg h-10 w-[80px] bg-blue-lightt outline-0 text-center placeholder:text-[#C4C7C7] px-2"
              id="stock"
              name="stock"
              value={formik.values.stock}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p className="font-medium font-KalamehMed text-sm">عدد</p>
          </div>
          {formik.errors.stock && formik.touched.stock && (
            <div className="text-red-600 text-sm">{formik.errors.stock}</div>
          )}
          <div className="flex w-full items-center gap-2">
            <p className="font-medium font-KalamehMed text-sm">
              حداکثر تعداد فروش در هر سبد خرید:
            </p>
            <input
              type="number"
              placeholder="160"
              className="rounded-lg h-10 w-[80px] bg-blue-lightt outline-0 text-center placeholder:text-[#C4C7C7] px-2"
              id="max_qty"
              name="max_qty"
              value={formik.values.max_qty}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <p className="font-medium font-KalamehMed text-sm">عدد</p>
          </div>
          <p className="font-semibold font-KalamehSemi text-primary text-sm">
            در صورتی که حداکثر تعداد فروش مشخص نشود ، فروش به هر کاربر بر اساس
            موجودی تنظیم خواهد شد.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <div className="h-[50px] w-[164px] px-3 flex items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
          قیمت تمام شده:
        </div>
        <div className="flex flex-wrap flex-1 h-[50px] bg-white rounded-[4px] border border-blacklead px-3 items-center gap-2">
          <input
            type="text"
            placeholder="12,830,000"
            className="rounded-lg h-10 outline-0 text-center w-[180px] placeholder:text-[#C4C7C7] px-2"
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
          <p className="font-medium font-KalamehMed text-sm">تومان</p>
        </div>
      </div>
      {formik.errors.base_price && formik.touched.base_price && (
        <div className="text-red-600 w-full text-sm">
          {formik.errors.base_price}
        </div>
      )}
      <div className="flex items-start gap-2">
        <div className="h-[50px] w-[164px] px-3 flex items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
          قیمت فروش:
        </div>
        <div className="flex flex-wrap flex-1 h-[50px] bg-white rounded-[4px] border border-blacklead px-3 items-center gap-2">
          <input
            type="text"
            placeholder="13,200,000"
            className="rounded-lg h-10 outline-0 text-center w-[180px] placeholder:text-[#C4C7C7] px-2"
            id="price"
            name="price"
            value={formik.values?.price.toLocaleString()}
            onBlur={(e) => {
              formik.handleBlur(e);
              if (formik.values?.price < formik.values.base_price) {
                toast.error("قیمت فروش کوچک تر از قیمت تمام شده است");
              }
            }}
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
          <p className="font-medium font-KalamehMed text-sm">تومان</p>
        </div>
      </div>
      {formik.errors.price && formik.touched.price && (
        <div className="text-red-600 w-full text-sm">{formik.errors.price}</div>
      )}
      <div className="flex items-start gap-2">
        <div className="h-[50px] w-[164px] px-3 flex items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
          انتخاب گارانتی:
        </div>
        <div className="flex flex-1 h-[50px] bg-white rounded-[4px] border border-blacklead px-3 items-center gap-2 relative">
          <div
            className="flex w-full items-center cursor-pointer h-full"
            onClick={() => setGuaranteeOpen(!guaranteeOpen)}
          >
            {guaranteesFilterDataMutation?.isLoading ? (
              <Loading className="w-16 h-16 text-blacklead animate-pulse" />
            ) : (
              <input
                type="text"
                className="rounded-lg disabled:bg-white cursor-pointer flex-1 h-10 outline-0 w-[100px] placeholder:text-[#C4C7C7] px-2"
                disabled
                value={
                  guaranteesData.filter((guarantee) => {
                    if (guarantee.id === formik.values?.guarantee_id) {
                      return guarantee?.name;
                    }
                  })[0]?.name || ""
                }
                onBlur={formik.handleBlur}
              />
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="8"
              fill="none"
              viewBox="0 0 14 8"
              className={`mr-auto transition-all ${
                guaranteeOpen ? "-rotate-180" : ""
              }`}
            >
              <path
                fill="#222427"
                d="M13.68 2.02l-3.21 3.21L8.51 7.2c-.83.83-2.18.83-3.01 0L.32 2.02C-.36 1.34.13.18 1.08.18h11.84c.96 0 1.44 1.16.76 1.84z"
              ></path>
            </svg>
          </div>
          <div
            className={`w-full absolute top-[50px] overflow-hidden left-0 z-50 transition-[max-height] duration-500 ${
              guaranteeOpen ? "max-h-36" : "max-h-0"
            }`}
          >
            <div className="w-full h-36 flex overflow-y-auto flex-col bg-white rounded-[4px] border border-[#8E9191]">
              {guaranteesData?.map((guarantee) => (
                <div
                  className={`border-b py-2 px-2 border-[#8E9191] w-full cursor-pointer transition-colors ${
                    formik.values?.guarantee_id === guarantee?.id
                      ? "bg-blue-lightt"
                      : "bg-white hover:bg-blue-lightt "
                  }`}
                  onClick={() => {
                    formik.setFieldValue("guarantee_id", guarantee?.id);
                    setGuaranteeOpen(false);
                  }}
                >
                  {guarantee?.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {formik.errors.guarantee_id && formik.touched.guarantee_id && (
        <div className="text-red-600 w-full text-sm">
          {formik.errors.guarantee_id}
        </div>
      )}
      <div className="flex items-start gap-2">
        <div className="h-[50px] w-[164px] px-3 flex gap-3 items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
          <label
            for="default-toggle"
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              name="status"
              id="default-toggle"
              className="sr-only peer"
              checked={formik.values?.discountDisable}
              onChange={(e) => {
                if (e.target?.checked) {
                  formik.setFieldValue("discountDisable", true);
                  formik.setFieldValue("discount_amount", "");
                } else {
                  formik.setFieldValue("discountDisable", false);
                  formik.setFieldValue("discount_amount", 0);
                }
              }}
            />
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none cursor-pointer rounded-full peer
                    peer-checked:after:translate-x-full
                     peer-checked:after:border-white after:content-[''] 
                     after:absolute after:top-[2px] after:left-[2px] after:bg-white
                      after:border-gray-100 after:border after:rounded-full after:h-5 
                      after:w-5 after:transition-all dark:bg-green-100 peer-checked:bg-green-700"
            ></div>
          </label>
          تخفیف:
        </div>
        <div
          className={`flex flex-wrap flex-1 h-[50px] rounded-[4px] border border-blacklead px-3 items-center gap-2 ${
            !formik.values?.discountDisable ? "bg-[#EFF1F1]" : "bg-white"
          }`}
        >
          <input
            type="text"
            placeholder="250,000"
            className="rounded-lg h-10 outline-0 text-center w-[100px] placeholder:text-[#C4C7C7] px-2"
            id="discount_amount"
            name="discount_amount"
            value={formik.values?.discount_amount.toLocaleString()}
            onBlur={formik.handleBlur}
            disabled={!formik.values?.discountDisable}
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
          <p
            className={`font-medium font-KalamehMed text-sm ${
              !formik.values?.discountDisable ? "text-[#C4C7C7]" : ""
            }`}
          >
            تومان
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepSixForms;
