import React from "react";
import { Trash2, Heart, ShoppingBag, Star, ArrowUpRight } from "lucide-react";
import { wishlistapi } from "../../redux/Feature/WishList.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const WishedItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  return (
    <div className="group bg-white border-[3px] border-slate-900 rounded-[2.5rem] p-4 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] transition-all duration-300 relative overflow-hidden flex flex-col h-full">
      
      <div className="relative h-60 rounded-[1.8rem] overflow-hidden border-[3px] border-slate-900 mb-5 bg-slate-50">
        <img 
          src={item.images?.[0].url} 
          alt={item.itemName} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
        />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <span className="px-4 py-1.5 bg-yellow-400 border-[2.5px] border-slate-900 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-[3px_3px_0px_#000]">
            {item.category}
          </span>
          <button 
            onClick={() => dispatch(wishlistapi(item?._id))}
            className="p-3 bg-white border-[2.5px] border-slate-900 text-rose-500 rounded-2xl shadow-[4px_4px_0px_#000] hover:bg-rose-500 hover:text-white transition-all active:translate-y-1 active:shadow-none"
          >
            <Heart size={16} fill="currentColor" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="px-4 py-2 bg-slate-900 border-[2px] border-slate-900 rounded-xl shadow-[4px_4px_0px_#6366f1]">
             <div className="flex items-center gap-1">
                <span className="text-white text-lg font-black tracking-tighter italic">₹{item.price}</span>
                <span className="text-slate-400 text-[8px] font-bold uppercase ml-1">/ Day</span>
             </div>
          </div>
        </div>
      </div>

      <div className="px-1 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4 gap-2">
          <div className="flex-1">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">
              {item.itemName}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                <Star size={12} fill="currentColor" strokeWidth={3} />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {item?.averageRating ?? 0}
              </span>
            </div>
          </div>
          <button
          onClick={()=>navigate(`/viewitem/${item._id}`)}
           className="p-3 border-[2.5px] border-slate-900 rounded-2xl text-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-[3px_3px_0px_#000] group-hover:shadow-none">
            <ArrowUpRight size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="flex gap-3 mt-auto pt-4">
          <button 
          onClick={()=>navigate(`/viewitem/${item._id}`)}
          className="flex-[3] py-4 bg-indigo-600 text-white border-[3px] border-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <ShoppingBag size={14} strokeWidth={3} /> Query Item
          </button>
          
          <button 
            onClick={() => dispatch(wishlistapi(item?._id))}
            className="flex-1 py-4 bg-white text-rose-500 border-[3px] border-slate-900 rounded-2xl hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95"
          >
            <Trash2 size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="absolute -bottom-4 -right-2 text-slate-100 font-black text-7xl select-none -z-10 group-hover:text-indigo-50 transition-colors duration-500 italic">
        WISH
      </div>
    </div>
  );
};

export default WishedItemCard;