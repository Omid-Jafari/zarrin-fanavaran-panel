import { Check, CheckCircle, CheckOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../../public/images/icons/editIcon";
import Checkbox from "../common/checkbox";
import Loading from "../elements/loading";
import Tooltip from "../elements/Tooltip";

const AdminManagmentTable = (props) => {
  const {
    adminsData,
    adminIds,
    setAdminIds,
    adminsMutation,
    adminsBlockMutation,
    adminsUnblockMutation,
  } = props;
  const [loadingId, setLoadingId] = useState(null);
  let maxHeightTable = window?.innerHeight - 281;
  return (
    <>
      <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg">
        <div className="w-full grid grid-cols-7 gap-x-2 items-center h-11 px-5">
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">آواتار</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">
              نام و نام خانوادگی
            </p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">شماره موبایل</p>
          </div>
          <div className="col-span-1 justify-self-center">
            <p className="font-KalamehMed text-sm font-medium">نقش در سایت</p>
          </div>
          <div className="col-span-1 justify-self-center">
            <p className="font-KalamehMed text-sm font-medium">وضعیت</p>
          </div>
        </div>
      </div>
      <div
        className="w-full overflow-y-scroll hide-scrollbar"
        style={{ maxHeight: maxHeightTable }}
      >
        {adminsMutation?.isLoading ? (
          <div className="w-full flex items-center justify-center mt-5">
            <Loading className="w-14 h-14 text-blacklead animate-pulse" />
          </div>
        ) : (
          adminsData?.map((admin) => (
            <div className="w-full bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-3 px-5 mt-4 grid grid-cols-7 gap-x-4 items-center">
              <div className="col-span-1">
                <Checkbox
                  id={admin?.id}
                  state={adminIds}
                  setState={setAdminIds}
                />
              </div>
              <div className="col-span-1">
                <img
                  src={admin?.media?.avatar?.file}
                  alt="item pic"
                  className="object-cover w-[60px] h-[60px] rounded-full overflow-hidden object-center"
                />
              </div>

              <div className="col-span-1">
                <p className="font-KalamehMed text-sm font-medium">
                  {admin?.full_name}
                </p>
              </div>
              <div className="col-span-1">
                <p className="font-KalamehMed text-sm font-medium">
                  {admin?.mobile_number}
                </p>
              </div>

              <div className="col-span-1 justify-self-center">
                <p className="font-Kalameh text-sm">{admin?.role?.name}</p>
              </div>
              <div className="col-span-1 justify-self-center">
                <p
                  className={`font-Kalameh text-sm ${
                    admin?.status === "ACTIVE" ? "text-primary" : "text-red-600"
                  }`}
                >
                  {admin?.status_info?.name}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-5 ">
                <Link
                  to={`/admin/management/edit/${admin?.id}`}
                  className="focus:outline-none"
                >
                  <Tooltip
                    svgIcon={
                      <EditIcon className="fill-primary hover:fill-[#4FB3BF] transition-colors duration-500" />
                    }
                    title="ویرایش"
                  />
                </Link>
                {admin?.status === "ACTIVE" ? (
                  adminsBlockMutation?.isLoading && loadingId === admin?.id ? (
                    <Loading className="text-primary w-6 h-6 animate-pulse" />
                  ) : (
                    <button
                      onClick={() => {
                        adminsBlockMutation?.mutate({
                          id: admin?.id,
                        });
                        setLoadingId(admin?.id);
                      }}
                      className="focus:outline-none"
                    >
                      <Tooltip
                        svgIcon={
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-[#CA3636] hover:fill-[#7D3C45] transition-colors duration-500"
                          >
                            <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" />
                            <path d="M4.9 19.7514C4.71 19.7514 4.52 19.6814 4.37 19.5314C4.08 19.2414 4.08 18.7614 4.37 18.4714L18.37 4.47141C18.66 4.18141 19.14 4.18141 19.43 4.47141C19.72 4.76141 19.72 5.24141 19.43 5.53141L5.43 19.5314C5.28 19.6814 5.09 19.7514 4.9 19.7514Z" />
                          </svg>
                        }
                        title="مسدود کردن"
                      />
                    </button>
                  )
                ) : adminsUnblockMutation.isLoading &&
                  loadingId === admin?.id ? (
                  <Loading className="text-primary w-6 h-6 animate-pulse" />
                ) : (
                  <button
                    onClick={() => {
                      adminsUnblockMutation?.mutate({
                        id: admin?.id,
                      });
                      setLoadingId(admin?.id);
                    }}
                    className="focus:outline-none"
                  >
                    <Tooltip
                      svgIcon={
                        <Check
                          className="text-primary hover:text-[#4FB3BF] transition-colors duration-500"
                          width="24px"
                        />
                      }
                      title="فعال کردن"
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

export default AdminManagmentTable;
