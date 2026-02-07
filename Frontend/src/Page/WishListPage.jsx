import React, { useState, useMemo, useEffect } from "react";
import { 
  Trash2, 
  HeartOff, 
  ArrowLeft, 
  Share2, 
  Filter, 
  LayoutGrid, 
  ArrowUpDown,
  PackageOpen 
} from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import {WishedItemCard} from '../Components/index.js';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { setWishList } from "../redux/Feature/WishList.js";
const WishlistPage = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const {wishlist}=useSelector((state)=>state.wishlistitem)
  const [sortBy, setSortBy] = useState("latest");
  const [error,setError]=useState("")
  useEffect(()=>{

  const wishListApiCall=async()=>{
    setError("")
    try{
    const wishlistdata=await axios.get('/api/user/get-wish-list');
    const responseData=wishlistdata.data
    dispatch(setWishList(responseData.data))
    }catch(err){
      console.log(err)
      setError(err?.message)
    }
  }
  wishListApiCall();
  },[])

  const emptyWishList=async()=>{
    const removeResponse=await axios.post(`/api/user/empty-wishlist`)
    dispatch(setWishList(removeResponse.data.data))
    return removeResponse.data.data;
  }


  // Calculate total value of wishlist for the summary
  const totalValue = useMemo(() => {
    return wishlist.reduce((acc, item) => acc + parseInt(Number(String(item.price).replace(/,/g, ''))), 0);
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 lg:px-24">
      {/* 1. TOP NAVIGATION & UTILITIES */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <button onClick={()=>navigate('/')} className="group flex items-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-900 transition-all">
          <div className="p-2 bg-white rounded-xl border border-slate-100 group-hover:border-emerald-500 transition-colors">
            <ArrowLeft size={14} />
          </div>
          Back to Home
        </button>

      </div>

      {/* 2. HERO SUMMARY SECTION */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-slate-900 rounded-[3.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-slate-200">
          {/* Decorative Circles */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                My Collection
              </h1>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">
                {wishlist?.length} Items Selected for Rental
              </p>
            </div>

            <div className="flex gap-10 items-center">
               <div className="text-center md:text-right border-r border-white/10 pr-10 hidden sm:block">
                  <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Estimated Daily</p>
                  <p className="text-3xl font-black text-emerald-400 tracking-tighter">₹{totalValue?.toLocaleString()}</p>
               </div>
               {wishlist?.length > 0 && (
                 <button 
                   onClick={()=>emptyWishList()}
                   className="px-8 py-5 bg-white/10 hover:bg-red-500 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-widest transition-all backdrop-blur-md border border-white/10 flex items-center gap-2"
                 >
                   <Trash2 size={14} /> Clear All
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. FILTER & VIEW OPTIONS */}
      {wishlist?.length > 0 && (
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 px-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-colors">
              <ArrowUpDown size={14} className="text-emerald-500" /> Sort: {sortBy}
            </button>
          </div>
          <div className="h-[1px] flex-grow bg-slate-100 mx-8 hidden lg:block" />
        </div>
      )}

      {/* 4. PRODUCT GRID */}
      <div className="max-w-7xl mx-auto">
        {wishlist?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {wishlist.map((item) => (
              <WishedItemCard key={item?._id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty State - High End */
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative mb-10">
              <div className="w-32 h-32 bg-slate-200  rounded-[3rem] fill-red-500 text-emerald-500 flex items-center justify-center ">
                <HeartOff size={64} strokeWidth={1} />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-black">?</div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">No assets saved yet</h2>
            <p className="text-slate-400 font-bold text-sm text-center max-w-xs leading-relaxed uppercase tracking-tighter">
              Start building your perfect production gear list today.
            </p>
            <button onClick={()=>navigate('/')}className="mt-10 px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center gap-3">
              Explore Catalog <ArrowLeft size={16} className="rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;


// text-slate-200 bg-slate-50