import React from 'react'
import { BsBookmark, BsPlayBtnFill } from 'react-icons/bs'
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { MdGroup, MdRecentActors } from 'react-icons/md'
import {RxCounterClockwiseClock} from 'react-icons/rx'
import {HiOutlineUserGroup} from 'react-icons/hi'
import { RiArrowDownSLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'


const LeftSidebar = () => {
  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate();
  return (
    <div className=' flex flex-col gap-6 '>
        <div className='flex-1 flex flex-col gap-3 w-full pt-4'>
            <Link to={'/friends'}>
            <div className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                <MdGroup fontSize={30} className='text-blue-500' />
                <p className='text-lg font-medium'>Friends</p>
            </div>
            </Link>

            <div className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                <MdRecentActors fontSize={30} className='text-blue-500' />
                <p className=' font-medium'>Most recent</p>
            </div>

            <div className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                <HiOutlineUserGroup fontSize={30} className='text-blue-500' />
                <p className=' font-medium'>Groups</p>
            </div>
            <div className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                <HiOutlineBuildingStorefront fontSize={30} className='text-blue-500' />
                <p className=' font-medium'>Market place</p>
            </div>
            <div className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                <BsPlayBtnFill fontSize={30} className='text-blue-500' />
                <p className=' font-medium'>Watch</p>
            </div>
            <div className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                <RxCounterClockwiseClock fontSize={30} className='text-blue-500' />
                <p className=' font-medium'>Memory</p>
            </div>
            <div onClick={()=> navigate(`/saved/${user?._id}`)} className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                <BsBookmark fontSize={30} className='text-blue-500' />
                <p className=' font-medium'>Saved</p>
            </div>
            <div className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2  '>
                <RiArrowDownSLine fontSize={30} className='text-blue-500' />
                <p className=' font-medium'>See more</p>
            </div>
        </div>
        <div className='border-b border-gray-300'></div>
        <div className='flex-1 flex flex-col gap-6 w-full'>
            <p className='text-gray-500 font-medium text-lg'>Your Shortcuts</p>
        </div>
    </div>
  )
}

export default LeftSidebar