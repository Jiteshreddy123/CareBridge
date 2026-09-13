/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ncg: {
          50: '#F4F7F5',
          100: '#E5EEEB',
          200: '#C7DCD6',
          300: '#9FBFC5',
          400: '#529688',
          500: '#2C6E5F', // Editorial Medical Pine / Spruce
          600: '#245A4E',
          700: '#1C4A40',
          800: '#153831',
          900: '#0E2621',
        },
        parchment: {
          50: '#FCFBF9',
          100: '#F8F6F1', // Primary Body Background
          200: '#EFECE4', // Soft Surface
          300: '#E2DDD2', // Hairline Border
          400: '#CFC8BA',
          500: '#AFA796',
        },
        amberGold: {
          50: '#FDF9F0',
          100: '#F6ECD8',
          500: '#B9812E',
          700: '#7A5717',
        },
        brickAlert: {
          50: '#FAF1EF',
          100: '#F5E5E0',
          500: '#B34A3B',
          700: '#853225',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        clinical: {
          surface: '#F8F6F1',
          card: '#ffffff',
          border: '#E2DDD2',
          darkBorder: '#CFC8BA',
          accent: '#2C6E5F',
          urgent: '#B34A3B',
          alert: '#B34A3B',
          success: '#2C6E5F',
          info: '#3A7CA5',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        telugu: ['Noto Sans Telugu', 'system-ui', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(27, 42, 39, 0.05), 0 1px 2px rgba(27, 42, 39, 0.03)',
        'card': '0 4px 20px -2px rgba(27, 42, 39, 0.05)',
        'modal': '0 20px 30px -10px rgba(20, 35, 30, 0.15), 0 10px 15px -5px rgba(20, 35, 30, 0.08)',
      }
    },
  },
  plugins: [],
}
