require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { RabbitQueue, eventTypes } = require("../common/rabbit");

const app = express();
const PORT = process.env.PORT || 5001;
const eventQueue = new RabbitQueue("products");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    msg: "woo hoo",
  });
});

app.post("/product", (req, res) => {
  const { body } = req;
  // send product event to the evt services
  eventQueue.sendEvent({
    type: eventTypes.PRODUCT_CREATED,
    payload: {
      ...body,
    },
  });

  res.json({
    ...body,
  });
});

app.listen(PORT, () => {
  console.log("Server is started on ", PORT);
});
