import * as amqlib from "amqplib";

(async () => {
  const connection = await amqlib.connect("amqp://localhost");

  const ch1 = await connection.createChannel();

  const exchangeName = "logs";
  const message = "Hello world";

  // await ch1.assertQueue(queueName, { durable: true });
  ch1.assertExchange(exchangeName, "fanout", {
    durable: false,
  });
  setInterval(() => {
    ch1.publish(exchangeName, "", Buffer.from(message));
    console.log("[x] Sent ", message, "To cancel press ctrl + c");
  }, 1000);

  // setTimeout(function () {
  //   connection.close();
  //   process.exit(0);
  // }, 500);
})();
