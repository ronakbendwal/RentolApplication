import {createSlice} from '@reduxjs/toolkit'
import { getData } from '../../LocalStorage/localStorage';
const data=getData("auth")
const showlocation=`${data.data.fulllocation.address.city},${data.data.fulllocation.address.state},${data.data.fulllocation.address.country}`
const LocationSlice=createSlice({
  name:'location',
  initialState:{
    location: showlocation|| '',
  },
  reducers:{
    setLocation:(state,action)=>{
      state.location=action.payload
    }
  }
});


export const {setLocation}=LocationSlice.actions;
export default LocationSlice.reducer;
