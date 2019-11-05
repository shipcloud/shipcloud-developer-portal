module.exports = {
  content: ["./_site/**/*.html"],
  css: ["./_site/assets/css/*.css"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
};
