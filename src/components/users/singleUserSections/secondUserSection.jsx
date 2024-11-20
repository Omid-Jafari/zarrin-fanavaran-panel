import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { editUser, transactions } from "../../../api/ApiClient";
import Loading from "../../../components/elements/loading";
import TransactionDetail from "./transactionDetail";
import TransactionHistory from "./transactionHistory";

const SecondUserSection = (props) => {
  const { userData, id } = props;
  const [transaction, setTransaction] = useState([]);
  const transactionDetailModal = useRef();
  const transactionHistoryModal = useRef();
  const openTransactionDetailModal = (tran) => {
    transactionDetailModal.current.openModal(tran);
  };
  const openTransactionHistoryModal = () => {
    transactionHistoryModal.current.openModal(transaction);
  };
  const transactionsQuery = useQuery(
    ["transactionsQuery"],
    () => transactions(id),
    {
      onSuccess: (res) => {
        setTransaction(res?.data?.data);
      },
    }
  );
  return (
    <>
      <TransactionDetail ref={transactionDetailModal} />
      <TransactionHistory
        ref={transactionHistoryModal}
        openTransactionDetailModal={openTransactionDetailModal}
      />
      <div className="flex gap-3 w-full ">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#00838F"
                d="M12 22.75c-4 0-7.25-2.87-7.25-6.4v-3.7c0-.41.34-.75.75-.75s.75.34.75.75c0 2.62 2.47 4.6 5.75 4.6s5.75-1.98 5.75-4.6c0-.41.34-.75.75-.75s.75.34.75.75v3.7c0 3.53-3.25 6.4-7.25 6.4zm-5.75-6.29c.07 2.65 2.62 4.79 5.75 4.79s5.68-2.14 5.75-4.79c-1.3 1.41-3.36 2.29-5.75 2.29s-4.44-.88-5.75-2.29z"
              ></path>
              <path
                fill="#00838F"
                d="M12 13.75c-2.76 0-5.24-1.24-6.45-3.24-.52-.85-.8-1.84-.8-2.86 0-1.72.77-3.34 2.16-4.56C8.27 1.9 10.08 1.25 12 1.25s3.72.65 5.09 1.83c1.39 1.23 2.16 2.85 2.16 4.57 0 1.02-.28 2-.8 2.86-1.21 2-3.69 3.24-6.45 3.24zm0-11c-1.56 0-3.02.52-4.11 1.48-1.06.92-1.64 2.14-1.64 3.42 0 .75.2 1.45.58 2.08.95 1.56 2.93 2.52 5.17 2.52 2.24 0 4.22-.97 5.17-2.52.39-.63.58-1.33.58-2.08 0-1.28-.58-2.5-1.65-3.44-1.09-.94-2.54-1.46-4.1-1.46z"
              ></path>
              <path
                fill="#00838F"
                d="M12 18.75c-4.13 0-7.25-2.62-7.25-6.1v-5c0-3.53 3.25-6.4 7.25-6.4 1.92 0 3.72.65 5.09 1.83 1.39 1.23 2.16 2.85 2.16 4.57v5c0 3.48-3.12 6.1-7.25 6.1zm0-16c-3.17 0-5.75 2.2-5.75 4.9v5c0 2.62 2.47 4.6 5.75 4.6s5.75-1.98 5.75-4.6v-5c0-1.28-.58-2.5-1.65-3.44-1.09-.94-2.54-1.46-4.1-1.46z"
              ></path>
            </svg>
            میزان پرداختی:{" "}
          </div>
          <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#00838F"
                d="M6.88 18.9c-.41 0-.75-.34-.75-.75v-2.07c0-.41.34-.75.75-.75s.75.34.75.75v2.07c0 .42-.34.75-.75.75zM12 18.9c-.41 0-.75-.34-.75-.75V14c0-.41.34-.75.75-.75s.75.34.75.75v4.15c0 .42-.34.75-.75.75zM17.12 18.9c-.41 0-.75-.34-.75-.75v-6.22c0-.41.34-.75.75-.75s.75.34.75.75v6.22c0 .42-.33.75-.75.75zM6.88 13.18c-.34 0-.64-.23-.73-.57-.1-.4.14-.81.55-.91 3.68-.92 6.92-2.93 9.39-5.8l.46-.54c.27-.31.74-.35 1.06-.08.31.27.35.74.08 1.06l-.46.54a19.513 19.513 0 01-10.17 6.28c-.06.02-.12.02-.18.02z"
              ></path>
              <path
                fill="#00838F"
                d="M17.12 9.52c-.41 0-.75-.34-.75-.75V6.6h-2.18c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.93c.41 0 .75.34.75.75v2.93c0 .41-.33.74-.75.74z"
              ></path>
              <path
                fill="#00838F"
                d="M15 22.75H9c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75zm-6-20C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9z"
              ></path>
            </svg>
            سود حاصله{" "}
          </div>
          <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#00838F"
                d="M17.74 22.75H6.26c-2.49 0-4.51-2.02-4.51-4.51v-6.73C1.75 9.02 3.77 7 6.26 7h11.48c2.49 0 4.51 2.02 4.51 4.51v1.44c0 .41-.34.75-.75.75h-2.02c-.35 0-.67.13-.9.37l-.01.01c-.28.27-.41.64-.38 1.02.06.66.69 1.19 1.41 1.19h1.9c.41 0 .75.34.75.75v1.19c0 2.5-2.02 4.52-4.51 4.52zM6.26 8.5c-1.66 0-3.01 1.35-3.01 3.01v6.73c0 1.66 1.35 3.01 3.01 3.01h11.48c1.66 0 3.01-1.35 3.01-3.01v-.44H19.6c-1.51 0-2.79-1.12-2.91-2.56-.08-.82.22-1.63.82-2.22.52-.53 1.22-.82 1.97-.82h1.27v-.69c0-1.66-1.35-3.01-3.01-3.01H6.26z"
              ></path>
              <path
                fill="#00838F"
                d="M2.5 13.16c-.41 0-.75-.34-.75-.75V7.84c0-1.49.94-2.84 2.33-3.37l7.94-3c.82-.31 1.73-.2 2.44.3.72.5 1.14 1.31 1.14 2.18v3.8c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-3.8c0-.38-.18-.73-.5-.95-.32-.22-.7-.27-1.06-.13l-7.94 3c-.81.31-1.36 1.1-1.36 1.97v4.57c.01.42-.33.75-.74.75zM19.6 17.8c-1.51 0-2.79-1.12-2.91-2.56-.08-.83.22-1.64.82-2.23.51-.52 1.21-.81 1.96-.81h2.08c.99.03 1.75.81 1.75 1.77v2.06c0 .96-.76 1.74-1.72 1.77H19.6zm1.93-4.1h-2.05c-.35 0-.67.13-.9.37-.29.28-.43.66-.39 1.04.06.66.69 1.19 1.41 1.19h1.96c.13 0 .25-.12.25-.27v-2.06c0-.15-.12-.26-.28-.27z"
              ></path>
              <path
                fill="#00838F"
                d="M14 12.75H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h7c.41 0 .75.34.75.75s-.34.75-.75.75z"
              ></path>
            </svg>
            موجودی کیف پول:{" "}
          </div>
          <div className="flex gap-2 items-center font-medium font-KalamehMed text-sm text-primary rounded-lg bg-white h-14 px-4 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#00838F"
                d="M12 17.81H2c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h10a.749.749 0 110 1.5z"
              ></path>
              <path
                fill="#00838F"
                d="M9.78 22.75H4.23c-2.19 0-2.97-.77-2.97-2.95v-4.1c0-2.18.78-2.95 2.97-2.95h5.55c2.19 0 2.97.77 2.97 2.95v4.11c0 2.17-.78 2.94-2.97 2.94zm-5.56-8.5c-1.36 0-1.47.11-1.47 1.45v4.11c0 1.34.11 1.45 1.47 1.45h5.55c1.36 0 1.47-.11 1.47-1.45V15.7c0-1.34-.11-1.45-1.47-1.45H4.22zM15 22.75a.752.752 0 01-.64-1.14l1.05-1.75c.21-.35.67-.47 1.03-.26.36.21.47.67.26 1.03l-.27.45c2.76-.65 4.83-3.13 4.83-6.09 0-.41.34-.75.75-.75s.75.34.75.75c-.01 4.28-3.49 7.76-7.76 7.76zM2 9.75c-.41 0-.75-.34-.75-.75 0-4.27 3.48-7.75 7.75-7.75a.752.752 0 01.64 1.14L8.59 4.14c-.21.35-.67.47-1.03.26a.749.749 0 01-.26-1.03l.27-.45c-2.76.65-4.83 3.13-4.83 6.09.01.4-.33.74-.74.74zM18.5 11.75a5.25 5.25 0 11-.001-10.501A5.25 5.25 0 0118.5 11.75zm0-9c-2.07 0-3.75 1.68-3.75 3.75 0 2.07 1.68 3.75 3.75 3.75 2.07 0 3.75-1.68 3.75-3.75 0-2.07-1.68-3.75-3.75-3.75z"
              ></path>
            </svg>
            تراکنش ها:{" "}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
            {userData?.total_paid_prettifies}
            <span>تومان</span>
          </div>
          <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
            {userData?.total_profit_prettified}
            <span>تومان</span>
          </div>
          <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
            {userData?.wallet_amount?.toLocaleString()}
            <span>تومان</span>
          </div>
          <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
            {transaction?.length}
            <span>تراکنش</span>
          </div>
          <div className="flex flex-col gap-3 items-center rounded-lg bg-white p-4 w-full">
            <div className="w-full flex items-center justify-between ">
              <span className="text-primary text-sm">آخرین تراکنش ها:</span>
              <button
                onClick={() => openTransactionHistoryModal(transaction)}
                className="px-3 font-medium font-KalamehMed h-10 text-sm rounded flex items-center text-white bg-cyann transition-colors duration-500 hover:bg-primary"
              >
                همه تراکنش ها
              </button>
            </div>
            {transactionsQuery?.isLoading ? (
              <div className="w-full flex justify-center">
                <Loading className="w-10 h-10 text-blacklead animate-pulse" />
              </div>
            ) : (
              transaction?.slice(-3)?.map((tran) => (
                <div
                  onClick={() => openTransactionDetailModal(tran)}
                  className={`w-full p-3 items-center min-h-[50px] rounded-lg flex gap-5 text-xs font-medium font-KalamehMed cursor-pointer `}
                  style={{ backgroundColor: tran?.status_info?.color }}
                >
                  <div className="w-1/5">{tran?.reference_id}#</div>
                  <div className="w-4/5">
                    {`${tran?.action_info?.name} - ${tran?.type_info?.name}(
                  ${tran?.status_info?.name})`}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondUserSection;
