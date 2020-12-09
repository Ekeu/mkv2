const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        sols: '#3a416f',
        input: '#d2d6dc',
        mk_black: '#282932',
        mk_yellow: '#F7B614',
        mk_gray: '#F2EFE6',
        mk_white: '#FFFFFF',
      },
      fontFamily: {
        hind: ['Hind', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '2/3': '66.666667%',
        '5/6': '83.333333%',
      },
    },
    minHeight: {
      '366': '366px',
    },
    minWidth: {
      'inherit': 'inherit'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-pseudo-elements'),
    require('tailwindcss-aspect-ratio'),
    require('@tailwindcss/forms'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.empty-content': {
          content: "''",
        },
        '.display-table': {
          display: "table"
        }
      },
      ['before']
      );
    }),
  ],
};
