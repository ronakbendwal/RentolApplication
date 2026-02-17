import React, { useState } from "react";
import { Edit3, Trash2, MoreHorizontal, ImageIcon, Camera } from "lucide-react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setYourItemEditPageStatus } from "../../redux/Feature/Status.js" // Path adjusted as per common structure
import { deleteYourItemApi } from "../../redux/Feature/YourItem.js";
import { useNavigate } from 'react-router-dom';

const YourItemCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemStatus, setItemStatus] = useState(data.status);

  const switchStatus = async (itemId) => {
    try {
      const response = await axios.post(`/api/user/update-item-status/${itemId}`);
      setItemStatus(response.data.data.status);
    } catch (err) { console.log(err); }
  };
  const isActive = itemStatus === 'Active';

  return (
    <div className="bg-white border-[3px] border-slate-900 rounded-[2.5rem] p-4 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] transition-all duration-300 flex flex-col group">
      
      <div className="relative h-56 rounded-[1.8rem] overflow-hidden border-[3px] border-slate-900 mb-5 bg-slate-50">
        <img 
          src={data?.images?.[0]?.url} 
          alt={data?.itemName} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!isActive && 'grayscale opacity-50'}`} 
        />
        
        <div className="absolute top-3 left-3">
          <div className={`px-4 py-1.5 rounded-full border-[2.5px] border-slate-900 font-black text-[9px] uppercase tracking-widest shadow-[3px_3px_0px_#000] ${isActive ? 'bg-emerald-400' : 'bg-slate-300'}`}>
            {itemStatus}
          </div>
        </div>

        <button 
          onClick={() => dispatch(setYourItemEditPageStatus(data?._id))}
          className="absolute bottom-3 right-3 p-3 bg-yellow-400 border-[2.5px] border-slate-900 rounded-2xl shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all flex items-center gap-2 group/btn"
        >
          <Camera size={16} strokeWidth={3} />
          <span className="text-[9px] font-[1000] uppercase tracking-tighter">Edit Images</span>
        </button>
      </div>

      <div className="px-1 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-xl font-black uppercase tracking-tight leading-tight ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
              {data?.itemName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-sm font-black text-indigo-600">₹{data?.price}</span>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">/ per day</span>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <MoreHorizontal size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border-[2px] border-slate-200 mb-5">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Live Status</span>
           <button 
             onClick={() => switchStatus(data?._id)} 
             className={`w-11 h-6 rounded-full border-2 border-slate-900 relative transition-colors ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
           >
             <div className={`absolute top-0.5 w-4 h-4 bg-white border-2 border-slate-900 rounded-full transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
           </button>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => navigate(`/edititem/${data?._id}`)} 
            className="flex-grow py-3.5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-[4px_4px_0px_#6366f1] active:translate-y-1 active:shadow-none"
          >
            <Edit3 size={14} /> Edit Product
          </button>
          <button
            onClick={() => dispatch(deleteYourItemApi(data?._id))}
            className="p-3.5 bg-rose-50 text-rose-500 rounded-2xl border-2 border-rose-100 hover:bg-rose-500 hover:text-white transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourItemCard;