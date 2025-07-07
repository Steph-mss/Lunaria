// postcss.config.cjs
module.exports = {
  plugins: {
    // anciennement : tailwindcss: {},
    '@tailwindcss/postcss': {},
    autoprefixer: {},

    // si vous aviez d'autres plugins, conservez-les ici :
    '@csstools/postcss-global-data': { files: ['app/global.module.css'] },
    'postcss-custom-media': {},
  },
};
