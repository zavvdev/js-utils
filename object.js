export var objectUtil = {
  /**
   * @template {unknown} R
   * @param {Record<string, any>} object
   * @param {string} path}
   * @returns {R}
   */
  get: (object, path) => {
    var properties = Array.isArray(path) ? path : path.split(".");
    return properties.reduce((carry, node) => carry?.[node], object);
  },

  /**
   * @param {unknown} x
   * @returns {boolean}
   */
  isObject: (x) => x !== null && typeof x === "object" && !Array.isArray(x),
};
