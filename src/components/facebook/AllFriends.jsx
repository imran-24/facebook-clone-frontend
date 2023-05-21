import React, { useEffect, useState } from 'react'
import { API } from '../../api'

const AllFriends = ({profile}) => {
    const [friends, setFriends] = useState([])
    useEffect(()=>{
        const getFriendList = async()=>{
            const response = await API.get(`/api/users/find/friends/${profile?._id}`)
            setFriends(response.data)
        }
        getFriendList();
    },[profile])
  return (
    <div className='w-full bg-white rounded-md shadow-xl mt-[2rem] p-6 '>
        <p className='text-xl font-medium'>All Friends</p>
        <div className='px-2 py-4  flex flex-wrap items-center gap-2'>
        {
            friends?.length > 0 && 
            friends.map(friend => (
                <div key={friend?._id} className=' gap-4  flex items-center justify-center w-1/2 border border-gray-50 rounded-md'>
                    <img src={friend?.profilePicture && friend?.profilePicture } alt="" className='h-[80px] w-[80px] rounded-md '/>
                    <p className='text-start font-medium text-lg w-full px-3'>{friend.fullname}</p>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default AllFriends