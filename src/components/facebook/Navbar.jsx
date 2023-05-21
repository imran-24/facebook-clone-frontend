import React, { useRef } from 'react'
import { BsFacebook, BsPlayBtn } from 'react-icons/bs'
import { IoIosSearch } from 'react-icons/io'
import { TbGridDots } from 'react-icons/tb'
import { RiMessengerFill } from 'react-icons/ri'
import { IoMdNotifications } from 'react-icons/io'
import { AiFillHome } from 'react-icons/ai'
import {HiOutlineBuildingStorefront} from 'react-icons/hi2'
import {HiOutlineUserGroup} from 'react-icons/hi'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import {AiOutlineLogout} from 'react-icons/ai'
import { useState } from 'react'
import { API } from '../../api'

const Navbar = () => {
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState([]);
  const [clicked, setClicked] = useState(false)
  const searchRef = useRef();
  const navigate = useNavigate();
  const handleLogout = ()=> {
    setClicked(false)
    dispatch(logout())
  }
  const searchUser = ()=>{

    const getuser = async()=>{
      try{
        const users =  await API.get(`/api/users/?search=${searchRef.current.value}`)
        setSearch(users.data)
      }
      catch(error){
        console.log(error.message)
      }
    }
    if(searchRef.current.value !== '') {
      
      getuser()
    } 
  }

  return (
    <div  className='bg-white w-full h-16 flex items-center justify-between px-4 py-2 shadow-md z-[999]'>
        {/* left */}
        {
          clicked && 
          <div style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className=' w-[20rem] absolute top-[3.4rem] right-[1rem]  rounded-md p-3 flex flex-col gap-3 z-[1000] bg-white transition-all duration-200 ease-in-out'>
              <Link to={`/profile/${user?.username}`} className='w-full flex items-center p-3 shadow-lg rounded-lg cursor-pointer bg-white hover:bg-gray-100'>       
                <img src={user?.profilePicture} alt="" className='rounded-full h-9 w-9' />
                <div className='flex-1 flex flex-col justify-evenly px-4 '>
                    <p className='font-medium text-lg'>{user?.fullname}</p>
                </div>
              </Link>
              <div onClick={handleLogout} className='w-full flex items-center gap-3  p-3 rounded-md hover:bg-gray-100 cursor-pointer'>       
                <AiOutlineLogout fontSize={24} className="" />
                <p className='font-medium text-lg '>Log Out</p>
              </div>

          </div>
        }
        <div className='flex items-center gap-3 flex-1 '>
            <Link to={'/'}>
                <div>
                    <BsFacebook fontSize={40} className='text-blue-500' />
                </div>
            </Link>
            <div className='py-2 relative px-4 flex items-center bg-gray-100  w-[300px] rounded-full border-none'>
                <IoIosSearch fontSize={20} className='text-gray-500' />
                  <input onFocus={() => setIsFocused(true)}
                         onBlur={() => setTimeout(function(){
                         setIsFocused(false)
                       }, 400)}
                         ref={searchRef}
                         onChange={searchUser}
                         type="text" className='px-3 outline-none rounded-md  placeholder:text-gray-500 bg-transparent' placeholder='Search Facebook' />
                  {
                    (isFocused && search?.length > 0) && 
                    <div className='w-[350px]  left-0 absolute top-[60px] bg-white flex flex-col  py-2 px-4 rounded-md shadow-lg gap-2'>
                        {
                        search.length > 0 &&
                        search.map(user => (
                          <div onClick={()=> navigate(`/profile/${user?.username}`)} key={user?._id} className='w-full flex items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer'>       
                            <img src={user?.profilePicture} alt="" className='rounded-full h-10 w-10 ' />
                            <div className='flex-1 flex flex-col justify-evenly px-4 '>
                                <p className='font-medium text-lg'>{user?.fullname}</p>
                            </div>  
                          </div>                           
                                

                        ))
                        }
                    </div>
                  }
            </div>
        </div>

        {/* middle */}
        <div className='flex items-center justify-evenly gap-4 flex-1 '>
                <div className='h-16 flex items-center justify-center w-20 lg:w-28 border-b-[6px] border-blue-500 rounded-sm'>
                <AiFillHome fontSize={30} className='text-blue-500' />
                </div>
                <div className='h-16 flex items-center  justify-center w-20 lg:w-28 '>
                <BsPlayBtn fontSize={30} className='text-gray-500' />            
                </div>
                <div className='h-16 flex items-center  justify-center w-20 lg:w-28 '>
                <HiOutlineBuildingStorefront fontSize={30} className='text-gray-500' />            
                </div>
                <div className='h-16 flex items-center  justify-center w-20 lg:w-28 '>
                <HiOutlineUserGroup fontSize={30} className='text-gray-500' />            
                </div>
        </div>

        {/* right */}
        <div className='flex items-center justify-end gap-3 flex-1'>
            <div className='p-2 bg-gray-200 rounded-full border border-gray-300'>
                <TbGridDots fontSize={24} className='text-black' />
            </div>
            <Link to={'/messanger'}>
                <div className='p-2 bg-gray-200 rounded-full border border-gray-300'>
                    <RiMessengerFill fontSize={24} className='text-black' />
                </div>
            </Link>
            <div className='p-2 bg-gray-200 rounded-full border border-gray-300'>
                <IoMdNotifications fontSize={24} className='text-black' />
            </div>
            <div onClick={()=> {
              setClicked(!clicked)
              console.log(clicked)}}  className='h-10 w-10 cursor-pointer'>
            <img src={user?.profilePicture}   alt="" className='rounded-full h-10 w-10 ' />
            </div>
                      
        </div>
    </div>
  )
}

export default Navbar