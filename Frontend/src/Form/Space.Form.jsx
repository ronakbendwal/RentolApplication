// import React, { useState,useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Building, MapPin, DollarSign, Image as ImageIcon, 
//   Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
//   Info, Star, ArrowLeft, Layers, Maximize, Tag, 
//   Lock, Landmark, Home, Map,
// } from 'lucide-react';
// import axios from 'axios';
// import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
// import {
//   FormInput,
//   FormDescription,
//   Price,
//   Location,
//   Address,
//   Contact,
//   Images,
//   SubmitButton
// } from './Utils/index.js';
// import {useForm} from 'react-hook-form';


// const SpaceForm = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState:{
//       errors,
//       isSubmitting,
//       isSubmitSuccessful
//     }
//   }=useForm({
//     defaultValues:{
//       category:'space',
//     }
//   })


//   const dispatch = useDispatch();
//   const { selectedCategory } = useSelector((state) => state.formopendata);

//   useEffect(() => {
//   if (isSubmitSuccessful) {
//       reset();
//       dispatch(setSelectedCategory(null));
//     }
//   }, [isSubmitSuccessful]);
  
//   const spaceTypes = [
//     "Residential Home", "Apartment/Flat", "Single Room", "Guest House", 
//     "Hostel Room", "Commercial Shop", "Office Space", "Warehouse", 
//     "Open Land", "Residential Plot", "Showroom", "Event Hall"
//   ];
//   const [error,setError]=useState("");

//   if (selectedCategory !== 'realestate') return null;



//  const submit = async (data) => {
//   console.log("RAW FORM DATA:", data);
//   setError("");

//   try {
//     const fd = new FormData();

//     // append normal fields
//     Object.keys(data).forEach((key) => {
//       if (key !== "images" && key !== "specs") {
//         fd.append(key, data[key]);
//       }
//     });

//     // append specs (nested object)
//     if (data.specs) {
//       Object.keys(data.specs).forEach((k) => {
//         fd.append(`specs[${k}]`, data.specs[k]);
//       });
//     }

//     // append images
//     if (data?.images && data.images.length >= 0) {
//       data.images.forEach((file) => {
//         fd.append("images", file);
//       });
//     }

//     const response = await axios.post(
//       "/api/user/rentoutitem",
//       fd,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       }
//     );

//     console.log("SUCCESS:", response.data);

//   } catch (error) {
//     console.log("ERROR:", error);
//     setError(error?.response?.data?.message || "Invalid credentials");
//   }
// };

//   return (
//     <div className="flex-grow bg-[#F9FAFF] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
//       <div className="max-w-4xl mx-auto">
        
//         {/* BACK BUTTON */}
//         <button 
//           onClick={() => dispatch(setSelectedCategory(null))}
//           className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
//         >
//           <ArrowLeft size={18} />
//           Back to Categories
//         </button>

//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-5">
//             <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
//               <Landmark size={32} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">Space Listing</h1>
//               <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Inventory / Real Estate / Add New</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-xs uppercase border border-indigo-100">
//             <Star size={14} fill="currentColor" /> Verified Listing
//           </div>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
//           {/* 1. PROPERTY IDENTITY & AREA */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Tag size={20} className="text-indigo-600" /> Basic Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormInput
//               label='Listing Title'
//               placeholder="e.g. Cozy Guest House in Downtown"
//               innercolor='indigo'
//               {...register('itemName',{required:true})}
//               />

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Maximize size={14}/> Total Area (Sq. Ft / Sq. Yard)</label>
//                 <input type="text" placeholder="e.g. 1200 sq ft" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
//                  {...register('specs.size',{required:true})} />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Layers size={14}/> Space Type</label>
//                 <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium appearance-none"
//                 {...register('specs.type',{required:true})}>
//                   <option value="">Select Category</option>
//                   {spaceTypes.map((type) => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Lock size={14}/> Security Deposit (Refundable)</label>
//                 <div className="relative">
//                   <span className="absolute left-5 top-4 text-gray-400 font-bold">$</span>
//                   <input type="number" placeholder="0.00" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium" 
//                   {...register('deposite',{required:true})}/>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <MapPin size={20} className="text-indigo-600" /> Lease & Location
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//               <Price
//               innercolor="indigo"
//               {...register('price',{required:true})}
//               />
  
//               <Contact
//               innercolor="orange"
//               {...register('contact-number',{required:true})}
//               />

//               <Location
//               innercolor="indigo"
//               {...register('location',{required:true})}
//               />

//             </div>

//             <Address
//             innercolor="indigo"
//             {...register('address',{required:true})}
//             />

//           </div>


//           <Images
//           register={register}
//           setValue={setValue}
//           innercolor="indigo"
//           />

//           <FormDescription
//           heading="Detailed Description"
//           placeholder="Mention amenities (WiFi, Power Backup), nearby landmarks, or rules for guests..."
//           innercolor="indigo"
//           logoclass="text-indigo-600"
//           {...register('description',{required:true})}
//           />


//           <SubmitButton
//           innercolor="indigo"
//           isSubmitting={isSubmitting}
//           name="Space"
//           />

//         </form>
//       </div>
//     </div>
//   );
// };

// export default SpaceForm;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Building, MapPin, ArrowLeft, Layers, Maximize, 
  Tag, Lock, Landmark, Star, IndianRupee, Map, Home
} from 'lucide-react';
import axios from 'axios';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {
  FormInput,
  FormDescription,
  Price,
  Location,
  Address,
  Contact,
  Images,
  SubmitButton
} from './Utils/index.js';
import { useForm } from 'react-hook-form';

const SpaceForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      category: 'space',
    }
  })

  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      dispatch(setSelectedCategory(null));
    }
  }, [isSubmitSuccessful, reset, dispatch]);

  const spaceTypes = [
    "Residential Home", "Apartment/Flat", "Single Room", "Guest House", 
    "Hostel Room", "Commercial Shop", "Office Space", "Warehouse", 
    "Open Land", "Residential Plot", "Showroom", "Event Hall"
  ];

  if (selectedCategory !== 'realestate') return null;

  const submit = async (data) => {
    setError("");
    try {
      const fd = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "images" && key !== "specs") fd.append(key, data[key]);
      });
      if (data.specs) {
        Object.keys(data.specs).forEach((k) => fd.append(`specs[${k}]`, data.specs[k]));
      }
      if (data?.images) {
        data.images.forEach((file) => fd.append("images", file));
      }
      await axios.post("/api/user/rentoutitem", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } catch (error) {
      setError(error?.response?.data?.message || "Submission failed");
    }
  };

  return (
    <div className="flex-grow bg-white min-h-screen overflow-y-auto p-4 md:p-8 animate-in slide-in-from-right duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON - Neo Brutalist */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-6 py-3 mb-8 bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] font-black text-slate-900 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={18} strokeWidth={3} />
          Back To Category
        </button>

        {/* HEADER SECTION - Indigo Theme */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-indigo-600 p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000]">
              <Landmark size={32} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-4xl font-[1000] text-white tracking-tighter uppercase italic leading-none">Space Listing</h1>
              {/* <p className="text-white font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80">Inventory // Real_Estate_&_Rentals</p> */}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
            <Star size={16} strokeWidth={3} fill="currentColor" className="text-yellow-500" /> Verified Listing
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-600 border-[3px] border-slate-900 text-white font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
            Error: {error}
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit(submit)}>
          
          {/* 1. PROPERTY IDENTITY */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <Building size={22} className="text-indigo-600" strokeWidth={3} /> 01. Property Identity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <FormInput
                label='Listing Title'
                placeholder="e.g._cozy_guest_house"
                innercolor='indigo'
                {...register('itemName', { required: true })}
              />

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                  <Maximize size={14} strokeWidth={3}/> Total Area
                </label>
                <input 
                  type="text" 
                  placeholder="e.g._1200_sq_ft" 
                  className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                  {...register('specs.size', { required: true })} 
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                  <Layers size={14} strokeWidth={3}/> Space Type
                </label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                  {...register('specs.type', { required: true })}
                >
                  <option value="">Select Category</option>
                  {spaceTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic  tracking-widest flex items-center gap-2">
                  <Lock size={14} strokeWidth={3}/> Security Deposit
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-900 font-black">₹</span>
                  <input 
                    type="number"
                    inputMode='numeric' 
                    placeholder="0.00" 
                    className="w-full px-5 no-spinner py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                    {...register('deposite', { required: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. LEASE & LOCATION */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <MapPin size={22} className="text-indigo-600" strokeWidth={3} /> 02. Lease & Location
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <Price innercolor="indigo" {...register('price', { required: true })} />
              <Contact innercolor="indigo" {...register('contactNumber', { required: true })} />
              <Location innercolor="indigo" {...register('location', { required: true })} />
            </div>

            <Address innercolor="indigo" {...register('address', { required: true })} />
          </div>

          {/* 3. MEDIA */}
          <div className="neo-gallery-wrapper">
             <Images register={register} setValue={setValue} innercolor="indigo" />
          </div>

          {/* 4. DESCRIPTION */}
          <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
            <FormDescription
              heading="Detailed Documentation"
              placeholder="AMENITIES, NEARBY_LANDMARKS, RULES..."
              innercolor="indigo"
              logoclass="text-indigo-600"
              {...register('description', { required: true })}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <SubmitButton
              isSubmitting={isSubmitting}
              innercolor="indigo"
              name="Space"
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default SpaceForm;