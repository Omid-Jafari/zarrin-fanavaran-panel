import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../../public/images/icons/addIcon";
import {
  activeAdmin,
  deleteDepartments,
  deleteRole,
  departments,
  roles,
} from "../../../api/ApiClient";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../../public/images/icons/deleteIcon";
import RolesTable from "../../../components/admin/rolesTable";
import DepartmentsTable from "../../../components/admin/departmentsTable";

const AdminDepartment = () => {
  const [departmentsData, setDepartmentsData] = useState();
  const [departmentIds, setDepartmentsIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const departmentsMutation = useMutation(departments, {
    onSuccess: (res) => {
      setDepartmentsData(res?.data?.data);
    },
  });
  const departmentsDeleteMutation = useMutation(deleteDepartments, {
    onSuccess: () => {
      departmentsMutation?.mutate({ filterData });
    },
  });
  useEffect(() => {
    departmentsMutation?.mutate({ filterData });
  }, []);
  const selectAll = (e) => {
    if (e?.target?.checked) {
      setDepartmentsIds([]);
      for (let department of departmentsData) {
        setDepartmentsIds((prev) => [...prev, department?.id]);
      }
    } else {
      setDepartmentsIds([]);
    }
  };

  const groupDelete = () => {
    for (let id of departmentIds) {
      departmentsDeleteMutation?.mutate({ id });
    }
    setDepartmentsIds([]);
  };
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
                d="M8.27 22.75H4.23C2.22 22.75 1.25 21.82 1.25 19.9V4.1C1.25 2.18 2.23 1.25 4.23 1.25H8.27C10.28 1.25 11.25 2.18 11.25 4.1V19.9C11.25 21.82 10.27 22.75 8.27 22.75ZM4.23 2.75C2.96 2.75 2.75 3.09 2.75 4.1V19.9C2.75 20.91 2.96 21.25 4.23 21.25H8.27C9.54 21.25 9.75 20.91 9.75 19.9V4.1C9.75 3.09 9.54 2.75 8.27 2.75H4.23Z"
                fill="#222427"
              />
              <path
                d="M19.77 13.75H15.73C13.72 13.75 12.75 12.82 12.75 10.9V4.1C12.75 2.18 13.73 1.25 15.73 1.25H19.77C21.78 1.25 22.75 2.18 22.75 4.1V10.9C22.75 12.82 21.77 13.75 19.77 13.75ZM15.73 2.75C14.46 2.75 14.25 3.09 14.25 4.1V10.9C14.25 11.91 14.46 12.25 15.73 12.25H19.77C21.04 12.25 21.25 11.91 21.25 10.9V4.1C21.25 3.09 21.04 2.75 19.77 2.75H15.73Z"
                fill="#222427"
              />
              <path
                d="M19.77 22.75H15.73C13.72 22.75 12.75 21.82 12.75 19.9V18.1C12.75 16.18 13.73 15.25 15.73 15.25H19.77C21.78 15.25 22.75 16.18 22.75 18.1V19.9C22.75 21.82 21.77 22.75 19.77 22.75ZM15.73 16.75C14.46 16.75 14.25 17.09 14.25 18.1V19.9C14.25 20.91 14.46 21.25 15.73 21.25H19.77C21.04 21.25 21.25 20.91 21.25 19.9V18.1C21.25 17.09 21.04 16.75 19.77 16.75H15.73Z"
                fill="#222427"
              />
            </svg>
            دپارتمان ها:
          </h5>
          <Link to={"/admin/department/add"}>
            <button className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium">
              <AddIcon className="fill-white" />
              افزودن دپارتمان
            </button>
          </Link>
        </div>
        <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                departmentsData?.length !== 0 &&
                departmentsData?.length === departmentIds?.length
              }
              onChange={(e) => selectAll(e)}
            />
            <span className="font-KalamehMed font-medium">انتخاب همه</span>
          </div>
          <button
            className="font-KalamehMed font-medium text-sm h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-4 text-[#CA3636] rounded-[4px] flex items-center gap-1"
            onClick={() => groupDelete()}
          >
            <DeleteIcon className="fill-[#CA3636]" />
            حذف
          </button>
          <div className="flex items-center gap-3 h-11 bg-white rounded-lg px-2 flex-1">
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
              placeholder="جستجو در دپارتمان ها"
              onChange={(e) => setFilterData(e?.target?.value)}
            />
          </div>
          <button
            className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
            onClick={() => {
              departmentsMutation?.mutate({ filterData });
            }}
          >
            جستجو
          </button>
        </div>
        <DepartmentsTable
          departmentsData={departmentsData}
          departmentIds={departmentIds}
          setDepartmentsIds={setDepartmentsIds}
          departmentsMutation={departmentsMutation}
          departmentsDeleteMutation={departmentsDeleteMutation}
        />
      </div>
    </>
  );
};

export default AdminDepartment;
