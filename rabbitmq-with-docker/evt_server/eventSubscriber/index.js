const amqp = require("amqplib/callback_api");
const eventHandler = require("./eventHandler");
// const eventTypes = require("./eventTypes");

class QueueSubscriber {
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
      const channel = await QueueSubscriber.setup();

      this.queueChannel = channel;

      this.queueChannel.assertQueue(this.queue, {
        durable: false,
      });

      this.queueChannel.consume(
        this.queue,
        function (msg) {
          const event = JSON.parse(msg.content.toString());

          if (event.type) {
            eventHandler[event.type](event.payload);
          }
        },
        {
          noAck: true,
        }
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = { QueueSubscriber };
