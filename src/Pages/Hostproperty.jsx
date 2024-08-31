import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Listings from '../Components/Listings';
import { gethostPropertyAPI } from '../Services/allAPI';

function Hostproperty() {
const {id}=useParams();

useEffect(()=>{
 getProperty(id);
},[id])
const getProperty=async(id)=>{
 const result=await gethostPropertyAPI(id);
 console.log(result);
}
 console.log('hiiiiiii',id);
  return (
  <>
  
  </>
  )
}

export default Hostproperty