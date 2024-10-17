class FileUtil {
  /**
   * @param {string} filename
   * @returns {string}
   */
  getExtensionFromName = (filename) => {
    if (filename.length === 0) {
      return "";
    }

    var dot = filename.lastIndexOf(".");

    if (dot === -1) {
      return "";
    }

    return filename.slice(dot, filename.length);
  };

  /**
   * @param {File} file
   * @param {{
   *    method: "text" | "arrayBuffer" | "dataUrl"
   * }?} param1
   *
   * @returns {Promise<string | ArrayBuffer>}
   */
  read = async (file, { method = "arrayBuffer" } = {}) => {
    var methodsMap = {
      text: "readAsText",
      arrayBuffer: "readAsArrayBuffer",
      dataUrl: "readAsDataURL",
    };

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader[methodsMap[method]](file);
    });
  };
}

export const fileUtil = new FileUtil();
