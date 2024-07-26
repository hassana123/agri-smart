import React, { useState } from 'react';
import axios from 'axios';
import frame from "../assets/Frame2.png";

const Hero = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [success, setSuccess] = useState(false)
  const [showMessage, setShowMessage] = useState(false);

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
    setSubscribe(true)
    if (!validatePhoneNumber(phoneNumber)) {
      setMessage('Invalid phone number. Please enter a valid Nigerian phone number.');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 180000); // 3 minutes
      return;
    }

    const formattedNumber = formatPhoneNumber(phoneNumber);

    try {
      const response = await axios.post('http://localhost:3000/send-sms', {
        to: formattedNumber,
        message: 'Thank you for subscribing to daily agriculture tips! \n Do you know? \n Water your plants in the morning to reduce evaporation and ensure better absorption by the roots.',
      });
      console.log(response);
      setPhoneNumber("")
      if (response.data.status === 'success') {
        setMessage('Subscription successful! You will start receiving daily agriculture tips.');
        setShowMessage(true);
        setSubscribe(false)
        setTimeout(() => {
          setShowMessage(false);
        }, 180000);
        setSuccess(true)
      } else {
        setMessage('Failed to subscribe. Please try again later.');
        setShowMessage(true);
        setSubscribe(false)
        setTimeout(() => {
          setShowMessage(false);
        }, 180000);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setShowMessage(true);
      setSubscribe(false)
      setTimeout(() => {
        setShowMessage(false);
      }, 180000); // 3 minutes
    }
  };

  return (
    <section className='mt-10 w-[90%] mx-auto md:flex justify-between items-center'>
      <div className='md:w-[50%] md:my-0 my-10 space-y-3 font-[400] text-[18px] text-tetiary'>
        <p>Upload, Diagnose, and Protect Your Crops with Ease</p>
        <h1 className='text-secondary text-[22px] md:text-[48px] font-[700]'>Empower Your Farming with Smart Crop Health Diagnostics</h1>
        <p className=''>Our diagnostic tool identifies crop infections fast. Upload a photo of your crop, and get insights, health status, and recommendations. Subscribe for regular crop health tips and updates.</p>
        <div className='md: items-center  ' id='subscribe'>
          <small className='block mt-10 mb-2'>Type in your mobile number to subscribe to receiving daily agriculture tips</small>
          <input
            className='y w-full shadow-lg outline-none rounded-md border py-3 px-4 border-[#E3E5EB] bg-[#E3E5EB] text-[#90BFA8]'
            type="text"
            placeholder='phone number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <small className='block my-5 text-red-400'>{showMessage && <p>{message}</p>}</small>
          <button
            className='bg-primary mt-10 rounded-md text-white py-3 px-5'
            onClick={handleSubscribe}
          >
           {subscribe?"Subscribing..": success?" Subscribed Successfully":" Subscribe to Tips"}
          </button>
        </div>
      </div>
      <img className='md:w-[40%]' src={frame} alt="" />
    </section>
  );
};

export default Hero;
