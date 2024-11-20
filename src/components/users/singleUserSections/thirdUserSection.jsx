import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  notifications,
  stockNotifications,
  transactions,
  wishlists,
} from "../../../api/ApiClient";
import Loading from "../../../components/elements/loading";
import NotifHistory from "./notifHistory";
import SendMessage from "./sendMessage";
import StockNotifHistory from "./stockNotifHistory";
import WishListHistory from "./wishListHistory";

const ThirdUserSection = (props) => {
  const { userData, id } = props;
  const [transaction, setTransaction] = useState([]);
  const [wishlistsData, setWishlistsData] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);
  const [stockNotificationsData, setStockNotificationsData] = useState([]);
  const wishListHistoryModal = useRef();
  const stockNotifHistoryModal = useRef();
  const notifHistoryModal = useRef();
  const sendMessageModal = useRef();
  const openWishListHistoryModal = () => {
    wishListHistoryModal.current.openModal(wishlistsData);
  };
  const openStockNotifHistoryModal = () => {
    stockNotifHistoryModal.current.openModal(stockNotificationsData);
  };
  const openNotifHistoryModal = () => {
    notifHistoryModal.current.openModal(notificationsData);
  };
  const openSendMessageModal = () => {
    sendMessageModal.current.openModal(notificationsData);
  };
  const wishlistsQuery = useQuery(["wishlistsQuery"], () => wishlists(id), {
    onSuccess: (res) => {
      setWishlistsData(res?.data?.data);
    },
  });
  const notificationsQuery = useQuery(
    ["notificationsQuery"],
    () => notifications(id),
    {
      onSuccess: (res) => {
        setNotificationsData(res?.data?.data);
      },
    }
  );
  const stockNotificationsQuery = useQuery(
    ["stockNotificationsQuery"],
    () => stockNotifications(id),
    {
      onSuccess: (res) => {
        setStockNotificationsData(res?.data?.data);
      },
    }
  );
  return (
    <>
      <WishListHistory ref={wishListHistoryModal} />
      <StockNotifHistory ref={stockNotifHistoryModal} />
      <NotifHistory ref={notifHistoryModal} />
      <SendMessage ref={sendMessageModal} userData={userData} />
      <div className="flex gap-3 w-full flex-col">
        <div className="w-full flex items-start gap-3">
          <div className="w-1/5 flex gap-3 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1999 22.7504C15.2599 22.7504 13.4399 21.7204 12.4499 20.0504C11.9299 19.2104 11.6499 18.2104 11.6499 17.2004C11.6499 14.1404 14.1399 11.6504 17.1999 11.6504C20.2599 11.6504 22.7499 14.1404 22.7499 17.2004C22.7499 18.2204 22.4699 19.2104 21.9399 20.0704C20.9599 21.7204 19.1399 22.7504 17.1999 22.7504ZM17.1999 13.1504C14.9699 13.1504 13.1499 14.9704 13.1499 17.2004C13.1499 17.9404 13.3499 18.6604 13.7299 19.2804C14.4699 20.5204 15.7599 21.2504 17.1999 21.2504C18.6399 21.2504 19.9299 20.5203 20.6599 19.2903C21.0499 18.6603 21.2499 17.9404 21.2499 17.2004C21.2499 14.9704 19.4299 13.1504 17.1999 13.1504Z"
                fill="#00838F"
              />
              <path
                d="M16.51 19.1298C16.32 19.1298 16.13 19.0598 15.98 18.9098L14.8 17.7298C14.51 17.4398 14.51 16.9598 14.8 16.6698C15.09 16.3798 15.57 16.3798 15.86 16.6698L16.53 17.3398L18.56 15.4598C18.87 15.1798 19.34 15.1998 19.62 15.4998C19.9 15.7998 19.88 16.2798 19.58 16.5598L17.02 18.9198C16.88 19.0698 16.69 19.1298 16.51 19.1298Z"
                fill="#00838F"
              />
              <path
                d="M12 21.6497C11.69 21.6497 11.38 21.6097 11.13 21.5197C8.57 20.6497 1.25 16.4096 1.25 8.68964C1.25 5.18964 4.08 2.34961 7.56 2.34961C9.22 2.34961 10.83 3.01964 12 4.18964C13.17 3.01964 14.78 2.34961 16.44 2.34961C19.92 2.34961 22.75 5.18964 22.75 8.68964C22.75 10.6396 22.28 12.5096 21.35 14.2596C21.24 14.4696 21.03 14.6197 20.79 14.6497C20.55 14.6797 20.31 14.5996 20.14 14.4196C19.36 13.5996 18.32 13.1396 17.2 13.1396C14.97 13.1396 13.15 14.9596 13.15 17.1896C13.15 18.1796 13.52 19.1396 14.19 19.8896C14.35 20.0696 14.41 20.3096 14.36 20.5396C14.31 20.7696 14.15 20.9696 13.94 21.0696C13.54 21.2496 13.18 21.3996 12.85 21.5096C12.61 21.6096 12.31 21.6497 12 21.6497ZM7.56 3.84961C4.91 3.84961 2.75 6.01964 2.75 8.68964C2.75 15.5296 9.32 19.3096 11.62 20.0996C11.81 20.1696 12.19 20.1596 12.37 20.0996C12.4 20.0896 12.43 20.0796 12.46 20.0696C11.93 19.2096 11.65 18.2196 11.65 17.1996C11.65 14.1396 14.14 11.6497 17.2 11.6497C18.36 11.6497 19.5 12.0196 20.44 12.6996C20.98 11.4196 21.25 10.0796 21.25 8.68964C21.25 6.01964 19.09 3.84961 16.44 3.84961C14.94 3.84961 13.5 4.56966 12.6 5.77966C12.32 6.15966 11.68 6.15966 11.4 5.77966C10.5 4.56966 9.06 3.84961 7.56 3.84961Z"
                fill="#00838F"
              />
            </svg>
            علاقمندی ها:
          </div>
          <div className="w-4/5 flex flex-col gap-3">
            <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
              {wishlistsData?.length}
              <span>محصول</span>
            </div>
            <div className="flex flex-col gap-3 items-center rounded-lg bg-white p-4 w-full">
              <div className="w-full flex items-center justify-between ">
                <span className="text-primary text-sm">آخرین علاقمندی ها:</span>
                <button
                  onClick={openWishListHistoryModal}
                  className="px-3 font-medium font-KalamehMed h-10 text-sm rounded flex items-center text-white bg-cyann transition-colors duration-500 hover:bg-primary"
                >
                  همه علاقمندی ها
                </button>
              </div>
              {wishlistsQuery?.isLoading ? (
                <div className="w-full flex justify-center">
                  <Loading className="w-10 h-10 text-blacklead animate-pulse" />
                </div>
              ) : (
                wishlistsData?.slice(-3)?.map((wish) => (
                  <div
                    className={`w-full p-3 items-center min-h-[50px] rounded-lg flex gap-4 text-xs font-medium font-KalamehMed bg-blue-lightt `}
                  >
                    <div className="w-1/6 text-primary">
                      #{wish?.main_item_info?.id}
                    </div>
                    <div
                      title={wish?.name_fa}
                      className="w-2/6 font-medium font-KalamehMed line-clamp-1"
                    >
                      {wish?.name_fa}
                    </div>
                    <div
                      title={wish?.bread_crumb_name}
                      className="w-2/6 text-primary line-clamp-1"
                    >
                      {wish?.bread_crumb_name}
                    </div>
                    <div className="w-1/6 text-primary text-end">
                      {wish?.main_item_info?.price_prettified} تومان
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex items-start gap-3">
          <div className="w-1/5 flex gap-3 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0201 2.91016C8.71009 2.91016 6.02009 5.60016 6.02009 8.91016V11.8002C6.02009 12.4102 5.76009 13.3402 5.45009 13.8602L4.30009 15.7702C3.59009 16.9502 4.08009 18.2602 5.38009 18.7002C9.69009 20.1402 14.3401 20.1402 18.6501 18.7002C19.8601 18.3002 20.3901 16.8702 19.7301 15.7702L18.5801 13.8602C18.2801 13.3402 18.0201 12.4102 18.0201 11.8002V8.91016C18.0201 5.61016 15.3201 2.91016 12.0201 2.91016Z"
                stroke="#00838F"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
              <path
                d="M13.8699 3.19945C13.5599 3.10945 13.2399 3.03945 12.9099 2.99945C11.9499 2.87945 11.0299 2.94945 10.1699 3.19945C10.4599 2.45945 11.1799 1.93945 12.0199 1.93945C12.8599 1.93945 13.5799 2.45945 13.8699 3.19945Z"
                stroke="#00838F"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.02 19.0605C15.02 20.7105 13.67 22.0605 12.02 22.0605C11.2 22.0605 10.44 21.7205 9.90002 21.1805C9.36002 20.6405 9.02002 19.8805 9.02002 19.0605"
                stroke="#00838F"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
            </svg>
            خبرنامه محصول
          </div>
          <div className="w-4/5 flex flex-col gap-3">
            <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
              {stockNotificationsData?.length}
              <span>محصول</span>
            </div>
            <div className="flex flex-col gap-3 items-center rounded-lg bg-white p-4 w-full">
              <div className="w-full flex items-center justify-between ">
                <span className="text-primary text-sm">
                  آخرین خبرنامه محصول:
                </span>
                <button
                  onClick={openStockNotifHistoryModal}
                  className="px-3 font-medium font-KalamehMed h-10 text-sm rounded flex items-center text-white bg-cyann transition-colors duration-500 hover:bg-primary"
                >
                  همه خبرنامه محصول
                </button>
              </div>
              {stockNotificationsQuery?.isLoading ? (
                <div className="w-full flex justify-center">
                  <Loading className="w-10 h-10 text-blacklead animate-pulse" />
                </div>
              ) : (
                stockNotificationsData?.slice(-3)?.map((stockNotif) => (
                  <div
                    className={`w-full p-3 items-center min-h-[50px] rounded-lg flex gap-4 text-xs font-medium font-KalamehMed bg-blue-lightt `}
                  >
                    <div className="w-1/6 text-primary">
                      #{stockNotif?.product_item?.id}
                    </div>
                    <div className="w-2/6 flex items-center gap-2 ">
                      <img
                        src={stockNotif?.product_item?.color?.media?.icon?.file}
                        className="w-6 h-6 object-contain"
                        alt=""
                        title={stockNotif?.product_item?.color?.name_fa}
                      />
                      <p
                        className="font-medium font-KalamehMed line-clamp-1"
                        title={stockNotif?.product_item?.product?.name_fa}
                      >
                        {stockNotif?.product_item?.product?.name_fa}
                      </p>
                    </div>
                    <div
                      title={
                        stockNotif?.product_item?.product?.bread_crumb_name
                      }
                      className="w-2/6 text-primary line-clamp-1"
                    >
                      {stockNotif?.product_item?.product?.bread_crumb_name}
                    </div>
                    <div className="w-1/6">
                      {stockNotif?.product_item?.price_prettified} تومان
                    </div>
                    <div className="w-1/6 text-primary text-end">
                      {stockNotif?.product_item?.price_prettified} تومان
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex items-start gap-3">
          <div className="w-1/5 flex gap-3 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 10.5195C11.59 10.5195 11.25 10.1795 11.25 9.76945V6.43945C11.25 6.02945 11.59 5.68945 12 5.68945C12.41 5.68945 12.75 6.02945 12.75 6.43945V9.76945C12.75 10.1895 12.41 10.5195 12 10.5195Z"
                fill="#00838F"
              />
              <path
                d="M12.0199 20.3502C9.43987 20.3502 6.86987 19.9402 4.41987 19.1202C3.50987 18.8202 2.81987 18.1702 2.51987 17.3502C2.21987 16.5302 2.31987 15.5902 2.80987 14.7702L4.07987 12.6502C4.35987 12.1802 4.60987 11.3002 4.60987 10.7502V8.65023C4.60987 4.56023 7.92987 1.24023 12.0199 1.24023C16.1099 1.24023 19.4299 4.56023 19.4299 8.65023V10.7502C19.4299 11.2902 19.6799 12.1802 19.9599 12.6502L21.2299 14.7702C21.6999 15.5502 21.7799 16.4802 21.4699 17.3302C21.1599 18.1802 20.4799 18.8302 19.6199 19.1202C17.1699 19.9502 14.5999 20.3502 12.0199 20.3502ZM12.0199 2.75023C8.75987 2.75023 6.10987 5.40023 6.10987 8.66023V10.7602C6.10987 11.5702 5.78987 12.7402 5.36987 13.4302L4.09987 15.5602C3.83987 15.9902 3.77987 16.4502 3.92987 16.8502C4.07987 17.2502 4.41987 17.5502 4.89987 17.7102C9.49987 19.2402 14.5599 19.2402 19.1599 17.7102C19.5899 17.5702 19.9199 17.2502 20.0699 16.8302C20.2299 16.4102 20.1799 15.9502 19.9499 15.5602L18.6799 13.4402C18.2599 12.7502 17.9399 11.5802 17.9399 10.7702V8.67023C17.9299 5.40023 15.2799 2.75023 12.0199 2.75023Z"
                fill="#00838F"
              />
              <path
                d="M11.9999 22.9003C10.9299 22.9003 9.87992 22.4603 9.11992 21.7003C8.35992 20.9403 7.91992 19.8903 7.91992 18.8203H9.41992C9.41992 19.5003 9.69992 20.1603 10.1799 20.6403C10.6599 21.1203 11.3199 21.4003 11.9999 21.4003C13.4199 21.4003 14.5799 20.2403 14.5799 18.8203H16.0799C16.0799 21.0703 14.2499 22.9003 11.9999 22.9003Z"
                fill="#00838F"
              />
            </svg>
            اطلاع رسانی ها:
          </div>
          <div className="w-4/5 flex flex-col gap-3">
            <div className="w-full flex items-stretch">
              <div className="flex gap-2 items-center rounded-r-lg bg-white h-14 px-4 flex-1">
                {notificationsData?.length}
                <span>عدد</span>
              </div>
              <button
                onClick={openSendMessageModal}
                className="rounded-l-lg px-3 font-medium font-KalamehMed h-14 text-sm flex items-center text-white bg-cyann transition-colors duration-500 hover:bg-primary gap-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5H7"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 16.5H8"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 12.5H5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                ارسال اعلان شخصی
              </button>
            </div>
            <div className="flex flex-col gap-3 items-center rounded-lg bg-white p-4 w-full">
              <div className="w-full flex items-center justify-between ">
                <span className="text-primary text-sm">
                  آخرین اطلاع رسانی ها:
                </span>
                <button
                  onClick={() => openNotifHistoryModal(notificationsData)}
                  className="px-3 font-medium font-KalamehMed h-10 text-sm rounded flex items-center text-white bg-cyann transition-colors duration-500 hover:bg-primary"
                >
                  همه اطلاع رسانی ها
                </button>
              </div>
              {notificationsQuery?.isLoading ? (
                <div className="w-full flex justify-center">
                  <Loading className="w-10 h-10 text-blacklead animate-pulse" />
                </div>
              ) : (
                notificationsData?.slice(-3)?.map((notif) => (
                  <div
                    className={`w-full p-3 items-center min-h-[50px] rounded-lg flex gap-5 text-xs font-medium font-KalamehMed bg-blue-lightt `}
                  >
                    <div className="w-full">{notif?.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThirdUserSection;
