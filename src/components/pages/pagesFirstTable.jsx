import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import EditIcon from "../../../public/images/icons/editIcon";
import Checkbox from "../common/checkbox";
import Loading from "../elements/loading";
import Tooltip from "../elements/Tooltip";

const PagesFirstTable = (props) => {
  const {
    departmentsData,
    departmentIds,
    setDepartmentsIds,
    departmentsMutation,
    departmentsDeleteMutation,
  } = props;
  const [loadingId, setLoadingId] = useState(null);
  let maxHeightTable = window?.innerHeight - 281;
  return (
    <>
      <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg">
        <div className="w-full grid grid-cols-4 gap-x-2 items-center h-11 px-5">
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">دپارتمان</p>
          </div>
          <div className="col-span-1  justify-self-center">
            <p className="font-KalamehMed text-sm font-medium">
              افراد دپارتمان
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-full overflow-y-scroll hide-scrollbar"
        style={{ maxHeight: maxHeightTable }}
      >
        {departmentsMutation?.isLoading ? (
          <div className="w-full flex items-center justify-center mt-5">
            <Loading className="w-14 h-14 text-blacklead animate-pulse" />
          </div>
        ) : (
          departmentsData?.map((department) => (
            <div className="w-full bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-3 px-5 mt-4 grid grid-cols-4 gap-x-4 items-center">
              <div className="col-span-1">
                <Checkbox
                  id={department?.id}
                  state={departmentIds}
                  setState={setDepartmentsIds}
                />
              </div>
              <div className="col-span-1">
                <p className="font-KalamehMed text-sm font-medium">
                  {department?.name}
                </p>
              </div>
              <div className="col-span-1 justify-self-center">
                <p className="font-KalamehMed text-sm font-medium">
                  {department?.admins_count} کاربر
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-5 ">
                <Link
                  to={`/admin/department/edit/${department?.id}`}
                  className="focus:outline-none"
                >
                  <Tooltip
                    svgIcon={
                      <EditIcon className="fill-primary hover:fill-[#4FB3BF] transition-colors duration-500" />
                    }
                    title="ویرایش"
                  />
                </Link>
                {departmentsDeleteMutation?.isLoading &&
                loadingId === department?.id ? (
                  <Loading className="text-primary w-6 h-6 animate-pulse" />
                ) : (
                  <button
                    onClick={() => {
                      departmentsDeleteMutation?.mutate({
                        id: department?.id,
                      });
                      setLoadingId(department?.id);
                    }}
                    className="focus:outline-none"
                  >
                    <Tooltip
                      svgIcon={
                        <DeleteIcon className="fill-[#CA3636] hover:fill-[#7D3C45] transition-colors duration-500" />
                      }
                      title="حذف کردن"
                    />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default PagesFirstTable;
