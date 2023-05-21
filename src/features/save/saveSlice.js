import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import saveService from "./saveService";


const initialState = {
    save: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// export const createsave = createAsyncThunk('save/createsave', async(data, thunkAPI) => {
//     try{
//         return await saveService.createsave(data);
//     }
//     catch(error){
//         const message = (error.response && error.response.data && error.response.data.message)
//                         || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message);
//     }
// })

export const getallsave = createAsyncThunk('save/getallsave', async(data, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await saveService.getallsave(data, token);
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const updatesave = createAsyncThunk('save/updatesave', async(data,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token;
        return await saveService.updatesave(data, token);

     
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const saveSlice = createSlice({
    name: 'save',
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
        
        
        .addCase(getallsave.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(getallsave.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.save = action.payload
        })
        .addCase(getallsave.rejected, (state, action) => {
            state.isLoading= false;
            state.isError= true;
            state.message= action.payload
            state.save = null
        })
    }
}) 

export const {reset } = saveSlice.actions;
export default saveSlice.reducer;