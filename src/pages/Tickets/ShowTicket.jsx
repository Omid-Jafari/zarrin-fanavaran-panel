import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { answerTicket, closeTicket, getSingleTicket } from "../../api/ApiClient";
import ShowImageModal from "../../components/common/show-image-modal";
import Loading from "../../components/elements/loading";
import ShowTicketImageModal from "./ShowTicketImageModal";
import * as Yup from "yup";
import AddMediaCategory from "../../components/category/add-media-category";
import ConfirmCloseTicketModal from "../../components/tickets/ConfirmCloseTicketModal";

function ShowTicket() {
  const [item, setItem] = useState({});
  const [OpenForMainMedia, setOpenForMainMedia] = useState(false);
  const [showSelectedMedia, setShowSelectedMedia] = useState([]);
  const [open, setOpen] = useState(false);
  const showImageModalRef = useRef();
  const navigate = useNavigate();
  const param = useParams();
  const getSingleTicketMutation = useMutation((id) => getSingleTicket(id), {
    onSuccess: (res) => {
      setItem(res?.data?.data);
    },
  });

  const handleAnswerTicket = useMutation(
    (data) => answerTicket(param?.id, data),
    {
      onSuccess: (res) => {
        navigate("/tickets")
      },
    }
  );

  useEffect(() => {
    if (param?.id) getSingleTicketMutation.mutate(param?.id);
  }, []);

  const handleShowImage = (file, title) => {
    showImageModalRef.current.openModal(title, file);
  };

  const formik = useFormik({
    initialValues: {
      message: "",
      attachment_ids: [],
    },
    validationSchema: Yup.object({
      message: Yup.string().required("لطفا متن پیام را وارد کنید"),
    }),
    onSubmit: (data) => {
      console.log(data);
      handleAnswerTicket.mutate(data);
    },
  });

  const selectTicketMedia = (item) => {
    setShowSelectedMedia((prev) => [...prev, item?.file]);
    formik.values.attachment_ids.push(item.id);
  };
 const deleteMediaItem=(indexx)=>{
  setShowSelectedMedia(showSelectedMedia.filter((item,index)=>indexx!=index))
 }

 const handleCloseTicket=()=>{
  setOpen(true)
 }
  return (
    <>
    <ConfirmCloseTicketModal id={param?.id} open={open} setOpen={setOpen}/>
      <AddMediaCategory
        open={OpenForMainMedia}
        setOpen={setOpenForMainMedia}
        selectedItem={(e) => selectTicketMedia(e)}
      />
      {getSingleTicketMutation.isLoading ? (
        <div className="w-full h-full flex flex-row justify-center items-center">
          <Loading className="w-24 h-24 text-blacklead animate-pulse" />
        </div>
      ) : (
        <div className=" col-span-10 font-KalamehMed font-medium p-5">
          <ShowTicketImageModal ref={showImageModalRef} />
          <div className="flex  justify-between">
            <div className="flex justify-center items-center">
              <div className="px-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6901 22.75H7.31012C3.14012 22.75 1.87012 21.48 1.87012 17.31V16.85C1.87012 16.44 2.21012 16.1 2.62012 16.1C3.50012 16.1 4.22012 15.38 4.22012 14.5C4.22012 13.62 3.50012 12.9 2.62012 12.9C2.21012 12.9 1.87012 12.56 1.87012 12.15V11.69C1.87012 7.52 3.14012 6.25 7.31012 6.25H16.6901C20.8601 6.25 22.1301 7.52 22.1301 11.69V12.63C22.1301 13.04 21.7901 13.38 21.3801 13.38C20.5001 13.38 19.7801 14.1 19.7801 14.98C19.7801 15.86 20.5001 16.57 21.3801 16.57C21.7901 16.57 22.1301 16.91 22.1301 17.32C22.1201 21.48 20.8501 22.75 16.6901 22.75ZM3.38012 17.51C3.40012 20.69 4.03012 21.25 7.32012 21.25H16.7001C19.8201 21.25 20.5401 20.74 20.6301 17.97C19.2901 17.63 18.2901 16.42 18.2901 14.97C18.2901 13.52 19.2901 12.3 20.6401 11.96V11.68C20.6401 8.33 20.0501 7.74 16.7001 7.74H7.31012C4.03012 7.74 3.40012 8.31 3.37012 11.48C4.72012 11.82 5.72012 13.04 5.72012 14.49C5.72012 15.94 4.72012 17.17 3.38012 17.51Z"
                    fill="#222427"
                  />
                  <path
                    d="M10 10.25C9.59 10.25 9.25 9.91 9.25 9.5V7C9.25 6.59 9.59 6.25 10 6.25C10.41 6.25 10.75 6.59 10.75 7V9.5C10.75 9.91 10.41 10.25 10 10.25Z"
                    fill="#222427"
                  />
                  <path
                    d="M10 16.9198C9.59 16.9198 9.25 16.5798 9.25 16.1698V12.8398C9.25 12.4298 9.59 12.0898 10 12.0898C10.41 12.0898 10.75 12.4298 10.75 12.8398V16.1698C10.75 16.5798 10.41 16.9198 10 16.9198Z"
                    fill="#222427"
                  />
                  <path
                    d="M10 22.75C9.59 22.75 9.25 22.41 9.25 22V19.5C9.25 19.09 9.59 18.75 10 18.75C10.41 18.75 10.75 19.09 10.75 19.5V22C10.75 22.41 10.41 22.75 10 22.75Z"
                    fill="#222427"
                  />
                  <path
                    d="M16.3299 7.75063H7.23993C6.93993 7.75063 6.65993 7.57063 6.54993 7.29063C6.43993 7.01062 6.49993 6.68062 6.70993 6.47062L9.63993 3.54063C12.3399 0.840625 13.9899 0.840625 16.6799 3.54063L17.2799 4.14062C17.4199 4.28063 17.4999 4.47063 17.4999 4.67063C17.4999 4.87063 17.4199 5.06062 17.2799 5.20062C16.8799 5.60063 16.7699 6.19063 16.9999 6.70062C17.1099 6.93062 17.0899 7.20063 16.9499 7.42063C16.8199 7.62063 16.5799 7.75063 16.3299 7.75063ZM9.04993 6.25063H15.3799C15.3599 5.72062 15.4899 5.19063 15.7599 4.73063L15.6299 4.60063C13.5399 2.51063 12.7999 2.51063 10.7099 4.60063L9.04993 6.25063Z"
                    fill="#222427"
                  />
                </svg>
              </div>

              <span className="text-lg">تیکت</span>
            </div>
            <div className="flex flex-row space-x-3 space-x-reverse">
              <button
                onClick={() => navigate(-1)}
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

                <p className="text-[16px] text-[#222427] mr-1">برگشت</p>
              </button>
            </div>
          </div>

          <div className="w-full mt-4 rounded-lg p-5 flex flex-col bg-[#DBEEF6]">
            <div className="w-full flex flex-row gap-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_i_2105_52332)">
                  <circle cx="9" cy="9" r="9" fill="#21ED00" />
                </g>
                <defs>
                  <filter
                    id="filter0_i_2105_52332"
                    x="0"
                    y="0"
                    width="18"
                    height="18"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.63 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_2105_52332"
                    />
                  </filter>
                </defs>
              </svg>
              <p className="font-KalamehMed text-sm font-medium">
                {item?.user?.full_name}
              </p>
            </div>
            {/* section 1 */}
            <div className="w-full mt-4 flex flex-row justify-between items-center">
              <div>
                <p className="font-KalamehMed text-sm font-medium">
                  {item?.subject}
                </p>
              </div>
              <div className="flex flex-row gap-3">
                <button className="rounded bg-white py-3 px-5 max-w-[120px] flex-nowrap flex flex-row justify-center items-center">
                  <p
                    className="font-Kalameh text-sm ] font-medium "
                    // style={{color:item?.status_info?.color}}
                  >
                    {item?.status_info?.name}
                  </p>
                </button>
                <button className="rounded max-w-[120px] flex-nowrap bg-white py-3 px-8 flex flex-row justify-center items-center">
                  <p className="font-Kalameh whitespace-nowrap text-sm text-[#FF7A00] font-medium">
                    {item?.department?.name}
                  </p>
                </button>
              </div>
            </div>
            {/* section2 */}
            {item?.items?.map((itemm) => (
              <div className="w-full mt-4 flex flex-col ">
                <div className="w-full flex flex-row justify-between  mt-4">
                  <p className="font-KalamehMed text-sm font-medium">
                    {itemm?.creator?.type == "user" ? (
                      " پاسخ کاربر"
                    ) : (
                      <span>پاسخ ادمین : {itemm?.creator?.name}</span>
                    )}
                  </p>
                  <div className=" flex flex-row gap-4 items-center justify-center">
                    <p className="font-Kalameh text-sm text-[#222427] font-medium">
                      {itemm?.created_at_for_humans}
                    </p>{" "}
                    <p className="font-Kalameh text-sm text-[#222427] font-medium">
                      {itemm?.created_at.slice(10)}
                    </p>
                  </div>
                </div>
                <div className="w-full p-2 mt-4 mx-auto bg-[#EFF1F1] rounded-md">
                  {itemm?.message}
                </div>

                <div className="w-full flex flex-row items-center justify-start gap-3 mt-4">
                  {itemm?.media?.attachment?.map((mediaa) => (
                    <div
                      key={mediaa?.id}
                      // onClick={() => openDeletedMediaModal(img?.id)}
                      className=" border-2 p-1 border-primary rounded-md overflow-hidden relative cursor-pointer"
                    >
                   

                      <img
                        onClick={() =>
                          handleShowImage(mediaa?.file, mediaa?.name)
                        }
                        src={mediaa?.file}
                        className="max-h-[70px] w-[70px] object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="w-full h-[8px] rounded-md bg-white mt-4"></div>
            {/* section 3 */}

            {/* send data */}
            <div>
              {/* add image */}
              <div className="w-full bg-white rounded-lg p-2 flex flex-row gap-3 items-center justify-start">
                {
                  showSelectedMedia?.map((item,index)=>
                    <div
                   
                      // onClick={() => openDeletedMediaModal(img?.id)}
                      className=" border-2 w-[70px] h-full border-primary rounded-md overflow-hidden relative cursor-pointer"
                    >
                      <svg
                      onClick={()=>deleteMediaItem(index)}
                        className="absolute top-0 left-0 cursor-pointer z-10"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 0H18V12C18 15.3137 15.3137 18 12 18H0V0Z"
                          fill="#EA3838"
                        />
                        <rect
                          x="4"
                          y="8"
                          width="10"
                          height="2"
                          rx="1"
                          fill="white"
                        />
                      </svg>

                      <img
                        onClick={() =>
                          handleShowImage(item, "img")
                        }
                        src={item}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                }
                <div className="h-[70px] w-[70px] border border-black border-dashed flex flex-row justify-center items-center p-4 rounded-lg cursor-pointer"
                onClick={()=>setOpenForMainMedia(true)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 0H24V18C24 21.3137 21.3137 24 18 24H0V0Z"
                      fill="#F9FCFD"
                    />
                    <path
                      d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                      fill="#222427"
                    />
                    <path
                      d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                      fill="#222427"
                    />
                  </svg>
                </div>
              </div>

              <textarea
                className={` border border-primary rounded-lg w-full mt-4 font-Kalameh text-[14px] p-3 text-[#222427]  placeholder:`}
                rows={4}
                name="message"
                onChange={formik.handleChange}
                value={formik.values?.message}
              ></textarea>
              <p className="font-Kalameh text-[12px] text-red-500">{formik.errors.message&&formik.errors.message}</p>
            </div>
            <div className="flex flex-row w-full gap-3 mt-4">
              <button
                className="font-Kalameh w-5/6 flex flex-row gap-2 items-center justify-center  text-[12px] h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-6 text-white rounded-[4px]"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                {
                  handleAnswerTicket.isLoading?     <Loading className="w-12 h-12 text-blacklead animate-pulse" />
                  :" ارسال پیام"
                }
               
              </button>

              <button
                className="font-Kalameh w-1/6 flex flex-row gap-2 items-center justify-center  text-[12px] h-11 bg-[#CA3636]  transition-colors duration-500 px-6 text-white rounded-[4px]"
                onClick={() => 
                  handleCloseTicket()
                }
              >
                
                   بستن تیکت
                
              
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowTicket;
