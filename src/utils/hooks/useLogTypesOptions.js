import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { logsType } from "../../api/ApiClient";

export const useLogTypesOptions = () => {
  const [causersTypeData, setCausersTypeData] = useState([]);
  const logsCausersTypeQuery = useQuery(
    ["logsCausersTypeQuery"],
    (data) => logsType(data),
    {
      onSuccess: (res) => {
        setCausersTypeData(res?.data?.data);
      },
    }
  );
  return {
    causersTypeLoading: logsCausersTypeQuery?.isLoading,
    causersTypeOptions: causersTypeData?.map((type) => {
      return { ...type, value: type?.key };
    }),
  };
};
