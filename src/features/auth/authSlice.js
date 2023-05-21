import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const signup = createAsyncThunk('auth/signup', async(user, thunkAPI) => {
    try{
        
        return await authService.signup(user);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const signin = createAsyncThunk('auth/signin', async(user, thunkAPI) => {
    try{
        return await authService.login(user);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const updateuser = createAsyncThunk('post/updateuser', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        
        //console.log(data)
        return await authService.updateuser(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async(thunkAPI) => {
    try{
        return await authService.logout();
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading= false;
            state.isSuccess= false;
            state.isError= false;
            state.message= ''
        }
    },
    extraReducers:(builder) => { 
        builder
        .addCase(signup.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(signup.rejected, (state, action) => {
            state.isLoading= false;
            state.isError= true;
            state.message= action.payload
            state.user = null
        })
        .addCase(updateuser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateuser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user =  action.payload
        })
        .addCase(updateuser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.user = null
        })
        .addCase(signin.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(signin.rejected, (state, action) => {
            state.isLoading= false;
            state.isError= true;
            state.message= action.payload
            state.user = null
        })
    }
}) 

export const {reset } = authSlice.actions;
export default authSlice.reducer;