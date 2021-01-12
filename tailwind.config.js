const colors = require("tailwindcss/colors");

module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            // generated with https://www.tailwindshades.com/
            transparent: "transparent",
            current: "currentColor",

            color: {
                DEFAULT: "#ECEDEE",
                '50': '#ECEDEE',
                '100': '#DEE0E3',
                '200': '#C3C7CB',
                '300': '#A8ADB3',
                '400': '#8C949B',
                '500': '#51575D',
                '600': '#42474C',
                '700': '#34383C',
                '800': '#26292C',
                '900': '#181A1B',
            },
            primary: {
                DEFAULT: "#C57134",
                100: "#F3E0D3",
                200: "#E9C4AA",
                300: "#DEA882",
                400: "#D38C5A",
                500: "#C57134",
                600: "#9D5A2A",
                700: "#75431F",
                800: "#4D2C14",
                900: "#24150A",
            },
            secondary: {
                DEFAULT: "#3B88BF",
                100: "#D4E5F2",
                200: "#ADCEE6",
                300: "#86B7DA",
                400: "#5FA0CE",
                500: "#3B88BF",
                600: "#2F6C98",
                700: "#235071",
                800: "#17354A",
                900: "#0B1923",
            },
        },
        fontFamily: {
            sans: [ "Roboto", "sans-serif" ],
        },
        spacing: {
            0: "0px",
            1: "0.25rem",
            2: "0.5rem",
            3: "0.75rem",
            4: "1rem",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
