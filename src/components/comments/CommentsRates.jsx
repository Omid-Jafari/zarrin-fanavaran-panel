import React from 'react'

function CommentsRates({rate}) {
  return (
    <button className="w-full  font-KalamehMed justify-center font-medium text-sm h-11 bg-[#4FB3BF] hover:bg-[#478F95] transition-colors duration-500 px-8 text-[#545456] rounded-[4px] flex flex-row-reverse items-center gap-1">
          {Array.from([1, 2, 3, 4,5]).map((item, index) =>
            rate > index  ? (
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7896 2.59356L15.5286 8.73756L22.2176 9.44406C22.6481 9.48956 22.8211 10.0231 22.4996 10.3126L17.5031 14.8151L18.8986 21.3956C18.9886 21.8191 18.5346 22.1486 18.1596 21.9326L12.3331 18.5711L6.50659 21.9321C6.13159 22.1481 5.67809 21.8186 5.76759 21.3951L7.16309 14.8146L2.16659 10.3121C1.84509 10.0226 2.01859 9.48906 2.44859 9.44356L9.13759 8.73706L11.8766 2.59306C12.0526 2.19806 12.6136 2.19806 12.7896 2.59356Z"
                  fill="url(#paint0_linear_5331_41868)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5331_41868"
                    x1="4.83759"
                    y1="3.18056"
                    x2="19.3791"
                    y2="22.6336"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFDA1C" />
                    <stop offset="1" stop-color="#FEB705" />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.59425 6.94065L10.333 0.797293L13.0719 6.94115L13.1893 7.20451L13.4761 7.2348L20.1647 7.94126L15.1684 12.4436L14.9541 12.6367L15.014 12.9188L16.4095 19.4993L16.4095 19.4995L16.4094 19.4995L16.4091 19.4993L10.5829 16.138L10.3331 15.9938L10.0832 16.138L4.25702 19.4988L4.25677 19.4984L5.6522 12.9183L5.71203 12.6362L5.49779 12.4431L0.501442 7.94076L7.1901 7.2343L7.47685 7.20401L7.59425 6.94065Z"
                  stroke="url(#paint0_linear_5289_41875)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_5289_41875"
                    x1="2.83758"
                    y1="1.18056"
                    x2="17.3791"
                    y2="20.6336"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FFDA1C" />
                    <stop offset="1" stop-color="#FEB705" />
                  </linearGradient>
                </defs>
              </svg>
            )
          )}
        </button>
  )
}

export default CommentsRates