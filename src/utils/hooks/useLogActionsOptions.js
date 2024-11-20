import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { logsAction } from "../../api/ApiClient";

export const useLogActionsOptions = () => {
  const [actionsData, setActionsData] = useState([]);
  const logsActionsQuery = useQuery(
    ["logsActionsQuery"],
    (data) => logsAction(data),
    {
      onSuccess: (res) => {
        setActionsData(res?.data?.data);
      },
    }
  );
  return {
    actionLoading: logsActionsQuery?.isLoading,
    actionOptions: actionsData?.map((role) => {
      return { ...role, value: role?.key };
    }),
  };
};
