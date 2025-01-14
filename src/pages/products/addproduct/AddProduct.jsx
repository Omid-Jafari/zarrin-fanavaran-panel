import { useMutation } from "@tanstack/react-query";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addProducts } from "../../../api/ApiClient";
import AddProductSidebar from "../../../components/product/addproduct/AddProductSidebar";
import AddProductStepper from "../../../components/product/addproduct/AddProductStepper";
import PublishingProductModal from "../../../components/product/addproduct/PublishingProductModal";
import PublishProductModal from "../../../components/product/addproduct/PublishProductModal";
import StepEightDescription from "../../../components/product/addproduct/steps/StepEightDescription";
import StepFiveColor from "../../../components/product/addproduct/steps/StepFiveColor";
import StepFourGeneralInformation from "../../../components/product/addproduct/steps/StepFourGeneralInformation";
import StepNineSettings from "../../../components/product/addproduct/steps/StepNineSettings";
import StepOneCategory from "../../../components/product/addproduct/steps/StepOneCategory";
import StepSevenDescription from "../../../components/product/addproduct/steps/StepSevenDescription";
import StepSixInventoryAndPrice from "../../../components/product/addproduct/steps/StepSixInventoryAndPrice";
import StepThreeSpecifications from "../../../components/product/addproduct/steps/StepThreeSpecifications";
import StepTwoInformation from "../../../components/product/addproduct/steps/StepTwoInformation";
import AddProductContext from "../../../context/product/AddProductContext";

function AddProduct() {
  let minHeight = window?.innerHeight - 132;
  const { step, productData } = useContext(AddProductContext);
  const navigate = useNavigate();
  const handlePublish = useRef();
  const publishingModal = useRef();
  const publishModal = useRef();
  const addProductquery = useMutation((data) => addProducts(data), {
    onSuccess: (res) => {
      navigate("/all-products");
    },
  });

  const StepComponent = [
    <StepOneCategory />,
    <StepTwoInformation />,
    <StepThreeSpecifications />,
    <StepFourGeneralInformation />,
    <StepFiveColor />,
    <StepSixInventoryAndPrice />,
    <StepSevenDescription />,
    <StepEightDescription />,
    <StepNineSettings ref={handlePublish} addProductquery={addProductquery} />,
  ];

  return (
    <>
      <PublishProductModal ref={publishModal} values={productData} />
      <PublishingProductModal ref={publishingModal} values={productData} />
      <div className="w-full h-full flex flex-col pt-5 px-5">
        <div className="w-full flex items-center justify-between">
          <h5 className="font-KalamehMed text-lg font-medium flex text-black gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0002 22.7502C17.6002 22.7502 16.2902 22.1403 15.3902 21.0703C15.3802 21.0503 15.3202 21.0002 15.2702 20.9202C15.1602 20.8102 15.0302 20.6102 14.9202 20.4202C14.4802 19.7102 14.2402 18.8702 14.2402 17.9902C14.2402 16.5302 14.8902 15.1803 16.0202 14.2803C16.8602 13.6103 17.9202 13.2402 18.9902 13.2402C20.1502 13.2402 21.2202 13.6403 22.0802 14.3903C22.2002 14.4703 22.3402 14.6203 22.4702 14.7603C23.2802 15.6503 23.7302 16.7902 23.7302 17.9802C23.7302 18.8502 23.4902 19.7002 23.0402 20.4302C22.8002 20.8502 22.4702 21.2302 22.0902 21.5502C21.2802 22.3302 20.1702 22.7502 19.0002 22.7502ZM19.0002 14.7502C18.2602 14.7502 17.5602 15.0002 16.9702 15.4702C16.2002 16.0802 15.7502 17.0102 15.7502 18.0002C15.7502 18.5902 15.9102 19.1702 16.2202 19.6702C16.3002 19.8102 16.3802 19.9203 16.4702 20.0303C16.4902 20.0503 16.5502 20.1102 16.6002 20.1902C17.1502 20.8402 18.0502 21.2603 19.0002 21.2603C19.7902 21.2603 20.5502 20.9703 21.1302 20.4503C21.3902 20.2303 21.6102 19.9702 21.7702 19.6902C22.0902 19.1802 22.2502 18.6003 22.2502 18.0103C22.2502 17.2003 21.9402 16.4102 21.3802 15.8002C21.3102 15.7202 21.2302 15.6403 21.1502 15.5803C20.5202 15.0203 19.7902 14.7502 19.0002 14.7502Z"
                fill="#222427"
              />
              <path
                d="M20.49 18.7305H17.5C17.09 18.7305 16.75 18.3905 16.75 17.9805C16.75 17.5705 17.09 17.2305 17.5 17.2305H20.49C20.9 17.2305 21.24 17.5705 21.24 17.9805C21.24 18.3905 20.91 18.7305 20.49 18.7305Z"
                fill="#222427"
              />
              <path
                d="M19 20.2595C18.59 20.2595 18.25 19.9195 18.25 19.5095V16.5195C18.25 16.1095 18.59 15.7695 19 15.7695C19.41 15.7695 19.75 16.1095 19.75 16.5195V19.5095C19.75 19.9295 19.41 20.2595 19 20.2595Z"
                fill="#222427"
              />
              <path
                d="M11.9998 13.2999C11.8698 13.2999 11.7398 13.2699 11.6198 13.1999L2.78983 8.0899C2.42983 7.8799 2.30984 7.41987 2.51984 7.05987C2.72984 6.69987 3.18983 6.57985 3.53983 6.78985L11.9898 11.6799L20.3898 6.81988C20.7498 6.60988 21.2098 6.7399 21.4098 7.0899C21.6198 7.4499 21.4898 7.90987 21.1398 8.11987L12.3698 13.1999C12.2598 13.2599 12.1298 13.2999 11.9998 13.2999Z"
                fill="#222427"
              />
              <path
                d="M12 22.36C11.59 22.36 11.25 22.02 11.25 21.61V12.54C11.25 12.13 11.59 11.79 12 11.79C12.41 11.79 12.75 12.13 12.75 12.54V21.61C12.75 22.02 12.41 22.36 12 22.36Z"
                fill="#222427"
              />
              <path
                d="M11.9999 22.7499C11.1199 22.7499 10.2399 22.5599 9.55988 22.1699L4.21988 19.2099C2.76988 18.4099 1.62988 16.4799 1.62988 14.8199V9.1599C1.62988 7.4999 2.76988 5.57994 4.21988 4.76994L9.55988 1.80992C10.9199 1.03992 13.0599 1.03992 14.4299 1.80992L19.7699 4.76994C21.2199 5.56994 22.3599 7.4999 22.3599 9.1599V14.8199C22.3599 14.9199 22.3599 14.9999 22.3399 15.0999C22.2899 15.3599 22.0999 15.5799 21.8499 15.6599C21.5999 15.7499 21.3199 15.6899 21.1099 15.5199C19.9599 14.5199 18.1799 14.4799 16.9699 15.4499C16.1999 16.0599 15.7499 16.9899 15.7499 17.9799C15.7499 18.5699 15.9099 19.1499 16.2199 19.6499C16.2999 19.7899 16.3799 19.8999 16.4699 20.0099C16.6199 20.1799 16.6799 20.4099 16.6399 20.6299C16.5999 20.8499 16.4599 21.0399 16.2599 21.1499L14.4299 22.1599C13.7499 22.5599 12.8799 22.7499 11.9999 22.7499ZM11.9999 2.74992C11.3799 2.74992 10.7499 2.87993 10.2999 3.12993L4.95988 6.08995C3.98988 6.61995 3.14987 8.0599 3.14987 9.1599V14.8199C3.14987 15.9199 3.99988 17.3599 4.95988 17.8899L10.2999 20.8499C11.2099 21.3599 12.7999 21.3599 13.7099 20.8499L14.8299 20.2299C14.4599 19.5599 14.2599 18.7799 14.2599 17.9799C14.2599 16.5199 14.9099 15.1699 16.0399 14.2699C17.3999 13.1799 19.3499 12.9499 20.8699 13.5999V9.13994C20.8699 8.03994 20.0199 6.59993 19.0599 6.06993L13.7199 3.10991C13.2499 2.87991 12.6199 2.74992 11.9999 2.74992Z"
                fill="#222427"
              />
            </svg>
            افزودن محصول جدید
          </h5>
        </div>
        <div className="w-full flex-1 gap-5 mt-4 flex flex-row">
          {/* add */}
          <div
            className="bg-[#DBEEF6] flex flex-col justify-between rounded-[8px] flex-1"
            style={{ minHeight: minHeight }}
          >
            {/* stepper */}
            <div className="flex flex-row w-full">
              <AddProductStepper />
            </div>

            {/* steps */}
            <div className="flex flex-row w-full h-full mt-8 px-6 mb-4">
              {/* <StepOneCategory /> */}
              {
                StepComponent?.map((item, index) => index + 1 == step && item)
                // <StepNineSettings/>
              }
            </div>

            {/* buttond */}
          </div>

          {/* left sidebar */}
          <AddProductSidebar
            handlePublish={handlePublish}
            publishModal={publishModal}
            publishingModal={publishingModal}
            addProductquery={addProductquery}
          />
        </div>
      </div>
    </>
  );
}

export default AddProduct;
