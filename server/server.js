// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import AfricasTalking from "africastalking"

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}))

// const africastalking = AfricasTalking({
//   apiKey: "atsk_a470264bdcd4c334596316040b66135325ed5ff325893cc63fa3f63fe961566fe53530a4",
//   username: "sandbox",
// });


// async function sendSMS(res){
//   try {
//     const result = await africastalking.SMS.send({
//       to:"+23480606186",
//       message:"hello",
//       from:"agriSmart"
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
 // server.js
const express = require('express');
const africastalking = require('africastalking');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const at = africastalking({
  apiKey:"atsk_662258a888b35933b57a8da76ff11e060f54ee876bfdbe63faecf55cea4685a8366c4ca2",
  username: "agriSmart"
});

const sms = at.SMS;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());


// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/test', (req, res) => {
  res.send('Test route is working!');
});


app.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;
  try {
    const response = await sms.send({
      to,
      message,
      from: 'agriSmart',
    });

    res.json({ status: 'success', data: response });
    console.log(response);
  } catch (error) {
    console.error('Error sending SMS:', error.message ,error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
