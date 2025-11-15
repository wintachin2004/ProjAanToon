/** @type {import('tailwindcss').Config} */
// Tailwind config extended to include pastel-theme colors used across the app.
// This keeps component code unchanged while changing the color palette globally.
export default {
  content: ["./src/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          50: '#EAF4FF',
          100: '#D6EFFF',
          200: '#BFE0FF',
          300: '#99D1FF',
          400: '#7FBFFF',
          500: '#66ADFF',
          600: '#4D9BFF',
          700: '#3389FF',
          800: '#226EDC',
          900: '#174F9A',
        },
        purple: {
          50: '#FBF0FF',
          100: '#F6E3FF',
          200: '#EFC7FF',
          300: '#E7AAFF',
          400: '#DF8EFF',
          500: '#D776FF',
          600: '#C55CFF',
          700: '#B043FF',
          800: '#8A2DBF',
          900: '#5F1A80',
        },
        pink: {
          50: '#FFF1F8',
          100: '#FFE6F2',
          200: '#FFCFE4',
          300: '#FFB6D6',
          400: '#FF9EC6',
          500: '#FF84B3',
          600: '#FF6999',
          700: '#FF4D80',
        },
      },
    },
  },
  plugins: [],
}

