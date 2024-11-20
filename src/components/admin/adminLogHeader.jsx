import React, { useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { postCausers } from "../../api/ApiClient";
import { useOnClickOutside } from "../../utils/OutSideClick";
import PrimarySelectBox from "../common/primarySelectBox";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import Loading from "../elements/loading";
import { WarningAmberRounded } from "@mui/icons-material";
import { useLogActionsOptions } from "../../utils/hooks/useLogActionsOptions";
import { useLogTypesOptions } from "../../utils/hooks/useLogTypesOptions";
import { useLogCausersOptions } from "../../utils/hooks/useLogCausersOptions";

const AdminLogHeader = (props) => {
  const { logsMutationFunc } = props;

  const [usersItem, setUsersItem] = useState(null);
  const [causersTypeItem, setCausersTypeItem] = useState(null);
  const [actionItem, setActionItem] = useState(null);
  const [datePickerData, setDatePickerData] = useState(
    new DateObject({ calendar: persian, locale: persian_fa })
  );
  const [filterData, setFilterData] = useState("");
  const [usersTypeItem, setUsersTypeItem] = useState(null);
  const [usersData, setUsersData] = useState({ show: false, data: [] });

  const userRef = useRef();
  const { causersOptions, causersLoading } = useLogCausersOptions();
  const { causersTypeOptions, causersTypeLoading } = useLogTypesOptions();
  const { actionOptions, actionLoading } = useLogActionsOptions();

  const causersFilterDataMutation = useMutation(
    () => postCausers({ causersItem: usersTypeItem, filterData }),

    {
      onSuccess: (res) => {
        setUsersData((prev) => {
          return { ...prev, data: res?.data?.data };
        });
      },
    }
  );
  useOnClickOutside(userRef, () =>
    setUsersData((prev) => {
      return { ...prev, show: false };
    })
  );
  function handleChange(value) {
    setDatePickerData(value);
  }
  const getCausersValue = (value) => {
    setUsersTypeItem(value);
  };
  const getCausersTypeValue = (value) => {
    setCausersTypeItem(value);
  };
  const getActionValue = (value) => {
    setActionItem(value);
  };

  useEffect(() => {
    logsMutationFunc({
      datePickerData,
      usersTypeItem,
      usersItem,
      causersTypeItem,
      actionItem,
    });
  }, [datePickerData, usersTypeItem, usersItem, causersTypeItem, actionItem]);
  useEffect(() => {
    if (usersTypeItem && filterData) {
      causersFilterDataMutation.mutate();
    }
  }, [filterData, usersTypeItem]);

  return (
    <div className="w-full rounded-lg bg-blue-lightt grid grid-cols-3 items-center px-4 py-3 gap-4 mt-5">
      <div className="col-span-1 flex items-center gap-3 h-11 bg-white rounded-lg pr-2 flex-shrink">
        <div className="flex items-center gap-2 text-primary">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99997 5.75C7.58997 5.75 7.24997 5.41 7.24997 5V2C7.24997 1.59 7.58997 1.25 7.99997 1.25C8.40997 1.25 8.74997 1.59 8.74997 2V5C8.74997 5.41 8.40997 5.75 7.99997 5.75Z"
              fill="#00838F"
            />
            <path
              d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z"
              fill="#00838F"
            />
            <path
              d="M20.5 9.83984H3.49997C3.08997 9.83984 2.74997 9.49984 2.74997 9.08984C2.74997 8.67984 3.08997 8.33984 3.49997 8.33984H20.5C20.91 8.33984 21.25 8.67984 21.25 9.08984C21.25 9.49984 20.91 9.83984 20.5 9.83984Z"
              fill="#00838F"
            />
            <path
              d="M16 22.75H7.99997C4.34997 22.75 2.24997 20.65 2.24997 17V8.5C2.24997 4.85 4.34997 2.75 7.99997 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V17C21.75 20.65 19.65 22.75 16 22.75ZM7.99997 4.25C5.13997 4.25 3.74997 5.64 3.74997 8.5V17C3.74997 19.86 5.13997 21.25 7.99997 21.25H16C18.86 21.25 20.25 19.86 20.25 17V8.5C20.25 5.64 18.86 4.25 16 4.25H7.99997Z"
              fill="#00838F"
            />
            <path
              d="M8.49997 14.5C8.36997 14.5 8.23996 14.47 8.11996 14.42C7.99996 14.37 7.88998 14.3 7.78998 14.21C7.69998 14.11 7.62996 14 7.57996 13.88C7.52996 13.76 7.49997 13.63 7.49997 13.5C7.49997 13.24 7.60998 12.98 7.78998 12.79C7.88998 12.7 7.99996 12.63 8.11996 12.58C8.29996 12.5 8.49998 12.48 8.69998 12.52C8.75998 12.53 8.81997 12.55 8.87997 12.58C8.93997 12.6 8.99997 12.63 9.05997 12.67C9.10997 12.71 9.15996 12.75 9.20996 12.79C9.24996 12.84 9.29996 12.89 9.32996 12.94C9.36996 13 9.39998 13.06 9.41998 13.12C9.44998 13.18 9.46998 13.24 9.47998 13.3C9.48998 13.37 9.49997 13.43 9.49997 13.5C9.49997 13.76 9.38996 14.02 9.20996 14.21C9.01996 14.39 8.75997 14.5 8.49997 14.5Z"
              fill="#00838F"
            />
            <path
              d="M12 14.4989C11.74 14.4989 11.48 14.3889 11.29 14.2089C11.25 14.1589 11.21 14.1089 11.17 14.0589C11.13 13.9989 11.1 13.9389 11.08 13.8789C11.05 13.8189 11.03 13.7589 11.02 13.6989C11.01 13.6289 11 13.5689 11 13.4989C11 13.3689 11.03 13.2389 11.08 13.1189C11.13 12.9989 11.2 12.8889 11.29 12.7889C11.57 12.5089 12.02 12.4189 12.38 12.5789C12.51 12.6289 12.61 12.6989 12.71 12.7889C12.89 12.9789 13 13.2389 13 13.4989C13 13.5689 12.99 13.6289 12.98 13.6989C12.97 13.7589 12.95 13.8189 12.92 13.8789C12.9 13.9389 12.87 13.9989 12.83 14.0589C12.79 14.1089 12.75 14.1589 12.71 14.2089C12.61 14.2989 12.51 14.3689 12.38 14.4189C12.26 14.4689 12.13 14.4989 12 14.4989Z"
              fill="#00838F"
            />
            <path
              d="M8.49997 17.9989C8.36997 17.9989 8.23996 17.9689 8.11996 17.9189C7.99996 17.8689 7.88998 17.7989 7.78998 17.7089C7.69998 17.6089 7.62996 17.5089 7.57996 17.3789C7.52996 17.2589 7.49997 17.1289 7.49997 16.9989C7.49997 16.7389 7.60998 16.4789 7.78998 16.2889C7.88998 16.1989 7.99996 16.1289 8.11996 16.0789C8.48996 15.9189 8.92996 16.0089 9.20996 16.2889C9.24996 16.3389 9.29996 16.3889 9.32996 16.4389C9.36996 16.4989 9.39998 16.5589 9.41998 16.6189C9.44998 16.6789 9.46998 16.7389 9.47998 16.8089C9.48998 16.8689 9.49997 16.9389 9.49997 16.9989C9.49997 17.2589 9.38996 17.5189 9.20996 17.7089C9.01996 17.8889 8.75997 17.9989 8.49997 17.9989Z"
              fill="#00838F"
            />
          </svg>
          تاریخ:
        </div>
        <DatePicker
          value={datePickerData}
          onChange={handleChange}
          format="YYYY/MM/DD"
          calendar={persian}
          locale={persian_fa}
          inputClass="w-full outline-none bg-white"
        />
      </div>
      <div className="col-span-1 flex items-center gap-3 h-11 bg-white rounded-lg pr-2 flex-shrink">
        <div className="flex items-center gap-2 text-primary">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3333 12.75C9.16331 12.75 6.58331 10.17 6.58331 7C6.58331 3.83 9.16331 1.25 12.3333 1.25C15.5033 1.25 18.0833 3.83 18.0833 7C18.0833 10.17 15.5033 12.75 12.3333 12.75ZM12.3333 2.75C9.99331 2.75 8.08331 4.66 8.08331 7C8.08331 9.34 9.99331 11.25 12.3333 11.25C14.6733 11.25 16.5833 9.34 16.5833 7C16.5833 4.66 14.6733 2.75 12.3333 2.75Z"
              fill="#00838F"
            />
            <path
              d="M20.9235 22.75C20.5135 22.75 20.1735 22.41 20.1735 22C20.1735 18.55 16.6535 15.75 12.3335 15.75C8.01347 15.75 4.49347 18.55 4.49347 22C4.49347 22.41 4.15347 22.75 3.74347 22.75C3.33347 22.75 2.99347 22.41 2.99347 22C2.99347 17.73 7.18347 14.25 12.3335 14.25C17.4835 14.25 21.6735 17.73 21.6735 22C21.6735 22.41 21.3335 22.75 20.9235 22.75Z"
              fill="#00838F"
            />
          </svg>
          نوع کاربر:
        </div>
        <PrimarySelectBox
          status={usersTypeItem}
          getValue={(e) => getCausersValue(e)}
          options={causersOptions}
          className="flex-1"
          height="44px"
          loading={causersLoading}
          nullable={true}
        />
      </div>
      <div className="col-span-1 flex items-center gap-3 h-11 bg-white rounded-lg pr-2 flex-shrink">
        <div className="flex items-center gap-2 text-primary">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3333 12.75C9.16331 12.75 6.58331 10.17 6.58331 7C6.58331 3.83 9.16331 1.25 12.3333 1.25C15.5033 1.25 18.0833 3.83 18.0833 7C18.0833 10.17 15.5033 12.75 12.3333 12.75ZM12.3333 2.75C9.99331 2.75 8.08331 4.66 8.08331 7C8.08331 9.34 9.99331 11.25 12.3333 11.25C14.6733 11.25 16.5833 9.34 16.5833 7C16.5833 4.66 14.6733 2.75 12.3333 2.75Z"
              fill="#00838F"
            />
            <path
              d="M20.9235 22.75C20.5135 22.75 20.1735 22.41 20.1735 22C20.1735 18.55 16.6535 15.75 12.3335 15.75C8.01347 15.75 4.49347 18.55 4.49347 22C4.49347 22.41 4.15347 22.75 3.74347 22.75C3.33347 22.75 2.99347 22.41 2.99347 22C2.99347 17.73 7.18347 14.25 12.3335 14.25C17.4835 14.25 21.6735 17.73 21.6735 22C21.6735 22.41 21.3335 22.75 20.9235 22.75Z"
              fill="#00838F"
            />
          </svg>
          کاربر:
        </div>
        {usersData?.data?.filter((use) => use?.id === usersItem)[0]?.full_name}
      </div>
      <div className="col-span-1 flex items-center gap-3 h-11 bg-white rounded-lg pr-2 flex-shrink">
        <div className="flex items-center gap-2 text-primary">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.94 22.6516C10.46 22.6516 9.98996 22.5316 9.54996 22.2916C8.66996 21.8016 8.13996 20.9116 8.13996 19.9116V14.6116C8.13996 14.1116 7.80996 13.3616 7.49996 12.9816L3.75996 9.02156C3.12996 8.39156 2.64996 7.31156 2.64996 6.50156V4.20156C2.64996 2.60156 3.85996 1.35156 5.39996 1.35156H18.6C20.12 1.35156 21.35 2.58156 21.35 4.10156V6.30156C21.35 7.35156 20.72 8.54156 20.13 9.13156L15.8 12.9616C15.38 13.3116 15.05 14.0816 15.05 14.7016V19.0016C15.05 19.8916 14.49 20.9216 13.79 21.3416L12.41 22.2316C11.96 22.5116 11.45 22.6516 10.94 22.6516ZM5.39996 2.85156C4.69996 2.85156 4.14996 3.44156 4.14996 4.20156V6.50156C4.14996 6.87156 4.44996 7.59156 4.82996 7.97156L8.63996 11.9816C9.14996 12.6116 9.64996 13.6616 9.64996 14.6016V19.9016C9.64996 20.5516 10.1 20.8716 10.29 20.9716C10.71 21.2016 11.22 21.2016 11.61 20.9616L13 20.0716C13.28 19.9016 13.56 19.3616 13.56 19.0016V14.7016C13.56 13.6316 14.08 12.4516 14.83 11.8216L19.11 8.03156C19.45 7.69156 19.86 6.88156 19.86 6.29156V4.10156C19.86 3.41156 19.3 2.85156 18.61 2.85156H5.39996Z"
              fill="#00838F"
            />
            <path
              d="M5.99998 10.7512C5.85998 10.7512 5.72998 10.7112 5.59998 10.6412C5.24998 10.4212 5.13998 9.95124 5.35998 9.60124L10.29 1.70124C10.51 1.35124 10.97 1.24124 11.32 1.46124C11.67 1.68124 11.78 2.14124 11.56 2.49124L6.62998 10.3912C6.48998 10.6212 6.24998 10.7512 5.99998 10.7512Z"
              fill="#00838F"
            />
          </svg>
          مربوط به:
        </div>
        <PrimarySelectBox
          status={causersTypeItem}
          getValue={(e) => getCausersTypeValue(e)}
          options={causersTypeOptions}
          className="flex-1"
          height="44px"
          loading={causersTypeLoading}
          nullable={true}
        />
      </div>
      <div className="col-span-1 flex items-center gap-3 h-11 bg-white rounded-lg pr-2 flex-shrink">
        <div className="flex items-center gap-2 text-primary">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.3333 22.75H9.33331C3.90331 22.75 1.58331 20.43 1.58331 15V9C1.58331 3.57 3.90331 1.25 9.33331 1.25H15.3333C20.7633 1.25 23.0833 3.57 23.0833 9V15C23.0833 20.43 20.7633 22.75 15.3333 22.75ZM9.33331 2.75C4.72331 2.75 3.08331 4.39 3.08331 9V15C3.08331 19.61 4.72331 21.25 9.33331 21.25H15.3333C19.9433 21.25 21.5833 19.61 21.5833 15V9C21.5833 4.39 19.9433 2.75 15.3333 2.75H9.33331Z"
              fill="#00838F"
            />
            <path
              d="M7.66331 15.2381C7.50331 15.2381 7.34331 15.1881 7.20331 15.0781C6.87331 14.8281 6.81331 14.3581 7.06331 14.0281L9.44331 10.9381C9.73331 10.5681 10.1433 10.3281 10.6133 10.2681C11.0733 10.2081 11.5433 10.3381 11.9133 10.6281L13.7433 12.0681C13.8133 12.1281 13.8833 12.1281 13.9333 12.1181C13.9733 12.1181 14.0433 12.0981 14.1033 12.0181L16.4133 9.03805C16.6633 8.70805 17.1433 8.64805 17.4633 8.90805C17.7933 9.15805 17.8533 9.62805 17.5933 9.95805L15.2833 12.9381C14.9933 13.3081 14.5833 13.5481 14.1133 13.5981C13.6433 13.6581 13.1833 13.5281 12.8133 13.2381L10.9833 11.7981C10.9133 11.7381 10.8333 11.7381 10.7933 11.7481C10.7533 11.7481 10.6833 11.7681 10.6233 11.8481L8.24331 14.9381C8.11331 15.1381 7.89331 15.2381 7.66331 15.2381Z"
              fill="#00838F"
            />
          </svg>
          عملیات:
        </div>
        <PrimarySelectBox
          status={actionItem}
          getValue={(e) => getActionValue(e)}
          options={actionOptions}
          className="flex-1"
          height="44px"
          loading={actionLoading}
          nullable={true}
        />
      </div>
      <div className=" flex items-center gap-3 h-11 bg-white rounded-lg px-2 w-full relative col-span-1">
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
          placeholder="جستجوی کاربر"
          value={filterData}
          onChange={(e) => setFilterData(e?.target?.value)}
          onFocus={() =>
            setUsersData((prev) => {
              return { ...prev, show: true };
            })
          }
        />
        <div className="">
          {usersData?.show && (
            <div
              ref={userRef}
              className="absolute z-10 w-full left-0 top-12 flex flex-col max-h-36 bg-white rounded-[6px] shadow-2xl overflow-y-auto"
            >
              {causersFilterDataMutation?.isLoading ? (
                <div className="w-full flex justify-center">
                  <Loading className="w-14 h-14 text-blacklead animate-pulse" />
                </div>
              ) : usersTypeItem ? (
                usersData?.data?.map((user) => (
                  <div
                    className="w-full py-2 px-3 border-b cursor-pointer hover:text-opacity-70 text-black transition duration-300"
                    onClick={() => {
                      setUsersItem(user?.id);
                      setFilterData("");
                      setUsersData((prev) => {
                        return { ...prev, show: false };
                      });
                    }}
                  >
                    <p className="truncate">{user?.full_name}</p>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center text-sm items-center p-2 gap-1">
                  <WarningAmberRounded className="text-yellow-500" />
                  برای انتخاب کاربر باید ابتدا نوع کاربر را مشخص کنید{" "}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogHeader;
