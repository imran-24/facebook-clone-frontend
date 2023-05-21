import React from 'react'
import Navbar from '../components/facebook/Navbar'
import ChatList from '../components/messanger/ChatList'
import Inbox from '../components/messanger/Inbox'
import Sidebar from '../components/messanger/Sidebar'
import SignIn from './SignIn'
import LeftSidebar from '../components/facebook/LeftSidebar'
import Feed from '../components/facebook/Feed'
import RightSidebar from '../components/facebook/RightSidebar'
import Form from '../components/facebook/Form'
import {IoSettings} from 'react-icons/io5'
import {MdGroup, MdPhotoLibrary} from 'react-icons/md'
import {FiMoreHorizontal} from 'react-icons/fi'
import {HiOutlineBookmarkSlash} from 'react-icons/hi2'
import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import SavedItem from '../components/facebook/SavedItem'
import { useEffect } from 'react'
import {API} from '../api'
import { savepost } from '../features/post/postSlice'
import { updatesave } from '../features/save/saveSlice'
import { Link } from 'react-router-dom'
import FriendButton from '../components/facebook/FriendButton'
import { HiUserAdd } from 'react-icons/hi'


const FriendRequest = () => {
  const {user} = useSelector(state => state.auth)
  const [followers, setfollowers] = useState([])
  const [status, setStatus] = useState();

   useEffect(()=>{
    const getFollowerList = async()=>{
        const response = await API.get(`/api/friend/followerList/${user?._id}`)
        setfollowers(response.data)
    }
    if(user) getFollowerList();
   },[user?._id])
  return (
    <div className='h-screen w-screen flex relative  flex-col bg-slate-100'>
        {/* {showForm && <Form setShowForm={setShowForm}/>} */}
        
        <Navbar />
        <div className='w-screen flex gap-12'>
          <section className='w-[360px] hidden xl:block '>
            <div className=' flex flex-col gap-6 bg-white h-screen shadow-md p-4'>
              <div className='flex-1 flex flex-col gap-3 w-full '>
                
                <div className='w-full flex items-center justify-between gap-2 '>
                    <p className='text-3xl font-bold'>Friends</p>
                    <div className='p-2 bg-gray-200 rounded-full '>
                        <IoSettings fontSize={24} className='text-black' />
                    </div>
                </div>
                
                <Link to={'/'}>
                <div className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                  <MdGroup fontSize={40} className='text-white bg-blue-500 p-2 rounded-full' />
                  <p className=' font-medium '>Home</p>
                </div>
                </Link>
                <div className='w-full border-t border-gray-300'>
                  
                </div>

              </div>
            </div>
          </section>
          
          <section className='w-full h-screen space-y-4 p-6  overflow-y-scroll scrollbar-none sticky top-0'>
            <p className='text-xl font-medium'>All</p>
            {
              followers?.length > 0 && 
              followers.map(friend => (
                <div key={friend} className=' gap-2 pb-3 rounded-md flex flex-col items-center justify-center bg-white w-[200px] shadow-xl'>
                    <img src={friend?.profilePicture && friend?.profilePicture } alt="" className='h-[200px] w-[200px] rounded-t-md '/>
                    <p className='text-start font-medium text-lg w-full px-3'>{friend.fullname}</p>
                    <div className='flex w-[180px] items-center justify-center gap-1 bg-blue-500 cursor-pointer hover:to-blue-600 rounded-md px-3 py-2'>
                            <HiUserAdd fontSize={24} className='text-white' />
                            <FriendButton status={status} setStatus={setStatus} profile={friend} />
                        </div>
                </div>
              ))
            }
          </section>
          
        </div>
        {/* <Sidebar />
        <ChatList />
        <Inbox /> */}
        {/* <SignIn /> */}
    </div>
  )
}

export default FriendRequest