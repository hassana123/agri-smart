import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import africastalking from 'africastalking';

const app = express();
const port = 5000;

const client = africastalking({
  username: "sandbox",
  apiKey: "atsk_8ea1038691a5ac81ff5152d7395c5482be33c823a29486032baba43739d3561f1d9199ac",
});

app.use(cors());
app.use(bodyParser.json());

app.post('/send-sms', async (req, res) => {
  const { phone, message } = req.body;
  try {
    const response = await client.SMS.send({
      to: phone,
      message: message,
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
