// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'title': ['Roboto Slab']
    },
    extend: {
      colors: {
        color1: '#FDFCF8',
        color2: '#F6F3EA',
        color3: '#F0ECE0',
        hoverBg: '#f1d49e81',
        textColor: '#989A8C',
        textLight: '#666666',
        buttonBg: '#D4A373',
        buttonHover: '#C17C3A',
      }
    },
  },
  plugins: [],
}
