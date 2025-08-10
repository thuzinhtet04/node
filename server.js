const path = require("path");
const express = require("express");
const cors = require("cors");
const corsOptions = require('./config/corsOptions')
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 3500;


// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false })); 

//built-in middleware to handle json 
app.use(express.json()); //middleware for json data

// serve static file like Image,html,css and json file
app.use( "/" , express.static(path.join(__dirname, "/public")));


//routes
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employee"));

// 404 page handler
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
