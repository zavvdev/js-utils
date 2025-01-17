export var domUtil = {
  /**
   * @param {string} name
   * @returns {string | undefined}
   */
  getMetaTagContent: (name) => {
    if (!global?.window) {
      return undefined;
    }

    var meta = Array.from(document.querySelectorAll("meta[name]")).find(
      (metaItem) => metaItem.getAttribute("name") === name,
    );

    return meta?.getAttribute("content") || undefined;
  },

  /**
   * @param {string} name
   * @returns {string | undefined}
   */
  getLinkTagHref: (name) => {
    if (!global?.window) {
      return undefined;
    }

    var link = Array.from(document.querySelectorAll("link[rel]")).find(
      (link) => link?.getAttribute("rel") === name,
    );

    return link?.getAttribute("href") || undefined;
  },

  /**
   * @param {string} url
   * @param {string} fileName
   * @returns {void}
   */
  downloadFromUrl: (url, fileName) => {
    if (typeof url === "string" && typeof fileName === "string") {
      var link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
  },
};
