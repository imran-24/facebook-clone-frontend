import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import friendService from "./friendService";

export const getFriendList = createAsyncThunk('friend/getFriendList', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await friendService.getFriendList(data, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const sendFriendRequest = createAsyncThunk('friend/sendFriendRequest', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        //console.log(data);
       
        return await friendService.sendFriendRequest(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const acceptFriendRequest = createAsyncThunk('friend/acceptFriendRequest', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        
        //console.log(data)
        return await friendService.acceptFriendRequest(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteFriendRequest = createAsyncThunk('friend/deleteFriendRequest', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        
        //console.log(data)
        return await friendService.deleteFriendRequest(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const unFriend = createAsyncThunk('friend/unFriend', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        
        //console.log(data)
        return await friendService.unFriend(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})




const initialState = {
    friends: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: false
}

export const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers:{
        reset: (state) => initialState,
        remove: (state, action) => {
            state.friends = state.friends.filter(friend => friend._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFriendList.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFriendList.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.friends = action.payload
        })
        .addCase(getFriendList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(acceptFriendRequest.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(acceptFriendRequest.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.friends.push(action.payload)
        })
        .addCase(acceptFriendRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        // .addCase(unFriend.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(unFriend.fulfilled, (state, action) =>{
        //     state.isLoading = false;
        //     state.isSuccess = true;
        //     state.friends = state.friends.filter(friend => friend !== action.payload)
        // })
        // .addCase(unFriend.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.message = action.payload;
        // })
        

    }
})

export const {reset, remove} = friendSlice.actions;
export default friendSlice.reducer;