import React, { useEffect, useState } from 'react'
import "../styles/List.scss"
import Navbar from '../Components/Navbar'
import Listingcards from '../Components/Listingcards'
import Loader from '../Components/Loader'
import { tripAPI } from '../Services/allAPI'
import { useDispatch, useSelector } from 'react-redux'
import state, { setTriplist } from '../redux/state'



function Triplist() {
  const customerId = useSelector((state) => state.user._id)
  //console.log('Customer', customerId);
  const [loading, setLoading] = useState(true)
  const TripList = useSelector((state) => state.user.Triplist)
  const dispatch = useDispatch()
  const tripdetails = async () => {

    try {
      const result = await tripAPI(customerId);
     // console.log('Trip', result.data);

      if (result.status === 200) {
      
        setLoading(false)
        dispatch(setTriplist(result.data))
       
       
      }
    } catch (error) {
      console.log('Fetch Trip list failed', error.message);
    }


  }

  const handlePayment = async (paymentMethod) => {
    // Handle payment logic here, e.g., send paymentMethod to server for processing
    console.log('Payment method:', paymentMethod);
  };
  useEffect(() => {
    tripdetails();
  }, [])
  return (loading ? (<Loader />) : (
    <>
      <Navbar />
      
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {TripList?.map(({ listingId, hostId, startDate, endDate, totalPrice,booking=true,title}) => (
          <>
          <Listingcards key={listingId} pay={true}
            listingId={listingId._id}
            creator={hostId._id}
            listingPhotos={listingId.listingPhotos}
            city={listingId.city}
            province={listingId.province}
            country={listingId.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
            title={listingId.title}
          />
         
          </>
        ))}
      </div>
      
      

    </>
  )
  )
}

export default Triplist