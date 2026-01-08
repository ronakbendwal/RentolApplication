import { createSlice } from "@reduxjs/toolkit";

const AuthSlice=createSlice({
  name:"auth",
  initialState:{
    data:null,
    status:false
  },
  reducers:{
    loginUser:(state,action)=>{
      state.data=action.payload,
      state.status=true
    },
    logout:()=>{
      state.data=null,
      state.status=false
    }
  }
})

export const {login,logout}=AuthSlice.actions;

export default AuthSlice.reducer