import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import DeleteIcon from "../../../../../public/images/icons/deleteIcon";
import { colorsFilterData } from "../../../../api/ApiClient";
import AddProductContext from "../../../../context/product/AddProductContext";
import AddMediaCategory from "../../../category/add-media-category";
import Loading from "../../../elements/loading";
import Tooltip from "../../../elements/Tooltip";

const StepFiveColor = () => {
  const { step, productData, dispatch } = useContext(AddProductContext);
  const [colorsData, setColorsData] = useState([]);
  const [selectedColor, setSelectedColor] = useState(productData?.items || []);
  const [openModal, setOpenModal] = useState(false);
  const [openOtherImgs, setOpenOtherImgs] = useState(false);
  const [gallery_ids, setGallery_ids] = useState(
    productData?.media?.gallery || []
  );
  const [colorData, setColorData] = useState({});
  const [showImageModal, setShowImageModal] = useState({ show: false });
  const [filterData, setFilterData] = useState("");
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const colorsFilterDataMutation = useMutation(colorsFilterData, {
    onSuccess: (res) => {
      setColorsData(res?.data?.data);
    },
  });
  useEffect(() => {
    colorsFilterDataMutation?.mutate({ filterData });
  }, [filterData]);

  const selectedItemForImg = (item) => {
    setSelectedColor((prev) =>
      prev.map((selected) => {
        if (selected?.color_id === colorData?.color_id) {
          return {
            ...selected,
            media: { main: { file: item?.file, name: item?.name } },
            main_id: item.id,
          };
        } else {
          return selected;
        }
      })
    );
  };
  const selectedItemForOtherImg = (item) => {
    setGallery_ids((prev) => [
      ...prev,
      {
        id: item.id,
        file: item?.file,
        name: item?.name,
        type: item?.mime_type,
      },
    ]);
  };
  const handleNextStep = () => {
    // if (JSON.stringify(errors) === "{}") {
      dispatch({
        type: "ADD",
        productData: {
          media: { gallery: gallery_ids },
          items: selectedColor,
        },
      });
      dispatch({
        type: "STEP",
        step: step + 1,
      });
    // } else {
    //   setShowErrors(true);
    // }
  };
  const handlepreviosStep = () => {
    dispatch({
      type: "STEP",
      step: step - 1,
    });
  };
  useEffect(() => {
    let basePriceError = selectedColor?.filter(
      (selected) => !selected?.media?.main?.file
    );
    let isMainError = selectedColor?.filter(
      (selected) => selected?.is_main === 1
    );
    if (basePriceError?.length !== 0) {
      setErrors((prev) => {
        return {
          ...prev,
          selectedcolorError:
            "لطفا برای تمامی رنگ های انتخاب شده یک عکس انتخاب کنید",
        };
      });
    } else {
      setErrors((prev) => {
        const { selectedcolorError, ...edited } = prev;
        return edited;
      });
    }
    if (isMainError?.length === 0) {
      setErrors((prev) => {
        return {
          ...prev,
          selectMainColorError: "لطفا یک رنگ را به عنوان اصلی انتخاب کنید",
        };
      });
    } else {
      setErrors((prev) => {
        const { selectMainColorError, ...edited } = prev;
        return edited;
      });
    }
    if (selectedColor?.length === 0) {
      setErrors((prev) => {
        return {
          ...prev,
          selectOneError: "لطفا حداقل یک رنگ انتخاب کنید",
        };
      });
    } else {
      setErrors((prev) => {
        const { selectOneError, ...edited } = prev;
        return edited;
      });
    }
    if (JSON.stringify(errors) === "{}") {
      setShowErrors(false);
    }
  }, [selectedColor]);

  return (
    <>
      <Transition.Root show={showImageModal?.show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setShowImageModal({ show: false })}
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative transform overflow-hidden 
                rounded-[8px] w-1/3  bg-white text-left shadow-xl transition-all sm:my-8"
                >
                  <div
                    className="bg-blue-lightt w-fit p-2 rounded-bl-[22px] cursor-pointer"
                    onClick={() => setShowImageModal({ show: false })}
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
                        d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
                      ></path>
                      <path
                        fill="#222427"
                        d="M9.17 15.58c-.19 0-.38-.07-.53-.22a.754.754 0 010-1.06l5.66-5.66c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L9.7 15.36c-.14.15-.34.22-.53.22z"
                      ></path>
                      <path
                        fill="#222427"
                        d="M14.83 15.58c-.19 0-.38-.07-.53-.22L8.64 9.7a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l5.66 5.66c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
                      ></path>
                    </svg>
                  </div>
                  <div className="w-full h-full   p-6">
                    <img className=" rounded-md" src={showImageModal?.img} />
                  </div>
                  <div className="w-full flex justify-between items-center p-5">
                    <div className=""></div>
                    {console.log("showImageModal", showImageModal)}
                    <p>{showImageModal?.title}</p>
                    {showImageModal?.index ? (
                      <button
                        onClick={() => {
                          setGallery_ids((prev) =>
                            prev.filter(
                              (gallery, index) =>
                                index !== showImageModal?.index - 1
                            )
                          );
                          setShowImageModal({ show: false });
                        }}
                        className="focus:outline-none"
                      >
                        <Tooltip
                          svgIcon={
                            <DeleteIcon className="fill-[#CA3636] hover:fill-[#7D3C45] transition-colors duration-500" />
                          }
                          title="حذف"
                        />
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex flex-col justify-between items-center  w-full h-full z-10">
        {console.log("productData", productData)}
        <div className="flex flex-row justify-between items-stretch w-full h-full gap-4">
          <div className="w-1/2 flex flex-col">
            <p className="font-KalamehMed font-medium text-black text-sm">
              انتخاب رنگ‌:
            </p>
            <p className="font-Kalameh text-[#5C5F5F] text-sm">
              (تمام رنگ‌های محصول خود را انتخاب کنید.)
            </p>
            <div className="flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-full mt-4 mr-auto">
              <input
                type="text"
                className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none"
                placeholder="جستجو در رنگ‌ها"
                onChange={(e) => setFilterData(e?.target?.value)}
              />

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
            </div>
            <div className="bg-white flex-1 rounded-lg my-4">
              <div className=" px-4 py-5 flex flex-wrap justify-start items-start gap-3">
                {colorsFilterDataMutation?.isLoading ? (
                  <div className="flex justify-center w-full">
                    <Loading className="w-16 h-16 text-blacklead animate-pulse" />
                  </div>
                ) : (
                  colorsData?.map((color) => (
                    <button
                      onClick={() => {
                        setSelectedColor((prev) => {
                          const colorId = prev.findIndex(
                            (cId) => cId?.color_id === color?.id
                          );

                          if (colorId === -1) {
                            return [
                              ...prev,
                              {
                                color_id: color?.id,
                                color: {
                                  media: {
                                    icon: { file: color?.media?.icon?.file },
                                  },
                                },
                                name_fa: color?.name_fa,
                                guarantee_id: "",
                                base_price: "",
                                price: "",
                                discount_type: "AMOUNT",
                                discount_amount: 0,
                                stock: "",
                                max_qty: "",
                                is_main: 0,
                                discountDisable: false,
                              },
                            ];
                          } else {
                            return [
                              ...prev.slice(0, colorId),
                              ...prev.slice(colorId + 1),
                            ];
                          }
                        });
                      }}
                      className={`outline-none flex items-center transition gap-3 border-[1px] rounded-lg p-[10px] ${
                        selectedColor
                          .map((color) => color?.color_id)
                          .includes(color?.id)
                          ? "border-[#00838F] bg-[#EFF1F1]"
                          : "border-[#C4C7C7] bg-white"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 flex items-center transition justify-center p-[1px] rounded-lg overflow-hidden border-2 relative ${
                          selectedColor
                            .map((color) => color?.color_id)
                            .includes(color?.id)
                            ? "border-[#2F6165]"
                            : "border-[#DBEEF6]"
                        }`}
                      >
                        <img
                          src={color?.media?.icon?.file}
                          className="w-full object-cover h-full rounded-lg"
                          alt=""
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="12"
                          fill="none"
                          viewBox="0 0 16 12"
                          className={`z-10 absolute top-1/2 left-1/2 transition -translate-x-1/2 -translate-y-1/2 ${
                            selectedColor
                              .map((color) => color?.color_id)
                              .includes(color?.id)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          <path
                            fill="#fff"
                            d="M5.988 11.072c-.283 0-.552-.113-.75-.312l-4.01-4.009c-.41-.41-.41-1.09 0-1.502.41-.41 1.09-.41 1.502 0l3.258 3.259 7.282-7.282c.41-.41 1.09-.41 1.501 0 .411.41.411 1.09 0 1.502L6.74 10.76a1.062 1.062 0 01-.75.312z"
                          ></path>
                        </svg>
                      </div>
                      <p className="font-KalamehMed font-medium ">
                        {color?.name_fa}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="w-[1px] h-full bg-[#C4C7C7]"></div>
          <div className="w-1/2 flex flex-col ">
            <p className="font-KalamehMed font-medium text-black text-sm">
              افزودن تصاویر:
            </p>
            <p className="font-Kalameh text-[#5C5F5F] text-sm">
              (تصویر مربوط به هر رنگ را آپلود نموده و سپس تصویر پیشفرض و اصلی
              محصول را انتخاب کنید.)
            </p>
            <div className="bg-white flex-1 rounded-lg px-4 py-5 my-4 flex flex-col gap-3">
              {selectedColor?.map((color, index) => (
                <div className="w-full flex items-center gap-3">
                  <div
                    className={`w-8 h-8 flex items-center flex-shrink-0 transition justify-center p-[1px] rounded-lg overflow-hidden border-2 border-[#2F6165]`}
                  >
                    <img
                      src={color?.color?.media?.icon?.file}
                      className="w-full object-cover h-full rounded-lg"
                      alt=""
                    />
                  </div>
                  <button
                    className="outline-none flex-shrink-0 flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
                    onClick={() => {
                      setOpenModal(!openModal);
                      setColorData(color);
                    }}
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
                        d="M11.88 14.99c-.19 0-.38-.07-.53-.22l-2.56-2.56a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.03 2.03 2.03-2.03c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2.56 2.56c-.15.15-.34.22-.53.22z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M11.88 14.92c-.41 0-.75-.34-.75-.75V4c0-.41.34-.75.75-.75s.75.34.75.75v10.17c0 .41-.34.75-.75.75z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M12 20.93c-5.15 0-8.75-3.6-8.75-8.75 0-.41.34-.75.75-.75s.75.34.75.75c0 4.27 2.98 7.25 7.25 7.25s7.25-2.98 7.25-7.25c0-.41.34-.75.75-.75s.75.34.75.75c0 5.15-3.6 8.75-8.75 8.75z"
                      ></path>
                    </svg>
                    آپلود تصویر
                  </button>
                  {color?.media?.main?.file ? (
                    <img
                      src={color?.media?.main?.file}
                      className="h-[44px] max-w-[87px] object-contain cursor-pointer"
                      alt=""
                      onClick={() =>
                        setShowImageModal({
                          show: true,
                          img: color?.media?.main?.file,
                          title: color?.media?.main?.name,
                        })
                      }
                    />
                  ) : (
                    showErrors && (
                      <p className="text-red-600 text-xs max-w-[25%]">
                        لطفا یک عکس انتخاب کنید *
                      </p>
                    )
                  )}
                  <AddMediaCategory
                    open={openModal}
                    setOpen={setOpenModal}
                    selectedItem={(e) => selectedItemForImg(e)}
                  />
                  <div className="flex flex-col items-center mr-auto gap-1">
                    <input
                      type="radio"
                      className="w-[18px] h-[18px] bg-primary"
                      checked={color?.is_main === 1}
                      onChange={() => {
                        setSelectedColor((prev) =>
                          prev?.map((single) => {
                            if (single?.color_id === color?.color_id) {
                              return { ...single, is_main: 1 };
                            } else {
                              return { ...single, is_main: 0 };
                            }
                          })
                        );
                      }}
                    />
                    <p className="text-xs text-blacklead">تصویر اصلی</p>
                  </div>
                </div>
              ))}
              <div className="mt-auto w-full flex items-center flex-wrap gap-3">
                <button
                  className="outline-none flex-shrink-0 flex items-center justify-center gap-1.5 h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 rounded-[4px] font-KalamehMed font-medium"
                  onClick={() => {
                    setOpenOtherImgs(!openOtherImgs);
                  }}
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
                      d="M11.88 14.99c-.19 0-.38-.07-.53-.22l-2.56-2.56a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.03 2.03 2.03-2.03c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2.56 2.56c-.15.15-.34.22-.53.22z"
                    ></path>
                    <path
                      fill="#222427"
                      d="M11.88 14.92c-.41 0-.75-.34-.75-.75V4c0-.41.34-.75.75-.75s.75.34.75.75v10.17c0 .41-.34.75-.75.75z"
                    ></path>
                    <path
                      fill="#222427"
                      d="M12 20.93c-5.15 0-8.75-3.6-8.75-8.75 0-.41.34-.75.75-.75s.75.34.75.75c0 4.27 2.98 7.25 7.25 7.25s7.25-2.98 7.25-7.25c0-.41.34-.75.75-.75s.75.34.75.75c0 5.15-3.6 8.75-8.75 8.75z"
                    ></path>
                  </svg>
                  تصاویر دیگر
                </button>
                {gallery_ids?.map((img, index) => (
                  img.type=="video/mp4"
                  ?  <video
                  src={img?.file}
                  className="h-[44px] max-w-[87px] object-contain cursor-pointer"
                  alt=""
                  onClick={() =>
                    setShowImageModal({
                      show: true,
                      img: img?.file,
                      title: img?.name,
                      index: index + 1,
                    })
                  }
                />
                  :
                  <img
                    src={img?.file}
                    className="h-[44px] max-w-[87px] object-contain cursor-pointer"
                    alt=""
                    onClick={() =>
                      setShowImageModal({
                        show: true,
                        img: img?.file,
                        title: img?.name,
                        index: index + 1,
                      })
                    }
                  />
                ))}
                <AddMediaCategory
                  open={openOtherImgs}
                  setOpen={setOpenOtherImgs}
                  selectedItem={(e) => selectedItemForOtherImg(e)}
                />
              </div>
            </div>
          </div>
        </div>
        {showErrors && (
          <div className="w-full flex flex-col items-end mb-2">
            {errors?.selectOneError && (
              <p className="text-red-600 text-sm">{errors?.selectOneError}</p>
            )}
            {errors?.selectMainColorError && (
              <p className="text-red-600 text-sm">
                {errors?.selectMainColorError}
              </p>
            )}
            {errors?.selectedcolorError && (
              <p className="text-red-600 text-sm">
                {errors?.selectedcolorError}
              </p>
            )}
          </div>
        )}
        <div className="w-full flex items-center justify-between">
          <button
            className="flex items-center justify-center gap-1.5 h-11 bg-white hover:hover:bg-cyann  transition-colors duration-500 px-3 text-black rounded-[4px] font-KalamehMed font-medium"
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

          <button
            className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
            onClick={() => handleNextStep()}
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
                fill="white"
              />
              <path
                d="M13.26 16.2802C13.07 16.2802 12.88 16.2102 12.73 16.0602L9.20001 12.5302C8.91001 12.2402 8.91001 11.7602 9.20001 11.4702L12.73 7.94016C13.02 7.65016 13.5 7.65016 13.79 7.94016C14.08 8.23016 14.08 8.71016 13.79 9.00016L10.79 12.0002L13.79 15.0002C14.08 15.2902 14.08 15.7702 13.79 16.0602C13.65 16.2102 13.46 16.2802 13.26 16.2802Z"
                fill="white"
              />
            </svg>
            مرحله بعد
          </button>
        </div>
      </div>
    </>
  );
};

export default StepFiveColor;
