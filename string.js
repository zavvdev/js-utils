export var stringUtil = {
  /**
   * @param {string} x
   * @returns {string}
   */
  trimAll: (x) => {
    return x.replaceAll(/\s+/g, " ").trim();
  },

  /**
   * @param {string} x
   * @param {number | undefined} limit
   * @returns {string}
   */
  shorten: (x, limit = 20) => {
    if (
      typeof x === "string" &&
      typeof limit === "number" &&
      limit > 0 &&
      x.length >= limit
    ) {
      var half = Math.floor(limit / 2);
      return `${x.slice(0, half)}...${x.slice(half * -1)}`;
    }
    return x;
  },

  /**
   * @param {string} x
   * @returns {string}
   */
  capitalize: (x) => {
    return x.charAt(0).toUpperCase() + x.slice(1);
  },
};
