import React from "react";

const CustomRadioBtn = (props) => {
  const { clickFunc, checkCondition } = props;
  return (
    <div
      onClick={clickFunc}
      className={`h-[15px] w-[35px] rounded-full shadow-[inset_0px_0px_5px_rgba(0,0,0,0.5)] cursor-pointer relative ${
        checkCondition ? "bg-[#478F95]" : "bg-[#1C3F3A]"
      }`}
    >
      <div
        className={`w-[15px] h-[15px] rounded-full bg-[#E4E4FF] shadow-[1px_0px_2px_rgba(0,0,0,0.34)] flex items-center justify-center absolute top-0 transition-all duration-300 ${
          checkCondition ? "left-[20px]" : "left-0"
        }`}
      ></div>
    </div>
  );
};

export default CustomRadioBtn;
