/** @type {import('tailwindcss').Config} */
import { Flowbite } from "flowbite-react";
("flowbite-react");
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [Flowbite],
};
