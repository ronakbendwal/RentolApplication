import {createSlice} from '@reduxjs/toolkit'

const FormOpenDataSlice=createSlice({
  name:"formopendata",
  initialState:{
    selectedCategory:""
  },
  reducers:{
    setSelectedCategory:(state,action)=>{
      state.selectedCategory=action.payload;
    }
  }
});

export const {setSelectedCategory}=FormOpenDataSlice.actions;

export default FormOpenDataSlice.reducer;