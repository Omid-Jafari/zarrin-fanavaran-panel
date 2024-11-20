import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { allBrands, brands, searchBrands } from "../../../api/ApiClient";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import Loading from "../../elements/loading";

function AddBrandModal({ open, setOpen, formik }) {
  const [selectedBrand, setselectedBrand] = useState(false);
  const [brands, setbrands] = useState([]);
  const [selectedbrandName, setselectedbrandName] = useState("")

  const brandsMutation = useMutation((query) => searchBrands(query), {
    onSuccess: (res) => {
      console.log("sdbsdbsscsacscdb", res?.data?.data);
      setbrands(res?.data?.data);
    },
  });
  useEffect(() => {
    brandsMutation.mutate("");
  }, []);


  const handleSelectedBrand = (item) => {
    setselectedBrand(item);
  };

  const handleAddButton = () => {
    formik.values.brand_id = selectedBrand;
    console.log("dvsdvsdv",selectedBrand?.name_fa);
    setOpen(false)
  };

  useEffect(() => {
   if(open){
      setselectedBrand(formik.values?.brand_id)
   }
  }, [open])
  

  const handleSearchBrand = (s) => {
    brandsMutation.mutate(s);
  };
  return (
    <div className="w-full  absolute ">
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
                <Dialog.Panel className="relative w-2/5 transition-all  flex flex-col items-start ">
                  <div className="bg-white  text-right shadow-xl rounded-[18px]  w-full flex flex-col">
                    <div className="w-full h-[60px] bg-[#4FB3BF] flex justify-start p-3 items-center">
                      <p className="font-Kalameh text-white">
                        انتخاب برند محصول:
                      </p>
                    </div>

                    <div className="w-full px-4">
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
                          placeholder="جستجو در برند"
                          onChange={(e) => handleSearchBrand(e.target.value)}
                        />
                      </div>
                      <div className="w-full h-full flex flex-col">
                        <div className="list-none flex flex-col justify-start items-start ">
                          {brandsMutation.isLoading ? (
                            <div className="w-full flex flex-row justify-center items-center ">
                              <Loading className="w-12 h-12  text-blacklead animate-pulse" />
                            </div>
                          ) : (
                            brands.map((item) => (
                              <div
                                className={`rounded-[5px] ${
                                  selectedBrand.id == item.id
                                    ? "bg-[#00838F]"
                                    : "bg-white"
                                } overflow-hidden h-[30px] w-[98px] gap-2 flex justify-start p-2 cursor-pointer items-center`}
                                onClick={(e) => handleSelectedBrand(item)}
                              >
                                <svg
                                  width="6"
                                  height="7"
                                  viewBox="0 0 6 7"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.99993 6.31969C4.55737 6.31969 5.81993 5.05713 5.81993 3.49969C5.81993 1.94224 4.55737 0.679688 2.99993 0.679688C1.44249 0.679688 0.179932 1.94224 0.179932 3.49969C0.179932 5.05713 1.44249 6.31969 2.99993 6.31969Z"
                                    className={`${
                                      selectedBrand.id == item.id
                                        ? "fill-white"
                                        : "fill-[#00838F]"
                                    } `}
                                  />
                                </svg>
                                <div
                                  className={` ${
                                    selectedBrand.id == item.id
                                      ? "text-white text-[14px]"
                                      : "text-[#00838F] text-[14px]"
                                  }`}
                                >
                                  {item?.name_fa}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full rounded-md bg-white p-4">
                      <button
                        type="button"
                        onClick={handleAddButton}
                        className="text-[#F9FCFD] bg-primary mt-5 flex justify-center items-center rounded-md w-full h-11"
                      >
                        تایید
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

export default AddBrandModal;
