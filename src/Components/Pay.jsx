import React from 'react'
import { paymentAPI } from '../Services/allAPI'
import {loadStripe} from '@stripe/stripe-js';
function Pay({totalPrice,listingId,title}) {
//console.log('totalPrice,listingId,title',totalPrice,listingId,title);
  const makePayment=async()=>{
  const stripe=await loadStripe("pk_test_51P3DOpSHryFcL7Pw653UOyZcTZs4bELA7ahF0kCuGgrFZi2q4ASnTYBo8f49vfFxHEDadw1ZU5Ix7DyifXYCVfgD00MHRV7gqm")
   const product=[{title,totalPrice,listingId}]
   const businessTypes="company"
   const reqbody={products:product,businessTypes}
   const result=await paymentAPI(reqbody)
   console.log('Data',result.data);
   const result2=stripe.redirectToCheckout({
   sessionId:result.data.id.id
   })   
   
    }
  return (
   <div>
   
 <button onClick={makePayment} style={{
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)'
}}>
    Pay
</button>
 
   </div>
  )
}

export default Pay