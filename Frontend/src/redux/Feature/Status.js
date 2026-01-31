import { createSlice } from "@reduxjs/toolkit";

const ComponentStatusSlice=createSlice({
  name:'componentstatus',
  initialState:{
    logoutComponentStatus:false,
    sideBarComponentStatus:false,
    heartStatus:false
  },
  reducers:{
    setLogoutStatus:(state,action)=>{
      state.logoutComponentStatus=action.payload
    },
    setSideBarStatus:(state,action)=>{
      state.sideBarComponentStatus=action.payload
    },
    setHeartStatus:(state,action)=>{
      state.heartStatus=action.payload
    }
  }
})


export const {setSideBarStatus,setLogoutStatus,setHeartStatus}=ComponentStatusSlice.actions

export default ComponentStatusSlice.reducer