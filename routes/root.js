const path = require("path");

const express = require('express')
const router = express.Router();

router.get(/^\/$|\/index(?:.html)?$/, (req, res) => {
  //^ for begin ,$ for end , | for OR , it make startorend with / or index.html
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname,".." , "views", "index.html"));
});


module.exports = router;
