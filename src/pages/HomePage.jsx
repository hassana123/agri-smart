import React from 'react'
import HomeLayout from '../components/HomeLayout'
import Subscribe from '../components/Subscribe'
import Hero from '../components/Hero'
import Upload from '../components/Upload'
const HomePage = () => {
  return (
  <HomeLayout>
  <Hero/>
  <Upload/>
  <Subscribe/>
  </HomeLayout>
  )
}

export default HomePage
