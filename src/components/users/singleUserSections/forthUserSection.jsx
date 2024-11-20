import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { comments, pointHistories } from "../../../api/ApiClient";
import Loading from "../../../components/elements/loading";
import AllPointsHistory from "./allPointsHistory";
import CommentHistory from "./commentHistory";
import CommentSingle from "./commentSingle";
import PointsHistory from "./pointsHistory";

const ForthUserSection = (props) => {
  const { id } = props;
  const [pointsData, setPointsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const commentHistoryModal = useRef();
  const commentSingleModal = useRef();
  const pointHistoryModal = useRef();
  const allPointHistoryModal = useRef();
  const openCommentHistoryModal = () => {
    commentHistoryModal.current.openModal(commentsData);
  };
  const openCommentSingleModal = (id) => {
    commentSingleModal.current.openModal(id);
  };
  const openPointsHistoryModal = () => {
    pointHistoryModal.current.openModal(pointsData);
  };
  const openAllPointsHistoryModal = () => {
    allPointHistoryModal.current.openModal(pointsData);
  };
  const pointsQuery = useQuery(["pointsQuery"], () => pointHistories(id), {
    onSuccess: (res) => {
      setPointsData(res?.data?.data);
    },
  });
  const commentsQuery = useQuery(["commentsQuery"], () => comments(id), {
    onSuccess: (res) => {
      setCommentsData(res?.data?.data);
    },
  });
  return (
    <>
      <CommentHistory ref={commentHistoryModal} />
      <CommentSingle ref={commentSingleModal} />
      <PointsHistory ref={pointHistoryModal} />
      <AllPointsHistory ref={allPointHistoryModal} />
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
                d="M12 16.75C11.6 16.75 11.2 16.72 10.82 16.65C8.7 16.34 6.77 15.12 5.55 13.31C4.7 12.03 4.25 10.54 4.25 9C4.25 4.73 7.73 1.25 12 1.25C16.27 1.25 19.75 4.73 19.75 9C19.75 10.54 19.3 12.03 18.45 13.31C17.22 15.13 15.29 16.34 13.15 16.66C12.8 16.72 12.4 16.75 12 16.75ZM12 2.75C8.55 2.75 5.75 5.55 5.75 9C5.75 10.25 6.11 11.45 6.79 12.47C7.78 13.93 9.33 14.91 11.05 15.16C11.69 15.27 12.32 15.27 12.91 15.16C14.66 14.91 16.21 13.92 17.2 12.46C17.88 11.44 18.24 10.24 18.24 8.98999C18.25 5.54999 15.45 2.75 12 2.75Z"
                fill="#00838F"
              />
              <path
                d="M6.46933 22.59C6.32933 22.59 6.19933 22.57 6.05933 22.54C5.40933 22.39 4.90933 21.89 4.75933 21.24L4.40933 19.77C4.38933 19.68 4.31933 19.61 4.21933 19.58L2.56933 19.19C1.94933 19.04 1.45933 18.58 1.28933 17.97C1.11933 17.36 1.28933 16.7 1.73933 16.25L5.63933 12.35C5.79933 12.19 6.01933 12.11 6.23933 12.13C6.45933 12.15 6.65933 12.27 6.78933 12.46C7.77933 13.92 9.32933 14.91 11.0593 15.16C11.6993 15.27 12.3293 15.27 12.9193 15.16C14.6693 14.91 16.2193 13.92 17.2093 12.46C17.3293 12.27 17.5393 12.15 17.7593 12.13C17.9793 12.11 18.1993 12.19 18.3593 12.35L22.2593 16.25C22.7093 16.7 22.8793 17.36 22.7093 17.97C22.5393 18.58 22.0393 19.05 21.4293 19.19L19.7793 19.58C19.6893 19.6 19.6193 19.67 19.5893 19.77L19.2393 21.24C19.0893 21.89 18.5893 22.39 17.9393 22.54C17.2893 22.7 16.6193 22.47 16.1993 21.96L11.9993 17.13L7.79933 21.97C7.45933 22.37 6.97933 22.59 6.46933 22.59ZM6.08933 14.03L2.79933 17.32C2.70933 17.41 2.71933 17.51 2.73933 17.57C2.74933 17.62 2.79933 17.72 2.91933 17.74L4.56933 18.13C5.21933 18.28 5.71933 18.78 5.86933 19.43L6.21933 20.9C6.24933 21.03 6.34933 21.07 6.40933 21.09C6.46933 21.1 6.56933 21.11 6.65933 21.01L10.4893 16.6C8.78933 16.27 7.22933 15.36 6.08933 14.03ZM13.5093 16.59L17.3393 20.99C17.4293 21.1 17.5393 21.1 17.5993 21.08C17.6593 21.07 17.7493 21.02 17.7893 20.89L18.1393 19.42C18.2893 18.77 18.7893 18.27 19.4393 18.12L21.0893 17.73C21.2093 17.7 21.2593 17.61 21.2693 17.56C21.2893 17.51 21.2993 17.4 21.2093 17.31L17.9193 14.02C16.7693 15.35 15.2193 16.26 13.5093 16.59Z"
                fill="#00838F"
              />
              <path
                d="M13.8901 12.8903C13.6301 12.8903 13.3201 12.8203 12.9501 12.6003L12.0001 12.0302L11.0501 12.5902C10.1801 13.1102 9.61014 12.8102 9.40014 12.6602C9.19014 12.5102 8.74014 12.0603 8.97014 11.0703L9.21014 10.0403L8.41014 9.30023C7.97014 8.86023 7.81014 8.33025 7.96014 7.85025C8.11014 7.37025 8.55014 7.03024 9.17014 6.93024L10.2401 6.75024L10.7501 5.63025C11.0401 5.06025 11.4901 4.74023 12.0001 4.74023C12.5101 4.74023 12.9701 5.07026 13.2501 5.64026L13.8401 6.82025L14.8301 6.94025C15.4401 7.04025 15.8801 7.38023 16.0401 7.86023C16.1901 8.34023 16.0301 8.87024 15.5901 9.31024L14.7601 10.1403L15.0201 11.0703C15.2501 12.0603 14.8001 12.5102 14.5901 12.6602C14.4801 12.7502 14.2401 12.8903 13.8901 12.8903ZM9.61014 8.39026L10.3001 9.08023C10.6201 9.40023 10.7801 9.94025 10.6801 10.3802L10.4901 11.1802L11.2901 10.7102C11.7201 10.4602 12.3001 10.4602 12.7201 10.7102L13.5201 11.1802L13.3401 10.3802C13.2401 9.93025 13.3901 9.40023 13.7101 9.08023L14.4001 8.39026L13.5301 8.24023C13.1101 8.17023 12.6901 7.86026 12.5001 7.48026L12.0001 6.50024L11.5001 7.50024C11.3201 7.87024 10.9001 8.19025 10.4801 8.26025L9.61014 8.39026Z"
                fill="#00838F"
              />
            </svg>
            امتیاز کاربر:
          </div>
          <div className="w-4/5 flex flex-col gap-3">
            <div className="w-full flex items-stretch">
              <div className="flex gap-2 items-center rounded-r-lg bg-white h-14 px-4 flex-1">
                {pointsData?.length}
              </div>
              <button
                onClick={() => openPointsHistoryModal(pointsData)}
                className="rounded-l-lg px-2 min-w-[128px] justify-center font-medium font-KalamehMed h-14 text-sm flex items-center text-white bg-cyann transition-colors duration-500 hover:bg-primary gap-2"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.55 21.67C18.84 20.54 22 16.64 22 12C22 6.48 17.56 2 12 2C5.33 2 2 7.56 2 7.56M2 7.56V3M2 7.56H4.01H6.44"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 12C2 17.52 6.48 22 12 22"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-dasharray="3 3"
                  />
                </svg>
                تاریخچه
              </button>
            </div>
            <div className="flex flex-col gap-3 items-center rounded-lg bg-white p-4 w-full">
              <div className="w-full flex items-center justify-between ">
                <span className="text-primary text-sm">
                  آخرین جوایز دریافت شده:
                </span>
                <button
                  onClick={() => openAllPointsHistoryModal(pointsData)}
                  className="px-3 font-medium font-KalamehMed h-10 text-sm rounded flex items-center text-white bg-cyann transition-colors duration-500 hover:bg-primary"
                >
                  همه جوایز
                </button>
              </div>
              {pointsQuery?.isLoading ? (
                <div className="w-full flex justify-center">
                  <Loading className="w-10 h-10 text-blacklead animate-pulse" />
                </div>
              ) : (
                pointsData?.slice(-3)?.map((point) => (
                  <div
                    className={`w-full items-center min-h-[50px] p-3 rounded-lg flex gap-5 text-xs font-medium font-KalamehMed bg-blue-lightt `}
                  >
                    <div className="flex-1">{point?.title}</div>
                    <div
                      className={`${
                        point?.type === "DECREASE"
                          ? "text-red-700"
                          : "text-green-700"
                      }`}
                    >
                      {point?.amount} امتیاز
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
                d="M16.9 19.0098C16.59 19.0098 16.28 18.9197 16.01 18.7397L15.05 18.1097C14.78 17.9297 14.65 17.5898 14.74 17.2798C14.81 17.0498 14.84 16.7797 14.84 16.4797V12.4097C14.84 10.7797 13.82 9.75977 12.19 9.75977H5.39999C5.27999 9.75977 5.17 9.76978 5.06 9.77979C4.85 9.78979 4.65001 9.71977 4.49001 9.57977C4.33001 9.43977 4.25 9.23979 4.25 9.02979V6.25977C4.25 3.31977 6.31 1.25977 9.25 1.25977H17.75C20.69 1.25977 22.75 3.31977 22.75 6.25977V11.3597C22.75 12.8097 22.26 14.0897 21.36 14.9697C20.64 15.6997 19.64 16.1698 18.5 16.3098V17.4197C18.5 18.0197 18.17 18.5598 17.65 18.8398C17.41 18.9498 17.15 19.0098 16.9 19.0098ZM16.3 17.1298L16.95 17.4998C17.01 17.4698 17.01 17.4197 17.01 17.4097V15.5997C17.01 15.1897 17.35 14.8497 17.76 14.8497C18.81 14.8497 19.7 14.5198 20.31 13.8998C20.94 13.2798 21.26 12.3997 21.26 11.3497V6.24976C21.26 4.11976 19.89 2.74976 17.76 2.74976H9.25999C7.12999 2.74976 5.75999 4.11976 5.75999 6.24976V8.24976H12.2C14.64 8.24976 16.35 9.95978 16.35 12.3998V16.4697C16.34 16.6997 16.33 16.9198 16.3 17.1298Z"
                fill="#00838F"
              />
              <path
                d="M6.07001 22.75C5.85001 22.75 5.62 22.7 5.41 22.59C4.94 22.34 4.64999 21.86 4.64999 21.32V20.56C3.76999 20.42 2.99 20.05 2.41 19.47C1.65 18.71 1.25 17.67 1.25 16.47V12.4C1.25 10.14 2.72999 8.48002 4.92999 8.27002C5.08999 8.26002 5.23999 8.25 5.39999 8.25H12.19C14.63 8.25 16.34 9.96002 16.34 12.4V16.47C16.34 16.91 16.29 17.32 16.18 17.69C15.73 19.49 14.2 20.62 12.19 20.62H9.7L6.87 22.5C6.63 22.67 6.35001 22.75 6.07001 22.75ZM5.39999 9.75C5.27999 9.75 5.17 9.76002 5.06 9.77002C3.62 9.90002 2.75 10.89 2.75 12.4V16.47C2.75 17.27 3 17.94 3.47 18.41C3.93 18.87 4.59999 19.12 5.39999 19.12C5.80999 19.12 6.14999 19.46 6.14999 19.87V21.18L9.05 19.25C9.17 19.17 9.32 19.12 9.47 19.12H12.19C13.51 19.12 14.44 18.46 14.73 17.3C14.8 17.05 14.84 16.77 14.84 16.47V12.4C14.84 10.77 13.82 9.75 12.19 9.75H5.39999Z"
                fill="#00838F"
              />
            </svg>
            نظرات:
          </div>
          <div className="w-4/5 flex flex-col gap-3">
            <div className="flex gap-2 items-center rounded-lg bg-white h-14 px-4 w-full">
              {commentsData?.length}
              <span>نظر</span>
            </div>
            <div className="flex flex-col gap-3 items-center rounded-lg bg-white p-4 w-full">
              <div className="w-full flex items-center justify-between ">
                <span className="text-primary text-sm">آخرین نظرات:</span>
                <button
                  onClick={openCommentHistoryModal}
                  className="px-3 font-medium font-KalamehMed h-10 text-sm rounded flex items-center text-white bg-cyann transition-colors duration-500 hover:bg-primary"
                >
                  همه نظرات
                </button>
              </div>
              {commentsQuery?.isLoading ? (
                <div className="w-full flex justify-center">
                  <Loading className="w-10 h-10 text-blacklead animate-pulse" />
                </div>
              ) : (
                commentsData?.slice(-3)?.map((comment, index) => (
                  <div
                    key={`user-comment-${index}`}
                    onClick={() => openCommentSingleModal(comment?.id)}
                    className={`w-full p-3 justify-center flex-col min-h-[50px] rounded-lg flex gap-4 text-xs font-medium font-KalamehMed bg-blue-lightt cursor-pointer`}
                  >
                    <div className="w-full gap-3 flex justify-between items-center">
                      <p className="">{comment?.related?.name}</p>
                      <p className="text-cyann">
                        {comment?.created_at_for_humans}
                      </p>
                    </div>
                    <div className="w-full flex justify-between items-center font-light font-Kalameh text-blacklead">
                      {comment?.title}
                    </div>
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

export default ForthUserSection;
