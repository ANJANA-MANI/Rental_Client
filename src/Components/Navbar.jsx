import React, { useContext, useState } from 'react';
import logo from '../assets/rent.png';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Person, Search, Menu } from '@mui/icons-material';
import '../styles/Navbar.scss';
import '../styles/variables.scss';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../Services/serverurl';
import { setLogout } from '../redux/state';
import { tokenAuthorizationContext } from '../context/TokenAuth';

function Navbar({ hide }) {
  const { isAuthorized, setIsAuthorized } = useContext(tokenAuthorizationContext);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar w-100">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={`${logo}`} alt="logo" />
        </Link>

        {user && (
          <div className="navbar_search">
            <input
              type="text"
              placeholder="Search.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              disabled={search === ""}
              onClick={() => {
                navigate(`/properties/search/${search}`);
              }}
            >
              <Search />
            </IconButton>
          </div>
        )}

        <div className="navbar_right">
          {user ? (
             <Link to="/Createlisting" style={{textDecoration:"none",color:"darkblue",fontWeight:"bolder"}}> Become A Host</Link>
          ) : (
            <Link to="/Login" style={{textDecoration:"none",color:"darkblue",fontWeight:"bolder",

            }}> Become A Host</Link>
          )}

          <IconButton
            className="navbar_right_account"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          >
            <Menu sx={{ color: 'darkgrey' }} />
            {user ? (
              <img
                src={`${BASE_URL}/uploads/${user.profileImage}`}
                alt=""
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            ) : (
              <Person sx={{ color: 'darkgrey' }} />
            )}
          </IconButton>

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
              <Link to="/Createlisting">Become A Host</Link>
              <Link
                to="/"
                onClick={() => {
                  console.log('logging out...');
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
      <br />
    </>
  );
}

export default Navbar;
