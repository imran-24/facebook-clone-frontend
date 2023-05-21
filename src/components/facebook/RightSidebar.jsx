import React, { useEffect, useState } from 'react'
import { AiFillGift } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../api'
import { getFriendList } from '../../features/friend/friendSlice'
const RightSidebar = () => {
  const {user} = useSelector(state=> state.auth)
  const [friends, setFriends] = useState([])
  const dispatch = useDispatch();
  useEffect(()=>{
    if(user){
        dispatch(getFriendList({
            userId: user?._id
        }))
    }
   },[user])
   useEffect(()=>{
    const getFriendList = async()=>{
        const response = await API.get(`/api/users/find/friends/${user?._id}`)
        setFriends(response.data)
    }
    getFriendList();
   },[user?._id])



   
  return (
    <div className=' flex flex-col gap-6 '>
        <div className='p-4 border-b  border-gray-300'>
            <p className='text-gray-500 text-lg font-medium'>Birthday</p>
            <div className='flex items-center gap-4 w-full'>
                <AiFillGift fontSize={30} className='text-blue-500' />
                <p className=''> <span className='font-semibold'>Imran</span> and <span className='font-semibold'>Syam</span> have birthdays</p>
            </div>
        </div>
        <div className='p-4 flex flex-col gap-4'>
            <p className='text-gray-500 text-lg font-medium'>Contacts</p>
            
            {
                // friends?.length > 0 && 
                friends?.map(friend => (
                    <div key={friend?._id} className=' w-full flex items-center'>
                        <div className='h-10 w-10 relative'>
                            <img src={friend?.profilePicture} alt="" className='rounded-full h-10 w-10' />
                            <div className='w-2 h-2 p-1 bg-green-500 rounded absolute bottom-0 border-white border right-[3px]'></div>
                        </div>
                        <div className='flex-1 flex flex-col justify-evenly px-4 '>
                            <p className='font-medium'>{friend?.fullname}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RightSidebar