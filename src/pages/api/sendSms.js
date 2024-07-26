// import AfricasTalking from 'africastalking';
// import { config } from 'dotenv';

// config();

// const africasTalking = AfricasTalking({
//   apiKey: process.env.AFRICASTALKING_API_KEY,
//   username: process.env.AFRICASTALKING_USERNAME,
// });

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { to, message } = req.body;

//     try {
//       const result = await africasTalking.SMS.send({
//         to,
//         message,
//         from: process.env.SENDER_ID,
//       });
//       res.status(200).json({ status: 'success', data: result });
//     } catch (error) {
//       // res.status(500).json({ status: 'error', message: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
