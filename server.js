const path = require("path");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 3500;

const whitelists = ["https://www.google.com"];
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

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false })); // for formdata like x-www-form-urlencoded

app.use(express.json()); //middleware for json data

app.use(express.static(path.join(__dirname, "/public")));

app.use("/subdir", require("./routes/subdir"));

app.get(/^\/$|\/index(?:.html)?$/, (req, res) => {
  //^ for begin ,$ for end , | for OR , it make startorend with / or index.html
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res, next) => {
  console.log("three fishish!");
  res.send("finish chained");
};

app.get("/chain", [one, two, three]); // step by step callback with next() function based on middleware

// 👇 All your other routes go above this
app.use((req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
