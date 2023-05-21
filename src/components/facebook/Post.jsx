import React from 'react'
import { GoComment, GoSmiley } from 'react-icons/go'
import { RxCross2 } from 'react-icons/rx'
import { FiDelete, FiMoreHorizontal } from 'react-icons/fi'
import { FaLaughSquint } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai'
import {FiEdit2} from 'react-icons/fi'
import {SlLike} from 'react-icons/sl'
import {useSelector, useDispatch} from 'react-redux'
import { RiDeleteBin5Line, RiShareForwardLine } from 'react-icons/ri'
import {BsBookmark} from 'react-icons/bs'
import { commentpost, deletepost, likepost, remove, savepost } from '../../features/post/postSlice'
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'
import { useRef } from 'react'
import Form from './Form'
import { updatesave } from '../../features/save/saveSlice'


const Post = ({post}) => {

  const dispatch = useDispatch();
  const [like, setLike] = useState(post?.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const commentRef = useRef()
  const [showForm, setShowForm] = useState(false)
  const {user} = useSelector(state=> state.auth)
  const {save} = useSelector(state=> state.save)
  
  useEffect(()=>{
    setIsLiked(post?.likes.includes(user?._id))
  },[user?._id, post?.likes])

  useEffect(()=>{
    setIsSaved(save.saved?.includes(post?._id))
  },[save, post?._id])

  const handleLike = ()=>{
    dispatch(likepost({
        id: post?._id,
        userId: user?._id
    }))   
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  const handleSave = ()=>{
    dispatch(updatesave({
        id: post?._id,
        userId: user?._id
    })) 
    setIsSaved(!isSaved)
    setShowMore(false)
  }

  const handleDelete = ()=>{
    setShowMore(false)
    dispatch(deletepost({
        id: post?._id,
    })) 
 
    
  }

  const handleComment =(e)=>{
    if(e.key === "Enter" && commentRef.current.value !== ""){
        dispatch(commentpost({
            id: post?._id,
            fullname: user?.fullname,
            profilePicture: user?.profilePicture,
            comment: commentRef.current.value
        }))
        commentRef.current.value = ""
    }
  }
  return (
    <div className='w-full relative flex flex-col justify-between bg-white rounded-lg  shadow-md p-5'>
            
            {showMore && 
            <div style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className='w-[20rem] absolute right-16 top-[60px]  flex flex-col justify-between gap-2 bg-white rounded-lg p-5'>
                <div onClick={handleSave} className='w-full  flex  gap-3  hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                    <BsBookmark fontSize={24} className='mt-[6px]' />
                    <div className=''>
                        <p className=' font-medium'>{isSaved ? "Saved" : "Save"}</p>
                        <p className='text-gray-500 text-xs'>This item will be saved</p>
                    </div>
                </div>
                <div className='w-full border-b border-gray-300'>

                </div>
                {
                    user?._id === post?.userId &&
                        <>
                        <div onClick={()=> {
                            setShowForm(true)  
                            setShowMore(false)}} className='w-full  flex  gap-3  hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                            <FiEdit2 fontSize={24} className='mt-[6px]' />
                            <div className=''>
                                <p className=' font-medium'>Edit</p>
                                
                            </div>
                        </div>
                        <div onClick={handleDelete} className='w-full  flex  gap-3  hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                            <RiDeleteBin5Line fontSize={24} className='' />
                            <div className=''>
                                <p className=' font-medium'>Delete</p>
                                
                            </div>
                        </div>
                        </>
                }

            </div>}
            {
                showForm && <Form setShowForm={setShowForm} post={post} />
            }


            {/* header */}
            <div className='w-full flex items-center '>       
                <img src={post?.profilePicture} alt="" className='rounded-full h-10 w-10 ' />
                <div className='flex-1 flex flex-col justify-evenly px-4 '>
                    <p className='font-medium text-lg'>{post?.fullname}</p>
                    <p className='text-xs text-gray-500'>{moment(post.createdAt).fromNow()}</p>
                </div>
                <div className='flex items-center gap-1'>
                    
                    <div  onClick={()=> setShowMore(!showMore)} className='p-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                        <FiMoreHorizontal  fontSize={20} className='text-gray-500' />
                    </div>
                    
                    <div onClick={()=> dispatch(remove(post._id))} className='p-2 hover:bg-gray-200 rounded-full cursor-pointer '>
                        <RxCross2 fontSize={20} className='text-gray-500' />
                    </div>
                </div>
            </div>

            

            {/* caption */}
            <div className=''>
                <p className=' py-4'>{post?.caption}</p>
            </div>
            {/* upload */}
            {post?.img && <div className='border-t'>
                <img src={post?.img} alt="" className=' px-8' />
            </div>}
            {
                post?.video && <video className="border-t px-8"  controls >
                <source src={post?.video} type="video/mp4"/>
                </video>
            }
            {/* status */}
            <div className='w-full flex items-center justify-between gap-2 px-6 py-3 border-y'>       
                
                <div className='flex items-center gap-2'>
                    <div className='flex items-center '>
                    <AiFillLike  fontSize={20} className='text-blue-500'/>
                    </div>
                    <p className=' text-gray-500'>{like}</p>
                </div>
                    
                <div className='flex items-center  gap-3 text-gray-500'>
                    {post?.comments.length > 0 && <div className=''>
                        <span>{post?.comments.length}</span> <span  className=''>comments</span> 
                    </div>}
                    {post?.shares.length > 0 && <div className=''>
                        <span>{post?.shares.length}</span> <span className=''>share</span> 
                    </div>}
                </div>
            </div>

            {/* reaction */}
            <div className='w-full  flex items-center gap-3 justify-evenly p-1 border-b'>
                <div onClick={handleLike} className='w-full flex items-center justify-center gap-2  hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                    <SlLike  fontSize={22} className={isLiked ? 'text-blue-500' : 'text-gray-500'}/>
                    <p className='text-gray-500 font-medium'>{isLiked ? "Liked" : "Like"}</p>
                </div>
                <div onClick={()=> setShowComment(!showComment)} className='w-full flex items-center justify-center gap-2  hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2 '>
                    <GoComment fontSize={22} className='text-gray-500 ' />
                    <p className='text-gray-500 font-medium'>Comment</p>
                </div>
                <div className='w-full flex items-center justify-center gap-2  hover:bg-gray-100 rounded-lg transition-all duration-200 ease-in-out cursor-pointer p-2'>
                    <RiShareForwardLine fontSize={22} className='text-gray-500' />
                    <p className='text-gray-500 font-medium'>Share </p>
                </div>
            </div>

            
            {showComment && 
            <div className='transition-all duration-200 ease-in-out'>
                <div className='w-full flex items-center gap-3 py-2  border-b'>
                    <img src={user?.profilePicture} alt="" className='rounded-full h-9 w-9 ' />
                    <div className='w-full bg-gray-100 rounded-full '>
                        <input onKeyPress={handleComment} ref={commentRef} type="text" className='bg-transparent py-2 px-4 w-full outline-none cursor-pointer placeholder:text-gray-500' placeholder='Write a comment...'/>
                    </div>
                </div>

                
                {post.comments.length > 0 && 
                    <div className='w-full flex items-center py-1'>       
                        <img src={post.comments[post.comments.length - 1]?.profilePicture} alt="" className='rounded-full h-9 w-9 ' />
                        <div className='flex-1 flex flex-col justify-evenly px-4 '>
                            <p className='font-medium text-sm'>{post.comments[post.comments.length - 1]?.fullname}</p>
                            <p className='font-light text-black'>{post.comments[post.comments.length - 1]?.comment}</p>
                        </div>

                    </div>
                }
                {post.comments.length > 1 &&  <p className='text-gray-500 font-medium'>View more comments</p>}
            </div>}
            
    </div>
  )
}

export default Post