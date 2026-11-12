/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/componentes/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dnd: {
          dark: '#0f172a',
          surface: '#1e293b',
          card: '#1e293b',
          gold: '#f59e0b',
          crimson: '#dc2626',
          accent: '#8b5cf6',
          border: '#334155'
        }
      }
    },
  },
  plugins: [],
}
