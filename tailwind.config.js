const colors = {
  background: {
    light: "#F4F4F6",
    dark: "#121212",
  },
  secondary: {
    light: "#E8EAED",
    dark: "#1C1E22",
  },
  text: {
    light: "#1E1E2F",
    dark: "#E4E6EB",
  },
  accent: {
    light: "#0078FF",
    dark: "#1A8FFF",
  },
  success: {
    light: "#00C896",
    dark: "#00D9A6",
  },
  warning: {
    light: "#FF6B6B",
    dark: "#FF5252",
  },
  highlight: {
    light: "#FF9F1C",
    dark: "#FFA41B",
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      textColor: {
        primary: {
          DEFAULT: colors.text.light,
          dark: colors.text.dark,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

