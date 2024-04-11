import React from 'react'
import  StripeCheckout from 'react-stripe-checkout'
import { paymentAPI } from '../Services/allAPI'

function Pay({totalPrice,listingId,title}) {
    const makePayment=async(token)=>{
     const reqbody={
        token,
        listingId,
        totalPrice,
        title
     }
     const result=await paymentAPI(reqbody)
     
     if(result.status===200)
     {
        console.log(result);
     }
    }
  return (
   <div>
    <StripeCheckout name="Advance Payment" 
    amount={totalPrice*100}
    currency='INR'
    token={makePayment}
    stripeKey="pk_test_51P3DOpSHryFcL7Pw653UOyZcTZs4bELA7ahF0kCuGgrFZi2q4ASnTYBo8f49vfFxHEDadw1ZU5Ix7DyifXYCVfgD00MHRV7gqm" >
 <button style={{
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
    </StripeCheckout>
   </div>
  )
}

export default Pay