require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const { RabbitQueue } = require("../common/rabbit");
const handlers = require("./handlers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

new RabbitQueue("products", true, handlers);

app.get("/", (req, res) => {
  res.json({
    msg: "woo hoo",
  });
});

app.listen(PORT, () => {
  console.log("Server is started on ", PORT);
});
