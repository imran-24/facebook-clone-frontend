import axios from 'axios';
import {API} from '../../api'

const getpost = async(data, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
   
    const response = await API.get(data?.username ? `/api/post/profile/${data?.username}` : `/api/post/${data?.id}`, config);  
    return response.data;
    
}
const addpost = async(data, token) => {
   
   
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.post('/api/post/' , data, config);  
    return response.data;
}

const updatepost = async(data, token) => {
   
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.put('/api/post/' + `${data.id}`  , data, config);  
    return response.data;
}

const likepost = async(data, token) => {
 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.put('/api/post/' + `like/${data.id}`, data, config);  
    return response.data;
}

const commentpost = async(data, token) => {
 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.put('/api/post/' + `comment/${data.id}`, data, config);  
    return response.data;
}

const savepost = async(data, token) => {
 
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.put('/api/post/' + `save/${data.userId}`, data, config);  
    return response.data;
}

const deletepost = async(data, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.delete(`/api/post/${data.id}`, config); 
    return response.data;
}
const postService = {
    addpost,
    getpost,
    updatepost,
    likepost,
    commentpost,
    deletepost,
    savepost
}

export default postService;