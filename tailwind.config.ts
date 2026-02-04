import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        avocado: {
          50: "#f6faf2",
          100: "#e9f3dc",
          200: "#cfe6b3",
          300: "#acd87f",
          400: "#88c553",
          500: "#6dad38",
          600: "#54882a",
          700: "#426b23",
          800: "#36551f",
          900: "#2e471b"
        },
        night: "#0f1a14"
      },
      boxShadow: {
        card: "0 12px 30px rgba(15, 26, 20, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
