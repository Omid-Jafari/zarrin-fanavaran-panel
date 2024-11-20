import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useContext, useEffect, useImperativeHandle } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addProducts, editProduct } from "../../../api/ApiClient";
import AddProductContext from "../../../context/product/AddProductContext";
import { fromEdit } from "../../../utils/FromEdit";
import * as Yup from "yup";
import toast from "react-hot-toast";

const PublishProductModal = (props, ref) => {
  const [refdata, setrefdata] = useState({});
  const { values } = props;
  const [publishModal, setPublishModal] = useState(false);
  const { productData, dispatch } = useContext(AddProductContext);
  const param = useParams();
  const navigate = useNavigate();
  const addProductquery = useMutation((data) => addProducts(data), {
    onSuccess: (res) => {
      navigate("/all-products");
    },
  });
  const editProductquery = useMutation((data) => editProduct(data), {
    onSuccess: (res) => {
      navigate("/all-products");
    },
  });
  function handleAddProduct(data) {
    fromEdit()
      ? editProductquery.mutate({
          data: { ...productData, ...data },
          product_id: param?.id,
        })
      : validetaData(data);
  }

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: Yup.object({
      weight: Yup.number().required("لطفا وزن محصول را وارد کنید").nullable(),
      meta_title: Yup.string().required("لطفا متا تایتل محصول را وارد کنید"),
      review: Yup.string().required("فیلد توضیحات الزامی است"),
      canonical: Yup.string().required("لطفا کانونیکال محصول را وارد کنید"),
      attributes: Yup.array()
        .of(Yup.object())
        .min(1, "فیلد ویژگی ها الزامی است"),
      items: Yup.array().of(Yup.object()).min(1, "فیلد آیتم ها الزامی است"),
    }),
    onSubmit: (data) => {
      console.log("fsdfdsfdsfdsfdsfds_formik", data);
      addProductquery.mutate(data);
    },
  });

  useEffect(() => {
    Object.entries(formik.errors)?.map((item) => {
      toast.error(item[1]);
      console.log("ASdasdasdasd", item[1]);
    });
  }, [formik.errors]);

  const validetaData = (data) => {
    let addData = { ...productData, ...data };
    formik.setValues(addData);
    // setrefdata({ ...productData, ...data })
    console.log("fsfasfasfasfsasf", addData);
    formik.handleSubmit();
    // addProductquery.mutate(addData);
  };
  async function handleAddData(data, callback) {
    await dispatch({
      type: "ADD",
      productData: data,
    });
    callback(data);
  }
  useImperativeHandle(ref, () => ({
    openModal() {
      setPublishModal(!publishModal);
    },
  }));
  const publishProduct = () => {
    handleAddData(values, handleAddProduct);
  };
  return (
    <Transition.Root show={publishModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setPublishModal(!publishModal)}
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
              <Dialog.Panel className="relative p-9 transform rounded-[8px] bg-white shadow-xl transition-all sm:my-8">
                <div className="w-full p-4 font-medium font-KalamehMed flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#222427"
                      d="M10.81 16.95c-.19 0-.38-.07-.53-.22l-1.5-1.5a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l.97.97 3.47-3.47c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-4 4c-.14.15-.34.22-.53.22zM14 6.75h-4c-.96 0-2.75 0-2.75-2.75S9.04 1.25 10 1.25h4c.96 0 2.75 0 2.75 2.75 0 .96 0 2.75-2.75 2.75zm-4-4c-.99 0-1.25 0-1.25 1.25S9.01 5.25 10 5.25h4c1.25 0 1.25-.26 1.25-1.25 0-1.25-.26-1.25-1.25-1.25h-4z"
                    ></path>
                    <path
                      fill="#222427"
                      d="M15 22.75H9c-5.62 0-6.75-2.58-6.75-6.75v-6c0-4.56 1.65-6.51 5.71-6.72.41-.02.77.29.79.71.02.42-.3.76-.71.78C5.2 4.93 3.75 5.78 3.75 10v6c0 3.7.73 5.25 5.25 5.25h6c4.52 0 5.25-1.55 5.25-5.25v-6c0-4.22-1.45-5.07-4.29-5.23a.75.75 0 11.08-1.5c4.06.22 5.71 2.17 5.71 6.72v6c0 4.18-1.13 6.76-6.75 6.76z"
                    ></path>
                  </svg>
                  محصول بر روی سایت منتشر شود؟
                </div>
                <div className="w-full flex gap-4 p-5 flex-col">
                  <div className="w-full flex items-center justify-center gap-3">
                    <button
                      onClick={publishProduct}
                      className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff"
                          d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M10.58 15.58a.75.75 0 01-.53-.22l-2.83-2.83a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-5.67 5.67a.75.75 0 01-.53.22z"
                        ></path>
                      </svg>
                      بله، منتشر شود
                    </button>
                    <button
                      onClick={() => setPublishModal(false)}
                      className="font-KalamehMed font-medium h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 rounded-[4px] flex items-center justify-center gap-1"
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#222427"
                          d="M15.13 19.06h-8c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8a4.26 4.26 0 004.25-4.25 4.26 4.26 0 00-4.25-4.25h-11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h11c3.17 0 5.75 2.58 5.75 5.75s-2.58 5.75-5.75 5.75z"
                        ></path>
                        <path
                          fill="#222427"
                          d="M6.43 11.56c-.19 0-.38-.07-.53-.22L3.34 8.78a.754.754 0 010-1.06L5.9 5.16c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.93 8.25l2.03 2.03c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"
                        ></path>
                      </svg>
                      بررسی مجدد{" "}
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

export default React.forwardRef(PublishProductModal);
