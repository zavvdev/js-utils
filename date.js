import dayjs from "dayjs";

/**
 * @param {string | Date} date
 * @param {string} format
 * @returns {string | undefined}
 */
var getFormat = (date, format) =>
  typeof date === "string" ? format : undefined;

export var dateUtil = {
  /**
   * @param {string | undefined} value
   * @param {string | undefined} format
   * @returns {boolean}
   */
  isValid: (value, format) => {
    if (!value) {
      return false;
    }
    return dayjs(value, getFormat(value, format)).isValid();
  },

  /**
   * @param {{
   *    date: string | Date;
   *    beforeDate?: string | Date;
   *    unit?: "milliseconds" | "day";
   *    format?: string;
   * }} parameters
   * @returns {boolean}
   */
  isInPast: (parameters) => {
    var date = dayjs(
      parameters.date,
      getFormat(parameters.date, parameters.format),
    );

    var beforeDate = parameters.beforeDate
      ? dayjs(
        parameters.beforeDate,
        getFormat(parameters.beforeDate, parameters.format),
      )
      : dayjs();

    var unit = parameters.unit ?? "milliseconds";

    return date.isBefore(beforeDate, unit);
  },

  /**
   * @param {string | number | Date} date
   * @param {string} format
   * @param {string?} valueFormat
   * @returns {string}
   */
  format: (value, format, valueFormat) => {
    return dayjs(value, getFormat(value, valueFormat)).format(format);
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
   * @param {string | number | Date | undefined} date
   * @param {string?} format
   * @returns {Date}
   */
  getMonthStartDate: (date, format) => {
    return dayjs(date, getFormat(date, format)).startOf("month").toDate();
  },

  /**
   * @param {string | Date} date
   * @param {string?} format
   * @returns {number}
   */
  getTimestamp: (date, format) => {
    if (!date) {
      return 0;
    }
    return dayjs(date, getFormat(date, format)).valueOf();
  },

  /**
   * @param {string | Date} date
   * @param {string?} format
   * @returns {number}
   */
  getDay: (date, format) => {
    return dayjs(date, getFormat(date, format)).date();
  },

  /**
   * Zero-indexed
   * @param {string | Date} date
   * @param {string?} format
   * @returns {number}
   */
  getMonth: (date, format) => {
    return dayjs(date, getFormat(date, format)).month();
  },

  /**
   * @param {string | Date} date
   * @param {string?} format
   * @returns {number}
   */
  getYear: (date, format) => {
    return dayjs(date, getFormat(date, format)).year();
  },
};
