import { Dialog, Transition } from "@headlessui/react";
import React, { useImperativeHandle, useRef } from "react";
import { useState } from "react";
import { Fragment } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import AddProductContext from "../../../context/product/AddProductContext";
import { fromEdit } from "../../../utils/FromEdit";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addProducts, editProduct } from "../../../api/ApiClient";

const PublishingProductModal = (props, ref) => {
  const { values } = props;
  const [publishingModal, setPublishingModal] = useState(false);
  const { productData, dispatch } = useContext(AddProductContext);
  const datePickerRef = useRef();
  const timePickerRef = useRef();
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
      : addProductquery.mutate({ ...productData, ...data });
  }
  async function handleAddData(data, callback) {
    await dispatch({
      type: "ADD",
      productData: data,
    });
    callback(data);
  }
  useImperativeHandle(ref, () => ({
    openModal() {
      setPublishingModal(!publishingModal);
    },
  }));
  const publishingFormik = useFormik({
    initialValues: {
      datePicker: new DateObject({ calendar: persian, locale: persian_fa }),
      timePicker: "",
    },
    validationSchema: Yup.object({
      timePicker: Yup.string().required("لطفا زمان را مشخص کنید"),
      datePicker: Yup.object().required("لطفا تاریخ را مشخص کنید"),
    }),

    onSubmit: (data) => {
      const { hour, minute } = data?.timePicker;
      handleAddData(
        {
          ...values,
          publish_at: data?.datePicker
            .setHour(hour)
            .setMinute(minute)
            .setSecond(0)
            .format("YYYY/MM/DD HH:mm:ss"),
        },
        handleAddProduct
      );
    },
  });

  function handleChange(value) {
    publishingFormik.setFieldValue("datePicker", value);
  }
  const handleBlurTime = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      timePickerRef.current.closeCalendar();
    }
  };
  return (
    <Transition.Root show={publishingModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setPublishingModal(!publishingModal)}
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
              <Dialog.Panel className="relative transform rounded-[8px] w-1/3 bg-white shadow-xl transition-all sm:my-8">
                <div className="bg-cyann w-full p-4 font-medium font-KalamehMed text-white">
                  تنظیم زمان انتشار:
                </div>
                <div className="w-full flex gap-4 p-5 flex-col">
                  <div className="w-full flex gap-5 items-center justify-between">
                    <p className="font-medium font-KalamehMed w-14">ساعت:</p>
                    <div
                      onBlur={handleBlurTime}
                      className="flex-1 flex bg-[#DBEEF6] rounded-lg"
                    >
                      <DatePicker
                        ref={timePickerRef}
                        disableDayPicker
                        format="HH:mm"
                        value={publishingFormik.values.timePicker}
                        onChange={(e) =>
                          publishingFormik.setFieldValue("timePicker", e)
                        }
                        plugins={[<TimePicker hideSeconds />]}
                        calendar={persian}
                        locale={persian_fa}
                        inputClass="w-full outline-none bg-[#DBEEF6] p-3 rounded-lg "
                      />
                    </div>
                  </div>
                  {publishingFormik.errors.timePicker && (
                    <div className="text-red-600 w-full text-sm">
                      {publishingFormik.errors.timePicker}
                    </div>
                  )}
                  <div className="w-full flex gap-5 items-center justify-between">
                    <p className="font-medium font-KalamehMed w-14">تاریخ:</p>
                    <div className="flex-1 flex bg-[#DBEEF6] rounded-lg">
                      <DatePicker
                        ref={datePickerRef}
                        value={publishingFormik.values.datePicker}
                        onChange={handleChange}
                        format="YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        inputClass="w-full outline-none bg-[#DBEEF6] p-3 rounded-lg "
                      />
                    </div>
                  </div>
                  {publishingFormik.errors.datePicker && (
                    <div className="text-red-600 w-full text-sm">
                      {publishingFormik.errors.datePicker}
                    </div>
                  )}
                  <div className="w-full flex items-center justify-end gap-3">
                    <button
                      onClick={publishingFormik.handleSubmit}
                      className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 w-24 text-white rounded-[4px] font-KalamehMed font-medium"
                    >
                      تایید
                    </button>
                    <button
                      onClick={() => setPublishingModal(false)}
                      className="font-KalamehMed font-medium h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 w-24 rounded-[4px] flex items-center justify-center gap-1"
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

export default React.forwardRef(PublishingProductModal);
