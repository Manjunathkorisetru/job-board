Array.prototype.flat = function () {
  return function flat(arr) {
    return arr.reduce(
      (acc, val) =>
        Array.isArray(val) ? acc.concat(flat(val)) : acc.concat(val),
      []
    );
  };
};
