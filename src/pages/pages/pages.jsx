import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "../../../public/images/icons/addIcon";
import Loading from "../../components/elements/loading";
import PagesFirstTable from "../../components/pages/pagesFirstTable";

const Pages = () => {
  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <div className="w-full flex items-center justify-between flex-wrap">
        <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-1 items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.81 20.1805C15.55 20.1805 15.28 20.1705 14.99 20.1405C14.47 20.1005 13.88 20.0005 13.27 19.8505L11.59 19.4505C6.98001 18.3605 5.47001 15.9205 6.55001 11.3205L7.53001 7.1305C7.75001 6.1805 8.01001 5.4105 8.33001 4.7705C10.05 1.2205 13.34 1.5405 15.68 2.0905L17.35 2.4805C19.69 3.0305 21.17 3.9005 22 5.2305C22.82 6.5605 22.95 8.2705 22.4 10.6105L21.42 14.7905C20.56 18.4505 18.77 20.1805 15.81 20.1805ZM13.12 3.2505C11.45 3.2505 10.39 3.9405 9.68001 5.4205C9.42001 5.9605 9.19001 6.6305 8.99001 7.4705L8.01001 11.6605C7.12001 15.4405 8.15001 17.0905 11.93 17.9905L13.61 18.3905C14.15 18.5205 14.66 18.6005 15.12 18.6405C17.84 18.9105 19.19 17.7205 19.95 14.4505L20.93 10.2705C21.38 8.3405 21.32 6.9905 20.72 6.0205C20.12 5.0505 18.94 4.3905 17 3.9405L15.33 3.5505C14.5 3.3505 13.76 3.2505 13.12 3.2505Z"
              fill="#222427"
            />
            <path
              d="M8.32999 22.2497C5.75999 22.2497 4.11999 20.7097 3.06999 17.4597L1.78999 13.5097C0.369991 9.10968 1.63999 6.62968 6.01999 5.20968L7.59999 4.69968C8.11999 4.53968 8.50999 4.42968 8.85999 4.36968C9.14999 4.30968 9.42999 4.41968 9.59999 4.64968C9.76999 4.87968 9.79999 5.17968 9.67999 5.43968C9.41999 5.96968 9.18999 6.63968 8.99999 7.47968L8.01999 11.6697C7.12999 15.4497 8.15999 17.0997 11.94 17.9997L13.62 18.3997C14.16 18.5297 14.67 18.6097 15.13 18.6497C15.45 18.6797 15.71 18.8997 15.8 19.2097C15.88 19.5197 15.76 19.8397 15.5 20.0197C14.84 20.4697 14.01 20.8497 12.96 21.1897L11.38 21.7097C10.23 22.0697 9.22999 22.2497 8.32999 22.2497ZM7.77999 6.21968L6.48999 6.63968C2.91999 7.78968 2.06999 9.46968 3.21999 13.0497L4.49999 16.9997C5.65999 20.5697 7.33999 21.4297 10.91 20.2797L12.49 19.7597C12.55 19.7397 12.6 19.7197 12.66 19.6997L11.6 19.4497C6.98999 18.3597 5.47999 15.9197 6.55999 11.3197L7.53999 7.12968C7.60999 6.80968 7.68999 6.49968 7.77999 6.21968Z"
              fill="#222427"
            />
            <path
              d="M17.49 10.5098C17.43 10.5098 17.37 10.4998 17.3 10.4898L12.45 9.25978C12.05 9.15978 11.81 8.74978 11.91 8.34978C12.01 7.94978 12.42 7.70978 12.82 7.80978L17.67 9.03978C18.07 9.13978 18.31 9.54978 18.21 9.94978C18.13 10.2798 17.82 10.5098 17.49 10.5098Z"
              fill="#222427"
            />
            <path
              d="M14.56 13.8909C14.5 13.8909 14.44 13.8809 14.37 13.8709L11.46 13.1309C11.06 13.0309 10.82 12.6209 10.92 12.2209C11.02 11.8209 11.43 11.5809 11.83 11.6809L14.74 12.4209C15.14 12.5209 15.38 12.9309 15.28 13.3309C15.2 13.6709 14.9 13.8909 14.56 13.8909Z"
              fill="#222427"
            />
          </svg>
          همه صفحات:
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
            onClick={
              () => {}
              //   productsExportMutation?.mutate({
              //     filterData,
              //     category_ids: category_ids?.replaceAll(",", "&category_ids[]="),
              //     brand_ids: brand_ids?.replaceAll(",", "&brand_ids[]="),
              //     attribute_ids: attribute_ids?.replaceAll(
              //       ",",
              //       "&attribute_ids[]="
              //     ),
              //     feature_ids: feature_ids?.replaceAll(",", "&feature_ids[]="),
              //   })
            }
          >
            {false ? (
              <Loading className="w-14 h-14 text-blacklead animate-pulse" />
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
            افزودن صفحه جدید
          </Link>
        </div>
      </div>
      <PagesFirstTable />
    </div>
  );
};

export default Pages;
