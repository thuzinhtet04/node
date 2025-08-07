const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logEvents = async (message, fileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  //testin
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logEvents, logger };
