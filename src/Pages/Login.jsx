import React, { useContext, useState } from 'react'
import '../styles/Login.scss'
import { loginAPI } from '../Services/allAPI'
import { useNavigate } from 'react-router-dom'
import { setLogin } from '../redux/state'
import {useDispatch} from 'react-redux'
import { tokenAuthorizationContext } from '../context/TokenAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const{isAuthorized,setIsAuthorized}=useContext(tokenAuthorizationContext)
  const[email,setEmail]=useState("")
  const navigate=useNavigate()
  const[password,setPassword]=useState("")
 const dispatch=useDispatch()
 const handleLogin=async(e)=>{
 
    e.preventDefault()
    
   
if(!email ||!password)
{
  alert('Please enter email and password')
}
else{
const reqbody={email,password}
const result= await loginAPI(reqbody)
console.log(result);
if(result.status==202)
{
  setIsAuthorized(true)
console.log('navigate to home');
//sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
//sessionStorage.setItem("token",result.data.token)

dispatch(setLogin({
  user:result.data.existingUser,
  token:result.data.token
}))
  navigate('/')
  setEmail("")
  setPassword("")
}
else{
  toast.error(`${result.response.data}`)
}
}
  }
  return (
   <div className="login">
    <div className="login_content">
      <form className="login_content_form">
     <input type="email" placeholder='Email' required  onChange={(e)=>setEmail(e.target.value)}/>
     <input type="password" placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} />
      <button type="button" onClick={handleLogin}>Login</button>
      </form>
      <a href="/Register">New User? Sign Up</a>
    </div>
    <ToastContainer />
   </div>
  )
}

export default Login