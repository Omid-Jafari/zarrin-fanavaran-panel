import React, {
  Fragment,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
  useContext,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddProductContext from "../../../../context/product/AddProductContext";
import { fromEdit } from "../../../../utils/FromEdit";

function EditTextAttributeModal({}, ref) {
  const [open, setOpen] = useState(false);
  const [index, setindex] = useState(0);
  const { step, productData, dispatch } = useContext(AddProductContext);
  const [attrData, setattrData] = useState({});
  useImperativeHandle(ref, () => ({
    opeModal(item, index) {
      setOpen(true);
      setattrData(item);
      setFormikData(item);
      setAttrIndex(item, index);
    },
  }));
  const setAttrIndex = (item, index) => {
    if (fromEdit()) {
      setindex(productData?.attributes.indexOf(item));
    } else {
      setindex(index);
    }
    console.log("svsdvsdsacascascv", index);
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      value: "",
      summary_fa: "",
      summary_en: "",
      content: "",
      is_default: 1,
      is_main: "",
      priority: 1000000,
      option_ids: [],
      attrData: {},
    },
    validationSchema: Yup.object({
      value: Yup.string()
        .required("لطفا نام متن کوتاه  را وارد کنید")
        .max(50, "حداکثر  50 کاراکتر"),
      summary_fa: Yup.string()
        .required("لطفا نام فارسی ویژگی را وارد کنید")
        .max(70, "حداکثر  70 کاراکتر"),
      summary_en: Yup.string()
        .required("لطفا نام انگلیسی را وارد کنید")
        .max(70, "حداکثر  70 کاراکتر"),
      is_default: Yup.boolean().required("لطفا یکی از گزینه ها را انتخاب کنید"),
    }),

    onSubmit: (data) => {
      handleEditAttr(data);

      formik.resetForm();
      setOpen(false);
    },
    validate: (r) => {
      console.log("dvsdvsdv", r);
    },
  });

  useEffect(() => {
    formik.setFieldValue("id", attrData?.attrData?.id);
    formik.setFieldValue("attrData", attrData?.attrData);
    formik.setFieldValue("is_main", attrData?.is_main);
  }, [attrData]);

  const handleAddData = (data) => {
    dispatch({
      type: "ADD",
      productData: data,
    });
  };

  const setFormikData = (data) => {
    console.log("edbsbsdbb", data);
    formik.setFieldValue("value", data?.value);
    formik.setFieldValue("summary_fa", data?.summary_fa);
    formik.setFieldValue("summary_en", data?.summary_en);
    formik.setFieldValue("content", data?.content);
    formik.setFieldValue("is_default", data?.is_default);
  };
  const handleEditAttr = (data) => {
    const attributes = productData?.attributes;
    attributes[index] = data;

    handleAddData({ attributes });
  };

  return (
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
                      <p className="font-Kalameh text-white">
                        تعریف ویژگی اصلی محصول:
                      </p>
                    </div>

                    <div className="w-full p-5">
                      <p className="font-Kalameh text-black items-center  text-[14px] flex gap-2 font-[600] ">
                        <img
                          className="w-[24px] h-[24px]"
                          src={attrData?.attrData?.media?.icon?.file}
                        />
                        {attrData?.attrData?.name}:{" "}
                      </p>
                      <div className=" w-full bg-[#DBEEF6] p-2 mt-4 rounded-[6px]">
                        <div className="w-full h-full items-start flex mt-5 mb-4 rounded-lg  flex-col gap-2">
                          <div className="w-full z-10 flex flex-row justify-center items-center gap-[18px]">
                            <div className="w-3/12 bg-white text-sm rounded-lg p-4 h-full flex justify-start items-center font-bold text-[#003E43]">
                              متن کوتاه:*
                            </div>
                            <input
                              className="w-9/12 outline-none bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
                              placeholder="برای مثال:اسنپ دراگون 888"
                              name="value"
                              onChange={formik.handleChange}
                              value={formik.values.value}
                            />
                          </div>
                          <div className="w-full flex justify-between mt-3 px-3 items-center">
                            <div>
                              {formik.errors.value && formik.touched.value && (
                                <small className="text-red-700">
                                  {formik.errors.value}
                                </small>
                              )}
                            </div>
                            <span className=" flex justify-end font-Kalameh text-[14px] text-black ">
                              حداکثر 50 کاراکتر
                            </span>
                          </div>
                        </div>

                        <div className="w-full h-full items-start flex mt-5 mb-4 rounded-lg  flex-col gap-2">
                          <div className="w-full z-10 flex flex-row justify-center items-center gap-[18px]">
                            <div className="w-3/12 bg-white text-sm rounded-lg p-4 h-full flex justify-start items-center font-bold text-[#003E43]">
                              متن فارسی:*
                            </div>
                            <input
                              className="w-9/12 outline-none bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
                              placeholder="برای مثال:اسنپ دراگون 888"
                              name="summary_fa"
                              onChange={formik.handleChange}
                              value={formik.values.summary_fa}
                            />
                          </div>
                          <div className="w-full flex justify-between mt-3 px-3 items-center">
                            <div>
                              {formik.errors.summary_fa &&
                                formik.touched.summary_fa && (
                                  <small className="text-red-700">
                                    {formik.errors.summary_fa}
                                  </small>
                                )}
                            </div>
                            <span className=" flex justify-end font-Kalameh text-[14px] text-black ">
                              حداکثر 70 کاراکتر
                            </span>
                          </div>
                        </div>

                        <div className="w-full h-full items-start flex mt-5 mb-4 rounded-lg  flex-col gap-2">
                          <div className="w-full z-10 flex flex-row justify-center items-center gap-[18px]">
                            <div className="w-3/12 bg-white text-sm rounded-lg p-4 h-full flex justify-start items-center font-bold text-[#003E43]">
                              متن انگلیسی:*
                            </div>
                            <input
                              className="w-9/12 outline-none bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
                              placeholder="برای مثال:اسنپ دراگون 888"
                              name="summary_en"
                              onChange={formik.handleChange}
                              value={formik.values.summary_en}
                            />
                          </div>
                          <div className="w-full flex justify-between mt-3 px-3 items-center">
                            <div>
                              {formik.errors.summary_en &&
                                formik.touched.summary_en && (
                                  <small className="text-red-700">
                                    {formik.errors.summary_en}
                                  </small>
                                )}
                            </div>
                            <span className=" flex justify-end font-Kalameh text-[14px] text-black ">
                              حداکثر 70 کاراکتر
                            </span>
                          </div>
                        </div>

                        <div className="w-full  z-10  flex flex-row justify-center items-start gap-[18px]">
                          <div className="w-3/12  bg-white text-sm rounded-lg px-2 py-5  flex justify-center items-center  font-bold text-[#003E43]">
                            متن تکمیلی:
                          </div>{" "}
                          <textarea
                            className="w-9/12 outline-none bg-white h-[151px]  rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]"
                            placeholder="For Example: Qualcome Snapdragon 888"
                            name="content"
                            onChange={formik.handleChange}
                            value={formik.values.content}
                          />
                        </div>
                        <div className="w-full flex justify-end mt-3 px-3 items-center">
                          <span className=" flex justify-end font-Kalameh text-[14px] text-black ">
                            بدون محدودیت
                          </span>
                        </div>

                        <div className="w-full flex flex-row justify-center items-center gap-[18px]">
                          <div className="w-full flex justify-between items-center mt-3 bg-white rounded-lg p-4 font-Kalameh text-black placeholder:text-[#C4C7C7]">
                            <div className="w bg-white rounded-lg  font-bold text-[#003E43]">
                              نمایش در سایت:*
                            </div>{" "}
                            <label
                              for="default-toggle"
                              className="inline-flex relative items-center cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                name="is_default"
                                value={formik.values.is_default}
                                id="default-toggle"
                                className="sr-only peer"
                                checked={
                                  formik.values.is_default == 1 ? true : false
                                }
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "is_default",
                                    e.target.checked ? 1 : 0
                                  )
                                }
                              />
                              <div
                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none cursor-pointer rounded-full peer
                      peer-checked:after:translate-x-full
                       peer-checked:after:border-white after:content-[''] 
                       after:absolute after:top-[2px] after:left-[2px] after:bg-white
                        after:border-gray-100 after:border after:rounded-full after:h-5 
                        after:w-5 after:transition-all dark:bg-[#1C3F3A] peer-checked:bg-green-700"
                              ></div>
                            </label>
                          </div>
                        </div>
                        {formik.errors.is_default &&
                          formik.touched.is_default && (
                            <small className="text-red-700">
                              {formik.errors.is_default}
                            </small>
                          )}
                      </div>
                    </div>

                    <div className="w-full rounded-md bg-white p-4 flex justify-between items-center">
                      <button
                        className="flex z-20 items-center justify-center gap-1.5 h-11 bg-[#EFF1F1] hover:hover:bg-cyann  transition-colors duration-500 px-3 text-black rounded-[4px] font-KalamehMed font-medium"
                        onClick={() => setOpen(false)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.1299 19.0596H7.12988C6.71988 19.0596 6.37988 18.7196 6.37988 18.3096C6.37988 17.8996 6.71988 17.5596 7.12988 17.5596H15.1299C17.4699 17.5596 19.3799 15.6496 19.3799 13.3096C19.3799 10.9696 17.4699 9.05957 15.1299 9.05957H4.12988C3.71988 9.05957 3.37988 8.71957 3.37988 8.30957C3.37988 7.89957 3.71988 7.55957 4.12988 7.55957H15.1299C18.2999 7.55957 20.8799 10.1396 20.8799 13.3096C20.8799 16.4796 18.2999 19.0596 15.1299 19.0596Z"
                            fill="#222427"
                          />
                          <path
                            d="M6.42957 11.5599C6.23957 11.5599 6.04957 11.4899 5.89957 11.3399L3.33957 8.77988C3.04957 8.48988 3.04957 8.00988 3.33957 7.71988L5.89957 5.15988C6.18957 4.86988 6.66957 4.86988 6.95957 5.15988C7.24957 5.44988 7.24957 5.92988 6.95957 6.21988L4.92957 8.24988L6.95957 10.2799C7.24957 10.5699 7.24957 11.0499 6.95957 11.3399C6.81957 11.4899 6.61957 11.5599 6.42957 11.5599Z"
                            fill="#222427"
                          />
                        </svg>
                        مرحله قبل
                      </button>

                      <button
                        type="button"
                        onClick={formik.handleSubmit}
                        className="text-[#F9FCFD] w-[115px] bg-primary flex justify-center items-center rounded-md gap-1 h-11"
                      >
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
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default React.forwardRef(EditTextAttributeModal);
