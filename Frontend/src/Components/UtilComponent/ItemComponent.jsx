import React, { useEffect, useState } from 'react';
import {  MapPin, Heart, Star} from 'lucide-react';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {wishlistapi} from '../../redux/Feature/WishList.js'
import { setWishList } from '../../redux/Feature/WishList.js';
 const ItemCard2 = ({item}) => {
  const dispatch=useDispatch();
  const {wishlist}=useSelector((state)=>state.wishlistitem)
  console.log(item)
  if(item.status==='Inactive'){
    return null
  }
  return (
    <div className="group curser-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img 
          src={item.images?.[0]?.url } 
          alt={item.itemName || item.itemname}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button
        onClick={()=>dispatch(wishlistapi(item?._id))}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-md hover:bg-white transition-colors shadow-sm">
          <Heart  size={18} className={`${wishlist?.some((w)=>w._id===item?._id) ? "fill-red-500 text-red-500" : 'text-gray-700' } hover:text-red-500 transition-colors`} />
        </button>

        {/* Category Tag */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
          {item.category}
        </div>
      </div>

      {/* Item Details */}
      <div className="mt-3 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {item.itemName || item.itemname}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-600">{item.averageRating}</span>
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500 mt-1">
          <MapPin size={14} />
          <span className="text-sm">{item.location}</span>
        </div>

        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
          <span className="text-sm text-gray-500 font-medium">/ day</span>
        </div>
      </div>
    </div>
  )
};

const ItemsPreviewSection = () => {
  const [items,setItems]=useState([]);
  const {wishlist}=useSelector((state)=>state.wishlistitem)
  const dispatch=useDispatch()
  useEffect(()=>{

    const fetchFunction=async()=>{

    const itemResponse=await axios.get('/api/user/getallitem');
    const wishlistResponse=await axios.get('/api/user/get-wish-list')
    const itemdata=itemResponse?.data.data;
    const wishlistdata=wishlistResponse?.data.data;
    dispatch(setWishList(wishlistdata))
    setItems(itemdata)
    }
    fetchFunction();
  },[])
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Listings</h2>
      </div>

      {/* Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
      {items.length===0 ? ( <p>No items available</p>) : 
      (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {items?.map((item) => (
          <ItemCard2 key={item?._id} item={item} />
        ))}
      </div>)
      }
    </section>
  );
};


export {
  ItemCard2,
  ItemsPreviewSection,
}



