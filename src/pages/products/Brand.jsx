import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../public/images/icons/addIcon";
import EditIcon from "../../../public/images/icons/editIcon";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import { brands, brandsDelete } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "../../components/elements/Tooltip";

const Brand = () => {
  let maxHeightTable = window?.innerHeight - 281;
  const [brandsData, setBrandsData] = useState();
  const [brandIds, setBrandIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const navigate = useNavigate();
  const brandsMutation = useMutation(brands, {
    onSuccess: (res) => {
      setBrandsData(res?.data?.data);
    },
  });
  const brandsDeleteMutation = useMutation(brandsDelete, {
    onSuccess: () => {
      brandsMutation?.mutate({});
    },
  });
  useEffect(() => {
    brandsMutation?.mutate({});
  }, []);
  const selectAll = (e) => {
    if (e?.target?.checked) {
      setBrandIds([]);
      for (let brand of brandsData) {
        setBrandIds((prev) => [...prev, brand?.id]);
      }
    } else {
      setBrandIds([]);
    }
  };

  const groupDelete = () => {
    for (let id of brandIds) {
      brandsDeleteMutation?.mutate({ id });
    }
    setBrandIds([]);
  };

  const handleEditBrand = (item) => {
    navigate("/brand/edit", { state: item });
  };

  return (
    <div className="w-full pt-5 px-5">
      <div className="w-full flex items-center justify-between">
        <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="21"
            fill="none"
            viewBox="0 0 14 21"
          >
            <path
              fill="#222427"
              d="M12.482 0c-.867 0-1.953.092-2.828.459C7.904 1.192 7 3.951 7 3.951s2.596.271 4.346-.46C13.096 2.756 14 .09 14 .09S13.35 0 12.482 0zM7 4c-1.216 0-2.329.445-3.03 1.31-.7.867-.97 2.02-.97 3.344 0 .605-.5 1.233-1.266 2.145C.968 11.71 0 12.924 0 14.643 0 18.206 3.203 21 7 21s7-2.794 7-6.357c0-1.705-.967-2.913-1.732-3.829C11.502 9.9 11 9.259 11 8.655c0-1.324-.27-2.477-.97-3.343C9.328 4.445 8.215 4 7 4zm0 2c.787 0 1.176.2 1.475.568.298.37.525 1.043.525 2.086 0 1.538.998 2.562 1.732 3.442.735.879 1.268 1.594 1.268 2.547C12 16.995 9.831 19 7 19s-5-2.005-5-4.357c0-.977.532-1.686 1.266-2.559C3.999 11.211 5 10.192 5 8.654c0-1.043.227-1.716.525-2.086C5.825 6.2 6.213 6 7 6z"
            ></path>
          </svg>
          برند:
        </h5>
        <Link to={"/brand/add"}>
          <button className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium">
            <AddIcon className="fill-white" />
            افزودن برند
          </button>
        </Link>
      </div>
      <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={
              brandsData?.length !== 0 &&
              brandsData?.length === brandIds?.length
            }
            onChange={(e) => selectAll(e)}
          />
          <span className="font-KalamehMed font-medium">انتخاب همه</span>
        </div>
        <button
          className="font-KalamehMed font-medium text-sm h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 text-[#CA3636] rounded-[4px] flex items-center gap-1"
          onClick={() => groupDelete()}
        >
          <DeleteIcon className="fill-[#CA3636]" />
          حذف
        </button>
        <div className="flex-1 flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-full">
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
            placeholder="جستجو در برندها"
            onChange={(e) => setFilterData(e?.target?.value)}
          />
        </div>
        <button
          className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
          onClick={() => {
            brandsMutation?.mutate({ filterData });
          }}
        >
          جستجو
        </button>
      </div>
      <div className="w-full flex mt-4 justify-end border border-blacklead rounded-lg">
        <div className="w-full grid grid-cols-5 gap-x-2 items-center h-11 px-5">
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">نام برند</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">لوگو</p>
          </div>
          <div className="col-span-1 justify-self-center">
            <p className="font-KalamehMed text-sm font-medium">تعداد محصول</p>
          </div>
        </div>
      </div>
      <div
        className="w-full overflow-y-scroll hide-scrollbar"
        style={{ maxHeight: maxHeightTable }}
      >
        {brandsMutation?.isLoading || brandsDeleteMutation?.isLoading ? (
          <div className="w-full flex items-center justify-center mt-5">
            <Loading className="w-14 h-14 text-blacklead animate-pulse" />
          </div>
        ) : (
          brandsData?.map((brand) => (
            <div className="w-full bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-3 px-5 mt-4 grid grid-cols-5 gap-x-4 items-center">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={
                    brandIds.findIndex((cId) => cId === brand?.id) === -1
                      ? false
                      : true
                  }
                  onChange={() =>
                    setBrandIds((prev) => {
                      const brandId = prev.findIndex(
                        (cId) => cId === brand?.id
                      );

                      if (brandId === -1) {
                        return [...prev, brand?.id];
                      } else {
                        return [
                          ...prev.slice(0, brandId),
                          ...prev.slice(brandId + 1),
                        ];
                      }
                    })
                  }
                />
              </div>

              <div className="col-span-1">
                <p className="font-KalamehMed text-sm font-medium">
                  {brand?.name_fa}
                </p>
              </div>
              <div className="col-span-1">
                <img
                  src={brand?.media?.logo?.file}
                  alt="item pic"
                  className="object-contain max-h-11"
                />
              </div>

              <div className="col-span-1 justify-self-center">
                <p className="font-Kalameh text-sm">
                  {brand?.products_count} محصول
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-end gap-5 ">
                <Tooltip
                  svgIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="fill-[#003E43] hover:fill-[#4FB3BF] transition-colors duration-500"
                    >
                      <path d="M12 16.33c-2.39 0-4.33-1.94-4.33-4.33S9.61 7.67 12 7.67s4.33 1.94 4.33 4.33-1.94 4.33-4.33 4.33zm0-7.16c-1.56 0-2.83 1.27-2.83 2.83s1.27 2.83 2.83 2.83 2.83-1.27 2.83-2.83S13.56 9.17 12 9.17z"></path>
                      <path d="M12 21.02c-3.76 0-7.31-2.2-9.75-6.02-1.06-1.65-1.06-4.34 0-6 2.45-3.82 6-6.02 9.75-6.02s7.3 2.2 9.74 6.02c1.06 1.65 1.06 4.34 0 6-2.44 3.82-5.99 6.02-9.74 6.02zm0-16.54c-3.23 0-6.32 1.94-8.48 5.33-.75 1.17-.75 3.21 0 4.38 2.16 3.39 5.25 5.33 8.48 5.33 3.23 0 6.32-1.94 8.48-5.33.75-1.17.75-3.21 0-4.38-2.16-3.39-5.25-5.33-8.48-5.33z"></path>
                    </svg>
                  }
                  title="مشاهده"
                />

                <button
                  onClick={() => handleEditBrand(brand)}
                  className="focus:outline-none"
                >
                  <Tooltip
                    svgIcon={
                      <EditIcon className="fill-[#003E43] hover:fill-[#4FB3BF] transition-colors duration-500" />
                    }
                    title="ویرایش"
                  />
                </button>
                <button
                  onClick={() =>
                    brandsDeleteMutation?.mutate({
                      id: brand?.id,
                    })
                  }
                  className="focus:outline-none"
                >
                  <Tooltip
                    svgIcon={
                      <DeleteIcon className="fill-[#CA3636] hover:fill-[#7D3C45] transition-colors duration-500" />
                    }
                    title="حذف"
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Brand;
