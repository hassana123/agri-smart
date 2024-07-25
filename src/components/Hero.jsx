import React, { useState } from 'react';
import axios from 'axios';
import frame from "../assets/Frame2.png";

const Hero = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const validatePhoneNumber = (number) => {
    const regex = /^(?:\+234|0)(?:7|8|9)[0-9]{9}$/;
    return regex.test(number);
  };

  const formatPhoneNumber = (number) => {
    if (number.startsWith('0')) {
      return '+234' + number.slice(1);
    }
    return number;
  };

  const handleSubscribe = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setMessage('Invalid phone number. Please enter a valid Nigerian phone number.');
      return;
    }

    const formattedNumber = formatPhoneNumber(phoneNumber);

    try {
      const response = await axios.post('http://localhost:3000/send-sms', {
        to: formattedNumber,
        message: 'Thank you for subscribing to daily agriculture tips!'
      });

      if (response.data.status === 'success') {
        console.log(response);
        setMessage('Subscription successful! You will start receiving daily agriculture tips.');
      } else {
        setMessage('Failed to subscribe. Please try again later.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <section id='subscribe' className='mt-10 w-[90%] mx-auto md:flex justify-between items-center'>
      <div className='md:w-[50%] md:my-0 my-10 space-y-3 font-[400] text-[18px] text-tetiary'>
        <p>Upload, Diagnose, and Protect Your Crops with Ease</p>
        <h1 className='text-secondary text-[22px] md:text-[48px] font-[700]'>Empower Your Farming with Smart Crop Health Diagnostics</h1>
        <p className=''>Our diagnostic tool identifies crop infections fast. Upload a photo of your crop, and get insights, health status, and recommendations. Subscribe for regular crop health tips and updates.</p>
        <div className='md: items-center '>
          <small className='block mt-10 mb-2'>Type in your mobile number to subscribe to receiving daily agriculture tips</small>
          <input
            className='y w-full shadow-lg rounded-md border py-3 px-4 border-[#E3E5EB] bg-[#E3E5EB] text-[#90BFA8]'
            type="text"
            placeholder='phone number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            className='bg-primary mt-10 rounded-md text-white py-3 px-5'
            onClick={handleSubscribe}
          >
            Subscribe to Tips
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
      <img className='md:w-[40%]' src={frame} alt="" />
    </section>
  );
};

export default Hero;
