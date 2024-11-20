import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { blockUser, productsExport, users } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import download from "downloadjs";
import UsersListTable from "../../components/users/usersListTable";
import PrimarySelectBox from "../../components/common/primarySelectBox";
import { usersStatusOptions } from "../../constant/usersStatusOptions";

const UsersList = () => {
  let maxHeightFilter = window?.innerHeight - 280;
  let maxHeightTable = window?.innerHeight - 326;
  const [usersData, setUsersData] = useState([]);
  const [usersIds, setUsersIds] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const is_buyer = searchParams.get("is_buyer") || null;
  const sort = searchParams.get("sort") || "orders_count";
  const filterData = searchParams.get("filterData") || "";
  const [filterInput, setFilterInput] = useState(filterData || "");

  const usersMutation = useMutation(users, {
    onSuccess: (res) => {
      setUsersData(res?.data?.data);
    },
  });
  const usersExportMutation = useMutation(productsExport, {
    onSuccess: (res) => {
      download(
        new Blob([res?.data]),
        "users-list.xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
    },
  });
  const mutateUsers = () => {
    usersMutation?.mutate({
      is_buyer,
      sort,
      filterData,
    });
  };
  const blockUserMutation = useMutation(blockUser, {
    onSuccess: () => {
      mutateUsers();
    },
  });

  useEffect(() => {
    mutateUsers();
  }, [is_buyer, sort, filterData]);

  const selectAll = (e) => {
    if (e?.target?.checked) {
      setUsersIds([]);
      for (let { id } of usersData) {
        setUsersIds((prev) => [...prev, id]);
      }
    } else {
      setUsersIds([]);
    }
  };
  const groupBlock = () => {
    for (let id of usersIds) {
      blockUserMutation?.mutate(id);
    }
    setUsersIds([]);
  };
  const selectStatus = (item) => {
    console.log("item", item);
    navigate(
      `/users/list?sort=${item}${is_buyer ? `&is_buyer=${is_buyer}` : ""}${
        filterData ? `&filterData=${filterData}` : ""
      }`
    );
  };
  return (
    <>
      <div className="w-full px-5 pt-5">
        <div className="w-full flex items-center justify-between flex-wrap">
          <h5 className="font-KalamehMed text-lg font-medium flex gap-2 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#222427"
                d="M21 20.25H11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10c.41 0 .75.34.75.75s-.34.75-.75.75zM21 13.25H11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10c.41 0 .75.34.75.75s-.34.75-.75.75zM21 6.25H11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10c.41 0 .75.34.75.75s-.34.75-.75.75zM4 7.25c-.19 0-.38-.07-.53-.22l-1-1a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l.47.47 2.47-2.47c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-3 3c-.15.15-.34.22-.53.22zM4 14.25c-.19 0-.38-.07-.53-.22l-1-1a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l.47.47 2.47-2.47c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-3 3c-.15.15-.34.22-.53.22zM4 21.25c-.19 0-.38-.07-.53-.22l-1-1a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l.47.47 2.47-2.47c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-3 3c-.15.15-.34.22-.53.22z"
              ></path>
            </svg>
            لیست کاربران:
          </h5>
          <div className="w-full rounded-lg bg-blue-lightt flex items-center p-3 gap-3 mt-5 z-10">
            <button
              className={`min-w-[122px] h-11 rounded-[4px] flex items-center justify-center px-3 text-sm hover:bg-[#478F95] hover:text-white hover:shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52] transition duration-500 ${
                is_buyer === null
                  ? "bg-[#478F95] text-white shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52]"
                  : "bg-white text-[#545456]"
              }`}
              onClick={() => {
                setUsersIds([]);
                navigate(
                  `/users/list?sort=${sort}${
                    filterData ? `&filterData=${filterData}` : ""
                  }`
                );
              }}
            >
              نمایش همه
            </button>
            <button
              className={`min-w-[122px] h-11 rounded-[4px] flex items-center justify-center px-3 text-sm hover:bg-[#478F95] hover:text-white hover:shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52] transition duration-500 ${
                is_buyer == "1"
                  ? "bg-[#478F95] text-white shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52]"
                  : "bg-white text-[#545456]"
              }`}
              onClick={() => {
                setUsersIds([]);
                navigate(
                  `/users/list?sort=${sort}&is_buyer=1${
                    filterData ? `&filterData=${filterData}` : ""
                  }`
                );
              }}
            >
              خریداران
            </button>
            <button
              className={`min-w-[122px] h-11 rounded-[4px] flex items-center justify-center px-3 text-sm hover:bg-[#478F95] hover:text-white hover:shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52] transition duration-500 ${
                is_buyer === "0"
                  ? "bg-[#478F95] text-white shadow-[inset_-1px_-1px_4px_#5BB6BD,inset_1px_1px_2px_#2D4F52]"
                  : "bg-white text-[#545456]"
              }`}
              onClick={() => {
                setUsersIds([]);
                navigate(
                  `/users/list?sort=${sort}&is_buyer=0${
                    filterData ? `&filterData=${filterData}` : ""
                  }`
                );
              }}
            >
              کاربران عادی
            </button>
            <div className="flex items-center gap-2 h-11 bg-white rounded-lg pr-2 mr-auto text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#00838F"
                  d="M19 8.75c-2.07 0-3.75-1.68-3.75-3.75 0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75zm0-6c-1.24 0-2.25 1.01-2.25 2.25S17.76 7.25 19 7.25 21.25 6.24 21.25 5 20.24 2.75 19 2.75zM12 13.75H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75zM16 17.75H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9c.41 0 .75.34.75.75s-.34.75-.75.75z"
                ></path>
                <path
                  fill="#00838F"
                  d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h5c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75z"
                ></path>
              </svg>
              فیلتر بر اساس:
              <PrimarySelectBox
                status={sort}
                getValue={selectStatus}
                options={usersStatusOptions}
                className="min-w-[300px]"
                height="44px"
              />
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                usersIds?.length === usersData?.length &&
                usersData?.length !== 0
              }
              onChange={(e) => selectAll(e)}
            />
            <span className="font-KalamehMed font-medium">انتخاب همه</span>
          </div>
          <button
            className="text-sm h-11 bg-cyann hover:bg-primary transition-colors duration-500 px-3 text-white rounded-[4px] flex items-center gap-1"
            onClick={() => groupBlock()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M12 12.75c-3.17 0-5.75-2.58-5.75-5.75S8.83 1.25 12 1.25 17.75 3.83 17.75 7s-2.58 5.75-5.75 5.75zm0-10A4.26 4.26 0 007.75 7 4.26 4.26 0 0012 11.25 4.26 4.26 0 0016.25 7 4.26 4.26 0 0012 2.75zM3.41 22.75c-.41 0-.75-.34-.75-.75 0-4.27 4.19-7.75 9.34-7.75 1.01 0 2 .13 2.96.4.4.11.63.52.52.92-.11.4-.52.63-.92.52-.82-.23-1.68-.34-2.56-.34-4.32 0-7.84 2.8-7.84 6.25 0 .41-.34.75-.75.75z"
              ></path>
              <path
                fill="#fff"
                d="M18 22.75a4.7 4.7 0 01-3.17-1.23c-.35-.3-.66-.67-.9-1.08-.44-.72-.68-1.57-.68-2.44 0-1.25.48-2.42 1.34-3.31.9-.93 2.11-1.44 3.41-1.44 1.36 0 2.65.58 3.53 1.58A4.74 4.74 0 0122.75 18c0 .38-.05.76-.15 1.12-.1.45-.29.92-.55 1.33-.83 1.42-2.39 2.3-4.05 2.3zm0-8a3.241 3.241 0 00-2.78 4.92c.16.28.37.53.61.74.6.55 1.37.85 2.17.85 1.13 0 2.2-.6 2.78-1.57.17-.28.3-.6.37-.91.07-.26.1-.51.1-.77 0-.8-.3-1.57-.84-2.17-.6-.7-1.48-1.09-2.41-1.09z"
              ></path>
              <path
                fill="#fff"
                d="M19.5 18.73h-2.99c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.99c.41 0 .75.34.75.75s-.34.75-.75.75z"
              ></path>
            </svg>
            تعلیق
          </button>
          <div className="flex gap-2 items-center w-2/6">
            <div className="flex-1 flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#222427"
                  d="M11.5 21.75c-5.65 0-10.25-4.6-10.25-10.25S5.85 1.25 11.5 1.25s10.25 4.6 10.25 10.25-4.6 10.25-10.25 10.25zm0-19c-4.83 0-8.75 3.93-8.75 8.75s3.92 8.75 8.75 8.75 8.75-3.93 8.75-8.75-3.92-8.75-8.75-8.75zM22 22.75c-.19 0-.38-.07-.53-.22l-2-2a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2 2c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
                ></path>
              </svg>
              <input
                type="text"
                value={filterInput}
                className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none"
                placeholder="جستجو در کاربران"
                onChange={(e) => setFilterInput(e?.target?.value)}
              />
            </div>
            <button
              className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
              onClick={() => {
                navigate(
                  `/users/list?sort=${sort}${
                    is_buyer ? `&is_buyer=${is_buyer}` : ""
                  }${filterInput ? `&filterData=${filterInput}` : ""}`
                );
              }}
            >
              جستجو
            </button>
          </div>
          <button
            className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium mr-auto"
            onClick={() =>
              usersExportMutation?.mutate({
                is_buyer,
                sort,
              })
            }
          >
            {usersExportMutation?.isLoading ? (
              <Loading className="w-14 h-14 text-blacklead animate-pulse" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M14.44 7.25c-.19 0-.38-.07-.53-.22L11.88 5 9.85 7.03c-.29.29-.77.29-1.06 0a.754.754 0 010-1.06l2.56-2.56c.29-.29.77-.29 1.06 0l2.56 2.56c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M11.88 14.93c-.41 0-.75-.34-.75-.75V4.01c0-.41.34-.75.75-.75s.75.34.75.75v10.17c0 .42-.34.75-.75.75z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M12 20.75c-5.15 0-8.75-3.6-8.75-8.75 0-.41.34-.75.75-.75s.75.34.75.75c0 4.27 2.98 7.25 7.25 7.25s7.25-2.98 7.25-7.25c0-.41.34-.75.75-.75s.75.34.75.75c0 5.15-3.6 8.75-8.75 8.75z"
                  ></path>
                </svg>
                خروج داده
              </>
            )}
          </button>
        </div>
        <UsersListTable
          setUsersIds={setUsersIds}
          usersIds={usersIds}
          filterData={filterData}
          usersMutation={usersMutation}
          blockUserMutation={blockUserMutation}
          usersData={usersData}
        />
      </div>
    </>
  );
};

export default UsersList;
