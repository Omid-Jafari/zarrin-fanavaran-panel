import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { commentStatus } from "../../constant/CommentsStatus";
import UserContext from "../../context/UserContext";
import { useOnClickOutside } from "../../utils/OutSideClick";

const statusItem = [
  {
    id: 1,
    title: "  در انتظار تایید",
    status: commentStatus.PENDING,
  },
  {
    id: 2,
    title: "منتشر شده",
    status: commentStatus.APPROVED,
  },
  {
    id: 1,
    title: "    رد شده",
    status: commentStatus.REJECTED,
  },
];  
function StatusFilter({ getCommentsQuery,setComments,type }) {
  const [openStatus, setopenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(statusItem[0])
  const user = useContext(UserContext);
  const ref=useRef(null)
  const handleOpenStatus = () => {
    setopenStatus(!openStatus);
  };

  const handleChangeStatus = (item) => {
    setSelectedStatus(item)
    setComments([])
    localStorage.setItem(`${type}Status`,JSON.stringify(item))
    getCommentsQuery.mutate({ user_id: user?.user?.id, status: item?.status,page:1 });
  };
  

  useOnClickOutside(ref, () => setopenStatus(false));

  useEffect(() => {
    
  
    return () => localStorage.removeItem(`${type}Status`)
      
    
  }, [])
  
  return (
    <div
    ref={ref}
      className={`flex cursor-pointer relative  flex-row gap-3 w-[313px] ${
        openStatus ? "bg-[#4FB3BF] text-white" : "bg-white text-black"
      } p-2 rounded-l-[8px] items-center justify-between `}
      onClick={handleOpenStatus}
    >
      <p className=" font-Kalameh text-[16px]">{selectedStatus?.title}</p>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all z-10 duration-500 ease-in-rotate ${
          openStatus ? "-rotate-180 fill-[#fff]" : "rotate-0 fill-black"
        }`}
      >
        <path
          d="M17.92 8.17969H11.69H6.07999C5.11999 8.17969 4.63999 9.33969 5.31999 10.0197L10.5 15.1997C11.33 16.0297 12.68 16.0297 13.51 15.1997L15.48 13.2297L18.69 10.0197C19.36 9.33969 18.88 8.17969 17.92 8.17969Z"
          fill=""
        />
      </svg>

      <div
        className={`w-[313px] flex flex-col absolute left-0 top-8 rounded-l-lg bg-[#4FB3BF] overflow-hidden ${
          openStatus
            ? "max-h-96 transition-all duration-500 ease-linear "
            : "max-h-0  rota"
        }`}
      >
        <div className="px-2">
          <div className="flex items-center   border-t-[1px] mt-4 text-right border-[#c0c0c0] text-white hover:opacity-75 transition-all"></div>

          {statusItem?.map((item) => (
            <div
              className="flex items-center h-11 border-b-[1px] text-right border-[#c0c0c0] text-white hover:opacity-75 transition-all"
              onClick={() => handleChangeStatus(item)}
            >
              {item?.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatusFilter;
