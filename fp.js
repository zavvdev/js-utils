/**
 * @template {unknown} T
 * @param {T} value
 * @param  {...(value: T) => T} fns
 * @returns {T}
 */
export var pipe = (value, ...fns) => fns.reduce((r, f) => f(r), value);

/**
 * @template {unknown} T
 * @param {T} values
 * @returns {T}
 */
export var identity = (value) => value;

/**
 * @template {unknown} T
 * @param {T} value
 * @returns {boolean}
 */
export var not = (value) => !value;

/**
 * @template {unknown} T
 * @param {(T) => T} elseClause
 * @param {Array<[(T) => boolean, (value: T) => T]>} ifClauses
 * @retuns {(value: T) => T}
 */
export var cond =
  (elseClause, ...ifClauses) =>
  (value) => {
    return (
      ifClauses.find((ifClause) => ifClause[0](value))?.[1]?.(value) ||
      elseClause(value)
    );
  };

/**
 * @template {string|number|null|undefined|boolean} T
 * @template {unknown} R
 * @template {unknown} F
 * @param {F} fallback
 * @param {Array<[T, (value: T) => R]>} patterns
 * @retuns (value: T) => R
 */
export var match =
  (fallback, ...patterns) =>
  (value) => {
    var matched = patterns.find((pattern) => pattern[0] === value);
    return matched ? matched[1](value) : fallback;
  };

/**
 * Maybe monad
 */
export var Maybe = (() => {
  var M = function (value) {
    /**
     * @private
     */
    this.__v = value;
  };

  M.of = function (value) {
    return new M(value);
  };

  M.prototype.isNone = function () {
    return this.__v === null || this.__v === undefined;
  };

  M.prototype.value = function () {
    return this.__v;
  };

  M.prototype.map = function (f) {
    if (this.isNone()) {
      return M.of(this.__v);
    }

    return M.of(f(this.__v));
  };

  M.prototype.orElse = function (fallback) {
    if (this.isNone()) {
      return M.of(fallback);
    }

    return this;
  };

  return M;
})();
