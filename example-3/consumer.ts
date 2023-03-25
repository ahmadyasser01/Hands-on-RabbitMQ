import * as amqlib from "amqplib";

(async () => {
  const queueName = "helloQueue";
  const connection = await amqlib.connect("amqp://localhost");

  const ch1 = await connection.createChannel();
  const exchangeName = "logs";
  await ch1.assertExchange(exchangeName, "fanout", {
    durable: false,
  });
  const q = await ch1.assertQueue("", {
    exclusive: true,
  });
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

  ch1.bindQueue(q.queue, exchangeName, "");

  ch1.consume(
    q.queue,
    (msg) => {
      if (msg === null) return;
      console.log("Message Recived content", msg?.content.toString());
    },
    { noAck: true }
  );
})();
