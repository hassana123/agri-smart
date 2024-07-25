import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='md:flex font-[600] text-[15px] w-[90%] mx-auto justify-between items-center py-8'>
      <div className='md:block flex justify-between items-center w-full md:w-auto'>
     <div>
     <h1 className='text-[20px] py-[0.8px]'>AgriSmart</h1>
     <span className='block mx-auto bg-[#01A8A1] h-[2px] rounded-[10px] w-[72px]'></span>
     </div>
        <div className='md:hidden'>
          <FaBars onClick={toggleMenu} className='text-[24px] cursor-pointer' />
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute md:static top-[70px] py-10 z-5 left-0 w-full md:w-auto md:flex space-x-0 md:space-x-10 bg-white md:bg-transparent shadow-lg md:shadow-none transition-all md:py-0 duration-500 ease-in-out`}
      >
        <NavLink   style={({ isActive }) => {
            return isActive ? { borderBottom: "1px solid #01A8A1" } : {};
          }} to="/" className='block md:inline-block p-4 md:p-0'>Home</NavLink>
        <NavLink  style={({ isActive }) => {
            return isActive ? { borderBottom: "1px solid #01A8A1" } : {};
          }} to="/about" className='block md:inline-block p-4 md:p-0'>About</NavLink>
        <NavLink  style={({ isActive }) => {
            return isActive ? { borderBottom: "1px solid #01A8A1" } : {};
          }} to="/upload" className='block md:inline-block p-4 md:p-0'>Upload</NavLink>
        <NavLink  style={({ isActive }) => {
            return isActive ? { borderBottom: "1px solid #01A8A1" } : {};
          }} to="/tips" className='block md:inline-block p-4 md:p-0'>Tips</NavLink>
       <NavLink  style={({ isActive }) => {
            return isActive ? { borderBottom: "1px solid #01A8A1" } : {};
          }}
          to="/login"
          className="md:hidden hover:bg-[#01A8A1] my-5 inline-block transition ease-in-out hover:translate-y-1 hover:scale-110 duration-400 hover:text-white border border-[#01A8A1] rounded-md py-3 px-10 relative overflow-hidden"
        >

          <span className="relative ">login / Register</span>
        </NavLink>
      </div>
      <div className='mt-4 md:mt-0 hidden md:block'>
        <NavLink  style={({ isActive }) => {
            return isActive ? { borderBottom: "1px solid #01A8A1" } : {};
          }}
          to="#subscribe"
          className="hover:bg-[#01A8A1] transition ease-in-out hover:translate-y-1 hover:scale-110 duration-400 hover:text-white border border-[#01A8A1] rounded-md py-3 px-10 relative overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-[#01A8A1] transform scale-x-0 origin-left transition-transform duration-500 ease-out"></span>
          <span className="relative z-10">Subscribe</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
