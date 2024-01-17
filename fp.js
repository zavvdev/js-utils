/**
 * @template {Base} T
 * @param {T} value
 * @param  {...(value: T) => T} fns
 * @returns {T}
 */
export const pipe = (value, ...fns) => fns.reduce((r, f) => f(r), value);

/**
 * @template {Base} T
 * @param {T} values
 * @returns {T}
 */
export const identity = (value) => value;

/**
 * @template {Base} T
 * @param {(T) => T} elseClause
 * @param {Array<[(T) => boolean, (T) => T]>} ifClauses
 * @retuns (T) => T
 */
export const cond =
  (elseClause, ...ifClauses) =>
    (value) => {
      return (
        ifClauses.find((ifClause) => ifClause[0](value))?.[1]?.(value) ||
        elseClause(value)
      );
    };

/**
 * Maybe monad
 */
export const Maybe = (() => {
  const M = function(value) {
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

