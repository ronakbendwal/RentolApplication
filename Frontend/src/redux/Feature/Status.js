import { createSlice } from "@reduxjs/toolkit";

const ComponentStatusSlice=createSlice({
  name:'componentstatus',
  initialState:{
    logoutComponentStatus:false,
    sideBarComponentStatus:false,
  },
  reducers:{
    setLogoutStatus:(state,action)=>{
      state.logoutComponentStatus=action.payload
    },
    setSideBarStatus:(state,action)=>{
      state.sideBarComponentStatus=action.payload
    }
  }
})


export const {setSideBarStatus,setLogoutStatus}=ComponentStatusSlice.actions

export default ComponentStatusSlice.reducer