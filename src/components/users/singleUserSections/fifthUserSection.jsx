import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../../../public/images/icons/deleteIcon";
import EditIcon from "../../../../public/images/icons/editIcon";
import { orders } from "../../../api/ApiClient";
import Loading from "../../../components/elements/loading";
import Tooltip from "../../../components/elements/Tooltip";

const FifthUserSection = (props) => {
  const { id } = props;
  const [ordersData, setOrdersData] = useState([]);
  const ordersQuery = useQuery(["ordersQuery"], () => orders(id), {
    onSuccess: (res) => {
      setOrdersData(res?.data?.data);
    },
  });
  return (
    <>
      {ordersQuery?.isLoading ? (
        <div className="w-full flex items-center justify-center mt-5">
          <Loading className="w-14 h-14 text-blacklead animate-pulse" />
        </div>
      ) : (
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
                  d="M5.18988 6.37945C4.99988 6.37945 4.79988 6.29945 4.65988 6.15945C4.36988 5.86945 4.36988 5.38945 4.65988 5.09945L8.28988 1.46945C8.57988 1.17945 9.05988 1.17945 9.34988 1.46945C9.63988 1.75945 9.63988 2.23945 9.34988 2.52945L5.71988 6.15945C5.56988 6.29945 5.37988 6.37945 5.18988 6.37945Z"
                  fill="#00838F"
                />
                <path
                  d="M18.8101 6.37945C18.6201 6.37945 18.4301 6.30945 18.2801 6.15945L14.6501 2.52945C14.3601 2.23945 14.3601 1.75945 14.6501 1.46945C14.9401 1.17945 15.4201 1.17945 15.7101 1.46945L19.3401 5.09945C19.6301 5.38945 19.6301 5.86945 19.3401 6.15945C19.2001 6.29945 19.0001 6.37945 18.8101 6.37945Z"
                  fill="#00838F"
                />
                <path
                  d="M20.21 10.5996C20.14 10.5996 20.07 10.5996 20 10.5996H19.77H4C3.3 10.6096 2.5 10.6096 1.92 10.0296C1.46 9.57961 1.25 8.87961 1.25 7.84961C1.25 5.09961 3.26 5.09961 4.22 5.09961H19.78C20.74 5.09961 22.75 5.09961 22.75 7.84961C22.75 8.88961 22.54 9.57961 22.08 10.0296C21.56 10.5496 20.86 10.5996 20.21 10.5996ZM4.22 9.09961H20.01C20.46 9.10961 20.88 9.10961 21.02 8.96961C21.09 8.89961 21.24 8.65961 21.24 7.84961C21.24 6.71961 20.96 6.59961 19.77 6.59961H4.22C3.03 6.59961 2.75 6.71961 2.75 7.84961C2.75 8.65961 2.91 8.89961 2.97 8.96961C3.11 9.09961 3.54 9.09961 3.98 9.09961H4.22Z"
                  fill="#00838F"
                />
                <path
                  d="M9.75977 18.3C9.34977 18.3 9.00977 17.96 9.00977 17.55V14C9.00977 13.59 9.34977 13.25 9.75977 13.25C10.1698 13.25 10.5098 13.59 10.5098 14V17.55C10.5098 17.97 10.1698 18.3 9.75977 18.3Z"
                  fill="#00838F"
                />
                <path
                  d="M14.3604 18.3C13.9504 18.3 13.6104 17.96 13.6104 17.55V14C13.6104 13.59 13.9504 13.25 14.3604 13.25C14.7704 13.25 15.1104 13.59 15.1104 14V17.55C15.1104 17.97 14.7704 18.3 14.3604 18.3Z"
                  fill="#00838F"
                />
                <path
                  d="M14.8898 22.7507H8.85975C5.27975 22.7507 4.47975 20.6207 4.16975 18.7707L2.75975 10.1207C2.68975 9.71073 2.96975 9.33073 3.37975 9.26073C3.78975 9.19073 4.16975 9.47073 4.23975 9.88073L5.64975 18.5207C5.93975 20.2907 6.53975 21.2507 8.85975 21.2507H14.8898C17.4598 21.2507 17.7498 20.3507 18.0798 18.6107L19.7598 9.86073C19.8398 9.45073 20.2298 9.18073 20.6398 9.27073C21.0498 9.35073 21.3098 9.74073 21.2298 10.1507L19.5498 18.9007C19.1598 20.9307 18.5098 22.7507 14.8898 22.7507Z"
                  fill="#00838F"
                />
              </svg>
              سفارش ها:
            </div>
            <div className="w-4/5 flex gap-2 items-center rounded-lg bg-white h-14 px-4 ">
              {ordersData?.length}
              <span>سفارش</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center rounded-lg bg-white p-4 w-full font-medium font-KalamehMed text-sm">
            <div className="text-primary text-sm font-medium font-KalamehMed w-full flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 17.8105H2C1.59 17.8105 1.25 17.4705 1.25 17.0605C1.25 16.6505 1.59 16.3105 2 16.3105H12C12.41 16.3105 12.75 16.6505 12.75 17.0605C12.75 17.4805 12.41 17.8105 12 17.8105Z"
                  fill="#00838F"
                />
                <path
                  d="M9.77979 22.75H4.22974C2.03974 22.75 1.25977 21.98 1.25977 19.8V15.7C1.25977 13.52 2.03974 12.75 4.22974 12.75H9.77979C11.9698 12.75 12.7498 13.52 12.7498 15.7V19.81C12.7498 21.98 11.9698 22.75 9.77979 22.75ZM4.21973 14.25C2.85973 14.25 2.74976 14.36 2.74976 15.7V19.81C2.74976 21.15 2.85973 21.26 4.21973 21.26H9.76978C11.1298 21.26 11.2397 21.15 11.2397 19.81V15.7C11.2397 14.36 11.1298 14.25 9.76978 14.25H4.21973Z"
                  fill="#00838F"
                />
                <path
                  d="M15.0002 22.7502C14.7302 22.7502 14.4802 22.6002 14.3502 22.3702C14.2202 22.1302 14.2202 21.8502 14.3602 21.6102L15.4102 19.8602C15.6202 19.5102 16.0802 19.3902 16.4402 19.6002C16.8002 19.8102 16.9102 20.2702 16.7002 20.6302L16.4302 21.0802C19.1902 20.4302 21.2602 17.9502 21.2602 14.9902C21.2602 14.5802 21.6002 14.2402 22.0102 14.2402C22.4202 14.2402 22.7602 14.5802 22.7602 14.9902C22.7502 19.2702 19.2702 22.7502 15.0002 22.7502Z"
                  fill="#00838F"
                />
                <path
                  d="M2 9.75C1.59 9.75 1.25 9.41 1.25 9C1.25 4.73 4.73 1.25 9 1.25C9.27 1.25 9.52002 1.4 9.65002 1.63C9.78002 1.87 9.78001 2.15 9.64001 2.39L8.59003 4.14C8.38003 4.49 7.92 4.61 7.56 4.4C7.2 4.19 7.08999 3.73 7.29999 3.37L7.57001 2.92C4.81001 3.57 2.73999 6.05 2.73999 9.01C2.74999 9.41 2.41 9.75 2 9.75Z"
                  fill="#00838F"
                />
                <path
                  d="M18.5 11.75C15.61 11.75 13.25 9.4 13.25 6.5C13.25 3.6 15.6 1.25 18.5 1.25C21.4 1.25 23.75 3.6 23.75 6.5C23.75 9.4 21.39 11.75 18.5 11.75ZM18.5 2.75C16.43 2.75 14.75 4.43 14.75 6.5C14.75 8.57 16.43 10.25 18.5 10.25C20.57 10.25 22.25 8.57 22.25 6.5C22.25 4.43 20.57 2.75 18.5 2.75Z"
                  fill="#00838F"
                />
              </svg>
              تاریخچه خرید:
            </div>
            <div className="w-full mt-4 grid grid-cols-8 gap-x-3 items-center h-11 px-5 border border-blacklead rounded-lg">
              <div className="col-span-1">شماره فروش</div>
              <div className="col-span-1">تاریخ</div>
              <div className="col-span-1">زمان</div>
              <div className="col-span-1">روش پرداخت</div>
              <div className="col-span-1">شیوه ارسال</div>
              <div className="col-span-1">وضعیت</div>
              <div className="col-span-1">قیمت</div>
            </div>
            <div className="w-full flex flex-col gap-3">
              {ordersData?.map((order) => (
                <div className="w-full text-sm bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-5 px-5 grid grid-cols-8 gap-x-3 items-center">
                  <div className="col-span-1" title={"#" + order?.id}>
                    <p className="truncate">#{order?.id}</p>
                  </div>
                  <div
                    className="col-span-1"
                    title={order?.jcreated_at?.split(" ")[0]}
                  >
                    <p className="truncate">
                      {order?.jcreated_at?.split(" ")[0]}
                    </p>
                  </div>
                  <div
                    className="col-span-1"
                    title={order?.jcreated_at?.split(" ")[1]}
                  >
                    <p className="truncate">
                      {order?.jcreated_at?.split(" ")[1]}
                    </p>
                  </div>
                  <div
                    className={`col-span-1 ${
                      order?.status === "PAID" ? "text-cyann" : "text-red-700"
                    }`}
                    title={order?.payment_method_info?.name}
                  >
                    <p className="truncate">
                      {order?.payment_method_info?.name}
                    </p>
                  </div>
                  <div
                    className={`col-span-1 `}
                    title={order?.shipping_method_info?.name}
                  >
                    <p className="truncate">
                      {order?.shipping_method_info?.name}
                    </p>
                  </div>
                  <div
                    className={`col-span-1 `}
                    title={order?.status_info?.name}
                  >
                    <p className="truncate">{order?.status_info?.name}</p>
                  </div>
                  <div
                    className={`col-span-1 `}
                    title={
                      order?.total_items_amount_prettified + " " + "تومان "
                    }
                  >
                    <p className="truncate">
                      {order?.total_items_amount_prettified + " " + "تومان "}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <Link
                      className="flex items-center justify-center w-full gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 text-white rounded-[4px] font-medium font-KalamehMed text-xs"
                      to={`/orders/edit/${order?.id}`}
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
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FifthUserSection;
