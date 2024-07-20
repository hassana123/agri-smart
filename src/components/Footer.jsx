import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className=" bg-[#0C1E1D] py-10">
      <div className="w-[90%] md:space-y-0 space-y-5 mx-auto md:flex justify-between items-center">
        <div className="block font-[600] ">
          <h1 className="text-[26px] py-1 text-white">AgriSmart</h1>
          <span className="block  bg-white h-[2px] rounded-[10px] w-[72px]"></span>
        </div>
        <div className="text-[#E6E6E6] space-x-5">
          <NavLink className="text-white font-[700]">Links</NavLink>
          <NavLink>Upload</NavLink> 
          <NavLink>About</NavLink>
          <NavLink>FAQ</NavLink>
          <NavLink>Contact</NavLink>
        </div>
        <small className="block text-white"> © 2024 AgriSmart. All rights reserved. </small>
      </div>
    </footer>
  );
};

export default Footer;
