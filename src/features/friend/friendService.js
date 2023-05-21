import axios from 'axios';
import {API} from '../../api'

const getFriendList = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.get(`/api/friend/friendList/${data?.userId}`, config);  
    return response.data;
    
}
const sendFriendRequest = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.post('/api/friend/send' , data, config);  
    return response.data;
}

const acceptFriendRequest = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.put(`/api/friend/accept`  , data, config);  
    return response.data;
}

const deleteFriendRequest = async(data, token) => {
 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.put('/api/friend/delete-request', data, config);  
    return response.data;
}

const unFriend = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.put('/api/friend/delete-friend', data, config);  
    return response.data;
}


const postService = {
    getFriendList,
    sendFriendRequest,
    acceptFriendRequest,
    deleteFriendRequest,
    unFriend
}

export default postService;