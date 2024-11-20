import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AddIcon from "../../../public/images/icons/addIcon";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import { products, productsDelete, productsExport } from "../../api/ApiClient";
import Loading from "../../components/elements/loading";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import download from "downloadjs";
import CategoriesFilter from "../../components/common/categoriesFilter";
import BrandsFilter from "../../components/common/brandsFilter";
import AttributesFilter from "../../components/common/attributesFilter";
import FeaturesFilter from "../../components/common/featuresFilter";
import Checkbox from "../../components/common/checkbox";

const AllProducts = () => {
  let maxHeightFilter = window?.innerHeight - 280;
  let maxHeightTable = window?.innerHeight - 326;
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
  const productsMutation = useMutation(products, {
    onSuccess: (res) => {
      setProductsData(res?.data?.data);
    },
  });
  const productsExportMutation = useMutation(productsExport, {
    onSuccess: (res) => {
      download(
        new Blob([res?.data]),
        "products-list.xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
    },
  });

  const productsDeleteMutation = useMutation(productsDelete, {
    onSuccess: () => {
      productsMutation?.mutate({
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
      `/all-products${
        queryArray.join("&") === "" ? "" : `?${queryArray.join("&")}`
      }`
    );
  }, [filterCatIds, filterBrandIds, filterAttributeIds, filterFeatureIds]);
  useEffect(() => {
    productsMutation?.mutate({
      filterData,
      category_ids: category_ids?.replaceAll(",", "&category_ids[]="),
      brand_ids: brand_ids?.replaceAll(",", "&brand_ids[]="),
      attribute_ids: attribute_ids?.replaceAll(",", "&attribute_ids[]="),
      feature_ids: feature_ids?.replaceAll(",", "&feature_ids[]="),
    });
  }, [category_ids, brand_ids, attribute_ids, feature_ids]);

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
  const groupDelete = () => {
    for (let id of productsIds) {
      productsDeleteMutation?.mutate({ id });
    }
    setProductsIds([]);
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
        <div className="w-full flex items-center justify-between flex-wrap">
          <h5 className="font-KalamehMed text-lg font-medium flex text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="ml-3"
            >
              <path
                fill="#222427"
                d="M16.5 8.63c-.41 0-.75-.34-.75-.75V6.5c0-1.05-.45-2.07-1.23-2.78-.79-.72-1.81-1.05-2.89-.95-1.8.17-3.38 2.01-3.38 3.93v.97c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-.98c0-2.69 2.17-5.17 4.74-5.42 1.5-.14 2.94.33 4.04 1.34a5.27 5.27 0 011.72 3.89v1.38c0 .41-.34.75-.75.75z"
              ></path>
              <path
                fill="#222427"
                d="M15 22.75H9c-4.62 0-5.48-2.15-5.7-4.24l-.75-5.99c-.11-1.08-.15-2.63.9-3.79.9-1 2.39-1.48 4.55-1.48h8c2.17 0 3.66.49 4.55 1.48 1.04 1.16 1.01 2.71.9 3.77l-.75 6.01c-.22 2.09-1.08 4.24-5.7 4.24zm-7-14c-1.69 0-2.85.33-3.44.99-.49.54-.65 1.37-.52 2.61l.75 5.99c.17 1.6.61 2.92 4.21 2.92h6c3.6 0 4.04-1.31 4.21-2.9l.75-6.01c.13-1.22-.03-2.05-.52-2.6-.59-.67-1.75-1-3.44-1H8z"
              ></path>
              <path
                fill="#222427"
                d="M15.42 13.15c-.56 0-1.01-.45-1.01-1s.45-1 1-1 1 .45 1 1-.44 1-.99 1zM8.42 13.15c-.56 0-1.01-.45-1.01-1s.45-1 1-1 1 .45 1 1-.44 1-.99 1z"
              ></path>
            </svg>
            همه محصولات:
          </h5>
          <div className="p-0 m-0 w-full flex gap-6 pt-4">
            <button
              className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
              onClick={() => {}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M11.88 14.99c-.19 0-.38-.07-.53-.22l-2.56-2.56a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l2.03 2.03 2.03-2.03c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2.56 2.56c-.15.15-.34.22-.53.22z"
                ></path>
                <path
                  fill="#fff"
                  d="M11.88 14.92c-.41 0-.75-.34-.75-.75V4c0-.41.34-.75.75-.75s.75.34.75.75v10.17c0 .41-.34.75-.75.75z"
                ></path>
                <path
                  fill="#fff"
                  d="M12 20.93c-5.15 0-8.75-3.6-8.75-8.75 0-.41.34-.75.75-.75s.75.34.75.75c0 4.27 2.98 7.25 7.25 7.25s7.25-2.98 7.25-7.25c0-.41.34-.75.75-.75s.75.34.75.75c0 5.15-3.6 8.75-8.75 8.75z"
                ></path>
              </svg>
              ورود داده
            </button>
            <button
              className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium ml-auto"
              onClick={() =>
                productsExportMutation?.mutate({
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
                  feature_ids: feature_ids?.replaceAll(",", "&feature_ids[]="),
                })
              }
            >
              {productsExportMutation?.isLoading ? (
                <Loading className="w-14 h-14 text-white animate-pulse" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="M14.44 7.25c-.19 0-.38-.07-.53-.22L11.88 5 9.85 7.03c-.29.29-.77.29-1.06 0a.754.754 0 010-1.06l2.56-2.56c.29-.29.77-.29 1.06 0l2.56 2.56c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M11.88 14.93c-.41 0-.75-.34-.75-.75V4.01c0-.41.34-.75.75-.75s.75.34.75.75v10.17c0 .42-.34.75-.75.75z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M12 20.75c-5.15 0-8.75-3.6-8.75-8.75 0-.41.34-.75.75-.75s.75.34.75.75c0 4.27 2.98 7.25 7.25 7.25s7.25-2.98 7.25-7.25c0-.41.34-.75.75-.75s.75.34.75.75c0 5.15-3.6 8.75-8.75 8.75z"
                    ></path>
                  </svg>
                  خروج داده
                </>
              )}
            </button>
            <Link
              to="/products/add"
              className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
            >
              <AddIcon className="fill-white" />
              افزودن محصول جدید
            </Link>
          </div>
        </div>
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
              placeholder="جستجو در محصولات"
              onChange={(e) => setFilterData(e?.target?.value)}
            />
          </div>
          <button
            className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
            onClick={() => {
              productsMutation?.mutate({
                filterData,
                category_ids: category_ids?.replaceAll(",", "&category_ids[]="),
                brand_ids: brand_ids?.replaceAll(",", "&brand_ids[]="),
                attribute_ids: attribute_ids?.replaceAll(
                  ",",
                  "&attribute_ids[]="
                ),
                feature_ids: feature_ids?.replaceAll(",", "&feature_ids[]="),
              });
            }}
          >
            جستجو
          </button>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex-1 w-full">
            <div className="w-full flex mt-4 justify-end bg-white border border-blacklead rounded-lg">
              <div className="w-full flex items-center">
                <div className="w-[2.129rem] flex justify-center"></div>
                <div className="flex-1 w-full flex gap-x-4 items-center h-11 px-5">
                  <div className="w-[12.5%]">
                    <p className="font-KalamehMed text-sm font-medium">
                      کد محصول
                    </p>
                  </div>
                  <div className="w-[25%]">
                    <p className="font-KalamehMed text-sm font-medium">
                      نام محصول
                    </p>
                  </div>
                  <div className="w-[18.75%]">
                    <p className="font-KalamehMed text-sm font-medium">قیمت</p>
                  </div>
                  <div className="w-[12.5%]">
                    <p className="font-KalamehMed text-sm font-medium">
                      موجودی
                    </p>
                  </div>
                  <div className="w-[18.75%]">
                    <p className="font-KalamehMed text-sm font-medium">
                      دسته بندی
                    </p>
                  </div>
                  <div className="w-[12.5%]">
                    <p className="font-KalamehMed text-sm font-medium">وضعیت</p>
                  </div>
                  <div className="w-[120px]"></div>
                </div>
              </div>
            </div>
            {productsMutation?.isLoading ||
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
                className="overflow-y-scroll hide-scrollbar w-full"
                style={{ maxHeight: maxHeightTable }}
              >
                {productsData?.map((product) => (
                  <div
                    className={`w-full flex items-center mt-4 rounded-lg p-0.5 ${
                      productsIds.findIndex((cId) => cId === product?.id) === -1
                        ? ""
                        : "bg-blacklead"
                    }`}
                  >
                    <div className="w-[2.129rem] flex justify-center">
                      <Checkbox
                        className="w-[18px] h-[18px] rounded-[2px] bg-blue-lightt relative cursor-pointer"
                        id={product?.id}
                        state={productsIds}
                        setState={setProductsIds}
                      />
                    </div>
                    <div className="flex-1 w-full bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-5 px-5 flex gap-x-4 items-start">
                      <div className="w-[12.5%]">
                        <p className="text-sm">#{product?.id}</p>
                      </div>
                      <div className="w-[25%]">
                        <p
                          className="font-KalamehMed text-sm font-medium line-clamp-2"
                          title={product?.name_fa}
                        >
                          {product?.name_fa}
                        </p>
                      </div>
                      <div className="w-[18.75%] flex flex-col line-clamp-2">
                        {product?.has_discount === 1 ? (
                          <>
                            <p className="text-sm text-justify">
                              {product?.price_prettified} تومان
                            </p>
                            <p className="text-sm text-justify text-[#CA3636]">
                              ({product?.discounted_prettified} تومان)
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-justify">
                            {product?.discounted_prettified} تومان
                          </p>
                        )}
                      </div>
                      <div className="w-[12.5%]">
                        <p className="text-sm text-primary">
                          {product?.in_stock === 1 ? "موجود" : "نا موجود"}
                        </p>
                      </div>
                      <div
                        className="w-[18.75%] line-clamp-2"
                        title={product?.categories
                          ?.map((category) => category?.name)
                          .join(" / ")}
                      >
                        <p className="text-sm">
                          {product?.categories
                            ?.map((category) => category?.name)
                            .join(" / ")}
                        </p>
                      </div>
                      <div className="w-[12.5%]">
                        <p className="text-sm">{product?.status_info?.name}</p>
                      </div>
                      <div className="w-[120px]">
                        <Link
                          className="flex items-center justify-center w-full gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 text-white rounded-[4px] font-medium font-KalamehMed text-xs"
                          to={`/products/edit/${product?.id}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              fill="#fff"
                              d="M11.25 17.063h-4.5c-4.072 0-5.813-1.74-5.813-5.813v-4.5C.938 2.678 2.678.937 6.75.937h4.5c4.072 0 5.813 1.74 5.813 5.813v4.5c0 4.072-1.74 5.813-5.813 5.813zm-4.5-15c-3.458 0-4.688 1.23-4.688 4.687v4.5c0 3.457 1.23 4.688 4.688 4.688h4.5c3.457 0 4.688-1.23 4.688-4.688v-4.5c0-3.458-1.23-4.688-4.688-4.688h-4.5z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M9 9.75A.747.747 0 018.25 9c0-.412.338-.75.75-.75s.75.338.75.75-.33.75-.75.75zM12 9.75a.747.747 0 01-.75-.75c0-.412.338-.75.75-.75s.75.338.75.75-.33.75-.75.75zM6 9.75A.747.747 0 015.25 9c0-.412.338-.75.75-.75s.75.338.75.75-.33.75-.75.75z"
                            ></path>
                          </svg>
                          جزئیات
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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

export default AllProducts;
