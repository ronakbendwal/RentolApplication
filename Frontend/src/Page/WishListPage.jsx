// import React, { useState, useMemo, useEffect } from "react";
// import { 
//   Trash2, 
//   HeartOff, 
//   ArrowLeft, 
//   Share2, 
//   Filter, 
//   LayoutGrid, 
//   ArrowUpDown,
//   PackageOpen 
// } from "lucide-react";
// import { useSelector,useDispatch } from "react-redux";
// import {WishedItemCard} from '../Components/index.js';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { setWishList } from "../redux/Feature/WishList.js";
// const WishlistPage = () => {
//   const navigate=useNavigate();
//   const dispatch=useDispatch()
//   const {wishlist}=useSelector((state)=>state.wishlistitem)
//   const [sortBy, setSortBy] = useState("latest");
//   const [error,setError]=useState("")
//   useEffect(()=>{

//   const wishListApiCall=async()=>{
//     setError("")
//     try{
//     const wishlistdata=await axios.get('/api/user/get-wish-list');
//     const responseData=wishlistdata.data
//     dispatch(setWishList(responseData.data))
//     }catch(err){
//       console.log(err)
//       setError(err?.message)
//     }
//   }
//   wishListApiCall();
//   },[])

//   const emptyWishList=async()=>{
//     const removeResponse=await axios.post(`/api/user/empty-wishlist`)
//     dispatch(setWishList(removeResponse.data.data))
//     return removeResponse.data.data;
//   }


//   // Calculate total value of wishlist for the summary
//   const totalValue = useMemo(() => {
//     return wishlist.reduce((acc, item) => acc + parseInt(Number(String(item.price).replace(/,/g, ''))), 0);
//   }, [wishlist]);

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] p-6 md:p-12 lg:px-24">
//       {/* 1. TOP NAVIGATION & UTILITIES */}
//       <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
//         <button onClick={()=>navigate('/')} className="group flex items-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-900 transition-all">
//           <div className="p-2 bg-white rounded-xl border border-slate-100 group-hover:border-emerald-500 transition-colors">
//             <ArrowLeft size={14} />
//           </div>
//           Back to Home
//         </button>

//       </div>

//       {/* 2. HERO SUMMARY SECTION */}
//       <div className="max-w-7xl mx-auto mb-16">
//         <div className="bg-slate-900 rounded-[3.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-slate-200">
//           {/* Decorative Circles */}
//           <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
//           <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

//           <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
//             <div className="text-center md:text-left">
//               <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
//                 My Collection
//               </h1>
//               <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">
//                 {wishlist?.length} Items Selected for Rental
//               </p>
//             </div>

//             <div className="flex gap-10 items-center">
//                <div className="text-center md:text-right border-r border-white/10 pr-10 hidden sm:block">
//                   <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Estimated Daily</p>
//                   <p className="text-3xl font-black text-emerald-400 tracking-tighter">₹{totalValue?.toLocaleString()}</p>
//                </div>
//                {wishlist?.length > 0 && (
//                  <button 
//                    onClick={()=>emptyWishList()}
//                    className="px-8 py-5 bg-white/10 hover:bg-red-500 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-widest transition-all backdrop-blur-md border border-white/10 flex items-center gap-2"
//                  >
//                    <Trash2 size={14} /> Clear All
//                  </button>
//                )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 3. FILTER & VIEW OPTIONS */}
//       {wishlist?.length > 0 && (
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 px-4">
//           <div className="flex items-center gap-4">
//             <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-colors">
//               <ArrowUpDown size={14} className="text-emerald-500" /> Sort: {sortBy}
//             </button>
//           </div>
//           <div className="h-[1px] flex-grow bg-slate-100 mx-8 hidden lg:block" />
//         </div>
//       )}

//       {/* 4. PRODUCT GRID */}
//       <div className="max-w-7xl mx-auto">
//         {wishlist?.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
//             {wishlist.map((item) => (
//               <WishedItemCard key={item?._id} item={item} />
//             ))}
//           </div>
//         ) : (
//           /* Empty State - High End */
//           <div className="flex flex-col items-center justify-center py-32">
//             <div className="relative mb-10">
//               <div className="w-32 h-32 bg-slate-200  rounded-[3rem] fill-red-500 text-emerald-500 flex items-center justify-center ">
//                 <HeartOff size={64} strokeWidth={1} />
//               </div>
//               <div className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white text-xs font-black">?</div>
//             </div>
//             <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">No assets saved yet</h2>
//             <p className="text-slate-400 font-bold text-sm text-center max-w-xs leading-relaxed uppercase tracking-tighter">
//               Start building your perfect production gear list today.
//             </p>
//             <button onClick={()=>navigate('/')}className="mt-10 px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-200 active:scale-95 flex items-center gap-3">
//               Explore Catalog <ArrowLeft size={16} className="rotate-180" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;



import React, { useState, useMemo, useEffect } from "react";
import { 
  Trash2, HeartOff, ArrowLeft, ArrowUpDown, PackageOpen, Sparkles 
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { WishedItemCard } from '../Components/index.js';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { setWishList } from "../redux/Feature/WishList.js";

const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlistitem);
  const [sortBy, setSortBy] = useState("latest");
  const [error, setError] = useState("");

  useEffect(() => {
    const wishListApiCall = async () => {
      setError("");
      try {
        const wishlistdata = await axios.get('/api/user/get-wish-list');
        dispatch(setWishList(wishlistdata.data.data));
      } catch (err) {
        console.log(err);
        setError(err?.message);
      }
    };
    wishListApiCall();
  }, [dispatch]);

  const emptyWishList = async () => {
    try {
      const removeResponse = await axios.post(`/api/user/empty-wishlist`);
      dispatch(setWishList(removeResponse.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const totalValue = useMemo(() => {
    return wishlist.reduce((acc, item) => acc + parseInt(Number(String(item.price).replace(/,/g, ''))), 0);
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-slate-900 font-sans p-6 md:p-12">
      
      {/* 1. TOP NAV - REFINED */}
      <div className="max-w-7xl mx-auto mb-12">
        <button 
          onClick={() => navigate('/')} 
          className="group flex items-center gap-3 bg-white border-[3px] border-slate-900 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all active:scale-95"
        >
          <ArrowLeft size={16} strokeWidth={3} /> Back to Catalog
        </button>
      </div>

      {/* 2. HERO SUMMARY - SOFT BRUTALIST STYLE */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="bg-white border-[4px] border-slate-900 rounded-[3rem] p-8 md:p-14 shadow-[12px_12px_0px_#000] relative overflow-hidden">
          {/* Subtle Decorative Pattern */}
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
             <Sparkles size={120} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <div className="inline-block px-4 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Saved_Items
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                My <span className="text-indigo-600">Wishlist</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
               <div className="text-center md:text-right px-8 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-[2rem] shadow-[6px_6px_0px_#000]">
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Total Daily Rent</p>
                  <p className="text-4xl font-black text-slate-900 tracking-tighter italic">₹{totalValue?.toLocaleString()}</p>
               </div>

               {wishlist?.length > 0 && (
                 <button 
                   onClick={() => emptyWishList()}
                  //  className="p-6 bg-rose-100 hover:bg-rose-500 hover:text-white text-rose-600 rounded-[2rem] border-[3px] border-slate-900 shadow-[6px_6px_0px_#000] transition-all group active:scale-95"
                  className="group relative flex flex-col items-center justify-center w-32 h-23 bg-rose-100 text-rose-600 rounded-[2rem] border-[3px] border-slate-900 shadow-[6px_6px_0px_#000] hover:translate-y-2 hover:shadow-none transition-all active:scale-90"
                 >
                   <Trash2 size={28} strokeWidth={2.5} />
                   <span className="text-[8px] font-black uppercase mt-1">Remove All Item</span>
                 </button>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. GRID CONTENT */}
      <div className="max-w-7xl mx-auto">
        {wishlist?.length > 0 ? (
          <>
            <div className="flex items-center gap-4 mb-10 px-4">
               <ArrowUpDown size={18} className="text-indigo-600" />
               <span className="text-xs font-black uppercase tracking-widest text-slate-400">Sorting by {sortBy}</span>
               <div className="h-[2px] flex-grow bg-slate-200 ml-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {wishlist.map((item) => (
                <div key={item?._id} className="hover:scale-[1.02] transition-transform">
                  <WishedItemCard item={item} />
                </div>
              ))}
            </div>
          </>
        ) : (
          /* EMPTY STATE - REFINED ROUNDED */
          <div className="flex flex-col items-center justify-center py-24 bg-white border-[4px] border-dashed border-slate-300 rounded-[4rem]">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-slate-900 rounded-[3rem] shadow-[10px_10px_0px_#FACC15] flex items-center justify-center text-white rotate-3">
                <HeartOff size={56} strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-3">Wish-List is empty</h2>
            <p className="text-slate-400 font-bold text-xs text-center max-w-xs leading-relaxed uppercase tracking-widest">
              You haven't saved any equipment yet. Explore the category and start building your list.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="mt-12 px-12 py-5 bg-yellow-400 border-[3px] border-slate-900 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-[6px_6px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all active:scale-95 flex items-center gap-3"
            >
              Explore Category <ArrowLeft size={16} strokeWidth={3} className="rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;


// import React, { useState, useMemo, useEffect } from "react";
// import { 
//   Trash2, HeartOff, ArrowLeft, ArrowUpDown, Sparkles, 
//   CircleDollarSign, ShoppingBag, Fingerprint, Zap
// } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { WishedItemCard } from '../Components/index.js';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { setWishList } from "../redux/Feature/WishList.js";

// const WishlistPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { wishlist } = useSelector((state) => state.wishlistitem);
//   const [sortBy, setSortBy] = useState("latest");

//   useEffect(() => {
//     const wishListApiCall = async () => {
//       try {
//         const wishlistdata = await axios.get('/api/user/get-wish-list');
//         dispatch(setWishList(wishlistdata.data.data));
//       } catch (err) { console.log(err); }
//     };
//     wishListApiCall();
//   }, [dispatch]);

//   const emptyWishList = async () => {
//     try {
//       const removeResponse = await axios.post(`/api/user/empty-wishlist`);
//       dispatch(setWishList(removeResponse.data.data));
//     } catch (err) { console.log(err); }
//   };

//   const totalValue = useMemo(() => {
//     return wishlist.reduce((acc, item) => acc + parseInt(Number(String(item.price).replace(/,/g, ''))), 0);
//   }, [wishlist]);

//   return (
//     <div className="min-h-screen bg-[#F0F0F0] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-24 relative overflow-hidden">
      
//       {/* BACKGROUND DECOR - Grid Pattern for that "Designer" look */}
//       <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
//            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', size: '30px 30px', backgroundSize: '40px 40px' }} />

//       <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        
//         {/* 1. TOP COMMAND BAR */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
//           <button 
//             onClick={() => navigate('/')} 
//             className="group flex items-center gap-4 bg-white border-[3px] border-slate-900 px-8 py-4 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] shadow-[6px_6px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
//           >
//             <ArrowLeft size={18} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> 
//             Exit to Store
//           </button>

//           <div className="flex items-center gap-3 bg-indigo-600 text-white border-[3px] border-slate-900 px-6 py-4 rounded-[1.8rem] shadow-[6px_6px_0px_#000]">
//              <Fingerprint size={20} />
//              <span className="text-[10px] font-black uppercase tracking-[0.3em]">User_Collection_Secure</span>
//           </div>
//         </div>

//         {/* 2. ENHANCED HERO COMPONENT */}
//         <section className="bg-white border-[4px] border-slate-900 rounded-[3.5rem] p-10 md:p-16 mb-16 shadow-[15px_15px_0px_#000] relative overflow-hidden group">
//           <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50 -skew-x-12 translate-x-20 group-hover:translate-x-16 transition-transform duration-700" />
          
//           <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
//             <div>
//               <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-[calc(-0.05em)] uppercase leading-[0.85] mb-6">
//                 Saved <br /><span className="text-indigo-600">Treasures</span>
//               </h1>
//               <div className="flex flex-wrap gap-3">
//                  <span className="bg-yellow-400 border-[3px] border-slate-900 px-5 py-2 rounded-full font-black uppercase text-[10px] shadow-[4px_4px_0px_#000]">
//                    {wishlist?.length} Items
//                  </span>
//                  <span className="bg-emerald-400 border-[3px] border-slate-900 px-5 py-2 rounded-full font-black uppercase text-[10px] shadow-[4px_4px_0px_#000]">
//                    Ujjain Node
//                  </span>
//               </div>
//             </div>

//             {/* STICKER STATS */}
//             <div className="flex flex-col sm:flex-row gap-8 items-center">
//                <div className="bg-white border-[4px] border-slate-900 p-8 rounded-[2.5rem] shadow-[8px_8px_0px_#6366f1] rotate-1 group-hover:rotate-0 transition-transform">
//                   <div className="flex items-center gap-4 mb-2">
//                     <CircleDollarSign size={24} className="text-indigo-600" />
//                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Est. Daily Cost</span>
//                   </div>
//                   <p className="text-5xl font-black text-slate-900 tracking-tighter italic">
//                     ₹{totalValue?.toLocaleString()}
//                   </p>
//                </div>

//                {wishlist?.length > 0 && (
//                  <button 
//                    onClick={() => emptyWishList()}
//                    className="group relative flex flex-col items-center justify-center w-32 h-32 bg-rose-500 text-white rounded-full border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] hover:translate-y-2 hover:shadow-none transition-all active:scale-90"
//                  >
//                    <Trash2 size={32} strokeWidth={2.5} />
//                    <span className="text-[8px] font-black uppercase mt-1">Nuke All</span>
//                  </button>
//                )}
//             </div>
//           </div>
//         </section>

//         {/* 3. GRID HUB */}
//         <div className="space-y-12">
//           {wishlist?.length > 0 ? (
//             <>
//               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6">
//                 <div className="flex items-center gap-4 bg-white border-[3px] border-slate-900 px-6 py-3 rounded-full shadow-[4px_4px_0px_#000]">
//                    <ArrowUpDown size={16} className="text-indigo-600" />
//                    <span className="text-[10px] font-black uppercase tracking-widest">Sort: {sortBy}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Zap size={20} className="text-yellow-500 fill-yellow-500" />
//                   <p className="text-xs font-black uppercase tracking-widest text-slate-400">Live Inventory Fetch Active</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
//                 {wishlist.map((item) => (
//                   <div key={item?._id} className="relative transition-all duration-300 hover:-translate-y-2">
//                     <WishedItemCard item={item} />
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             /* ENHANCED EMPTY STATE */
//             <div className="bg-white border-[4px] border-slate-900 rounded-[4rem] p-20 flex flex-col items-center justify-center text-center shadow-[15px_15px_0px_#CBD5E1]">
//               <div className="w-40 h-40 bg-indigo-50 border-[4px] border-dashed border-indigo-600 rounded-[3rem] flex items-center justify-center mb-10 relative">
//                  <HeartOff size={80} className="text-indigo-600" strokeWidth={1.5} />
//                  <div className="absolute -top-4 -right-4 bg-yellow-400 border-[3px] border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_#000] rotate-12">
//                     <Sparkles size={20} />
//                  </div>
//               </div>
//               <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">Empty Vault</h2>
//               <p className="max-w-sm text-slate-400 font-bold text-xs uppercase tracking-widest leading-loose mb-12">
//                 Your personalized equipment collection is currently inactive. Populate the vault with high-end assets from our main catalog.
//               </p>
//               <button 
//                 onClick={() => navigate('/')}
//                 className="group flex items-center gap-4 bg-slate-900 text-white border-[4px] border-slate-900 px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-[10px_10px_0px_#6366f1] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
//               >
//                 Go Scouting <ShoppingBag size={20} className="group-hover:bounce" />
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default WishlistPage;


