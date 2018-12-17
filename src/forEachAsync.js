const forEachAsync = async (op, arr) => {
  for (let i = 0; i < arr.length; i++) {
    await op(arr[i]);
  }
};

module.exports = forEachAsync;
