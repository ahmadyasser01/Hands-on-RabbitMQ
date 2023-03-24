import * as amqlib from "amqplib";

(async () => {
  const queueName = "helloQueue";
  const connection = await amqlib.connect("amqp://localhost");

  const ch1 = await connection.createChannel();

  await ch1.assertQueue(queueName, { durable: true });

  ch1.consume(
    queueName,
    (msg) => {
      if (msg === null) return;
      const secs = msg.content.toString().split(".").length - 1;
      console.log("Message Recived content", msg?.content.toString());
      setTimeout(() => {
        console.log("Done");
        ch1.ack(msg);
      }, secs * 1000);
    },
    { noAck: false }
  );
})();
