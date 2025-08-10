const credientials = require("../middleware/credientials");
const whitelists = require("./allowedOrigin");
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelists.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("this origin is not allowed"));
    }
  },
  
  optionsSuccessStatus: 200,
};
module.exports = corsOptions;
