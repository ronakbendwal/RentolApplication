// import React, { useEffect, useState } from 'react';
// import {  MapPin, Heart, Star,ShoppingBag} from 'lucide-react';
// import axios from 'axios';
// import {useSelector,useDispatch} from 'react-redux';
// import {wishlistapi} from '../../redux/Feature/WishList.js'
// import { setWishList } from '../../redux/Feature/WishList.js';
//  const ItemCard2 = ({item}) => {
//   const dispatch=useDispatch();
//   const {wishlist}=useSelector((state)=>state.wishlistitem)
//   console.log(item)
//   if(item.status==='Inactive'){
//     return null
//   }
//   return (
//     <div className="group curser-pointer">
//       {/* Image Container */}
//       <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
//         <img 
//           src={item.images?.[0]?.url } 
//           alt={item.itemName || item.itemname}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//         />
        
//         {/* Wishlist Button */}
//         <button
//         onClick={()=>dispatch(wishlistapi(item?._id))}
//         className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-md hover:bg-white transition-colors shadow-sm">
//           <Heart  size={18} className={`${wishlist?.some((w)=>w._id===item?._id) ? "fill-red-500 text-red-500" : 'text-gray-700' } hover:text-red-500 transition-colors`} />
//         </button>

//         {/* Category Tag */}
//         <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
//           {item.category}
//         </div>
//       </div>

//       {/* Item Details */}
//       <div className="mt-3 px-1">
//         <div className="flex justify-between items-start">
//           <h3 className="text-base font-semibold text-gray-900 truncate">
//             {item.itemName || item.itemname}
//           </h3>
//           <div className="flex items-center gap-1">
//             <span className="text-sm font-medium text-gray-600">{item.averageRating}</span>
//             <Star size={14} className="fill-yellow-400 text-yellow-400" />
//           </div>
//         </div>

//         <div className="flex items-center gap-1 text-gray-500 mt-1">
//           <MapPin size={14} />
//           <span className="text-sm">{item.location}</span>
//         </div>

//         <div className="mt-3 flex items-baseline gap-1">
//           <span className="text-lg font-bold text-emerald-600">₹{item.price}</span>
//           <span className="text-sm text-gray-500 font-medium">/ day</span>
//             <button className="flex-[3] py-3 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
//             <ShoppingBag size={13} /> Book Now
//           </button>
//         </div>

//       </div>
//     </div>
//   )
// };


// import React,{useState,useEffect} from 'react';
// import { MapPin, Heart, Star, ShoppingBag, Zap } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { wishlistapi } from '../../redux/Feature/WishList.js';
// import axios from 'axios';
// import { setWishList } from '../../redux/Feature/WishList.js';
// import { useNavigate } from 'react-router-dom';
// const ItemCard2 = ({ item }) => {
//   const dispatch = useDispatch();
//   const { wishlist } = useSelector((state) => state.wishlistitem);
//   const isWishlisted = wishlist?.some((i) => i._id === item?._id);
//   const navigate=useNavigate();

//   if (item.status === 'Inactive') return null;

//   return (
//     <div 
//     onClick={()=>navigate(`/viewitem/${item?._id}`)}
//     className="group relative bg-white rounded-[2.5rem] p-3 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 border border-transparent hover:border-slate-100">
      
//       {/* Image Container */}
//       <div className="relative aspect-[10/11] overflow-hidden rounded-[2rem] bg-slate-100">
//         <img 
//           src={item.images?.[0]?.url} 
//           alt={item.itemName || item.itemname}
//           className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
//         />
        
//         {/* Top Actions: Rating & Wishlist */}
//         <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
//           <div className="px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full flex items-center gap-1.5 shadow-sm">
//             <Star size={12} className="fill-yellow-400 text-yellow-400" />
//             <span className="text-[11px] font-black text-slate-800">{item?.averageRating || "4.5" }</span>
//           </div>

//           <button
//             onClick={
//               (e) =>{
//               e.stopPropagation();//here we dont want to redirect user on the view page so we do this
//               dispatch(wishlistapi(item?._id))}}
//             className="p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white transition-all shadow-sm active:scale-90"
//           >
//             <Heart 
//               size={18} 
//               className={`transition-colors duration-300 ${isWishlisted ? "fill-red-500 text-red-500" : 'text-slate-400'}`} 
//             />
//           </button>
//         </div>

//         {/* Floating Category Tag */}
//         <div className="absolute bottom-4 left-4">
//           <div className="px-4 py-1.5 bg-slate-900/60 backdrop-blur-md rounded-xl text-[9px] font-black text-white uppercase tracking-[0.15em] border border-white/20">
//             {item?.category}
//           </div>
//         </div>
//       </div>

//       {/* Item Details */}
//       <div className="mt-5 px-2 pb-2">
//         <div className="flex flex-col gap-1">
//           <h3 className="text-lg font-bold text-slate-900 tracking-tight truncate group-hover:text-emerald-600 transition-colors">
//             {item.itemName || item.itemname}
//           </h3>
          
//           <div className="flex items-center gap-1 text-slate-400">
//             <MapPin size={13} />
//             <span className="text-xs font-semibold text-emerald-600 tracking-tight">{item.location}</span>
//           </div>
//         </div>

//         {/* Pricing & CTA Section */}
//         <div className="mt-6 flex items-center justify-between gap-4">
//           <div className="flex flex-col">
//             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Price</span>
//             <div className="flex items-baseline gap-0.5 mt-1">
//               <span className="text-2xl font-black text-slate-900">₹{item.price}</span>
//               <span className="text-[10px] font-bold text-slate-400 uppercase">/day</span>
//             </div>
//           </div>

//           <button 
//           onClick={(e)=>{
//             e.stopPropagation();
//             navigate(`/viewitem/${item?._id}`)
//           }}
//           className="relative flex-1 py-4 bg-slate-900 overflow-hidden text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95 group/btn shadow-xl shadow-slate-100">
//              {/* Animated Background Shine */}
//             <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            
//             <Zap size={13} className="fill-current" />
//             <span>View</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };



import React ,{useState,useEffect}from 'react';
import { MapPin, Heart, Star, Zap,ArrowLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { wishlistapi } from '../../redux/Feature/WishList.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setWishList } from '../../redux/Feature/WishList.js';
import { setShowLocationModal } from '../../redux/Feature/Status.js';
const ItemCard2 = ({ item }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlistitem);
  const isWishlisted = wishlist?.some((i) => i._id === item?._id);
  const navigate = useNavigate();

  if (item.status === 'Inactive') return null;

  return (
    <div 
      onClick={() => navigate(`/viewitem/${item?._id}`)}
      className="group relative bg-white border-2 border-slate-900 rounded-[2.5rem] p-4 transition-all duration-300 hover:-translate-y-2 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#6366f1] cursor-pointer"
    >
      
      {/* Image Container */}
      <div className="relative aspect-[10/11] overflow-hidden rounded-[2rem] border-2 border-slate-900 bg-slate-100">
        <img 
          src={item.images?.[0]?.url} 
          alt={item.itemName || item.itemname}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Top Actions: Rating & Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <div className="px-3 py-1 bg-white border-2 border-slate-900 rounded-full flex items-center gap-1.5 shadow-[3px_3px_0px_#000]">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[11px] font-black text-slate-900">{item?.averageRating  }</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(wishlistapi(item?._id));
            }}
            className="p-2 rounded-full bg-white border-2 border-slate-900 hover:bg-red-50 transition-all shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none"
          >
            <Heart 
              size={18} 
              className={`transition-colors duration-300 ${isWishlisted ? "fill-red-500 text-red-500" : 'text-slate-400'}`} 
            />
          </button>
        </div>

        {/* Floating Category Tag */}
        <div className="absolute bottom-3 left-3">
          <div className="px-3 py-1 bg-emerald-400 border-2 border-slate-900 rounded-lg text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-[3px_3px_0px_#000]">
            {item?.category}
          </div>
        </div>
      </div>

      {/* Item Details */}
      <div className="mt-5 px-1 pb-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-black text-slate-900 tracking-tighter truncate uppercase leading-none">
            {item.itemName || item.itemname}
          </h3>
          
          <div className="flex items-center gap-1 text-slate-500 mt-1">
            <MapPin size={13} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">{item.location}</span>
          </div>
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Per Day</span>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{item.price}</span>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/viewitem/${item?._id}`);
            }}
            className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 shadow-[4px_4px_0px_#10B981] hover:bg-slate-800 transition-all active:translate-y-1 active:shadow-none"
          >
            <Zap size={14} className="fill-yellow-400 text-yellow-400" />
            <span>Rent</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ItemCard2;

const ItemsPreviewSection = () => {
  const [items, setItems] = useState([]);
  const {data}=useSelector((state)=>state.auth);
  const city =data?.data?.fulllocation?.address.city;
  const {showLocationModal} = useSelector((state)=>state.componentstatus)

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFunction = async () => {
      try {
      let itemResponse; 
      if(!city){
       itemResponse= await axios.get('/api/user/getallitem');
      }else{
        itemResponse=await axios.get('/api/user/getnearitem',{
          params:{
          city
          }
        })
      }
        const wishlistResponse = await axios.get('/api/user/get-wish-list');
        const itemdata = itemResponse?.data.data;
        const wishlistdata = wishlistResponse?.data.data;
        dispatch(setWishList(wishlistdata));
        setItems(itemdata);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchFunction();
  }, [data,dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            Featured <br />
            <span className="text-indigo-600">Listings</span>
          </h2>
          {/* Decorative underline/bar */}
          <div className="h-3 w-1/2 bg-yellow-400 border-2 border-slate-900 mt-2 shadow-[4px_4px_0px_#000]"></div>
        </div>

        <div className="hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
            Explore the best rentals
          </p>
          <div className="h-[2px] w-full bg-slate-200"></div>
        </div>
      </div>

      {/* ITEMS GRID */}
      {!items || items.length === 0 ? (
        // Added flex-col, items-center aur justify-center for perfect centering
        <div className="flex flex-col items-center justify-center text-center py-32 border-4 border-dashed border-slate-200 rounded-[3rem]">
          <p className="text-2xl font-black uppercase text-slate-300 tracking-widest mb-8">
            No items available right now
          </p>
          
          <button 
            onClick={() => dispatch(setShowLocationModal(!showLocationModal))}
            className="px-12 py-5 bg-yellow-400 border-[3px] border-slate-900 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-[6px_6px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all active:scale-95 flex items-center gap-3"
          >
            Change City <ArrowLeft size={16} strokeWidth={3} className="rotate-180" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items?.map((item) => (
            <ItemCard2 key={item?._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};


export {
  ItemCard2,
  ItemsPreviewSection,
}



