import React from "react";
import Loading from "../elements/loading";

const AdminLogTable = (props) => {
  const { logsData, logsMutation, openLogSingleModalRef } = props;
  let maxHeightTable = window?.innerHeight - 281;
  return (
    <>
      <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg gap-6 ">
        <div className="w-14"></div>
        <div className="w-full grid grid-cols-4 gap-x-2 items-center h-11 px-5">
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">نام کاربر</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">عملیات</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">مربوط به</p>
          </div>
        </div>
      </div>
      <div
        className="w-full overflow-y-scroll hide-scrollbar"
        // style={{ maxHeight: maxHeightTable }}
      >
        {logsMutation?.isLoading ? (
          <div className="w-full flex items-center justify-center mt-5">
            <Loading className="w-14 h-14 text-blacklead animate-pulse" />
          </div>
        ) : logsData?.length === 0 ? (
          <div className="flex items-center p-3 w-full justify-center">
            هیچ موردی یافت نشد
          </div>
        ) : (
          Object.entries(logsData)?.map((admin) =>
            admin[1]?.map((miniLog) => (
              <div className="w-full flex items-center gap-6 mt-4">
                <div className="text-[#8E9191] w-14">{admin[0]}</div>
                <div className="flex-1 bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-3 px-5 grid grid-cols-4 gap-x-4 items-center">
                  <div className="col-span-1">
                    <p className="font-KalamehMed text-sm font-medium">
                      {miniLog?.causer?.full_name}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="font-KalamehMed text-sm font-medium">
                      {miniLog?.action_translated}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="font-KalamehMed text-sm font-medium">
                      {miniLog?.subject?.name}
                    </p>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-5 ">
                    <button
                      className="flex items-center justify-center w-full max-w-[120px] gap-1.5 h-10 bg-primary hover:bg-blacklead transition-colors duration-500 text-white rounded-[4px] font-medium font-KalamehMed text-xs"
                      onClick={() => openLogSingleModalRef(miniLog)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          fill="#fff"
                          d="M11.25 17.063h-4.5c-4.072 0-5.813-1.74-5.813-5.813v-4.5C.938 2.678 2.678.937 6.75.937h4.5c4.072 0 5.813 1.74 5.813 5.813v4.5c0 4.072-1.74 5.813-5.813 5.813zm-4.5-15c-3.458 0-4.688 1.23-4.688 4.687v4.5c0 3.457 1.23 4.688 4.688 4.688h4.5c3.457 0 4.688-1.23 4.688-4.688v-4.5c0-3.458-1.23-4.688-4.688-4.688h-4.5z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M9 9.75A.747.747 0 018.25 9c0-.412.338-.75.75-.75s.75.338.75.75-.33.75-.75.75zM12 9.75a.747.747 0 01-.75-.75c0-.412.338-.75.75-.75s.75.338.75.75-.33.75-.75.75zM6 9.75A.747.747 0 015.25 9c0-.412.338-.75.75-.75s.75.338.75.75-.33.75-.75.75z"
                        ></path>
                      </svg>
                      جزئیات
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </>
  );
};

export default AdminLogTable;
