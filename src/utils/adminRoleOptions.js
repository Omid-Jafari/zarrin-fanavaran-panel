import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { dataRole } from "../api/ApiClient";

export const adminRoleOptions = () => {
  const [roleData, setRoleData] = useState([]);
  const dataRolesQuery = useQuery(
    ["dataRolesQuery"],
    (data) => dataRole(data),
    {
      onSuccess: (res) => {
        setRoleData(res?.data?.data);
      },
    }
  );
  return {
    loading: dataRolesQuery?.isLoading,
    options: roleData?.map((role) => {
      return { ...role, value: role?.id };
    }),
  };
};
