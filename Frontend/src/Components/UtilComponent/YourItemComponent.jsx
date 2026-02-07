//here we have the user item card that we're gonna show on the frontend as a your item preview
import React, { useState } from "react";
import {
  MoreVertical,
  Edit3,
  Trash2,
  X,
  Camera,
  Save,
  ChevronRight
} from "lucide-react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { setYourItemEditPageStatus } from "../../redux/Feature/Status.js";
import { useDispatch } from "react-redux";
import YourItemEditPage from "../../Page/YourItemEditPage";
import { deleteYourItemApi } from "../../redux/Feature/YourItem.js";
const YourItemCard = ({data}) => {
  const {YIEPStatus}=useSelector((state)=>state.componentstatus)
  const dispatch=useDispatch()

  const [itemStatus,setItemStatus]=useState(data.status)
  const switchStatus=async(itemId)=>{
    try{
      const response=await axios.post(`/api/user/update-item-status/${itemId}`)
      setItemStatus(response.data.data.status)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
      {/* Main Item Card */}
      <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 relative overflow-hidden">
        <div className="relative h-60 rounded-[2rem] overflow-hidden mb-5">
          <img 
            src={data?.images?.[0].url} 
            alt={data?.itemName} 
            className={`w-full h-full object-cover transition-all duration-700 ${
              itemStatus==="Active" ? "group-hover:scale-110 grayscale-0" : "grayscale opacity-70"
            }`} 
          />
          <div className="absolute top-4 left-4">
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors duration-300 ${
              itemStatus==='Active' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-500 text-white border-slate-400'
            }`}>
              {itemStatus==='Active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="px-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-xl font-black leading-tight transition-colors ${
                itemStatus==='Active' ? "text-slate-800 group-hover:text-emerald-600" : "text-slate-400"
              }`}>
                {data?.itemName.charAt(0).toUpperCase()+ data?.itemName.slice(1)}
              </h3>
              <div className={`flex items-center gap-1 mt-1 ${itemStatus==='Active' ? "text-emerald-600" : "text-slate-400"}`}>
                <span className="text-xs font-black">₹</span>
                <span className="text-lg font-black">{data?.price}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">/ Day</span>
              </div>
            </div>
            <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center justify-between mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-100">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Listing Status</span>
             <button onClick={()=>switchStatus(data?._id)} className={`relative w-12 h-6 rounded-full transition-all ${itemStatus==='Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}>
               <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${itemStatus==='Active' ? 'translate-x-6' : 'translate-x-0'}`} />
             </button>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={()=> dispatch(setYourItemEditPageStatus(!YIEPStatus))} 
              className="flex-grow py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
              disabled={itemStatus==='Inactive'}
            >
              <Edit3 size={14} /> Manage Asset
            </button>
            <button
            onClick={()=>dispatch(deleteYourItemApi(data?._id))}
            className="px-5 py-4 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourItemCard;


