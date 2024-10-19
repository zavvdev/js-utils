/**
 * Maybe monad
 */
export var Maybe = (() => {
  var M = function(value) {
    /**
     * @private
     */
    this.__v = value;
  };

  M.of = function(value) {
    return new M(value);
  };

  M.prototype.isNone = function() {
    return this.__v === null || this.__v === undefined;
  };

  M.prototype.value = function() {
    return this.__v;
  };

  M.prototype.map = function(f) {
    if (this.isNone()) {
      return M.of(this.__v);
    }

    return M.of(f(this.__v));
  };

  M.prototype.orElse = function(fallback) {
    if (this.isNone()) {
      return M.of(fallback);
    }

    return this;
  };

  return M;
})();

/**
 * @template {unknown} T
 * @template {unknown} R
 * @param {Array<Function>} fns
 * @returns {(x: T) => T | R}
 */
export var pipe =
  (...fns) =>
    (x) =>
      fns.reduce((r, f) => f(r), x);

/**
 * @template {unknown} T
 * @template {unknown} R
 * @param {Array<Function>} fns
 * @returns {(x: T) => T | R}
 */
export var compose =
  (...fns) =>
    (x) =>
      fns.reduceRight((r, f) => f(r), x);

/**
 * @template {unknown} T
 * @template {unknown} R
 * @param {(v: T) => R} fn
 * @returns {(xs: Array<T>) => Array<R>}
 */
export var map = (fn) => (xs) => xs.map(fn);

/**
 * @template {unknown} T
 * @param {T} x
 * @returns {T}
 */
export var identity = (x) => x;

/**
 * @template {unknown} T
 * @param {T} x
 * @returns {boolean}
 */
export var not = (x) => !x;

/**
 * @template {Object} T
 * @template {unknown} R
 * @param {string} k
 * @returns {(x: T) => R}
 */
export var prop = (k) => (x) => x[k];

/**
 * @template {unknown} T
 * @param {Array<T>} xs
 * @returns {T}
 */
export var head = (xs) => xs[0];

/**
 * @template {Object} T
 * @template {unknown} R
 * @param {string} k
 * @returns {(x: T) => Maybe(R)}
 */
export var safeProp = (k) => (x) => Maybe.of(x[k]);

/**
 * @template {unknown} T
 * @param {Array<T>} xs
 * @returns {Maybe(T)}
 */
export var safeHead = (xs) => Maybe.of(xs[0]);

/**
 * @template {unknown} T
 * @param {(T) => T} elseClause
 * @param {Array<[(T) => boolean, (x: T) => T]>} ifClauses
 * @retuns {(x: T) => T}
 */
export var cond =
  (elseClause, ...ifClauses) =>
    (x) =>
      ifClauses.find((ifClause) => ifClause[0](x))?.[1]?.(x) || elseClause(x);

/**
 * @template {string|number|null|undefined|boolean} T
 * @template {unknown} R
 * @template {unknown} F
 * @param {F} fallback
 * @param {Array<[T, (x: T) => R]>} patterns
 * @retuns {(x: T) => R}
 */
export var match =
  (fallback, ...patterns) =>
    (x) =>
      patterns.find((pattern) => pattern[0] === x)?.[1]?.(x) || fallback;

/**
 * @param {Function} fn
 * @returns {Function}
 */
export var curry = (fn) => {
  var arity = fn.length;

  return function result(...args) {
    if (args.length < arity) {
      return result.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
};
