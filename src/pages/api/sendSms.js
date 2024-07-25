import africastalking from 'africastalking';

const credentials = {
  apiKey: 'atsk_a470264bdcd4c334596316040b66135325ed5ff325893cc63fa3f63fe961566fe53530a4', 
  username: 'sandbox', 
};

const at = africastalking(credentials);
const sms = at.SMS;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;


  // Validate Nigerian phone number
  const phoneRegex = /^((^234)[0–9]{10})/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid Nigerian phone number' });
  }

  const message = 'Welcome to AgriSmart! Thanks for subscribing. Here\'s a farming tip: Ensure regular watering of your crops for optimal growth.';

  try {
    const response = await sms.send({
      to: [phoneNumber],
      message,
      from:"08102920194",
    });

    return res.status(200).json({ success: 'Message sent successfully', response });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
} else {
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
}
