import React, { useState } from "react";

function Tooltip({ svgIcon, title }) {
  const [showTooltip, setshowTooltip] = useState(false);
  const handleShowTooltip = () => {
    setshowTooltip(true);
  };
  const handleHideTooltip = () => {
    setshowTooltip(false);
  };
  return (
    <div>
      <div className="flex items-center justify-center relative ">
        <span
          className="z-50 cursor-pointer"
          onMouseEnter={() => handleShowTooltip()}
          onMouseLeave={() => handleHideTooltip()}
        >
          {svgIcon}
        </span>
        <div
          className={`relative transition-all  z-30 -mt-8 inline-flex ${
            showTooltip ? "flex" : "hidden"
          }`}
        >
          <div className="relative">
            <div className="absolute font-Kalameh top-0 z-10 w-28 p-2 -mt-1 flex items-center justify-center text-sm leading-tight text-white transform translate-x-1/2 -translate-y-full bg-gray-500  rounded-lg shadow-lg">
              {title}
            </div>
            <svg
              className="absolute z-10 w-6 h-6 text-gray-500 transform translate-x-5 -translate-y-3 fill-current stroke-current"
              width="8"
              height="8"
            >
              <rect
                x="12"
                y="-10"
                width="8"
                height="8"
                transform="rotate(45)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
