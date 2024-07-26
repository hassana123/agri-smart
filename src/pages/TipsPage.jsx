import React, { useState } from 'react';
import HomeLayout from '../components/HomeLayout';
import { tips } from '../../server/tips';

const TipsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const tipsPerPage = 4; 

  
  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentTips = tips.slice(indexOfFirstTip, indexOfLastTip);

 
  const totalPages = Math.ceil(tips.length / tipsPerPage);

 
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <HomeLayout>
      <section className='text-[#111111] mx-auto space-y-8 text-[16px] w-[90%] bg-[#F8F8F8]  py-10 md:px-5 my-20 rounded-lg shadow-lg'>
        <h1 className='text-[22px] md:text-[32px] text-primary font-bold'>Agricultural Tips</h1>
        <ul className='space-y-6'>
          {currentTips.map((tip, index) => (
            <li key={index} className='bg-white p-6 rounded-lg shadow-lg border border-[#E0E0E0]'>
              <h2 className='text-[20px] font-semibold mb-2'>{tip.title}</h2>
              <p className='text-[16px] mb-4'>{tip.description}</p>
              <div className='md:flex space-y-2 items-center justify-between text-[14px] text-gray-600'>
                <span className='font-bold block'>Category: {tip.category}</span> 
                <span className='font-bold block'>Frequency: {tip.frequency}</span> 
              </div>
            </li>
          ))}
        </ul>
        <div className='flex justify-center items-center  space-x-2 mt-8'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-md border transition-colors duration-300 ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-primary border-primary'}`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(1)}
            className={`px-4 py-2 rounded-md border transition-colors duration-300 ${currentPage === 1 ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
          >
            1
          </button>
          {totalPages > 5 && currentPage > 3 && <span className='px-2'>...</span>}
          {currentPage > 2 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 rounded-md border transition-colors duration-300 ${currentPage === 1 ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
            >
              {currentPage - 1}
            </button>
          )}
          {currentPage > 1 && currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage)}
              className={`px-4 py-2 rounded-md border transition-colors duration-300 bg-primary text-white`}
            >
              {currentPage}
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 rounded-md border transition-colors duration-300 ${currentPage === totalPages ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
            >
              {currentPage + 1}
            </button>
          )}
          {totalPages > 5 && currentPage < totalPages - 2 && <span className='px-2'>...</span>}
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`px-4 py-2 rounded-md border transition-colors duration-300 ${currentPage === totalPages ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
          >
            {totalPages}
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded-md border transition-colors duration-300 ${currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-white text-primary border-primary'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </HomeLayout>
  );
};

export default TipsPage;
