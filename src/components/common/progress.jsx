import { Circle } from "rc-progress";
import React, { useEffect, useState } from "react";

function Progress({persent,setpersent}) {
  
  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     setpersent(persent + 1);
  //   }, 40);
  //   if (persent >= 100) {
  //     clearTimeout(t);
  //   }
  // }, [persent]);

  return (
    <>
      <div className="w-full relative flex justify-center items-center flex-col">
        <p className="absolute text-lg  font-bold" prefix="%">
          {persent}%
        </p>
        <div className="w-24">
          <Circle
            strokeLinecap={"butt"}
            percent={persent}
            strokeWidth={7}
            trailWidth={5}
            trailColor="#222427"
            strokeColor="#00838F"
          />
        </div>
      </div>
      <p className="mt-4 text-left font-bold ">در حال بارگزاری.....</p>
    </>
  );
}

export default Progress;
