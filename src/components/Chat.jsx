import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {

  const[message, setMessage] = useState([])
  const[newMessage, setNewMessage] = useState('')
  const {targetUserId} = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;



  const fetchChatMessages = async () =>{

    const chat = await axios.get(BASE_URL + '/chat/' + targetUserId, {
      withCredentials: true,
    })

     console.log(chat.data.messages);

     const chatMessages = chat?.data?.messages.map((msg) => {

      const {senderId, text} = msg

      return {
        firstName: senderId.firstName,
        lastName: senderId.lastName,
        text
      }

     })
     setMessage(chatMessages)
  }

   useEffect(() => {
       
    (async () => {
      await fetchChatMessages();
    })();
   },[]);

 

  useEffect(() => {

    if (!userId) return;

    const socket = createSocketConnection();
    // As soon as the component mounts(page loads), emit a "joinChat" event to the server with the userId and targetUserId
    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    })


      socket.on("receiveMessage", ({firstName, lastName, text}) => {

        console.log(firstName, text );
        setMessage((prevMessage) => [...prevMessage, {firstName, lastName, text}])


      })

    return () => {
      socket.disconnect();
    }
  },[userId, targetUserId])



  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {

      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage
     

    }

  )

  setNewMessage('')
  }



  return (
     <div className="w-1/3 mx-auto border border-gray-600 p-5 h-[70vh] flex flex-col">
      
      <h1 className="p-5 border  border-gray-600 p-5">Chat</h1>

      <div className="flex-1 overflow-scroll p-5">
        {message.map((msg, index) =>{
          return (
            <div key={index}>
             <div className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }>
               <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
            <div className="chat-bubble">{msg.text}</div>
           <div className="chat-footer opacity-50">Seen</div>
        </div>


            </div>
          )

        }


        )}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-black rounded p-2"
        ></input>

        <button 
        onClick={sendMessage}
        className="btn btn-primary">Send</button>
      </div>

    </div>
  )
}

export default Chat


