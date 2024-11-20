import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FileUploader } from "react-drag-drop-files";
import ShowImageModal from "../common/show-image-modal";
import Progress from "../common/progress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFiles } from "../../api/ApiClient";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function UploadImageModal({ path, onUpload }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState([]);
  const [dragZone, setdragZone] = useState(false);
  const [deletePic, setdeletePic] = useState(false);
  const [UploadProgress, setUploadProgress] = useState(false);
  const [persent, setpersent] = useState(0);


  console.log("Dvbsdbsd", path.path);
  const handleChange = (filee) => {
    let data = [];
    // setFile(file);
    // Object.entries(filee).map(ii=>file?.push(ii[1]))
    Object.entries(filee).map((ii) => data.push(ii[1]));
    // Object.entries(filee).map(ii=>console.log("abxaddsbasb",ii[1]))

    setFile(data);
  };

  const handleDelete = (fileindex) => {
    setFile(file.filter((item,indexx)=>indexx!=fileindex))
    // setdeletePic(true);
    console.log("sdvbsdasassd",fileindex);
  };
  const handleUploadButton = () => {
    setFile([]);
    setdeletePic(false);
  };
  const uploadFile = () => {
    handleCreateFile();
    setUploadProgress(true);
  };
const progressEvent=(event)=>{
  console.log("dsvdsvsdvsdvdsvds",event);
  const percentage = Math.round((100 * event.loaded) / event.total);
  console.log("dsvdsvsdvsdvdsvds",percentage);
  setpersent(percentage)
}
  const query = useQueryClient();
  const addFileMutation = useMutation((data) => addFiles(data,progressEvent), {
    onSuccess: (res) => {
      query.invalidateQueries("filesQuerysub");
      setUploadProgress(false);
      onUpload();
    },
    onError: () => {
      setUploadProgress(false);
    },
  });
  const handleCreateFile = async() => {
    const fileFormData = new FormData();

    file?.map(async(item) => {
      fileFormData.append("file", item);
      fileFormData.append("path", path?.path);
     await addFileMutation.mutateAsync(fileFormData);
      console.log("dsbsdbsdbsdbsdbsdbsdb");
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setFile([]);
  };

  return (
    <>
      <div>
        <button
          onClick={() => setOpen(true)}
          className="flex flex-row justify-between bg-primary 
                      text-white rounded-[4px] p-[10px] "
        >
          <span className="mx-2 cursor-pointer hover:scale-105">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"
                fill="white"
              />
              <path
                d="M12 16.75C11.59 16.75 11.25 16.41 11.25 16V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V16C12.75 16.41 12.41 16.75 12 16.75Z"
                fill="white"
              />
              <path
                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                fill="white"
              />
            </svg>
          </span>
          <p className="text-[16px] ">افزودن مدیا</p>
        </button>
      </div>

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
                rounded-[8px] bg-white text-left shadow-xl transition-all sm:my-8"
                >
                  <div className="w-full bg-cyann flex flex-row p-3 justify-between">
                    <span className="text-white font-KalamehMed font-medium">
                      بازگذاری عکس و ویدئو
                    </span>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleCancel()}
                    >
                      <svg
                        width="24"
                        height="24"
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
                  </div>
                  {UploadProgress ? (
                    <div
                      className="w-[520px] h-[189px] m-5 border-[2px] ju border-dashed rounded-[8px] flex flex-col border-primary transition-all ease-in
                  duration-75  p-3 items-center justify-center"
                    >
                      <Progress persent={persent} setpersent={setpersent} />
                    </div>
                  ) : file.length!=0 ? (
                    <div
                      className={`w-[520px] h-[189px] m-5 border-[2px] ju border-dashed rounded-[8px] flex flex-col border-primary transition-all ease-in
                        duration-75 items-center justify-between p-3 scale-105`}
                    >
                    <div className="overflow-scroll hide-scrollbar">
                    {file?.map((filee,index) => (
                        <div className="w-full flex flex-row items-center flex-wrap my-1">
                          <span className="text-[16px] font-bold mx-2">
                            تصویر کاور:
                          </span>

                          {deletePic ? (
                            <button
                              onClick={() => handleUploadButton()}
                              className="flex flex-row justify-between bg-primary 
                      text-white rounded-[4px] p-[10px] "
                            >
                              <span
                                className="mx-2 cursor-pointer hover:scale-105"
                                onClick={() => handleDelete(index)}
                              >
                                <img src="/images/icons/media/button-icon.svg" />
                              </span>
                              <p className="text-[16px] ">آپلود تصویر</p>
                            </button>
                          ) : (
                            <>
                              <>
                                <span className="text-[16px] font-bold mx-2">
                                  {filee?.name}
                                </span>
                                <ShowImageModal
                                  title={filee?.name}
                                  img={URL.createObjectURL(filee)}
                                />
                                <span
                                  className="mx-2 cursor-pointer hover:scale-105"
                                  onClick={() => handleDelete(index)}
                                >
                                  <img src="/images/icons/media/delete-icon.svg" />
                                </span>
                              </>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                      <div className="flex flex-row-reverse w-full justify-between">
                        {" "}
                        <button
                          onClick={() => uploadFile()}
                          className="flex flex-row justify-between bg-primary 
                      text-white rounded-[4px] p-[10px] "
                        >
                          <span className="mx-2 cursor-pointer hover:scale-105">
                            <img src="/images/icons/media/button-icon.svg" />
                          </span>
                          <p className="text-[16px] ">آپلود تصویر</p>
                        </button>
                        <button
                          onClick={() => handleUploadButton()}
                          className="flex flex-row  bg-[#EFF1F1]
                          w-[120px] h-[44px]
                      text-white rounded-[4px] p-[10px] items-center justify-center"
                        >
                          <span
                            className="mx-2 cursor-pointer hover:scale-105"
                            onClick={() => setFile([])}
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
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white m-5  cursor-pointer  relative">
                      <FileUploader
                        handleChange={handleChange}
                        name="file"
                        onDraggingStateChange={(e) => setdragZone(e)}
                        hoverTitle={" "}
                        multiple={true}
                        types={[
                          "JPG",
                          "PNG",
                          "GIF",
                          "jpeg",
                          "gif",
                          "svg",
                          "pdf",
                          "mpeg",
                          "csv",
                          "doc",
                          "docx",
                        ]}
                        children={
                          <div>
                            <p>
                              <div
                                className={`cursor-pointer w-[520px] h-[189px] border-[2px] border-dashed rounded-[8px] flex flex-col border-primary transition-all ease-in
                        duration-75 items-center justify-center scale-105`}
                              >
                                <img
                                  className={`w-[48px] h-[48px]  ${
                                    dragZone ? "scale-125" : ""
                                  }   transition-all duration-75 `}
                                  src="/images/input-zone.svg"
                                />
                                <p className="text-lg text-[#222427] font-KalamehMed font-medium">
                                  انتخاب یک رسانه از رایانه
                                </p>
                                <p className="text-[12px] text-[#8E9191] font-Kalameh  mt-2 ">
                                  یا رسانه را بکشید و اینجا رها کنید{" "}
                                </p>
                              </div>
                            </p>
                          </div>
                        }
                      />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
