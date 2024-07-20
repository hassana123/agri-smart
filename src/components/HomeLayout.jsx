import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
const HomeLayout = ({children}) => {
  return (
    <div className='font-poppins relative flex flex-col min-h-screen'>
        <Navigation/>
        <main className='flex-grow' >
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default HomeLayout
