export var urlUtil = {
  /**
   * @param {string} url
   * @param {boolean | undefined} blank
   * @returns {void}
   */
  openUrl: (url, blank = true) => {
    if (typeof window !== "undefined" && typeof url === "string") {
      window.open(url, blank ? "_blank" : "_self");
    }
  },

  /**
   * @param {string} url
   * @returns {boolean}
   */
  isHttpUrl: (url) => {
    return new RegExp(/^https?:\/\/(www\.)?[\d.A-Za-z-]+/).test(url);
  },
};
