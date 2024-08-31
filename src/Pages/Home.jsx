import React from 'react'
import Categories from '../Components/Categories'
import Footer from '../Components/Footer'
import Slide from '../Components/Slide'
import Navbar from '../Components/Navbar'
import Listings from '../Components/Listings'
import Banner from '../Components/Banner'
import Host from '../Components/Host'


function Home() {
  return (
   <>
   <Navbar/>
   <Banner />
   <Categories/>
   <Listings/>
   <Host/>
   <Footer/>
   </>
  )
}

export default Home