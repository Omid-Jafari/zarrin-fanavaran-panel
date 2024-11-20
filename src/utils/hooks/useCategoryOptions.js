import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { categoriesFilterData } from "../../api/ApiClient";

export const useCategoryOptions = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const categoriesDataQuery = useQuery(
    ["categoriesDataQuery"],
    (data) => categoriesFilterData(data),
    {
      onSuccess: (res) => {
        setCategoriesData(res?.data?.data);
      },
    }
  );
  return {
    categoryLoading: categoriesDataQuery?.isLoading,
    categoryOptions: categoriesData?.map((cat) => {
      return { ...cat, value: cat?.id };
    }),
  };
};
