import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const wishlistapi=createAsyncThunk(
  'wishlist/apicall',
  async (itemId) => {
  console.log("inside wish list async thunk api call ")
  const res = await axios.post(`/api/user/wish-list-item/${itemId}`);
  console.log("inside wishlist api data",res.data);
  return res.data;
  })

const WishlistItemSlice=createSlice({
  name:"wishlistitem",
  initialState:{
    wishlist:[],
    loading:false
  },
  reducers:{
    setWishList:(state,action)=>{
      state.wishlist=action.payload
    }
  },

  extraReducers:(builder)=>{
    builder
    .addCase(wishlistapi.pending,(state)=>{
      state.loading=true
    })
    .addCase(wishlistapi.fulfilled,(state,action)=>{
      state.loading=false;
      const wishlistData=action.payload.data;
      console.log(wishlistData);
      state.wishlist=wishlistData
    })
  }
  }
)

export const {setWishList}=WishlistItemSlice.actions;

export default WishlistItemSlice.reducer;