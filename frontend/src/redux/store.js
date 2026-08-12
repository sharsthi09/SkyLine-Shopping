import { configureStore } from '@reduxjs/toolkit'
import AdminReducer from './reducers/AdminSlice';
import  UserSlice  from './reducers/UserSlice';


const store = configureStore({
  reducer: {
    admin: AdminReducer,
    user: UserSlice
  },
})

export default store;