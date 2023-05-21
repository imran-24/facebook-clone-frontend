import React from 'react'
import Home from './page/Home'
import './App.css'
import Profile from './page/Profile'
import SignIn from './page/SignIn'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Messenger from './page/Messenger'
import { useEffect } from 'react'
import SignUp from './page/Signup'
import Form from './components/facebook/Form'
import Save from './page/Save'
import FriendRequest from './page/FriendRequest'

const App = () => {
  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user) navigate('/signin')
    else{
      navigate('/')
    }
  },[user])
  return (
    <div className='h-screen max:w-screen overflow-hidden '>
         
      {
            !user ?
            <Routes>
              <Route path="/signin" element={ <SignIn /> } />
              <Route path="/signup" element={ <SignUp /> } />
            </Routes>
            : 
            <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/friends" element={ <FriendRequest /> } />
            <Route path="/profile/:username" element={ <Profile /> } />
            <Route path="/saved/:id" element={ <Save /> } />
            <Route path="/messanger" element={ <Messenger /> } />
        </Routes>
      }
          
   
    </div>
  )
}

export default App