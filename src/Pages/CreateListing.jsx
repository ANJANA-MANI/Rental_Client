import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import '../styles/createlisting.scss'
import { categories } from '../data'
import { types } from '../data'
import { facilities } from '../data'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RemoveCircleOutline } from '@mui/icons-material'
import { AddCircleOutline } from '@mui/icons-material'
import { IoIosImages } from "react-icons/io";
import { BiTrash } from 'react-icons/bi';
import { addAPI } from '../Services/allAPI'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CreateListing() {
    const navigate=useNavigate()
  const[category,setCategory]=useState("");
  const[type,setType]=useState("") 
   //formLocation
   const[formLocation,setFormLocation]=useState({
    streetAddress:"",
    aptSuite:"",
    city:"",
    province:"",
    country:""
   })
   const handleChangeLocation=(e)=>{
    const{name,value}=e.target
    setFormLocation({
        ...formLocation,[name]:value
    })
    
   }
   //counts
const[guestCount,setGuestCount]=useState(1)
const[bedroomCount,setBedroomCount]=useState(1)
const[bedCount,setBedCount]=useState(1)
const[bathroomCount,setBathroomCount]=useState(1)
   

//amenites
const[amenities,setAmenities]=useState([{}])
const handleSelectAmenities=(facility)=>{
   
    if(amenities.includes(facility))
    {
        setAmenities((prevAmenties)=>prevAmenties.filter((option)=> option !==facility))
    }
    else
    {
    setAmenities((prev)=>[...prev,facility])
    }
}



    //upload,remove photos

    const [photos, setPhotos] = useState([])
    // Log the photos state whenever it changes
   

    const handleUploadPhotos = (e) => {

        console.log('started uploading...');
        const newPhotos = Array.from(e.target.files)
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

    }
    

    const handleRemovePhoto = (indexToRemove) => {
        
        setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove))
    }

    //Description
    const[formDescription,setFormDescription]=useState({
        title:"",
        description:"",
        highlight:"",
        highlightdesc:"",
        price:0
    })
    const handleChangeDescription=(e)=>{
        const{name,value}=e.target
        setFormDescription({...formDescription,[name]:value})
 
    }

    //list property
const creatorId = useSelector((state) => state.user._id);
const token= useSelector((state) => state.token);

const handleSubmit=async(e)=>{
    e.preventDefault();
    if(token)
    {
    const reqbody=new FormData()
    reqbody.append("creator", creatorId);
    reqbody.append("category", category);
    reqbody.append("type", type);
    reqbody.append("streetAddress", formLocation.streetAddress);
    reqbody.append("aptSuite", formLocation.aptSuite);
    reqbody.append("city", formLocation.city);
    reqbody.append("province", formLocation.province);
    reqbody.append("country", formLocation.country);
    reqbody.append("guestCount", guestCount);
    reqbody.append("bedroomCount", bedroomCount);
    reqbody.append("bedCount", bedCount);
    reqbody.append("bathroomCount", bathroomCount);
    reqbody.append("amenities", amenities);
    reqbody.append("title", formDescription.title);
    reqbody.append("description", formDescription.description);
    reqbody.append("highlight", formDescription.highlight);
    reqbody.append("highlightDesc", formDescription.highlightdesc);
    reqbody.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        reqbody.append("listingPhotos", photo);
      });
const reqheader={
    "Content-Type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
  }
  console.log('PHOTOS',photos);
const result=await addAPI(reqbody,reqheader)
if(result.status==200)
{
    alert('added property');
    navigate('/')
}
else{
    alert(`${result.response.data}`)
}
    }
    else{
alert('please login to continue')
    }
    
    }
    return (
        <>
<Navbar hide={true}/>

            <div className="create-listing">
                <h1>Rent out your place </h1>
                <form>
                    <div className="create-listing_step1">

                        <h2>Step1:How's your place look like</h2>
                        <hr />
                        <h3>Select a category from the following </h3>
                        <div className="category-list">

                            {categories?.map((i, index) => (

                                <div className={`category ${category === i.label ? "selected" : ""
                                  }`} 
                                  key={index} onClick={()=>{setCategory(i.label)}}>
                                    <div className="category_icon">
                                        {i.icon}
                                    </div>
                                    <p>{i.label}</p>
                                </div>
                            ))

                            }
                        </div>
                        <h3>Type of place you offer?</h3>
                        <div className="type-list">
                            {types?.map((i, index) => (

                                <div className={`type ${type===i.name ?"selected":""}`} key={index} onClick={()=>{setType(i.name)}}>
                                    <div className="type_text">

                                        <h4>{i.name}</h4>
                                        <p>{i.description}</p>
                                    </div>
                                    <div className="type_icon">{i.icon}</div>
                                </div>
                            ))}
                        </div>
                        <h3>Tell us your location</h3>
                        <div className="full">
                            <div className="location">
                                <p>Street Address</p>
                                <input type="text"
                                    placeholder='Street Address'
                                    name='streetAddress' required 
                                    value={formLocation.streetAddress}
                                    onChange={handleChangeLocation}
                                    />

                            </div>
                        </div>
                        <div className="half">
                            <div className="location">
                                <p>Apartment,Suite,etc</p>
                                <input type="text"
                                    placeholder='Apt,suite,etc..'
                                    name='aptSuite' required 
                                    value={formLocation.aptSuite}
                                    onChange={handleChangeLocation}
                                    />

                            </div>
                            <div className="location">
                                <p>City</p>
                                <input type="text"
                                    placeholder='city'
                                    name='city' required
                                    value={formLocation.city||""}
                                    onChange={handleChangeLocation}
                                    />

                            </div>
                        </div>
                        <div className="half">
                            <div className="location">
                                <p>Province</p>
                                <input type="text"
                                    placeholder='Province'
                                    name='province' required
                                    value={formLocation.province}
                                    onChange={handleChangeLocation} />

                            </div>
                            <div className="location">
                                <p>Country</p>
                                <input type="text"
                                    placeholder='country'
                                    name='country' required 
                                    value={formLocation.country}
                                    onChange={handleChangeLocation}
                                    />

                            </div>
                        </div>
                        <h3>Share a basic idea about yor place</h3>
                        <div className="basics">
                            <div className="basic">
                                <p>Guests</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline 
                                    onClick={()=>{ guestCount >1 && setGuestCount(guestCount-1)}}
                                    sx={{
                                        fontSize: "25px", cursor: "pointer", "&:hover":
                                            { color: "red" }
                                    }} />
                                    <p>{guestCount}</p>
                                    <AddCircleOutline
                                     onClick={()=>{ setGuestCount(guestCount+1)}} 
                                    sx={{
                                        fontSize: "25px", cursor: "pointer", "&:hover":
                                            { color: "green" }
                                    }} />
                                </div>

                            </div>


                            <div className="basic">
                                <p>Bedrooms</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline 
                                     onClick={()=>{ bedroomCount >1 && setBedroomCount(bedroomCount-1)}}
                                    sx={{
                                        fontSize: "25px", cursor: "pointer", "&:hover":
                                            { color: "red" }
                                    }} />
                                    <p>{bedroomCount}</p>
                                    <AddCircleOutline 
                                      onClick={()=>{ setBedroomCount(bedroomCount+1)}} 
                                    sx={{
                                        fontSize: "25px", cursor: "pointer", "&:hover":
                                            { color: "green" }
                                    }} />
                                </div>

                            </div>



                            <div className="basic">
                                <p>Beds</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline
                                     onClick={()=>{ bedCount >1 && setBedCount(bedCount-1)}}
                                    sx={{
                                        fontSize: "25px", cursor: "pointer", "&:hover":
                                            { color: "red" }
                                    }} />
                                    <p>{bedCount}</p>
                                    <AddCircleOutline
                                      onClick={()=>{ setBedCount(bedCount+1)}} 
                                    sx={{
                                        fontSize: "25px", cursor: "pointer", "&:hover":
                                            { color: "green" }
                                    }} />
                                </div>

                            </div>



                            <div className="basic">
                                <p>Bathrooms</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline 
                                      onClick={()=>{ bathroomCount >1 && setBathroomCount(bathroomCount-1)}}
                                    
                                      sx={{
                                        fontSize: "25px", cursor: "pointer", "&:hover":
                                            { color: "red" }
                                    }} />
                                    <p>{bathroomCount}</p>
                                    <AddCircleOutline 
                                      onClick={()=>{ setBathroomCount(bathroomCount+1)}} 
                                    sx={{
                                        fontSize: "25px", cursor: "pointer", "&:hover":
                                            { color: "green" }
                                    }} />
                                </div>

                            </div>




                        </div>
                    </div>
                    <div className="create-listing_step2">
                        <h2>Step2:Tell us more about the amenities</h2>
                        <hr />
                        <h3>What facilities does your place offer?</h3>
                        <div className="amenities">
                            {facilities?.map((i, index) => (
                                <div className={`facility ${
                                    amenities.includes(i.name) ? "selected" : ""
                                  }`} key={index} onClick={()=>handleSelectAmenities(i.name)}>
                                    <div className="facility_icon">
                                        {i.icon}

                                    </div>
                                    <p>{i.name}</p>
                                </div>
                            ))}
                        </div>


                        <h3>Add some pictures of yor place </h3>



                        <div className="photos">
    {photos.length < 1 && (
        <>
            <input
                id="image"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleUploadPhotos}
                multiple
            />
            <label htmlFor="image" className="alone">
                <div className="icon">
                    <IoIosImages />
                </div>
                <p>Upload from your device</p>
            </label>
        </>
    )}

    {photos.length >= 1 && (
        <>
            {photos.map((photo, index) => {
                console.log(photo,index);
                return (
                    <div className="photo" key={index}>
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="place"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                        >
                            <BiTrash />
                        </button>
                    </div>
                );
            })}
            <input
                id="image"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleUploadPhotos}
                multiple
            />
            <label htmlFor="image" className="together">
                <div className="icon">
                    <IoIosImages />
                </div>
                <p>Upload more from your device</p>
            </label>
        </>
    )}
</div>
<h3>What make you place attractive and exciting?</h3>
<div className="description">
    <p>Title</p>
    <input type="text"  placeholder="Title" name="title" value={formDescription.title||""} required onChange={handleChangeDescription}/>
    <p>Description</p>
    <textarea type="text"  placeholder="Description" name="description" value={formDescription.description||""}required onChange={handleChangeDescription}/>
    <p>Highlight</p>
    <input type="text"  placeholder="Highlight" name="highlight" value={formDescription.highlight||""} required onChange={handleChangeDescription}/>

<p>Heighlight Details</p>
    <textarea type="text"  placeholder="Details" name="highlightdesc"value={formDescription.highlightdesc||""} required onChange={handleChangeDescription}/>
<p>Now,set your Price</p>
<span>₹</span>
<input type="number" placeholder='price' name="price" value={formDescription.price||""} required onChange={handleChangeDescription}
/>
</div>

                    </div>
                    <button className="submit_btn"  onClick={handleSubmit}>
            List Your Place
          </button>
                </form>
            </div>

        </>
    )
}

export default CreateListing 