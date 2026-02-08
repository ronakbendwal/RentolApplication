import { createSlice } from "@reduxjs/toolkit";
import { storeData ,getData} from "../../LocalStorage/localStorage";
const dataFromStore=getData('theme')
const ThemeSlice=createSlice({
  name:'theme',
  initialState:{
    thememode:dataFromStore|| "light",
    isThemeOpen:false
  },
  reducers:{
    setThemeMode:(state,action)=>{
      state.thememode=action.payload
      storeData('theme',state.thememode)
    },
    setIsThemeOpen:(state,action)=>{
      state.isThemeOpen=action.payload
    }
  }
});

export const {setThemeMode,setIsThemeOpen}=ThemeSlice.actions;

export default ThemeSlice.reducer;