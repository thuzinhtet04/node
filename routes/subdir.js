const express = require("express");
const router = express.Router();
const path = require("path");

router.get(/^\/$|\/index(?:.html)?$/, (req, res) => {
  //^ for begin ,$ for end , | for OR , it make startorend with / or index.html

  res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"));
});

router.get('/test', (req, res) => {
  //^ for begin ,$ for end , | for OR , it make startorend with / or index.html

  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

module.exports = router;
