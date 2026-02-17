// //here we have the user item card that we're gonna show on the frontend as a your item preview
// import React, { useState } from "react";
// import {
//   MoreVertical,
//   Edit3,
//   Trash2,
//   X,
//   Camera,
//   Save,
//   ChevronRight
// } from "lucide-react";
// import axios from 'axios';
// import { useSelector } from "react-redux";
// import { setYourItemEditPageStatus } from "../../redux/Feature/Status.js";
// import { useDispatch } from "react-redux";
// import YourItemEditPage from "../../Page/YourItemEditPage";
// import { deleteYourItemApi } from "../../redux/Feature/YourItem.js";
// const YourItemCard = ({data}) => {
//   const {YIEPStatus}=useSelector((state)=>state.componentstatus)
//   const dispatch=useDispatch()

//   const [itemStatus,setItemStatus]=useState(data.status)
//   const switchStatus=async(itemId)=>{
//     try{
//       const response=await axios.post(`/api/user/update-item-status/${itemId}`)
//       setItemStatus(response.data.data.status)
//     }catch(err){
//       console.log(err)
//     }
//   }
//   return (
//     <>
//       {/* Main Item Card */}
//       <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 relative overflow-hidden">
//         <div className="relative h-60 rounded-[2rem] overflow-hidden mb-5">
//           <img 
//             src={data?.images?.[0].url} 
//             alt={data?.itemName} 
//             className={`w-full h-full object-cover transition-all duration-700 ${
//               itemStatus==="Active" ? "group-hover:scale-110 grayscale-0" : "grayscale opacity-70"
//             }`} 
//           />
//           <div className="absolute top-4 left-4">
//             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors duration-300 ${
//               itemStatus==='Active' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-slate-500 text-white border-slate-400'
//             }`}>
//               {itemStatus==='Active' ? 'Active' : 'Inactive'}
//             </span>
//           </div>
//         </div>

//         <div className="px-2">
//           <div className="flex justify-between items-start mb-4">
//             <div>
//               <h3 className={`text-xl font-black leading-tight transition-colors ${
//                 itemStatus==='Active' ? "text-slate-800 group-hover:text-emerald-600" : "text-slate-400"
//               }`}>
//                 {data?.itemName.charAt(0).toUpperCase()+ data?.itemName.slice(1)}
//               </h3>
//               <div className={`flex items-center gap-1 mt-1 ${itemStatus==='Active' ? "text-emerald-600" : "text-slate-400"}`}>
//                 <span className="text-xs font-black">₹</span>
//                 <span className="text-lg font-black">{data?.price}</span>
//                 <span className="text-[10px] text-slate-400 uppercase font-bold">/ Day</span>
//               </div>
//             </div>
//             <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
//               <MoreVertical size={20} />
//             </button>
//           </div>

//           {/* Toggle Switch */}
//           <div className="flex items-center justify-between mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-100">
//              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Listing Status</span>
//              <button onClick={()=>switchStatus(data?._id)} className={`relative w-12 h-6 rounded-full transition-all ${itemStatus==='Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}>
//                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${itemStatus==='Active' ? 'translate-x-6' : 'translate-x-0'}`} />
//              </button>
//           </div>

//           <div className="flex gap-2">
//             <button 
//               onClick={()=> dispatch(setYourItemEditPageStatus(!YIEPStatus))} 
//               className="flex-grow py-4 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200 disabled:opacity-50"
//               disabled={itemStatus==='Inactive'}
//             >
//               <Edit3 size={14} /> Manage Asset
//             </button>
//             <button
//             onClick={()=>dispatch(deleteYourItemApi(data?._id))}
//             className="px-5 py-4 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
//               <Trash2 size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default YourItemCard;



//2nd

// import React, { useState } from "react";
// import {
//   Edit3,
//   Trash2,
//   Zap,
//   ZapOff,
//   ChevronRight,
//   TrendingUp
// } from "lucide-react";
// import axios from 'axios';
// import { useSelector, useDispatch } from "react-redux";
// import { setYourItemEditPageStatus } from "../../redux/Feature/Status.js";
// import { deleteYourItemApi } from "../../redux/Feature/YourItem.js";

// const YourItemCard = ({ data }) => {
//   const { YIEPStatus } = useSelector((state) => state.componentstatus);
//   const dispatch = useDispatch();

//   const [itemStatus, setItemStatus] = useState(data.status);

//   const switchStatus = async (itemId) => {
//     try {
//       const response = await axios.post(`/api/user/update-item-status/${itemId}`);
//       setItemStatus(response.data.data.status);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const isActive = itemStatus === 'Active';

//   return (
//     <div className="relative group">
//       {/* 1. BACKGROUND SHADOW BLOCK */}
//       <div className="absolute inset-0 bg-slate-900 translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />

//       {/* 2. MAIN CONTAINER */}
//       <div className={`relative bg-white border-4 border-slate-900 p-4 transition-colors ${!isActive && 'bg-slate-50'}`}>
        
//         {/* IMAGE BOX */}
//         <div className="relative h-64 border-4 border-slate-900 mb-6 overflow-hidden bg-slate-200">
//           <img
//             src={data?.images?.[0]?.url}
//             alt={data?.itemName}
//             className={`w-full h-full object-cover transition-all duration-500 ${
//               isActive ? "grayscale-0" : "grayscale opacity-40"
//             } group-hover:scale-105`}
//           />
          
//           {/* STATUS STICKER */}
//           <div className="absolute top-4 left-4">
//             <div className={`px-4 py-1.5 border-4 border-slate-900 font-black uppercase text-[10px] tracking-tighter shadow-[4px_4px_0px_#000] flex items-center gap-2 ${
//               isActive ? 'bg-emerald-400' : 'bg-slate-400 text-white'
//             }`}>
//               {isActive ? <Zap size={12} fill="currentColor" /> : <ZapOff size={12} />}
//               {itemStatus}
//             </div>
//           </div>

//           {/* PRICE TAG STICKER */}
//           <div className="absolute bottom-4 right-4">
//              <div className="bg-yellow-400 border-4 border-slate-900 px-3 py-1 shadow-[4px_4px_0px_#000]">
//                 <p className="font-black text-xl tracking-tighter italic">₹{data?.price}<span className="text-[10px] uppercase ml-1">/Day</span></p>
//              </div>
//           </div>
//         </div>

//         {/* DETAILS SECTION */}
//         <div className="space-y-4">
//           <div className="flex justify-between items-start">
//             <h3 className={`text-2xl font-black uppercase tracking-tighter leading-none ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
//               {data?.itemName}
//             </h3>
//             <div className="bg-indigo-100 p-1 border-2 border-slate-900 shadow-[2px_2px_0px_#000]">
//                <TrendingUp size={16} className="text-indigo-600" />
//             </div>
//           </div>

//           {/* BRUTALIST TOGGLE */}
//           <div className="flex items-center justify-between p-4 border-4 border-dashed border-slate-200 bg-white">
//             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Availability</span>
//             <button 
//               onClick={() => switchStatus(data?._id)} 
//               className={`w-14 h-8 border-4 border-slate-900 transition-colors relative ${isActive ? 'bg-emerald-400' : 'bg-slate-300'}`}
//             >
//               <div className={`absolute top-0.5 w-4 h-4 bg-white border-2 border-slate-900 transition-transform ${isActive ? 'translate-x-7' : 'translate-x-1'}`} />
//             </button>
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="flex gap-3">
//             <button
//               onClick={() => dispatch(setYourItemEditPageStatus(!YIEPStatus))}
//               disabled={!isActive}
//               className="flex-grow flex items-center justify-center gap-2 py-4 bg-slate-900 text-white font-black uppercase text-xs tracking-widest border-4 border-slate-900 shadow-[4px_4px_0px_#6366f1] active:translate-y-1 active:shadow-none transition-all disabled:opacity-20 disabled:cursor-not-allowed"
//             >
//               <Edit3 size={16} /> Manage
//             </button>
//             <button
//               onClick={() => dispatch(deleteYourItemApi(data?._id))}
//               className="p-4 bg-rose-500 text-white border-4 border-slate-900 shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
//             >
//               <Trash2 size={20} strokeWidth={3} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YourItemCard;

// 3rd

// import React, { useState } from "react";
// import { Edit3, Trash2, Zap, ZapOff, MoreHorizontal } from "lucide-react";
// import axios from 'axios';
// import { useSelector, useDispatch } from "react-redux";
// import { setYourItemEditPageStatus } from "../../redux/Feature/Status.js";
// import { deleteYourItemApi } from "../../redux/Feature/YourItem.js";
// import {useNavigate} from 'react-router-dom'

// const YourItemCard = ({ data }) => {
//   const { YIEPStatus } = useSelector((state) => state.componentstatus);
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const [itemStatus, setItemStatus] = useState(data.status);

//   const switchStatus = async (itemId) => {
//     try {
//       const response = await axios.post(`/api/user/update-item-status/${itemId}`);
//       setItemStatus(response.data.data.status);
//     } catch (err) { console.log(err); }
//   };

//   const isActive = itemStatus === 'Active';

//   return (
//     <div className="bg-white border-[3px] border-slate-900 rounded-[2.5rem] p-4 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] transition-all duration-300 flex flex-col group">
      
//       {/* IMAGE SECTION - Soft Rounded */}
//       <div className="relative h-56 rounded-[1.8rem] overflow-hidden border-[3px] border-slate-900 mb-5 bg-slate-50">
//         <img 
//           src={data?.images?.[0]?.url} 
//           alt={data?.itemName} 
//           className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!isActive && 'grayscale opacity-50'}`} 
//         />
        
//         {/* Floating Status Badge */}
//         <div className="absolute top-3 left-3">
//           <div className={`px-4 py-1.5 rounded-full border-[2.5px] border-slate-900 font-black text-[9px] uppercase tracking-widest shadow-[3px_3px_0px_#000] ${isActive ? 'bg-emerald-400' : 'bg-slate-300'}`}>
//             {itemStatus}
//           </div>
//         </div>
//       </div>

//       {/* INFO SECTION */}
//       <div className="px-1 flex-grow">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h3 className={`text-xl font-black uppercase tracking-tight leading-tight ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
//               {data?.itemName}
//             </h3>
//             <div className="flex items-center gap-2 mt-1">
//                <span className="text-sm font-black text-indigo-600">₹{data?.price}</span>
//                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">/ per day</span>
//             </div>
//           </div>
//           <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
//             <MoreHorizontal size={20} className="text-slate-400" />
//           </button>
//         </div>

//         {/* TOGGLE AREA - Rounded & Clean */}
//         <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border-[2px] border-slate-200 mb-5">
//            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Live Status</span>
//            <button 
//              onClick={() => switchStatus(data?._id)} 
//              className={`w-11 h-6 rounded-full border-2 border-slate-900 relative transition-colors ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
//            >
//              <div className={`absolute top-0.5 w-4 h-4 bg-white border-2 border-slate-900 rounded-full transition-transform ${isActive ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
//            </button>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex gap-2">
//           <button 
//             onClick={() => navigate(`/edititem/${data?._id}`)} 
//             // disabled={!isActive}
//             className="flex-grow py-3.5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-[4px_4px_0px_#6366f1] active:translate-y-1 active:shadow-none disabled:opacity-30"
//           >
//             <Edit3 size={14} /> Edit Product
//           </button>
//           <button
//             onClick={() => dispatch(deleteYourItemApi(data?._id))}
//             className="p-3.5 bg-rose-50 text-rose-500 rounded-2xl border-2 border-rose-100 hover:bg-rose-500 hover:text-white hover:border-slate-900 transition-all"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YourItemCard;


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
      
      {/* IMAGE SECTION */}
      <div className="relative h-56 rounded-[1.8rem] overflow-hidden border-[3px] border-slate-900 mb-5 bg-slate-50">
        <img 
          src={data?.images?.[0]?.url} 
          alt={data?.itemName} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!isActive && 'grayscale opacity-50'}`} 
        />
        
        {/* Floating Status Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-4 py-1.5 rounded-full border-[2.5px] border-slate-900 font-black text-[9px] uppercase tracking-widest shadow-[3px_3px_0px_#000] ${isActive ? 'bg-emerald-400' : 'bg-slate-300'}`}>
            {itemStatus}
          </div>
        </div>

        {/* --- EDIT IMAGE OVERLAY BUTTON --- */}
        <button 
          onClick={() => dispatch(setYourItemEditPageStatus(data?._id))}
          className="absolute bottom-3 right-3 p-3 bg-yellow-400 border-[2.5px] border-slate-900 rounded-2xl shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all flex items-center gap-2 group/btn"
        >
          <Camera size={16} strokeWidth={3} />
          <span className="text-[9px] font-[1000] uppercase tracking-tighter">Edit Images</span>
        </button>
      </div>

      {/* INFO SECTION */}
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

        {/* TOGGLE AREA */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border-[2px] border-slate-200 mb-5">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Live Status</span>
           <button 
             onClick={() => switchStatus(data?._id)} 
             className={`w-11 h-6 rounded-full border-2 border-slate-900 relative transition-colors ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
           >
             <div className={`absolute top-0.5 w-4 h-4 bg-white border-2 border-slate-900 rounded-full transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
           </button>
        </div>

        {/* ACTIONS */}
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