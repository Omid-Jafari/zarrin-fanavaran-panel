import { useState } from "react";
import EditIcon from "../../../public/images/icons/editIcon";
import Loading from "../../components/elements/loading";
import Checkbox from "../common/checkbox";

const SecondSettingSectionTable = (props) => {
  const {
    setCouponsIds,
    couponsIds,
    filterData,
    couponsMutation,
    couponsDeleteMutation,
    couponsData,
    activateCouponsMutation,
    deactivateCouponsMutation,
    duplicateCouponsMutation,
    openEditCouponRef,
  } = props;
  const [activateLoadingId, setActivateLoadingId] = useState(null);

  return (
    <>
      {/* header content */}
      <div className="w-full mt-4 flex items-center bg-white border border-blacklead rounded-lg px-5">
        <div className="w-[2.129rem] flex justify-center"></div>
        <div className="flex-1 w-full grid grid-cols-8 gap-x-4 items-center h-11">
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">تگ</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">کد تخفیف</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">وضعیت</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">دفعات استفاده</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">مقدار</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">زمان انقضا</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">استفاده برای</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">کاربران</p>
          </div>
        </div>
        <div className="w-[166px]"></div>
      </div>
      {/* table rows */}
      {couponsMutation?.isLoading || couponsDeleteMutation?.isLoading ? (
        <div className="w-full flex items-center justify-center mt-5">
          <Loading className="w-14 h-14 text-blacklead animate-pulse" />
        </div>
      ) : couponsData?.length === 0 && filterData ? (
        <div className="w-full flex justify-center mt-5">
          متاسفانه هیچ کد تخفیفی یافت نشد
        </div>
      ) : (
        <div
          className="overflow-y-scroll hide-scrollbar w-full"
          // style={{ maxHeight: maxHeightTable }}
        >
          {couponsData?.map((coupon) => (
            <div
              className={`w-full border-2 flex items-start mt-4 transition-colors duration-300 rounded-lg p-5 ${
                couponsIds.findIndex((pId) => pId === coupon?.id) !== -1
                  ? "border-blacklead"
                  : "border-transparent"
              } ${
                coupon?.status === "ACTIVE"
                  ? " bg-blue-lightt hover:bg-[#C0E2F0]"
                  : "bg-[#EFF1F1]"
              }`}
            >
              <div className="w-[2.129rem] flex justify-start">
                <Checkbox
                  id={coupon?.id}
                  state={couponsIds}
                  setState={setCouponsIds}
                />
              </div>
              <div className="flex-1 flex items-center">
                <div className="flex-1 w-full grid grid-cols-8 gap-x-4 items-start">
                  <div className="col-span-1">
                    <p className="text-sm">#{coupon?.name}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm font-medium font-KalamehMed">
                      {coupon?.code}
                    </p>
                  </div>
                  <div className="col-span-1 flex flex-col gap-1">
                    <p
                      className={`w-full flex justify-center items-center bg-white rounded-md h-10 ${
                        coupon?.status === "ACTIVE"
                          ? "text-cyann"
                          : "text-[#F91414]"
                      }`}
                    >
                      {coupon?.status_info?.name}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-primary">{coupon?.used_count}</p>
                  </div>
                  <div className="col-span-1 flex flex-col gap-1">
                    <p className="text-sm">
                      {coupon?.discount.toLocaleString()}
                    </p>
                    <p className="text-sm">
                      {coupon?.discount_type === "PERCENT" ? "درصد" : "تومان"}
                    </p>
                  </div>
                  <div className="col-span-1 flex flex-col gap-1">
                    <p className="text-sm">
                      {coupon?.jexpire_at.split(" ")[1]}
                    </p>
                    <p className="text-sm">
                      {coupon?.jexpire_at.split(" ")[0]}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p
                      className="text-sm line-clamp-2 text-primary"
                      title={coupon?.use_for?.join("/")}
                    >
                      {coupon?.use_for?.join("/")}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm text-primary">
                      {coupon?.users_count}
                    </p>
                  </div>
                </div>
                <div className="w-[166px] flex items-center gap-3">
                  {coupon?.status === "ACTIVE" ? (
                    <button
                      onClick={() => {
                        deactivateCouponsMutation.mutate(coupon?.id);
                        setActivateLoadingId(coupon?.id);
                      }}
                      className="flex px-3 items-center justify-center w-full gap-1.5 h-11 hover:bg-primary bg-cyann transition-colors duration-500 text-white rounded-[4px] font-medium font-KalamehMed text-xs"
                    >
                      {deactivateCouponsMutation?.isLoading &&
                      activateLoadingId === coupon?.id ? (
                        <Loading className="w-11 h-11 text-white animate-pulse" />
                      ) : (
                        "غیر فعال سازی"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        activateCouponsMutation.mutate(coupon?.id);
                        setActivateLoadingId(coupon?.id);
                      }}
                      className="flex px-3 items-center justify-center w-full gap-1.5 h-11 hover:bg-[#747777] bg-[#8E9191] transition-colors duration-500 text-white rounded-[4px] font-medium font-KalamehMed text-xs"
                    >
                      {activateCouponsMutation?.isLoading &&
                      activateLoadingId === coupon?.id ? (
                        <Loading className="w-11 h-11 text-white animate-pulse" />
                      ) : (
                        "فعال سازی"
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      duplicateCouponsMutation.mutate({
                        id: coupon?.id,
                        number: 1,
                      });
                      setActivateLoadingId(coupon?.id);
                    }}
                    className="outline-none max-w-[25px]"
                  >
                    {duplicateCouponsMutation?.isLoading &&
                    activateLoadingId === coupon?.id ? (
                      <Loading className="w-9 h-9 text-cyann animate-pulse" />
                    ) : (
                      <svg
                        className="flex-shrink-0 flex-grow-0"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.8182 11.1V6.9C22.8182 3.4 21.4182 2 17.9182 2H13.7182C10.2182 2 8.81824 3.4 8.81824 6.9V8H11.9182C15.4182 8 16.8182 9.4 16.8182 12.9V16H17.9182C21.4182 16 22.8182 14.6 22.8182 11.1Z"
                          stroke={`#${
                            coupon?.status === "ACTIVE" ? "00838F" : "8E9191"
                          }`}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.8182 17.1V12.9C16.8182 9.4 15.4182 8 11.9182 8H7.71824C4.21824 8 2.81824 9.4 2.81824 12.9V17.1C2.81824 20.6 4.21824 22 7.71824 22H11.9182C15.4182 22 16.8182 20.6 16.8182 17.1Z"
                          stroke={`#${
                            coupon?.status === "ACTIVE" ? "00838F" : "8E9191"
                          }`}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.89832 14.9998L8.84832 16.9498L12.7383 13.0498"
                          stroke={`#${
                            coupon?.status === "ACTIVE" ? "00838F" : "8E9191"
                          }`}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={() => openEditCouponRef(coupon?.id)}
                    className="outline-none"
                  >
                    <EditIcon
                      className={`transition-colors duration-500 flex-shrink-0 flex-grow-0 ${
                        coupon?.status === "ACTIVE"
                          ? "hover:fill-[#003E43] fill-primary"
                          : "fill-[#8E9191]"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SecondSettingSectionTable;
