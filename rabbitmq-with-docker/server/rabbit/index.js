const amqp = require("amqplib/callback_api");
const eventTypes = require("./eventTypes");

class QueuePublisher {
  constructor(queue) {
    this.queue = queue;
    this.queueChannel = null;

    this.setChannel();
  }

  static setup() {
    return new Promise((resolve, reject) => {
      amqp.connect("amqp://rabbitmq:5672", function (connectError, connection) {
        if (connectError) {
          return reject(connectError);
        }
        connection.createChannel(function (channelError, channel) {
          if (channelError) {
            return reject(channelError);
          }

          resolve(channel);
        });
      });
    });
  }

  async setChannel() {
    try {
      const channel = await QueuePublisher.setup();

      this.queueChannel = channel;

      this.queueChannel.assertQueue(this.queue, {
        durable: false,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  sendEvent(msg) {
    if (this.queueChannel) {
      this.queueChannel.sendToQueue(
        this.queue,
        Buffer.from(JSON.stringify(msg))
      );
      console.log(" [x] Sent %s", JSON.stringify(msg, null, 2));
    }
  }
}

module.exports = { QueuePublisher, eventTypes };
