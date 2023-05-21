import { configureStore } from '@reduxjs/toolkit';
import friendReducer from '../features/friend/friendSlice';
import postReducer from '../features/post/postSlice';
import authReducer from '../features/auth/authSlice'
import saveReducer from '../features/save/saveSlice'


export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authReducer,
    save: saveReducer,
    friends: friendReducer,
  },
});
