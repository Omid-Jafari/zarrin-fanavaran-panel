import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { products } from "../../api/ApiClient";
import { useOnClickOutside } from "../../utils/OutSideClick";
import Loading from "../elements/loading";

const ProductSelectBox = (props) => {
  const { formik } = props;
  const [filterProductInput, setFilterProductInput] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [productSub, setProductSub] = useState(false);
  const ref = useRef();
  const productsMutation = useMutation(products, {
    onSuccess: (res) => {
      setProductsData(res?.data?.data);
    },
  });

  useEffect(() => {
    productsMutation.mutate({ filterData: filterProductInput });
  }, [filterProductInput]);

  useOnClickOutside(ref, () => setProductSub(false));
  const handleProductId = (product) => {
    // add or remove products id
    let productArray = formik.values.product_ids;
    const productId = formik.values.product_ids.findIndex(
      (pId) => pId === product?.id
    );

    if (productId === -1) {
      productArray.push(product?.id);
    } else {
      productArray = [
        ...productArray.slice(0, productId),
        ...productArray.slice(productId + 1),
      ];
    }

    formik.setFieldValue("product_ids", productArray);
  };

  return (
    <div className="h-11 relative w-full" ref={ref}>
      <div
        className={`absolute top-0 left-0 w-full border-2 bg-blue-lightt rounded-lg text-black p-2 flex flex-col transition-all duration-500 overflow-hidden z-30 ${
          productSub
            ? "max-h-96 border-blacklead"
            : "max-h-11 border-transparent"
        }`}
      >
        <div
          onClick={() => setProductSub(!productSub)}
          className={`h-11 flex items-center justify-between cursor-pointer`}
        >
          {formik.values.all_products === 1 ? "همه محصولات" : "محصولات انتخابی"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`transition-all z-20 duration-500 ease-in-expo fill-black ${
              productSub ? "-rotate-180" : "rotate-0"
            }`}
          >
            <path d="M17.92 8.18H6.08c-.96 0-1.44 1.16-.76 1.84l5.18 5.18c.83.83 2.18.83 3.01 0l1.97-1.97 3.21-3.21c.67-.68.19-1.84-.77-1.84z"></path>
          </svg>
        </div>
        <div
          className={`flex flex-col items-start justify-center w-full transition-all duration-500 overflow-hidden font-normal font-Kalameh text-sm ${
            productSub ? "max-h-96" : "max-h-0"
          }`}
        >
          {formik.values.all_products === 0 ? (
            <>
              <div
                onClick={() => {
                  formik.setFieldValue("all_products", 1);
                  setProductSub(false);
                }}
                className="w-full border-t-[1px] h-11 flex items-center border-[#C4C7C7] p-2 cursor-pointer"
              >
                همه محصولات
              </div>
              <div className="flex-1 flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-full">
                <input
                  type="text"
                  value={filterProductInput}
                  className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none py-2"
                  placeholder="جستجو در محصولات"
                  onChange={(e) => setFilterProductInput(e?.target?.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#222427"
                    d="M11.5 21.75c-5.65 0-10.25-4.6-10.25-10.25S5.85 1.25 11.5 1.25s10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25zm0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75zM22 22.75c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col items-start gap-2 max-h-32 overflow-y-auto w-full">
                {productsMutation?.isLoading ? (
                  <div className="w-full flex justify-center">
                    <Loading className="animate-pulse w-11 h-11 text-blacklead" />
                  </div>
                ) : (
                  productsData?.map((product) => (
                    <div
                      className="flex items-center gap-2 cursor-pointer p-2 font-medium font-KalamehMed border-b w-full border-[#C4C7C7]"
                      onClick={() => handleProductId(product)}
                    >
                      <div
                        className={`w-[12px] h-[12px] rounded-[2px] bg-white border border-[#C4C7C7] relative cursor-pointer`}
                      >
                        {formik.values.product_ids.findIndex(
                          (cId) => cId === product?.id
                        ) !== -1 && (
                          <div className="w-[11.5px] h-[7px] border-l-[1.5px] border-b-[1.5px] border-black -rotate-45"></div>
                        )}
                      </div>
                      <span className="line-clamp-1" title={product?.name_fa}>
                        {product?.name_fa}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  formik.setFieldValue("all_products", 1);
                  setProductSub(false);
                }}
                className="w-full border-t-[1px] h-11 flex items-center border-[#C4C7C7] p-2 cursor-pointer"
              >
                همه محصولات
              </div>

              <div
                onClick={() => {
                  formik.setFieldValue("all_products", 0);
                }}
                className="w-full border-t-[1px] h-11 flex items-center border-[#C4C7C7] p-2 cursor-pointer"
              >
                محصولات انتخابی
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSelectBox;
