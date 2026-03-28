import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {


  const[emailId, setEmailid]=useState('');
  const[firstName, setFirstName]=useState('');
  const[lastName, setLastName]=useState('');
  const[password, setPassword]=useState('');
  const[error, setError]= useState('')
  const[isLoginForm,setIsLoginForm] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleLogin= async ()=>{

    try {
     const res = await axios.post( BASE_URL + '/login', {emailId, password},
     {withCredentials:true},
     
     
     )
    dispatch(addUser(res.data))
    return navigate('/')
      
    } catch (error) {
      setError(error?.response?.data)
    }
  }

  const handleSignUp = async()=>{

    try {
      const res = await axios.post(BASE_URL + '/signup', {emailId, password, firstName, lastName},
        {withCredentials:true}, 
      )
      dispatch(addUser(res.data.data))
      return navigate('/profile')
    } catch (error) {
      setError(error?.response?.data)
    }
  }

  return (
    <div className=' flex justify-center my-10'>
      <div className="card bg-gray-600 w-96 shadow-sm">
  <div className=" card-body">
    <h2 className="text-blue-9 00 card-title justify-center ">{isLoginForm ? 'Login' : 'Sign Up'}</h2>

    {!(isLoginForm)
    &&
    <> 
    <div>
      <span className='text-white'>First Name</span>
  <label className="input">
    
  <input 
   type="text" 
   value={firstName} 
   onChange={(e)=>setFirstName(e.target.value)}
  className="grow" 
  placeholder="First Name" />
  
</label>



</div>


<div>
      <span className='text-white'>Last Name</span>
  <label className="input">
    
  <input 
   type="text" 
   value={lastName} 
   onChange={(e)=>setLastName(e.target.value)}
  className="grow" 
  placeholder="Last Name" />
  
</label>



</div>
</>
}

    <div>
      <span className='text-white'>Email Id</span>
  <label className="input">
    
  <input 
   type="text" 
   value={emailId} 
   onChange={(e)=>setEmailid(e.target.value)}
  className="grow" 
  placeholder="abc@xyz.com" />
  
</label>



</div>

  <div>
      <span className='text-white'>Password</span>
  <label className="input">
    
  
  <input
   type="text"
   value={password} 
   onChange={(e)=>setPassword(e.target.value)}
   className="grow"
   placeholder="" />
  
</label>



</div>
<p className='text-red-500'>{error}</p>
    
    <div className="card-actions justify-center">
      <button 
      onClick={isLoginForm ? handleLogin : handleSignUp}
      className="btn btn-primary">{isLoginForm ? 'Login' : 'Sign Up'}</button>
    </div>

    <div className='justify-center m-auto py-2'>
  {isLoginForm ? (
    <p onClick={() => setIsLoginForm(false)} className='justify-center text-white hover:underline cursor-pointer'>
      New User ? Create Account
    </p>
  ) : (
    <p onClick={() => setIsLoginForm(true)} className='text-white hover:underline cursor-pointer'>
      Already have an account? Login
    </p>
    
  )}
  </div>
  </div>
  
  
</div>


    </div>
  )
}

export default Login
