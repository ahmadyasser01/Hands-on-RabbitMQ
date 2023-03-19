import * as amqlib from "amqplib";

(async () => {
  const queueName = "helloQueue";
  const connection = await amqlib.connect("amqp://localhost");

  const ch1 = await connection.createChannel();

  await ch1.assertQueue(queueName, { durable: true });

  ch1.consume(queueName, (msg) => {
    if (msg === null) return;
    console.log("Message Recieved", msg);
    console.log("Message content", msg?.content.toString());
    ch1.ack(msg);
  });
})();
