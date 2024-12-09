import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	colors: {
		white: "#fff",
		black: "#000",
		dark: "var(--text-dark)",
		default: "var(--text-default)",
		light: "var(--bg-light)",
		bg: "var(--bg-default)",
		border: "var(--border)",
		alert: 'var(--alert)',
		secondary: 'var(--half-white)',
		'4xl': 'var(--shadow)'
		
	},

},
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
