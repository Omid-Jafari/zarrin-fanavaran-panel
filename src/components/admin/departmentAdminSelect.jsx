import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import { admins } from "../../api/ApiClient";
import Loading from "../elements/loading";
import Tooltip from "../elements/Tooltip";

const DepartmentAdminSelect = (props) => {
  const { formik } = props;
  const [adminsData, setAdminsData] = useState({ show: false, data: [] });
  const [filterData, setFilterData] = useState("");

  const adminsMutation = useMutation((data) => admins(data), {
    onSuccess: (res) => {
      setAdminsData((prev) => {
        return { ...prev, data: res?.data?.data };
      });
    },
  });
  const handleBlur = (event) => {
    // if the blur was because of outside focus
    // currentTarget is the parent element, relatedTarget is the clicked element
    //mach be man😍
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setAdminsData((prev) => {
        return { ...prev, show: false };
      });
    }
  };
  useEffect(() => {
    adminsMutation.mutate({ filterData });
  }, [filterData]);

  return (
    <div className="w-5/6 rounded-lg bg-white flex flex-col p-4 gap-4 ">
      <div
        tabIndex="1"
        onBlur={handleBlur}
        className=" flex items-center gap-3 h-11 bg-[#EFF1F1] rounded-lg px-2 w-full relative"
      >
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
          className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none bg-[#EFF1F1]"
          placeholder="جستجوی ادمین"
          value={filterData}
          onChange={(e) => setFilterData(e?.target?.value)}
          onFocus={() =>
            setAdminsData((prev) => {
              return { ...prev, show: true };
            })
          }
        />
        {adminsData?.show && (
          <div className="absolute z-10 w-full left-0 top-12 flex flex-col max-h-40 bg-white rounded-[6px] overflow-y-auto shadow-2xl">
            {adminsMutation?.isLoading ? (
              <div className="w-full flex justify-center">
                <Loading className="w-14 h-14 text-blacklead animate-pulse" />
              </div>
            ) : (
              adminsData?.data?.map((admin) => {
                const check = formik.values.admin_ids?.indexOf(admin?.id);
                if (check === -1) {
                  return (
                    <div
                      className="w-full py-2 px-3 border-b cursor-pointer hover:bg-blue-lightt transition duration-300"
                      onClick={() => {
                        formik.setFieldValue("admin_ids", [
                          ...formik.values.admin_ids,
                          admin?.id,
                        ]);
                      }}
                    >
                      <p className="truncate">{admin?.full_name}</p>
                    </div>
                  );
                } else return;
              })
            )}
          </div>
        )}
      </div>
      <div className="text-sm font-medium font-KalamehMed mt-5">
        لیست افراد افزوده شده:
      </div>
      <div className="border border-black w-full grid grid-cols-4 items-center rounded-[8px] px-5 py-2 gap-2 text-sm">
        <div className="col-span-1">
          <p className="w-full truncate">نام ادمین</p>
        </div>
        <div className="col-span-1">
          <p className="w-full truncate">نقش</p>
        </div>
        <div className="col-span-1 justify-self-center">
          <p className="w-full truncate">وضعیت</p>
        </div>
      </div>
      {adminsData?.data?.map(
        (selectedAdmins) =>
          formik.values.admin_ids?.includes(selectedAdmins?.id) && (
            <div className="bg-[#EDF6F7] w-full grid grid-cols-4 items-center rounded-[8px] px-5 py-3 gap-2 text-sm">
              <div className="col-span-1">
                <p
                  className="w-full truncate"
                  title={selectedAdmins?.full_name}
                >
                  {selectedAdmins?.full_name}
                </p>
              </div>
              <div className="col-span-1">
                <p
                  className="w-full truncate"
                  title={selectedAdmins?.role?.name}
                >
                  {selectedAdmins?.role?.name}
                </p>
              </div>
              <div className="col-span-1 justify-self-center">
                <p
                  className={`w-full truncate ${
                    selectedAdmins?.status === "ACTIVE"
                      ? "text-primary"
                      : "text-red-600"
                  }`}
                  title={selectedAdmins?.status_info?.name}
                >
                  {selectedAdmins?.status_info?.name}
                </p>
              </div>
              <div className="col-span-1 justify-self-end">
                <button
                  onClick={() =>
                    formik.setFieldValue(
                      "admin_ids",
                      formik.values.admin_ids?.filter(
                        (item) => item !== selectedAdmins?.id
                      )
                    )
                  }
                  className="outline-none"
                >
                  <Tooltip
                    svgIcon={
                      <DeleteIcon className="fill-[#CA3636] hover:fill-[#7D3C45] transition-colors duration-500" />
                    }
                    title="حذف کردن"
                  />
                </button>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default DepartmentAdminSelect;
