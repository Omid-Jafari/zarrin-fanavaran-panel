import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ADD_BRAND_VALIDATION_SCHEMA } from "../../constant/formik/validation_schema";
import slugify from "react-slugify";
import slugPersian from "../../utils/slugPersian";
import TagInput from "../../components/elements/tag-input";
import AddMediaCategory from "../../components/category/add-media-category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { brandSingle, editBrand } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import toast from "react-hot-toast";
import BrandSelectBox from "../../components/category/brand-select-box";
// import BrandSelectBox from "../../components/category/brand-select-box";

function EditBrand() {
  const navigate = useNavigate();
  const [OpenForMainMedia, setOpenForMainMedia] = useState(false);
  const [OpenForIconMedia, setOpenForIconMedia] = useState(false);
  const itemRef = useRef(null);
  const [showMainMadia, setshowMainMadia] = useState(null);
  const [brand, setbrand] = useState({})

  const { state } = useLocation();
  console.log("sbsxcdbbsbdd", state);

  const brandSingleQuery = useQuery(
    ["brandSingle"],
    () => brandSingle(state?.id),
    {
      onSuccess: (res) => {
        setbrand(res?.data?.data)
        formik.values.name_fa= res?.data?.data?.name_fa
        formik.values.name_en= res?.data?.data?.name_en
        formik.values.slug= res?.data?.data?.slug
        formik.values.description= res?.data?.data?.description
        formik.values.meta_title= res?.data?.data?.meta_title
        formik.values.meta_keywords= res?.data?.data?.meta_keywords
        formik.values.meta_description= res?.data?.data?.meta_description
        formik.values.logo_id= res?.data?.data?.media?.logo?.id
        formik.values.canonical= res?.data?.data?.meta_canonical
        formik.values.category_ids= res?.data?.data?.categories.map(res=>res.id)
      },
      refetchOnWindowFocus:false
    }
  );
  const addBrandMutataion = useMutation((data) => editBrand(state?.id, data), {
    onSuccess: (res) => {
      console.log("sdbsdbsdb", res);
      navigate(-1);
      //   formik.resetForm();
    },
  });
  const formik = useFormik({
    initialValues: {
      name_fa: "",
      name_en: "",
      slug: "",
      description: "",
      meta_title: "",
      meta_keywords: "",
      meta_description: "",
      canonical: "",
      category_ids:"",
      logo_id: "",
    },
    validationSchema: ADD_BRAND_VALIDATION_SCHEMA,
    onSubmit: (values, { errors }) => {
      console.log("sdbsdbsbsdb");
      values.slug = slugPersian(formik.values.name_fa);
      addBrandMutataion.mutate(values);
    },
    validate: (res) => {
      console.log("dsbsbsdbsdbs", res);
      if (
        res.name_fa == "" ||
        res.logo_id == "" ||
        res.name_en == "" ||
        res.parent_id == ""
      ) {
        itemRef.current?.scrollIntoView({ behavior: "smooth" }, 500);
      }
    },
  });

  useEffect(() => {
  formik.values.name_en=brand.name_en
  console.log("AScasvasvsavav",brand);
  }, [brand])
  

  const selectedItemForMain = (item) => {
    setshowMainMadia(item?.file);
    formik.values.logo_id = item.id;
  };

  useEffect(() => {
    setshowMainMadia(state?.media?.logo?.file);
  }, []);
  console.log("sdbsdbsbsb", brand.name_en);
  return (
    <div className="w-full p-5" ref={itemRef}>
      <div className="w-full flex items-center justify-between">
        <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="21"
            fill="none"
            viewBox="0 0 14 21"
          >
            <path
              fill="#222427"
              d="M12.482 0c-.867 0-1.953.092-2.828.459C7.904 1.192 7 3.951 7 3.951s2.596.271 4.346-.46C13.096 2.756 14 .09 14 .09S13.35 0 12.482 0zM7 4c-1.216 0-2.329.445-3.03 1.31-.7.867-.97 2.02-.97 3.344 0 .605-.5 1.233-1.266 2.145C.968 11.71 0 12.924 0 14.643 0 18.206 3.203 21 7 21s7-2.794 7-6.357c0-1.705-.967-2.913-1.732-3.829C11.502 9.9 11 9.259 11 8.655c0-1.324-.27-2.477-.97-3.343C9.328 4.445 8.215 4 7 4zm0 2c.787 0 1.176.2 1.475.568.298.37.525 1.043.525 2.086 0 1.538.998 2.562 1.732 3.442.735.879 1.268 1.594 1.268 2.547C12 16.995 9.831 19 7 19s-5-2.005-5-4.357c0-.977.532-1.686 1.266-2.559C3.999 11.211 5 10.192 5 8.654c0-1.043.227-1.716.525-2.086C5.825 6.2 6.213 6 7 6z"
            ></path>
          </svg>
          ویرایش برند
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

      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full bg-blue-lightt rounded-lg pt-14 px-4 pb-4 mt-4 flex flex-col gap-5 ">
            <div className="w-full flex flex-row justify-center items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                نام برند فارسی:*
              </div>
              <input
                className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
                placeholder=" برای مثال: لوازم الکترونیکی"
                name="name_fa"
                onChange={formik.handleChange}
                value={formik.values.name_fa}
              />
              {formik.errors.name_fa && formik.touched.name_fa && (
                <small className="text-red-700">{formik.errors.name_fa}</small>
              )}
            </div>
            <div className="w-full flex flex-row justify-center items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                نام برند انگلیسی:*
              </div>
              <input
                className="w-5/6 outline-none bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
                placeholder=" برای مثال: لوازم الکترونیکی"
                name="name_en"
                onChange={formik.handleChange}
                value={formik.values.name_en}
              />
              {formik.errors.name_en && formik.touched.name_en && (
                <small className="text-red-700">{formik.errors.name_en}</small>
              )}
            </div>
            {/* mother */}
            <div className="w-full flex flex-row justify-center items-start gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43] ">
                انتخاب مادر :*
              </div>
              <div className="w-5/6 relative">
                <BrandSelectBox formik={formik} />
              </div>
              {formik.errors.category_ids && formik.touched.category_ids && (
                <small className="text-red-700">
                  {formik.errors.category_ids}
                </small>
              )}
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-6 ">
              <div
                className="flex flex-row"
                onClick={(e) => setOpenForMainMedia(!OpenForMainMedia)}
              >
                <div className="bg-primary hover:bg-blacklead transition-colors duration-500 flex w-[90px] cursor-pointer h-[90px] rounded-lg z-30 flex-col justify-center items-center">
                  <>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 10.75C7.48 10.75 6.25 9.52 6.25 8C6.25 6.48 7.48 5.25 9 5.25C10.52 5.25 11.75 6.48 11.75 8C11.75 9.52 10.52 10.75 9 10.75ZM9 6.75C8.31 6.75 7.75 7.31 7.75 8C7.75 8.69 8.31 9.25 9 9.25C9.69 9.25 10.25 8.69 10.25 8C10.25 7.31 9.69 6.75 9 6.75Z"
                        fill="#F9FCFD"
                      />
                      <path
                        d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H13C13.41 1.25 13.75 1.59 13.75 2C13.75 2.41 13.41 2.75 13 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"
                        fill="#F9FCFD"
                      />
                      <path
                        d="M21.25 5.75H15.75C15.34 5.75 15 5.41 15 5C15 4.59 15.34 4.25 15.75 4.25H21.25C21.66 4.25 22 4.59 22 5C22 5.41 21.66 5.75 21.25 5.75Z"
                        fill="#003E43"
                      />
                      <path
                        d="M18.5 8.5C18.09 8.5 17.75 8.16 17.75 7.75V2.25C17.75 1.84 18.09 1.5 18.5 1.5C18.91 1.5 19.25 1.84 19.25 2.25V7.75C19.25 8.16 18.91 8.5 18.5 8.5Z"
                        fill="#003E43"
                      />
                      <path
                        d="M2.6698 19.6996C2.4298 19.6996 2.1898 19.5796 2.0498 19.3696C1.8198 19.0296 1.9098 18.5596 2.2498 18.3296L7.1798 15.0196C8.2598 14.2996 9.7498 14.3796 10.7298 15.2096L11.0598 15.4996C11.5598 15.9296 12.4098 15.9296 12.8998 15.4996L17.0598 11.9296C18.1298 11.0196 19.7898 11.0196 20.8598 11.9296L22.4898 13.3296C22.7998 13.5996 22.8398 14.0696 22.5698 14.3896C22.2998 14.6996 21.8298 14.7396 21.5098 14.4696L19.8798 13.0696C19.3798 12.6396 18.5298 12.6396 18.0398 13.0696L13.8798 16.6396C12.8198 17.5496 11.1498 17.5496 10.0798 16.6396L9.7498 16.3496C9.2898 15.9596 8.52981 15.9196 8.01981 16.2696L3.0998 19.5796C2.9598 19.6596 2.8098 19.6996 2.6698 19.6996Z"
                        fill="#F9FCFD"
                      />
                    </svg>
                  </>
                  <span className="font-Kalameh text-white text-sm">
                    انتخاب لوگو
                  </span>
                  <AddMediaCategory
                    open={OpenForMainMedia}
                    setOpen={setOpenForMainMedia}
                    selectedItem={(e) => selectedItemForMain(e)}
                  />
                </div>

                <div
                  className={`w-[220px] h-[90px] ${
                    showMainMadia != null ? "h-[90px]" : "h-0 hidden"
                  } transition-all ease-linear rounded-tl-lg rounded-bl-lg bg-white -mr-2 flex justify-center items-center`}
                >
                  <img className="w-[77px] h-[60px]" src={showMainMadia} />
                </div>
              </div>
            </div>

            {formik.errors.logo_id && formik.touched.logo_id && (
              <small className="text-red-700">{formik.errors.logo_id}</small>
            )}

            <div className="w-full flex flex-row justify-center items-start gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                توضیحات برند:*
              </div>{" "}
              <textarea
                className="w-5/6 outline-none bg-white h-[151px]  rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
                placeholder=" برای مثال: لوازم الکترونیکی"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.errors.description && formik.touched.description && (
                <small className="text-red-700">
                  {formik.errors.description}
                </small>
              )}
            </div>

            <div className="w-full flex flex-row justify-center items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold  text-[#003E43]">
                پیوند دسته:*
              </div>
              <input
                className="w-5/6 bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
                name="slug"
                onChange={formik.handleChange}
                value={slugPersian(formik.values.name_fa)}
              />
              {formik.errors.slug && formik.touched.slug && (
                <small className="text-red-700">{formik.errors.slug}</small>
              )}
            </div>

            <div className="w-full flex flex-row justify-center items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                کانونیکال:
              </div>

              <input
                className="w-5/6 bg-white rounded-lg p-4 h-[51px] outline-none font-Kalameh text-black placeholder:text-[#C4C7C7]"
                name="canonical"
                onChange={formik.handleChange}
                value={formik.values.canonical}
              />
              {formik.errors.canonical && formik.touched.canonical && (
                <small className="text-red-700">
                  {formik.errors.canonical}
                </small>
              )}
            </div>

            <div className="w-full flex flex-row justify-center items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                متا_تایتل:*{" "}
              </div>
              <input
                className="w-5/6 bg-white rounded-lg p-4 h-[51px] outline-none font-Kalameh text-black placeholder:text-[#C4C7C7]"
                name="meta_title"
                onChange={formik.handleChange}
                value={slugPersian(formik.values.meta_title)}
              />
              {formik.errors.meta_title && formik.touched.meta_title && (
                <small className="text-red-700">
                  {formik.errors.meta_title}
                </small>
              )}
            </div>

            <div className="w-full flex flex-row justify-center items-start gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                متا_دیسکریپشن:{" "}
              </div>
              <textarea
                className="w-5/6 bg-white rounded-lg p-4 h-[151px] outline-none font-Kalameh text-black placeholder:text-[#C4C7C7]"
                name="meta_description"
                onChange={formik.handleChange}
                value={formik.values.meta_description}
              />
              {formik.errors.meta_description &&
                formik.touched.meta_description && (
                  <small className="text-red-700">
                    {formik.errors.meta_description}
                  </small>
                )}
            </div>
            <div className="w-full flex flex-row justify-center  items-center gap-[18px]">
              <div className="w-1/6 bg-white rounded-lg p-4 font-bold text-[#003E43]">
                متا_کی ورد
              </div>
              <div className="w-5/6 bg-white  rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]">
                <TagInput formik={formik} TagsData={brand?.meta_keywords}  />
              </div>
              {formik.errors.meta_keywords && formik.touched.meta_keywords && (
                <small className="text-red-700">
                  {formik.errors.meta_keywords}
                </small>
              )}
            </div>
            <button
              className="bg-primary hover:bg-blacklead transition-colors duration-500 text-white font-Kalameh flex flex-row justify-center items-center gap-2 h-[44px]"
              type="button"
              onClick={formik.handleSubmit}
            >
              {addBrandMutataion.isLoading ? (
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
                  ویرایش
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBrand;
