import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { logsCausers } from "../../api/ApiClient";

export const useLogCausersOptions = () => {
  const [causersData, setCausersData] = useState([]);
  const logsCausersQuery = useQuery(
    ["logsCausersQuery"],
    (data) => logsCausers(data),
    {
      onSuccess: (res) => {
        setCausersData(res?.data?.data);
      },
    }
  );
  return {
    causersLoading: logsCausersQuery?.isLoading,
    causersOptions: causersData?.map((role) => {
      return { ...role, value: role?.key };
    }),
  };
};
