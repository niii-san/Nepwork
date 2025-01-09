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
                card_shadow: "1px 1px 10.3px 0px rgba(0, 0, 0, 0.25);",
                image_shadow: "2px_2px_4px_0px_rgba(0,0,0,0.25)"
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
                secondaryText: "#505050",

                //light green for card
                lightgreen: "#d5ffcb",


                green_button: "#009400",
                green_border: "#009400",
                hover_button: "#4CB44C",
                error_color: "#cb3b3b",
                focus_color: "#4CB44C",
                nav_border_color: "#AEAEAE",
                blacktext: "#505050",
                whitetext: "#FFFFFF",
                light_background: "#EFEFEF",
                greentext: "#009400",
            },
        },
    },
    plugins: [],
};
