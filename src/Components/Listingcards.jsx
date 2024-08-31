import React, { useState } from 'react'
import '../styles/listingcard.scss'
import { ArrowBackIos, ArrowBackIosNew, ArrowForwardIos, Favorite } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { BASE_URL } from '../Services/serverurl'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutAPI, checkoutstatusAPI, wishlistAPI } from '../Services/allAPI'
import { setWishlist } from '../redux/state'
import Pay from'../Components/Pay'
import { green } from '@mui/material/colors'
import { Button, Col } from 'react-bootstrap'
import { borderRadius, height } from '@mui/system'

function Listingcards({
    id,
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
    title,
    payment,
    reservation,
    guest,
    prop,
    home,
    wishl,
    checkout
  }) {
    //console.log('payId',id);
    //Slider for Images
    console.log(checkout);
    
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

const CheckOut=async()=>
{
const result=await checkoutAPI(listingId)
const result2=await checkoutstatusAPI(id)
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
        <h3>{city},{province},{country}</h3>
    <p className='plistcard'>{category}</p>
    { ! booking ?(
        <>
     <p className='plistcard'>{type}</p>
    <p className='plistcard'><span>₹{price}</span>per night</p>
        </>
    ):(<>
    <p className='plistcard'> {startDate} - {endDate}</p>
    <p className='plistcard'><span>₹ {totalPrice}</span></p>
    {reservation && <> 
    <img  className="unique"src={`${BASE_URL}/uploads/${guest.profileImage}`} 
     alt="user" width={50}height={50} /><h4>Reserved By:<span></span>{guest.firstname} </h4></>}
    </>)}
    { !home && !reservation && !prop  && !wishl &&(
        !payment ?
        <>
        <Pay listingId={listingId} title={title} totalPrice={totalPrice}  id={id} />
        </>  :
        <>  
         <div style={{ margin: "10px", color: "#5F9EA0", fontSize: "15px",fontWeight:"bolder" }}>
         Paid  Sucessfully</div>

{!checkout ? (
  <Button 
    id="unique" 
    style={{
      padding: "8px 15px",
      fontSize: "15px",
      margin: "10px",
      width: "100px",
      color: "#F8F8F8",
      backgroundColor: "#5F9EA0",
      border: "none",
      boxShadow: "1px 1px grey",
      borderRadius: "3px",
      cursor: "pointer"
    }} 
    onClick={(e) => {
      e.stopPropagation();
      CheckOut();
    }}
  >
    Checkout
  </Button>
) : (
  <div style={{ margin: "10px", color: "#5F9EA0", fontSize: "15px",fontWeight:"bolder" }}>
    Checked out successfully
  </div>
)}

         </>
)
    }
    </div>
   <button className="favorite" disabled={!user} onClick={(e)=>
    {   e.stopPropagation();
        patchWishlist();
    } }>
   {!reservation && !prop && (isLiked ? <Favorite sx={{color:"red"}}/> : <Favorite sx={{color:"white"}}/>)}
   </button>
   </div>
   </>
  )
}

export default Listingcards