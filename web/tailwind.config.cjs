/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    screens: {
      'sm': '350px',
      // => @media (min-width: 640px) { ... }

      'md': '700px',
      // => @media (min-width: 768px) { ... }

      'lg': '1000px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1680px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        galaxy: "url('./background-galaxy.png')",
        "nlw-gradient" :'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
        "game-gradient": 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
      colors:{
        gradient: "'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)'"
      }
    },
  },
  plugins: [],
}
