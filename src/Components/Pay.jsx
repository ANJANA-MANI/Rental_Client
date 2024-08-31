import React from 'react'
import { paymentAPI } from '../Services/allAPI'
import {loadStripe} from '@stripe/stripe-js';
import { Button } from 'react-bootstrap';
import { removetripAPI } from '../Services/allAPI';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Pay({totalPrice,listingId,title,id}) {

  const customerId = useSelector((state) => state.user._id);
  const navigate=useNavigate()
  const makePayment=async()=>{

  const product=[{id,title,totalPrice,listingId}]
  const stripe=await loadStripe("pk_test_51P3DOpSHryFcL7Pw653UOyZcTZs4bELA7ahF0kCuGgrFZi2q4ASnTYBo8f49vfFxHEDadw1ZU5Ix7DyifXYCVfgD00MHRV7gqm")
  const businessTypes="company"
  const reqbody={products:product,businessTypes}
  const result=await paymentAPI(reqbody)
  const result2=stripe.redirectToCheckout({
   sessionId:result.data.id.id
   })   
   //console.log('Result...',result2);
    }
    const remove=async()=>{
      console.log('inside remove');
      
    const result=await removetripAPI(id)
      console.log(result);
      
     
    }
  return (
    <div 
    style={{
      width: 'auto',
      height: 'auto',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center',
    }}
  >
    <Button  style={{ padding:"8px 15px",fontSize:"15px",
    color:"#F8F8F8",backgroundColor:"#40E0D0",border:"none",
    cursor: "pointer",boxShadow:"1px 1px grey", margin:"10px",
    width:"100px",borderRadius:"3px"}} onClick ={(e)=>{ e.stopPropagation();
      makePayment()}}>Pay</Button>
    
    <Button id="unique" style={{ padding:"8px 15px",fontSize:"15px",
      margin:"10px",width:"100px",color:"#F8F8F8",backgroundColor:"#87CEEB",border:"none",
      boxShadow:"1px 1px grey", margin:"10px",width:"100px",borderRadius:"3px",
      cursor: "pointer"}} onClick={(e)=>{ e.stopPropagation();
        remove()}}>Cancel</Button>
  </div>
  )
}

export default Pay