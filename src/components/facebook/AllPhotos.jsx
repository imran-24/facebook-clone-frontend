import React from 'react'
import { useSelector } from 'react-redux'

const AllPhotos = () => {

  const {user} = useSelector(state => state.auth)
  const {posts} = useSelector(state => state.posts)
  return (
    <div className='w-full bg-white rounded-md shadow-xl mt-[2rem] p-6 '>
        <p className='text-xl font-medium'>All Photos</p>
        <div className='px-2 py-4  flex flex-wrap items-center justify-center gap-2'>
        {
            posts?.length > 0 && 
            posts.map(post => (
                <div key={post?._id} className=' gap-4  flex items-center justify-center border  rounded-md'>
                    {(post?.img && user._id === post.userId) && <img src={ post?.img } alt="" className='h-[260px] w-[260px] rounded-md object-cover'/>}
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default AllPhotos