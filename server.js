require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/application/controller/routes.js");
const errorHandler = require("./src/application/middleware/errorHandler.js");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI, {});

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
  });
}

app.use(routes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;