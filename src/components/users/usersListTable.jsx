import { Link } from "react-router-dom";
import Checkbox from "../../components/common/checkbox";
import Loading from "../../components/elements/loading";

const UsersListTable = (props) => {
  const {
    setUsersIds,
    usersIds,
    filterData,
    usersMutation,
    blockUserMutation,
    usersData,
  } = props;

  return (
    <>
      {/* header content */}
      <div className="w-full mt-4 flex items-center bg-white border border-blacklead rounded-lg">
        <div className="w-[2.129rem] flex justify-center"></div>
        <div className="flex-1 w-full grid grid-cols-8 gap-x-4 items-center h-11 px-5">
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">نام کاربر</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">نام کاربری</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">
              موجودی کیف پول
            </p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">موجودی امتیاز</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">سفارش ها</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">نظرات</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">علاقمندی ها</p>
          </div>
          <div className="col-span-1">
            <p className="font-KalamehMed text-sm font-medium">میزان پرداختی</p>
          </div>
        </div>
        <div className="w-[120px]"></div>
      </div>
      {/* table rows */}
      {usersMutation?.isLoading || blockUserMutation?.isLoading ? (
        <div className="w-full flex items-center justify-center mt-5">
          <Loading className="w-14 h-14 text-blacklead animate-pulse" />
        </div>
      ) : usersData?.length === 0 && filterData ? (
        <div className="w-full flex justify-center mt-5">
          متاسفانه هیچ کاربری یافت نشد
        </div>
      ) : (
        <div
          className="overflow-y-scroll hide-scrollbar w-full"
          // style={{ maxHeight: maxHeightTable }}
        >
          {usersData?.map((user) => (
            <div
              className={`w-full flex items-center mt-4 rounded-lg ${
                usersIds.findIndex((cId) => cId === user?.id) === -1
                  ? ""
                  : "bg-blacklead"
              } ${user?.status === "ACTIVE" ? "opacity-100" : "opacity-60"}`}
            >
              <div className="w-[2.129rem] flex justify-center">
                <Checkbox
                  className="w-[18px] h-[18px] rounded-[2px] bg-blue-lightt relative cursor-pointer"
                  id={user?.id}
                  state={usersIds}
                  setState={setUsersIds}
                />
              </div>
              <div className="flex-1 flex items-center bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-5 px-5">
                <div className="flex-1 w-full grid grid-cols-8 gap-x-4 items-start">
                  <div className="col-span-1">
                    <p className="text-sm">{user?.full_name}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm">{user?.mobile_number}</p>
                  </div>
                  <div className="col-span-1 flex flex-col gap-1">
                    <p className="text-sm">{user?.total_profit_prettified}</p>
                    <p className="text-sm">تومان</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm">{user?.point_amount}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm">{user?.orders_count}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm">{user?.comments_count}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm">{user?.wishlists_count}</p>
                  </div>
                  <div className="col-span-1 flex flex-col gap-1">
                    <p className="text-sm">{user?.total_paid_prettifies}</p>
                    <p className="text-sm">تومان</p>
                  </div>
                </div>
                <div className="w-[120px]">
                  <Link
                    className="flex items-center justify-center w-full gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 text-white rounded-[4px] font-medium font-KalamehMed text-xs"
                    to={`/users/list/${user?.id}`}
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
    </>
  );
};

export default UsersListTable;
