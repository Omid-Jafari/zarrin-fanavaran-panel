import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  activateCoupon,
  blockUser,
  coupons,
  couponsExport,
  deactivateCoupon,
  duplicateCoupon,
} from "../../../api/ApiClient";
import Loading from "../../../components/elements/loading";
import download from "downloadjs";
import SecondSettingSectionTable from "../../../components/store/secondSettingSectionTable";
import NewCoupon from "../../../components/store/newCoupon";
import EditCoupon from "../../../components/store/editCoupon";
import { useRef } from "react";

const SecondSettingSection = ({ newCouponRef }) => {
  let maxHeightFilter = window?.innerHeight - 280;
  let maxHeightTable = window?.innerHeight - 326;
  const editCouponRef = useRef();
  const [couponsData, setCouponsData] = useState([]);
  const [couponsIds, setCouponsIds] = useState([]);
  const [filterData, setFilterData] = useState("");
  const queryClient = useQueryClient();

  const couponsMutation = useQuery(
    ["couponsMutation"],
    (data) => coupons(data),
    {
      onSuccess: (res) => {
        setCouponsData(res?.data?.data);
      },
    }
  );
  const couponsExportMutation = useMutation(couponsExport, {
    onSuccess: (res) => {
      download(
        new Blob([res?.data]),
        "coupons-list.xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
    },
  });
  const mutateCoupons = () => {
    queryClient.invalidateQueries("couponsMutation");
    // couponsMutation?.mutate({
    //   filterData,
    // });
  };
  const activateCouponsMutation = useMutation(activateCoupon, {
    onSuccess: (res) => {
      mutateCoupons();
    },
  });
  const deactivateCouponsMutation = useMutation(deactivateCoupon, {
    onSuccess: (res) => {
      mutateCoupons();
    },
  });
  const duplicateCouponsMutation = useMutation(duplicateCoupon, {
    onSuccess: (res) => {
      mutateCoupons();
    },
  });
  const couponsDeleteMutation = useMutation(blockUser, {
    onSuccess: () => {
      mutateCoupons();
    },
  });

  useEffect(() => {
    mutateCoupons();
  }, []);

  const selectAll = (e) => {
    if (e?.target?.checked) {
      setCouponsIds([]);
      for (let { id } of couponsData) {
        setCouponsIds((prev) => [...prev, id]);
      }
    } else {
      setCouponsIds([]);
    }
  };
  const groupActive = () => {
    for (let id of couponsIds) {
      activateCouponsMutation?.mutate(id);
    }
    setCouponsIds([]);
  };
  const groupDeactive = () => {
    for (let id of couponsIds) {
      deactivateCouponsMutation?.mutate(id);
    }
    setCouponsIds([]);
  };
  const openEditCouponRef = (id) => {
    editCouponRef.current.openModal(id);
  };

  return (
    <>
      <NewCoupon ref={newCouponRef} mutateCoupons={mutateCoupons} />
      <EditCoupon ref={editCouponRef} mutateCoupons={mutateCoupons} />
      <div className="w-full rounded-lg bg-blue-lightt flex items-center px-4 py-3 gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={
              couponsIds?.length === couponsData?.length &&
              couponsData?.length !== 0
            }
            onChange={(e) => selectAll(e)}
          />
          <span className="font-KalamehMed font-medium">انتخاب همه</span>
        </div>
        <button
          className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
          onClick={() => couponsExportMutation?.mutate({})}
        >
          {couponsExportMutation?.isLoading ? (
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
        <button
          className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
          onClick={groupDeactive}
        >
          {deactivateCouponsMutation?.isLoading ? (
            <Loading className="w-14 h-14 text-white animate-pulse" />
          ) : (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 22.75H7C2.59 22.75 1.25 21.41 1.25 17V15C1.25 10.59 2.59 9.25 7 9.25H17C21.41 9.25 22.75 10.59 22.75 15V17C22.75 21.41 21.41 22.75 17 22.75ZM7 10.75C3.42 10.75 2.75 11.43 2.75 15V17C2.75 20.57 3.42 21.25 7 21.25H17C20.58 21.25 21.25 20.57 21.25 17V15C21.25 11.43 20.58 10.75 17 10.75H7Z"
                  fill="white"
                />
                <path
                  d="M6 10.75C5.59 10.75 5.25 10.41 5.25 10V8C5.25 5.1 5.95 1.25 12 1.25C16.48 1.25 18.75 3.18 18.75 7C18.75 7.41 18.41 7.75 18 7.75C17.59 7.75 17.25 7.41 17.25 7C17.25 5.02 16.65 2.75 12 2.75C7.64 2.75 6.75 4.85 6.75 8V10C6.75 10.41 6.41 10.75 6 10.75Z"
                  fill="white"
                />
                <path
                  d="M12 19.25C10.21 19.25 8.75 17.79 8.75 16C8.75 14.21 10.21 12.75 12 12.75C13.79 12.75 15.25 14.21 15.25 16C15.25 17.79 13.79 19.25 12 19.25ZM12 14.25C11.04 14.25 10.25 15.04 10.25 16C10.25 16.96 11.04 17.75 12 17.75C12.96 17.75 13.75 16.96 13.75 16C13.75 15.04 12.96 14.25 12 14.25Z"
                  fill="white"
                />
              </svg>
              غیر فعال سازی
            </>
          )}
        </button>
        <button
          className="flex items-center justify-center gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
          onClick={groupActive}
        >
          {activateCouponsMutation?.isLoading ? (
            <Loading className="w-14 h-14 text-white animate-pulse" />
          ) : (
            <>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 22.75H7C2.59 22.75 1.25 21.41 1.25 17V15C1.25 10.59 2.59 9.25 7 9.25H17C21.41 9.25 22.75 10.59 22.75 15V17C22.75 21.41 21.41 22.75 17 22.75ZM7 10.75C3.42 10.75 2.75 11.43 2.75 15V17C2.75 20.57 3.42 21.25 7 21.25H17C20.58 21.25 21.25 20.57 21.25 17V15C21.25 11.43 20.58 10.75 17 10.75H7Z"
                  fill="white"
                />
                <path
                  d="M6 10.75C5.59 10.75 5.25 10.41 5.25 10V8C5.25 5.1 5.95 1.25 12 1.25C16.48 1.25 18.75 3.18 18.75 7C18.75 7.41 18.41 7.75 18 7.75C17.59 7.75 17.25 7.41 17.25 7C17.25 5.02 16.65 2.75 12 2.75C7.64 2.75 6.75 4.85 6.75 8V10C6.75 10.41 6.41 10.75 6 10.75Z"
                  fill="white"
                />
                <path
                  d="M12 19.25C10.21 19.25 8.75 17.79 8.75 16C8.75 14.21 10.21 12.75 12 12.75C13.79 12.75 15.25 14.21 15.25 16C15.25 17.79 13.79 19.25 12 19.25ZM12 14.25C11.04 14.25 10.25 15.04 10.25 16C10.25 16.96 11.04 17.75 12 17.75C12.96 17.75 13.75 16.96 13.75 16C13.75 15.04 12.96 14.25 12 14.25Z"
                  fill="white"
                />
              </svg>
              فعال سازی
            </>
          )}
        </button>
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
            value={filterData}
            className="flex-1 placeholder:text-[#C4C7C7] text-dark focus:outline-none min-w-0"
            placeholder="جستجو در کدهای تخفیف"
            onChange={(e) => setFilterData(e?.target?.value)}
          />
        </div>
        <button
          className="font-KalamehSemi font-semibold text-sm h-11 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px]"
          onClick={mutateCoupons}
        >
          جستجو
        </button>
      </div>
      <SecondSettingSectionTable
        setCouponsIds={setCouponsIds}
        couponsIds={couponsIds}
        filterData={filterData}
        couponsMutation={couponsMutation}
        couponsDeleteMutation={couponsDeleteMutation}
        couponsData={couponsData}
        activateCouponsMutation={activateCouponsMutation}
        deactivateCouponsMutation={deactivateCouponsMutation}
        duplicateCouponsMutation={duplicateCouponsMutation}
        openEditCouponRef={openEditCouponRef}
      />
    </>
  );
};

export default SecondSettingSection;
