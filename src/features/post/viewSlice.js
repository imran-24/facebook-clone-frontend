import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
};


export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    view : null,
   },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    
    setview: (state, action) => {
      state.view = action.payload;
    },

    resetview: (state) => {  
      state.view = null;
    },
    
  },
 
});


export const { setview, resetview } = viewSlice.actions;

// pull the view from redux dataLayer
export const selectview = (state) => state.view.view;


export default viewSlice.reducer;

