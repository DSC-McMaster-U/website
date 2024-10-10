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
        'event-card-gradient': "radial-gradient(at 86.27957080122349% 48.22290300984014%, hsla(137.14285714285717, 39.99999999999996%, 86.27450980392157%, 1) 0%, hsla(137.14285714285717, 39.99999999999996%, 86.27450980392157%, 0) 100%), radial-gradient(at 69.93150424929169% 24.329735351959304%, hsla(44.74576271186441, 96.72131147540985%, 88.0392156862745%, 1) 0%, hsla(44.74576271186441, 96.72131147540985%, 88.0392156862745%, 0) 100%), radial-gradient(at 9.872134072030248% 29.67597905793875%, hsla(4.186046511627894, 81.13207547169812%, 89.60784313725489%, 1) 0%, hsla(4.186046511627894, 81.13207547169812%, 89.60784313725489%, 0) 100%), radial-gradient(at 39.45828785051291% 92.1750002741947%, hsla(215.7142857142857, 87.50000000000004%, 90.58823529411765%, 1) 0%, hsla(215.7142857142857, 87.50000000000004%, 90.58823529411765%, 0) 100%), radial-gradient(at 35.20701748637909% 93.10975831336705%, hsla(137.14285714285717, 39.99999999999996%, 86.27450980392157%, 1) 0%, hsla(137.14285714285717, 39.99999999999996%, 86.27450980392157%, 0) 100%), radial-gradient(at 84.91206539575886% 28.6513203887228%, hsla(44.74576271186441, 96.72131147540985%, 88.0392156862745%, 1) 0%, hsla(44.74576271186441, 96.72131147540985%, 88.0392156862745%, 0) 100%), radial-gradient(at 20.393434477735095% 36.86051590637804%, hsla(4.186046511627894, 81.13207547169812%, 89.60784313725489%, 1) 0%, hsla(4.186046511627894, 81.13207547169812%, 89.60784313725489%, 0) 100%), radial-gradient(at 80.97951299385986% 3.8426749601487398%, hsla(215.7142857142857, 87.50000000000004%, 90.58823529411765%, 1) 0%, hsla(215.7142857142857, 87.50000000000004%, 90.58823529411765%, 0) 100%), radial-gradient(at 33.9568978145746% 5.654592228147837%, hsla(137.14285714285717, 39.99999999999996%, 86.27450980392157%, 1) 0%, hsla(137.14285714285717, 39.99999999999996%, 86.27450980392157%, 0) 100%), radial-gradient(at 0.9221514878436476% 9.359062285450026%, hsla(44.74576271186441, 96.72131147540985%, 88.0392156862745%, 1) 0%, hsla(44.74576271186441, 96.72131147540985%, 88.0392156862745%, 0) 100%), radial-gradient(at 89.64372096201316% 94.65843351644554%, hsla(4.186046511627894, 81.13207547169812%, 89.60784313725489%, 1) 0%, hsla(4.186046511627894, 81.13207547169812%, 89.60784313725489%, 0) 100%)",
      }
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
