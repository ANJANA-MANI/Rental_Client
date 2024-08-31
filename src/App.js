
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import CreateListing from './Pages/CreateListing';
import ListingDetails from './Pages/ListingDetails';
import Triplist from './Pages/Triplist';
import Whishlist from './Pages/Whishlist';
import PropertyList from './Pages/PropertyList';
import ReservationList from './Pages/ReservationList';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Cateogry from './Pages/Cateogry';
import Search from './Pages/Search';
import PaymentSuccess from './Components/PaymentSuccess';
import PaymentFail from './Components/PaymentFail';
import { useSelector } from 'react-redux';
import Hostproperty from './Pages/Hostproperty';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

function App() {
 
  const isAuthorized= useSelector((state) => state.user)
  return (
 <>
 <Elements stripe={stripePromise}>
 <Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/Register" element={<Register/>}></Route>
  <Route path="/Login" element={<Login/>}></Route>

  <Route path="/Payment/Completed/:listingId" element={isAuthorized?<PaymentSuccess/>:<Home/>}></Route>
  <Route path="/Payment/Failed" element={isAuthorized?<PaymentFail/>:<Home/>}></Route>
  <Route path="/Createlisting" element={isAuthorized?<CreateListing/>:<Home/>}></Route>
  <Route path="/ListingDetails" element={isAuthorized?<ListingDetails/>:<Home/>}></Route>
  <Route path="/:userId/TripList" element={isAuthorized?<Triplist/>:<Home/>}></Route>
  <Route path="/:userId/Wishlist" element={isAuthorized?<Whishlist/>:<Home/>}></Route>
  <Route path="/:userId/properties" element={isAuthorized?<PropertyList/>:<Home/>}></Route>
  <Route path="/:userId/reservations" element={isAuthorized?<ReservationList/>:<Home/>}></Route>
  <Route path="/properties/:listingId" element={isAuthorized?<ListingDetails/>:<Home/>}></Route>
  <Route path="/properties/category/:category" element={isAuthorized?<Cateogry/>:<Home/>}></Route>
  <Route path="/properties/search/:search" element={isAuthorized?<Search/>:<Home/>}></Route>
  <Route path='/host/properties/:id' element={<Hostproperty/>}></Route>

 
 
 </Routes>
  
        </Elements>
 </>
  );
}

export default App;
