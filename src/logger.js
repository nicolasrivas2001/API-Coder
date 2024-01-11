import winston from "winston";
import config from "./config.js";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  }
};

export let logger

if (config.environment === "production") {
  logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.File({
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.prettyPrint()
        ),
      }),
      new winston.transports.File({
        level: "error",
        filename: "errors.log",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.prettyPrint()
        ),
      }),
    ],
  });
} else if (config.environment === "development"){
  logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        level: "error",
        filename: "errors.log",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.prettyPrint()
        ),
      })
    ],
  });
}