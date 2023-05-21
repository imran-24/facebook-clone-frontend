import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineMore } from 'react-icons/ai'
import { BsFillMicFill } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import { MdOutlineAttachment } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { API } from '../../api'
import ChatLeft from './ChatLeft'
import ChatRight from './ChatRight'

const Inbox = ({currentChat, socket, arrivalMessage}) => {
  const [messages, setMessages] = useState([])
  const {user} = useSelector(state => state.auth)
  const messageRef = useRef()
  const scrollRef = useRef();

// get all the messages of a user 
  useEffect(()=>{
    const getMessages = async()=>{
        try{
        const response = await API.get(`/api/messages/${currentChat?.conversationId}`)
        setMessages(response.data)
        }
        catch(error){
            console.log(error.message)
        }
    }
    getMessages()
  },[currentChat])
 
  useEffect(()=>{
    (arrivalMessage && currentChat?.id === arrivalMessage.sender ) &&
        setMessages((prev)=> [...prev, arrivalMessage])
  },[arrivalMessage])


// redirecting to the last message 
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
  },[messages])

// send a message using send icon 
  const sendMessage = async()=>{ 
    socket.current.emit("sendMessage",{
        senderId: user?._id,
        receiverId: currentChat.id,
        message: messageRef.current.value
    })
    try{

        const response = await API.post(`/api/messages/`, {
            conversationId: currentChat?.conversationId,
            sender: user?._id,
            message: messageRef.current.value
        })
        messageRef.current.value = ""
        setMessages([...messages, response.data])
        
        }
    catch(error){
        console.log(error.message)
    }
  }

 
//  send a message pressing enter 
  const perssEnterToSendMessage = async(e)=>{ 
    if(e.key === "Enter" && messageRef.current.value !== "") {
        socket.current.emit("sendMessage",{
            senderId: user?._id,
            receiverId: currentChat.id,
            message: messageRef.current.value
        })
        try{

        const response = await API.post(`/api/messages/`, {
            conversationId: currentChat?.conversationId,
            sender: user?._id,
            message: messageRef.current.value
        })
        messageRef.current.value = ""
        setMessages([...messages, response.data])
        }
        catch(error){
            console.log(error.message)
        }
    }
  }
  
  return (
    <div className='h-full flex-1 flex flex-col items-center  border-r border-gray-200 relative'>
        {/* header */}
        <div className='h-24 border-b w-full flex items-center   px-4 py-8'>
                    <div className='h-14 w-14 relative'>
                        <img src={currentChat?.profile} alt="" className='rounded-full ' />
                        <div className='w-2 h-2 p-1 bg-green-500 rounded absolute bottom-1 border-white border right-[3px]'></div>
                    </div>

                    <div className='flex-1 flex flex-col justify-evenly px-4 '>
                        <p className='font-bold text-lg'>{currentChat?.name}</p>
                        <p className='font-light text-[12px] text-gray-500'>Online </p>
                    </div>
                    <AiOutlineMore fontSize={22} className='text-gray-400' /> 
        </div>
        <div className='w-full flex-1 flex flex-col gap-5 p-6 overflow-y-scroll transition-all duration-200 ease-out'>
            {
                messages?.map(message => (
                    message?.sender === user?._id 
                    ? (<div ref={scrollRef} key={message.createdAt}>
                        <ChatRight  message={message} />
                    </div>)
                    
                    : (<div ref={scrollRef} key={message.createdAt}> 
                        <ChatLeft   currentChat={currentChat} message={message} />
                    </div>)
                ))
            }
        </div>

        {/* footer */}
        <div className='h-24 border-t w-full flex items-center gap-3 sticky bottom-0 bg-white  px-4 py-8'>

            <MdOutlineAttachment fontSize={22} className='text-gray-400' />
            <div className='px-2 bg-gray-100 flex-1 rounded-lg flex items-center '>
                <input onKeyPress={perssEnterToSendMessage} ref={messageRef} type="text" placeholder='type...' className='placeholder:font-medium placeholder:capitalize text-sm text-gray-500 border-none outline-none px-2 py-3 bg-transparent w-full'  />
                <IoMdSend  onClick={sendMessage} fontSize={22} className='text-gray-400 cursor-pointer' />
            </div>

            <BsFillMicFill  fontSize={22} className='text-gray-400' />
        </div>

    </div>
  )
}

export default Inbox