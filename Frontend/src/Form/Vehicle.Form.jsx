// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Car, Fuel, DollarSign, Image as ImageIcon, 
//   Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
//   Info, Star, ArrowLeft, MapPin, Calendar, Tag, Map,
//   Layers, Wallet // Added Wallet for Security Deposit
// } from 'lucide-react';
// import axios from 'axios';
// import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
// import {
//   FormInput, 
//   FormDescription,
//   Price,
//   Contact,
//   Address,
//   Location, 
//   Condition,
//   Images,
//   SubmitButton
// } from './Utils/index.js'
// import {useForm} from 'react-hook-form'
// const VehicleForm = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState:{
//       errors,
//       isSubmitting,
//       isSubmitSuccessful
//     }
//   }=useForm({
//     defaultValues:{
//       category:'vehicle',
//       condition:"Excellent"
//     }
//   })
//   const dispatch = useDispatch();
//   const { selectedCategory } = useSelector((state) => state.formopendata);
//   const [error,setError]=useState("")

//   useEffect(()=>{
//     if(isSubmitSuccessful){
//       reset()
//       dispatch(setSelectedCategory(null))
//     }
//   },[isSubmitSuccessful])


//   const vehicleTypes = [
//     "Sedan", "SUV", "Hatchback", "Luxury / Sport", 
//     "Crossover", "Convertible", "Coupe", "Mini Van",
//     "Pickup Truck", "Cargo Van", "Commercial Truck",
//     "Bus / Coach", "Minibus", "Ambulance / Special"
//   ];

//   if (selectedCategory !== 'cars') return null;


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
//     <div className="flex-grow bg-[#F8FAFC] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
//       <div className="max-w-4xl mx-auto">
        
//         {/* BACK BUTTON */}
//         <button 
//           onClick={() => dispatch(setSelectedCategory(null))}
//           className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-blue-600 transition-all shadow-sm group active:scale-95"
//         >
//           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
//           Back to Categories
//         </button>

//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100">
//               <Car size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black text-gray-900 tracking-tight">Vehicle Details</h1>
//               <p className="text-gray-500 font-medium text-xs uppercase tracking-widest">Listing / Vehicles / Add New</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm">
//             <Star size={16} fill="currentColor" /> Premium Listing
//           </div>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
//           {/* 1. IDENTITY & CONDITION BAR */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Tag size={20} className="text-blue-600" /> Basic Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormInput
//               label="Vehicle Name / Model"
//               placeholder="e.g. BMW M4 Competition"
//               innercolor='blue'
//               {...register('itemName',{required:true})}
//               />



//               <Condition
//               innercolor="blue"
//               register={register}
//               watch={watch}
//               setValue={setValue}
//               />

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Layers size={14}/> Vehicle Type</label>
//                 <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium appearance-none"
//                 {...register('specs.type',{required:true})}>
//                   <option value="">Select Category</option>
//                   {vehicleTypes.map((type) => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Fuel size={14}/> Fuel Type</label>
//                 <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium appearance-none"
//                 {...register('specs.fuelType',{required:true})}>
//                   <option>Petrol</option><option>Electric</option><option>Diesel</option><option>Hybrid</option><option>CNG</option>
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
//                 <div className="space-y-2">
//                   <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Calendar size={14}/> Manufacturing Year</label>
//                   <input type="number" placeholder="2024" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" 
//                   {...register('specs.purchaseYear',{required:true})}/>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Wallet size={14}/> Security Deposit</label>
//                   <div className="relative">
//                     <span className="absolute left-5 top-4 text-gray-400 font-bold">$</span>
//                     <input type="number" placeholder="Refundable amount" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
//                     {...register('specs.securityDeposite',{required:true})} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <MapPin size={20} className="text-blue-600" /> Rental & Pickup Details
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//               <Price
//               innercolor="blue"
//               {...register('price',{required:true})}
//               />
              
//               <Contact
//               innercolor="blue"
//               {...register('contactNumber',{required:true})}
//               />

//               <Location
//               innercolor="blue"
//               {...register('location',{required:true})}
//               />
//             </div>

//             <Address
//             innercolor="blue"
//             {...register('address',{required:true})}
//             />
//           </div>



//           <Images
//           register={register}
//           setValue={setValue}
//           innercolor="blue"
//           />

//           <FormDescription
//           heading="Description"
//           placeholder="Tell us about the vehicle features, AC, mileage, or special rental rules..."
//           innercolor="blue"
//           logoclass="text-blue-600"
//           {...register('description',{required:true})}
//           />

//           <SubmitButton
//           innercolor="blue"
//           isSubmitting={isSubmitting}
//           name="Vehicle"
//            />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VehicleForm;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Car, Fuel, ArrowLeft, MapPin, Calendar, Tag, 
//   Layers, Wallet, Star, IndianRupee, Map
// } from 'lucide-react';
// import axios from 'axios';
// import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
// import {
//   FormInput, 
//   FormDescription,
//   Price,
//   Contact,
//   Address,
//   Location, 
//   Condition,
//   Images,
//   SubmitButton
// } from './Utils/index.js'
// import { useForm } from 'react-hook-form'

// const VehicleForm = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState: { isSubmitting, isSubmitSuccessful }
//   } = useForm({
//     defaultValues: {
//       category: 'vehicle',
//       condition: "Excellent"
//     }
//   })

//   const dispatch = useDispatch();
//   const { selectedCategory } = useSelector((state) => state.formopendata);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (isSubmitSuccessful) {
//       reset()
//       dispatch(setSelectedCategory(null))
//     }
//   }, [isSubmitSuccessful, reset, dispatch])

//   const vehicleTypes = [
//     "Sedan", "SUV", "Hatchback", "Luxury / Sport", 
//     "Crossover", "Convertible", "Coupe", "Mini Van",
//     "Pickup Truck", "Cargo Van", "Commercial Truck",
//     "Bus / Coach", "Minibus"
//   ];

//   if (selectedCategory !== 'cars') return null;

//   const submit = async (data) => {
//     setError("");
//     try {
//       const fd = new FormData();
//       Object.keys(data).forEach((key) => {
//         if (key !== "images" && key !== "specs") fd.append(key, data[key]);
//       });
//       if (data.specs) {
//         Object.keys(data.specs).forEach((k) => fd.append(`specs[${k}]`, data.specs[k]));
//       }
//       if (data?.images) {
//         data.images.forEach((file) => fd.append("images", file));
//       }
//       await axios.post("/api/user/rentoutitem", fd, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//     } catch (error) {
//       setError(error?.response?.data?.message || "Fleet registry failed");
//     }
//   };

//   return (
//     <div className="flex-grow bg-white min-h-screen overflow-y-auto p-4 md:p-8 animate-in slide-in-from-right duration-500">
//       <div className="max-w-4xl mx-auto">
        
//         {/* BACK BUTTON - Neo Brutalist */}
//         <button 
//           onClick={() => dispatch(setSelectedCategory(null))}
//           className="flex items-center gap-2 px-6 py-3 mb-8 bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] font-black text-slate-900 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all uppercase text-xs tracking-widest"
//         >
//           <ArrowLeft size={18} strokeWidth={3} />
//           Back To Category
//         </button>

//         {/* HEADER SECTION - Blue Theme */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-blue-500 p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
//           <div className="flex items-center gap-5">
//             <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000]">
//               <Car size={32} strokeWidth={3} />
//             </div>
//             <div>
//               <h1 className="text-4xl font-[1000] text-white tracking-tighter uppercase italic leading-none">Vehicle Destail</h1>
//               <p className="text-blue-950 font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80">Inventory // Transport & Automotive</p>
//             </div>
//           </div>
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
//             <Star size={16} strokeWidth={3} fill="currentColor" className="text-yellow-500" /> Premium_Fleet
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-rose-600 border-[3px] border-slate-900 text-white font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
//             Error: {error}
//           </div>
//         )}

//         <form className="space-y-10" onSubmit={handleSubmit(submit)}>
          
//           {/* 1. VEHICLE IDENTITY */}
//           <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
//             <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
//               <Tag size={22} className="text-blue-600" strokeWidth={3} /> 01. Machine_Identity
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
//               <FormInput
//                 label="Vehicle Model"
//                 placeholder="e.g._bmw_m4_competition"
//                 innercolor='blue'
//                 {...register('itemName', { required: true })}
//               />

//               <Condition
//                 innercolor="blue"
//                 register={register}
//                 watch={watch}
//                 setValue={setValue}
//               />

//               <div className="space-y-3">
//                 <label className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                   <Layers size={14} strokeWidth={3}/> Category
//                 </label>
//                 <select 
//                   className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none"
//                   {...register('specs.type', { required: true })}
//                 >
//                   <option value="">Select_Type</option>
//                   {vehicleTypes.map((type) => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                   <Fuel size={14} strokeWidth={3}/> Vehicle Type
//                 </label>
//                 <select 
//                   className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none"
//                   {...register('specs.fuelType', { required: true })}
//                 >
//                   <option>Petrol</option><option>Electric</option><option>Diesel</option><option>Hybrid</option><option>CNG</option>
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-6 col-span-1 md:col-span-2">
//                 <div className="space-y-3">
//                   <label className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                     <Calendar size={14} strokeWidth={3}/> MFG Year
//                   </label>
//                   <input 
//                     type="number" 
//                     placeholder="2024" 
//                     className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold" 
//                     {...register('specs.purchaseYear', { required: true })}
//                   />
//                 </div>

//                 <div className="space-y-3">
//                   <label className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                     <Wallet size={14} strokeWidth={3}/> Security Deposit
//                   </label>
//                   <div className="relative">
//                     <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-900 font-black">₹</span>
//                     <input 
//                       type="number" 
//                       placeholder="amt" 
//                       className="w-full pl-10 pr-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold"
//                       {...register('specs.securityDeposite', { required: true })} 
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 2. LOGISTICS */}
//           <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
//             <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
//               <MapPin size={22} className="text-blue-600" strokeWidth={3} /> 02. Rental & Pickup
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//               <Price innercolor="blue" {...register('price', { required: true })} />
//               <Contact innercolor="blue" {...register('contactNumber', { required: true })} />
//               <Location innercolor="blue" {...register('location', { required: true })} />
//             </div>

//             <Address innercolor="blue" {...register('address', { required: true })} />
//           </div>

//           {/* 3. VISUAL ASSETS */}
//           <div className="neo-gallery-wrapper">
//              <Images register={register} setValue={setValue} innercolor="blue" />
//           </div>

//           {/* 4. DESCRIPTION */}
//           <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
//             <FormDescription
//               heading="Operational_Manifesto"
//               placeholder="AC_SPECS, MILEAGE_LIMITS, RENTAL_RULES, DRIVER_REQUIREMENTS..."
//               innercolor="blue"
//               logoclass="text-blue-600"
//               {...register('description', { required: true })}
//             />
//           </div>

//           {/* SUBMIT */}
//           <div className="pt-4">
//             <SubmitButton
//               isSubmitting={isSubmitting}
//               innercolor="blue"
//               name="Deploy_Vehicle"
//             />
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default VehicleForm;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Car, Fuel, ArrowLeft, MapPin, Calendar, Tag, 
  Layers, Wallet, Star
} from 'lucide-react';
import axios from 'axios';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {
  FormInput, 
  FormDescription,
  Price,
  Contact,
  Address,
  Location, 
  Condition,
  Images,
  SubmitButton
} from './Utils/index.js'
import { useForm } from 'react-hook-form'

const VehicleForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      category: 'vehicle',
      condition: "Excellent",
      specs: {
        fuelType: 'Petrol'
      }
    }
  })

  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
      dispatch(setSelectedCategory(null))
    }
  }, [isSubmitSuccessful, reset, dispatch])

  const vehicleTypes = [
    "Sedan", "SUV", "Hatchback", "Luxury / Sport", 
    "Crossover", "Convertible", "Coupe", "Mini Van",
    "Pickup Truck", "Cargo Van", "Commercial Truck",
    "Bus / Coach", "Minibus"
  ];

  const FuleType=[
    "Petrol","Diesel","CNG","Electric","Hybrid"
  ]

  if (selectedCategory !== 'cars') return null;

  const submit = async (data) => {
    setError("");
    try {
      const fd = new FormData();
      // Separating nested specs for FormData
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
      alert("Vehicle Deployed Successfully!");
    } catch (error) {
      setError(error?.response?.data?.message || "Fleet registry failed");
    }
  };

  return (
    <div className="flex-grow bg-slate-50 min-h-screen overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* NAV BAR */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => dispatch(setSelectedCategory(null))}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] font-black text-slate-900 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-[10px] tracking-[0.2em]"
          >
            <ArrowLeft size={16} strokeWidth={3} />
            Back TO Category
          </button>
        </div>

        {/* HERO HEADER */}
        <div className="relative group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-blue-500 p-8 border-[4px] border-slate-900 shadow-[10px_10px_0px_#000]">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000] -rotate-2">
                <Car size={32} strokeWidth={3} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-[1000] text-white tracking-tighter uppercase italic leading-none">Vehicle Listing</h1>
                {/* <p className="text-blue-950 font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80 italic underline decoration-2">Transport_Automotive_Core</p> */}
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
              <Star size={16} strokeWidth={3} fill="currentColor" /> Premium Registry
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-500 border-[3px] border-slate-900 text-white font-[1000] uppercase text-xs shadow-[4px_4px_0px_#000] animate-bounce">
            SYSTEM_ERROR: {error}
          </div>
        )}

        <form className="space-y-10 pb-20" onSubmit={handleSubmit(submit)}>
          
          {/* SECTION 01: MACHINE IDENTITY */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-[1000] text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tighter">
              <Tag size={22} className="text-blue-600" strokeWidth={3} /> 01. Identification Protocol
            </h2>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label="Model Designation"
                  placeholder="E.G._TOYOTA_SUPRA_MK4"
                  innercolor='blue'
                  {...register('itemName', { required: true })}
                />
                <Condition
                  innercolor="blue"
                  register={register}
                  watch={watch}
                  setValue={setValue}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-[1000] text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                    <Layers size={14} strokeWidth={3}/> vehicle Type
                  </label>
                  <select 
                    className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                    {...register('specs.type', { required: true })}
                  >
                    <option className={"text-slate-900"} value="">Select Type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>{type.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-[1000] text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                    <Fuel size={14} strokeWidth={3}/> Fuel Type
                  </label>
                  <select 
                    className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                    {...register('specs.fuelType', { required: true })}
                  >
                    <option className={"text-slate-900"} value="">Fule Type..</option>
                    {
                      FuleType.map((type)=> (
                        <option key={type} value={type} >{type.toUpperCase()}</option>
                      ))
                    }
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-[1000] text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                    <Calendar size={14} strokeWidth={3}/> MFG YEAR
                  </label>
                  <input 
                    type="number"
                    inputMode="numeric" 
                    placeholder="2026" 
                    className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1  no-spinner"
                    onInput={(e) => {
                      if (e.target.value.length > 4) {
                        e.target.value = e.target.value.slice(0, 4);
                      }
                    }} 
                    {...register('specs.purchaseYear', { required: true })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-[1000] text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                    <Wallet size={14} strokeWidth={3}/> Security Deposit
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-900 font-black">₹</span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      inputMode="numeric"
                      className="w-full no-spinner pl-10 pr-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                      {...register('specs.securityDeposite', { required: true })} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 02: LOGISTICS */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-[1000] text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tighter">
              <MapPin size={22} className="text-blue-600" strokeWidth={3} /> 02. Logistics & Access
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <Price innercolor="blue" {...register('price', { required: true })} />
              <Contact innercolor="blue" {...register('contactNumber', { required: true })} />
              <Location innercolor="blue" {...register('location', { required: true })} />
            </div>

            <Address innercolor="blue" {...register('address', { required: true })} />
          </div>

          {/* SECTION 03: VISUALS */}
          <Images register={register} setValue={setValue} innercolor="blue" />

          {/* SECTION 04: MANIFESTO */}
          <FormDescription
            heading="Operational Terms"
            placeholder="MILEAGE_CAPS, FUEL_POLICIES, DRIVER_AGE_RESTRICTIONS..."
            innercolor="blue"
            logoclass="text-blue-600"
            {...register('description', { required: true })}
          />

          {/* DEPLOY BUTTON */}
          <div className="flex justify-end pt-4">
            <div className="w-full md:w-72">
               <SubmitButton
                isSubmitting={isSubmitting}
                innercolor="blue"
                name="Vehicle"
              />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default VehicleForm;