import React from 'react'
import { Link } from 'react-router-dom';
function PaymentFail() {
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
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img src="/assets/failure.gif" alt="Failure" style={{ width: '150px', height: '150px', marginBottom: '20px' }} />
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Payment Failed!</h1>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>We're sorry, but there was an issue processing your payment.</p>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>Please try again later or contact customer support for assistance.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/" style={buttonStyle}>Go Back Home</Link>
            </div>
        </div>
    );

  
}

export default PaymentFail