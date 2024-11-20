/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#222427",
        primary: "#00838F",
        blacklead: "#003E43",
        cyann: "#4FB3BF",
        "cyann-700": "#BBDEE1",
        "blue-lightt": "#DBEEF6",
        "op-cyann": "#4FB3BF80",
        black: "#222427",
        "hr-gradient": " linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,1) )",
      },
      invert: {
        75: ".75",
      },
      transitionDuration: {
        0: "0ms",
        1000: "1000ms",
      },
      fontFamily: {
        Kalameh: ["Kalameh", "Kalameh"],
        KalamehMed: ["KalamehMed", "KalamehMed"],
        KalamehSemi: ["KalamehSemi", "KalamehSemi"],
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "in-rotate": "cubic-bezier(0, 1.04, 0, 1.07)",
      },
    },
  },
  variants: {
    fill: ["hover", "focus"], // this line does the trick for sidebar icon hover system
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
