import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { attributesSearch } from "../../../api/ApiClient";
import { useMutation } from "@tanstack/react-query";
import AddProductContext from "../../../context/product/AddProductContext";
import AddTextAttributeModal from "./text-attibute/AddTextAttributeModal";
import AddSingleOptionAttributeModal from "./single-option-attribute/AddSingleOptionAttributeModal";
import AddMultiOptionAttributeModal from "./multi-option-attribute/AddMultiOptionAttributeModal";
import AddBooleanAttribute from "./boolean-atribiute/AddBooleanAttribute";
import Loading from "../../elements/loading";
function AddAttributeProductModal({ open, setOpen, formik }) {
  const [searchAttr, setsearchAttr] = useState("");
  const [attributes, setattributes] = useState([]);

  const TextTypeModalRef = useRef("");
  const SingleOptionTypeModalRef = useRef("");
  const MultiOptionTypeModalRef = useRef("");
  const BooleanOptionTypeModalRef = useRef("");
  const { step, dispatch, productData } = useContext(AddProductContext);
  const attributesQuery = useMutation((s) => attributesSearch(s), {
    onSuccess: (res) => {
      setattributes(res?.data?.data);
    },
  });

  useEffect(() => {
    attributesQuery.mutate(searchAttr);
  }, [searchAttr]);

  const handleTextAttributesModal = (item) => {
    TextTypeModalRef.current.opeModal(item);
  };

  const handleSingleOptionAttributesModal = (item) => {
    SingleOptionTypeModalRef.current.opeModal(item);
  };
  const handleMultiAttributeModal = (item) => {
    MultiOptionTypeModalRef.current.opeModal(item);
  };

  const handleBooelanAttributeModal = (item) => {
    BooleanOptionTypeModalRef.current.opeModal(item);
  };

  const handleSearchBrand = (s) => {
    setsearchAttr(s);
  };

  useEffect(() => {
    if (!open) setsearchAttr("");
  }, [open]);

  useEffect(() => {
    if (open) attributesQuery.mutate(searchAttr);
  }, [open]);

  return (
    <>
      <AddTextAttributeModal ref={TextTypeModalRef} />
      <AddSingleOptionAttributeModal ref={SingleOptionTypeModalRef} />
      <AddMultiOptionAttributeModal ref={MultiOptionTypeModalRef} />
      <AddBooleanAttribute ref={BooleanOptionTypeModalRef} />

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
                        <p className="font-Kalameh text-black text-[14px] font-[600] ">
                          انتخاب ویژگی:{" "}
                        </p>
                        <div className=" w-full bg-[#DBEEF6] p-2 mt-4 rounded-[6px]">
                          <div className="flex items-center gap-3 h-11 bg-[#EFF1F1] rounded-lg px-2 m-4 w-full mt-4 mr-auto">
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
                            <input
                              type="text"
                              className="flex-1 placeholder:text-[#C4C7C7] bg-[#EFF1F1] text-dark focus:outline-none"
                              placeholder="جستجو در ویژگی ها"
                              onChange={(e) =>
                                handleSearchBrand(e.target.value)
                              }
                            />
                            {attributesQuery.isLoading && (
                              <Loading className="w-8 h-8 text-blacklead animate-pulse" />
                            )}
                          </div>

                          <div className="px-2  w-full mt-6 flex flex-row gap-3 flex-wrap">
                            {attributes.map(
                              (attr) =>
                                attr.type == "TEXT" &&
                                (productData?.attributes
                                  ?.map((item) => item?.id)
                                  .includes(attr.id) ? (
                                  <div className="w-fit  bg-gray-300 cursor-pointer transition-colors ease-in-out duration-400  rounded-[4px] px-3 py-1 font-[600]">
                                    <span>{attr?.name}</span>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleTextAttributesModal(attr)
                                    }
                                    className="w-fit  bg-white cursor-pointer transition-colors ease-in-out duration-400 hover:bg-cyann rounded-[4px] px-3 py-1 font-[600]"
                                  >
                                    <span>{attr?.name}</span>
                                  </div>
                                ))
                            )}
                          </div>

                          <div className="px-2  w-full mt-6 flex flex-row gap-3 flex-wrap ">
                            {attributes.map(
                              (attr) =>
                                attr.type == "MULTIPLE_OPTION" &&
                                (productData?.attributes
                                  ?.map((item) => item?.id)
                                  .includes(attr.id) ? (
                                  <div className="w-fit  bg-gray-300 cursor-pointer transition-colors ease-in-out duration-400  rounded-[4px] px-3 py-1 font-[600]">
                                    <span>{attr?.name}</span>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleMultiAttributeModal(attr)
                                    }
                                    className="w-fit bg-white rounded-[4px] px-3 py-1 font-[600] transition-colors ease-in-out duration-400 hover:bg-cyann  cursor-pointer"
                                  >
                                    <span>{attr?.name}</span>
                                  </div>
                                ))
                            )}
                          </div>
                          <div className="px-2  w-full mt-6 flex flex-row gap-3 flex-wrap">
                            {attributes.map(
                              (attr) =>
                                attr.type == "SINGLE_OPTION" &&
                                (productData?.attributes
                                  ?.map((item) => item?.id)
                                  .includes(attr.id) ? (
                                  <div className="w-fit  bg-gray-300 cursor-pointer transition-colors ease-in-out duration-400  rounded-[4px] px-3 py-1 font-[600]">
                                    <span>{attr?.name}</span>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleSingleOptionAttributesModal(attr)
                                    }
                                    className="w-fit bg-white rounded-[4px] px-3 py-1 font-[600] transition-colors ease-in-out duration-400 hover:bg-cyann  cursor-pointer"
                                  >
                                    <span>{attr?.name}</span>
                                  </div>
                                ))
                            )}
                          </div>
                          <div className="px-2  w-full mt-6 flex flex-row gap-3 flex-wrap">
                            {attributes.map(
                              (attr) =>
                                attr.type == "BOOLEAN" &&
                                (productData?.attributes
                                  ?.map((item) => item?.id)
                                  .includes(attr.id) ? (
                                  <div className="w-fit  bg-gray-300 cursor-pointer transition-colors ease-in-out duration-400  rounded-[4px] px-3 py-1 font-[600]">
                                    <span>{attr?.name}</span>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() =>
                                      handleBooelanAttributeModal(attr)
                                    }
                                    className="w-fit bg-white rounded-[4px] px-3 py-1 font-[600] transition-colors ease-in-out duration-400 hover:bg-cyann  cursor-pointer"
                                  >
                                    <span>{attr?.name}</span>
                                  </div>
                                ))
                            )}
                          </div>
                        </div>
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

export default AddAttributeProductModal;
