import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { API } from '../../api'

const Row = ({conversation, setCurrentChat, arrivalMessage, user}) => {
  const [friend, setFriend] = useState()
  const friendId = conversation?.members.find( (id) => id !== user?._id )
  const [lastMessage, setLastMessage] = useState()
  useEffect(()=>{
    const getLastMessage = async()=>{
        try{
        const response = await API.get(`/api/messages/lastMessage/${conversation._id}`)
        
        setLastMessage(response.data)
        }
        catch(error){
            console.log(error.message)
        }
    }
    getLastMessage()
  },[conversation])
 
  useEffect(()=>{
    
    const getUser = async()=>{
      
      try{
        const response = await API.get(`/api/users/findbyId/${friendId}`)
        setFriend(response.data)
      }
      catch(error){
        console.log(error.message)
      }
    }
    getUser()
  },[friendId])
  return (
    <div onClick={()=> setCurrentChat({
      conversationId: conversation?._id,
      id: friend._id,
      name: friend?.fullname,
      profile: friend?.profilePicture 
    })} className='w-full h-16 relative flex items-center justify-between gap-2 p-2 cursor-pointer'>
        {/* left */}
        {
          friend && <>
          <div className='h-14 w-14 relative'>
            <img src={friend?.profilePicture} alt="" className='rounded-full ' />
            <div className='w-2 h-2 p-1 bg-green-500 rounded absolute bottom-1 border-white border right-[3px]'></div>
          </div>
          {/* middle */}
          <div className='flex-1 h-16 flex flex-col justify-evenly '>
              <p className='font-bold text-[15px]'>{friend?.fullname}</p>
              <p style={{lineHeight: '.9rem'}} className='w-full font-semibold text-[12px] text-gray-500 truncate'>{( arrivalMessage?.sender === friendId) ? arrivalMessage?.message : lastMessage?.message }</p>
          </div>
          {/* right */}
          <div className='h-14 flex flex-col items-end justify-center gap-2'>
              <p className='font-bold text-xs'>{moment(arrivalMessage?.sender === friendId ?  arrivalMessage?.createdAt : lastMessage?.createdAt).fromNow()}</p>
              <p  className='p-[1px] text-xs  bg-blue-500 rounded text-center min-h-4 w-4 text-white'>1</p>
          </div>
          </>
        }
    </div>
  )
}

export default Row