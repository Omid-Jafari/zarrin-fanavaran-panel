import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Person2Icon from "../../../public/images/icons/person2Icon";
import { usersStatistics } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import UsersDataList from "../../components/users/usersDataList";

const UsersOverview = () => {
  const [statistics, setStatistics] = useState({});
  const usersStatisticsQuery = useQuery(
    ["usersStatisticsQuery"],
    async () => usersStatistics(),
    {
      onSuccess: (res) => {
        setStatistics(res?.data?.data);
      },
    }
  );
  return (
    <div className="p-4 w-full flex flex-col gap-5">
      <h5 className="w-full flex gap-2 font-medium font-KalamehMed items-center text-lg">
        <Person2Icon className="fill-black" />
        کاربران در یک نگاه:
      </h5>
      {usersStatisticsQuery?.isLoading ? (
        <div className="w-full flex justify-center">
          <Loading className="w-14 h-14 text-blacklead animate-pulse" />
        </div>
      ) : (
        <UsersDataList statistics={statistics} />
      )}
      <h5 className="w-full flex gap-2 font-medium font-KalamehMed items-center text-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="#222427"
            d="M22 22.75H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h20c.41 0 .75.34.75.75s-.34.75-.75.75z"
          ></path>
          <path
            fill="#222427"
            d="M14.25 22.75h-4.5c-.41 0-.75-.34-.75-.75V4c0-1.72.95-2.75 2.55-2.75h.9C14.05 1.25 15 2.28 15 4v18c0 .41-.34.75-.75.75zm-3.75-1.5h3V4c0-1.15-.54-1.25-1.05-1.25h-.9c-.51 0-1.05.1-1.05 1.25v17.25zM7 22.75H3c-.41 0-.75-.34-.75-.75V10c0-1.72.88-2.75 2.35-2.75h.8c1.47 0 2.35 1.03 2.35 2.75v12c0 .41-.34.75-.75.75zm-3.25-1.5h2.5V10c0-1.25-.55-1.25-.85-1.25h-.8c-.3 0-.85 0-.85 1.25v11.25zM21 22.75h-4c-.41 0-.75-.34-.75-.75v-7c0-1.72.88-2.75 2.35-2.75h.8c1.47 0 2.35 1.03 2.35 2.75v7c0 .41-.34.75-.75.75zm-3.25-1.5h2.5V15c0-1.25-.55-1.25-.85-1.25h-.8c-.3 0-.85 0-.85 1.25v6.25z"
          ></path>
        </svg>
        نمودار رفتار کاربران:{console.log("statistics", statistics)}
      </h5>
    </div>
  );
};

export default UsersOverview;
