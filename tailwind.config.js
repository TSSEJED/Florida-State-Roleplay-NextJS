/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgba(var(--border), 1)",
        input: "rgba(var(--input), 1)",
        ring: "rgba(var(--ring), 1)",
        background: "rgba(var(--background), 1)",
        foreground: "rgba(var(--foreground), 1)",
        primary: {
          DEFAULT: "rgba(var(--primary), 1)",
          foreground: "rgba(var(--primary-foreground), 1)",
        },
        secondary: {
          DEFAULT: "rgba(var(--secondary), 1)",
          foreground: "rgba(var(--secondary-foreground), 1)",
        },
        destructive: {
          DEFAULT: "rgba(var(--destructive), 1)",
          foreground: "rgba(var(--destructive-foreground), 1)",
        },
        muted: {
          DEFAULT: "rgba(var(--muted), 1)",
          foreground: "rgba(var(--muted-foreground), 1)",
        },
        accent: {
          DEFAULT: "rgba(var(--accent), 1)",
          foreground: "rgba(var(--accent-foreground), 1)",
        },
        popover: {
          DEFAULT: "rgba(var(--background), 1)",
          foreground: "rgba(var(--foreground), 1)",
        },
        card: {
          DEFAULT: "rgba(var(--background), 1)",
          foreground: "rgba(var(--foreground), 1)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
