import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { productsItems, productsDelete } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import CategoriesFilter from "../../components/common/categoriesFilter";
import ChangePriceTable from "./ChangePriceTable";
import GroupePriceChange from "./GroupePriceChange";
import BrandsFilter from "../../components/common/brandsFilter";
import AttributesFilter from "../../components/common/attributesFilter";
import FeaturesFilter from "../../components/common/featuresFilter";

const ChangePrice = () => {
  let maxHeightFilter = window?.innerHeight - 359;
  let maxHeightTable = window?.innerHeight - 431;
  const [productsData, setProductsData] = useState([]);
  const [productsIds, setProductsIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const [subMenu, setSubMenu] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category_ids = searchParams.get("category_ids") || null;
  const brand_ids = searchParams.get("brand_ids") || null;
  const attribute_ids = searchParams.get("attribute_ids") || null;
  const feature_ids = searchParams.get("feature_ids") || null;
  const [filterCatIds, setFilterCatIds] = useState(
    category_ids?.split(",")?.map(Number) || []
  );
  const [filterBrandIds, setFilterBrandIds] = useState(
    brand_ids?.split(",")?.map(Number) || []
  );
  const [filterAttributeIds, setFilterAttributeIds] = useState(
    attribute_ids?.split(",")?.map(Number) || []
  );
  const [filterFeatureIds, setFilterFeatureIds] = useState(
    feature_ids?.split(",")?.map(Number) || []
  );
  const productsItemsMutation = useMutation(productsItems, {
    onSuccess: (res) => {
      setProductsData(res?.data?.data);
    },
  });

  const productsDeleteMutation = useMutation(productsDelete, {
    onSuccess: () => {
      productsItemsMutation?.mutate({
        filterData,
        category_ids: category_ids?.replaceAll(",", "&category_ids[]="),
        brand_ids: brand_ids?.replaceAll(",", "&brand_ids[]="),
        attribute_ids: attribute_ids?.replaceAll(",", "&attribute_ids[]="),
        feature_ids: feature_ids?.replaceAll(",", "&feature_ids[]="),
      });
    },
  });

  useEffect(() => {
    const categoryData = filterCatIds?.map((value) => `${value}`).join(",");
    const brandData = filterBrandIds?.map((value) => `${value}`).join(",");
    const attributeData = filterAttributeIds
      ?.map((value) => `${value}`)
      .join(",");
    const featureData = filterFeatureIds?.map((value) => `${value}`).join(",");
    let queryArray = [];
    if (categoryData) {
      queryArray.push(`category_ids=${categoryData}`);
    }
    if (brandData) {
      queryArray.push(`brand_ids=${brandData}`);
    }
    if (attributeData) {
      queryArray.push(`attribute_ids=${attributeData}`);
    }
    if (featureData) {
      queryArray.push(`feature_ids=${featureData}`);
    }
    navigate(
      `/price-change${
        queryArray.join("&") === "" ? "" : `?${queryArray.join("&")}`
      }`
    );
  }, [filterCatIds, filterBrandIds, filterAttributeIds, filterFeatureIds]);
  useEffect(() => {
    productsItemsMutation?.mutate({
      filterData,
      category_ids: category_ids?.replaceAll(",", "&category_ids[]="),
      brand_ids: brand_ids?.replaceAll(",", "&brand_ids[]="),
      attribute_ids: attribute_ids?.replaceAll(",", "&attribute_ids[]="),
      feature_ids: feature_ids?.replaceAll(",", "&feature_ids[]="),
    });
  }, [category_ids, brand_ids, attribute_ids, feature_ids]);

  const mutateProducts = () => {
    productsItemsMutation?.mutate({
      filterData,
      category_ids: category_ids?.replaceAll(",", "&category_ids[]="),
      brand_ids: brand_ids?.replaceAll(",", "&brand_ids[]="),
      attribute_ids: attribute_ids?.replaceAll(",", "&attribute_ids[]="),
      feature_ids: feature_ids?.replaceAll(",", "&feature_ids[]="),
    });
  };

  const selectAll = (e) => {
    if (e?.target?.checked) {
      setProductsIds([]);
      for (let { id } of productsData) {
        setProductsIds((prev) => [...prev, id]);
      }
    } else {
      setProductsIds([]);
    }
  };
  const openSubmenu = (filter) => {
    setSubMenu({
      show: subMenu?.show && subMenu?.id == filter?.id ? false : true,
      id: filter.id,
    });
  };

  return (
    <>
      <div className="w-full px-5 pt-5">
        <div className="w-full flex flex-col gap-3">
          <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#222427"
                d="M6.88 18.9c-.41 0-.75-.34-.75-.75v-2.07c0-.41.34-.75.75-.75s.75.34.75.75v2.07c0 .42-.34.75-.75.75zM12 18.9c-.41 0-.75-.34-.75-.75V14c0-.41.34-.75.75-.75s.75.34.75.75v4.15c0 .42-.34.75-.75.75zM17.12 18.9c-.41 0-.75-.34-.75-.75v-6.22c0-.41.34-.75.75-.75s.75.34.75.75v6.22c0 .42-.33.75-.75.75zM6.88 13.18c-.34 0-.64-.23-.73-.57-.1-.4.14-.81.55-.91 3.68-.92 6.92-2.93 9.39-5.8l.46-.54c.27-.31.74-.35 1.06-.08.31.27.35.74.08 1.06l-.46.54a19.513 19.513 0 01-10.17 6.28c-.06.02-.12.02-.18.02z"
              ></path>
              <path
                fill="#222427"
                d="M17.12 9.52c-.41 0-.75-.34-.75-.75V6.6h-2.18c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.93c.41 0 .75.34.75.75v2.93c0 .41-.33.74-.75.74z"
              ></path>
              <path
                fill="#222427"
                d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9z"
              ></path>
            </svg>
            افزایش / کاهش قیمت کلی محصولات:
          </h5>
          <GroupePriceChange
            selectedProducts={productsData?.filter((product) =>
              productsIds.includes(product?.id)
            )}
            mutateProducts={mutateProducts}
            setProductsIds={setProductsIds}
          />
        </div>
        <div className="flex gap-4 w-full items-start">
          <div className="flex-1 flex flex-col w-full">
            <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4 mt-5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={
                    productsIds?.length === productsData?.length &&
                    productsData?.length !== 0
                  }
                  onChange={(e) => selectAll(e)}
                />
                <span className="font-KalamehMed font-medium">انتخاب همه</span>
              </div>
              <div className="flex-1 flex items-center gap-3 h-11 bg-white rounded-lg px-2">
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
                  className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none min-w-0"
                  placeholder="جستجو در محصولات"
                  onChange={(e) => setFilterData(e?.target?.value)}
                />
              </div>
              <button
                className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
                onClick={() => {
                  productsItemsMutation?.mutate({
                    filterData,
                    category_ids: category_ids?.replaceAll(
                      ",",
                      "&category_ids[]="
                    ),
                    brand_ids: brand_ids?.replaceAll(",", "&brand_ids[]="),
                    attribute_ids: attribute_ids?.replaceAll(
                      ",",
                      "&attribute_ids[]="
                    ),
                    feature_ids: feature_ids?.replaceAll(
                      ",",
                      "&feature_ids[]="
                    ),
                  });
                }}
              >
                جستجو
              </button>
            </div>
            {productsItemsMutation?.isLoading ||
            productsDeleteMutation?.isLoading ? (
              <div className="w-full flex items-center justify-center mt-5">
                <Loading className="w-14 h-14 text-blacklead animate-pulse" />
              </div>
            ) : productsData?.length === 0 && filterData ? (
              <div className="w-full flex justify-center mt-5">
                متاسفانه هیچ محصولی یافت نشد
              </div>
            ) : (
              <div
                className="w-full flex flex-col overflow-y-auto overflow-x-visible hide-scrollbar"
                style={{ maxHeight: maxHeightTable }}
              >
                {productsData?.map((product) => (
                  <ChangePriceTable
                    product={product}
                    productsIds={productsIds}
                    setProductsIds={setProductsIds}
                    mutateProducts={mutateProducts}
                  />
                ))}
              </div>
            )}
          </div>
          {/* FILTER SECTION */}
          <div
            className="overflow-y-scroll hide-scrollbar bg-[#DBEEF6] rounded-lg p-4 mt-4 min-w-[225px] max-w-[280px]"
            style={{ maxHeight: maxHeightFilter }}
          >
            <h6 className="font-KalamehMed text-sm font-medium flex items-center text-black gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#222427"
                  d="M10.94 22.65c-.48 0-.95-.12-1.39-.36a2.699 2.699 0 01-1.41-2.38v-5.3c0-.5-.33-1.25-.64-1.63L3.76 9.02c-.63-.63-1.11-1.71-1.11-2.52V4.2c0-1.6 1.21-2.85 2.75-2.85h13.2c1.52 0 2.75 1.23 2.75 2.75v2.2c0 1.05-.63 2.24-1.22 2.83l-4.33 3.83c-.42.35-.75 1.12-.75 1.74V19c0 .89-.56 1.92-1.26 2.34l-1.38.89c-.45.28-.96.42-1.47.42zM5.4 2.85c-.7 0-1.25.59-1.25 1.35v2.3c0 .37.3 1.09.68 1.47l3.81 4.01c.51.63 1.01 1.68 1.01 2.62v5.3c0 .65.45.97.64 1.07.42.23.93.23 1.32-.01l1.39-.89c.28-.17.56-.71.56-1.07v-4.3c0-1.07.52-2.25 1.27-2.88l4.28-3.79c.34-.34.75-1.15.75-1.74V4.1c0-.69-.56-1.25-1.25-1.25H5.4z"
                ></path>
                <path
                  fill="#222427"
                  d="M6 10.75a.83.83 0 01-.4-.11.76.76 0 01-.24-1.04l4.93-7.9a.747.747 0 111.27.79l-4.93 7.9c-.14.23-.38.36-.63.36z"
                ></path>
              </svg>
              فیلتر توسط:
            </h6>
            <CategoriesFilter
              setFilterCatIds={setFilterCatIds}
              filterCatIds={filterCatIds}
              subMenu={subMenu}
              openSubmenu={openSubmenu}
            />
            <BrandsFilter
              setFilterBrandIds={setFilterBrandIds}
              filterBrandIds={filterBrandIds}
            />
            <AttributesFilter
              setFilterAttributeIds={setFilterAttributeIds}
              filterAttributeIds={filterAttributeIds}
              subMenu={subMenu}
              openSubmenu={openSubmenu}
            />
            <FeaturesFilter
              setFilterFeatureIds={setFilterFeatureIds}
              filterFeatureIds={filterFeatureIds}
              subMenu={subMenu}
              openSubmenu={openSubmenu}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePrice;
