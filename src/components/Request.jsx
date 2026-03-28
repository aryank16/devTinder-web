import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'

const Request = () => {

    const requests = useSelector((store)=>store.requests);
    const dispatch = useDispatch()
    
  console.log(requests);

    const fetchRequest = async ()=>{

        try {

             const res = await axios.get(BASE_URL+ '/user/requests/received',
            {withCredentials:true}
        )

        dispatch(addRequest(res.data.data))

      

            
        } catch (error) {
            console.error(error)
        }
    } 


     useEffect(()=>{
            fetchRequest()
        },[])

 if (!requests) return <h1>Loading...</h1>;

  if (requests.length === 0)
    return <h1>No connections found</h1>;

  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-3xl">Requests</h1>

      {requests.map((request) => {

        const {_id,firstName,lastName,photoUrl,gender,age, about} = request.fromUserId

        return (
        <div key={_id} className="flex m-4 p-4   rounded-lg bg-base-300  w-1/2 mx-auto">
          <img className="w-20 h-20" alt="photo" src={photoUrl}/>

          <div className="text-left mx-4">
          <h2 className="font-bold text-xl">{firstName+ " " + lastName}</h2>
          <h1>{age}</h1>
          <h1>{gender}</h1>
          <p>{about}</p>
          </div>
        </div>
        )
})}
    </div>
  );

};

export default Request
