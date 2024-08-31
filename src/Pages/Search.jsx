import React, { useState } from 'react'
import { searchAPI } from '../Services/allAPI';
import Loader from '../Components/Loader';
import { setListings } from '../redux/state';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Listingcards from '../Components/Listingcards';

function Search() {
    const[loading,setLoading]=useState(true);
    const{search}=useParams();
    const listings=useSelector((state)=>state.listings)
    const dispatch=useDispatch()
    const getSearchListings=async()=>{
    try {
        const result=await searchAPI(search)
        if(result.status===200)
        {
        const d=dispatch(setListings({listings:result.data}));
         console.log('listing Dispatched',listings,d);
         setLoading(false);

        }
    } catch (error) {
        console.log(error);
    }
   }
  useEffect(()=>{
  getSearchListings();
  },
[search])
  
    return (loading?<Loader/>:
    <>
    <Navbar/>

    <div className="title-list" style={{marginTop:"120px"}}>
        <h1>
            Your Search..
        </h1>
        {listings?.length>0?(<div className="list">
          
          {listings.map(({_id,owner,listingPhotos,city,province,country,category,type,price,booking=false,search=true})=>(<Listingcards 
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
           search={search}
          />))}
               
           </div>):(<>
           <h2>not found</h2>
           <img src="/assets/search.gif" alt="pic" srcset=""height={"450px"} width={"600px"}/></>)}
        
    </div>
    </>
  )
}

export default Search