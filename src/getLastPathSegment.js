const R = require('ramda');
const compose = require("folktale/core/lambda/compose")

const getLastPathSegment = compose(
  R.last,
  R.split("/")
);

module.exports = getLastPathSegment;
