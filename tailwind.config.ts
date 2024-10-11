import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'hover-none': { raw: '(hover: none)' }, // custom media query for devices that don't have hover
      },
      fontFamily: {
        sans: [
          '"Noto Sans"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        google: {
          blue: "#174EA6",
          red: "#A50E0E",
          orange: "#E37400",
          green: "#0D652D",
          mediumBlue: "#4285F4",
          mediumRed: "#EA4335",
          yellow: "#FBBC04",
          mediumGreen: "#34A853",
          lightBlue: "#D2E3FC",
          lightRed: "#FAD2CF",
          lightYellow: "#FEEFC3",
          lightGreen: "#CEEAD6",
          lightGrey: "#F1F3F4",
          grey: "#9AA0A6",
          black: "#202124",
        },
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      backgroundImage: {
        'newsletter-card-gradient': 'radial-gradient(at 9.016090630316054% 23.69609324243742%, hsla(216.9230769230769, 75.66137566137566%, 37.05882352941177%, 1) 0%, hsla(216.9230769230769, 75.66137566137566%, 37.05882352941177%, 0) 100%), radial-gradient(at 61.12928306290213% 45.67635897386859%, hsla(0, 84.35754189944133%, 35.09803921568628%, 1) 0%, hsla(0, 84.35754189944133%, 35.09803921568628%, 0) 100%), radial-gradient(at 17.976018793646475% 71.92427310490037%, hsla(141.81818181818184, 77.19298245614036%, 22.352941176470587%, 1) 0%, hsla(141.81818181818184, 77.19298245614036%, 22.352941176470587%, 0) 100%), radial-gradient(at 48.178180041925245% 14.825659179108186%, hsla(44.69635627530365, 96.8627450980392%, 50%, 1) 0%, hsla(44.69635627530365, 96.8627450980392%, 50%, 0) 100%), radial-gradient(at 46.96613899942032% 92.88640904679764%, hsla(216.9230769230769, 75.66137566137566%, 37.05882352941177%, 1) 0%, hsla(216.9230769230769, 75.66137566137566%, 37.05882352941177%, 0) 100%)',
      },
    },
  },
  variants: {
    extend: {
      translate: ['group-hover', 'hover-none'],  // Extend translate variant to support hover-none
    },
  },
  darkMode: "media",
  plugins: [],
} satisfies Config;
