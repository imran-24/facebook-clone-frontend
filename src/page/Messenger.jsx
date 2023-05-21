import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { API } from '../api'
import Navbar from '../components/facebook/Navbar'
import ChatList from '../components/messanger/ChatList'
import Inbox from '../components/messanger/Inbox'
import Sidebar from '../components/messanger/Sidebar'
import {io} from 'socket.io-client'
const Messenger = () => {
  const {user} = useSelector(state => state.auth)
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState()
  const socket = useRef(); 
  const [arrivalMessage, setArrivalMessage] = useState(null)

  useEffect(()=>{
        const getConversationList = async()=>{
            const response = await API.get(`/api/conversation/${user?._id}`)
            setConversations(response.data)
        }
        getConversationList();
    },[user])
  useEffect(()=>{
    socket.current = io("ws://localhost:8900")
    socket.current?.on('getMessage', data => {
        
        setArrivalMessage({
          sender: data.senderId,
          message: data.message,
          createdAt: Date.now()
        })
        

      })
  },[])


  useEffect(()=>{
    // if you want to send something to the socket server 
    socket.current?.emit("adduser", user?._id)
    // if you want to get something from the server 
    socket.current?.on('getusers', users=> {
      console.log(users)
    })
  },[user])


  return (
    <div className='h-screen w-screen flex flex-col  bg-slate-100'>
        
        <Navbar />
        <div style={{ height: "calc(100vh - 4rem)"}} className=' flex w-full'>
        <Sidebar />
        <ChatList arrivalMessage={arrivalMessage} user={user} setCurrentChat={setCurrentChat} conversations={conversations}/>
        <Inbox arrivalMessage={arrivalMessage} socket={socket} currentChat={currentChat} />
        </div>

    </div>
  )
}

export default Messenger