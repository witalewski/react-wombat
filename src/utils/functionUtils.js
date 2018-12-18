const mapFn = (fn, object) =>
  object ? object.map(fn) : object => object.map(fn);

const reduce = (fn, initial, object) =>
  object
    ? object.reduce(fn, initial)
    : initial
    ? object => object.reduce(fn, initial)
    : initial => object => object.reduce(fn, initial);

module.exports = { mapFn, reduce };
