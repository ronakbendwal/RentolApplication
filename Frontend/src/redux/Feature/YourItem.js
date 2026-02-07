import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
export const deleteYourItemApi=createAsyncThunk(
  'deleteyouritem/apicall',
  async(itemid)=>{
    console.log('inside delete item api call')
    try{
      console.log("entered in phase 1")
    const deleteItemResponse=await axios.delete(`/api/user/deleteitem/${itemid}`)
    console.log("1st phase pass")
    console.log(deleteItemResponse)
    return deleteItemResponse.data
    }catch(err){
      console.log(err)
    }
  }
)
const YourItemSlice=createSlice({
  name:'youritem',
  initialState:{
    fetchedData:[],
    loading:false,
  },
  reducers:{
    setYourItem:(state,action)=>{
    state.loading=true
    state.fetchedData=action.payload
    state.loading=false
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(deleteYourItemApi.pending,(state)=>{
      state.loading=true
    })
    .addCase(deleteYourItemApi.fulfilled,(state,action)=>{
      state.loading=false
      const id=action.payload.data
      state.fetchedData=state.fetchedData.filter((item)=>(
        item._id!==id.itemId
      ))
    });
  }
})


export const {setYourItem} =YourItemSlice.actions;
export default YourItemSlice.reducer;