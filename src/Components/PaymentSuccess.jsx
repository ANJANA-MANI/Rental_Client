import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { paidAPI } from '../Services/allAPI';
import { useSelector } from 'react-redux';

function PaymentSuccess() {
  const userId = useSelector((state) => state.user._id);
    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        textDecoration: 'none',
        boxShadow: '0 2px 4px rgba(0, 123, 255, 0.2)',
    };
    const {listingId}=useParams()
    useEffect(()=>{
      paymentStatus()
    },[])
    const paymentStatus=async()=>{
          console.log('Inside paymentStatus');
      const result=await paidAPI(listingId)

    }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <img src="/assets/success.gif" alt="Success" style={{ width: '300px', height: '200px', marginBottom: '5px' }} />
    <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Payment Successful!</h1>
    <p style={{ fontSize: '16px', marginBottom: '20px' }}>Thank you for booking. Your payment has been successfully processed.</p>
    <div style={{ marginTop: '20px' }}>
        <Link to={`/${userId}/TripList`} style={buttonStyle}>Go Back Home</Link>
    </div>
</div>
  )
}

export default PaymentSuccess