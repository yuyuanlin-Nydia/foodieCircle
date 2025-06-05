const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.reporter = {
  update(event) {
    console.log(event.data);
    // 過濾掉來自 node_modules 的錯誤與警告
    if (event.type === "log" && event.data.includes("node_modules")) {
      return;
    }

    if (event.type === "error") {
      const filteredErrors = event.data.filter(
        (err) => !err.includes("node_modules")
      );
      if (filteredErrors.length === 0) return;
      event.data = filteredErrors;
    }

    if (event.type === "warn") {
      const filteredWarnings = event.data.filter(
        (warn) => !warn.includes("node_modules")
      );
      if (filteredWarnings.length === 0) return;
      event.data = filteredWarnings;
    }

    // 繼續顯示其他錯誤與警告
    console.log(event);
  },
};

module.exports = defaultConfig;
