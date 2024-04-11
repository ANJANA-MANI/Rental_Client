import React from 'react'
import '../styles/Wishlist.scss'
import Listingcards from '../Components/Listingcards'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux'

function Whishlist() {

  const wishlist=useSelector((state)=>state.user.Wishlist)
  console.log(wishlist);
  return (
    <>
    <Navbar/>

    <div className="title-list">
        <h1>
            Your Wish List
        </h1>
        {wishlist.length>0?(<div className="list">
          
          {wishlist.map(({_id,owner,listingPhotos,city,province,country,category,type,price,booking=false})=>(<Listingcards 
           listingId={_id}
           creator={owner}
           listingPhotos={listingPhotos}
           city={city}
           province={province}
           country={country}
           category={category}
           type={type}
           price={price}
           booking={booking}
          
          />))}
               
           </div>):(<>
           <h2>is empty</h2>
           <img src="/assets/empty.gif" alt="pic" srcset="" /></>)}
        
    </div>
    </>
  )
}

export default Whishlist