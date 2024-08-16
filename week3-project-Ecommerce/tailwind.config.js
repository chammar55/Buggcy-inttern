/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Custom screen size for extra small devices
        sm: "640px", // Tailwind's default small screen size
        md: "768px", // Tailwind's default medium screen size
        lg: "1024px", // Tailwind's default large screen size
        xl: "1280px", // Tailwind's default extra large screen size
        xxl: "1440px", // Custom screen size for larger screens
        "2xl": "1536px", // Tailwind's default 2x extra large screen size
        // Custom breakpoints
        "4xl": "1920px", // Custom screen size for even larger screens
      },
    },
  },
  plugins: [],
};
