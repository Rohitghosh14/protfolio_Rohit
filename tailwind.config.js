/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        ink: {
          primary: '#EDEDED',
          secondary: '#737373',
          tertiary: '#4A4A4A',
          muted: '#2A2A2A',
        },
        accent: {
          blue: '#3B82F6',
          emerald: '#10B981',
          cyan: '#06B6D4',
        },
        hairline: {
          subtle: '#1C1C1C',
          light: '#262626',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      }
    },
  },
  plugins: [],
}
