import React, { useEffect, useState } from 'react'
import '../styles/List.scss'
import Loader from '../Components/Loader'
import Navbar from '../Components/Navbar'
import Listingcards from '../Components/Listingcards'
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { setListings } from '../redux/state'
import { viewOneAPI } from '../Services/allAPI'
import { useDispatch } from 'react-redux'

function Cateogry() {
    const [loading,setLoading]=useState(true)
     const {category}=useParams()
     const listings=useSelector((state)=>state.listings)
     const dispatch=useDispatch()
  

     const getListings=async(e)=>{
        
        console.log('loading......'); 
        const result=await viewOneAPI(category);
        console.log(result.data);
        if(result.status==200)
        {
          if(result.data.length>0)
          {
           dispatch(setListings({listings:result.data}))
           console.log('Listings',result.data);
           setLoading(false)
          }
          
          
        }
        console.log('state Listings',listings);
      }
       useEffect(()=>{
        getListings()
       },[category])





    return (
    loading?<Loader/>:<>

    <Navbar/>

    <div className="title-list" style={{marginTop:"150px"}}>
        <h1>
            {category} Listings
        </h1>
        {listings.length>0?(<div className="list">
          
          {listings.map(({_id,owner,listingPhotos,city,province,country,category,type,price,booking=false})=>(<Listingcards 
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
            home={true}
          />))}
               
           </div>):(<>
           <h2>empty</h2>
           <img src="/assets/empty.gif" alt="pic" srcset="" /></>)}
        
    </div>
    </>
  )
}

export default Cateogry