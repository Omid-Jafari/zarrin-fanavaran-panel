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
import { useMutation } from "@tanstack/react-query";
import { searchBlogData } from "../../../../api/ApiClient";
import * as Yup from "yup";

const blogType = {
  INSOURCE: "INSOURCE",
  OUTSOURCE: "OUTSOURCE",
};

function AddProductSideBarAddBlog({}, ref) {
  const [blogTypee, setblogTypee] = useState(blogType.INSOURCE);
  const [searchBlog, setsearchBlog] = useState([]);
  const [slectedBlog, setslectedBlog] = useState("");

  const [OpenForMainMedia, setOpenForMainMedia] = useState(false);
  const [open, setOpen] = useState(false);
  const [icon, seticon] = useState(null);

  const { step, productData, dispatch } = useContext(AddProductContext);
  useImperativeHandle(ref, () => ({
    opeModal(item) {
      setOpen(true);
    },
  }));
  const searchBlogQuery = useMutation((s) => searchBlogData(s), {
    onSuccess: (res) => {
      console.log("sdvsdvsdvsd", res?.data);
      setsearchBlog(res?.data?.data);
    },
  });

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
      type: "BLOG",
      typeInEdit: "BLOG",
      status: "ACTIVE",
      priority: 100,
      source: "outsource",
      icon: "",
      media: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("لطفا عنوان مقاله را وارد کنید"),
      summary: Yup.string().required("لطفا توضیحات مقاله را وارد کنید"),
      link: Yup.string()
        .required("لطفا لینک مقاله را وارد کنید")
        .matches(regex, "لطفا لینک صحیح وارد کنید"),
      poster_id: Yup.number().required("لطفا تصویر کاور را انتخاب کنید"),
    }),
    onSubmit: (data) => {
      data.media = { poster: icon };
      productData?.sidebars?.outsource
        ? handleAddData({
            sidebars: {
              ...productData?.sidebars,
              outsource: [...productData?.sidebars?.outsource, data],
            },
          })
        : handleAddData({
            sidebars: { ...productData?.sidebars, outsource: [data] },
          });
      seticon(null);
      setOpen(false);
      formik.resetForm();
    },
  });

  const formikInSource = useFormik({
    initialValues: {
      id: "",
      type: "BLOG",
      typeInEdit: "BLOG",
      status: "ACTIVE",
      blogItem: "",
      blog: "",
      title: "",
      priority: 100,
      source: "insource",
    },
    onSubmit: (data) => {
      data.blogItem = slectedBlog;
      data.title = slectedBlog?.name;
      data.blog = slectedBlog;
      if (step === 8) {
        productData?.sidebars?.insource
          ? handleAddData({
              sidebars: {
                ...productData?.sidebars,
                insource: [...productData?.sidebars?.insource, data],
              },
            })
          : handleAddData({
              sidebars: { ...productData?.sidebars, insource: [data] },
            });
      } else if (step === 9) {
        productData?.blogs
          ? handleAddData({
              blogs: [...productData?.blogs, data?.id],
            })
          : handleAddData({
              sidebars: { ...productData?.sidebars, insource: [data] },
            });
      }
      //   seticon(null);
      setOpen(false);
      formik.resetForm();
      setslectedBlog("");
      setsearchBlog([]);
    },
  });

  const handleAddData = (data) => {
    console.log("dvsdvsdvdsvsdv", data);
    dispatch({
      type: "ADD",
      productData: data,
    });
  };

  const handleBlogType = (type) => {
    setblogTypee(type);
  };

  const handleSearchBlog = (s) => {
    searchBlogQuery.mutate(s);
    console.log("Svsdvsdvs", s);
  };

  useEffect(() => {
    searchBlogQuery.mutate("");
  }, []);

  const handleSelectBlog = (blog) => {
    setslectedBlog(blog);
    formikInSource.setFieldValue("id", blog?.id);
  };

  useEffect(() => {
    if (!open) {
      formik.resetForm();
      setslectedBlog("");
      setsearchBlog([]);
      seticon(null);
    }
  }, [open]);

  return (
    <>
      <AddMediaCategory
        open={OpenForMainMedia}
        setOpen={setOpenForMainMedia}
        selectedItem={(e) => selectedItemForMain(e)}
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
                        <p className="font-Kalameh text-white">افزودن مقاله:</p>
                      </div>
                      <div className="w-full flex flex-row gap-4 p-5">
                        <div
                          className="flex flex-row  items-center gap-2 cursor-pointer"
                          onClick={() => handleBlogType(blogType.INSOURCE)}
                        >
                          <div
                            className={`w-[18px] h-[18px] rounded-full relative border-[2px] border-primary flex items-center justify-center group-hover:border-white transition-all duration-500 box-border overflow-hidden ${
                              //   formik?.values?.type === "MULTIPLE_OPTION"
                              //  "border-white"
                              "border-primary"
                            }`}
                          >
                            <div
                              className={` group-hover:bg-white transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full 
                                ${
                                  blogTypee == blogType.INSOURCE
                                    ? "bg-primary"
                                    : "bg-transparent"
                                }
                                `}
                            ></div>
                          </div>
                          <span
                            className={`font-Kalameh text-[16px] ${
                              blogTypee == blogType.INSOURCE
                                ? "text-[#222427]"
                                : "text-[#8E9191]"
                            }  `}
                          >
                            انتخاب از مقالات سایت
                          </span>
                        </div>
                        <div
                          className="flex flex-row  items-center gap-2 cursor-pointer"
                          onClick={() => handleBlogType(blogType.OUTSOURCE)}
                        >
                          <div
                            className={`w-[18px] h-[18px] rounded-full relative border-[2px] border-primary flex items-center justify-center group-hover:border-white transition-all duration-500 box-border overflow-hidden ${
                              //   formik?.values?.type === "MULTIPLE_OPTION"
                              //  "border-white"
                              "border-primary"
                            }`}
                          >
                            <div
                              className={` group-hover:bg-white transition-all duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full 
                                ${
                                  blogTypee == blogType.OUTSOURCE
                                    ? "bg-primary"
                                    : "bg-transparent"
                                }
                                `}
                            ></div>
                          </div>
                          <span
                            className={`font-Kalameh text-[16px] ${
                              blogTypee == blogType.OUTSOURCE
                                ? "text-[#222427]"
                                : "text-[#8E9191]"
                            }  `}
                          >
                            انتخاب از لینک خارجی
                          </span>
                        </div>
                      </div>
                      {blogTypee == blogType.INSOURCE ? (
                        <div className="w-full p-5 flex flex-col ">
                          <span className="font-Kalameh  px-2 text-[#00838F] font-[500] ">
                            {" "}
                            فقط امکان انتخاب یک مقاله را دارید
                          </span>
                          <div className="w-full flex flex-row items-center">
                            <div className=" w-full  p-2  rounded-[6px] relative">
                              <div
                                className="font-Kalameh bg-[#DBEEF6] mt-3 text-black  text-[14px]  gap-2 font-[500]
                      outline-none w-full h-[44px] px-4 placeholder:text-[#C4C7C7] rounded-md flex flex-row items-center justify-start"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                                    fill="#222427"
                                  />
                                  <path
                                    d="M21.9995 22.7504C21.8095 22.7504 21.6195 22.6804 21.4695 22.5304L19.4695 20.5304C19.1795 20.2404 19.1795 19.7604 19.4695 19.4704C19.7595 19.1804 20.2395 19.1804 20.5295 19.4704L22.5295 21.4704C22.8195 21.7604 22.8195 22.2404 22.5295 22.5304C22.3795 22.6804 22.1895 22.7504 21.9995 22.7504Z"
                                    fill="#222427"
                                  />
                                </svg>
                                <input
                                  onChange={(e) =>
                                    handleSearchBlog(e.target.value)
                                  }
                                  className=" h-full font-Kalameh bg-[#DBEEF6]  text-black items-center  text-[14px] flex gap-2 font-[500]
                       outline-none w-full  p-2 placeholder:text-[#C4C7C7] rounded-md"
                                  placeholder="انتخاب از مقالات"
                                />
                              </div>
                              {searchBlog.length != 0 && (
                                <div className="w-full h-72 hide-scrollbar overflow-scroll absolute bg-white p-5 shadow-lg rounded-lg drop-shadow-md flex flex-col gap-3">
                                  {searchBlog.map((item) => (
                                    <span
                                      onClick={() => handleSelectBlog(item)}
                                      className={`w-full  cursor-pointer   hover:bg-[#4FB3BF] rounded-md p-1 transition-all ${
                                        slectedBlog?.id === item?.id
                                          ? "bg-[#4FB3BF] text-white"
                                          : " hover:text-white text-primary"
                                      }`}
                                    >
                                      {item?.name}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <button
                              className="flex mt-2 items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                              onClick={() => setsearchBlog([])}
                            >
                              افزودن
                            </button>
                          </div>

                          {slectedBlog != "" && (
                            <div className="w-full flex flex-col px-3">
                              <div className=" w-full flex flex-row bg-[#C4C7C7] mt-2 rounded p-1 items-center gap-3">
                                <svg
                                  onClick={() => setslectedBlog("")}
                                  width="15"
                                  height="16"
                                  className="cursor-pointer"
                                  viewBox="0 0 15 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1.56709 15.5C1.16876 15.5 0.77044 15.3533 0.455975 15.0389C-0.151992 14.4312 -0.151992 13.4253 0.455975 12.8175L12.3218 0.955816C12.9298 0.348061 13.9361 0.348061 14.544 0.955816C15.152 1.56357 15.152 2.56951 14.544 3.17726L2.6782 15.0389C2.3847 15.3533 1.96541 15.5 1.56709 15.5Z"
                                    fill="#222427"
                                  />
                                  <path
                                    d="M13.4329 15.5C13.0346 15.5 12.6363 15.3533 12.3218 15.0389L0.455975 3.17726C-0.151992 2.56951 -0.151992 1.56357 0.455975 0.955816C1.06394 0.348061 2.07023 0.348061 2.6782 0.955816L14.544 12.8175C15.152 13.4253 15.152 14.4312 14.544 15.0389C14.2296 15.3533 13.8312 15.5 13.4329 15.5Z"
                                    fill="#222427"
                                  />
                                </svg>
                                <span className="font-Kalameh text-[14px]">
                                  {slectedBlog.name}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
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
                          </div>
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
                      )}

                      <div className="w-full flex items-center justify-end p-5 gap-3">
                        <button
                          className="flex items-center justify-center gap-1.5 h-11 bg-[#EFF1F1] hover:hover:bg-cyann  transition-colors duration-500 px-3 text-black rounded-[4px] font-KalamehMed font-medium"
                          onClick={() => setOpen(false)}
                        >
                          انصراف
                        </button>

                        <button
                          className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                          onClick={() => {
                            blogTypee == blogType.INSOURCE
                              ? formikInSource.handleSubmit()
                              : formik.handleSubmit();
                          }}
                        >
                          افزودن
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

export default React.forwardRef(AddProductSideBarAddBlog);
