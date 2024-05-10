/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      blue: {
        darkblue: '#3D52A0',
        blue: '#7091E6',
        bluegrey: '#8697C4',
        grey: '#ADBBDA',
        bluewhite: '#EDE8F5'
      },
      brown: {
        brownblack: '#3E362E',
        darkbrown: '#865D36',
        brown: '#93785B',
        lightbrown: '#AC8968',
        brownwhite: '#A69080',
        blur: 'rgba(166, 144, 128, .75)'
      }
    }
  },
  plugins: [],
}

