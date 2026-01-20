import { createSlice } from "@reduxjs/toolkit";

const ProfilePictureSlice=createSlice({
  name:'profilepicture',
  initialState:{
    profileImage:null
  },
  reducers:{
    setProfileImage:(state,action)=>{
      state.profileImage=action.payload
    }
  }
})

export const {setProfileImage}=ProfilePictureSlice.actions;

export default ProfilePictureSlice.reducer