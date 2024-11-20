import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import SingleAnswersModal from "./SingleAnswersModal";
function AnswersItem({ comment }) {
  const SingleQuestionModalRef = useRef();

  const handleOpenCommentModal = (id,comment) => {
    SingleQuestionModalRef.current.openModal(id,comment);
  };
  return (
    <div className="w-full bg-[#DBEEF6] flex flex-row h-[130px] rounded-[8px] my-3">
      <SingleAnswersModal ref={SingleQuestionModalRef} />
      <div className="h-full w-[44px] rounded-r-[8px] bg-primary flex flex-row justify-center items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 22.3194C7.72 22.3194 7.42998 22.2494 7.16998 22.1094C6.59998 21.8094 6.25 21.2094 6.25 20.5694V19.1495C3.23 18.8395 1.25 16.6194 1.25 13.4394V7.43945C1.25 3.99945 3.56 1.68945 7 1.68945H17C20.44 1.68945 22.75 3.99945 22.75 7.43945V13.4394C22.75 16.8794 20.44 19.1894 17 19.1894H13.23L8.96997 22.0295C8.67997 22.2195 8.34 22.3194 8 22.3194ZM7 3.17944C4.42 3.17944 2.75 4.84944 2.75 7.42944V13.4295C2.75 16.0095 4.42 17.6795 7 17.6795C7.41 17.6795 7.75 18.0195 7.75 18.4295V20.5595C7.75 20.6895 7.83 20.7495 7.88 20.7795C7.93001 20.8095 8.03001 20.8395 8.14001 20.7695L12.59 17.8095C12.71 17.7295 12.86 17.6795 13.01 17.6795H17.01C19.59 17.6795 21.26 16.0095 21.26 13.4295V7.42944C21.26 4.84944 19.59 3.17944 17.01 3.17944H7Z"
            fill="white"
          />
          <path
            d="M11.9998 12.1094C11.5898 12.1094 11.2498 11.7694 11.2498 11.3594V11.1494C11.2498 9.98941 12.0998 9.4194 12.4198 9.1994C12.7898 8.9494 12.9098 8.77941 12.9098 8.51941C12.9098 8.01941 12.4998 7.60938 11.9998 7.60938C11.4998 7.60938 11.0898 8.01941 11.0898 8.51941C11.0898 8.92941 10.7498 9.26941 10.3398 9.26941C9.92984 9.26941 9.58984 8.92941 9.58984 8.51941C9.58984 7.18941 10.6698 6.10938 11.9998 6.10938C13.3298 6.10938 14.4098 7.18941 14.4098 8.51941C14.4098 9.65941 13.5698 10.2294 13.2598 10.4394C12.8698 10.6994 12.7498 10.8694 12.7498 11.1494V11.3594C12.7498 11.7794 12.4098 12.1094 11.9998 12.1094Z"
            fill="white"
          />
          <path
            d="M12 14.5996C11.58 14.5996 11.25 14.2596 11.25 13.8496C11.25 13.4396 11.59 13.0996 12 13.0996C12.41 13.0996 12.75 13.4396 12.75 13.8496C12.75 14.2596 12.42 14.5996 12 14.5996Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="w-3/6 px-6 py-3 flex flex-col">
        <p className="text-[12px] text-black font-bold"> {comment?.title}</p>

        <div className="w-full flex flex-row gap-6 mt-3">
          <div className="flex flex-row gap-1 flex-nowrap">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.11971 8.715C9.09721 8.715 9.08221 8.715 9.05971 8.715C9.02221 8.7075 8.96971 8.7075 8.92471 8.715C6.74971 8.6475 5.10721 6.9375 5.10721 4.83C5.10721 2.685 6.85471 0.9375 8.99971 0.9375C11.1447 0.9375 12.8922 2.685 12.8922 4.83C12.8847 6.9375 11.2347 8.6475 9.14221 8.715C9.13471 8.715 9.12721 8.715 9.11971 8.715ZM8.99971 2.0625C7.47721 2.0625 6.23221 3.3075 6.23221 4.83C6.23221 6.33 7.40221 7.5375 8.89471 7.59C8.93221 7.5825 9.03721 7.5825 9.13471 7.59C10.6047 7.5225 11.7597 6.315 11.7672 4.83C11.7672 3.3075 10.5222 2.0625 8.99971 2.0625Z"
                fill="#222427"
              />
              <path
                d="M9.12721 16.9125C7.65721 16.9125 6.17971 16.5375 5.06221 15.7875C4.01971 15.0975 3.44971 14.1525 3.44971 13.125C3.44971 12.0975 4.01971 11.145 5.06221 10.4475C7.31221 8.955 10.9572 8.955 13.1922 10.4475C14.2272 11.1375 14.8047 12.0825 14.8047 13.11C14.8047 14.1375 14.2347 15.09 13.1922 15.7875C12.0672 16.5375 10.5972 16.9125 9.12721 16.9125ZM5.68471 11.3925C4.96471 11.8725 4.57471 12.4875 4.57471 13.1325C4.57471 13.77 4.97221 14.385 5.68471 14.8575C7.55221 16.11 10.7022 16.11 12.5697 14.8575C13.2897 14.3775 13.6797 13.7625 13.6797 13.1175C13.6797 12.48 13.2822 11.865 12.5697 11.3925C10.7022 10.1475 7.55221 10.1475 5.68471 11.3925Z"
                fill="#222427"
              />
            </svg>

            <p className="text-[12px] text-black font-bold whitespace-nowrap">
              {" "}
              {comment?.user?.first_name}
            </p>
          </div>
          <p className="text-[14px] text-[#222427] leading-[18px] font-[300] line-clamp-2">
            {" "}
            {comment?.body}
          </p>
        </div>
        <div className="w-full flex flex-row justify-between mt-4 items-center">
          <div className="flex flex-row gap-2">
            <p className="text-[12px] text-[#4FB3BF]">
              {comment?.created_at_for_humans}
            </p>
            {/* <p className="text-[12px] text-[#4FB3BF]">امروز</p> */}
          </div>

          <div className="flex flex-row gap-2 i items-start">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6.75V10.5"
                stroke="#FF6B00"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 16.0584H4.455C1.8525 16.0584 0.764995 14.1984 2.025 11.9259L4.365 7.71094L6.57 3.75094C7.905 1.34344 10.095 1.34344 11.43 3.75094L13.635 7.71844L15.975 11.9334C17.235 14.2059 16.14 16.0659 13.545 16.0659H9V16.0584Z"
                stroke="#FF6B00"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.99588 12.75H9.00262"
                stroke="#FF6B00"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <p className="text-[12px] text-[#FF6B00] mt-1">(5)</p>
          </div>
        </div>
      </div>
      <div className="w-3/6 px-6 py-3 flex flex-row gap-8 justify-between items-center">
        <div className="w-full">
          <button className="w-full  font-KalamehMed justify-center font-medium text-sm h-11 bg-[#4FB3BF] hover:bg-[#478F95] transition-colors duration-500 px-8 text-[#545456] rounded-[4px] flex flex-row-reverse items-center gap-1"></button>
        </div>
        <button
          className="w-full justify-center font-Kalameh text-sm h-11  hover:bg-[#478F95] transition-colors duration-500 px-8 text-[#fff] rounded-[4px] flex items-center gap-1"
          style={{ backgroundColor: comment?.status_info?.color }}
        >
          {comment?.status_info?.name}
        </button>{" "}
        <button
          className="w-full text-[13px]  justify-center  font-Kalameh font-medium text-sm h-11 bg-[#00838F] hover:bg-[#478F95] transition-colors duration-500 px-8 text-white    rounded-[4px] flex items-center gap-1"
          onClick={() => handleOpenCommentModal(comment?.id,comment)}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 16.3299C10.11 16.3299 8.16998 14.3899 8.16998 11.9999C8.16998 9.60992 10.11 7.66992 12.5 7.66992C14.89 7.66992 16.83 9.60992 16.83 11.9999C16.83 14.3899 14.89 16.3299 12.5 16.3299ZM12.5 9.16992C10.94 9.16992 9.66998 10.4399 9.66998 11.9999C9.66998 13.5599 10.94 14.8299 12.5 14.8299C14.06 14.8299 15.33 13.5599 15.33 11.9999C15.33 10.4399 14.06 9.16992 12.5 9.16992Z"
              fill="white"
            />
            <path
              d="M12.5 21.0205C8.74002 21.0205 5.19002 18.8205 2.75002 15.0005C1.69002 13.3505 1.69002 10.6605 2.75002 9.00047C5.20002 5.18047 8.75002 2.98047 12.5 2.98047C16.25 2.98047 19.8 5.18047 22.24 9.00047C23.3 10.6505 23.3 13.3405 22.24 15.0005C19.8 18.8205 16.25 21.0205 12.5 21.0205ZM12.5 4.48047C9.27002 4.48047 6.18002 6.42047 4.02002 9.81047C3.27002 10.9805 3.27002 13.0205 4.02002 14.1905C6.18002 17.5805 9.27002 19.5205 12.5 19.5205C15.73 19.5205 18.82 17.5805 20.98 14.1905C21.73 13.0205 21.73 10.9805 20.98 9.81047C18.82 6.42047 15.73 4.48047 12.5 4.48047Z"
              fill="white"
            />
          </svg>
          مشاهده
        </button>
      </div>
    </div>
  );
}

export default AnswersItem;
