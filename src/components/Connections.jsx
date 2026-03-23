
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {

  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  console.log("Redux connections:", connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1>Loading...</h1>;

  if (connections.length === 0)
    return <h1>No connections found</h1>;

  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-3xl">Connections</h1>

      {connections.map((connection) => {

        const {firstName,lastName,photoUrl, age, gender,about} = connection

        return (
        <div className="flex m-4 p-4   rounded-lg bg-base-300  w-1/2 mx-auto">
          <img className="w-20 h-20" alt="photo" src={photoUrl}/>

          <div className="text-left mx-4">
          <h2 className="font-bold text-xl">{firstName+''+ lastName}</h2>
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

export default Connections;