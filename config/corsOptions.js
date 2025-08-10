const whitelists = require("./allowedOrigin");

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelists.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("this origin is not allowed"));
    }
  },
  credentials: true, //add true for preflight that use crediential include from front-end request
  optionsSuccessStatus: 200,
};
module.exports = corsOptions;
