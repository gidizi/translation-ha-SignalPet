const path = require("path");

const resolvedPath = path.resolve(__dirname, "public", "locales");

module.exports = {
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  output: [resolvedPath],
  options: {
    debug: true,
    func: {
      list: ["t", "i18next.t"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    lngs: ["en", "de", "es", "fr", "pt"],
    ns: ["extractedKeysFromText"],
    defaultLng: "en",
    defaultNs: "extractedKeysFromText",
    defaultValue: (lng, ns, key) => key,
    keySeparator: false,
    nsSeparator: false,
  },
};
