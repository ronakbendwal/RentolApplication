import { createSlice } from "@reduxjs/toolkit";


const SideBarSlice=createSlice({
  name:"sidebarstate",
  initialState:{
    isSidebarOpen:false,
  },
  reducers:{
    setIsSidebarOpen:(state,action)=>{
      state.isSidebarOpen=action.payload
    }
  }
})

export const {setIsSidebarOpen}=SideBarSlice.actions;

export default SideBarSlice.reducer;