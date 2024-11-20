import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import EditIcon from "../../../public/images/icons/editIcon";
import Checkbox from "../common/checkbox";
import Loading from "../elements/loading";
import Tooltip from "../elements/Tooltip";

const RolesTable = (props) => {
  const { rolesData, roleIds, setRoleIds, rolesMutation, rolesDeleteMutation } =
    props;
  const [loadingId, setLoadingId] = useState(null);
  let maxHeightTable = window?.innerHeight - 281;
  return (
    <>
      <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg">
        <div className="w-full grid grid-cols-4 gap-x-2 items-center h-11 px-5">
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">نقش</p>
          </div>
          <div className="col-span-1  justify-self-center">
            <p className="font-KalamehMed text-sm font-medium">
              افراد دارای نقش
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-full overflow-y-scroll hide-scrollbar"
        style={{ maxHeight: maxHeightTable }}
      >
        {rolesMutation?.isLoading ? (
          <div className="w-full flex items-center justify-center mt-5">
            <Loading className="w-14 h-14 text-blacklead animate-pulse" />
          </div>
        ) : (
          rolesData?.map((role) => (
            <div className="w-full bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-3 px-5 mt-4 grid grid-cols-4 gap-x-4 items-center">
              <div className="col-span-1">
                <Checkbox id={role?.id} state={roleIds} setState={setRoleIds} />
              </div>
              <div className="col-span-1">
                <p className="font-KalamehMed text-sm font-medium">
                  {role?.name}
                </p>
              </div>
              <div className="col-span-1 justify-self-center">
                <p className="font-KalamehMed text-sm font-medium">
                  {role?.admins_count} کاربر
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-5 ">
                <Link
                  to={`/admin/roles/edit/${role?.id}`}
                  className="focus:outline-none"
                >
                  <Tooltip
                    svgIcon={
                      <EditIcon className="fill-primary hover:fill-[#4FB3BF] transition-colors duration-500" />
                    }
                    title="ویرایش"
                  />
                </Link>
                {rolesDeleteMutation?.isLoading && loadingId === role?.id ? (
                  <Loading className="text-primary w-6 h-6 animate-pulse" />
                ) : (
                  <button
                    onClick={() => {
                      rolesDeleteMutation?.mutate({
                        id: role?.id,
                      });
                      setLoadingId(role?.id);
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

export default RolesTable;
