/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('@zeit/next-less');
const withSass = require('@zeit/next-sass');

module.exports =withSass({
  cssModules: true,
   ...withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  }})
});
