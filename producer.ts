import * as amqlib from "amqplib";

(async () => {
  const queueName = "helloQueue";
  const connection = await amqlib.connect("amqp://localhost");

  const ch1 = await connection.createChannel();

  await ch1.assertQueue(queueName, { durable: true });
  const PrivateMessage = "Hello world";

  ch1.sendToQueue(queueName, Buffer.from(PrivateMessage));

  console.log("Sent");
})();
