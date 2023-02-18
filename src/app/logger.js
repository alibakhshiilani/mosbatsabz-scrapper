const chalk = require("chalk");

const logger = (type, message) => {
  const colorsByType = {
    log: "blue",
    error: "red",
    success: "green",
  };

  const methodsByType = {
    log: "log",
    error: "error",
    success: "log",
  };
  console[methodsByType[type]](chalk[colorsByType[type]](message));
  console.log("\n");
};

exports.logger = logger;
