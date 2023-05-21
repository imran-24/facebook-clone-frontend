import React from 'react'

import {RxCross2} from 'react-icons/rx'
import {useSelector, useDispatch} from 'react-redux'
import {MdLibraryAdd} from 'react-icons/md'
import {IoMdPhotos} from 'react-icons/io'
import { useState } from 'react'
import { useRef } from 'react'
import { setpost, updatepost } from '../../features/post/postSlice'

const Form = ({ setShowForm, post}) => {
  const {user} = useSelector(state => state.auth)
  const filePickerRef = useRef(null)
  const [description, setDescription] = useState(post?.caption)
  const [selectedImageFile, setSelectedImageFile] = useState(post?.img || "");
  const [selectedVideoFile, setSelectedVideoFile] = useState(post?.video);
  const [active, setActive] = useState(post?.img ? true : false);

  const addFileToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
        
        reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
        if(e.target.files[0].type === "video/mp4") setSelectedVideoFile(readerEvent.target.result)
        else{
            setSelectedImageFile(readerEvent.target.result)
        }
    }
  }
  
  const dispatch = useDispatch()
  const handlePost = ()=>{
    if(post?._id){
        dispatch(updatepost({
            id: post?._id,
            img: selectedImageFile,
            video: selectedVideoFile,
            caption: description,
        }))
    }
    else{dispatch(setpost({
        userId: user?._id,
        img: selectedImageFile,
        video: selectedVideoFile,
        caption: description,
    }))
    setShowForm(false)
    setSelectedVideoFile('')
    setSelectedImageFile('')
    setDescription('')
}
    
  }

  return (
    <div  className='h-screen w-screen fixed top-0 left-0 right-0  flex  flex-col items-center justify-center bg-white bg-opacity-40 z-[999] overflow-hidden' >
        <div  style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className='bg-white w-[36rem] flex flex-col gap-3 rounded-md  px-4 pb-4'>
            <div className='flex items-center w-full py-3 border-b'>
                <p className='text-2xl font-bold flex-1 text-center'>{post ? 'Edit Post' : 'Create Post'}</p>
                <div className='p-2 bg-gray-200 rounded-full cursor-pointer '>
                    <RxCross2 fontSize={26} className='text-gray-500' onClick={()=> setShowForm(false)} />
                </div>
            </div>
            <div className='w-full flex py-2 gap-3'>       
                <img src={user?.profilePicture} alt="" className='rounded-full h-10 w-10 ' />
                <p className='font-medium text-lg'>{user?.fullname}</p>
            </div>
            <div className='w-full flex flex-col   gap-5'>       
                <textarea value={description} onChange={(e)=> setDescription(e.target.value)}  type="text" rows={4} className='resize-none w-full px-2 border-none outline-none placeholder:text-gray-500 ' placeholder={`What's on your mind, ${user.fullname.split(" ")[0]} ?`} >{description}</textarea>
                <div   className={active ? 'transition-all duration-300 ease-in-out relative h-[16rem] border-x border-t rounded-lg w-full flex flex-col items-center justify-center bg-slate-50 hover:bg-gray-200 cursor-pointer z-10 ' : 'hidden'}>
                    <div className='p-1 bg-white border rounded-full cursor-pointer absolute top-3 right-3 z-20 '>
                        <RxCross2 fontSize={20} className='text-gray-500 ' onClick={()=> {
                            setSelectedVideoFile(null)
                            setSelectedImageFile(null)}} />
                    </div>
                    {/* {
                        selectedImageFile ? 
                        <img src={selectedImageFile} className='h-[16rem] object-cover' alt="" />
                        : <>
                        <input accept='.png,.jpeg,.jpg,.mp4'  type="file" hidden ref={filePickerRef} onChange={addFileToPost} />
                        <div onClick={()=> filePickerRef.current.click()} className='flex flex-col items-center justify-center cursor-pointer'>
                            <MdLibraryAdd fontSize={24}  />
                            <p className='text-xl'>Add Photos/Videos</p>
                            <p className='text-gray-500 text-xs'>or drag and drop</p>
                        </div>
                        </>
                    } */}
                    {
                        (!selectedVideoFile && !selectedImageFile) ?
                        <>
                        <input accept='.png,.jpeg,.jpg,.mp4'  type="file" hidden ref={filePickerRef} onChange={addFileToPost} />
                        <div onClick={()=> filePickerRef.current.click()} className='flex flex-col items-center justify-center cursor-pointer'>
                            <MdLibraryAdd fontSize={24}  />
                            <p className='text-xl'>Add Photos/Videos</p>
                            <p className='text-gray-500 text-xs'>or drag and drop</p>
                        </div>
                        </>
                        :
                        <>
                        { 
                           selectedImageFile && <img src={selectedImageFile} className='h-[16rem] object-cover' alt=""  />
                        }
                        {   selectedVideoFile && <video className="h-[16rem] rounded-md"  controls >
                            <source src={selectedVideoFile} type="video/mp4"/>
                            </video>
                        }
                        </>
                        
                        
                    }
                </div>
            </div>
            <div className='w-full p-3 flex rounded-lg border gap-3'>       
                <p className='font-medium text-lg flex-1'>Add to your post</p>
                <IoMdPhotos fontSize={32} className='text-green-500 cursor-pointer p-1 bg-gray-200 rounded-full' onClick={()=> setActive(!active)} />

            </div>
            {(description || selectedImageFile || selectedVideoFile )&& 
                    <div onClick={handlePost} className='w-full rounded-lg font-medium p-[4px] mb-3 cursor-pointer hover:bg-blue-600 text-lg text-center bg-blue-500 text-white'>       
                        <p>{post?._id ? "update" : "Post"}</p>
                    </div>}
        </div>
    </div>
  )
}

export default Form