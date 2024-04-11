import React, { useEffect, useState } from 'react';
import { categories } from '../data';
import "../styles/Listings.scss";
import Listingcards from './Listingcards';
import Loader from './Loader';
import { useDispatch, useSelector } from 'react-redux';
import { viewAllAPI, viewOneAPI } from '../Services/allAPI';
import { setListings } from '../redux/state';


function Listings() {
 const dispatch=useDispatch();
 const listings=useSelector((state)=>state.listings)
 const[loading,setLoading]=useState(true)
 const[selectedCategory,setSelectedCategory]=useState("All")
 
 const getListings=async(e)=>{
  //e.preventDefault();
  console.log('loading......'); 
  const result=selectedCategory!=='All'?await viewOneAPI(selectedCategory):await viewAllAPI();
  //console.log(result);
  if(result.status==200)
  {
    if(result.data.length>0)
    {
     dispatch(setListings({listings:result.data}))
     setLoading(false)
    }
  }
  console.log('state Listings',listings);
}
 useEffect(()=>{
  getListings()
 },[selectedCategory])
  return (
    <>
    <div className="category-list">
      {categories?.map((category, index) => 
      (
        <div className="category" key={index} onClick={()=>{setSelectedCategory(category.label)}}>
          <div className="category_icon">
            {category.icon}
          </div>
          <p>{category.label}</p>
        </div>
      )
      )}
     
    </div>
 {loading?<Loader/>: <div className="listings">
          {listings.map(
            ({
              _id,
              owner,
              listingPhotos,
              city,
              province,
              country,
              category,
              type,
              price,
              title,
              booking=false
            }) => (
              <Listingcards
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
                title={title}
              />
            )
          )}
        </div>
      }
 
 

    </>
  );
}

export default Listings;
