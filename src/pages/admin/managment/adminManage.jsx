import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../../public/images/icons/addIcon";
import { activeAdmin, admins, blockAdmin } from "../../../api/ApiClient";
import { Link } from "react-router-dom";
import SelectBox from "../../../components/common/selectBox";
import AdminManagmentTable from "../../../components/admin/adminManagmentTable";
import { adminStatusOptions } from "../../../constant/adminStatusOptions";

const AdminManage = () => {
  const [adminsData, setAdminsData] = useState();
  const [adminIds, setAdminIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [status, setStatus] = useState(null);
  const adminsMutation = useMutation(admins, {
    onSuccess: (res) => {
      setAdminsData(res?.data?.data);
    },
  });
  const adminsBlockMutation = useMutation(blockAdmin, {
    onSuccess: () => {
      adminsMutation?.mutate({ filterData, status });
    },
  });
  const adminsUnblockMutation = useMutation(activeAdmin, {
    onSuccess: () => {
      adminsMutation?.mutate({ filterData, status });
    },
  });
  useEffect(() => {
    adminsMutation?.mutate({ filterData, status });
  }, [status]);
  const selectAll = (e) => {
    if (e?.target?.checked) {
      setAdminIds([]);
      for (let admin of adminsData) {
        setAdminIds((prev) => [...prev, admin?.id]);
      }
    } else {
      setAdminIds([]);
    }
  };

  const groupDelete = () => {
    for (let id of adminIds) {
      adminsBlockMutation?.mutate({ id });
    }
    setAdminIds([]);
  };
  const getValue = (value) => {
    setStatus(value);
  };
  console.log("colorsData", adminsData);
  return (
    <>
      <div className="w-full px-5 pt-5">
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
                d="M11.9999 22.7592C10.9099 22.7592 9.82992 22.4392 8.97992 21.8092L4.6799 18.5992C3.5399 17.7492 2.6499 15.9792 2.6499 14.5592V7.12922C2.6499 5.58922 3.77992 3.94921 5.22992 3.40921L10.2199 1.53922C11.2099 1.16922 12.7699 1.16922 13.7599 1.53922L18.7599 3.40921C20.2099 3.94921 21.3399 5.58922 21.3399 7.12922V14.5592C21.3399 15.9792 20.4499 17.7492 19.3099 18.5992L15.0099 21.8092C14.1699 22.4392 13.0899 22.7592 11.9999 22.7592ZM10.7499 2.93921L5.75992 4.80921C4.89992 5.12921 4.1499 6.20922 4.1499 7.12922V14.5592C4.1499 15.5092 4.81992 16.8392 5.56992 17.3992L9.8699 20.6092C11.0199 21.4692 12.9699 21.4692 14.1199 20.6092L18.4199 17.3992C19.1799 16.8292 19.8399 15.4992 19.8399 14.5592V7.12922C19.8399 6.21922 19.0899 5.13921 18.2299 4.80921L13.2399 2.93921C12.5799 2.68921 11.4199 2.68921 10.7499 2.93921Z"
                fill="#222427"
              />
              <path
                d="M11.9999 11.6702C11.9799 11.6702 11.9599 11.6702 11.9299 11.6702C10.4799 11.6302 9.41992 10.5202 9.41992 9.17017C9.41992 7.79017 10.5499 6.66016 11.9299 6.66016C13.3099 6.66016 14.4399 7.79017 14.4399 9.17017C14.4299 10.5302 13.3699 11.6301 12.0199 11.6801C12.0099 11.6701 12.0099 11.6702 11.9999 11.6702ZM11.9299 8.16016C11.3699 8.16016 10.9199 8.61017 10.9199 9.17017C10.9199 9.72017 11.3499 10.1601 11.8899 10.1801C11.8899 10.1801 11.9399 10.1801 11.9999 10.1801C12.5299 10.1501 12.9399 9.71017 12.9399 9.17017C12.9499 8.61017 12.4899 8.16016 11.9299 8.16016Z"
                fill="#222427"
              />
              <path
                d="M11.9998 17.3509C11.1398 17.3509 10.2698 17.1209 9.59982 16.6709C8.92982 16.2309 8.5498 15.581 8.5498 14.891C8.5498 14.201 8.92982 13.5509 9.59982 13.1009C10.9498 12.2009 13.0598 12.2109 14.3998 13.1009C15.0698 13.5409 15.4498 14.1909 15.4498 14.8809C15.4498 15.5709 15.0698 16.2209 14.3998 16.6709C13.7298 17.1209 12.8598 17.3509 11.9998 17.3509ZM10.4298 14.3409C10.1798 14.5009 10.0398 14.7009 10.0498 14.8809C10.0498 15.0609 10.1898 15.2609 10.4298 15.4209C11.2698 15.9809 12.7298 15.9809 13.5698 15.4209C13.8198 15.2609 13.9598 15.0609 13.9598 14.8809C13.9598 14.7009 13.8198 14.5009 13.5798 14.3409C12.7398 13.7909 11.2698 13.7909 10.4298 14.3409Z"
                fill="#222427"
              />
            </svg>
            مدیریت ادمین ها:
          </h5>
          <Link to={"/admin/management/add"}>
            <button className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium">
              <AddIcon className="fill-white" />
              افزودن ادمین
            </button>
          </Link>
        </div>
        <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                adminsData?.length !== 0 &&
                adminsData?.length === adminIds?.length
              }
              onChange={(e) => selectAll(e)}
            />
            <span className="font-KalamehMed font-medium">انتخاب همه</span>
          </div>
          <button
            className="font-KalamehMed font-medium text-sm h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 text-[#CA3636] rounded-[4px] flex items-center gap-1"
            onClick={() => groupDelete()}
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
                fill="#CA3636"
              />
              <path
                d="M4.9 19.7514C4.71 19.7514 4.52 19.6814 4.37 19.5314C4.08 19.2414 4.08 18.7614 4.37 18.4714L18.37 4.47141C18.66 4.18141 19.14 4.18141 19.43 4.47141C19.72 4.76141 19.72 5.24141 19.43 5.53141L5.43 19.5314C5.28 19.6814 5.09 19.7514 4.9 19.7514Z"
                fill="#CA3636"
              />
            </svg>
            مسدود کردن
          </button>
          <div className="flex items-center gap-3 h-11 bg-white rounded-lg px-2 flex-shrink w-[40%] mr-auto">
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
              className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none"
              placeholder="جستجو در ادمین ها"
              onChange={(e) => setFilterData(e?.target?.value)}
            />
          </div>
          <SelectBox
            status={status}
            getValue={(e) => getValue(e)}
            options={adminStatusOptions}
            className="min-w-[140px]"
            height="44px"
          />
          <button
            className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
            onClick={() => {
              adminsMutation?.mutate({ filterData, status });
            }}
          >
            جستجو
          </button>
        </div>
        <AdminManagmentTable
          adminsData={adminsData}
          adminIds={adminIds}
          setAdminIds={setAdminIds}
          adminsMutation={adminsMutation}
          adminsBlockMutation={adminsBlockMutation}
          adminsUnblockMutation={adminsUnblockMutation}
        />
      </div>
    </>
  );
};

export default AdminManage;
