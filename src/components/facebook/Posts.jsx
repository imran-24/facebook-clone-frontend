import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {useParams} from 'react-router-dom'
import Post from './Post'
import {useDispatch, useSelector} from 'react-redux'
import { getpost } from '../../features/post/postSlice';
import { getallsave } from '../../features/save/saveSlice';
const Posts = () => {
  const {posts} = useSelector(state => state.posts)
  const {user} = useSelector(state => state.auth)
  const {username} = useParams()

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getallsave(
      {userId: user?._id }
    ))
  },[user._id])
  useEffect(()=>{
    dispatch(getpost(
      username ? {username} : {id: user?._id }
    ))
  },[username])
  return (
    <div className='flex flex-col gap-4 mb-6'>
        {
          posts?.map( post => (
            <Post key={post?._id} post= {post}  />
          ))
        }
    </div>
  )
}

export default Posts