import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { logs } from "../../../api/ApiClient";
import AdminLogTable from "../../../components/admin/adminLogTable";
import AdminLogHeader from "../../../components/admin/adminLogHeader";
import LogSingleModal from "../../../components/admin/logSingleModal";

const AdminLog = () => {
  const [logsData, setLogsData] = useState([]);
  const logSingleModalRef = useRef();

  const logsMutation = useMutation(logs, {
    onSuccess: (res) => {
      setLogsData(res?.data?.data);
    },
  });
  const logsMutationFunc = (props) => {
    logsMutation?.mutate({
      ...props,
    });
  };
  const openLogSingleModalRef = (data) => {
    logSingleModalRef.current.openModal(data);
  };

  return (
    <>
      <LogSingleModal ref={logSingleModalRef} />
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
                d="M11.9999 22.7614C10.9099 22.7614 9.82992 22.4414 8.97992 21.8114L4.6799 18.6014C3.5399 17.7514 2.6499 15.9714 2.6499 14.5614V7.12141C2.6499 5.58141 3.77992 3.94141 5.22992 3.40141L10.2199 1.53141C11.2099 1.16141 12.7699 1.16141 13.7599 1.53141L18.7499 3.40141C20.1999 3.94141 21.3299 5.58141 21.3299 7.12141V14.5514C21.3299 15.9714 20.4399 17.7414 19.2999 18.5914L14.9999 21.8014C14.1699 22.4414 13.0899 22.7614 11.9999 22.7614ZM10.7499 2.94141L5.75992 4.81141C4.90992 5.13141 4.15991 6.21141 4.15991 7.13141V14.5614C4.15991 15.5114 4.8299 16.8414 5.5799 17.4014L9.87991 20.6114C11.0299 21.4714 12.9699 21.4714 14.1299 20.6114L18.4299 17.4014C19.1899 16.8314 19.8499 15.5114 19.8499 14.5614V7.12141C19.8499 6.21141 19.0999 5.13141 18.2499 4.80141L13.2599 2.93141C12.5799 2.69141 11.4199 2.69141 10.7499 2.94141Z"
                fill="#222427"
              />
              <path
                d="M12 16.25C9.38 16.25 7.25 14.12 7.25 11.5C7.25 8.88 9.38 6.75 12 6.75C14.62 6.75 16.75 8.88 16.75 11.5C16.75 14.12 14.62 16.25 12 16.25ZM12 8.25C10.21 8.25 8.75 9.71 8.75 11.5C8.75 13.29 10.21 14.75 12 14.75C13.79 14.75 15.25 13.29 15.25 11.5C15.25 9.71 13.79 8.25 12 8.25Z"
                fill="#222427"
              />
              <path
                d="M10.9999 13.2517C10.7499 13.2517 10.4999 13.1217 10.3599 12.8917C10.1499 12.5317 10.2599 12.0717 10.6199 11.8617L11.3799 11.4017C11.4599 11.3517 11.4999 11.2717 11.4999 11.1917V10.2617C11.4999 9.85172 11.8399 9.51172 12.2499 9.51172C12.6599 9.51172 12.9999 9.84172 12.9999 10.2517V11.1817C12.9999 11.7917 12.6699 12.3717 12.1499 12.6817L11.3799 13.1417C11.2699 13.2217 11.1299 13.2517 10.9999 13.2517Z"
                fill="#222427"
              />
            </svg>
            لاگ ها
          </h5>
        </div>
        <AdminLogHeader logsMutationFunc={logsMutationFunc} />
        <AdminLogTable
          logsData={logsData}
          logsMutation={logsMutation}
          openLogSingleModalRef={openLogSingleModalRef}
        />
      </div>
    </>
  );
};

export default AdminLog;
