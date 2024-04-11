import { createSlice } from "@reduxjs/toolkit"
const initialState={
    user:null,
    token:null
}
export const userSlice=createSlice(
    {
        name:"user",
        initialState,
        reducers: {
            setLogin:(state,action)=>{
                state.user=action.payload.user
                state.token=action.payload.token
            },
            setLogout:(state)=>{
                state.user=null
                state.token=null
            },
            setListings:(state,action)=>{
                state.listings=action.payload.listings
            },
            setTriplist:(state,action)=>{
                state.user.Triplist=action.payload
            }
            ,
            setWishlist:(state,action)=>{
                state.user.Wishlist=action.payload
            }
            ,
            setPropertylist:(state,action)=>{
                state.user.Propertylist=action.payload
            }
            ,
            setReservationlist:(state,action)=>{
                state.user.Reservationlist=action.payload
            }
        }
    }
)
export const{setLogin,setLogout,setListings,setTriplist,setWishlist,setPropertylist,setReservationlist}=userSlice.actions
export default userSlice.reducer