import React, { useEffect } from 'react'
import { AiFillCamera } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { IoIosAddCircle } from 'react-icons/io'
import { MdEdit } from 'react-icons/md'
import {MdOutlinePhotoLibrary} from 'react-icons/md'
import {HiArrowUpTray} from 'react-icons/hi2'
import {ImBin} from 'react-icons/im'
import {useSelector, useDispatch} from 'react-redux'
import { useState, useRef } from 'react'
import EditProfileForm from './EditProfileForm'
import { updateuser } from '../../features/auth/authSlice'
import {RxCross2} from 'react-icons/rx'
import {MdLibraryAdd} from 'react-icons/md'
import { HiUserAdd } from 'react-icons/hi'
import { RiMessengerFill } from 'react-icons/ri'
import FriendButton from './FriendButton'
const Hero = ({profile, active, setactive}) => {
    const [editCover, setEditCover] = useState(false);
    const {user} = useSelector(state => state.auth)
    const [editDp, setEditDp] = useState(false);
    const {friends} = useSelector(state => state.friends)

    const [editProfile, setEditProfile] = useState(false);
    const filePickerRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState('');
    const [status, setStatus] = useState();
    const dispatch = useDispatch()
    const activeBtn = "h-[3.2rem] w-[5rem]  flex items-center justify-center font-medium  text-blue-500 border-b-2 border-blue-500 cursor-pointer"
    const notActiveBtn = "h-[3.2rem] w-[5rem]  flex items-center justify-center font-medium  hover:bg-gray-200 rounded-lg cursor-pointer text-gray-500"
    

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    

      const handleCoverPost = ()=>{ 
        dispatch(updateuser({
            id: profile?._id,
            coverPicture: selectedFile,  
        }))
        setEditCover(false)
        setSelectedFile('')
      }

      const handleProfilePost = ()=>{ 
        dispatch(updateuser({
            id: profile?._id,
            profilePicture: selectedFile,  
        }))
        setEditDp(false)
        setSelectedFile('')
      }
   
  return (
    <div className='h-[80vh] w-screen flex flex-col items-center gap-4 '>
        <div style={{backgroundImage: 'linear-gradient(to bottom, #484848, #fcfcfc,  #ffffff)'}} className='w-full flex items-center justify-center shadow-sm'>
            <div className=' w-full xl:w-[70vw]  transition-all duration-200 ease-in-out'>
                {
                    editProfile && <EditProfileForm setEditProfile={setEditProfile} />
                }
                {/* cover */}
                <div className='w-full relative'>
                    <img src={profile?.coverPicture} alt="" className='w-full h-[30vh] md:h-[35vh] lg:h-[45vh] xl:h-[50vh] rounded-b-lg object-cover' />
                    
                    {profile?._id === user?._id &&
                        <div onClick={()=> setEditCover(!editCover)} className='bg-white flex py-2 px-4 gap-2 cursor-pointer hover:bg-gray-200 absolute bottom-4 right-4 rounded-md z-10 duration-200 ease-in-out transition-all'>
                        <AiFillCamera fontSize={22} />
                        <p className='hidden lg:flex font-medium'>Edit cover photo</p>
                        </div>}
                    { editCover &&
                       <div className='bg-white flex flex-col  py-2 px-4 gap-1 cursor-pointer w-[350px]  absolute -bottom-36 right-4 rounded-lg shadow-md z-20'>
                            <div className='flex items-center gap-3 rounded-md hover:bg-gray-200 p-2 '>
                            <MdOutlinePhotoLibrary fontSize={22} />
                            <p className='flex text-lg font-medium'>Select Photo</p>
                            </div>
                            <input accept='.png,.jpeg,.jpg'  type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                            <div onClick={()=> {filePickerRef.current.click()}} className='flex items-center gap-3 rounded-md hover:bg-gray-200 p-2'>
                            <HiArrowUpTray fontSize={22} />
                            <p className='flex text-lg font-medium'>Upload Photo</p>
                            </div>
                            <div className='flex items-center gap-3 rounded-md hover:bg-gray-200 p-2'>
                                <ImBin fontSize={22} />
                                <p className='flex text-lg font-medium'>Remove</p>
                            </div>
                        </div>
                    }
                    {
                        (selectedFile && editCover) &&
                        <div  className='h-screen w-screen fixed top-0 left-0 right-0  flex  flex-col items-center justify-center bg-white bg-opacity-40 z-[999] overflow-hidden' >
                            <div style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className='bg-white  flex flex-col  gap-6 rounded-md  p-4 '>
                            <div className='flex items-center w-full py-3 border-b'>
                                    <p className='text-2xl font-bold flex-1 text-center'>Update Cover Photo</p>
                                    <div className='p-2 bg-gray-200 rounded-full cursor-pointer '>
                                        <RxCross2 fontSize={26} className='text-gray-500' onClick={()=> {setEditCover(false)
                                        setSelectedFile('')}} />
                                    </div>
                                </div>
                                <img src={selectedFile} className='w-full h-[30vh] md:h-[35vh] lg:h-[45vh] xl:h-[50vh] rounded-lg object-cover' alt="" />
                                <div onClick={handleCoverPost} className='w-full rounded-lg font-medium p-[4px] cursor-pointer hover:bg-blue-600 text-lg text-center bg-blue-500 text-white'>       
                                    <p>Post</p>
                                </div>
                            </div>
                        </div>
                        
                    }
                    
                    <div className='h-[200px] w-full lg:w-[200px] absolute lg:left-8 lg:-bottom-[160px]   -bottom-[100px]'>
                        <img src={profile?.profilePicture} alt="" className='h-[200px] w-[200px]  rounded-full m-auto border-[6px] border-white'/>
                        {profile?._id === user?._id &&
                         <div onClick={()=> setEditDp(true)} className='w-full lg:w-10    cursor-pointer  absolute bottom-4 lg:left-36 left-16    z-10'>
                            <AiFillCamera   className='m-auto w-10 h-10  bg-gray-200 hover:bg-gray-300 p-[6px] rounded-full'/>
                        </div>}
                    </div>

                    {
                        editDp && 
                        <div  className='h-screen w-screen fixed top-0 left-0 right-0  flex  flex-col items-center justify-center bg-white bg-opacity-40 z-[999] overflow-hidden' >
                            <div style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className='bg-white w-[36rem] flex flex-col gap-3 rounded-md  px-4 pb-4'>
                                <div className='flex items-center w-full py-3 border-b'>
                                    <p className='text-2xl font-bold flex-1 text-center'>Update Profile Picture</p>
                                    <div className='p-2 bg-gray-200 rounded-full cursor-pointer '>
                                        <RxCross2 fontSize={26} className='text-gray-500' onClick={()=> {setEditDp(false)
                                        setSelectedFile('')}} />
                                    </div>
                                </div>
                            {
                                selectedFile ? 
                                <img src={selectedFile} className='h-[16rem] w-full object-contain' alt="" />
                                : <>
                                <input accept='.png,.jpeg,.jpg'  type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                                <div onClick={()=> filePickerRef.current.click()} className='flex flex-col items-center justify-center cursor-pointer'>
                                    <MdLibraryAdd fontSize={24} className='text-blue-500'  />
                                    <p className='text-xl'>Upload Photos</p>
                                    <p className='text-gray-500 text-xs'>or drag and drop</p>
                                </div>
                                </>
                            }
                
                            {(selectedFile )&& 
                                <div onClick={handleProfilePost} className='w-full rounded-lg font-medium p-[4px] mb-3 cursor-pointer hover:bg-blue-600 text-lg text-center bg-blue-500 text-white'>       
                                    <p>Post</p>
                                </div>}
                        </div>
                        
                        
                    </div>}
                </div>
                {/*profile info */}
                <div className='transition-all h-[12rem] w-full mt-[100px] lg:mt-0 lg:pl-[250px] duration-200 ease-in-out flex lg:flex-row flex-col items-center lg:items-start  lg:justify-between gap-3 px-4'>
                    
                        <div className='flex lg:flex-row flex-col  items-center gap-4'>
                            <div className='space-y-2'>
                                <p className='text-[40px] font-bold'>{profile?.fullname}</p>
                                <p className='text-gray-500 text-xl text-center lg:text-left'>{friends?.friends?.length} friends</p>
                            </div>
                        </div>
                        {profile?._id === user?._id ?
                        <div className='flex items-center justify-center lg:pt-24 gap-2'>
                            <div className='flex w-[140px] items-center justify-center gap-1 bg-blue-500 rounded-md px-3 py-2'>
                                <IoIosAddCircle fontSize={20} className='text-white' />
                                <p className='font-medium text-white'>Add to story</p>
                            </div>
                            <div onClick={()=> setEditProfile(!editProfile)} className='flex w-[140px] items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md p-2'>
                                <MdEdit fontSize={20} />
                                <p className='font-medium'>Edit profile</p>
                            </div>
                        </div>
                        :<div className='flex items-center justify-center lg:pt-24 gap-2'>
                        <div className='flex w-[140px] items-center justify-center gap-1 bg-blue-500 cursor-pointer hover:to-blue-600 rounded-md px-3 py-2'>
                            <HiUserAdd fontSize={24} className='text-white' />
                            
                            <FriendButton status={status} setStatus={setStatus} profile={profile} />
                            
                        </div>
                        <div onClick={()=> setEditProfile(!editProfile)} className='flex w-[140px] items-center justify-center gap-1 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md p-2'>
                            <RiMessengerFill fontSize={24} />
                            <p className='font-medium'>Message</p>
                        </div>
                    </div>}

                </div>
                {/* options */}
                <div className='w-full h-[4rem] flex flex-re items-center gap-2 px-4 py-2  border-t border-gray-00 '>
                    <p onClick={()=> setactive("Posts")} className={active === "Posts" ? activeBtn : notActiveBtn}>Posts</p>
                    <p onClick={()=> setactive("Abouts")} className={active === "Abouts" ? activeBtn : notActiveBtn}>Abouts</p>
                    <p onClick={()=> setactive("Friends")} className={active === "Friends" ? activeBtn : notActiveBtn}>Friends</p>
                    <p onClick={()=> setactive("Photos")} className={active === "Photos" ? activeBtn : notActiveBtn}>Photos</p>
                    <p onClick={()=> setactive("Videos")} className={active === "Videos" ? activeBtn : notActiveBtn}>Videos</p>
                    <p onClick={()=> setactive("Check-ins")} className={active === "Check-ins" ? activeBtn : notActiveBtn}>Check-ins</p>
                    <p className='h-[3.2rem] w-[5rem] flex items-center justify-center font-medium  text-gray-500'>More</p>
                    <div className='flex-1 h-full flex items-center justify-end '>
                        <FiMoreHorizontal className='text-gray-500 h-[2.8rem] w-[2.8rem] p-2 rounded-md bg-gray-200' />
                    </div>
                </div>

            </div>
        </div>
        
       
        
        
    </div>
  )
}

export default Hero