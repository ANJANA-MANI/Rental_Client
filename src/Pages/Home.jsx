import React from 'react'

import Categories from '../Components/Categories'

import Footer from '../Components/Footer'
import Slide from '../Components/Slide'
import Navbar from '../Components/Navbar'
import Listings from '../Components/Listings'

function Home() {
  return (
   <>
   <Navbar/>
   <Slide/>
   <Categories/>
    <Listings/>
   <Footer/>
   </>
  )
}

export default Home