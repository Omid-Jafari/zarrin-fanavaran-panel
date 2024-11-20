import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { singleUser } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import FifthUserSection from "../../components/users/singleUserSections/fifthUserSection";
import FirstUserSection from "../../components/users/singleUserSections/firstUserSection";
import ForthUserSection from "../../components/users/singleUserSections/forthUserSection";
import SecondUserSection from "../../components/users/singleUserSections/secondUserSection";
import ThirdUserSection from "../../components/users/singleUserSections/thirdUserSection";

const SingleUser = () => {
  let heightForm = window?.innerHeight - 252;
  const navigate = useNavigate();
  const [userData, setuserData] = useState({});
  const { id } = useParams();
  const singleUserQuery = useQuery(["singleUserQuery"], () => singleUser(id), {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    onSuccess: (res) => {
      setuserData(res?.data?.data);
    },
  });
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section") || 0;
  const sectionTitles = [
    "اطلاعات کاربری",
    "مالی",
    "اعلانات",
    "فعالیت ها",
    "سفارشات",
  ];
  const sectionItems = [
    <FirstUserSection userData={userData} id={id} />,
    <SecondUserSection userData={userData} id={id} />,
    <ThirdUserSection userData={userData} id={id} />,
    <ForthUserSection id={id} />,
    <FifthUserSection id={id} />,
  ];
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <h4 className="font-medium font-KalamehMed text-lg">اطلاعات کاربر:</h4>
        <button
          onClick={() => navigate("/users/list")}
          className="flex gap-1  bg-[#EFF1F1] font-semibold font-KalamehSemi rounded-lg hover:bg-[#E0E3E3] transition-colors duration-500 p-[10px] "
        >
          بازگشت
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.56994 19.3191C9.37994 19.3191 9.18994 19.2491 9.03994 19.0991L2.96994 13.0291C2.67994 12.7391 2.67994 12.2591 2.96994 11.9691L9.03994 5.89914C9.32994 5.60914 9.80994 5.60914 10.0999 5.89914C10.3899 6.18914 10.3899 6.66914 10.0999 6.95914L4.55994 12.4991L10.0999 18.0391C10.3899 18.3291 10.3899 18.8091 10.0999 19.0991C9.95994 19.2491 9.75994 19.3191 9.56994 19.3191Z"
              fill="#222427"
            />
            <path
              d="M20.4999 13.25H3.66992C3.25992 13.25 2.91992 12.91 2.91992 12.5C2.91992 12.09 3.25992 11.75 3.66992 11.75H20.4999C20.9099 11.75 21.2499 12.09 21.2499 12.5C21.2499 12.91 20.9099 13.25 20.4999 13.25Z"
              fill="#222427"
            />
          </svg>
        </button>
      </div>
      <div className="w-full flex items-center gap-3 rounded-lg bg-blue-lightt px-3 py-4">
        {sectionTitles?.map((title, index) => (
          <button
            onClick={() => navigate(`/users/list/${id}?section=${index}`)}
            className={`w-[10%] rounded h-11 flex items-center justify-center text-sm transition-all duration-500 ${
              index == section
                ? "shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52] bg-[#478F95] text-white"
                : "bg-white hover:bg-[#478F95] hover:text-white hover:shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52]"
            }`}
          >
            {title}
          </button>
        ))}
      </div>
      <div
        className="w-full bg-blue-lightt rounded-lg p-5 overflow-y-auto hide-scrollbar"
        style={{ height: heightForm }}
      >
        {singleUserQuery?.isLoading ? (
          <div className="w-full flex justify-center">
            <Loading className="w-20 h-20 text-blacklead animate-pulse" />
          </div>
        ) : (
          sectionItems?.filter((item, index) => index == section)
        )}
      </div>
    </div>
  );
};

export default SingleUser;
