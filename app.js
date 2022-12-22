const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("error connecting to MongoDB:", error.message));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;
