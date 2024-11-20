import React from "react";

const Checkbox = (props) => {
  const {
    className = `w-[18px] h-[18px] rounded-[2px] bg-[#C4C7C7] relative cursor-pointer`,
    id,
    state,
    setState,
  } = props;
  return (
    <div
      className={className}
      onClick={() =>
        setState((prev) => {
          const stateId = prev.findIndex((iId) => iId === id);

          if (stateId === -1) {
            return [...prev, id];
          } else {
            return [...prev.slice(0, stateId), ...prev.slice(stateId + 1)];
          }
        })
      }
    >
      {state.findIndex((iId) => iId === id) !== -1 && (
        <div className="w-[16.5px] h-[10px] border-l-[1.5px] border-b-[1.5px] border-black -rotate-45"></div>
      )}
    </div>
  );
};

export default Checkbox;
