import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * @typedef {string | number | Date} DateType
 *
 * @typedef {{
 *  format?: string;
 *  utc?: boolean;
 * }} Parameters
 */

/**
 * @param {Parameters?} parameters
 * @param {DateType?} date
 * @returns {dayjs.Dayjs}
 */
var getF = (parameters, date) => {
  var isUtc = parameters?.utc ?? true;
  return isUtc && date ? dayjs.utc : dayjs;
};

/**
 * @param {DateType} date
 * @param {string} format
 * @returns {string | undefined}
 */
var getFormat = (date, format) =>
  typeof date === "string" ? format : undefined;

export var dateUtil = {
  /**
   * @param {DateType} date
   * @param {Parameters?} parameters
   * @returns {boolean}
   */
  isValid: (date, parameters) => {
    if (!date) return false;
    var f = getF(parameters, date);
    return f(value, getFormat(value, parameters?.format)).isValid();
  },

  /**
   * @param {DateType} date
   * @param {Parameters & {
   *    beforeDate?: DateType;
   *    unit?: "milliseconds" | "day";
   * }} parameters
   * @returns {boolean}
   */
  isInPast: (date, parameters) => {
    var f = getF(parameters, date);
    var date_ = f(date, getFormat(date, parameters?.format));

    var beforeDate = parameters?.beforeDate
      ? f(
        parameters.beforeDate,
        ensureFormat(parameters.beforeDate, parameters?.format),
      )
      : dayjs();

    return date_.isBefore(beforeDate, parameters?.unit ?? "milliseconds");
  },

  /**
   * @param {DateType} date
   * @param {string} format
   * @param {Parameters?} parameters
   * @returns {string}
   */
  format: (date, format, parameters) => {
    var f = getF(parameters, date);
    return f(date, getFormat(date, parameters?.format)).format(format);
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
   * @param {DateType} date
   * @param {Parameters?}
   * @returns {number}
   */
  getTimestamp: (date, parameters) => {
    if (!date) return 0;
    var f = getF(parameters, date);
    return f(date, getFormat(date, parameters?.format)).valueOf();
  },

  /**
   * @param {DateType} date
   * @param {Parameters?} parameters
   * @returns {number}
   */
  getDay: (date, parameters) => {
    var f = getF(parameters, date);
    return f(date, getFormat(date, parameters?.format)).date();
  },

  /**
   * Zero-indexed
   * @param {DateType} date
   * @param {Parameters?} parameters
   * @returns {number}
   */
  getMonth: (date, parameters) => {
    var f = getF(parameters, date);
    return f(date, getFormat(date, parameters?.format)).month();
  },

  /**
   * @param {DateType} date
   * @param {Parameters?} parameters
   * @returns {number}
   */
  getYear: (date, parameters) => {
    var f = getF(parameters, date);
    return f(date, getFormat(date, parameters?.format)).year();
  },
};
