import React, { useContext } from "react";
import { items } from "../../../constant/SteperItem";
import AddProductContext from "../../../context/product/AddProductContext";

function AddProductStepper() {
    const {step,dispatch}=useContext(AddProductContext)
    const handleNextStep = (stepp) => {
      dispatch({
        type: "STEP",
        step: Number(stepp) ,
      });
    };
  return (
    <div class=" w-full">
      <div class="mx-6 py-6">
        <div class="flex -space-x-1 items-center">
          {items.map((item, index) => (
            <>
              <div class="flex items-center text-teal-600 relative">
                {item.step == step ? (
                  <svg
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13.375" cy="13" r="12" fill="#00838F" />
                  </svg>
                ) : item.step < step ? (
                  <svg
                  onClick={()=>handleNextStep(item.step)}
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 0C6.337 0 0.5 5.837 0.5 13C0.5 20.163 6.337 26 13.5 26C20.663 26 26.5 20.163 26.5 13C26.5 5.837 20.663 0 13.5 0ZM19.714 10.01L12.343 17.381C12.161 17.563 11.914 17.667 11.654 17.667C11.394 17.667 11.147 17.563 10.965 17.381L7.286 13.702C6.909 13.325 6.909 12.701 7.286 12.324C7.663 11.947 8.287 11.947 8.664 12.324L11.654 15.314L18.336 8.632C18.713 8.255 19.337 8.255 19.714 8.632C20.091 9.009 20.091 9.62 19.714 10.01Z"
                      fill="#00838F"
                    />
                  </svg>
                ) : (
                  <svg
                    width="27"
                    height="26"
                    viewBox="0 0 27 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13.75" cy="13" r="12" fill="white" />
                  </svg>
                )}

                <div class={`absolute font-Kalameh top-0 -mr-2  text-right mt-10 text-[12px]  w-32  ${item.step==step?'!text-[#003E43] font-bold scale-105 transition-all ease-linear':  item < step?'text-[#003E43]':'text-[#8E9191]'} `}
                >
                  {item.title}
                </div>
              </div>
              {index != 8 ? (
                <div class={`flex-auto rounded-lg border-t-[5px] transition duration-500 ease-in-out
                
                ${item.step < step ?" border-teal-600":" border-white"}
               
                
                `}></div>
              ) : (
                ""
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddProductStepper;
