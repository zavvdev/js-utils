export var numberUtil = {
  /**
   * @param {number[]} numbers - should be unique
   * @param {number?} increment
   * @returns {number[][]}
   */
  groupConsecutiveNumbers: (numbers, increment = 1) => {
    if (!Array.isArray(numbers) || typeof increment !== "number") {
      return [];
    }

    return numbers.reduce((carry, x) => {
      var idx = carry.findIndex(
        (y) =>
          (y.includes(x + increment) || y.includes(x - increment)) &&
          !y.includes(x),
      );

      if (idx !== -1) {
        carry[idx].push(x);
        return carry;
      }

      return [...carry, [x]];
    }, []);
  },
};
