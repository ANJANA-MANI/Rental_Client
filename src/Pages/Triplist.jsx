import React, { useEffect, useState } from 'react';
import "../styles/List.scss";
import Navbar from '../Components/Navbar';
import Listingcards from '../Components/Listingcards';
import Loader from '../Components/Loader';
import { tripAPI } from '../Services/allAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setTriplist } from '../redux/state';

function Triplist() {
  const customerId = useSelector((state) => state.user._id);
  const [loading, setLoading] = useState(true);
  const TripList = useSelector((state) => state.user.Triplist);
  const dispatch = useDispatch();
  
  const tripdetails = async () => {
    try {
      const result = await tripAPI(customerId);
      console.log('Trip', result.data);

      if (result.status === 200) {
        dispatch(setTriplist(result.data));
      }
    } catch (error) {
     // console.log('Fetch Trip list failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    tripdetails();
  }, [TripList]);

  return (
    loading ? (
      <Loader />
    ) : (
      <>
        <Navbar />
        <div className='container'>
          <h1 className="title-list">Your Trip List</h1>
          <div className="list">
            {TripList?.length > 0 ? (
              
              TripList.map(({ _id, listingId, hostId, startDate, endDate, 
                totalPrice, booking = true,wishl=false ,title, payment,checkout }) => (
                <Listingcards
                  id={_id}
                  key={_id}
                  pay={true}
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
                  payment={payment}
                  wishl={wishl}
                  checkout={checkout}
                />
              ))
            ) : (
              <div><img src="https://i.pinimg.com/originals/09/df/30/09df30f765d088be030da204f2e7ec32.gif"
               alt="" width={"500px"} height={"350px"} /></div>
            )}
          </div>
        </div>
      </>
    )
  );
}

export default Triplist;
