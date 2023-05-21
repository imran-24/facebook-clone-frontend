import React from 'react'
import {FiHome} from 'react-icons/fi'
import {MdLocationOn} from 'react-icons/md'
import {AiFillHeart} from 'react-icons/ai'
import {FiWifi} from 'react-icons/fi'
import { useSelector } from 'react-redux'



const Intro = ({profile, setShowDetails}) => {
  const {user} = useSelector(state => state.auth);
  return (
    <div className='space-y-4 md:w-[50rem] h-[20rem] p-4 mt-4 bg-white flex flex-col justify-evenly rounded-md shadow-md w-full'>
                <h3 className='text-xl font-bold'>Intro</h3>
                {user._id === profile?._id &&
                  <p onClick={()=> setShowDetails(true)} className='bg-gray-200 p-2 rounded-md font-medium text-center cursor-pointer hover:bg-gray-300'>Edit details</p>

                }
                <div className='w-full flex items-center gap-3'>
                  <FiHome fontSize={24} className="text-gray-500" />
                  <p className='font-light'>Lives in <span className='font-medium'>{profile?.live}</span></p>
                </div>
                <div className='w-full flex items-center gap-3'>
                  <MdLocationOn fontSize={24} className="text-gray-500" />
                  <p className='font-light'>From <span className='font-medium'>{profile?.from}</span></p>
                </div>
                <div className='w-full flex items-center gap-3'>
                  <AiFillHeart fontSize={24} className="text-gray-500" />
                  <p className='font-light capitalize'> {profile?.relationShip}</p>
                </div>
                <div className='w-full flex items-center gap-3'>
                  <FiWifi fontSize={24} className="text-gray-500 rotate-45" />
                  <p className='font-light'>Followed by <span className='font-medium'>{profile?.friends?.length}</span> people</p>
                </div>
            </div>
  )
}

export default Intro