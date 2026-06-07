/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(210, 100%, 40%)",
          dark: "hsl(210, 100%, 30%)",
        },
        accent: {
          DEFAULT: "hsl(155, 70%, 45%)",
        },
        emergency: "hsl(0, 85%, 55%)",
        warning: "hsl(38, 95%, 55%)",
        surface: {
          DEFAULT: "hsl(220, 20%, 97%)",
          dark: "hsl(220, 25%, 10%)",
        },
      },
    },
  },
  plugins: [],
};
