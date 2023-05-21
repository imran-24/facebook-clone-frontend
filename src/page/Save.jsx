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
import {MdPhotoLibrary} from 'react-icons/md'
import {FiMoreHorizontal} from 'react-icons/fi'
import {HiOutlineBookmarkSlash} from 'react-icons/hi2'
import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import SavedItem from '../components/facebook/SavedItem'
import { useEffect } from 'react'
import {API} from '../api'
import { savepost } from '../features/post/postSlice'
import { updatesave } from '../features/save/saveSlice'
import {  BsBookmarkDash } from 'react-icons/bs'


const Save = () => {
  const [showForm, setShowForm] = useState(false)
  const {user} = useSelector(state => state.auth)
  const {save} = useSelector(state => state.save)
  const {posts} = useSelector(state => state.posts)
  const [savedPost, setSavedPost] = useState([])
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false)

  
  useEffect(()=>{
    setSavedPost( posts.filter(post => save.saved?.includes(post?._id) ))
  },[posts, save])

  const handleSave = (post)=>{
    dispatch(updatesave({
        id: post?._id,
        userId: user?._id
    })) 
    setShowMore(false)
  }

  return (
    <div className='h-screen w-screen flex relative  flex-col bg-slate-100'>
        {showForm && <Form setShowForm={setShowForm}/>}
        
        <Navbar />
        <div className='w-screen flex  justify-between gap-12'>
          <section className='w-[360px] hidden xl:block '>
            <div className=' flex flex-col gap-6 bg-white h-screen shadow-md p-4'>
              <div className='flex-1 flex flex-col gap-3 w-full '>
                
                <div className='w-full flex items-center justify-between gap-2 '>
                    <p className='text-3xl font-bold'>Saved</p>
                    <div className='p-2 bg-gray-200 rounded-full '>
                        <IoSettings fontSize={24} className='text-black' />
                    </div>
                </div>
                
                <div className='w-full flex items-center  gap-2  hover:bg-gray-200 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                  <MdPhotoLibrary fontSize={40} className='text-white bg-blue-500 p-2 rounded-full' />
                  <p className=' font-medium '>Saved Items</p>
                </div>
                <div className='w-full border-t border-gray-300'>
                  
                </div>

              </div>
            </div>
          </section>
          <section className='flex-1 h-screen space-y-4 p-6  overflow-y-scroll scrollbar-none sticky top-0'>
            <p className='text-xl font-medium'>All</p>
            {
              savedPost?.length > 0 && 
              savedPost.map(item => (
                <div key={item?._id} className='w-full p-4 flex gap-6 rounded-md bg-white shadow-md'>
                    <img src={item?.img && item?.img } alt="" className='h-[180px] rounded-md '/>
                    <div className='space-y-4'>
                      <p className='text-2xl font-bold '>{item?.caption}</p>
                      <p className='text-sm text-gray-500'>Post Saved to <span className='text-sm text-black '>Home</span></p>
                      <div className='flex items-center gap-3'>
                        <img src={item?.profilePicture} className='h-10 w-10 rounded-full'  />
                        <p className='text-sm text-gray-500'>Saved from <span className='text-sm text-black font-medium'>{item?.fullname}'s post</span></p>
                      </div>
                      <div className='flex items-center gap-3 relative'>
                        <p className='py-2 px-6 bg-gray-200 hover:bg-gray-300 font-medium rounded-md cursor-pointer'>Add to Collection</p>
                        <div onClick={()=> handleSave(item)} className='p-2 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer z-20'>
                          <BsBookmarkDash fontSize={24} className='mt-[6px]' />
                        </div>
                      </div>
                      
                        
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

export default Save