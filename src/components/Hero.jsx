import React from 'react'
import frame from "../assets/Frame2.png";
const Hero = () => {
  return (
   <section className='mt-10 w-[90%] mx-auto md:flex justify-between items-center'>
    <div className='md:w-[50%] md:my-0 my-10 space-y-3 font-[400] text-[18px] text-tetiary'>
        <p>Upload, Diagnose, and Protect Your Crops with Ease</p>
        <h1 className='text-secondary text-[22px] md:text-[48px] font-[700]'>Empower Your Farming with Smart Crop Health Diagnostics</h1>
        <p className=''>Our diagnostic tool identifies crop infections fast. Upload a photo of your crop, and get insights, health status, and recommendations. Subscribe for regular crop health tips and updates.</p>
        <div className='md:flex items-center '>
            <input className='y w-full shadow-lg rounded-md mt-10  border py-3 px-4 border-[#E3E5EB] bg-[#E3E5EB] text-[#90BFA8]' type="text"  placeholder='Enter your email address or phone number'/>
            <button className='bg-primary mt-10 rounded-md text-white py-3 px-5'>Subscribe</button>
        </div>
    </div>
    <img className='md:w-[40%]' src={frame} alt="" />
   </section>
  )
}

export default Hero
