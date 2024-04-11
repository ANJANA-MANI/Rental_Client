import React, { useContext, useState } from 'react'
import logo from '../assets/rent.png'
import { Link,useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import {Person, Search} from '@mui/icons-material'
import {Menu} from '@mui/icons-material'
import '../styles/Navbar.scss'
import '../styles/variables.scss'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../Services/serverurl'
import { setLogout } from '../redux/state'
import { tokenAuthorizationContext } from '../context/TokenAuth'

function Navbar({hide}) {


  const{isAuthorized,setIsAuthorized}=useContext(tokenAuthorizationContext)

  const dispatch=useDispatch()
  const [search,setSearch]=useState("");
   const[dropdownMenu,setDropdownMenu]=useState(false)
   const user=useSelector((state)=>state.user)
   //console.log('User',user);
  const navigate=useNavigate()
  return (
   <>
  
     <div className="navbar w-100">
 
        <Link to="/" style={{textDecoration:"none"}}>
            <img src={`${logo}`} alt="logo"  />
        </Link>
        {user &&
        <div className="navbar_search">
            <input type="text"  placeholder='Search..' value={search}  
             onChange={(e)=>setSearch(e.target.value)} 
             
             
             />

       <IconButton disabled={search===""}>
        <Search onClick={()=>{navigate(`/properties/search/${search}`)}}/>
       </IconButton>

        </div>
        }
        <div className="navbar_right">
        {user ? (
          <a href="/Createlisting" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            Become A Host
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color:'darkgrey' }} />
          {user? (
          
            <img
            src={`${BASE_URL}/uploads/${user.profileImage}`}
            alt=""
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
          ) : (
            <Person sx={{ color: 'darkgrey' }} />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/Login">Log In</Link>
            <Link to="/Register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/TripList`}>Trip List</Link>
            <Link to={`/${user._id}/Wishlist`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to={"/Createlisting"}>Become A Host</Link>

            <Link
              to="/Login"
              onClick={() => {
                setIsAuthorized(false);
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
   </>
  )
}

export default Navbar