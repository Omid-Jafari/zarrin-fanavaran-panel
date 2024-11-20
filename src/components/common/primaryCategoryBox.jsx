import React, { useRef } from "react";
import { useState } from "react";
import { useOnClickOutside } from "../../utils/OutSideClick";
import SelectCategory from "../category/SelectCategory";
import Loading from "../elements/loading";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";

const PrimaryCategoryBox = (props) => {
  const {
    category_ids,
    setCategory_ids,
    options,
    className,
    height = "44px",
    loading = false,
    searchParams,
    setSearchParams,
  } = props;
  const [open, setOpen] = useState(false);
  const speceficRef = useRef();
  useOnClickOutside(speceficRef, () => setOpen(false));

  const formik = useFormik({
    initialValues: {
      category_ids: [],
    },
    validationSchema: Yup.object({}),
    onSubmit: (data) => {},
    validate: (rr) => {},
  });
  useEffect(() => {
    setCategory_ids(formik.values.category_ids);
  }, [formik.values]);

  return (
    <div
      ref={speceficRef}
      className={` relative ${className}`}
      style={{ height: height }}
    >
      <div
        className={`min-h-[${height}] relative rounded-lg rounded-tr-none overflow-hidden w-full transition-all duration-500 ${
          open ? "shadow-lg bg-cyann" : `bg-white`
        }`}
        style={{ maxHeight: open ? "500px" : height }}
      >
        <div
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-between gap-3 w-full cursor-pointer px-2`}
          style={{ height: height }}
        >
          {loading ? (
            <Loading className="text-white w-12 h-12 animate-pulse" />
          ) : (
            <span
              className={`font-medium font-KalamehMed ease-in-expo duration-500 transition-colors ${
                open ? "text-white" : "text-[#222427]"
              }`}
            >
              {
                options?.filter((option) => option?.value == category_ids)[0]
                  ?.name
              }
            </span>
          )}
          <button type="button" className="mr-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`ease-in-expo duration-500 ${
                open
                  ? "-rotate-180 transition-all fill-white"
                  : "transition-all fill-[#222427]"
              }`}
            >
              <path d="M17.92 8.18H6.08c-.96 0-1.44 1.16-.76 1.84l5.18 5.18c.83.83 2.18.83 3.01 0l1.97-1.97 3.21-3.21c.67-.68.19-1.84-.77-1.84z"></path>
            </svg>
          </button>
        </div>
        <div className="w-full flex flex-col z-30 relative bg-cyann px-2">
          {loading ? (
            <Loading className="text-white w-12 h-12 animate-pulse mx-auto" />
          ) : (
            <SelectCategory
              formik={formik}
              searchCategory=""
              ids={formik.category_ids}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimaryCategoryBox;
