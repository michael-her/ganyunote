module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-jsx-control-statements',
      [
        "module-resolver", {
          "root": ["./lib"],
          "alias": {
            "@tw": "./lib/Styles/tailwind"
          }
        }
      ],
      '@babel/plugin-transform-template-literals',
    ]
  };
};
