// ============================================================================

/*
 *
 * Essentials
 *
 */

// ============================================================================

/**
 * pipe :: ((a -> b), (x -> y), ..., (y -> z)) -> a -> z
 *
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
 * compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
 *
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
 * curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
 *
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

/**
 * identity :: x -> x
 *
 * @template {unknown} T
 * @param {T} x
 * @returns {T}
 */
export var identity = (x) => x;

// ============================================================================

/*
 *
 * Algebraic Structures
 *
 */

// ============================================================================

/**
 * Maybe
 */

export class Maybe {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Maybe(x);
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  orElse(fallback) {
    return this.isNothing ? Maybe.of(fallback) : this;
  }

  join() {
    return this.$value;
  }
}

/**
 * IO
 */

export class IO {
  constructor(fn) {
    this.unsafePerformIO = fn;
  }

  static of(fn) {
    return new IO(fn);
  }

  map(fn) {
    return new IO((...args) => fn(this.unsafePerformIO(...args)));
  }

  join() {
    return this.unsafePerformIO;
  }
}

/**
 * Either
 */

export var Either = (() => {
  class Left {
    constructor(x) {
      this.$value = x;
    }

    get isLeft() {
      return true;
    }

    get isRight() {
      return false;
    }

    map() {
      return this;
    }

    join() {
      return this.$value;
    }
  }

  class Right {
    constructor(x) {
      this.$value = x;
    }

    get isLeft() {
      return false;
    }

    get isRight() {
      return true;
    }

    map(fn) {
      return new Right(fn(this.$value));
    }

    join() {
      return this.$value;
    }
  }

  return {
    right: (x) => new Right(x),

    left: (x) => new Left(x),

    map: (fn) => (x) => (x.isRight ? new Right(fn(x.join())) : x),

    mapLeft: (fn) => (x) => (x.isLeft ? new Left(fn(x.join())) : x),

    join: (x) => {
      if (x.isLeft || x.isRight) {
        return x.join();
      }
      throw new Error("Not an Either type");
    },
  };
})();

// ============================================================================

/*
 *
 * Pointfree Utilities
 *
 */

// ============================================================================

/**
 * head :: [a] -> a
 *
 * @template {unknown} T
 * @param {Array<T>} xs
 * @returns {T}
 */
export var head = (xs) => xs[0];

/**
 * safeHead :: [a] -> Maybe a
 *
 * @template {unknown} T
 * @param {Array<T>} xs
 * @returns {Maybe(T)}
 */
export var safeHead = (xs) => Maybe.of(xs[0]);

/**
 * last :: [a] -> a
 *
 * @template {unknown} T
 * @param {Array<T>} xs
 * @returns {T}
 */
export var last = (xs) => xs[xs.length - 1];

/**
 * safeLast :: [a] -> Maybe a
 *
 * @template {unknown} T
 * @param {Array<T>} xs
 * @returns {Maybe(T)}
 */
export var safeLast = (xs) => Maybe.of(xs[xs.length - 1]);

/**
 * map :: Functor f => (a -> b) -> f a -> f b
 *
 * @template {unknown} T
 * @template {unknown} R
 * @param {(v: T) => R} fn
 * @returns {(f: Array<T>) => Array<R>}
 */
export var map = (fn) => (f) => f.map(fn);

/**
 * prop :: String -> Object -> a
 *
 * @template {Object} T
 * @template {unknown} R
 * @param {string} k
 * @returns {(x: T) => R}
 */
export var prop = (k) => (x) => x[k];

/**
 * safeProp :: String -> Object -> Maybe a
 *
 * @template {Object} T
 * @template {unknown} R
 * @param {string} k
 * @returns {(x: T) => Maybe(R)}
 */
export var safeProp = (k) => (x) => Maybe.of(x[k]);

/**
 * not :: a -> Boolean
 *
 * @template {unknown} T
 * @param {T} x
 * @returns {boolean}
 */
export var not = (x) => !x;

/**
 * cond :: (a -> b), [(a -> Boolean, a -> b)], ... [(a -> Boolean, a -> b)] -> a -> b
 *
 * @template {unknown} F
 * @template {unknown} R
 * @template {unknown} T
 * @param {(T) => F} elseClause
 * @param {Array<[(T) => boolean, (x: T) => R]>} ifClauses
 * @retuns {(x: T) => F | R}
 */
export var cond =
  (elseClause, ...ifClauses) =>
  (x) =>
    ifClauses.find((ifClause) => ifClause[0](x))?.[1]?.(x) || elseClause(x);

/**
 * match :: a, [(a, a -> b)], ... [(a, a -> b)] -> a -> b
 *
 * @template {unknown} T
 * @template {unknown} R
 * @template {unknown} F
 * @param {F} fallback
 * @param {Array<[T, (x: T) => R]>} patterns
 * @retuns {(x: T) => F | R}
 */
export var match =
  (fallback, ...patterns) =>
  (x) =>
    patterns.find((pattern) => pattern[0] === x)?.[1]?.(x) || fallback;
