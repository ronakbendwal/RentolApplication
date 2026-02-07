import React from "react";
import { Trash2, Heart, ShoppingBag, Star, ArrowUpRight } from "lucide-react";
import { wishlistapi } from "../../redux/Feature/WishList.js";
import { useDispatch} from "react-redux";
const WishedItemCard = ({ item}) => {
  const dispatch=useDispatch();

  return (
    <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 relative overflow-hidden">
      
      {/* 1. Enhanced Image Section */}
      <div className="relative h-56 rounded-[2rem] overflow-hidden mb-5">
        <img 
          src={item.images?.[0].url} 
          alt={item.itemName} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" 
        />
        
        {/* Top Overlay: Category & Removal */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-800 shadow-sm border border-white/20">
            {item.category}
          </span>
          <button 
            onClick={() => dispatch(wishlistapi(item?._id))}
            className="p-3 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-slate-900 transition-all active:scale-90"
          >
            <Heart size={16} fill="currentColor" />
          </button>
        </div>

        {/* Bottom Overlay: Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10">
             <div className="flex items-center gap-1">
                <span className="text-emerald-400 text-xs font-black">₹</span>
                <span className="text-white text-lg font-black tracking-tighter">{item.price}</span>
                <span className="text-slate-400 text-[8px] font-bold uppercase ml-1">/ Day</span>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="px-2">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
              {item.itemName}
            </h3>
            {/* Added: Rating/Trust Indicator */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex text-amber-400">
                <Star size={10} fill="currentColor" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                {`${item?.averageRating ?? 0} (${item?.ratingCount ?? 0})`}            
              </span>
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* 3. Action Buttons - Split Layout */}
        <div className="flex gap-2 mt-6">
          <button className="flex-[3] py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
            <ShoppingBag size={14} /> Book Now
          </button>
          
          <button 
            onClick={() => dispatch(wishlistapi(item?._id))}
            className="flex-1 py-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center active:scale-95"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Subtle background text decoration */}
      <div className="absolute -bottom-2 -right-2 text-slate-50 font-black text-6xl select-none -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        RENT
      </div>
    </div>
  );
};

export default WishedItemCard;