/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          bg: '#0E0E10',
          'bg-secondary': '#18181B',
          card: '#1F1F23',
          border: '#2A2A2E',
          accent: '#5865F2',
          'text-primary': '#FFFFFF',
          'text-secondary': '#B9BBBE',
        },
      },
    },
  },
  plugins: [],
}


