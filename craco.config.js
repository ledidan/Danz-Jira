module.exports = {
  style: {
    screen: {
      plugins: [require("module.scss"), require("autoprefixer")],
    },
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
