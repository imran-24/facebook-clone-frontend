import React from 'react'

import {RxCross2} from 'react-icons/rx'
import {useSelector, useDispatch} from 'react-redux'
import {MdLibraryAdd} from 'react-icons/md'
import {IoMdPhotos} from 'react-icons/io'
import { useState } from 'react'
import { useRef } from 'react'
import { setpost } from '../../features/post/postSlice'
import {FiHome} from 'react-icons/fi'
import {MdLocationOn} from 'react-icons/md'
import {AiFillHeart} from 'react-icons/ai'
import {FiWifi} from 'react-icons/fi'
import {MdOutlinePhotoLibrary} from 'react-icons/md'
import {HiArrowUpTray} from 'react-icons/hi2'
import {ImBin} from 'react-icons/im'
import { updateuser } from '../../features/auth/authSlice'
import { useEffect } from 'react'

const EditProfileForm = ({ setEditProfile}) => {
  const {user} = useSelector(state => state.auth)
  const profilePickerRef = useRef(null)
  const coverPickerRef = useRef(null)
  const [selectedDp, setSelectedDp] = useState(user?.profilePicture);
  const [selectedCover, setSelectedCover] = useState(user?.coverPicture);
  const [active, setActive] = useState(false);
  const [details, setDetails] = useState({
    live: '',
    from: '',
    relationShip: ''
  })
  useEffect(()=>{
    setDetails({
        live: user?.live,
        from: user?.from,
        relationShip: user?.relationShip
    })
  },[user])
  const onchange = (e) =>{
    setDetails((prevState) => ({
        ...prevState,[e.target.name]: e.target.value
    }))   
}
  const {live, from, relationShip} = details
  const [editCover, setEditCover] = useState(false);
  const [editDp, setEditDp] = useState(false);
  const [showDetails, setShowDetails] = useState(false)

  const addDpToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
        setSelectedDp(readerEvent.target.result)
    }
  }
  const addCoverToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
        setSelectedCover(readerEvent.target.result)
    }
    setEditCover(false)
  }
  const dispatch = useDispatch()
  const handlePost = ()=>{
    dispatch(updateuser({
        id: user?._id,
        live,
        from,
        relationShip,
        profilePicture: selectedDp,
        coverPicture: selectedCover,
    }))
    setEditProfile(false)
  }

  return (
    <div  className='h-screen w-screen fixed top-0 left-0 right-0  flex  flex-col items-center justify-center bg-white bg-opacity-40 z-[999] overflow-y-scroll' >
        <div style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className='bg-white  w-[42rem] lg:w-[52rem]  flex flex-col gap-3 rounded-md  px-4 pb-4 mt-[200px] mb-[20px]'>
            <div className='flex items-center w-full py-3 border-b'>
                <p className='text-2xl font-bold flex-1 text-center'>Edit profile</p>
                <div className='p-2 bg-gray-200 rounded-full cursor-pointer '>
                    <RxCross2 fontSize={26} className='text-gray-500' onClick={()=> setEditProfile(false)} />
                </div>
            </div>
            <div className='w-full flex flex-col py-2 gap-3'> 
                <div className='w-full flex items-center justify-between'>
                    <p className='text-xl font-bold '>Profile picture</p>
                    <input accept='.png,.jpeg,.jpg'  type="file" hidden ref={profilePickerRef} onChange={addDpToPost} />
                    <p onClick={()=> {profilePickerRef.current.click()}} className='text-lg  text-blue-500 cursor-pointer'>Edit</p>
                </div>  
                <div className='w-full  h[200px]'>
                    {selectedDp ? 
                    <img src={selectedDp} alt="" className='rounded-full m-auto w-[180px] h-[180px] ' />
                    : <p className='text-center font-light text-xl'>Please upload a profile picture</p>}
                </div>
            </div>

            <div className='relative w-full flex flex-col py-2 gap-3'> 
                <div className='w-full flex items-center justify-between'>
                    <p className='text-xl font-bold '>Cover photo</p>
                    <p onClick={()=> setEditCover(!editCover)} className='text-lg  text-blue-500 cursor-pointer'>Edit</p>
                </div> 
                { editCover &&
                       <div className='bg-white flex flex-col  py-2 px-4 gap-1 cursor-pointer w-[350px]  absolute -top-36 right-4 rounded-lg shadow-md z-20'>
                            <div className='flex items-center gap-3 rounded-md hover:bg-gray-200 p-2 '>
                            <MdOutlinePhotoLibrary fontSize={22} />
                            <p className='flex text-lg font-medium'>Select Photo</p>
                            </div>
                            <input accept='.png,.jpeg,.jpg'  type="file" hidden ref={coverPickerRef} onChange={addCoverToPost} />
                            <div onClick={()=> {coverPickerRef.current.click()}} className='flex items-center gap-3 rounded-md hover:bg-gray-200 p-2'>
                            <HiArrowUpTray fontSize={22} />
                            <p className='flex text-lg font-medium'>Upload Photo</p>
                            </div>
                            <div className='flex items-center gap-3 rounded-md hover:bg-gray-200 p-2'>
                            <ImBin fontSize={22} />
                            <p className='flex text-lg font-medium'>Remove</p>
                            </div>
                        </div>
            } 
                
                {selectedCover ? 
                <div className='w-full '>
                    <img src={selectedCover} alt="" className='rounded-md object-cover  m-auto w-4/5 h-[200px]' />
                </div>
                : <p className='text-center font-light text-xl'>Please upload a cover picture</p>}
                                
            </div>
            
            <div className='space-y-4  h-[20rem] p-4 bg-white rounded-md shadow-md w-full'>
                <h3 className='text-xl font-bold'>Customize your intro</h3>
                <p onClick={()=> setShowDetails(true)} className='bg-gray-200 p-2 rounded-md font-medium text-center cursor-pointer hover:bg-gray-300'>Edit details</p>
                <div className='w-full flex items-center gap-3'>
                  <FiHome fontSize={24} className="text-gray-500" />
                  <p className='font-light'>Lives in <span className='font-medium'>{user?.live}</span></p>
                </div>
                <div className='w-full flex items-center gap-3'>
                  <MdLocationOn fontSize={24} className="text-gray-500" />
                  <p className='font-light'>From <span className='font-medium'>{user?.from}</span></p>
                </div>
                <div className='w-full flex items-center gap-3'>
                  <AiFillHeart fontSize={24} className="text-gray-500" />
                  <p className='font-light capitalize'> {user?.relationShip}</p>
                </div>
                <div className='w-full flex items-center gap-3'>
                  <FiWifi fontSize={24} className="text-gray-500 rotate-45" />
                  <p className='font-light'>Followed by <span className='font-medium'>{user?.friends.length}</span> people</p>
                </div>
            </div>
            {showDetails &&  
            <div  className='h-screen w-screen fixed top-0 left-0 right-0  flex  flex-col items-center justify-center bg-white bg-opacity-40 z-[999]' >
              <div style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className='bg-white w-[36rem] flex flex-col rounded-md  px-8 pb-4'>
                  <div className='flex items-center w-full py-3 border-b'>
                      <p className='text-2xl font-bold flex-1 text-center'>Edit Details</p>
                      <div onClick={()=> setShowDetails(false)} className='p-2 bg-gray-200 rounded-full cursor-pointer '>
                          <RxCross2 fontSize={26} className='text-gray-500' />
                      </div>
                  </div>
                  <div className='w-full py-2 space-y-2'>       
                      <p className='text-lg font-medium'>Current city</p>
                      <input value={live} onChange={onchange} name='live' type="text" className='border rounded-md w-full  outline-none py-2 px-3 bg-transparent' />
                  </div>
                  <div className='w-full py-2 space-y-2'>       
                      <p className='text-lg font-medium'>Hometown</p>
                      <input value={from} onChange={onchange} name='from' type="text" className='border rounded-md w-full  outline-none py-2 px-3 bg-transparent' />
                  </div>
                  <div className='w-full py-2 space-y-2'>       
                      <p className='text-lg font-medium'>RelationShip</p>
                      <input value={relationShip} onChange={onchange} name='relationShip' type="text" className='border rounded-md w-full  outline-none py-2 px-3 bg-transparent' />
                  </div>
                  <div onClick={()=> setShowDetails(false)} className=' rounded-md  w-[120px] font-medium p-[4px] my-3 cursor-pointer hover:bg-blue-600 text-lg text-center bg-blue-500 text-white'>       
                      <p>save</p>
                  </div>
              </div>
            </div>}
            {
                    <div onClick={handlePost} className='w-full rounded-lg font-medium p-[4px] mb-3 cursor-pointer hover:bg-blue-600 text-lg text-center bg-blue-500 text-white'>       
                        <p>Update</p>
                    </div>}
        </div>
    </div>
  )
}

export default EditProfileForm