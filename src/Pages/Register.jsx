import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Row, Col } from 'react-bootstrap';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';
import regbackground from "../assets/regbackground.jpeg";
import '../styles/Register.css'
import '../styles/Register.scss'
import {registerAPI} from '../Services/allAPI'

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#2C3E50',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#F4D03F',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#5D6D7E',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
function Register() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
  //GET DATA FROM FORM
  const navigate=useNavigate()

  const [preview,setPreview]=useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const[formData,setFormData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmPassword:"",
    profileImage:"",
  })
  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })
  useEffect(()=>{
    
    if(formData.profileImage)
    {
      console.log('setting preview');
      setPreview(URL.createObjectURL(formData.profileImage))
    
    }
  },[formData.profileImage])

 const handleChange=(e)=>{

  const{name,value,files}=e.target
  setFormData({
    ...formData,
    [name]:name==="profileImage"?files[0]:value
  })
 
 }

//Regtister user

const handleRegister=async(e)=>{
e.preventDefault()
console.log('registering.....');
  const{firstname,lastname,email,password,profileImage}=formData
  if(!firstname ||!lastname ||!password||!email){
    alert("Please fill the missing fields")
  }
  else
  {

    const reqbody=new FormData()
    reqbody.append('firstname',firstname)
    reqbody.append('lastname',lastname)
    reqbody.append('email',email)
    reqbody.append('password',password)
    reqbody.append('profileImage',profileImage)
    console.log( 'ReqBody',reqbody);
     const reqheader={
      "Content-Type":"multipart/form-data"
    }

    //api call
    const result=await registerAPI(reqbody,reqheader)
   
    console.log('RESULT',result);
    if(result.status===200)
    {
      alert(`${result.data.firstname} has registered sucessfully`)
      //console.log(`${result.data.token}`);
      setFormData({firstname:"",
      lastname:"",
      email:"",
      password:"",
      confirmPassword:"",
      profileImage:""

      })
      navigate('/Login')
    }
    else 
    {
      alert(`${result.response.data}`)
    }

    
  
}
}


  return (

    <>
    
    <div className='register' style={{backgroundImage:`url(${regbackground})`,backgroundRepeat:"repeat",backgroundSize:"cover",width:"100vw",height:"100vh",display:'flex'}}>
    <Box className='register-content ' sx={{ 
  display: 'flex', 
  flexWrap: 'wrap', 
  justifyContent: 'space-around', // Distributes space evenly along the main axis (horizontally)
  alignItems: 'center', // Aligns items at the center along the cross axis (vertically)
  backgroundImage:'url(https://img.freepik.com/free-vector/house-searching-concept-illustration_114360-4478.jpg)',
  backgroundPosition:"center",
  backgroundRepeat:"no-repeat",opacity:"0.9",paddingTop:"10px",
}}>
      <div >
        
            <TextField
          label="First Name"
          id="outlined-start-adornment"
          name="firstname"
          onChange={handleChange}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
           
          
            <TextField
          label="Last Name"
          id="outlined-start-adornment"
          name="lastname"
          onChange={handleChange}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
           <br />
           <FormControl  sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount" type="email"  required>Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Email"
            type='email'
            name="email"
            required
          onChange={handleChange}
          />
        </FormControl>
       
         
        <br />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
          onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Retype Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {!passwordMatch && (
            <p style={{ color: "blue" }}>Passwords are not matching!</p>
          )}
        <br />
 
        <FormControl fullWidth sx={{ m: 1,width:"250px"  }}>
        <Button style={{backgroundColor:"#2C3E50"}}
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload Profile Photo
  <VisuallyHiddenInput type="file"   name="profileImage"
          onChange={handleChange} />
</Button>
{
  formData.profileImage && (<img style={{borderRadius:"50%",width:"100px",height:"100px",margin:"10px",objectFit:"contain"}} alt="pic" src={URL.createObjectURL(formData.profileImage)}></img>)
}
</FormControl>
<FormControl sx={{ m: 1,display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         
<BootstrapButton variant="contained" disableRipple onClick={handleRegister}  disabled={!passwordMatch}> 
        Register
</BootstrapButton>
<Link style={{ textDecoration: 'none',color:"#2C3E50" }} to="/login">Already have an account login here</Link>

        </FormControl>


      </div>
    
    </Box>
    </div>
    </>
   
  )
}

export default Register