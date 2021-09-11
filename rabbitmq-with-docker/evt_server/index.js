const express = require("express");
var bodyParser = require("body-parser");

const { QueueSubscriber } = require("./eventSubscriber");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

new QueueSubscriber("products");

app.get("/", (req, res) => {
  res.json({
    msg: "woo hoo",
  });
});

app.listen(PORT, () => {
  console.log("Server is started on ", PORT);
});
