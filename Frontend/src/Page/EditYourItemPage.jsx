// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   RefreshCw, ArrowLeft, Save, Trash2, 
//   AlertTriangle, CheckCircle, Database 
// } from 'lucide-react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import {
//   FormInput, FormDescription, Price, Contact, Location, Condition, Images, SubmitButton,Address
// } from '../Form/Utils/index';

// const EditYourItemPage = () => {
//   const { itemId } = useParams(); // URL se ID uthayenge
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState: { isSubmitting }
//   } = useForm();

//   // 1. Fetch Existing Data
//   useEffect(() => {
//     const fetchItemData = async () => {
//       try {
//         const response = await axios.get(`/api/user/item/${itemId}`);
//         const item = response.data;
        
//         // Form mein purana data load karna
//         reset(item); 
//         setLoading(false);
//       } catch (err) {
//         setError("FAILED_TO_LOAD_ASSET_DATA");
//         setLoading(false);
//       }
//     };
//     fetchItemData();
//   }, [itemId, reset]);

//   const onUpdate = async (data) => {
//     setError("");
//     try {
//       const fd = new FormData();
//       // Logic for nested specs and images
//       Object.keys(data).forEach((key) => {
//         if (key !== "images" && key !== "specs") fd.append(key, data[key]);
//       });
//       if (data.specs) {
//         Object.keys(data.specs).forEach((k) => fd.append(`specs[${k}]`, data.specs[k]));
//       }
//       // Note: Only append new images if user selected them
//       if (data?.images?.length > 0) {
//         data.images.forEach((file) => fd.append("images", file));
//       }

//       await axios.put(`/api/user/updateitem/${itemId}`, fd);
//       alert("ASSET_SYNCHRONIZED_SUCCESSFULLY");
//       navigate('/dashboard'); // Wapas bhej dena
//     } catch (err) {
//       setError(err?.response?.data?.message || "UPDATE_SEQUENCE_FAILED");
//     }
//   };

//   if (loading) return (
//     <div className="h-screen flex items-center justify-center bg-slate-50">
//       <div className="flex flex-col items-center gap-4">
//         <RefreshCw className="animate-spin text-blue-600" size={48} strokeWidth={3} />
//         <p className="font-[1000] uppercase tracking-widest text-slate-900">Fetching_Data_Core...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-bold text-slate-900">
//       <div className="max-w-5xl mx-auto space-y-10">
        
//         {/* HEADER: DUAL ACTION */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//           <div className="bg-white border-[4px] border-slate-900 p-6 shadow-[6px_6px_0px_#000] -rotate-1">
//             <h1 className="text-4xl font-[1000] uppercase tracking-tighter italic flex items-center gap-3">
//               <Database className="text-blue-600" /> Edit_Registry
//             </h1>
//             <p className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-widest">
//               UUID: {itemId} // MODE: REVISION
//             </p>
//           </div>
          
//           <button 
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 px-6 py-3 bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-xs"
//           >
//             <ArrowLeft size={16} strokeWidth={3} /> Abort_Changes
//           </button>
//         </div>

//         {error && (
//           <div className="bg-rose-500 text-white p-4 border-[4px] border-black shadow-[6px_6px_0px_#000] font-black uppercase text-xs flex items-center gap-3">
//             <AlertTriangle size={20} /> {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onUpdate)} className="space-y-12 pb-20">
          
//           {/* SECTION 01: IDENTITY UPDATE */}
//           <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[10px_10px_0px_#000] relative">
//             <div className="absolute -top-4 -right-4 bg-yellow-400 border-[3px] border-black px-4 py-1 text-[10px] font-black rotate-3">
//               MODIFICATION_ENABLED
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
//               <FormInput 
//                 label="Asset_Name" 
//                 innercolor="blue" 
//                 {...register('itemName', { required: true })} 
//               />
//               <Condition 
//                 innercolor="blue" 
//                 register={register} 
//                 watch={watch} 
//                 setValue={setValue} 
//               />
//             </div>
//           </div>

//           {/* SECTION 02: LOGISTICS & PRICING */}
//           <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[10px_10px_0px_#000] rotate-1">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//               <Price innercolor="blue" {...register('price', { required: true })} />
//               <Contact innercolor="blue" {...register('contactNumber', { required: true })} />
//               <Location innercolor="blue" {...register('location', { required: true })} />
//             </div>
//             <Address innercolor="blue" {...register('address', { required: true })} />
//           </div>

//           {/* SECTION 03: MEDIA RE-UPLOAD */}
//           <div className="bg-white p-2 border-[4px] border-slate-900 shadow-[10px_10px_0px_#000]">
//              <div className="bg-slate-900 text-white p-3 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
//                Visual_Assets_Library
//              </div>
//              <Images register={register} setValue={setValue} innercolor="blue" />
//              <p className="p-4 text-[10px] text-slate-400 italic">
//                * Uploading new images will override the existing asset gallery.
//              </p>
//           </div>

//           {/* SECTION 04: DESCRIPTION */}
//           <FormDescription
//             heading="Technical_Manifesto"
//             innercolor="blue"
//             {...register('description', { required: true })}
//           />

//           {/* FINAL ACTIONS */}
//           <div className="flex flex-col md:flex-row justify-end gap-6 pt-10">
//             <button 
//               type="button"
//               className="px-10 py-5 bg-rose-100 border-[4px] border-rose-600 text-rose-600 font-[1000] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-[6px_6px_0px_#e11d48]"
//             >
//               <Trash2 size={20} className="inline mr-2" /> Decommission_Asset
//             </button>
            
//             <div className="w-full md:w-80">
//               <SubmitButton 
//                 isSubmitting={isSubmitting} 
//                 innercolor="blue" 
//                 name="Update_Asset_Data" 
//               />
//             </div>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditYourItemPage;



// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//   RefreshCw, ArrowLeft, Save, Trash2, 
//   AlertTriangle, Database, Pencil, HardHat, Settings,
//   ChartNoAxesColumnDecreasing
// } from 'lucide-react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import {
//   FormInput, FormDescription, Price, Contact, 
//   Address, Location, Condition, Images, SubmitButton
// } from '../Form/Utils/index.js';

// const EditItemPage = () => {
//   const { id} = useParams();
//   console.log("edit item useparam",id)
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm();

//   useEffect(() => {
//     const fetchItemData = async () => {
//       try {
//         console.log("inside api call")
//         const response = await axios.get(`/api/user/getitem/${id}`);
//         console.log(response.data.data.currentitem)
//         // reset(response.data); 
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//       }
//     };
//     fetchItemData();
//   }, [id, reset]);

//   if (loading) return (
//     <div className="h-screen flex items-center justify-center bg-[#f0f0f0]">
//        <div className="p-10 border-[6px] border-black bg-white shadow-[12px_12px_0px_#000] flex items-center gap-4">
//           <RefreshCw className="animate-spin" size={32} />
//           <h2 className="text-2xl font-[1000] uppercase tracking-tighter">Synchronizing_Core...</h2>
//        </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#e5e5e5] p-6 md:p-16 font-black text-slate-900 overflow-x-hidden">
//       <div className="max-w-6xl mx-auto relative">
        
//         {/* --- HEADER: FLOATING OVERLAP STYLE --- */}
//         <div className="relative z-20 mb-20">
//           <div className="bg-indigo-600 border-[6px] border-black p-8 shadow-[12px_12px_0px_#000] inline-block -rotate-1">
//             <h1 className="text-4xl md:text-6xl font-[1000] uppercase tracking-tighter text-white leading-none">
//               RE-CONFIG: <span className="text-yellow-400">ASSET_{id?.slice(-4)}</span>
//             </h1>
//           </div>
          
//           <button 
//             onClick={() => navigate(-1)}
//             className="absolute -top-6 right-0 bg-white border-[4px] border-black px-6 py-3 shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-xs flex items-center gap-2"
//           >
//             <ArrowLeft size={16} strokeWidth={3} /> Return_To_Base
//           </button>
//         </div>

//         <form onSubmit={handleSubmit((data) => console.log(data))} className="grid grid-cols-12 gap-8">
          
//           {/* --- LEFT SIDE: THE SETTINGS PANEL --- */}
//           <div className="col-span-12 lg:col-span-4 space-y-8">
            
//             {/* Asset Status Block */}
//             <div className="bg-white border-[5px] border-black p-6 shadow-[8px_8px_0px_#000] rotate-1">
//                <div className="flex items-center gap-3 mb-6 border-b-[3px] border-black pb-3">
//                   <Settings size={20} className="text-indigo-600" />
//                   <h3 className="uppercase text-sm tracking-widest">System_Status</h3>
//                </div>
//                <div className="space-y-4">
//                   <div className="flex justify-between text-[10px] uppercase border-b border-slate-200 py-2">
//                     <span className="text-slate-400">Registry_Date:</span>
//                     <span>12_FEB_2026</span>
//                   </div>
//                   <div className="flex justify-between text-[10px] uppercase border-b border-slate-200 py-2">
//                     <span className="text-slate-400">Visibility:</span>
//                     <span className="text-green-600">Public_Live</span>
//                   </div>
//                </div>
//             </div>

//             {/* Media Block (Simplified Visual) */}
//             <div className="bg-yellow-400 border-[5px] border-black p-4 shadow-[8px_8px_0px_#000] -rotate-1">
//                <div className="bg-black text-white p-2 text-center text-[10px] uppercase tracking-[0.3em] mb-4">
//                   Visual_Override_Terminal
//                </div>
//                <Images register={register} setValue={setValue} innercolor="indigo" />
//             </div>
//           </div>

//           {/* --- RIGHT SIDE: DATA CORE --- */}
//           <div className="col-span-12 lg:col-span-8 space-y-10">
            
//             {/* Primary Config Block */}
//             <div className="bg-white border-[6px] border-black p-8 md:p-12 shadow-[12px_12px_0px_#4f46e5]">
//                <h2 className="text-2xl font-[1000] uppercase mb-10 flex items-center gap-4 italic">
//                  <HardHat className="text-indigo-600" size={28} strokeWidth={3} /> 01. Primary_Configuration
//                </h2>
               
//                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                   <FormInput label="Asset_Identifier" innercolor="indigo" {...register('itemName')} />
//                   <Condition register={register} watch={watch} setValue={setValue} innercolor="indigo" />
//                </div>
               
//                <div className="mt-10 pt-10 border-t-[3px] border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
//                   <Price innercolor="indigo" {...register('price')} />
//                   <Contact innercolor="indigo" {...register('contactNumber')} />
//                   <Location innercolor="indigo" {...register('location')} />
//                </div>
//             </div>

//             {/* Logistics Block */}
//             <div className="bg-indigo-50 border-[5px] border-black p-8 shadow-[10px_10px_0px_#000] rotate-1">
//                <Address innercolor="indigo" {...register('address')} />
//             </div>

//             {/* Manifesto Block */}
//             <div className="bg-white border-[6px] border-black shadow-[10px_10px_0px_#000]">
//                <FormDescription 
//                 heading="Technical_Manifesto" 
//                 innercolor="indigo" 
//                 {...register('description')} 
//                />
//             </div>

//             {/* ACTION TERMINAL */}
//             <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-10">
//                <button className="flex items-center gap-3 text-rose-600 uppercase text-xs font-black hover:underline decoration-4 underline-offset-4">
//                   <Trash2 size={18} /> Wipe_Asset_From_Registry
//                </button>
               
//                <div className="w-full md:w-80">
//                   <SubmitButton 
//                     isSubmitting={isSubmitting} 
//                     innercolor="indigo" 
//                     name="Commit_Configuration" 
//                   />
//                </div>
//             </div>

//           </div>
//         </form>

//         {/* --- DECORATIVE BG TEXT --- */}
//         <div className="fixed -bottom-10 -right-20 text-[18rem] font-black text-black/[0.04] pointer-events-none -z-10 uppercase select-none">
//           Update
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditItemPage;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  RefreshCw, ArrowLeft, Trash2, 
  Database, HardHat, Settings
} from 'lucide-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  FormInput, FormDescription, Price, Contact, 
  Address, Location, Condition, Images, SubmitButton
} from '../Form/Utils/index.js';
import { useSelector } from 'react-redux';

const EditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data,setdata]=useState('')

  const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`/api/user/getitem/${id}`);
        setdata(response.data.data.currentitem)
        const responsedata=response.data.data.currentitem
        console.log("response data",responsedata)
        reset(responsedata); 
        setValue('images',responsedata.images)
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchItemData();
  }, [id, reset,setValue]);


  const submit=async(data)=>{

    console.log("submit data", data)
    try{
      const response=await axios.patch(`/api/user/updateitem/${id}`,data)
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#f0f0f0]">
       <div className="p-10 border-[6px] border-black bg-white shadow-[12px_12px_0px_#000] flex items-center gap-4">
          <RefreshCw className="animate-spin" size={32} />
          <h2 className="text-2xl font-[1000] uppercase tracking-tighter">Wait....</h2>
       </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-[#e5e5e5] p-6 md:p-16 font-black text-slate-900 overflow-x-hidden">
      <div className="max-w-6xl mx-auto relative">
        
        {/* --- HEADER: FLOATING OVERLAP STYLE --- */}
        <div className="relative z-20 mb-20">
          <div className="bg-indigo-600 border-[6px] border-black p-8 shadow-[12px_12px_0px_#000] inline-block -rotate-1">
            <h1 className="text-4xl md:text-6xl font-[1000] uppercase tracking-tighter text-white leading-none">
              Edit: <span className="text-yellow-400">ASSET_{id?.slice(-4)}</span>
            </h1>
          </div>
          
          <button 
            onClick={() => navigate(-1)}
            className="absolute -top-6 right-0 bg-white border-[4px] border-black px-6 py-3 shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-xs flex items-center gap-2"
          >
            <ArrowLeft size={16} strokeWidth={3} /> Return To Item
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-12 gap-8">
          
          {/* --- LEFT SIDE: THE STATUS PANEL --- */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-white border-[5px] border-black p-6 shadow-[8px_8px_0px_#000] rotate-1">
               <div className="flex items-center gap-3 mb-6 border-b-[3px] border-black pb-3">
                  <Settings size={20} className="text-indigo-600" />
                  <h3 className="uppercase text-sm tracking-widest">System Status</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between text-[10px] uppercase border-b border-slate-200 py-2">
                    <span className="text-slate-400">Listing Date:</span>
                    <span>{ new Date(data.createdAt).toLocaleDateString("en-GB") }</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase border-b border-slate-200 py-2">
                    <span className="text-slate-400">Last UpDate At:</span>
                    <span>{ new Date(data.updatedAt).toLocaleDateString("en-GB")===new Date(data.createdAt).toLocaleDateString("en-GB") ? ("Nothing") : new Date(data.updatedAt).toLocaleDateString("en-GB")}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase border-b border-slate-200 py-2">
                    <span className="text-slate-400">Visibility:</span>
                    <span className="text-green-600">{data.status}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: DATA CORE --- */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
            
            {/* Primary Config Block */}
            <div className="bg-white border-[6px] border-black p-8 md:p-12 shadow-[12px_12px_0px_#4f46e5]">
               <h2 className="text-2xl font-[1000] uppercase mb-10 flex items-center gap-4 italic">
                 <HardHat className="text-indigo-600" size={28} strokeWidth={3} /> 01. Primary Configuration
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FormInput label="Asset_Identifier" innercolor="indigo" {...register('itemName')} />
                  <Condition register={register} watch={watch} setValue={setValue} innercolor="indigo" />
               </div>
               
               <div className="mt-10 pt-10 border-t-[3px] border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Price innercolor="indigo" {...register('price')} />
                  <Contact innercolor="indigo" {...register('contactNumber')} />
                  <Location innercolor="indigo" {...register('location')} />
               </div>
            </div>

            {/* Logistics Block */}
            <div className="bg-indigo-50 border-[5px] border-black p-8 shadow-[10px_10px_0px_#000] rotate-1">
               <Address innercolor="indigo" {...register('address')} />
            </div>

            {/* --- RE-POSITIONED IMAGE SECTION (Full-Width Style) ---
            <div className="bg-white p-2 border-[6px] border-black shadow-[10px_10px_0px_#000]">
               <div className="bg-slate-900 text-white p-3 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                  Visual Assets
               </div>
               <div className="p-4">
                  <Images register={register} setValue={setValue} watch={watch} innercolor="indigo" />
               </div>
            </div> */}

            {/* Manifesto Block */}
            <div className="bg-white border-[6px] border-black shadow-[10px_10px_0px_#000]">
               <FormDescription 
                heading="Technical Manifesto" 
                innercolor="indigo" 
                {...register('description')} 
               />
            </div>

            {/* ACTION TERMINAL */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-10">
         
               
               <div >
                  <SubmitButton 
                    isSubmitting={isSubmitting} 
                    innercolor="indigo" 
                  />
               </div>
            </div>

          </div>
        </form>
      </div>
    </div>


  );
};

export default EditItemPage;
