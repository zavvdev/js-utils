export var fileUtil = {
  /**
   * @param {string} filename
   * @returns {string}
   */
  getExtensionFromName: (filename) => {
    if (filename.length === 0) {
      return "";
    }

    var dot = filename.lastIndexOf(".");

    if (dot === -1) {
      return "";
    }

    return filename.slice(dot, filename.length);
  },

  /**
   * @param {File} file
   * @param {{
   *    method: "text" | "arrayBuffer" | "dataUrl"
   * }?} param1
   *
   * @returns {Promise<string | ArrayBuffer>}
   */
  read: async (file, { method = "arrayBuffer" } = {}) => {
    var methodsMap = {
      text: "readAsText",
      arrayBuffer: "readAsArrayBuffer",
      dataUrl: "readAsDataURL",
    };

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader[methodsMap[method]](file);
    });
  },

  /**
   * @param {string} base64
   * @param {"pdf"} convertType
   * @returns {Blob}
   */
  base64ToBlob: (base64, convertType) => {
    if (typeof base64 === "string") {
      var byteCharacters = atob(base64);
      var byteNumbers = Array.from(
        byteCharacters,
        (char) => char.codePointAt(0) || 0,
      );

      var byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: `application/${convertType}` });
    }

    throw new TypeError(`not string type`);
  },

  /**
   * @param {Blob} blob
   * @returns {string}
   */
  blobToUrl: (blob) => {
    if (blob instanceof Blob) {
      return URL.createObjectURL(blob);
    }
    throw new TypeError(`Not blob type`);
  },

  /**
   * @param {string} dataUrl
   * @param {string} fileName
   * @returns {File}
   */
  dataUrlToFile: (dataUrl, fileName) => {
    var array = dataUrl.split(",");
    var regex = /:(.*?);/;
    var match = array?.[0] ? regex.exec(array?.[0]) : null;
    var mime = match?.[1];
    var bstr = atob(array[1]);

    var n = bstr.length;
    var u8array = new Uint8Array(n);

    while (n--) {
      u8array[n] = bstr.codePointAt(n);
    }

    return new File([u8array], fileName, { type: mime });
  },
};
