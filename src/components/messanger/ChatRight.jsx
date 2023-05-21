import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

const ChatRight = ({message}) => {
  const {user} = useSelector(state => state.auth)
  return (
    <div className='flex flex-row-reverse gap-2 transition-all duration-200 ease-in-out'>
        <div className='h-10 w-10 relative'>
            <img src={user?.profilePicture} alt="" className='rounded-full' />
            <div className='w-2 h-2 p-1 bg-green-500 rounded absolute bottom-1 border-white border right-[3px]'></div>
        </div>
        <div className='w-max h-max'>
        <p className='bg-blue-500 text-white text-xs rounded-full rounded-br-md p-3'>{message.message}</p>
        <p className='text-gray-500 font-medium text-end text-[9px]'>{moment(message.createdAt).fromNow()}</p>
        
        </div>
    </div>
  )
}

export default ChatRight