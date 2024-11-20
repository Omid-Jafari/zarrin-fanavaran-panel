import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { draftProduct, duplicateProduct } from "../../../api/ApiClient";
import { ProductStatus } from "../../../constant/ProductStatus";
import AddProductContext from "../../../context/product/AddProductContext";
import { fromEdit } from "../../../utils/FromEdit";
import Loading from "../../elements/loading";

const AddProductSidebar = (props) => {
  const { handlePublish, publishModal, publishingModal, addProductquery } =
    props;
  const { step, productData, dispatch } = useContext(AddProductContext);
  const navigate = useNavigate();
  const param = useParams();

  const draftProductMutate = useMutation(draftProduct, {
    onSuccess: (res) => {
      navigate("/all-products");
    },
  });
  const duplicateProductMutate = useMutation(duplicateProduct, {
    onSuccess: (res) => {
      navigate("/all-products");
    },
  });
  function publishProductFunc() {
    if (fromEdit() && step != 9) {
      openPublishModal();
    } else {
      handlePublish.current.PublishProduct();
    }
  }
  const publishingProductFunc = () => {
    if (fromEdit() && step != 9) {
      openPublishingModal();
    } else {
      handlePublish.current?.PublishingProduct();
    }
  };
  function handleDraftProduct() {
    if (fromEdit()) {
      draftProductMutate.mutate(param?.id);
    } else if (step === 9) {
      handlePublish.current?.draftProductStepNine();
    } else {
      console.log("fdafasfasfasf",productData);
      productData.status = ProductStatus.DRAFT;
      addProductquery.mutate(productData);
    }
  }
  const openPublishModal = () => {
    publishModal.current.openModal();
  };
  const openPublishingModal = () => {
    publishingModal.current.openModal();
  };
  const handleDuplicateProduct = () => {
    duplicateProductMutate.mutate(param?.id);
  };

  return (
    <div className="p-3  rounded-lg bg-[#DBEEF6] flex flex-col justify-start h-full items-center">
      <div className=" w-full rounded-[4px] bg-white flex flex-col justify-start items-center text-right p-2">
        <p className="w-full font-Kalameh text-sm text-black">وضعیت :</p>
        <p className="w-full mt-1 font-Kalameh text-sm text-black">
          ذخیره در پیشنویس
        </p>
        <div className="w-full first-letter:flex flex-row justify-between mt-3 items-center">
          <span className="text-[#C4C7C7] text-[12px]">آخرین تغییر : </span>
          <span className="text-[#C4C7C7] text-[12px]">
            {productData?.jupdated_at}
          </span>
        </div>
      </div>

      {/* item1 */}
      <button
        disabled={step !== 9 && !fromEdit()}
        onClick={() => {
          publishProductFunc();
        }}
        className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill=""
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.98999 22.7496C9.78999 22.7496 9.62999 22.7096 9.50999 22.6596C9.10999 22.5096 8.42999 22.0196 8.42999 20.4696V14.0196H6.08999C4.74999 14.0196 4.26999 13.3896 4.09999 13.0196C3.92999 12.6396 3.77999 11.8696 4.65999 10.8596L12.23 2.25964C13.25 1.09964 14.08 1.17964 14.48 1.32964C14.88 1.47964 15.56 1.96964 15.56 3.51964V9.96964H17.9C19.24 9.96964 19.72 10.5996 19.89 10.9696C20.06 11.3496 20.21 12.1196 19.33 13.1296L11.76 21.7296C11.05 22.5396 10.43 22.7496 9.98999 22.7496ZM13.93 2.73964C13.9 2.77964 13.69 2.87964 13.36 3.25964L5.78999 11.8596C5.50999 12.1796 5.46999 12.3796 5.46999 12.4196C5.48999 12.4296 5.66999 12.5296 6.08999 12.5296H9.17999C9.58999 12.5296 9.92999 12.8696 9.92999 13.2796V20.4796C9.92999 20.9796 10.02 21.1996 10.06 21.2596C10.09 21.2196 10.3 21.1196 10.63 20.7396L18.2 12.1396C18.48 11.8196 18.52 11.6196 18.52 11.5796C18.5 11.5696 18.32 11.4696 17.9 11.4696H14.81C14.4 11.4696 14.06 11.1296 14.06 10.7196V3.51964C14.07 3.01964 13.97 2.80964 13.93 2.73964Z"
            // fill="#C4C7C7"
          />
        </svg>
        <span className="">منتشر کردن</span>
      </button>

      {/* item2 */}
      {fromEdit() && (
        <Link
          to="#"
          className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 16.3299C9.61001 16.3299 7.67001 14.3899 7.67001 11.9999C7.67001 9.60992 9.61001 7.66992 12 7.66992C14.39 7.66992 16.33 9.60992 16.33 11.9999C16.33 14.3899 14.39 16.3299 12 16.3299ZM12 9.16992C10.44 9.16992 9.17001 10.4399 9.17001 11.9999C9.17001 13.5599 10.44 14.8299 12 14.8299C13.56 14.8299 14.83 13.5599 14.83 11.9999C14.83 10.4399 13.56 9.16992 12 9.16992Z" />
            <path d="M12 21.0205C8.23999 21.0205 4.68999 18.8205 2.24999 15.0005C1.18999 13.3505 1.18999 10.6605 2.24999 9.00047C4.69999 5.18047 8.24999 2.98047 12 2.98047C15.75 2.98047 19.3 5.18047 21.74 9.00047C22.8 10.6505 22.8 13.3405 21.74 15.0005C19.3 18.8205 15.75 21.0205 12 21.0205ZM12 4.48047C8.76999 4.48047 5.67999 6.42047 3.51999 9.81047C2.76999 10.9805 2.76999 13.0205 3.51999 14.1905C5.67999 17.5805 8.76999 19.5205 12 19.5205C15.23 19.5205 18.32 17.5805 20.48 14.1905C21.23 13.0205 21.23 10.9805 20.48 9.81047C18.32 6.42047 15.23 4.48047 12 4.48047Z" />
          </svg>

          <span className=""> نمایش کامل</span>
        </Link>
      )}

      {/* item3 */}
      {console.log("firstasdsdaasd", step >= 7, !fromEdit())}
      <button
        disabled={(step <= 2 || fromEdit()) && !fromEdit()}
        onClick={() => handleDraftProduct()}
        className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
      >
        {addProductquery?.isLoading && productData?.status === "DRAFT" ? (
          <div className="w-full flex justify-center">
            <Loading className="w-10 h-10 text-blacklead animate-pulse" />
          </div>
        ) : (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H14C14.41 1.25 14.75 1.59 14.75 2C14.75 2.41 14.41 2.75 14 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V10C21.25 9.59 21.59 9.25 22 9.25C22.41 9.25 22.75 9.59 22.75 10V15C22.75 20.43 20.43 22.75 15 22.75Z" />
              <path d="M22 10.7505H18C14.58 10.7505 13.25 9.42048 13.25 6.00048V2.00048C13.25 1.70048 13.43 1.42048 13.71 1.31048C13.99 1.19048 14.31 1.26048 14.53 1.47048L22.53 9.47048C22.74 9.68048 22.81 10.0105 22.69 10.2905C22.57 10.5705 22.3 10.7505 22 10.7505ZM14.75 3.81048V6.00048C14.75 8.58048 15.42 9.25048 18 9.25048H20.19L14.75 3.81048Z" />
              <path d="M13 13.75H7C6.59 13.75 6.25 13.41 6.25 13C6.25 12.59 6.59 12.25 7 12.25H13C13.41 12.25 13.75 12.59 13.75 13C13.75 13.41 13.41 13.75 13 13.75Z" />
              <path d="M11 17.75H7C6.59 17.75 6.25 17.41 6.25 17C6.25 16.59 6.59 16.25 7 16.25H11C11.41 16.25 11.75 16.59 11.75 17C11.75 17.41 11.41 17.75 11 17.75Z" />
            </svg>

            <span className=""> انتقال به پیشنویس</span>
          </>
        )}
      </button>

      {/* item4 */}
      {fromEdit() && (
        <button
          onClick={handleDuplicateProduct}
          className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.4 22.75H7.6C3.21 22.75 1.25 20.79 1.25 16.4V12.6C1.25 8.21 3.21 6.25 7.6 6.25H10.6C11.01 6.25 11.35 6.59 11.35 7C11.35 7.41 11.01 7.75 10.6 7.75H7.6C4.02 7.75 2.75 9.02 2.75 12.6V16.4C2.75 19.98 4.02 21.25 7.6 21.25H11.4C14.98 21.25 16.25 19.98 16.25 16.4V13.4C16.25 12.99 16.59 12.65 17 12.65C17.41 12.65 17.75 12.99 17.75 13.4V16.4C17.75 20.79 15.79 22.75 11.4 22.75Z" />
            <path d="M17 14.1505H13.8C10.99 14.1505 9.85001 13.0105 9.85001 10.2005V7.00048C9.85001 6.70048 10.03 6.42048 10.31 6.31048C10.59 6.19048 10.91 6.26048 11.13 6.47048L17.53 12.8705C17.74 13.0805 17.81 13.4105 17.69 13.6905C17.58 13.9705 17.3 14.1505 17 14.1505ZM11.35 8.81048V10.2005C11.35 12.1905 11.81 12.6505 13.8 12.6505H15.19L11.35 8.81048Z" />
            <path d="M15.6 2.75H11.6C11.19 2.75 10.85 2.41 10.85 2C10.85 1.59 11.19 1.25 11.6 1.25H15.6C16.01 1.25 16.35 1.59 16.35 2C16.35 2.41 16.01 2.75 15.6 2.75Z" />
            <path d="M7 5.75C6.59 5.75 6.25 5.41 6.25 5C6.25 2.93 7.93 1.25 10 1.25H12.62C13.03 1.25 13.37 1.59 13.37 2C13.37 2.41 13.03 2.75 12.62 2.75H10C8.76 2.75 7.75 3.76 7.75 5C7.75 5.41 7.41 5.75 7 5.75Z" />
            <path d="M19.19 17.75C18.78 17.75 18.44 17.41 18.44 17C18.44 16.59 18.78 16.25 19.19 16.25C20.33 16.25 21.25 15.32 21.25 14.19V8C21.25 7.59 21.59 7.25 22 7.25C22.41 7.25 22.75 7.59 22.75 8V14.19C22.75 16.15 21.15 17.75 19.19 17.75Z" />
            <path d="M22 8.75048H19C16.34 8.75048 15.25 7.66048 15.25 5.00048V2.00048C15.25 1.70048 15.43 1.42048 15.71 1.31048C15.99 1.19048 16.31 1.26048 16.53 1.47048L22.53 7.47048C22.74 7.68048 22.81 8.01048 22.69 8.29048C22.58 8.57048 22.3 8.75048 22 8.75048ZM16.75 3.81048V5.00048C16.75 6.83048 17.17 7.25048 19 7.25048H20.19L16.75 3.81048Z" />
          </svg>

          <span className="">دو برابر کردن</span>
        </button>
      )}

      {/* item5 */}
      <button
        disabled={step !== 9 && !fromEdit()}
        onClick={publishingProductFunc}
        className="w-full gap-1 py-2 h-11 rounded-[4px] bg-[#4FB3BF] hover:bg-primary transition-colors duration-300 disabled:bg-[#E0E3E3] mt-4 flex flex-row justify-start items-center text-right p-2 text-white text-sm disabled:text-[#C4C7C7] fill-white disabled:fill-[#C4C7C7]"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z" />
          <path d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z" />
          <path d="M20.5 9.83984H3.5C3.09 9.83984 2.75 9.49984 2.75 9.08984C2.75 8.67984 3.09 8.33984 3.5 8.33984H20.5C20.91 8.33984 21.25 8.67984 21.25 9.08984C21.25 9.49984 20.91 9.83984 20.5 9.83984Z" />
          <path d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V17C21.75 20.65 19.65 22.75 16 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z" />
          <path d="M8.5 14.5C8.37 14.5 8.24 14.47 8.12 14.42C8 14.37 7.89001 14.3 7.79001 14.21C7.70001 14.11 7.62999 14 7.57999 13.88C7.52999 13.76 7.5 13.63 7.5 13.5C7.5 13.24 7.61001 12.98 7.79001 12.79C7.89001 12.7 8 12.63 8.12 12.58C8.3 12.5 8.50001 12.48 8.70001 12.52C8.76001 12.53 8.82 12.55 8.88 12.58C8.94 12.6 9 12.63 9.06 12.67C9.11 12.71 9.15999 12.75 9.20999 12.79C9.24999 12.84 9.29999 12.89 9.32999 12.94C9.36999 13 9.40001 13.06 9.42001 13.12C9.45001 13.18 9.47001 13.24 9.48001 13.3C9.49001 13.37 9.5 13.43 9.5 13.5C9.5 13.76 9.38999 14.02 9.20999 14.21C9.01999 14.39 8.76 14.5 8.5 14.5Z" />
          <path d="M12 14.4999C11.74 14.4999 11.48 14.3899 11.29 14.2099C11.25 14.1599 11.21 14.1099 11.17 14.0599C11.13 13.9999 11.1 13.9399 11.08 13.8799C11.05 13.8199 11.03 13.7599 11.02 13.6999C11.01 13.6299 11 13.5699 11 13.4999C11 13.3699 11.03 13.2399 11.08 13.1199C11.13 12.9999 11.2 12.8899 11.29 12.7899C11.57 12.5099 12.02 12.4199 12.38 12.5799C12.51 12.6299 12.61 12.6999 12.71 12.7899C12.89 12.9799 13 13.2399 13 13.4999C13 13.5699 12.99 13.6299 12.98 13.6999C12.97 13.7599 12.95 13.8199 12.92 13.8799C12.9 13.9399 12.87 13.9999 12.83 14.0599C12.79 14.1099 12.75 14.1599 12.71 14.2099C12.61 14.2999 12.51 14.3699 12.38 14.4199C12.26 14.4699 12.13 14.4999 12 14.4999Z" />
          <path d="M8.5 17.9999C8.37 17.9999 8.24 17.9699 8.12 17.9199C8 17.8699 7.89001 17.7999 7.79001 17.7099C7.70001 17.6099 7.62999 17.5099 7.57999 17.3799C7.52999 17.2599 7.5 17.1299 7.5 16.9999C7.5 16.7399 7.61001 16.4799 7.79001 16.2899C7.89001 16.1999 8 16.1299 8.12 16.0799C8.49 15.9199 8.92999 16.0099 9.20999 16.2899C9.24999 16.3399 9.29999 16.3899 9.32999 16.4399C9.36999 16.4999 9.40001 16.5599 9.42001 16.6199C9.45001 16.6799 9.47001 16.7399 9.48001 16.8099C9.49001 16.8699 9.5 16.9399 9.5 16.9999C9.5 17.2599 9.38999 17.5199 9.20999 17.7099C9.01999 17.8899 8.76 17.9999 8.5 17.9999Z" />
        </svg>

        <span className=""> تنظیم زمان انتشار</span>
      </button>
    </div>
  );
};

export default AddProductSidebar;
