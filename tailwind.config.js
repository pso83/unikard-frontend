// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        unikard: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5'
        }
      }
    }
  },
  plugins: []
};
