import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const custom_colors = {
  fatal: "magenta",
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
};
winston.addColors(custom_colors);

const custom_levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

const logger = winston.createLogger({
  levels: custom_levels,
  level: process.env.LOG_LEVEL,

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: process.env.LOG_DATE_PATTERN ?? "YYYY-MM-DD",

      level: "error",
      maxSize: process.env.LOG_MAX_SIZE ?? "20m",
      maxFiles: `${process.env.LOG_MAX_DAYS ?? 3}d`,
    }),

    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: process.env.LOG_DATE_PATTERN ?? "YYYY-MM-DD",

      maxSize: process.env.LOG_MAX_SIZE ?? "20m",
      maxFiles: `${process.env.LOG_MAX_DAYS ?? 3}d`,
    }),
  ],
});

export default logger;
