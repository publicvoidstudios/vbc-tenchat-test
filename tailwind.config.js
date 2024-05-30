/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat, sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#6172F3',
        secondary: '#F5F8FF',
        primaryLight: '#8098F9',
        primaryLightOpaque: '#8098F91A',
        primaryLightStroke: '#8098F980',
        fontPrimary: '#E0EAFF',
        fontPrimarySubtle: '#E0EAFFBF',
        fontSecondary: '#09090B',
        fontSecondarySubtle: '#71717A',
        fontTretiary: '#2D31A633'

      },
      backgroundImage: {
        'envelope': "url('/assets/envelope.svg')",
        'shield-slash': "url('/assets/shield-slash.svg')",
        'person': "url('/assets/person.svg')",
        'checked': "url('/assets/checked-square.svg')",
        'unchecked': "url('/assets/unchecked-square.svg')",
      },
      screens: {
        '2xl': '1440px'
      }
    },
  },
  plugins: [],
}
