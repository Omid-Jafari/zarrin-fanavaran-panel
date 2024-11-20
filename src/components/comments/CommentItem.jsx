import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import CommentSingle from "../users/singleUserSections/commentSingle";
import CommentsRates from "./CommentsRates";
import ShowSingleCommentModal from "./ShowSingleCommentModal";
function CommentItem({ comment }) {
  const singleCommentModalRef = useRef();

  const handleOpenCommentModal = (id) => {
    singleCommentModalRef.current.openModal(id);
  };
  return (
    <div className="w-full bg-[#DBEEF6] flex flex-row h-[130px] rounded-[8px] my-3">
      {/* <ShowSingleCommentModal ref={singleCommentModalRef} /> */}
      <CommentSingle ref={singleCommentModalRef} />
      <div className="h-full w-[44px] rounded-r-[8px] bg-primary flex flex-row justify-center items-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9 19.0098C16.59 19.0098 16.28 18.9197 16.01 18.7397L15.05 18.1097C14.78 17.9297 14.65 17.5898 14.74 17.2798C14.81 17.0498 14.84 16.7797 14.84 16.4797V12.4097C14.84 10.7797 13.82 9.75977 12.19 9.75977H5.39999C5.27999 9.75977 5.17 9.76979 5.06 9.77979C4.85 9.78979 4.65001 9.71977 4.49001 9.57977C4.33001 9.43977 4.25 9.23979 4.25 9.02979V6.25977C4.25 3.31977 6.31 1.25977 9.25 1.25977H17.75C20.69 1.25977 22.75 3.31977 22.75 6.25977V11.3597C22.75 12.8097 22.26 14.0897 21.36 14.9697C20.64 15.6997 19.64 16.1698 18.5 16.3098V17.4197C18.5 18.0197 18.17 18.5598 17.65 18.8398C17.41 18.9498 17.15 19.0098 16.9 19.0098ZM16.3 17.1298L16.95 17.4998C17.01 17.4698 17.01 17.4197 17.01 17.4097V15.5997C17.01 15.1897 17.35 14.8497 17.76 14.8497C18.81 14.8497 19.7 14.5198 20.31 13.8998C20.94 13.2798 21.26 12.3997 21.26 11.3497V6.24976C21.26 4.11976 19.89 2.74976 17.76 2.74976H9.25999C7.12999 2.74976 5.75999 4.11976 5.75999 6.24976V8.24976H12.2C14.64 8.24976 16.35 9.95978 16.35 12.3998V16.4697C16.34 16.6997 16.33 16.9198 16.3 17.1298Z" fill="white"/>
<path d="M6.07001 22.75C5.85001 22.75 5.62 22.7 5.41 22.59C4.94 22.34 4.64999 21.86 4.64999 21.32V20.56C3.76999 20.42 2.99 20.05 2.41 19.47C1.65 18.71 1.25 17.67 1.25 16.47V12.4C1.25 10.14 2.72999 8.48002 4.92999 8.27002C5.08999 8.26002 5.23999 8.25 5.39999 8.25H12.19C14.63 8.25 16.34 9.96002 16.34 12.4V16.47C16.34 16.91 16.29 17.32 16.18 17.69C15.73 19.49 14.2 20.62 12.19 20.62H9.7L6.87 22.5C6.63 22.67 6.35001 22.75 6.07001 22.75ZM5.39999 9.75C5.27999 9.75 5.17 9.76002 5.06 9.77002C3.62 9.90002 2.75 10.89 2.75 12.4V16.47C2.75 17.27 3 17.94 3.47 18.41C3.93 18.87 4.59999 19.12 5.39999 19.12C5.80999 19.12 6.14999 19.46 6.14999 19.87V21.18L9.05 19.25C9.17 19.17 9.32 19.12 9.47 19.12H12.19C13.51 19.12 14.44 18.46 14.73 17.3C14.8 17.05 14.84 16.77 14.84 16.47V12.4C14.84 10.77 13.82 9.75 12.19 9.75H5.39999Z" fill="white"/>
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
        <CommentsRates rate={comment?.rate} />
        <button className="w-full justify-center font-Kalameh text-sm h-11  hover:bg-[#478F95] transition-colors duration-500 px-8 text-[#fff] rounded-[4px] flex items-center gap-1"
        style={{backgroundColor:comment?.status_info?.color}}>
          {comment?.status_info?.name}
        </button>{" "}
        <button
          className="w-full text-[13px]  justify-center  font-Kalameh font-medium text-sm h-11 bg-[#00838F] hover:bg-[#478F95] transition-colors duration-500 px-8 text-white    rounded-[4px] flex items-center gap-1"
          onClick={() => handleOpenCommentModal(comment?.id)}
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

export default CommentItem;
