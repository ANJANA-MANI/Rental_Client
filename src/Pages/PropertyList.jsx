import React, { useEffect, useState } from 'react'
import "../styles/List.scss"
import Navbar from '../Components/Navbar'
import Listingcards from '../Components/Listingcards'
import { useDispatch, useSelector } from 'react-redux'
import { setPropertylist } from '../redux/state'
import { propertiesAPI, propertyAPI } from '../Services/allAPI'
import Loader from '../Components/Loader'

function PropertyList() {
  const[loading,setLoading]=useState(true)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  console.log('user',user.Triplist);
  console.log('user',user.Propertylist);
  const Propertylist =user?.Propertylist||[];
  const getPropertyList = async () => {
    try {
      const result = await propertiesAPI(user._id)
      console.log(result);
      if(result.status===200)
      {
       console.log(result.data);
       const d= dispatch(setPropertylist(result.data))
       console.log('d',d);
       setLoading(false);
        console.log('PropertyList',Propertylist);
      }
    } catch (error) {
      console.log("Fetch all properties failed", error.message);
    }
  }
  useEffect(()=>{
    getPropertyList();
  },[])
  return ( loading?<Loader/>:
    <>
      <Navbar />

      <div className="title-list">
        <h1>
          Your Property List
        </h1>
        {Propertylist.length > 0 ? (<div className="list">

          {Propertylist.map(({ _id, owner, listingPhotos, city, province, country, category, type, price, booking = false }) => (<Listingcards
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

        </div>) : (<>
          <h2>is empty</h2>
          <img src="/assets/empty.gif" alt="pic" srcset="" /></>)}

      </div>
    </>
  )

}
export default PropertyList