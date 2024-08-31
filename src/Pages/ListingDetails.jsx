import React, { useEffect, useState } from 'react'
import '../styles/ListingDetails.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { facilities } from '../data'
import { Bathtub, Shower } from '@mui/icons-material'
import 'react-date-range/dist/styles.css'
import "react-date-range/dist/theme/default.css"
import { DateRange } from 'react-date-range'
import Navbar from '../Components/Navbar'
import { bookingAPI, propertyAPI,getbookedPropertyAPI } from '../Services/allAPI'
import { BASE_URL } from '../Services/serverurl'
import  Loader from '../Components/Loader'
import { useSelector } from 'react-redux'

function ListingDetails() {
    const[loading,setLoading]=useState(true)
    const {listingId}=useParams()
    //console.log('Listing ID',listingId);
    const navigate=useNavigate()
    const [listing,setListing]=useState(null)
    const getListingDetails=async()=>{
     try {
        const result=await propertyAPI(listingId)
        if(result.status==202)
        {
       // console.log('details page',result.data);
          setListing(result.data);
          setLoading(false);
         //checkAvailability(result.data._id, dateRange[0].startDate, dateRange[0].endDate);
        
        }
         
     } catch (error) {
        console.log('failed',error);
     }
     

    }
   
useEffect(()=>{
getListingDetails()
},[])



/*Booking*/

const[dateRange,setDateRange]=useState([
    {
    startDate:new Date(),
    endDate:new Date(),
    key:"selection"
}
])

//update the selected date range when user makes a selection

const handleSelect=(ranges)=>{

    setDateRange([ranges.selection]) 
}
const start=new Date(dateRange[0].startDate)
const end=new Date(dateRange[0].endDate)
const dayCount=Math.max(Math.round((end - start) / (1000 * 60 * 60 * 24)), 1)
useEffect(() => {
   
}, [dateRange]);
const customerId=useSelector((state)=>state?.user?._id)
const handleBooking=async()=>{
 
try {
  const reqbody={
    customerId,
    listingId,
    hostId:listing.owner._id,
    startDate:dateRange[0].startDate.toDateString(),
    endDate:dateRange[0].endDate.toDateString()
    ,totalPrice:listing.price*dayCount
  }

  const result=await bookingAPI(reqbody)

if(result.status==200)
{
  navigate(`/${customerId}/TripList`)
}
} catch (error) {
  console.log('Booking Failed',error.message);
}
}
  return loading?(<Loader/>): (
    <>
  <Navbar/>


<div className="listing-details" style={{marginTop:"120px"}}>

<div className="title">
    <h1>{listing?.title}</h1>
</div>
   
 <div className="photos">
    {listing?.listingPhotos?.map((i)=>( <img src={`${BASE_URL}/uploads/${i}`} alt="listingphotos" />))}
     
</div>
    <h2> {listing?.category},{listing?.city},{listing?.province}</h2>
    <p>{listing?.guestCount} guests-{listing?.bedroomCount}bedrooms-{listing?.bedCount} beds-{listing?.bathroomCount}bathrooms</p>
   
    <hr />

    <div className="profile">
    <img src={`${BASE_URL}/uploads/${listing?.owner.profileImage}`} alt="user"  />
    <h3>Hosted by {listing?.owner?.firstname}</h3>
    </div>

    <hr />

    <h3>Description</h3>
    <p>{listing?.description}</p>
   <br></br>
    <h3>{listing?.highlight}</h3>
    <p>{listing?.highlightDesc}</p>
    <hr />

    <div className="booking">
        
            <div className="amenities">
               <h2>What this place Offers?</h2><br />
                { listing?.amenities[0].split(',').map((i,index)=>(
                    <div className="facility" key={index}>
                    
                    <div className="facility_icon">
                          {facilities.find((facility)=>facility.name===i)?.icon}
                    
                    </div>

                    <p>{i}</p>
                </div>
              
                ))}
                
                
                
            </div>
            {listing?.bookingstatus==true?( <div className="date-range-calendar">
            <h2>How Long would you like to stay?</h2>
        <DateRange ranges={dateRange} onChange={handleSelect} minDate={new Date()}/>
         
         {dayCount>1?(<h2>{listing?.price} * {dayCount} nights</h2>):
            
            (<h2>{listing?.price} * {dayCount} night</h2>)}
            <h2>Total Price:{listing?.price*dayCount}</h2>
            <p>Start Date:{dateRange[0].startDate.toDateString()}</p>
            <p>End Date:{dateRange[0].endDate.toDateString()}</p>
           
            <button className='button' onClick={handleBooking}>Booking</button>
        
            </div>):(<div style={{ 
    padding: '10px',
    width: "350px",
    height: "160px",
    border: '1px solid #ccc', 
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}}>
    <p style={{
        fontSize: '18px', // Corrected the font size
        color: 'black',
        fontSize:"25px",
        margin: 0 // Remove margin to center text vertically better
    }}>Booking closed</p>
    <button id="dbtn"
        disabled 
        style={{ 
            padding: '6px 10px', 
            backgroundColor: '#ccc', 
            border: 'none', 
            borderRadius: '3px',
            marginTop: '10px' ,
            width:"150px",
            color:"white",
            fontSize:"15px",
            cursor: 'not-allowed'
        }}
    >
        Request
    </button>
</div>
)}    
    </div>
    </div>
    </>

   

  )
}

export default ListingDetails