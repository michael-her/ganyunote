const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
const _ = require('lodash')

module.exports = {
  purge: [],
  darkMode: 'media', // false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '1/4': '25%',
      },
      width: {
        'fit': 'fit-content',
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#FFF',        // text color
      ronchi: '#ECC94B',    // primary color
      carnation: '#F56565', // opposive color
      pictonblue: '#4299E1',// negative color
      mirage: '#1A202C',    // primary background
      oxfordblue: '#2D3748',// secondary background
      salomie: '#FFE48F',   // skill name
      anakiwa: '#87F6FD',   // cryo name
      sweetpink: '#FFA3A3', // pyro name
      greenyellow:'#A9FF32',// primary number
      'bossanova-hl': '#7C44A0', // highlight of bossanova
      bossanova: {
        50: '#f2e7f2',
        100: '#e0c4e0',
        200: '#cd9dcd',
        300: '#b879b8',
        400: '#a85ea8',
        500: '#994999',
        600: '#8d4492',
        700: '#7d3d89',
        800: '#6e377f',
        900: '#542e6b',
      }, // 
      coolgray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      }
    },
    minHeight: theme => theme('spacing'),
  },
  variants: {
    extend: {},
    // alignSelf: ['responsive', 'baseline'],
    // 'self-baseline': {
    //   alignSelf: 'baseline'
    // }
  },
  plugins: [
    plugin(function({ addUtilities, addComponents, e, prefix, config }) {
      // Add your custom styles here
      const items = [
        'auto',
        'start',
        'end',
        'center',
        'stretch',
        'baseline',
      ]
      const variants = [
        'responsive',
      ]

      const utilities = _.map(items, (item) => ({
        [`.self-${e(item)}`]: {
          'align-self': item
        }
      }))

      addUtilities(utilities, variants)
    }),
    plugin(function({ addUtilities, addComponents, e, prefix, config }) {
      // Add your custom styles here
      const items = [
        'none',
        'text',
        'all',
        'auto',
      ]

      const utilities = _.map(items, (item) => ({
        [`.select-${e(item)}`]: {
          'user-select': item
        }
      }))

      addUtilities(utilities)
    }),
    plugin(function({ addUtilities, addComponents, e, prefix, config }) {
      // Add your custom styles here
      const items = [
        'solid',
        'dashed',
        'dotted',
        'double',
        'none'
      ]

      const utilities = [
        ..._.map(items, (item) => ({
          [`.border-t-${e(item)}`]: {
            'border-top-style': item
          }
        })),
        ..._.map(items, (item) => ({
          [`.border-r-${e(item)}`]: {
            'border-right-style': item
          }
        })),
        ..._.map(items, (item) => ({
          [`.border-b-${e(item)}`]: {
            'border-bottom-style': item
          }
        })),
        ..._.map(items, (item) => ({
          [`.border-l-${e(item)}`]: {
            'border-left-style': item
          }
        })),
      ]

      addUtilities(utilities)
    }),
  ]
}
