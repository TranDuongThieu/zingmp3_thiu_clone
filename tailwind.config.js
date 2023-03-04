/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}", "./public/index.html"],
    theme: {
        extend: {
            backgroundColor: {
                "main-100": "#e7eded",
                "main-200": "#dde4e4",
                "main-300": "#ced9d9",
                "main-400": "#c0d8d8",
                "main-500": "#0e8080",
            },
            color: {
                "main-100": "#e7eded",
                "main-200": "#dde4e4",
                "main-300": "#ced9d9",
                "main-400": "#c0d8d8",
                "main-500": "#0e8080",
            },
            keyframes: {
                "rotate-center": {
                    "0%": {
                        "-webkit-transform": "rotate(0)",
                        transform: "rotate(0)",
                    },
                    "100%": {
                        "-webkit-transform": "rotate(360deg)",
                        transform: "rotate(360deg)",
                    },
                },
                "rotate-center-pause": {
                    "0%": {
                        "-webkit-transform": "rotate(0)",
                        transform: "rotate(0)",
                        borderRadius: "100%",
                    },
                    "100%": {
                        "-webkit-transform": "rotate(360deg)",
                        transform: "rotate(360deg)",
                        borderRadius: "8px",
                    },
                },
                "slide-left": {
                    "0%": {
                        "-webkit-transform": " translateX(500px);",
                        transform: "translateX(500px);",
                    },
                    "100%": {
                        "-webkit-transform": "translateX(0);",
                        transform: "translateX(0);",
                    },
                },

                "slide-left2": {
                    "0%": {
                        "-webkit-transform": " translateX(0);",
                        transform: "translateX(0);",
                    },
                    "100%": {
                        "-webkit-transform": "translateX(500px);",
                        transform: "translateX(500px);",
                    },
                },
            },
            animation: {
                "rotate-center": " rotate-center 6s linear infinite;",
                "rotate-center-pause":
                    "rotate-center-pause 0.2s linear 1 both;",
                "slide-left":
                    "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
                "slide-left2":
                    "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
                bounce200: "bounce 1s infinite 200ms",
                bounce400: "bounce 1s infinite 400ms",
            },
            flex: {
                4: "4 4 0%",
                6: "6 6 0%",
            },
        },

        screens: {
            1600: "1600px",
        },
    },
    plugins: [],
};
