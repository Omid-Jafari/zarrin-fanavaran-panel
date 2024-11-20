import React from "react";
import { Link } from "react-router-dom";
import { addBlogsStatus } from "../../constant/addBlogsStatus";
import Loading from "../elements/loading";

const AddBlogSidebar = (props) => {
  const { formik } = props;

  const submitForm = (status) => {
    formik.setFieldValue("status", status);
    formik.handleSubmit();
  };

  return (
    <div className="p-3 min-w-[190px] rounded-lg bg-[#DBEEF6]">
      <div className=" flex flex-col justify-start h-full items-center">
        <button
          onClick={() => {
            submitForm(addBlogsStatus.PUBLISHED);
          }}
          className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill=""
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.98999 22.7496C9.78999 22.7496 9.62999 22.7096 9.50999 22.6596C9.10999 22.5096 8.42999 22.0196 8.42999 20.4696V14.0196H6.08999C4.74999 14.0196 4.26999 13.3896 4.09999 13.0196C3.92999 12.6396 3.77999 11.8696 4.65999 10.8596L12.23 2.25964C13.25 1.09964 14.08 1.17964 14.48 1.32964C14.88 1.47964 15.56 1.96964 15.56 3.51964V9.96964H17.9C19.24 9.96964 19.72 10.5996 19.89 10.9696C20.06 11.3496 20.21 12.1196 19.33 13.1296L11.76 21.7296C11.05 22.5396 10.43 22.7496 9.98999 22.7496ZM13.93 2.73964C13.9 2.77964 13.69 2.87964 13.36 3.25964L5.78999 11.8596C5.50999 12.1796 5.46999 12.3796 5.46999 12.4196C5.48999 12.4296 5.66999 12.5296 6.08999 12.5296H9.17999C9.58999 12.5296 9.92999 12.8696 9.92999 13.2796V20.4796C9.92999 20.9796 10.02 21.1996 10.06 21.2596C10.09 21.2196 10.3 21.1196 10.63 20.7396L18.2 12.1396C18.48 11.8196 18.52 11.6196 18.52 11.5796C18.5 11.5696 18.32 11.4696 17.9 11.4696H14.81C14.4 11.4696 14.06 11.1296 14.06 10.7196V3.51964C14.07 3.01964 13.97 2.80964 13.93 2.73964Z"
              // fill="#C4C7C7"
            />
          </svg>
          <span className="">منتشر کردن</span>
        </button>
        <Link
          to="#"
          className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 16.3299C9.61001 16.3299 7.67001 14.3899 7.67001 11.9999C7.67001 9.60992 9.61001 7.66992 12 7.66992C14.39 7.66992 16.33 9.60992 16.33 11.9999C16.33 14.3899 14.39 16.3299 12 16.3299ZM12 9.16992C10.44 9.16992 9.17001 10.4399 9.17001 11.9999C9.17001 13.5599 10.44 14.8299 12 14.8299C13.56 14.8299 14.83 13.5599 14.83 11.9999C14.83 10.4399 13.56 9.16992 12 9.16992Z" />
            <path d="M12 21.0205C8.23999 21.0205 4.68999 18.8205 2.24999 15.0005C1.18999 13.3505 1.18999 10.6605 2.24999 9.00047C4.69999 5.18047 8.24999 2.98047 12 2.98047C15.75 2.98047 19.3 5.18047 21.74 9.00047C22.8 10.6505 22.8 13.3405 21.74 15.0005C19.3 18.8205 15.75 21.0205 12 21.0205ZM12 4.48047C8.76999 4.48047 5.67999 6.42047 3.51999 9.81047C2.76999 10.9805 2.76999 13.0205 3.51999 14.1905C5.67999 17.5805 8.76999 19.5205 12 19.5205C15.23 19.5205 18.32 17.5805 20.48 14.1905C21.23 13.0205 21.23 10.9805 20.48 9.81047C18.32 6.42047 15.23 4.48047 12 4.48047Z" />
          </svg>

          <span className=""> پیش نمایش</span>
        </Link>
        <button
          onClick={() => {
            submitForm(addBlogsStatus.PUBLISHING);
          }}
          className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
              fill="white"
            />
            <path
              d="M15.71 15.9317C15.58 15.9317 15.45 15.9017 15.33 15.8217L12.23 13.9717C11.46 13.5117 10.89 12.5017 10.89 11.6117V7.51172C10.89 7.10172 11.23 6.76172 11.64 6.76172C12.05 6.76172 12.39 7.10172 12.39 7.51172V11.6117C12.39 11.9717 12.69 12.5017 13 12.6817L16.1 14.5317C16.46 14.7417 16.57 15.2017 16.36 15.5617C16.21 15.8017 15.96 15.9317 15.71 15.9317Z"
              fill="white"
            />
          </svg>

          <span className="">زمان بندی</span>
        </button>
        <button
          onClick={() => {
            submitForm(addBlogsStatus.DRAFT);
          }}
          className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
        >
          {false ? (
            <div className="w-full flex justify-center">
              <Loading className="w-10 h-10 text-blacklead animate-pulse" />
            </div>
          ) : (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z" />
                <path d="M22 10.7505H18C14.58 10.7505 13.25 9.42048 13.25 6.00048V2.00048C13.25 1.70048 13.43 1.42048 13.71 1.31048C13.99 1.19048 14.31 1.26048 14.53 1.47048L22.53 9.47048C22.74 9.68048 22.81 10.0105 22.69 10.2905C22.57 10.5705 22.3 10.7505 22 10.7505ZM14.75 3.81048V6.00048C14.75 8.58048 15.42 9.25048 18 9.25048H20.19L14.75 3.81048Z" />
                <path d="M13 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H13C13.41 12.25 13.75 12.59 13.75 13C13.75 13.41 13.41 13.75 13 13.75Z" />
                <path d="M11 17.75H7C6.59 17.75 6.25 17.41 6.25 17C6.25 16.59 6.59 16.25 7 16.25H11C11.41 16.25 11.75 16.59 11.75 17C11.75 17.41 11.41 17.75 11 17.75Z" />
              </svg>

              <span className=""> انتقال به پیشنویس</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddBlogSidebar;
