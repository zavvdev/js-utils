import dayjs from "dayjs";

export var dateUtil = {
  /**
   * @param {string | undefined} value
   * @returns {boolean}
   */
  isValid: (value) => {
    if (!value) {
      return false;
    }

    return dayjs(value).isValid();
  },

  /**
   * @param {{
   *    date: string | Date;
   *    beforeDate?: string | Date;
   *    unit?: "milliseconds" | "day";
   * }} parameters
   * @returns {boolean}
   */
  isInPast: (parameters) => {
    var date = dayjs(parameters.date);

    var beforeDate = parameters.beforeDate
      ? dayjs(parameters.beforeDate)
      : dayjs();

    var unit = parameters.unit ?? DateUnit.Milliseconds;

    return date.isBefore(beforeDate, unit);
  },

  /**
   * @param {string | number | Date} date
   * @param {string} format
   * @param {string?} valueFormat
   * @returns {string}
   */
  format: (value, format, valueFormat) => {
    return dayjs(value, valueFormat).format(format);
  },

  /**
   * @returns {Date}
   */
  getTodaysDate: () => {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    );
  },

  /**
   * @returns {Date}
   */
  getTomorrowsDate: () => {
    return dayjs().add(1, "day").toDate();
  },

  /**
   * @param {string | number | Date} value
   * @param {"past" | "future"} direction
   * @param {number?} daysCount
   * @returns {Date}
   */
  move: (value, direction, daysCount = 1) => {
    if (direction === "past") {
      return dayjs(value).subtract(daysCount, "day").toDate();
    }

    return dayjs(value).add(1, "day").toDate();
  },

  /**
   * @param {string | number | Date | undefined} date
   * @returns {Date}
   */
  getMonthStartDate: (date) => {
    return dayjs(date).startOf("month").toDate();
  },

  /**
   * @param {string | Date} date
   * @returns {number}
   */
  getTimestamp: (date) => {
    if (!date) {
      return 0;
    }
    return dayjs(date).valueOf();
  },

  /**
   * @param {string | Date} date
   * @returns {number}
   */
  getDay: (date) => {
    return dayjs(date).date();
  },

  /**
   * Zero-indexed
   * @param {string | Date} date
   * @returns {number}
   */
  getMonth: (date) => {
    return dayjs(date).month();
  },

  /**
   * @param {string | Date} date
   * @returns {number}
   */
  getYear: (date) => {
    return dayjs(date).year();
  },
};
