import { BASE_URL } from "./serverurl";
import { commonAPI } from "./commonAPI";
//Register User
export const registerAPI=async(reqbody,reqheader)=>
{
  return await commonAPI('POST',`${BASE_URL}/user/register`,reqbody,reqheader)

}
//login User
export const loginAPI=async(reqbody)=>
{
  return await commonAPI('POST',`${BASE_URL}/user/login`,reqbody,"")

}
//add listing
export const addAPI=async(reqbody,reqheader)=>
{
  return await commonAPI('POST',`${BASE_URL}/add/listing`,reqbody,reqheader)

}
//view all properties
export const viewAllAPI=async()=>
{
  return await commonAPI('GET',`${BASE_URL}/view/properties`)

}
//view selected category
export const viewOneAPI=async(selectedCategory)=>
{
  return await commonAPI('GET',`${BASE_URL}/view/properties?category=${selectedCategory}`)

}
//view property details 
export const propertyAPI=async(listingId)=>
{
  return await commonAPI('GET',`${BASE_URL}/properties/${listingId}`)
}

//book property  
export const bookingAPI=async(reqbody)=>
{
  return await commonAPI('POST',`${BASE_URL}/booking`,reqbody)

}

//view triplist details 
export const tripAPI=async(customerId)=>
{
  return await commonAPI('GET',`${BASE_URL}/${customerId}/Triplist`)
}
//manage wishlist
export const wishlistAPI=async(userId,listingId)=>
{
  return await commonAPI('PATCH',`${BASE_URL}/${userId}/${listingId}`)
}


//view all properties 
export const propertiesAPI=async(userId)=>
{
  return await commonAPI('GET',`${BASE_URL}/${userId}/properties`)
}
//view all reservation
export const reservationAPI=async(userId)=>
{
  return await commonAPI('GET',`${BASE_URL}/${userId}/reservations`)
}

//search
export const searchAPI=async(searchId)=>
{
  return await commonAPI('GET',`${BASE_URL}/properties/search/${searchId}`)
}

//make payment  
export const paymentAPI=async(reqbody)=>
{
  return await commonAPI('POST',`${BASE_URL}/payment`,reqbody)

}
