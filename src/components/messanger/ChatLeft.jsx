import moment from 'moment'
import React from 'react'

const ChatLeft = ({message, currentChat}) => {
  return (
    <div className='flex gap-2 transition-all duration-200 ease-in-out'>
        <div className='h-10 w-10 relative'>
            <img src={currentChat?.profile} alt="" className='rounded-full' />
            <div className='w-2 h-2 p-1 bg-green-500 rounded absolute bottom-1 border-white border right-[3px]'></div>
        </div>
        <div className='w-max h-max'>
        <p className='bg-gray-200 text-xs rounded-full rounded-bl-md p-3 font-semibold'>{message.message}</p>
        <p className='text-gray-500 font-medium text-[9px]'>{moment(message.createdAt).fromNow()}</p>
        </div>
    </div>
  )
}

export default ChatLeft