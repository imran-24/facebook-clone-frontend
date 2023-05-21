import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import InputForm from './InputForm'
import Posts from './Posts'

const Feed = ({profile, setShowForm}) => {
  const {user} = useSelector(state => state.auth)
  const params = useParams();

  return (
    <div className='flex flex-col gap-4 w-full pb-20'>
        {/* header */}
        <div className=''>
           
        </div>
        {/* input */}
        {(user?._id === profile?._id || !params?.username ) && 
          <InputForm setShowForm={setShowForm}/>}
        {/* posts */}
        <Posts />
    </div>
  )
}

export default Feed