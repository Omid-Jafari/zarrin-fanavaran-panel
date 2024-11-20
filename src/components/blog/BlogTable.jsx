import { Link } from "react-router-dom";
import DeleteIcon from "../../../public/images/icons/deleteIcon";
import Checkbox from "../../components/common/checkbox";
import Loading from "../../components/elements/loading";

const BlogTable = (props) => {
  const {
    setBlogIds,
    blogIds,
    search,
    blogsMutation,
    blogsDeleteMutation,
    blogsData,
  } = props;

  return (
    <>
      {/* header content */}
      <div className="w-full flex items-center bg-white border border-blacklead rounded-lg font-KalamehMed text-sm font-medium">
        <div className="w-[2.129rem] flex justify-center"></div>
        <div className="flex flex-1 px-5 gap-3 items-center">
          <div className="flex-1 w-full grid grid-cols-4 gap-x-4 items-center h-11">
            <div className="col-span-1">
              <p className="">شماره صفحه</p>
            </div>
            <div className="col-span-1">
              <p className="">نام صفحه</p>
            </div>
            <div className="col-span-1">
              <p className="">اخرین تغییرات</p>
            </div>
            <div className="col-span-1">
              <p className="">دسته</p>
            </div>
          </div>
          <div className="w-[120px]">وضعیت</div>
          <div className="w-[120px]"></div>
          <div className="w-[120px]"></div>
        </div>
      </div>
      {/* table rows */}
      {blogsMutation?.isLoading || blogsDeleteMutation?.isLoading ? (
        <div className="w-full flex items-center justify-center mt-5">
          <Loading className="w-14 h-14 text-blacklead animate-pulse" />
        </div>
      ) : blogsData?.length === 0 && search ? (
        <div className="w-full flex justify-center mt-5">
          متاسفانه هیچ صفحه ای یافت نشد
        </div>
      ) : (
        <div
          className="overflow-y-scroll hide-scrollbar w-full"
          // style={{ maxHeight: maxHeightTable }}
        >
          {blogsData?.map((blog) => (
            <div
              key={`blogColumn${blog?.id}`}
              className={`w-full flex items-center mb-4 rounded-lg p-[2px] font-medium font-KalamehMed text-sm ${
                blogIds.findIndex((bId) => bId === blog?.id) === -1
                  ? ""
                  : "bg-blacklead"
              }`}
            >
              {console.log("blog", blog)}
              <div className="w-[2.129rem] flex justify-center">
                <Checkbox
                  className="w-[18px] h-[18px] rounded-[2px] bg-blue-lightt relative cursor-pointer"
                  id={blog?.id}
                  state={blogIds}
                  setState={setBlogIds}
                />
              </div>
              <div className="flex-1 flex items-center bg-blue-lightt hover:bg-[#C0E2F0] transition-colors duration-500 rounded-lg py-5 px-5 gap-3">
                <div className="flex-1 w-full grid grid-cols-4 gap-x-4 items-center">
                  <div className="col-span-1">
                    <p className="text-sm">#{blog?.id}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm">{blog?.name}</p>
                  </div>
                  <div className="col-span-1 flex justify-start">
                    <p className="text-sm" dir="ltr">
                      {blog?.jupdated_at}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-sm">{blog?.category?.name}</p>
                  </div>
                </div>
                <div className="w-[120px] bg-white rounded h-11 flex justify-center items-center">
                  {blog?.status_info?.name}
                </div>
                <div className="w-[120px]">
                  <Link
                    className="flex items-center justify-center w-full gap-1.5 h-11 bg-primary hover:bg-blacklead transition-colors duration-500 text-white rounded-[4px] font-medium font-KalamehMed text-xs"
                    to={`/blog/page/${blog?.id}`}
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
                <button
                  className="font-KalamehMed font-medium text-sm h-11 bg-[#EFF1F1] hover:bg-[#C4C7C7] transition-colors duration-500 px-3 text-[#CA3636] rounded-[4px] flex items-center gap-1 w-[120px] justify-center"
                  onClick={() => blogsDeleteMutation?.mutate({ id: blog?.id })}
                >
                  <DeleteIcon className="fill-[#CA3636]" />
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogTable;
