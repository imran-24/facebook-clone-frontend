import React from 'react'
import {FcVideoCall} from 'react-icons/fc'
import { IoMdPhotos } from 'react-icons/io'
import { GoSmiley } from 'react-icons/go'
import profile from '../../assets/profile.jpg'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
const InputForm = ({ setShowForm}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <div className='w-full min-w-[30rem] flex flex-col justify-between bg-white rounded-lg  shadow-md'>
            
            <div className='w-full flex items-center gap-3 p-5 border-b'>
                <Link to={`/profile/${user?.username}`} className='cursor-pointer z-50 rounded-full'>
                    <img  src={user?.profilePicture} alt="" className='rounded-full h-10 w-10 ' />
                </Link>
                <div className='w-full bg-slate-100 rounded-full '>
                    <input onClick={()=> setShowForm(true)} readOnly type="text" name="" id="" className='bg-transparent py-2 px-4 w-full outline-none cursor-pointer' placeholder={`What's on your mind, ${user?.fullname.split(" ")[0]} ?`}/>
                </div>
            </div>

            <div className='w-full  flex items-center gap-3 justify-evenly p-3'>
                <div  className='w-full flex items-center justify-center gap-3  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                    <FcVideoCall fontSize={28} />
                    <p>live video </p>
                </div>
                <div onClick={()=> setShowForm(true)} className='w-full flex items-center justify-center gap-3  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                    <IoMdPhotos  fontSize={28} className='text-green-500' />
                    <p>photo/video </p>
                </div>
                <div className='w-full flex items-center justify-center gap-3  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2'>
                    <GoSmiley fontSize={28} className='text-yellow-500' />
                    <p>Felling/activity </p>
                </div>
            </div>

        </div>
  )
}

export default InputForm