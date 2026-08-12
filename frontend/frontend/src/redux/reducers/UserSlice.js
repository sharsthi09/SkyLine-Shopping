import { createSlice } from '@reduxjs/toolkit'


export const UserSlice = createSlice({
  name: 'user',
  initialState:{
    data: null,
    token:null
  },
  reducers: {
    login: (state,current) => {
      
      localStorage.setItem("userLogin",JSON.stringify(current.payload.data));
      state.data=current.payload.data;

      localStorage.setItem("userToken", current.payload.token);
      state.token = current.payload.token;
    },
    logout: (state) => {
    //   localStorage.removeItem("adminToken");
      localStorage.removeItem("userLogin");
      state.data=null;
    //   state.token=null;
    },
      // ✅ NEW: used after adding an address so UI updates instantly
    updateUser: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("userLogin", JSON.stringify(action.payload));
    },
  },
})

// Action creators are generated for each case reducer function
export const {login,logout,updateUser} = UserSlice.actions

export default UserSlice.reducer