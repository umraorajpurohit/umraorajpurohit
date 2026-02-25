import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
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
        night: {
          DEFAULT: "#0f1a14",
          50: "#e8ebe9",
          100: "#d1d7d3",
          200: "#a3afa7",
          300: "#75877b",
          400: "#475f4f",
          500: "#0f1a14",
          600: "#0c1510",
          700: "#09100c",
          800: "#060a08",
          900: "#030504"
        }
      },
      boxShadow: {
        card: "0 12px 30px rgba(15, 26, 20, 0.08)",
        'card-hover': "0 16px 40px rgba(15, 26, 20, 0.12)"
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    }
  },
  plugins: []
};

export default config;
