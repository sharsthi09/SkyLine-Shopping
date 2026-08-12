import { createSlice } from '@reduxjs/toolkit'


export const AdminSlice = createSlice({
  name: 'admin',
  initialState:{
    data: null,
    token:null
  },
  reducers: {
    login: (state,current) => {
      
      localStorage.setItem("adminData",JSON.stringify(current.payload.data));
      state.data=current.payload.data;

      const token = current.payload.token;

      // CLEAN it just in case
      const cleanedToken = token.replace(/^"+|"+$/g, '').replace(/\\/g, '');
    
      localStorage.setItem("adminToken", cleanedToken);
      state.token = cleanedToken;
      
      console.log(cleanedToken);
    },
    logout: (state,current) => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      state.data=null;
      state.token=null;
    },
  },
})

// Action creators are generated for each case reducer function
export const {login,logout} = AdminSlice.actions

export default AdminSlice.reducer