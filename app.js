const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });

const searchRoutes = require("./routes/search")

const port = process.env.PORT || 3030;
const headers = process.env.HEADERS;
const app = express();
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_NOT_FOUND = 404;

app.use(
  bodyParser.urlencoded({
      extended: false,
  }),
);
app.use(express.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//// API routes
// Root endpoint
app.get("/app/", (req, res, next) => {
  res.json({"message":"This API works! (200)"});
  res.status(HTTP_STATUS_OK);
});

// Routes
// app.use(searchRoutes);

//// Default response for any request not addressed by the defined endpoints ////
app.use(function (req, res, next) {
  res.json({ "message": "Endpoint not found. (404)" });
  res.status(HTTP_STATUS_NOT_FOUND);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})