module.exports = {
  purge: [],
  darkMode: 'media', // false, // or 'media' or 'class'
  theme: {
    extend: {
    },
    colors: {
      white: '#FFF',        // text color
      ronchi: '#ECC94B',    // primary color
      carnation: '#F56565', // opposive color
      pictonblue: '#4299E1',// negative color
      mirage: '#1A202C',    // primary background
      oxfordblue: '#2D3748',// secondary background
      salomie: '#FFE48F',   // skill name
      anakiwa: '#87F6FD',   // cryo name
      sweetpink: '#FFA3A3', // pyro name
    },
    minHeight: theme => theme('spacing'),
  },
  variants: {
    extend: {}
  },
  plugins: []
}
