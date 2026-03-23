import React, { useState } from 'react'
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {

    console.log(user)

     const[firstName, setFirstName]=useState(user.firstName);
     const[lastName, setLastname]=useState(user.lastName);
     const[photoUrl, setPhotoUrl]= useState(user.photoUrl);
     const[age, setAge]= useState(user.age);
     const[gender, setGender]= useState(user.gender);
     const[about, setAbout]= useState(user.about);
     const[showUpdate, setShowUpdate] = useState(false)
    //  const[error, setError] =useState('')

     const dispatch = useDispatch()


     const saveProfile = async ()=>{

        try {
            const res = await axios.patch(BASE_URL+ '/profile/edit',
                {
                firstName ,lastName,photoUrl, age, gender, about

            },
        {withCredentials: true});

        dispatch(addUser(res?.data?.data))

        setShowUpdate(true);

        setTimeout(()=>{
            setShowUpdate(false)
        },3000)

            
        } catch (error) {
            console.Error(error)
            
        }

     }




  return (

    <div className='flex justify-center '>
    
    
    
    <div className=' flex justify-center mx-10'>
   <div className="card bg-gray-600 w-96 shadow-sm">
  <div className=" card-body">
    <h2 className="text-white card-title">Login</h2>

    <div>
      <span className='text-white'>First Name</span>
  <label className="input">
    
  <input 
   type="text" 
   value={firstName} 
   onChange={(e)=>setFirstName(e.target.value)}
  className="grow" 
  placeholder="" />
  
</label>



</div>

  <div>
<span className='text-white'>Last Name</span>
  <label className="input">
    
  
  <input
   type="text"
   value={lastName} 
   onChange={(e)=>setLastname(e.target.value)}
   className="grow"
   placeholder="" />
  
</label>

<div>
      <span className='text-white'>Age</span>
  <label className="input">
    {user.age &&
  <input 
   type="number" 
   value={age} 
   onChange={(e)=>setAge(e.target.value)}
  className="grow" 
  placeholder="" />
    }
  
</label>



</div>



<div>
<span className="text-white">Gender</span>

<select
  className="select select-bordered w-full"
  value={gender}
  onChange={(e) => setGender(e.target.value)}
>
  <option value="">Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="others">Others</option>
</select>
</div>




<div>
      <span className='text-white'>About</span>
  <label className="input">
    
  <input 
   type="text" 
   value={about} 
   onChange={(e)=>setAbout(e.target.value)}
  className="grow" 
  placeholder="" />
  
</label>



</div>

<div>
      <span className='text-white'>Photo Url</span>
  <label className="input">
    
  <input 
   type="text" 
   value={photoUrl} 
   onChange={(e)=>setPhotoUrl(e.target.value)}
  className="grow" 
  placeholder="" />
  
</label>



</div>

</div>

<div className="card-actions justify-center">
      <button 
      onClick={saveProfile}
      className="btn btn-primary my-5">Save Profile</button>
    </div>


</div>
</div>
</div>

    <UserCard user={{firstName ,lastName,photoUrl, age, gender, about }}/>

{showUpdate &&
    <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>Profile updated succesfully</span>
  </div>
  
</div>
}


</div>


    )
  
      
  
}

export default EditProfile
