import React from 'react'
import Navbar from '../components/facebook/Navbar'
import ChatList from '../components/messanger/ChatList'
import Inbox from '../components/messanger/Inbox'
import Sidebar from '../components/messanger/Sidebar'
import SignIn from './SignIn'
import LeftSidebar from '../components/facebook/LeftSidebar'
import Feed from '../components/facebook/Feed'
import RightSidebar from '../components/facebook/RightSidebar'
import Form from '../components/facebook/Form'

import {useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'

const Home = () => {
  const [showForm, setShowForm] = useState(false)
  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch();

  return (
    <div  className='h-screen w-screen flex relative  flex-col bg-slate-100'>
        {showForm && <Form setShowForm={setShowForm}/>}
        
        <Navbar />
        <div className='w-screen flex  justify-between py-4 px-6'>
          <section className='w-[360px] hidden xl:block'>
            <LeftSidebar />
          </section>
          <section className='w-[620px] mx-auto h-screen  overflow-y-scroll scrollbar-none sticky top-0'>
            <Feed setShowForm={setShowForm}/>
          </section>
          <section className='w-[360px] hidden lg:block'>
            <RightSidebar />
          </section>
        </div>
        {/* <Sidebar />
        <ChatList />
        <Inbox /> */}
        {/* <SignIn /> */}
    </div>
  )
}

export default Home