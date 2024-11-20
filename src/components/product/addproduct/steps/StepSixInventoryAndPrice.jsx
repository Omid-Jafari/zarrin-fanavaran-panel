import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { guaranteesFilterData } from "../../../../api/ApiClient";
import AddProductContext from "../../../../context/product/AddProductContext";
import slugPersian from "../../../../utils/slugPersian";
import StepSixForms from "../stepSixForms";

function StepSixInventoryAndPrice() {
  const { step, productData, dispatch } = useContext(AddProductContext);
  const [colorIndex, setColorIndex] = useState(0);
  const [guaranteesData, setGuaranteesData] = useState([]);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [items, setItems] = useState(productData?.items);
  const guaranteesFilterDataMutation = useMutation(guaranteesFilterData, {
    onSuccess: (res) => {
      setGuaranteesData(res?.data?.data);
    },
  });
  useEffect(() => {
    guaranteesFilterDataMutation?.mutate({});
  }, []);

  const handleNextStep = () => {
    if (JSON.stringify(errors) === "{}") {
      dispatch({
        type: "ADD",
        productData: { items: items },
      });
      dispatch({
        type: "STEP",
        step: step + 1,
      });
    } else {
      setShowErrors(true);
    }
  };
  const handlepreviosStep = () => {
    dispatch({
      type: "STEP",
      step: step - 1,
    });
  };
  useEffect(() => {
    let basePriceError = items?.filter((item) => !item?.base_price);
    let priceError = items?.filter((item) => !item?.price);
    let stockError = items?.filter((item) => !item?.stock);
    let guaranteeError = items?.filter((item) => !item?.guarantee_id);
    if (basePriceError?.length !== 0) {
      setErrors((prev) => {
        return {
          ...prev,
          basePriceError:
            "لطفا برای تمامی رنگ های انتخاب شده قیمت تمام شده را مشخص کنید",
        };
      });
    } else {
      setErrors((prev) => {
        const { basePriceError, ...edited } = prev;
        return edited;
      });
    }
    if (priceError?.length !== 0) {
      setErrors((prev) => {
        return {
          ...prev,
          priceError:
            "لطفا برای تمامی رنگ های انتخاب شده قیمت فروش را مشخص کنید",
        };
      });
    } else {
      setErrors((prev) => {
        const { priceError, ...edited } = prev;
        return edited;
      });
    }
    if (stockError?.length !== 0) {
      setErrors((prev) => {
        return {
          ...prev,
          stockError: "لطفا برای تمامی رنگ های انتخاب شده موجودی را مشخص کنید",
        };
      });
    } else {
      setErrors((prev) => {
        const { stockError, ...edited } = prev;
        return edited;
      });
    }
    if (guaranteeError?.length !== 0) {
      setErrors((prev) => {
        return {
          ...prev,
          guaranteeError:
            "لطفا برای تمامی رنگ های انتخاب شده گارانتی را مشخص کنید",
        };
      });
    } else {
      setErrors((prev) => {
        const { guaranteeError, ...edited } = prev;
        return edited;
      });
    }
    if (JSON.stringify(errors) === "{}") {
      setShowErrors(false);
    }
  }, [items]);
  return (
    <div className="flex flex-col justify-between items-center  w-full">
      <div className="flex flex-col gap-4 w-full mb-14">
        <h4 className="text-sm font-KalamehMed font-medium ">
          موجودی و قیمت محصول:
        </h4>
        <div className="w-full flex gap-5 items-center flex-wrap">
          {items?.map((color, index) => (
            <button
              key={`buttonColor${index}`}
              className={`flex min-w-[120px] items-center justify-center gap-1.5 h-11 transition-colors duration-500 px-3 rounded-[4px] ${
                colorIndex === index
                  ? "bg-cyann text-white"
                  : "text-black hover:text-white bg-white hover:bg-cyann "
              }`}
              onClick={() => setColorIndex(index)}
            >
              <div
                className={`w-[1.38rem] h-[1.38rem] overflow-hidden flex items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                  colorIndex === index
                    ? "border-[#2F6165]"
                    : "border-[#DBEEF6] hover:border-[#2F6165]"
                }`}
              >
                {console.log("color", color)}
                <img
                  src={color?.color?.media?.icon?.file}
                  className="w-full h-full object-cover rounded-full"
                  alt=""
                />
              </div>
              {color?.name_fa}
            </button>
          ))}
        </div>
        {items?.map(
          (color, index) =>
            index === colorIndex && (
              <StepSixForms
                color={color}
                index={index}
                setItems={setItems}
                guaranteesData={guaranteesData}
                setGuaranteesData={setGuaranteesData}
                guaranteesFilterDataMutation={guaranteesFilterDataMutation}
              />
            )
        )}
      </div>
      {showErrors && (
        <div className="w-full flex flex-col items-end mb-2">
          {errors?.stockError && (
            <p className="text-red-600 text-sm">{errors?.stockError}</p>
          )}
          {errors?.basePriceError && (
            <p className="text-red-600 text-sm">{errors?.basePriceError}</p>
          )}
          {errors?.priceError && (
            <p className="text-red-600 text-sm">{errors?.priceError}</p>
          )}
          {errors?.guaranteeError && (
            <p className="text-red-600 text-sm">{errors?.guaranteeError}</p>
          )}
        </div>
      )}
      <div className="w-full mt-auto flex items-center justify-between">
        <button
          className="flex z-20 items-center justify-center gap-1.5 h-11 bg-white hover:hover:bg-cyann  transition-colors duration-500 px-3 text-black rounded-[4px] font-KalamehMed font-medium"
          onClick={() => handlepreviosStep()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
              fill="#222427"
            />
            <path
              d="M10.7399 16.2802C10.5499 16.2802 10.3599 16.2102 10.2099 16.0602C9.91993 15.7702 9.91993 15.2902 10.2099 15.0002L13.2099 12.0002L10.2099 9.00016C9.91993 8.71016 9.91993 8.23016 10.2099 7.94016C10.4999 7.65016 10.9799 7.65016 11.2699 7.94016L14.7999 11.4702C15.0899 11.7602 15.0899 12.2402 14.7999 12.5302L11.2699 16.0602C11.1199 16.2102 10.9299 16.2802 10.7399 16.2802Z"
              fill="#222427"
            />
          </svg>
          مرحله قبل
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-1.5 h-11 z-20 bg-primary hover:bg-blacklead transition-colors duration-500 px-3 text-white rounded-[4px] font-KalamehMed font-medium"
          onClick={() => handleNextStep()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
              fill="white"
            />
            <path
              d="M13.26 16.2802C13.07 16.2802 12.88 16.2102 12.73 16.0602L9.20001 12.5302C8.91001 12.2402 8.91001 11.7602 9.20001 11.4702L12.73 7.94016C13.02 7.65016 13.5 7.65016 13.79 7.94016C14.08 8.23016 14.08 8.71016 13.79 9.00016L10.79 12.0002L13.79 15.0002C14.08 15.2902 14.08 15.7702 13.79 16.0602C13.65 16.2102 13.46 16.2802 13.26 16.2802Z"
              fill="white"
            />
          </svg>
          مرحله بعد
        </button>
      </div>
    </div>
  );
}

export default StepSixInventoryAndPrice;
