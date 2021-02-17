const colors = require("tailwindcss/colors");

module.exports = {
    purge: [
        "./source/**/*.svelte",
        "./libs/ff-svc/source/**/*.svelte",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            borderRadius: {
                DEFAULT: "0.2rem"
            },
            outline: {
                DEFAULT: ["2px solid #72777E", "1px"],
            }
        },
        colors: {
            // generated with https://www.tailwindshades.com/
            transparent: "transparent",
            current: "currentColor",

            color: {
                "back":            "#1C1C1C",
                "frame-low":       "#252525",
                "frame":           "#282828",
                "frame-high":      "#2b2b2b",
                "widget":          "#404040",
                "widget-hover":    "#4b4b4b",
                "widget-selected": "#555555",
                "icon":            "#b8b8b8",
                "icon-disabled":   "#91969C",
                "text":            "#E9E9E9",
                "text-dimmed":     "#C9C9C9",
                "text-disabled":   "#b8b8b8",
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
