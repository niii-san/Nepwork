/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom_shadow': '4px 0px 2px 0px rgba(0, 0, 0, 0.3)',
      }
    },
    colors: {
      'green_button':'#009400',
      'green_border':'#009400',
      'hover_button':'#4CB44C',
      'error_color':'',
      'focus_color':'#4CB44C',
      'nav_border_color':'#AEAEAE',
      'blacktext':'#505050',
      'whitetext':'#FFFFFF',
      'light_background':'#EFEFEF',
      'greentext':'#009400'
    },
  },
  plugins: [],
};
