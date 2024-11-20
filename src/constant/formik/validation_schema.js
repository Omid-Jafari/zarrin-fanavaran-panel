import * as Yup from "yup";
export const LOGIN_VALIDATION_SCHEMA = () => {
  return Yup.object({
    mobile_number: Yup.string().required("لطفا شماره موبایل خود را وارد کنید"),
    password: Yup.string().required("لطفا پسورد خود را وارد کنید"),
  });
};

export const ADD_CATEGORY_VALIDATION_SCHEMA = () => {
  return Yup.object({
    name: Yup.string().required("لطفا  نام دسنه بندی  را وارد کنید"),
    parent_id: Yup.string().required("لطفا  دسنه بندی  را وارد کنید"),
    icon_id: Yup.string().required("لطفا ایکون دسنه بندی را وارد کنید"),
    main_id: Yup.string().required("لطفا  عکس دسته بندی   را وارد کنید"),
  });
};
export const ADD_ATTRIBUTE_VALIDATION_SCHEMA = (values, options) => {
  if (
    (values.type === "MULTIPLE_OPTION" || values.type === "SINGLE_OPTION") &&
    options.length === 0
  ) {
    return Yup.object({
      name: Yup.string().required("لطفا  نام ویژگی  را وارد کنید"),
      icon_id: Yup.string().required("لطفا ایکون ویژگی را وارد کنید"),
      type: Yup.string().required("لطفا نوع داده را مشخص کنید"),
      options: Yup.string().required("لطفا نام داده را مشخص کنید"),
    });
  } else {
    return Yup.object({
      name: Yup.string().required("لطفا  نام ویژگی  را وارد کنید"),
      icon_id: Yup.string().required("لطفا ایکون ویژگی را وارد کنید"),
      type: Yup.string().required("لطفا نوع داده را مشخص کنید"),
    });
  }
};

export const ADD_BRAND_VALIDATION_SCHEMA = () => {
  return Yup.object({
    name_fa: Yup.string().required("لطفا  نام دسنه بندی  را وارد کنید"),
    name_en: Yup.string().required(
      "لطفا  نام  انگلیسی دسنه بندی  را وارد کنید"
    ),
    category_ids: Yup.array()
      .of(Yup.string())
      .min(1, "لطفا  دسنه بندی  را وارد کنید"),
    logo_id: Yup.string().required("لطفا ایکون  برند را وارد کنید"),
    description: Yup.string().required("لطفا  توضیحات برند    را وارد کنید"),
    meta_title: Yup.string().required("لطفا   متا تایتل  برند    را وارد کنید"),
    meta_description: Yup.string().required(
      "لطفا   متا دیسکریپشن  برند    را وارد کنید"
    ),
  });
};
export const ADD_COLOR_VALIDATION_SCHEMA = () => {
  return Yup.object({
    name_fa: Yup.string().required("لطفا  نام فارسی  را وارد کنید"),
    name_en: Yup.string().required("لطفا  نام انگلیسی  را وارد کنید"),
    icon_id: Yup.string().required("لطفا ایکون رنگ را وارد کنید"),
  });
};
export const ADD_GUARANTEE_VALIDATION_SCHEMA = () => {
  return Yup.object({
    name: Yup.string().required("لطفا  نام  را وارد کنید"),
  });
};
export const ADD_FEATURE_VALIDATION_SCHEMA = () => {
  return Yup.object({
    name: Yup.string().required("لطفا  نام را وارد کنید"),
    icon_id: Yup.string().required("لطفا ایکون ویژگی را وارد کنید"),
  });
};

export const ADD_BLOG_VALIDATION_SCHEMA = () => {
  return Yup.object({
    name: Yup.string().required("لطفا  نام بلاگ را وارد کنید"),
    main_id: Yup.string().required("لطفا  عکس بلاگ را وارد کنید"),
  });
};

export const ADD_BLOG_CATEGORY_VALIDATION_SCHEMA = () => {
  return Yup.object({
    name: Yup.string().required("لطفا  نام دسنه بندی  را وارد کنید"),
  });
};
