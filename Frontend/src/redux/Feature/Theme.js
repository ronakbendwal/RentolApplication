import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice=createSlice({
  name:'theme',
  initialState:{
    thememode:"light"
  },
  reducers:{
    setThemeMode:(state,action)=>{
      state.thememode=action.payload
    },
  }
});

export const {setThemeMode}=ThemeSlice.actions;

export default ThemeSlice.reducer;