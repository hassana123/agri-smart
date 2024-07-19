import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
const HomeLayout = ({children}) => {
  return (
    <div className='font-poppins'>
        <Navigation/>
        <main >
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default HomeLayout
