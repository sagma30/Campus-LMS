/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // MET BKC Signature Maroon / Burgundy palette
        maroon: {
          50: '#fdf2f4',
          100: '#fbe6e9',
          200: '#f7ced5',
          300: '#f0a7b4',
          400: '#e4768b',
          500: '#d24b65',
          600: '#b9334e',
          700: '#7a1526', // MET BKC Deep Institutional Maroon
          800: '#681524',
          900: '#581522',
          950: '#33070f',
        },
        burgundy: {
          50: '#fdf2f4',
          100: '#fbe6e9',
          200: '#f7ced5',
          300: '#f0a7b4',
          400: '#e4768b',
          500: '#d24b65',
          600: '#b9334e',
          700: '#7a1526',
          800: '#681524',
          900: '#581522',
          950: '#33070f',
        },
        // Deep Charcoal for crisp legibility and high contrast
        charcoal: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#868e96',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#181b1e',
          950: '#0e1012',
        },
      },
    },
  },
  plugins: [],
};
