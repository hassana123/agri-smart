import React from 'react';
import HomeLayout from '../components/HomeLayout';

const AboutPage = () => {
  return (
    <HomeLayout>
      <section className='text-[#111111] mx-auto space-y-8 text-[16px] w-[90%] bg-[#F8F8F8] px-5 py-10 md:px-20 my-20 rounded-lg shadow-lg'>
        <h1 className='text-[22px] md:text-[32px] text-primary font-bold'>About AgriSmart</h1>
        <p>AgriSmart is dedicated to empowering farmers by providing advanced crop health diagnostics and actionable insights. Our mission is to enhance agricultural productivity and sustainability through innovative technology solutions.</p>
        <h2 className='text-[20px] md:text-[28px] font-semibold'>Our Mission</h2>
        <p>We aim to support farmers in maintaining healthy crops and maximizing yield by leveraging cutting-edge diagnostic tools and expert recommendations. AgriSmart is committed to fostering a smarter and more resilient agricultural ecosystem.</p>
        <h2 className='text-[20px] md:text-[28px] font-semibold'>Features</h2>
        <ul className='list-disc list-inside space-y-2'>
          <li>Upload and diagnose crop health through advanced image analysis.</li>
          <li>Receive detailed reports on crop health status and recommended remedies.</li>
          <li>Subscribe to daily agricultural tips to stay informed and proactive.</li>
          <li>Access a wealth of resources and tips on managing crop health effectively.</li>
        </ul>
      </section>
    </HomeLayout>
  );
};

export default AboutPage;
