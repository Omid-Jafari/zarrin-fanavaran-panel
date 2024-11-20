import React, {
  Fragment,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
  useContext,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddProductContext from "../../../../context/product/AddProductContext";
import AddMediaCategory from "../../../category/add-media-category";
import ShowImageModal from "../../../common/show-image-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fromEdit } from "../../../../utils/FromEdit";

function EditProductSideBarAddMedia({}, ref) {
  const [OpenForMainMedia, setOpenForMainMedia] = useState(false);
  const [openForInsourse, setopenForInsourse] = useState(false);
  const [index, setindex] = useState("");
  const [open, setOpen] = useState(false);
  const [icon, seticon] = useState(null);

  const { step, productData, dispatch } = useContext(AddProductContext);
  useImperativeHandle(ref, () => ({
    opeModal(item, index, type) {
      console.log("sdvsascascasdvsdv", item);
      console.log("sdvssacascascsadvsdv", type);

      if (type == "INSOURCE") {
        setopenForInsourse(true);
        setindex(productData?.sidebars.insource.indexOf(item));
      } else {
        InSourceData(item);
        setindex(productData?.sidebars.outsource.indexOf(item));
      }
      console.log("SDvsdvsdvsdvsdvsdsdv", item?.media?.poster);
      if (fromEdit()) seticon(item?.media?.poster);

      setOpen(true);
    },
  }));

  const InSourceData = (item) => {
    formik.setFieldValue("title", item?.title);
    formik.setFieldValue("summary", item?.summary);
    formik.setFieldValue("link", item?.link);
    formik.setFieldValue("poster_id", item?.poster_id);
    formik.setFieldValue("icon", item?.icon);
    formik.setFieldValue("status", item?.status);
    seticon(item?.icon);
    seticon(item?.icon);
  };
  const selectedItemForMain = (item) => {
    console.log("svsdvsdvdsvsdv", item);
    seticon(item);
    // setshowMainMadia(item?.file);
    formik.values.poster_id = item.id;
    formik.values.icon = item;
  };
  var expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  var regex = new RegExp(expression);
  const formik = useFormik({
    initialValues: {
      title: "",
      summary: "",
      link: "",
      poster_id: "",
      type: "VIDEO",
      status: "ACTIVE",
      priority: 100,
      source: "outsource",
      icon: "",
      media: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("لطفا عنوان ویدیو را وارد کنید"),
      summary: Yup.string().required("لطفا توضیحات ویدیو را وارد کنید"),
      link: Yup.string()
        .required("لطفا لینک ویدیو را وارد کنید")
        .matches(regex, "لطفا لینک صحیح وارد کنید"),
      poster_id: Yup.number().required("لطفا تصویر کاور را انتخاب کنید"),
    }),
    onSubmit: (data) => {
      data.media = { poster: icon };
      let sidebars = productData.sidebars;
      sidebars.outsource[index] = data;

      handleAddData({ sidebars });
      // productData?.sidebars?.outsource?
      // handleAddData({sidebars:{...productData?.sidebars,outsource:[...productData?.sidebars?.outsource,data]}})
      // :     handleAddData({sidebars:{...productData?.sidebars,outsource:[data]}})

      seticon(null);
      setOpen(false);
      formik.resetForm();
    },
  });

  const handleAddData = (data) => {
    console.log("dvsdvsdvdsvsdv", data);
    dispatch({
      type: "ADD",
      productData: data,
    });
  };

  const handleInsource = () => {
    setopenForInsourse(true);
  };

  const selectedItemForInsource = (item) => {
    console.log("vsdvdsvsdv", item);
    const insource = {
      id: item?.id,
      file: item?.file,
      type: "VIDEO",
      typeInEdit: "VIDEO",
      status: "ACTIVE",
      priority: 100,
      source: "insource",
      media: { main: item },
    };
    // productData?.sidebars?.insource?
    // handleAddData({sidebars:{insource:[...productData?.sidebars?.insource,insource]}})
    // :     handleAddData({sidebars:{insource:[insource]}})

    //   productData?.sidebars?.insource?
    //   handleAddData({sidebars:{...productData?.sidebars,insource:[...productData?.sidebars?.insource,insource]}})
    //   :     handleAddData({sidebars:{...productData?.sidebars,insource:[insource]}})

    let sidebars = productData.sidebars;
    sidebars.insource[index] = insource;

    handleAddData({ sidebars });
    setOpen(false);
  };
  console.log("SDvsdvsdvsdv", productData);
  return (
    <>
      <AddMediaCategory
        open={OpenForMainMedia}
        setOpen={setOpenForMainMedia}
        selectedItem={(e) => selectedItemForMain(e)}
      />
      <AddMediaCategory
        open={openForInsourse}
        setOpen={setopenForInsourse}
        selectedItem={(e) => selectedItemForInsource(e)}
      />

      <div className="w-full absolute ">
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10 " onClose={setOpen}>
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

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative w-2/4 transition-all  flex flex-col items-start ">
                    <div className="bg-white  text-right shadow-xl rounded-[10px]  w-full flex flex-col">
                      <div className="w-full h-[60px] bg-[#4FB3BF] rounded-t-[10px] flex justify-start p-3 items-center">
                        <p className="font-Kalameh text-white">ادیت ویدئو:</p>
                      </div>

                      <div className="w-full p-5 flex flex-col">
                        <div className=" w-full  p-2  rounded-[6px]">
                          <span className="font-Kalameh  px-1 text-black font-[600] ">
                            {" "}
                            عنوان:
                          </span>
                          <input
                            className="font-Kalameh bg-[#DBEEF6] mt-3 text-black items-center  text-[14px] flex gap-2 font-[500]
                         outline-none w-full h-[44px] px-4 placeholder:text-[#C4C7C7] rounded-md "
                            placeholder="مثال: بررسی تخصصی 11t pro"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                          />
                        </div>{" "}
                        {formik.errors.title && formik.touched.title && (
                          <div className="text-red-600 w-full text-sm">
                            {formik.errors.title}
                          </div>
                        )}
                        <div className=" w-full  p-2  rounded-[6px]">
                          <span className="font-Kalameh  px-1 text-black font-[600] ">
                            {" "}
                            توضیحات:
                          </span>
                          <textarea
                            rows={"8"}
                            className="font-Kalameh bg-[#DBEEF6] mt-3 text-black items-center  text-[14px] flex gap-2 font-[500]
                       outline-none w-full  p-2 placeholder:text-[#C4C7C7] rounded-md "
                            placeholder="لورم ایپسوم متن ساختگی با تولید..."
                            name="summary"
                            onChange={formik.handleChange}
                            value={formik.values.summary}
                          />
                        </div>
                        {formik.errors.summary && formik.touched.summary && (
                          <div className="text-red-600 w-full text-sm">
                            {formik.errors.summary}
                          </div>
                        )}
                        <div className=" w-full  p-2  rounded-[6px]">
                          <span className="font-Kalameh  px-1 text-black font-[600] ">
                            {" "}
                            لینک:
                          </span>
                          <div className="flex flex-nowrap flex-row gap-4 w-full items-center">
                            <input
                              className="font-Kalameh bg-[#DBEEF6] mt-3 text-black items-center  text-[14px] flex gap-2 font-[500]
                           outline-none w-full h-[44px] px-4 placeholder:text-[#C4C7C7] rounded-md "
                              placeholder="مثال: بررسی تخصصی 11t pro"
                              name="link"
                              onChange={formik.handleChange}
                              value={formik.values.link}
                            />
                            <span
                              onClick={() => handleInsource()}
                              className="font-Kalameh 
                             text-black font-[600] flex justify-center items-center transition-all   hover:bg-[#4FB3BF] rounded-md w-[167px] cursor-pointer h h-[44px]"
                            >
                              {" "}
                              افزودن از بانک مدیا
                            </span>
                          </div>
                        </div>
                        {formik.errors.link && formik.touched.link && (
                          <div className="text-red-600 w-full text-sm">
                            {formik.errors.link}
                          </div>
                        )}
                        <div className="flex flex-row gap-3 items-center mt-4">
                          <span className="font-Kalameh  px-1 text-black font-[600] ">
                            {" "}
                            تصویر کاور:
                          </span>
                          {icon == null ? (
                            <button
                              className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                              onClick={() => setOpenForMainMedia(true)}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.8798 14.9901C11.6898 14.9901 11.4998 14.9201 11.3498 14.7701L8.78977 12.2101C8.49977 11.9201 8.49977 11.4401 8.78977 11.1501C9.07977 10.8601 9.55977 10.8601 9.84977 11.1501L11.8798 13.1801L13.9098 11.1501C14.1998 10.8601 14.6798 10.8601 14.9698 11.1501C15.2598 11.4401 15.2598 11.9201 14.9698 12.2101L12.4098 14.7701C12.2598 14.9201 12.0698 14.9901 11.8798 14.9901Z"
                                  fill="white"
                                />
                                <path
                                  d="M11.8809 14.92C11.4709 14.92 11.1309 14.58 11.1309 14.17V4C11.1309 3.59 11.4709 3.25 11.8809 3.25C12.2909 3.25 12.6309 3.59 12.6309 4V14.17C12.6309 14.58 12.2909 14.92 11.8809 14.92Z"
                                  fill="white"
                                />
                                <path
                                  d="M12 20.9297C6.85 20.9297 3.25 17.3297 3.25 12.1797C3.25 11.7697 3.59 11.4297 4 11.4297C4.41 11.4297 4.75 11.7697 4.75 12.1797C4.75 16.4497 7.73 19.4297 12 19.4297C16.27 19.4297 19.25 16.4497 19.25 12.1797C19.25 11.7697 19.59 11.4297 20 11.4297C20.41 11.4297 20.75 11.7697 20.75 12.1797C20.75 17.3297 17.15 20.9297 12 20.9297Z"
                                  fill="white"
                                />
                              </svg>
                              آپلود تصویر
                            </button>
                          ) : (
                            <div className="flex flex-row items-center gap-1">
                              <>
                                <>
                                  <span className="text-[16px] font-bold mx-2">
                                    {icon?.name}
                                  </span>
                                  <ShowImageModal
                                    title={icon?.name}
                                    img={icon?.file}
                                  />
                                  <span
                                    className="mx-2 cursor-pointer hover:scale-105"
                                    onClick={() => seticon(null)}
                                  >
                                    <img src="/images/icons/media/delete-icon.svg" />
                                  </span>
                                </>
                              </>
                            </div>
                          )}
                        </div>
                        {formik.errors.poster_id &&
                          formik.touched.poster_id && (
                            <div className="text-red-600 w-full text-sm">
                              {formik.errors.poster_id}
                            </div>
                          )}
                      </div>

                      <div className="w-full flex items-center justify-end p-5 gap-3">
                        <button
                          className="flex items-center justify-center gap-1.5 h-11 bg-[#EFF1F1] hover:hover:bg-cyann  transition-colors duration-500 px-3 text-black rounded-[4px] font-KalamehMed font-medium"
                          onClick={() => setOpen(false)}
                        >
                          انصراف
                        </button>

                        <button
                          className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                          onClick={() => formik.handleSubmit()}
                        >
                          ذخیره
                        </button>
                      </div>
                      {/* 
                   <div className="w-full rounded-md bg-white p-4">
                     <button
                       type="button"
                       onClick={handleAddButton}
                       className="text-[#F9FCFD] bg-primary mt-5 flex justify-center items-center rounded-md w-full h-11"
                     >
                       تایید
                     </button>
                   </div> */}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
}

export default React.forwardRef(EditProductSideBarAddMedia);
