import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {BsFacebook} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signin } from '../features/auth/authSlice';
import { useRef } from 'react';
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const email = useRef();
  const password = useRef();
    const onchange = (e) =>{
      setFormData((prevState) => ({
          ...prevState,[e.target.name]: e.target.value
  }))   
  }
    // const { email, password } = formData;
  
    const handleSignin = (e) => {
      e.preventDefault();
      dispatch(signin({
          email: email.current.value, 
          password: password.current.value,   
      }))
      setFormData({ 
        email: "",
        password: "",
      })
      
    }
  return (
    <div className='h-screen w-screen flex items-center justify-center relative bg-slate-100'>
        <div className='flex flex-col items-center justify-center gap-4 absolute top-6'>
            <div>
                <img className='h-8 inline-flex' src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png" alt="" />
                <p className='text-blue-500  px-4 inline-flex '>Welcome to facebook</p>
            </div>
            <p onClick={()=> navigate('/signup')} className='text-white cursor-pointer   font-medium capitalize hover:bg-blue-700 transition-all duration-200 ease-out text-center rounded shadow-md bg-blue-500 px-3 py-1 flex items-center ' >sign up</p>
        </div>
        <form onSubmit={handleSignin} className=' h-[20rem] w-[26rem] flex flex-col items-center justify-center gap-4 bg-white rounded-md shadow-md'>
            <BsFacebook fontSize={40} className='text-blue-500' />
            <div className=' border-2 py-2  px-4 rounded-md'>
                <input onChange={onchange} ref={email} required  type="text" name='email' className='text-gray-500 w-[250px] bg-transparent border-none outline-none' placeholder='email' />
            </div>
            <div className=' border-2 py-2  px-4 rounded-md'>
                <input onChange={onchange} ref={password} minLength="8" required type="password" name='password' className='text-gray-500 w-[250px] bg-transparent border-none outline-none' placeholder='password' />
            </div>
            <div className='text-white cursor-pointer hover:bg-blue-700 transition-all duration-200 ease-out text-center rounded shadow-md bg-blue-500 px-4 text-sm py-2 flex items-center '>
                {/* <img className='h-6 w-6' src="https://cdn.icon-icons.com/icons2/1826/PNG/512/4202107facebookfblogosocialsocialmedia-115710_115591.png" alt="" /> */}
                <button   className='  font-medium capitalize' >sign in </button>
            </div>
        </form>
    </div>
  )
}

export default SignIn