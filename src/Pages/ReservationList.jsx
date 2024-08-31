import React, { useEffect, useState } from 'react'
import "../styles/List.scss"
import Navbar from '../Components/Navbar'
import Listingcards from '../Components/Listingcards'
import Loader from '../Components/Loader'
import { reservationAPI} from '../Services/allAPI'
import { useDispatch, useSelector } from 'react-redux'
import state, { setReservationlist} from '../redux/state'
function ReservationList() {

  const user = useSelector((state) => state.user)
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(true)
  const Reservationlist = user?.Reservationlist
  const reservationdetails = async () => {
 const user_Id=user._id;
    try {
      const result = await reservationAPI(user_Id);
      console.log('Reservation', result.data);

      if (result.status === 200) {
      
        setLoading(false)
        dispatch(setReservationlist(result.data))
        
      }
    } catch (error) {
      console.log('Fetch Reservation list failed', error.message);
    }


  }

  const handlePayment = async (paymentMethod) => {
    // Handle payment logic here, e.g., send paymentMethod to server for processing
    console.log('Payment method:', paymentMethod);
  };
  useEffect(() => {
   reservationdetails();
  }, [])
  return (loading ? (<Loader />) : (
    <>
      <Navbar />
      <div className="container">
      <h1 className="title-list">Your Resrvation List</h1>
      <div className="list">
        {
        Reservationlist?.length > 0 ? (
        Reservationlist ?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true,customerId }) => (
          <Listingcards
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
            reservation={true}
            guest={customerId}
          />
        ))
      ):(<div className="empty-state">
       
        <img src="https://cdn.dribbble.com/users/1753953/screenshots/3818675/animasi-emptystate.gif"
         alt="Gift" width={"400px"} height={"350px"} />
       
      </div>)}
      </div>
      </div>
      
       
      

    </>
  )
  )
}

export default ReservationList