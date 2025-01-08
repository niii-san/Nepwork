/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            tablet: "640px",
            // => @media (min-width: 640px)
            pc: "1200px",
        },
        extend: {
            backgroundImage: {
                'signUpPattern': "url(src/assets/SignUp.svg)"
            },
            boxShadow: {
                custom_shadow: "4px 0px 2px 0px rgba(0, 0, 0, 0.3)",
            },
            colors: {
                //green
                primary: "#009400",
                //gray
                secondary: "#EDEDED",
                //white
                tertiray: "#FFFFFF",
                //red
                danger: "#d64343",
                //white text
                primaryText: "#FFFFFF",
                //black text
                secondaryText: "#505050",

                error_color: "#cb3b3b",


                green_border: "#009400",
                hover_button: "#4CB44C",
                focus_color: "#4CB44C",
                nav_border_color: "#AEAEAE",
                greentext: "#009400",
            },
        },
    },
    plugins: [],
};

