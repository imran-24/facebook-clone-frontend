import axios from 'axios';
import {API} from '../../api'


//Register User
const signup = async(userData) => {
    
    const response = await API.post('/api/users/signup/', userData);
    
    
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

//signin User
const login = async(userData) => {
    
    const response = await API.post('/api/users/login/', userData);
    
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const updateuser = async(data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await API.put('/api/users/' + `${data.id}`  , data, config);  
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

// logout user
const logout = async(userData) => {
    
    localStorage.removeItem('user');

}

const authService = {
    signup,
    login,
    logout,
    updateuser
}

export default authService;