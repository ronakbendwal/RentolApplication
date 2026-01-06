import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice=createSlice({
  name:'theme',
  initialState:{
    thememode:"light",
    isThemeOpen:false
  },
  reducers:{
    setThemeMode:(state,action)=>{
      state.thememode=action.payload
    },
    setIsThemeOpen:(state,action)=>{
      state.isThemeOpen=action.payload
    }
  }
});

export const {setThemeMode,setIsThemeOpen}=ThemeSlice.actions;

export default ThemeSlice.reducer;