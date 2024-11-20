import { useFormik } from "formik";
import React, { useContext, useImperativeHandle } from "react";
import AddProductContext from "../../../../context/product/AddProductContext";
import * as Yup from "yup";
import slugPersian from "../../../../utils/slugPersian";
import TagInput from "../../../elements/tag-input";
import { useState } from "react";
import RelatedProductsModal from "../RelatedProductsModal";
import BlogProductsModal from "../BlogProductsModal";
import { ProductStatus } from "../../../../constant/ProductStatus";
import { useRef } from "react";
import PublishingProductModal from "../PublishingProductModal";
import PublishProductModal from "../PublishProductModal";
import CustomRadioBtn from "../../../common/customRadioBtn";

function StepNineSettings({ addProductquery }, ref) {
  const { step, productData, dispatch } = useContext(AddProductContext);
  useImperativeHandle(ref, () => ({
    PublishProduct() {
      productData.status = ProductStatus.PUBLISHED;
      formik.handleSubmit();
    },
    PublishingProduct() {
      productData.status = ProductStatus.PUBLISHING;
      formik.handleSubmit();
    },
    draftProductStepNine() {
      productData.status = ProductStatus.DRAFT;
      formik.handleSubmit();
    },
  }));
  const publishingModal = useRef();
  const publishModal = useRef();
  const [relateModal, setRelateModal] = useState(false);
  const [blogModal, setBlogModal] = useState(false);

  const openPublishModal = () => {
    publishModal.current.openModal();
  };
  const openPublishingModal = () => {
    publishingModal.current.openModal();
  };
  const formik = useFormik({
    initialValues: {
      meta_keywords: productData?.meta_keywords || "",
      canonical: productData?.canonical || "",
      meta_title: productData?.meta_title || "",
      weight: productData?.weight || null,
      shipping_type: productData?.shipping_type || "MOTOR_DELIVERY",
      relatable: productData?.relatable === 0 ? 0 : 1,
      product_related_type: productData?.product_related_type || "SEMI_AUTO",
      blog_related_type: productData?.blog_related_type || "SEMI_AUTO",
      relatives: productData?.relatives || [],
      blogs: productData?.blogs || [],
      blog_relatable: productData?.blog_relatable === 0 ? 0 : 1,
      commentable: productData?.commentable === 0 ? 0 : 1,
      in_stock_notificationable:
        productData?.in_stock_notificationable === 0 ? 0 : 1,
      wishlistable: productData?.wishlistable === 0 ? 0 : 1,
    },
    enableReinitialize: true,
    // validationSchema: Yup.object({
    //   weight: Yup.number().required("لطفا وزن محصول را وارد کنید").nullable(),
    //   meta_title: Yup.string().required("لطفا متا تایتل محصول را وارد کنید"),
    //   canonical: Yup.string().required("لطفا کانونیکال محصول را وارد کنید"),
    // }),

    onSubmit: (data) => {
      if (productData.status === ProductStatus.PUBLISHED) {
        openPublishModal();
      } else if (productData.status === ProductStatus.PUBLISHING) {
        openPublishingModal();
      } else if (productData.status === ProductStatus.DRAFT) {
        addProductquery.mutate({ ...productData, ...data });
      }
    },
  });
  const handlepreviosStep = () => {
    dispatch({
      type: "STEP",
      step: step - 1,
    });
  };
  return (
    <>
      <PublishProductModal ref={publishModal} values={formik.values} />
      <PublishingProductModal ref={publishingModal} values={formik.values} />
      <RelatedProductsModal
        relateModal={relateModal}
        formik={formik}
        setRelateModal={setRelateModal}
      />
      <BlogProductsModal
        blogModal={blogModal}
        formik={formik}
        setBlogModal={setBlogModal}
      />
      <div className="flex flex-col justify-between items-center  w-full h-full">
        <div className="flex flex-col gap-5 w-full mb-5">
          <h5 className="font-medium font-KalamehMed text-sm">
            ارتباطات محصول با:
          </h5>
          <div className="flex gap-5 items-center">
            <button
              onClick={() => setRelateModal(!relateModal)}
              className="flex items-center gap-3 rounded-[4px] px-3 h-11 bg-cyann text-white transition-colors hover:bg-primary duration-500 font-medium font-KalamehMed text-sm"
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
                  d="M11.1 22.75H6.9c-3.91 0-5.65-1.74-5.65-5.65v-4.2c0-3.91 1.74-5.65 5.65-5.65h4.2c3.91 0 5.65 1.74 5.65 5.65v4.2c0 3.91-1.74 5.65-5.65 5.65zm-4.2-14c-3.1 0-4.15 1.05-4.15 4.15v4.2c0 3.1 1.05 4.15 4.15 4.15h4.2c3.1 0 4.15-1.05 4.15-4.15v-4.2c0-3.1-1.05-4.15-4.15-4.15H6.9z"
                ></path>
                <path
                  fill="#fff"
                  d="M17.1 16.75H16c-.41 0-.75-.34-.75-.75v-3.1c0-3.1-1.05-4.15-4.15-4.15H8c-.41 0-.75-.34-.75-.75V6.9c0-3.91 1.74-5.65 5.65-5.65h4.2c3.91 0 5.65 1.74 5.65 5.65v4.2c0 3.91-1.74 5.65-5.65 5.65zm-.35-1.5h.35c3.1 0 4.15-1.05 4.15-4.15V6.9c0-3.1-1.05-4.15-4.15-4.15h-4.2c-3.1 0-4.15 1.05-4.15 4.15v.35h2.35c3.91 0 5.65 1.74 5.65 5.65v2.35z"
                ></path>
              </svg>
              محصولات مرتبط
            </button>
            <button
              onClick={() => setBlogModal(!blogModal)}
              className="flex items-center gap-3 rounded-[4px] px-3 h-11 bg-cyann text-white transition-colors hover:bg-primary duration-500 font-medium font-KalamehMed text-sm"
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
                  d="M16 22.75H8c-3.65 0-5.75-2.1-5.75-5.75V7c0-3.65 2.1-5.75 5.75-5.75h8c3.65 0 5.75 2.1 5.75 5.75v10c0 3.65-2.1 5.75-5.75 5.75zm-8-20C5.14 2.75 3.75 4.14 3.75 7v10c0 2.86 1.39 4.25 4.25 4.25h8c2.86 0 4.25-1.39 4.25-4.25V7c0-2.86-1.39-4.25-4.25-4.25H8z"
                ></path>
                <path
                  fill="#fff"
                  d="M9 11.11a1.244 1.244 0 01-1.25-1.24V2c0-.41.34-.75.75-.75h7c.41 0 .75.34.75.75v7.86c0 .5-.29.95-.75 1.14-.45.2-.98.11-1.35-.23L12 8.8l-2.15 1.98c-.24.22-.54.33-.85.33zm3-3.9c.3 0 .61.11.85.33l1.9 1.75V2.75h-5.5v6.54l1.9-1.75c.24-.22.55-.33.85-.33zM17.5 14.75h-4.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.25c.41 0 .75.34.75.75s-.34.75-.75.75zM17.5 18.75H9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8.5c.41 0 .75.34.75.75s-.34.75-.75.75z"
                ></path>
              </svg>
              مقالات محصول
            </button>
          </div>
          <h5 className="font-medium font-KalamehMed text-sm">اطلاعات ارسال</h5>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <div className="h-[50px] w-[164px] px-4 flex items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
                وزن محصول
              </div>
              <div className="flex flex-wrap flex-1 h-[50px] bg-white rounded-lg px-3 items-center gap-2">
                <input
                  type="number"
                  placeholder="15000"
                  className="rounded-lg h-10 flex-1 outline-0 w-[100px] placeholder:text-[#C4C7C7] px-2"
                  id="weight"
                  name="weight"
                  value={formik.values?.weight}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <p className="font-medium font-KalamehMed text-sm">گرم</p>
              </div>
            </div>
            {formik.errors.weight && formik.touched.weight && (
              <div className="text-red-600 w-full text-sm">
                {formik.errors.weight}
              </div>
            )}
            <div className="flex gap-2">
              <div className="h-full w-[164px] p-4 flex items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
                ارسال این محصول در شهر شیراز با:
              </div>
              <div className="py-4 flex-1 px-4 flex bg-white rounded-lg justify-around items-center gap-3">
                <img
                  src="/images/add-product/scooter.png"
                  className="h-24 object-contain"
                  alt=""
                />
                <p className="font-medium font-KalamehMed">پیک موتوری</p>
                <div
                  onClick={() => {
                    formik.values.shipping_type === "MOTOR_DELIVERY"
                      ? formik.setFieldValue("shipping_type", "TRUCK_DELIVERY")
                      : formik.setFieldValue("shipping_type", "MOTOR_DELIVERY");
                  }}
                  className="h-[15px] w-[35px] rounded-full bg-primary shadow-[inset_0px_0px_5px_rgba(0,0,0,0.5)] cursor-pointer relative"
                >
                  <div
                    className={`w-[15px] h-[15px] rounded-full bg-[#E4E4FF] shadow-[1px_0px_2px_rgba(0,0,0,0.34)] flex items-center justify-center absolute top-0 transition-all duration-500 ${
                      formik.values.shipping_type === "MOTOR_DELIVERY"
                        ? "left-[20px]"
                        : "left-0 -rotate-180"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="10"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="#003E43"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M1 8.5L5 5 1 1.5"
                      ></path>
                    </svg>
                  </div>
                </div>
                <p className="font-medium font-KalamehMed">وانت بار</p>
                <img
                  src="/images/add-product/truck.png"
                  className="h-24 object-contain"
                  alt=""
                />
              </div>
            </div>
            <h5 className="font-medium font-KalamehMed text-sm">سئو:</h5>
            <div className="flex items-start gap-2">
              <div className="h-[50px] w-[164px] px-4 flex items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
                متا_کی ورد*
              </div>
              <div className="rounded-lg h-[50px] flex items-center bg-white flex-1 outline-0 w-[100px] placeholder:text-[#C4C7C7] px-2">
                <TagInput formik={formik} />
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-[50px] w-[164px] px-4 flex items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
                کانونیکال:
              </div>

              <input
                className="rounded-lg h-[50px] flex-1 outline-0 w-[100px] placeholder:text-[#C4C7C7] px-2"
                name="canonical"
                onChange={formik.handleChange}
                value={slugPersian(formik.values.canonical)}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.canonical && formik.touched.canonical && (
              <small className="text-red-700">{formik.errors.canonical}</small>
            )}

            <div className="flex items-start gap-2">
              <div className="h-[50px] w-[164px] px-4 flex items-center bg-white rounded-lg font-medium font-KalamehMed text-sm text-blacklead">
                متا_تایتل:*
              </div>
              <input
                className="rounded-lg h-[50px] flex-1 outline-0 w-[100px] placeholder:text-[#C4C7C7] px-2"
                name="meta_title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={slugPersian(formik.values.meta_title)}
              />
            </div>
            {formik.errors.meta_title && formik.touched.meta_title && (
              <small className="text-red-700">{formik.errors.meta_title}</small>
            )}
            <div className="flex w-full items-center gap-3">
              <CustomRadioBtn
                clickFunc={() => {
                  formik.values.commentable === 0
                    ? formik.setFieldValue("commentable", 1)
                    : formik.setFieldValue("commentable", 0);
                }}
                checkCondition={formik.values.commentable === 1}
              />
              <p className="font-medium font-KalamehMed">
                قابلیت کامنت گذاشتن برای این محصول
              </p>
            </div>
            <div className="flex w-full items-center gap-3">
              <CustomRadioBtn
                clickFunc={() => {
                  formik.values.in_stock_notificationable === 0
                    ? formik.setFieldValue("in_stock_notificationable", 1)
                    : formik.setFieldValue("in_stock_notificationable", 0);
                }}
                checkCondition={formik.values.in_stock_notificationable === 1}
              />
              <p className="font-medium font-KalamehMed">
                قابلیت نوتیفیکیشن دادن برای این محصول
              </p>
            </div>
            <div className="flex w-full items-center gap-3">
              <CustomRadioBtn
                clickFunc={() => {
                  formik.values.wishlistable === 0
                    ? formik.setFieldValue("wishlistable", 1)
                    : formik.setFieldValue("wishlistable", 0);
                }}
                checkCondition={formik.values.wishlistable === 1}
              />
              <p className="font-medium font-KalamehMed">
                قابلیت اضافه کردن به ویش لیست
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-4 mt-4">
          <button
            className="flex items-center justify-center gap-1.5 h-11 bg-white hover:hover:bg-cyann  transition-colors duration-500 px-3 text-black rounded-[4px] font-KalamehMed font-medium text-sm"
            onClick={() => handlepreviosStep()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                fill="#222427"
              />
              <path
                d="M10.7399 16.2802C10.5499 16.2802 10.3599 16.2102 10.2099 16.0602C9.91993 15.7702 9.91993 15.2902 10.2099 15.0002L13.2099 12.0002L10.2099 9.00016C9.91993 8.71016 9.91993 8.23016 10.2099 7.94016C10.4999 7.65016 10.9799 7.65016 11.2699 7.94016L14.7999 11.4702C15.0899 11.7602 15.0899 12.2402 14.7999 12.5302L11.2699 16.0602C11.1199 16.2102 10.9299 16.2802 10.7399 16.2802Z"
                fill="#222427"
              />
            </svg>
            مرحله قبل
          </button>

          {/* <button className="flex-1 flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium text-sm">
            {addProductquery?.isLoading ? (
              <Loading className="w-16 h-16 text-blacklead animate-pulse" />
            ) : (
              <>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.98959 22.7496C9.78959 22.7496 9.62959 22.7096 9.50959 22.6596C9.10959 22.5096 8.42959 22.0196 8.42959 20.4696V14.0196H6.08959C4.74959 14.0196 4.26959 13.3896 4.09959 13.0196C3.92959 12.6396 3.77959 11.8696 4.65959 10.8596L12.2296 2.25964C13.2496 1.09964 14.0796 1.17964 14.4796 1.32964C14.8796 1.47964 15.5596 1.96964 15.5596 3.51964V9.96964H17.8996C19.2396 9.96964 19.7196 10.5996 19.8896 10.9696C20.0596 11.3496 20.2096 12.1196 19.3296 13.1296L11.7596 21.7296C11.0496 22.5396 10.4296 22.7496 9.98959 22.7496ZM13.9296 2.73964C13.8996 2.77964 13.6896 2.87964 13.3596 3.25964L5.78959 11.8596C5.50959 12.1796 5.46959 12.3796 5.46959 12.4196C5.48959 12.4296 5.66959 12.5296 6.08959 12.5296H9.17959C9.58959 12.5296 9.92959 12.8696 9.92959 13.2796V20.4796C9.92959 20.9796 10.0196 21.1996 10.0596 21.2596C10.0896 21.2196 10.2996 21.1196 10.6296 20.7396L18.1996 12.1396C18.4796 11.8196 18.5196 11.6196 18.5196 11.5796C18.4996 11.5696 18.3196 11.4696 17.8996 11.4696H14.8096C14.3996 11.4696 14.0596 11.1296 14.0596 10.7196V3.51964C14.0696 3.01964 13.9696 2.80964 13.9296 2.73964Z"
                    fill="white"
                  />
                </svg>
                منتشر کردن
              </>
            )}
          </button> */}
        </div>
      </div>
    </>
  );
}

export default React.forwardRef(StepNineSettings);
