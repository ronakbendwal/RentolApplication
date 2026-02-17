import { createSlice } from "@reduxjs/toolkit";

const ComponentStatusSlice=createSlice({
  name:'componentstatus',
  initialState:{
    logoutComponentStatus:false,
    sideBarComponentStatus:false,
    YIEPStatus:null,
    showLocationModal:false
  },
  reducers:{
    setLogoutStatus:(state,action)=>{
      state.logoutComponentStatus=action.payload
    },
    setSideBarStatus:(state,action)=>{
      state.sideBarComponentStatus=action.payload
    },
    setYourItemEditPageStatus:(state,action)=>{
      console.log(action.payload)
      state.YIEPStatus=action.payload
    },
    setShowLocationModal:(state,action)=>{
      state.showLocationModal=action.payload
    }
  }
})


export const {setSideBarStatus,setLogoutStatus,setYourItemEditPageStatus,setShowLocationModal}=ComponentStatusSlice.actions

export default ComponentStatusSlice.reducer