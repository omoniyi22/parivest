const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
let { DB } = require("./config");
const Routes = require("./routes/index");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const documentation = path.join(__dirname, "/documentation/", "index.html");
app.use(express.static(path.join(__dirname, "/documentation")));

Routes(router);

app.use("/v1/api", router);
app.get("/*", (req, res) => {
  res.sendFile(documentation);
});

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongo started"));

module.exports = app;
