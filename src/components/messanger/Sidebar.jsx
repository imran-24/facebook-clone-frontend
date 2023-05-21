import React from 'react'
import {AiTwotoneMessage} from 'react-icons/ai'
import {IoMdSettings} from 'react-icons/io'
import {IoCall} from 'react-icons/io5'
import { useSelector } from 'react-redux'
const Sidebar = () => {
  const {user} = useSelector(state => state.auth)
  return (
    <div className='h-full w-20 flex flex-col items-center justify-between gap-4 border-r border-gray-200 py-10'>
        <div>
            <img className='h-10 w-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png" alt="" />
        </div>
        <div className='flex flex-col items-center justify-between gap-10 text-gray-400'>
            <div className='bg-blue-500 bg-opacity-30  p-2 rounded-lg'>
            <AiTwotoneMessage fontSize={24} className='text-blue-500 '/>
            </div>
            <IoCall fontSize={22} />
            <IoMdSettings fontSize={24} />
        </div>
        <div className='relative'>
            <img  src={user?.profilePicture} className='h-10 w-10 rounded-full' alt="" />
            <div className='w-2 h-2 bg-green-500 rounded absolute bottom-1 border-white border right-[1.5px]'></div>
        </div>
    </div>
  )
}

export default Sidebar