import React, { useEffect } from 'react'
import { useState } from 'react'
import Feed from '../components/facebook/Feed'
import Form from '../components/facebook/Form'
import Hero from '../components/facebook/Hero'
import InputForm from '../components/facebook/InputForm'
import Navbar from '../components/facebook/Navbar'
import Posts from '../components/facebook/Posts'

import {RxCross2} from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { updateuser } from '../features/auth/authSlice'
import { useParams } from 'react-router-dom'
import { API } from '../api'
import Intro from '../components/facebook/Intro'
import AllFriends from '../components/facebook/AllFriends'
import AllPhotos from '../components/facebook/AllPhotos'
const Profile = () => {
  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()
  const [profile, setProfile] = useState();
  const params = useParams()
  const [active, setactive] = useState('Posts');
  const [details, setDetails] = useState({
    live: '',
    from: '',
    relationShip: ''
  })


  const {live, from, relationShip} = details
  useEffect(()=>{
      const getuser = async()=>{
        try{
          const user =  await API.get(`/api/users/find/${params?.username}`)
          
          setProfile(user.data)
        }
        catch(error){
          console.log(error.message)
        }
      }
      getuser()

  },[params])
  const onchange = (e)=>{
    setDetails((prevState) => ({
      ...prevState,[e.target.name]: e.target.value
  }))  
  }
  const handleUpdate = ()=>{
    dispatch(updateuser({
      id: profile?._id,
      live,
      from, 
      relationShip
    }))
    setDetails({
    live: '',
    from: '',
    relationShip: ''
    })
    setShowDetails(false)
  }

  return (
    <div className='h-screen max:w-screen flex relative flex-col items-center bg-slate-100 overflow-x-hidden overflow-y-scroll'>
        {
          profile && <>
          {showForm && <Form setShowForm={setShowForm}/>}
        <Navbar />
        <Hero profile={profile} active={active} setactive={setactive} />
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
                  <div onClick={handleUpdate} className=' rounded-md  w-[120px] font-medium p-[4px] my-3 cursor-pointer hover:bg-blue-600 text-lg text-center bg-blue-500 text-white'>       
                      <p>save</p>
                  </div>
              </div>
            </div>}
        <div className='w-full xl:w-[70vw] flex flex-col  md:flex-row p-3 gap-3 justify-center '>

            {
              active === "Posts" && <>
              <Intro profile={profile} setShowDetails={setShowDetails} />
              <div className='w-full space-y-3'>
                  <Feed profile={profile} setShowForm={setShowForm}/>
              </div>
              </>
            }
            {
              active === "Abouts" && <>
              <p>About</p>
              </>
            }
            {
              active === "Friends" && <AllFriends profile={profile}/>
            }
            {
              active === "Photos" && <AllPhotos/>
            }
            {
              active === "Videos" && <>
              <p>Videos</p>
              </>
            }
        </div>
          </>
        }

    </div>
  )
}

export default Profile