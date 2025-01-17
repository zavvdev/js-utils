import { isPossiblePhoneNumber } from "libphonenumber-js";

export var phoneUtil = {
  /**
   * @param {string} phone
   * @returns {string}
   */
  onlyDigits: (phone) => {
    if (typeof phone === "string") {
      return phone.replaceAll(/\D/g, "");
    }
    return phone;
  },

  /**
   * @param {string} phone
   * @returns {string}
   */
  withPrefix: (phone) => {
    var PREFIX = "+";

    if (
      typeof phone === "string" &&
      phone.trim().length > 0 &&
      !phone.startsWith(PREFIX)
    ) {
      return `${PREFIX}${phone}`;
    }

    return phone;
  },

  /**
   * @param {string} phone
   * @returns {boolean}
   */
  isPossible: (phone) => {
    return isPossiblePhoneNumber(phone);
  },

  /**
   * @param {string} phone
   * @returns {string}
   */
  compose: (phone) => {
    return this.withPrefix(this.onlyDigits(phone));
  },
};
