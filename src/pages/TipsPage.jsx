import React, { useState } from 'react';
import HomeLayout from '../components/HomeLayout';
import{ tips} from  "../server/tips";

const TipsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const tipsPerPage = 5; // Number of tips per page

  // Calculate index range for the current page
  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentTips = tips.slice(indexOfFirstTip, indexOfLastTip);

  // Calculate total pages
  const totalPages = Math.ceil(tips.length / tipsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <HomeLayout>
      <section className='text-[#111111] mx-auto space-y-8 text-[16px] w-[90%] bg-[#F8F8F8] px-5 py-10 md:px-20 my-20 rounded-lg shadow-lg'>
        <h1 className='text-[22px] md:text-[32px] text-primary font-bold'>Agricultural Tips</h1>
        <ul className='space-y-6'>
          {currentTips.map((tip, index) => (
            <li key={index} className='bg-white p-6 rounded-lg shadow-lg border border-[#E0E0E0]'>
              <h2 className='text-[20px] font-semibold mb-2'>{tip.title}</h2>
              <p className='text-[16px] mb-4'>{tip.description}</p>
              <div className='md:flex space-y-2 items-center justify-between text-[14px] text-gray-600'>
                <span className='font-bold block'>Category: {tip.category}</span> 
                <span className='font-bold block'>Frequency:{tip.frequency} </span> 
              </div>
            </li>
          ))}
        </ul>
        <div className='md:flex space-y-3 justify-center space-x-3 mt-8'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md border transition-colors duration-300 ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </HomeLayout>
  );
};

export default TipsPage;
