import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { getQuestions } from "../../api/ApiClient";
import CommentItem from "../../components/comments/CommentItem";
import StatusFilter from "../../components/comments/StatusFilter";
import Loading from "../../components/elements/loading";
import UserContext from "../../context/UserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate,useLocation } from "react-router-dom";
import { useRef } from "react";
import QuestionItem from "../../components/comments/QuestionItem";

let page = 1;
function Question() {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const navigate=useNavigate()
  const location=useLocation()
  const ref=useRef()
  const getCommentsQuery = useMutation((data) => getQuestions(data), {
    onSuccess: (res) => {
      setComments((prev) => [...prev, ...res?.data?.data]);
      page = res?.data?.meta?.current_page;
    },
  });
  useEffect(() => {
    getCommentsQuery.mutate({
      user_id: user?.user?.id,
      status: "PENDING",
      page: 1,
    });
  }, []);

  const getNextPage = () => {
    page = page + 1;
    getCommentsQuery.mutate({
      user_id: user?.user?.id,
      status: JSON.parse(localStorage.getItem("questionStatus")).status,
      page: page,
    });
  };

  const handleChangeTab=(route)=>{
    navigate(route)
  }

  const handleOpenSingleModal=()=>{
    SingleQuestionModalRef.current.setOpen(id)
  }
  return (
    <div className="w-full p-5">

      <div className="w-full flex items-center justify-between">
        <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.9 19.0098C16.59 19.0098 16.28 18.9197 16.01 18.7397L15.05 18.1097C14.78 17.9297 14.65 17.5898 14.74 17.2798C14.81 17.0498 14.84 16.7797 14.84 16.4797V12.4097C14.84 10.7797 13.82 9.75977 12.19 9.75977H5.39999C5.27999 9.75977 5.17 9.76978 5.06 9.77979C4.85 9.78979 4.65001 9.71977 4.49001 9.57977C4.33001 9.43977 4.25 9.23979 4.25 9.02979V6.25977C4.25 3.31977 6.31 1.25977 9.25 1.25977H17.75C20.69 1.25977 22.75 3.31977 22.75 6.25977V11.3597C22.75 12.8097 22.26 14.0897 21.36 14.9697C20.64 15.6997 19.64 16.1698 18.5 16.3098V17.4197C18.5 18.0197 18.17 18.5598 17.65 18.8398C17.41 18.9498 17.15 19.0098 16.9 19.0098ZM16.3 17.1298L16.95 17.4998C17.01 17.4698 17.01 17.4197 17.01 17.4097V15.5997C17.01 15.1897 17.35 14.8497 17.76 14.8497C18.81 14.8497 19.7 14.5198 20.31 13.8998C20.94 13.2798 21.26 12.3997 21.26 11.3497V6.24976C21.26 4.11976 19.89 2.74976 17.76 2.74976H9.25999C7.12999 2.74976 5.75999 4.11976 5.75999 6.24976V8.24976H12.2C14.64 8.24976 16.35 9.95978 16.35 12.3998V16.4697C16.34 16.6997 16.33 16.9198 16.3 17.1298Z"
              fill="#222427"
            />
            <path
              d="M6.07001 22.75C5.85001 22.75 5.62 22.7 5.41 22.59C4.94 22.34 4.64999 21.86 4.64999 21.32V20.56C3.76999 20.42 2.99 20.05 2.41 19.47C1.65 18.71 1.25 17.67 1.25 16.47V12.4C1.25 10.14 2.72999 8.48002 4.92999 8.27002C5.08999 8.26002 5.23999 8.25 5.39999 8.25H12.19C14.63 8.25 16.34 9.96002 16.34 12.4V16.47C16.34 16.91 16.29 17.32 16.18 17.69C15.73 19.49 14.2 20.62 12.19 20.62H9.7L6.87 22.5C6.63 22.67 6.35001 22.75 6.07001 22.75ZM5.39999 9.75C5.27999 9.75 5.17 9.76002 5.06 9.77002C3.62 9.90002 2.75 10.89 2.75 12.4V16.47C2.75 17.27 3 17.94 3.47 18.41C3.93 18.87 4.59999 19.12 5.39999 19.12C5.80999 19.12 6.14999 19.46 6.14999 19.87V21.18L9.05 19.25C9.17 19.17 9.32 19.12 9.47 19.12H12.19C13.51 19.12 14.44 18.46 14.73 17.3C14.8 17.05 14.84 16.77 14.84 16.47V12.4C14.84 10.77 13.82 9.75 12.19 9.75H5.39999Z"
              fill="#222427"
            />
          </svg>
          دیدگاه ها و پرسش و پاسخ
        </h5>
      </div>
      <div className="w-full h-full mt-6 relative ">
        <div className="w-full bg-[#DBEEF6] rounded-lg p-4 flex flex-row justify-between">
          <div className="flex flex-row gap-5">
            <button className={`font-KalamehMed font-medium text-sm h-11 ${location?.pathname=="/comments"?"bg-[#478F95] text-white":"bg-white text-[545456]"}  hover:bg-[#00838F] transition-colors duration-500 px-8  rounded-[4px] flex items-center gap-1`}
             onClick={()=>handleChangeTab("/comments")}
            >
              دیدگاه ها
            </button>{" "}
            <button className={`font-KalamehMed font-medium text-sm h-11 ${location?.pathname=="/comments/questions"?"bg-[#478F95] text-white":"bg-white text-[545456]"}  hover:bg-[#478F95] transition-colors duration-500 px-8  rounded-[4px] flex items-center gap-1`}
            onClick={()=>handleChangeTab("/comments/questions")}
            >
            پرسش ها 
            </button>

            <button className={`font-KalamehMed font-medium text-sm h-11 ${location?.pathname=="/comments/answers"?"bg-[#478F95] text-white":"bg-white text-[545456]"}  hover:bg-[#478F95] transition-colors duration-500 px-8  rounded-[4px] flex items-center gap-1`}
            onClick={()=>handleChangeTab("/comments/answers")}
            >
            پاسخ ها
            </button>
          </div>
          <div className="flex flex-row  ">
            <div className="flex flex-row gap-3  bg-white p-2 rounded-r-[8px] items-center justify-center ">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8.75C16.93 8.75 15.25 7.07 15.25 5C15.25 2.93 16.93 1.25 19 1.25C21.07 1.25 22.75 2.93 22.75 5C22.75 7.07 21.07 8.75 19 8.75ZM19 2.75C17.76 2.75 16.75 3.76 16.75 5C16.75 6.24 17.76 7.25 19 7.25C20.24 7.25 21.25 6.24 21.25 5C21.25 3.76 20.24 2.75 19 2.75Z"
                  fill="#00838F"
                />
                <path
                  d="M12 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H12C12.41 12.25 12.75 12.59 12.75 13C12.75 13.41 12.41 13.75 12 13.75Z"
                  fill="#00838F"
                />
                <path
                  d="M16 17.75H7C6.59 17.75 6.25 17.41 6.25 17C6.25 16.59 6.59 16.25 7 16.25H16C16.41 16.25 16.75 16.59 16.75 17C16.75 17.41 16.41 17.75 16 17.75Z"
                  fill="#00838F"
                />
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z"
                  fill="#00838F"
                />
              </svg>
              <p className="text-primary font-Kalameh text-[16px]">
                بر اساس وضعیت:
              </p>
            </div>
            <StatusFilter
              getCommentsQuery={getCommentsQuery}
              setComments={setComments}
              type={"question"}
            />
          </div>
        </div>
        <div className="w-full mt-5">
          <InfiniteScroll
            dataLength={comments.length} //This is important field to render the next data
            next={() => getNextPage()}
            hasMore={
              getCommentsQuery?.data?.data?.meta?.last_page <=
              getCommentsQuery?.data?.data?.meta?.current_page
                ? false
                : true
            }
            // hasMore={true}
            loader={
              <div className="w-full flex flex-row justify-center items-center">
                <Loading className="w-24 h-24 text-blacklead animate-pulse" />
              </div>
            }
          >
            {comments?.map((item) => (
              <QuestionItem comment={item} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Question;
