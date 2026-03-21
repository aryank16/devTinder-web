import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {


  const[emailId, setEmailid]=useState('elon@gmail.com');
  const[password, setPassword]=useState('Elon@123');
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleClick= async ()=>{

    try {
     const res = await axios.post( BASE_URL + '/login', {emailId, password},
     {withCredentials:true},
     
     
     )
    dispatch(addUser(res.data))
    return navigate('/')
      
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div className=' flex justify-center my-10'>
      <div className="card bg-gray-600 w-96 shadow-sm">
  <div className=" card-body">
    <h2 className="text-white card-title">Login</h2>

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
    
    <div className="card-actions justify-center">
      <button 
      onClick={handleClick}
      className="btn btn-primary">Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
