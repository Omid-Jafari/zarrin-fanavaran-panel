import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import {
  ADD_ATTRIBUTE_VALIDATION_SCHEMA,
  ADD_CATEGORY_VALIDATION_SCHEMA,
} from "../../constant/formik/validation_schema";
import slugify from "react-slugify";
import slugPersian from "../../utils/slugPersian";
import TagInput from "../../components/elements/tag-input";
// import CategoryBelectBox from "../../components/category/category-select-box";
import AddMediaCategory from "../../components/category/add-media-category";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addAttributes,
  addCategory,
  singleAttribute,
  updateAttribute,
} from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import toast from "react-hot-toast";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import Tooltip from "../../components/elements/Tooltip";
import AddIcon from "../../../public/images/icons/addIcon";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import BrandSelectBox from "../../components/category/brand-select-box";
import { useStrictDroppable } from "../../utils/hooks/useStrictDroppable";

const EditAttribute = () => {
  const navigate = useNavigate();
  const [OpenForIconMedia, setOpenForIconMedia] = useState(false);
  const itemRef = useRef(null);
  const [attributeData, setAttributeData] = useState({});
  const [showIconMedia, setshowIconMedia] = useState(null);
  const [options, setOptions] = useState([]);
  const { id } = useParams();
  const getColorQuery = useQuery(
    ["getAttributeQuery"],
    async () => singleAttribute(id),
    {
      onSuccess: (res) => {
        setAttributeData(res?.data?.data);
        setOptions(res?.data?.data?.options);
      },
    }
  );
  const [enabled] = useStrictDroppable(getColorQuery?.isLoading);
  const updateAttributesMutataion = useMutation(
    (data) => updateAttribute(data),
    {
      onSuccess: (res) => {
        navigate(-1);
        formik.resetForm();
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      type: attributeData?.type || "",
      name: attributeData?.name || "",
      category_ids:
        attributeData?.categories?.map((category) => category.id) || [],
      icon_id: attributeData?.media?.icon?.id || "",
      is_filter: attributeData?.is_filter || 0,
    },
    enableReinitialize: true,
    validationSchema: () =>
      ADD_ATTRIBUTE_VALIDATION_SCHEMA(formik.values, options),
    onSubmit: (values) => {
      values.type === "TEXT" && (values.is_filter = 0);
      (values.type === "MULTIPLE_OPTION" || values.type === "SINGLE_OPTION") &&
        (values.options = options);
      (values.type === "MULTIPLE_OPTION" || values.type === "SINGLE_OPTION") &&
      options.length === 0
        ? ""
        : updateAttributesMutataion.mutate({ id, body: values });
    },
    validate: (res) => {
      if ((res.name == "") | (res.icon_id == "") || res.parent_id == "") {
        itemRef.current?.scrollIntoView({ behavior: "smooth" }, 500);
      }
    },
  });
  const optionFormik = useFormik({
    initialValues: {
      name_fa: "",
      name_en: "",
    },
    validationSchema: Yup.object({
      name_fa: Yup.string().required("لطفا  نام فارسی  را وارد کنید"),
      name_en: Yup.string().required("لطفا  نام انگلیسی  را وارد کنید"),
    }),
    onSubmit: (values) => {
      setOptions((prev) => [
        ...prev,
        {
          name_fa: values?.name_fa,
          name_en: values?.name_en,
          priority: (options?.length + 1) * 1000,
        },
      ]);
      optionFormik.resetForm();
    },
  });
  const selectedItemForIcon = (item) => {
    setshowIconMedia(item?.file);
    formik.values.icon_id = item.id;
  };
  const filterCheckBox = (e) => {
    if (e?.target?.checked) {
      formik.setFieldValue("is_filter", 1);
    } else {
      formik.setFieldValue("is_filter", 0);
    }
  };
  const deleteOption = (index) => {
    setOptions((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };
  useEffect(() => {
    setshowIconMedia(attributeData?.media?.icon?.file);
  }, [attributeData]);
  // make it draggable
  const handleOnDragEnd = (result) => {
    const srcPriority = options[result?.source?.index]?.priority;
    const destPriority = options[result?.destination?.index]?.priority;
    if (srcPriority > destPriority) {
      setOptions((prev) =>
        [...prev, (prev[result?.source?.index].priority = destPriority - 100)]
          .slice(0, -1)
          .sort((a, b) => a.priority - b.priority)
      );
    } else {
      setOptions((prev) =>
        [...prev, (prev[result?.source?.index].priority = destPriority + 100)]
          .slice(0, -1)
          .sort((a, b) => a.priority - b.priority)
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="w-full p-5" ref={itemRef}>
        <div className="w-full flex items-center justify-between">
          <h5 className="font-KalamehMed text-lg font-medium flex items-center text-black gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#222427"
                d="M19.42 11.75H16c-.41 0-.75-.34-.75-.75V4.01c0-.74.29-1.43.81-1.95s1.21-.81 1.95-.81h.01c1.25.01 2.43.5 3.33 1.39.9.91 1.39 2.11 1.39 3.36v2.42c.01 1.99-1.33 3.33-3.32 3.33zm-2.67-1.5h2.67c1.16 0 1.83-.67 1.83-1.83V6c0-.86-.34-1.68-.95-2.3-.61-.6-1.43-.94-2.28-.95h-.01c-.33 0-.65.13-.89.37s-.37.55-.37.89v6.24z"
              ></path>
              <path
                fill="#222427"
                d="M9 23.33c-.47 0-.91-.18-1.24-.52L6.1 21.14a.246.246 0 00-.33-.02L4.05 22.4c-.53.4-1.23.47-1.83.17-.6-.3-.97-.9-.97-1.57V6c0-3.02 1.73-4.75 4.75-4.75h12c.41 0 .75.34.75.75s-.34.75-.75.75c-.69 0-1.25.56-1.25 1.25v17c0 .67-.37 1.27-.97 1.57-.6.3-1.3.24-1.83-.16l-1.71-1.28a.243.243 0 00-.32.02l-1.68 1.68c-.33.32-.77.5-1.24.5zm-3.09-3.76c.46 0 .91.17 1.25.52l1.66 1.67c.06.06.14.07.18.07.04 0 .12-.01.18-.07l1.68-1.68c.62-.62 1.6-.68 2.29-.15l1.7 1.27c.11.08.21.05.26.02.05-.03.14-.09.14-.22V4c0-.45.11-.88.3-1.25H6C3.78 2.75 2.75 3.78 2.75 6v15c0 .14.09.2.14.23.06.03.16.05.26-.03l1.71-1.28c.31-.23.68-.35 1.05-.35z"
              ></path>
              <path
                fill="#222427"
                d="M12 13.76H9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75s-.34.75-.75.75zM12 9.76H9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3c.41 0 .75.34.75.75s-.34.75-.75.75zM5.97 10.01c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5.97 14.01c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
              ></path>
            </svg>
            تغییر ویژگی محصول
          </h5>
          <button
            onClick={() => navigate(-1)}
            className="flex flex-row justify-between bg-[#EFF1F1] 
                      text-white rounded-[4px] p-[10px] "
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.13 19.0586H7.13C6.72 19.0586 6.38 18.7186 6.38 18.3086C6.38 17.8986 6.72 17.5586 7.13 17.5586H15.13C17.47 17.5586 19.38 15.6486 19.38 13.3086C19.38 10.9686 17.47 9.05859 15.13 9.05859H4.13C3.72 9.05859 3.38 8.71859 3.38 8.30859C3.38 7.89859 3.72 7.55859 4.13 7.55859H15.13C18.3 7.55859 20.88 10.1386 20.88 13.3086C20.88 16.4786 18.3 19.0586 15.13 19.0586Z"
                fill="#222427"
              />
              <path
                d="M6.43006 11.5589C6.24006 11.5589 6.05006 11.4889 5.90006 11.3389L3.34006 8.77891C3.05006 8.48891 3.05006 8.00891 3.34006 7.71891L5.90006 5.15891C6.19006 4.86891 6.67006 4.86891 6.96006 5.15891C7.25006 5.44891 7.25006 5.92891 6.96006 6.21891L4.93006 8.24891L6.96006 10.2789C7.25006 10.5689 7.25006 11.0489 6.96006 11.3389C6.82006 11.4889 6.62006 11.5589 6.43006 11.5589Z"
                fill="#222427"
              />
            </svg>

            <p className="text-[16px] text-[#222427] mr-1">بازگشت</p>
          </button>
        </div>

        <div className="w-full">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full bg-blue-lightt rounded-lg p-6 mt-4 flex flex-col gap-5 ">
              <div className="w-full flex flex-row justify-center items-center gap-3">
                <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                  نام دسته:*
                </div>
                <input
                  className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh placeholder:text-[#C4C7C7]"
                  placeholder="برای مثال: لوازم الکترونیکی"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                  <small className="text-red-700">{formik.errors.name}</small>
                )}
              </div>
              <div className="w-full flex flex-row justify-center items-start gap-3">
                <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43] ">
                  انتخاب مادر :*
                </div>
                <div className="w-5/6 relative">
                  <BrandSelectBox formik={formik} />
                </div>
                {formik.errors.parent_id && formik.touched.parent_id && (
                  <small className="text-red-700">
                    {formik.errors.parent_id}
                  </small>
                )}
              </div>
              <div className="w-full flex flex-row justify-start items-center gap-6 ">
                <div
                  className="flex flex-row"
                  onClick={(e) => setOpenForIconMedia(!OpenForIconMedia)}
                >
                  <div className="bg-primary flex w-[90px] h-[90px] rounded-lg z-30 cursor-pointer flex-col justify-around py-3 items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                        fill="white"
                      />
                      <path
                        d="M8.81994 9.75043C7.96994 9.75043 7.11994 9.43043 6.46994 8.78043C6.17994 8.49043 6.17994 8.01043 6.46994 7.72043C6.75994 7.43043 7.23994 7.43043 7.52994 7.72043C8.23994 8.43043 9.39994 8.43043 10.1099 7.72043C10.3999 7.43043 10.8799 7.43043 11.1699 7.72043C11.4599 8.01043 11.4599 8.49043 11.1699 8.78043C10.5199 9.42043 9.66994 9.75043 8.81994 9.75043Z"
                        fill="#003E43"
                      />
                      <path
                        d="M15.1798 9.75043C14.3298 9.75043 13.4798 9.43043 12.8298 8.78043C12.5398 8.49043 12.5398 8.01043 12.8298 7.72043C13.1198 7.43043 13.5998 7.43043 13.8898 7.72043C14.5998 8.43043 15.7598 8.43043 16.4698 7.72043C16.7598 7.43043 17.2398 7.43043 17.5298 7.72043C17.8198 8.01043 17.8198 8.49043 17.5298 8.78043C16.8798 9.42043 16.0298 9.75043 15.1798 9.75043Z"
                        fill="#003E43"
                      />
                      <path
                        d="M12 19.15C9.1 19.15 6.75 16.79 6.75 13.9C6.75 12.99 7.49 12.25 8.4 12.25H15.6C16.51 12.25 17.25 12.99 17.25 13.9C17.25 16.79 14.9 19.15 12 19.15ZM8.4 13.75C8.32 13.75 8.25 13.82 8.25 13.9C8.25 15.97 9.93 17.65 12 17.65C14.07 17.65 15.75 15.97 15.75 13.9C15.75 13.82 15.68 13.75 15.6 13.75H8.4Z"
                        fill="white"
                      />
                    </svg>
                    <span className="font-Kalameh text-white text-sm">
                      انتخاب ایکون
                    </span>
                  </div>
                  <AddMediaCategory
                    open={OpenForIconMedia}
                    setOpen={setOpenForIconMedia}
                    selectedItem={(e) => selectedItemForIcon(e)}
                  />
                  <div
                    className={`w-[220px] h-[90px] ${
                      showIconMedia != null ? "h-[90px]" : "h-0 hidden"
                    } transition-all ease-linear rounded-tl-lg rounded-bl-lg bg-white -mr-2 flex justify-center items-center`}
                  >
                    <img
                      className="max-w-[77px] max-h-[60px] w-full object-contain"
                      src={showIconMedia}
                    />
                  </div>
                </div>
              </div>
              {formik.errors.icon_id && formik.touched.icon_id && (
                <small className="text-red-700">{formik.errors.icon_id}</small>
              )}
              <div className="w-full flex flex-row justify-start items-center gap-3">
                <div className="w-[15%] bg-white rounded-lg px-3 h-[51px] flex items-center font-medium font-KalamehMed text-[#003E43]">
                  انتخاب نوع داده:*
                </div>
                <button
                  className={`w-[15%]  rounded-lg px-3 h-[51px] flex items-center gap-2 font-medium font-KalamehMed group hover:bg-blacklead transition-all duration-500 hover:text-white focus:outline-none ${
                    formik?.values?.type === "TEXT"
                      ? "bg-blacklead text-white"
                      : "bg-white text-[#003E43]"
                  }`}
                  type="button"
                  onClick={() => formik.setFieldValue("type", "TEXT")}
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-full relative border-[2px] border-primary flex items-center justify-center group-hover:border-white transition-all duration-500 box-border overflow-hidden ${
                      formik?.values?.type === "TEXT"
                        ? "border-white"
                        : "border-primary"
                    }`}
                  >
                    <div
                      className={` group-hover:bg-white transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                        formik?.values?.type === "TEXT"
                          ? "bg-white"
                          : "bg-transparent"
                      }`}
                    ></div>
                  </div>
                  متنی
                </button>
                <button
                  className={`w-[15%]  rounded-lg px-3 h-[51px] flex items-center gap-2 font-medium font-KalamehMed group hover:bg-blacklead transition-all duration-500 hover:text-white focus:outline-none ${
                    formik?.values?.type === "MULTIPLE_OPTION"
                      ? "bg-blacklead text-white"
                      : "bg-white text-[#003E43]"
                  }`}
                  type="button"
                  onClick={() =>
                    formik.setFieldValue("type", "MULTIPLE_OPTION")
                  }
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-full relative border-[2px] border-primary flex items-center justify-center group-hover:border-white transition-all duration-500 box-border overflow-hidden ${
                      formik?.values?.type === "MULTIPLE_OPTION"
                        ? "border-white"
                        : "border-primary"
                    }`}
                  >
                    <div
                      className={` group-hover:bg-white transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                        formik?.values?.type === "MULTIPLE_OPTION"
                          ? "bg-white"
                          : "bg-transparent"
                      }`}
                    ></div>
                  </div>
                  انتخابی دسته ای
                </button>
                <button
                  className={`w-[15%]  rounded-lg px-3 h-[51px] flex items-center gap-2 font-medium font-KalamehMed group hover:bg-blacklead transition-all duration-500 hover:text-white focus:outline-none ${
                    formik?.values?.type === "SINGLE_OPTION"
                      ? "bg-blacklead text-white"
                      : "bg-white text-[#003E43]"
                  }`}
                  type="button"
                  onClick={() => formik.setFieldValue("type", "SINGLE_OPTION")}
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-full relative border-[2px] border-primary flex items-center justify-center group-hover:border-white transition-all duration-500 box-border overflow-hidden ${
                      formik?.values?.type === "SINGLE_OPTION"
                        ? "border-white"
                        : "border-primary"
                    }`}
                  >
                    <div
                      className={` group-hover:bg-white transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                        formik?.values?.type === "SINGLE_OPTION"
                          ? "bg-white"
                          : "bg-transparent"
                      }`}
                    ></div>
                  </div>
                  انتخابی تکی
                </button>
                <button
                  className={`w-[15%]  rounded-lg px-3 h-[51px] flex items-center gap-2 font-medium font-KalamehMed group hover:bg-blacklead transition-all duration-500 hover:text-white focus:outline-none ${
                    formik?.values?.type === "BOOLEAN"
                      ? "bg-blacklead text-white"
                      : "bg-white text-[#003E43]"
                  }`}
                  type="button"
                  onClick={() => formik.setFieldValue("type", "BOOLEAN")}
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-full relative border-[2px] border-primary flex items-center justify-center group-hover:border-white transition-all duration-500 box-border overflow-hidden ${
                      formik?.values?.type === "BOOLEAN"
                        ? "border-white"
                        : "border-primary"
                    }`}
                  >
                    <div
                      className={` group-hover:bg-white transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full ${
                        formik?.values?.type === "BOOLEAN"
                          ? "bg-white"
                          : "bg-transparent"
                      }`}
                    ></div>
                  </div>
                  تک حالتی
                </button>
              </div>
              {formik.errors.type && formik.touched.type && (
                <small className="text-red-700">{formik.errors.type}</small>
              )}
              {formik?.values?.type === "TEXT" && (
                <div className="w-full bg-white p-4 rounded-lg">
                  مهم: داده های متنی در زمان تعریف محصول قابل مشخص کردن هستند
                </div>
              )}
              {formik?.values?.type === "BOOLEAN" && (
                <div className="w-full bg-white p-4 rounded-lg flex flex-col gap-5">
                  <p className="">
                    مهم: داده های تک حالتی در زمان تعریف محصول قابل مشخص کردن
                    هستند
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formik?.values?.is_filter}
                      onChange={(e) => filterCheckBox(e)}
                      className=""
                    />
                    <p className="font-semibold font-KalamehSemi">
                      تعریف این ویژگی به عنوان فیلتر
                    </p>
                  </div>
                </div>
              )}
              {(formik?.values?.type === "MULTIPLE_OPTION" ||
                formik?.values?.type === "SINGLE_OPTION") && (
                <div className="w-full bg-white p-4 rounded-lg flex flex-col gap-5">
                  <p className="">
                    مهم: داده های فارسی و انگلیسی فقط به صورت همزمان اضافه و حذف
                    میشوند
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formik?.values?.is_filter}
                      onChange={(e) => filterCheckBox(e)}
                      className=""
                    />
                    <p className="font-semibold font-KalamehSemi">
                      تعریف این ویژگی به عنوان فیلتر
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-1 w-full flex flex-col gap-4 rounded-lg bg-blue-lightt p-4 ">
                      <div className="w-full grid grid-cols-8 gap-5">
                        <div className="col-span-4 flex flex-col gap-2">
                          <p className="font-medium font-KalamehMed">
                            داده های انگلیسی*
                          </p>
                          <input
                            type="text"
                            name="name_en"
                            placeholder="برای مثال:  2GB"
                            className="p-3 rounded-lg placeholder:text-[#C4C7C7] focus:outline-none"
                            value={optionFormik.values.name_en}
                            onChange={optionFormik.handleChange}
                          />
                          {optionFormik.errors.name_en &&
                            optionFormik.touched.name_en && (
                              <small className="text-red-700">
                                {optionFormik.errors.name_en}
                              </small>
                            )}
                        </div>
                        <div className="col-span-4 flex flex-col gap-2">
                          <p className="font-medium font-KalamehMed">
                            داده های فارسی*
                          </p>
                          <input
                            type="text"
                            name="name_fa"
                            placeholder="برای مثال:  2 گیگابایت"
                            className="p-3 rounded-lg placeholder:text-[#C4C7C7] focus:outline-none"
                            value={optionFormik.values.name_fa}
                            onChange={optionFormik.handleChange}
                          />
                          {optionFormik.errors.name_fa &&
                            optionFormik.touched.name_fa && (
                              <small className="text-red-700">
                                {optionFormik.errors.name_fa}
                              </small>
                            )}
                        </div>
                      </div>
                      <div className="w-full" id="option">
                        {enabled && (
                          <Droppable droppableId="option">
                            {(provided) => (
                              <div
                                className="w-full flex flex-col"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {options?.map((option, index) => (
                                  <Draggable
                                    key={`option ${index}`}
                                    draggableId={`option ${index}`}
                                    index={index}
                                    id={option?.priority}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="w-full grid grid-cols-8 items-center gap-5 bg-white rounded-lg p-3 my-2"
                                      >
                                        <div className="col-span-1 flex">
                                          <Tooltip
                                            svgIcon={
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                className="cursor-grab focus:cursor-grabbing"
                                              >
                                                <path
                                                  fill="#222427"
                                                  d="M21 7.75H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75zM21 12.75H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75zM21 17.75H3c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18c.41 0 .75.34.75.75s-.34.75-.75.75z"
                                                ></path>
                                              </svg>
                                            }
                                            title="جابجایی"
                                          />
                                        </div>
                                        <div className="col-span-3 justify-self-center">
                                          <p className="">{option?.name_en}</p>
                                        </div>
                                        <div className="col-span-3 justify-self-center">
                                          <p className="">{option?.name_fa}</p>
                                        </div>
                                        <div className="col-span-1 justify-self-end flex">
                                          <button
                                            type="button"
                                            className="appearance-none"
                                            onClick={() => deleteOption(index)}
                                          >
                                            <Tooltip
                                              svgIcon={
                                                <DeleteIcon className="fill-[#CA3636] hover:fill-[#7D3C45] transition-colors duration-500" />
                                              }
                                              title="حذف"
                                            />
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        )}
                      </div>
                    </div>
                    <div className="pt-12 pr-2">
                      <button
                        type="button"
                        onClick={optionFormik.handleSubmit}
                        className="flex items-center justify-center gap-1.5 h-12 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                      >
                        <AddIcon className="fill-white" />
                        افزودن داده
                      </button>
                    </div>
                  </div>
                  {(formik.values.type === "MULTIPLE_OPTION" ||
                    formik.values.type === "SINGLE_OPTION") &&
                    options.length === 0 && (
                      <small className="text-red-700">
                        {formik.errors.options}
                      </small>
                    )}
                </div>
              )}
              <button
                className="bg-primary text-white rounded-[4px] font-Kalameh flex flex-row justify-center items-center gap-2 h-[44px]"
                type="button"
                onClick={formik.handleSubmit}
              >
                {updateAttributesMutataion.isLoading ? (
                  <Loading className="w-16 h-16 text-blacklead animate-pulse" />
                ) : (
                  <>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H16.5C16.91 11.25 17.25 11.59 17.25 12C17.25 12.41 16.91 12.75 16.5 12.75Z"
                        fill="white"
                      />
                      <path
                        d="M12.5 16.75C12.09 16.75 11.75 16.41 11.75 16V8C11.75 7.59 12.09 7.25 12.5 7.25C12.91 7.25 13.25 7.59 13.25 8V16C13.25 16.41 12.91 16.75 12.5 16.75Z"
                        fill="white"
                      />
                      <path
                        d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H15.5C20.93 1.25 23.25 3.57 23.25 9V15C23.25 20.43 20.93 22.75 15.5 22.75ZM9.5 2.75C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V9C21.75 4.39 20.11 2.75 15.5 2.75H9.5Z"
                        fill="white"
                      />
                    </svg>
                    ذخیره تغییرات
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DragDropContext>
  );
};

export default EditAttribute;
