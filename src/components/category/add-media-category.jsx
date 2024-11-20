import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { folderList } from "../../api/ApiClient";
import Loading from "../elements/loading";
import AddFileMediaModal from "../meida/add-file-media-modal";
import UploadImageModal from "../meida/upload-image-modal";
function AddMediaCategory({ selectedItem, open, setOpen }) {
  const [Path, setPath] = useState({ path: "/", root: true });
  const handleCancel = () => {
    setOpen(false);
  };

  const [folders, setfolders] = useState([]);
  const [files, setfiles] = useState([]);
  const filesQuery = useMutation(async (path) => folderList(path.path), {
    onSuccess: (res) => {
      console.log("vsdbvsdbsdb", res);
      if (Path.root) {
        setfolders(res?.data?.data?.folders);
      } else {
        setfiles(res?.data?.data?.files);
      }
      console.log("sdbvsdbsdb", Path);
    },
  });
  useEffect(() => {
    filesQuery.mutate(Path);
  }, [Path]);

  const handleClick = (item) => {
    console.log("sdsdbssdvdsdb", item?.split("/")[1]);
    setPath({ path: "/" + item?.split("/")[1], root: false });
    // filesQuery.mutate("/"+item?.split("/")[1])
  };
  const addSelectedMedia = (item) => {
    selectedItem(item);
    setOpen(false);
    setPath({ path: "/", root: true });
  };

  const handleCloseButton = () => {
    setOpen(false);
    setPath({ path: "/", root: true });
  };

  const handleBackButton = () => {
    setPath({ path: "/", root: true });
  };

  const onUploadImage = () => {
    filesQuery.mutate(Path);
  };
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
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

          <div className="fixed inset-0 z-10 overflow-y-auto  ">
            <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Dialog.Panel
                className="relative transform overflow-hidden 
                rounded-[8px] bg-white text-left w-3/4  shadow-xl transition-all sm:my-8"
              >
                <div className="w-4/4 h-full flex flex-row justify-between px-5 py-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleCloseButton()}
                  >
                    <svg
                      width="24"
                      height="24"
                      className="fill-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.17 14.83L14.83 9.17"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.83 14.83L9.17 9.17"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {}

                  <button
                    onClick={() => handleBackButton()}
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
                <div className="px-6">
                  {Path.root == true ? (
                    ""
                  ) : (
                    <span>
                      <UploadImageModal path={Path} onUpload={onUploadImage} />
                      {/* <AddFileMediaModal  path={Path.path}  onUploadImage={onUploadImage}/> */}
                    </span>
                  )}
                </div>
                <div className="bg-white   w-full  cursor-pointer  relative">
                  <div
                    className={` ${
                      filesQuery.isLoading
                        ? "flex flex-row justify-center items-center"
                        : "grid grid-cols-10"
                    } m-5 p-2.5 bg-blue-lightt rounded-[8px]`}
                  >
                    {Path.root == true ? (
                      filesQuery.isLoading ? (
                        <Loading className="w-24 h-24 text-blacklead animate-pulse" />
                      ) : (
                        folders?.map((item) => (
                          <div
                            onClick={(e) => {
                              handleClick(item);
                            }}
                            className="col-span-2 cursor-pointer hover:scale-105 transition-all duration-200 flex justify-center items-center mr-2.5 ml-2.5 
              rounded-[8px] my-2.5 bg-white p-4"
                          >
                            {/* <Link to={`files/${item?.split("/")[1]}`}> */}
                            {/* <Link  to={{pathname:'files',search:`files:${item?.split('/')[1]}`}} > */}
                            <div className="relative flex justify-start items-center">
                              <img
                                src="/public/images/FolderProduct.svg"
                                alt="FolderProduct"
                              />
                              <lable className="absolute text-center w-full text-xl text-white">
                                {item?.split("/")[1]}
                              </lable>
                            </div>
                            {/* </Link> */}
                          </div>
                        ))
                      )
                    ) : filesQuery.isLoading ? (
                      <div className="w-full flex flex-row flex-shrink-0 justify-center items-center">
                        <Loading className="w-24 h-24 text-blacklead animate-pulse" />
                      </div>
                    ) : (
                      files?.map((item) => (
                        <div
                          className="col-span-2 cursor-pointer hover:scale-105 transition-all duration-200 flex justify-center items-center
                            rounded-[8px] m-2.5 bg-white py-10 px-4"
                          onClick={() => addSelectedMedia(item)}
                        >
                          {item.mime_type == "image/png" ? (
                            <div>
                              <img src={item?.file} alt="FolderProduct" />
                            </div>
                          ) : item.mime_type == "video/mp4" ? (
                            <div className="relative flex justify-center items-center">
                              <span className="absolute ">
                                <svg
                                  width="50"
                                  height="50"
                                  viewBox="0 0 50 50"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M24.9376 45.8346C36.4435 45.8346 45.7709 36.5072 45.7709 25.0013C45.7709 13.4954 36.4435 4.16797 24.9376 4.16797C13.4316 4.16797 4.10425 13.4954 4.10425 25.0013C4.10425 36.5072 13.4316 45.8346 24.9376 45.8346Z"
                                    fill="#F9FCFD"
                                  />
                                  <path
                                    opacity="0.9"
                                    d="M18.2083 25.4785V21.9993C18.2083 17.666 21.2708 15.8952 25.0208 18.0618L28.0416 19.8118L31.0624 21.5618C34.8124 23.7285 34.8124 27.2702 31.0624 29.4368L28.0416 31.1868L25.0208 32.9368C21.2708 35.1035 18.2083 33.3327 18.2083 28.9993V25.4785Z"
                                    stroke="#478F95"
                                    stroke-width="3"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </span>
                              <video src={item?.file} alt="FolderProduct" />
                            </div>
                          ) : (
                            <div>
                              <img src={item?.file} alt="FolderProduct" />
                            </div>
                          )}

                          {/* //force */}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default AddMediaCategory;
