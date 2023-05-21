import React, { useEffect, useState } from 'react'
import {MdOutlineAddCircle} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'
import Row from './Row'
import { useSelector } from 'react-redux'
import { API } from '../../api'
const ChatList = ({user, setCurrentChat, arrivalMessage, conversations}) => {
    
  return (
    <div className='h-full w-[360px]  flex flex-col items-center  gap-4 border-r border-gray-200 '>
        {/* header */}
        <div className='h-24 border-b w-full flex  items-center justify-between px-4 py-8'>
            <h1 className='text-2xl font-semibold'>Message</h1>
            <div className='p-2 bg-gray-100 rounded-lg'>
                <MdOutlineAddCircle fontSize={20} className="text-gray-400" />
            </div>
        </div>

        {/* search  */}
        <div className=' w-full flex  items-center justify-between px-4'>
            <div className='px-2 bg-gray-100 w-full rounded-lg flex items-center '>
                <input type="text" placeholder='search' className='placeholder:font-medium placeholder:capitalize text-sm text-gray-500 border-none outline-none px-2 py-3 bg-transparent w-full'  />
                <AiOutlineSearch fontSize={22} className='text-gray-400' />
            </div>
        </div>
        
        <div className='flex-1 w-full px-4 space-y-8 overflow-y-scroll'>
            {
                conversations?.length > 0 && 
                conversations.map( conversation => (
                    <Row arrivalMessage={arrivalMessage} setCurrentChat={setCurrentChat}  key={conversation._id} conversation={conversation} user={user} />
                ))
            }
        </div>
        
    </div>
  )
}

export default ChatList