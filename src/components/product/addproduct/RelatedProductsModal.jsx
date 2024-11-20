import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { productsFilterData } from "../../../api/ApiClient";
import CustomRadioBtn from "../../common/customRadioBtn";
import Loading from "../../elements/loading";

const RelatedProductsModal = (props) => {
  const { relateModal, formik, setRelateModal } = props;
  const [filterData, setFilterData] = useState("");
  const [productsData, setProductsData] = useState({ show: false, data: [] });
  const productsFilterDataMutation = useMutation(productsFilterData, {
    onSuccess: (res) => {
      setProductsData((prev) => {
        return { ...prev, data: res?.data?.data };
      });
    },
  });
  const handleBlur = (event) => {
    // if the blur was because of outside focus
    // currentTarget is the parent element, relatedTarget is the clicked element
    //mach be man😍
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setProductsData((prev) => {
        return { ...prev, show: false };
      });
    }
  };
  useEffect(() => {
    productsFilterDataMutation.mutate({ filterData });
  }, [filterData]);
  return (
    <Transition.Root show={relateModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setRelateModal(!relateModal)}
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-[8px] w-3/5  bg-white shadow-xl transition-all sm:my-8">
                <div className="bg-cyann w-full p-4 font-medium font-KalamehMed text-white">
                  تنظیمات دستی و خودکار محصولات مرتبط:
                </div>
                <div className="w-full flex flex-col items-start gap-4 p-4">
                  <div className="flex w-full items-center gap-3">
                    <CustomRadioBtn
                      clickFunc={() => {
                        formik.values.relatable === 0
                          ? formik.setFieldValue("relatable", 1)
                          : formik.setFieldValue("relatable", 0);
                      }}
                      checkCondition={formik.values.relatable === 1}
                    />
                    <p className="font-medium font-KalamehMed">
                      نمایش محصولات مرتبط برای این محصول
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-lightt">
                    انتخاب محصولات مرتبط*
                  </div>
                  <div className="w-full rounded-lg bg-blue-lightt flex flex-col p-4 gap-2 ">
                    {formik.values.relatives?.map((selectedProducts) => (
                      <div className="bg-[#C4C7C7] w-full flex items-center rounded-[4px] p-2 gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="16"
                          fill="none"
                          viewBox="0 0 15 16"
                          className="cursor-pointer"
                          onClick={() =>
                            formik.setFieldValue(
                              "relatives",
                              formik.values.relatives?.filter(
                                (item) => item !== selectedProducts
                              )
                            )
                          }
                        >
                          <path
                            fill="#222427"
                            d="M1.567 15.5c-.398 0-.797-.147-1.111-.461a1.58 1.58 0 010-2.221L12.322.956a1.582 1.582 0 012.222 0 1.58 1.58 0 010 2.221L2.678 15.04a1.521 1.521 0 01-1.11.461z"
                          ></path>
                          <path
                            fill="#222427"
                            d="M13.433 15.5c-.398 0-.797-.147-1.111-.461L.456 3.177a1.58 1.58 0 010-2.221 1.582 1.582 0 012.222 0l11.866 11.861a1.58 1.58 0 010 2.222 1.555 1.555 0 01-1.111.461z"
                          ></path>
                        </svg>
                        <p
                          className="w-full truncate"
                          title={selectedProducts?.name_fa}
                        >
                          {selectedProducts?.name_fa}
                        </p>
                      </div>
                    ))}
                    <div
                      tabIndex="1"
                      onBlur={handleBlur}
                      className=" flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-full relative"
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
                          d="M11.5 21.75c-5.65 0-10.25-4.6-10.25-10.25S5.85 1.25 11.5 1.25s10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25zm0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75zM22 22.75c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
                        ></path>
                      </svg>
                      <input
                        type="text"
                        className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none"
                        placeholder="جستجو در محصولات"
                        value={filterData}
                        onChange={(e) => setFilterData(e?.target?.value)}
                        onFocus={() =>
                          setProductsData((prev) => {
                            return { ...prev, show: true };
                          })
                        }
                      />
                      {productsData?.show && (
                        <div className="absolute z-10 w-full left-0 top-12 flex flex-col max-h-36 bg-white rounded-[6px] border overflow-y-auto">
                          {productsFilterDataMutation?.isLoading ? (
                            <div className="w-full flex justify-center">
                              <Loading className="w-14 h-14 text-blacklead animate-pulse" />
                            </div>
                          ) : (
                            productsData?.data?.map((product) => {
                              const check =
                                formik.values.relatives.indexOf(product);
                              if (check === -1) {
                                return (
                                  <div
                                    className="w-full py-2 px-3 border-b cursor-pointer hover:bg-blue-lightt transition duration-300"
                                    onClick={() => {
                                      if (check === -1) {
                                        formik.setFieldValue("relatives", [
                                          ...formik.values.relatives,
                                          product,
                                        ]);
                                      } else return;
                                    }}
                                  >
                                    <p className="truncate">
                                      {product?.name_fa}
                                    </p>
                                  </div>
                                );
                              } else return;
                            })
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full items-center gap-3">
                    <CustomRadioBtn
                      clickFunc={() => {
                        formik.values.product_related_type === "SEMI_AUTO"
                          ? formik.setFieldValue(
                              "product_related_type",
                              "MANUAL"
                            )
                          : formik.setFieldValue(
                              "product_related_type",
                              "SEMI_AUTO"
                            );
                      }}
                      checkCondition={
                        formik.values.product_related_type === "SEMI_AUTO"
                      }
                    />
                    <p className="font-medium font-KalamehMed">
                      سایر محصولات مرتبط را به صورت خودکار اضافه کن
                    </p>
                  </div>
                  <p className="text-sm text-primary">
                    *در صورت خاموش بودن این گزینه، فقط محصولاتی که به صورت دستی
                    وارد شده‌اند، نمایش داده خواهد شد.
                  </p>
                  <button
                    className="h-11 flex items-center mr-auto bg-primary hover:bg-blacklead transition-colors duration-500 px-5 text-white rounded-[4px] font-KalamehMed font-medium"
                    onClick={() => setRelateModal(false)}
                  >
                    تایید
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

export default RelatedProductsModal;
