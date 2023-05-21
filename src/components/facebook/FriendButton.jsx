import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptFriendRequest, deleteFriendRequest, sendFriendRequest, unFriend } from '../../features/friend/friendSlice'

const FriendButton = ({status, setStatus, profile}) => {
    const {user} = useSelector(state => state.auth)
    const {friends} = useSelector(state => state.friends)
    const dispatch = useDispatch()
    

    useEffect(()=>{
        if(friends?.sent?.includes(profile._id)){
            setStatus('Requested')
        }
        else if(friends?.friends?.includes(profile._id)){
            setStatus("Friends")
        }
        else if(friends?.received?.includes(profile._id)){
            setStatus('Confirm')}
        else{
            setStatus("Add Friend")
        }
        },[friends])


    const handleFriendShip = ()=>{
        if(status === "Add Friend"){
           dispatch(sendFriendRequest({
            userId: user?._id,
            receiverId: profile?._id
           }))
           setStatus("Requested")
        }
        else if(status === "Confirm"){
            dispatch(acceptFriendRequest({
                userId: user?._id,
                senderId: profile?._id
               }))
           setStatus("Friends")
        }
        else if(status === "Requested"){
            dispatch(deleteFriendRequest({
                userId: user?._id,
                receiverId: profile?._id
               }))
           setStatus("Add Friend")
        }
        else{
            dispatch(unFriend({
                person1: user?._id,
                person2: profile?._id
               }))
           setStatus("Add Friend")
        }
    }
    
  return (
    <div>
        <p onClick={handleFriendShip} className='font-medium text-white'>{status}</p>
    </div>
  )
}

export default FriendButton