import React, { useState } from 'react'
import '../styles/listingcard.scss'
import { ArrowBackIos, ArrowBackIosNew, ArrowForwardIos, Favorite } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { BASE_URL } from '../Services/serverurl'
import { useDispatch, useSelector } from 'react-redux'
import { wishlistAPI } from '../Services/allAPI'
import { setWishlist } from '../redux/state'
import Pay from'../Components/Pay'
function Listingcards({
    listingId,
    creator,
    listingPhotos,
    city,
    province,
    country,
    category,
    type,
    price,
    startDate,
    endDate,
    totalPrice,
    booking,
    pay,
    title
  }) {
   // console.log('pay',pay);
    //Slider for Images
const[currentIndex,setCurrentIndex]=useState(0)
//console.log('CurrentIndex',currentIndex);
const navigate=useNavigate()

 const goToPrevSlide=()=>{
    setCurrentIndex((prevIndex)=>
        (prevIndex - 1 + listingPhotos.length) % listingPhotos.length)
 }
 const goToNextSlide=()=>{
    setCurrentIndex(
        (prevIndex)=>
        (prevIndex + 1 )% listingPhotos.length)
 }

 //add to wishlist

const user=useSelector((state)=>state.user)
const Wishlist=user?.Wishlist||[];

const dispatch=useDispatch()
const isLiked=Wishlist.find((i)=>i._id===listingId)

//console.log('isLiked',isLiked);
//console.log('user',user);
//console.log('Wishlist',Wishlist);


const patchWishlist=async()=>{
    if(user?._id!==creator._id)
    {
        const result=await wishlistAPI(user._id,listingId)
       // console.log('result',result.data);
        if(result.status===200)
        {
            dispatch(setWishlist(result.data.wishlist))
        }
    }
   

}


 return (
   <>
  
   <div className="listing-card" key={listingId} onClick={() => {
    navigate(`/properties/${listingId}`);
      }} >
    <div className="slider-container">
        <div className="slider" >
          
            <div className="slide">
            
                <img className='slider-image' sx={{
                  
                }} src={`${BASE_URL}/uploads/${listingPhotos[currentIndex]}`} alt="photo"  />
    

           <div className="prev-button" onClick={(e) => { e.stopPropagation(); }}>
            <ArrowBackIosNew sx={{fontSize:"15px"}}  onClick={goToPrevSlide}/>
           </div>
           <div className="next-button" onClick={(e) => { e.stopPropagation(); }}>
            <ArrowForwardIos  sx={{fontSize:"15px"}} onClick={goToNextSlide}/>
           </div>
            </div>
        </div>
    </div>
    <h3>{city},{province},{country}</h3>
    <p>{category}</p>
    { ! booking ?(
        <>
     <p>{type}</p>
    <p><span>₹{price}</span>per night</p>
        </>
    ):(<>
    <p> {startDate} - {endDate}</p>
    <p><span>₹ {totalPrice}</span></p>
    <p onClick={(e)=>
    {   e.stopPropagation();
      
    }
        }>{pay && (<><Pay listingId={listingId} title={title} totalPrice={totalPrice}/></>)}</p>
    </>)}
   <button className="favorite" disabled={!user} onClick={(e)=>
    {   e.stopPropagation();
        patchWishlist();
    }
        }>
   {!pay && (isLiked ? <Favorite sx={{color:"red"}}/> : <Favorite sx={{color:"white"}}/>)}
   
   </button>
   </div>
   
  
   </>
  )
}

export default Listingcards