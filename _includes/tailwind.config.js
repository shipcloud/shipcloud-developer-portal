const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          default: "#1a70b8",
          dark: "#154193",
          light: "#009fe2",
        },
        green: "#76b82a",
        red: "#e42221",
        orange: "#eb6839",
        teal: "#87cdd2",
        yellow: "#fab900",
        grey: {
          default: "#9d9d9c",
          darker: "#565655",
          dark: "#7d7d7d",
          light: "#e2e2e2",
          lighter: "#f6f6f6",
        },
        carrier: {
          angel: "#76b82a",
          cargointernational: "#428bca",
          dhl: "#ffcc00",
          dhlexpress: "#ffcc00",
          dpag: "#ffcc00",
          dpd: "#e42221",
          hermes: "#009fe2",
          gls: "#009fe2",
          go: "#a8073a",
          parcelone: "#3e4c69",
          sevensenders: "#009fe2",
          tnt: "#f60",
          ups: "#82604b",
        }
      },
      screens: {
        'xxl': {'min': '1441px'}
      },
      spacing: {
        s: '0.5rem',
        m: '1rem',
        l: '2rem',
        xl: '4rem',
        xxl: '8rem'
      }
    }
  },
  variants: {},
  plugins: []
}
