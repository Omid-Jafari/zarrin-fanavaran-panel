import React, { useRef } from "react";
import { useState } from "react";
import { useOnClickOutside } from "../../utils/OutSideClick";
import Loading from "../elements/loading";

const SelectBox = (props) => {
  const {
    status,
    getValue,
    options,
    className,
    height = "44px",
    loading = false,
    nullable = false,
  } = props;
  const [open, setOpen] = useState(false);
  let updateOptions = options;
  const speceficRef = useRef();
  if (nullable) {
    updateOptions = [{ name: "هیچ کدام", value: null }, ...options];
  }
  useOnClickOutside(speceficRef, () => setOpen(false));
  return (
    <div
      ref={speceficRef}
      className={` relative ${className}`}
      style={{ height: height }}
    >
      <div
        className={`min-h-[${height}] relative bg-white rounded-lg px-2 overflow-hidden transition-all duration-500 w-full ${
          open ? "shadow-lg" : ``
        }`}
        style={{ maxHeight: open ? "500px" : height }}
      >
        <div
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-between gap-3 w-full cursor-pointer`}
          style={{ height: height }}
        >
          {loading ? (
            <Loading className="text-primary w-12 h-12 animate-pulse" />
          ) : (
            <span
              className={`font-medium font-KalamehMed ease-in-expo duration-500 transition-colors ${
                open ? "text-primary" : "text-[#222427]"
              }`}
            >
              {
                updateOptions?.filter((option) => option?.value === status)[0]
                  ?.name
              }
            </span>
          )}
          <button type="button" className="mr-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`ease-in-expo duration-500 ${
                open
                  ? "-rotate-180 transition-all fill-primary"
                  : "transition-all fill-[#222427]"
              }`}
            >
              <path d="M17.92 8.18H6.08c-.96 0-1.44 1.16-.76 1.84l5.18 5.18c.83.83 2.18.83 3.01 0l1.97-1.97 3.21-3.21c.67-.68.19-1.84-.77-1.84z"></path>
            </svg>
          </button>
        </div>
        {loading ? (
          <Loading className="text-primary w-12 h-12 animate-pulse mx-auto" />
        ) : (
          updateOptions?.map((option) => (
            <button
              key={`${option?.name} option`}
              type="button"
              className={`w-full border-t text-start font-normal py-2 font-Kalameh text-sm hover:text-opacity-70 text-black transition-all duration-300  z-30 relative bg-white`}
              onClick={() => {
                getValue(option?.value);
                setOpen(false);
              }}
            >
              {option?.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectBox;
