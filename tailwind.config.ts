import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        "primary": "#F97316",
        "secondary": "#2bbc8a"
      },
      backgroundColor: {
        "primary": "#F97316",
        "secondary": "#2bbc8a"
      },
      fontFamily: {
        oxygen: "Oxygen Mono, monospace",
        ubuntu: "Ubuntu Mono, monospace",
        jetbrain: "JetBrains Mono, monospace",
        fira: "Fira Mono, monospace"
      },
      transitionDuration: {
        "700": "700ms"
      }
    },
  },
  plugins: [],
};
export default config;
