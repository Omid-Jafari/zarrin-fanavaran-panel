import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../../public/images/icons/addIcon";
import { activeAdmin, deleteRole, roles } from "../../../api/ApiClient";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../../public/images/icons/deleteIcon";
import RolesTable from "../../../components/admin/rolesTable";

const AdminRoles = () => {
  const [rolesData, setRolesData] = useState();
  const [roleIds, setRoleIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const rolesMutation = useMutation(roles, {
    onSuccess: (res) => {
      setRolesData(res?.data?.data);
    },
  });
  const rolesDeleteMutation = useMutation(deleteRole, {
    onSuccess: () => {
      rolesMutation?.mutate({ filterData });
    },
  });
  useEffect(() => {
    rolesMutation?.mutate({ filterData });
  }, []);
  const selectAll = (e) => {
    if (e?.target?.checked) {
      setRoleIds([]);
      for (let admin of rolesData) {
        setRoleIds((prev) => [...prev, admin?.id]);
      }
    } else {
      setRoleIds([]);
    }
  };

  const groupDelete = () => {
    for (let id of roleIds) {
      rolesDeleteMutation?.mutate({ id });
    }
    setRoleIds([]);
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
                d="M19 16.75C18.59 16.75 18.25 16.41 18.25 16V6.5C18.25 5.81 17.69 5.25 17 5.25H11.5C11.09 5.25 10.75 4.91 10.75 4.5C10.75 4.09 11.09 3.75 11.5 3.75H17C18.52 3.75 19.75 4.98 19.75 6.5V16C19.75 16.41 19.41 16.75 19 16.75Z"
                fill="#222427"
              />
              <path
                d="M14 7.75091C13.83 7.75091 13.66 7.69093 13.52 7.58093L10.52 5.08093C10.35 4.94093 10.25 4.73091 10.25 4.50091C10.25 4.27091 10.35 4.07089 10.52 3.92089L13.52 1.42089C13.84 1.15089 14.31 1.20093 14.58 1.52093C14.85 1.84093 14.8 2.31093 14.48 2.58093L12.17 4.50091L14.48 6.42089C14.8 6.69089 14.84 7.16089 14.58 7.48089C14.43 7.66089 14.21 7.75091 14 7.75091Z"
                fill="#222427"
              />
              <path
                d="M19 22.75C16.93 22.75 15.25 21.07 15.25 19C15.25 16.93 16.93 15.25 19 15.25C21.07 15.25 22.75 16.93 22.75 19C22.75 21.07 21.07 22.75 19 22.75ZM19 16.75C17.76 16.75 16.75 17.76 16.75 19C16.75 20.24 17.76 21.25 19 21.25C20.24 21.25 21.25 20.24 21.25 19C21.25 17.76 20.24 16.75 19 16.75Z"
                fill="#222427"
              />
              <path
                d="M12.5 20.25H7C5.48 20.25 4.25 19.02 4.25 17.5V8C4.25 7.59 4.59 7.25 5 7.25C5.41 7.25 5.75 7.59 5.75 8V17.5C5.75 18.19 6.31 18.75 7 18.75H12.5C12.91 18.75 13.25 19.09 13.25 19.5C13.25 19.91 12.91 20.25 12.5 20.25Z"
                fill="#222427"
              />
              <path
                d="M9.99993 22.7507C9.78993 22.7507 9.56994 22.6606 9.41994 22.4806C9.14994 22.1606 9.19992 21.6906 9.51992 21.4206L11.8299 19.5007L9.51992 17.5807C9.19992 17.3107 9.15994 16.8407 9.41994 16.5207C9.68994 16.2007 10.1599 16.1606 10.4799 16.4206L13.4799 18.9206C13.6499 19.0606 13.7499 19.2707 13.7499 19.5007C13.7499 19.7307 13.6499 19.9307 13.4799 20.0807L10.4799 22.5807C10.3399 22.6907 10.1699 22.7507 9.99993 22.7507Z"
                fill="#222427"
              />
              <path
                d="M5 8.75C2.93 8.75 1.25 7.07 1.25 5C1.25 2.93 2.93 1.25 5 1.25C7.07 1.25 8.75 2.93 8.75 5C8.75 7.07 7.07 8.75 5 8.75ZM5 2.75C3.76 2.75 2.75 3.76 2.75 5C2.75 6.24 3.76 7.25 5 7.25C6.24 7.25 7.25 6.24 7.25 5C7.25 3.76 6.24 2.75 5 2.75Z"
                fill="#222427"
              />
            </svg>
            نقش ها و دسترسی ها:
          </h5>
          <Link to={"/admin/roles/add"}>
            <button className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium">
              <AddIcon className="fill-white" />
              افزودن نقش
            </button>
          </Link>
        </div>
        <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                rolesData?.length !== 0 && rolesData?.length === roleIds?.length
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
              placeholder="جستجو در نقش ها و دسترسی ها"
              onChange={(e) => setFilterData(e?.target?.value)}
            />
          </div>
          <button
            className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
            onClick={() => {
              rolesMutation?.mutate({ filterData });
            }}
          >
            جستجو
          </button>
        </div>
        <RolesTable
          rolesData={rolesData}
          roleIds={roleIds}
          setRoleIds={setRoleIds}
          rolesMutation={rolesMutation}
          rolesDeleteMutation={rolesDeleteMutation}
        />
      </div>
    </>
  );
};

export default AdminRoles;
