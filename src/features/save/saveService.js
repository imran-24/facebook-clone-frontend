import axios from 'axios';
import {API} from '../../api'



//signin User
const getallsave = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await API.get(`/api/saved/${data.userId}`, config);
    return response.data;
}

const updatesave = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.put(`/api/saved/${data.userId}`, data, config);  
    console.log(response.data)
    return response.data;
}

const authService = {
    updatesave,
    getallsave
}

export default authService;