const R = require("ramda");

const getLastPathSegment = R.compose(
  R.last,
  R.split("/")
);

module.exports = getLastPathSegment;
