import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

export const getpost = createAsyncThunk('post/getpost', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postService.getpost(data, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const setpost = createAsyncThunk('post/setpost', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        //console.log(data);
       
        return await postService.addpost(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const updatepost = createAsyncThunk('post/updatepost', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        
        //console.log(data)
        return await postService.updatepost(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const likepost = createAsyncThunk('post/likepost', async(data,thunkAPI) => {
    
    try{
        const token = thunkAPI.getState().auth.user.token;
        //console.log(data)
        return await postService.likepost(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const commentpost = createAsyncThunk('post/likepost', async(data,thunkAPI) => {
    
    try{
        const token = thunkAPI.getState().auth.user.token;
        //console.log(data)
        return await postService.commentpost(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const savepost = createAsyncThunk('post/likepost', async(data,thunkAPI) => {
    
    try{
        const token = thunkAPI.getState().auth.user.token;
        //console.log(data)
        return await postService.savepost(data, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const deletepost = createAsyncThunk('post/deletepost', async(id,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await postService.deletepost(id, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

const initialState = {
    posts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: false
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{
        reset: (state) => initialState,
        remove: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(setpost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(setpost.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.posts.unshift(action.payload)
        })
        .addCase(setpost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updatepost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updatepost.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.posts = state.posts.map(post => {
                if(post?._id === action.payload?._id) return action.payload
                else{
                    return post;
                }
            })
        })
        .addCase(updatepost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        // .addCase(likepost.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(likepost.fulfilled, (state, action) =>{
        //     state.isLoading = false;
        //     state.isSuccess = true;
        //     state.posts = state.posts.map(post => {
        //         if(post?._id === action.payload?._id) return action.payload
        //         else{
        //             return post;
        //         }
        //     })
        // })
        // .addCase(likepost.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isError = true;
        //     state.message = action.payload;
        // })

        .addCase(commentpost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(commentpost.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.posts = state.posts.map(post => {
                if(post?._id === action.payload?._id) return action.payload
                else{
                    return post;
                }
            })
        })
        .addCase(commentpost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getpost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getpost.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.posts = (action.payload)
        })
        .addCase(getpost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message   = action.payload;
        })

        .addCase(deletepost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deletepost.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.posts = state.posts.filter(post => post._id !== action.payload._id)
        })
        .addCase(deletepost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

    }
})

export const {reset, remove} = postSlice.actions;
export default postSlice.reducer;