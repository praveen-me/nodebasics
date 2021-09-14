require("dotenv").config();
const RabbitQueue = require("./RabbitQueue");
const eventTypes = require("./eventTypes");

module.exports = {
  RabbitQueue,
  eventTypes,
};
