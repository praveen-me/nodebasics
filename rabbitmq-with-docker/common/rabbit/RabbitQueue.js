const amqp = require("amqplib/callback_api");

const AMQ_RABBIT_URL = process.env.AMQ_RABBIT_URL;

class RabbitQueue {
  constructor(queue, isConsumer = false, consumerEvtHandler = null) {
    this.queue = queue;
    this.queueChannel = null;
    this.isConsumer = isConsumer;
    this.consumerEvtHandler = consumerEvtHandler;

    this.setChannel();
  }

  static setup() {
    return new Promise((resolve, reject) => {
      amqp.connect(AMQ_RABBIT_URL, function (connectError, connection) {
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
      const channel = await RabbitQueue.setup();

      this.queueChannel = channel;

      this.queueChannel.assertQueue(this.queue, {
        durable: false,
      });

      if (this.isConsumer) {
        this.consumer();
      }
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

  consumer() {
    if (this.queueChannel) {
      this.queueChannel.consume(
        this.queue,
        (msg) => {
          const event = JSON.parse(msg.content.toString());

          if (event.type && this.consumerEvtHandler[event.type]) {
            this.consumerEvtHandler[event.type](event.payload);
          }
        },
        {
          noAck: true,
        }
      );
    }
  }
}

module.exports = RabbitQueue;
