
// import AfricasTalking from "africastalking";
// import { config } from "dotenv";

// config()


// const  africastalking = AfricasTalking({
//   apiKey:process.env.AFRICASTALKING_API_KEY,
//   username: process.env.AFRICASTALKING_USERNAME,
// });

// try {
//   const result = await africastalking.SMS.send({
//     to:"+2348060618637",
//     message:"how are u",
//     from:process.env.SENDER_ID,
//   })
//   console.log(result)
// } catch (error) {
//   console.error(error)
// }

import express from 'express';
import bodyParser from 'body-parser';
import AfricasTalking from 'africastalking';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const africasTalking = AfricasTalking({
  apiKey: process.env.AFRICASTALKING_API_KEY,
  username: process.env.AFRICASTALKING_USERNAME,
});

app.use(bodyParser.json());

// Middleware for handling CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;

  try {
    const result = await africasTalking.SMS.send({
      to,
      message,
      from: process.env.SENDER_ID,
    });
    res.status(200).json({ status: 'success', data: result });
    console.log("success", res.status);
  } catch (error) {
    console.log("error:",error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
