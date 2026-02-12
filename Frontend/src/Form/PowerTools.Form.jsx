// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Hammer, Drill, Zap, HardHat, DollarSign, Image as ImageIcon, 
//   Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
//   Info, Star, ArrowLeft, MapPin, Settings, Wrench, Tag,
//   Phone, Briefcase, Map, Wallet, Search, // Added Wallet and Search
//   IndianRupee
// } from 'lucide-react';
// import axios from 'axios';
// import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
// import {
//   FormDescription,
//   FormInput,
//   Price,
//   Location,
//   Address,
//   Contact,
//   Condition,
//   Images,
//   SubmitButton
// } from './Utils/index.js'
// import { useForm } from 'react-hook-form';

// const PowerToolForm = () => {
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
//       category:'power tools',
//       condition:"Excellent"
//     }
//   })
//   const dispatch = useDispatch();
//   const { selectedCategory } = useSelector((state) => state.formopendata);
  
//   useEffect(()=>{
//     if(isSubmitSuccessful){
//       reset();
//       dispatch(setSelectedCategory(null))
//     }
//   },[isSubmitSuccessful])

//   const [activeSafety, setActiveSafety] = useState([]);
//   const [error,setError]=useState("")
//   const [toolType, setToolType] = useState(''); // State for custom tool type

//   const toolSuggestions = [
//     "Hammer Drill", "Impact Driver", "Circular Saw", "Angle Grinder", 
//     "Jigsaw", "Orbital Sander", "Mitre Saw", "Table Saw", 
//     "Reciprocating Saw", "Nail Gun", "Air Compressor", "Generator",
//     "Pressure Washer", "Jackhammer", "Ladder", "Concrete Mixer"
//   ];

//   if (selectedCategory !== 'tools') return null;


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
//     <div className="flex-grow bg-[#FDFCFB] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
//       <div className="max-w-4xl mx-auto">
        
//         {/* BACK BUTTON */}
//         <button 
//           onClick={() => dispatch(setSelectedCategory(null))}
//           className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-orange-600 transition-all shadow-sm group active:scale-95"
//         >
//           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
//           Back to Categories
//         </button>

//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-5">
//             <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-orange-100">
//               <Wrench size={32} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">List Your Equipment</h1>
//               <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Inventory / Power Tools / Listing</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-orange-100">
//             <Zap size={14} fill="currentColor" /> Pro Partner
//           </div>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
//           {/* 1. TOOL IDENTITY & CONDITION */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Drill size={20} className="text-orange-500" /> Tool Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormInput
//               label='Brand & Model Name'
//               placeholder="e.g. Bosch Professional Hammer Drill"
//               innercolor='orange'
//               {...register('itemName',{required:true})}
//               />

//               {/* SEARCHABLE TOOL TYPE FIELD */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Search size={14}/> Tool Type</label>
//                 <input 
//                    type='text'
//                   list="tool-types"
//                   placeholder="e.g. Drill, Saw..." 
//                   className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium" 
//                   {...register('specs.toolType',{required:true})}
//                 />
//                 <datalist id="tool-types">
//                   {toolSuggestions.map((type) => (
//                     <option key={type} value={type} />
//                   ))}
//                 </datalist>
//               </div>

//               {/* SECURITY DEPOSIT FIELD */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Wallet size={14}/> Security Deposit</label>
//                 <div className="relative">
//                   <span className="absolute left-5 top-4 text-gray-400 font-bold">₹</span>
//                   <input type="number" placeholder="Refundable amount" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium"
//                   {...register('specs.securityDeposite',{required:true})} />
//                 </div>
//               </div>


//               <Condition
//               innercolor="orange"
//               register={register}
//               watch={watch}
//               setValue={setValue}
//               />
//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <IndianRupee size={20} className="text-orange-500" /> Rental Terms
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

//               <Price
//               innercolor="orange"
//               {...register('price',{required:true})}
//               />

//               <Contact
//               innercolor="orange"
//               {...register('contactNumber',{required:true})}
//               />

//               <Location
//               innercolor="orange"
//               {...register('location',{required:true})}
//               />
//             </div>
//             <Address
//             innercolor="orange"
//             {...register('address',{required:true})}
//             />

//           </div>

//           <Images
//           register={register}
//           setValue={setValue}
//           innercolor="orange"
//           />

//           <FormDescription
//           heading="Technical Description"
//           placeholder="Describe condition, battery life, included bits, and usage rules..."
//           innercolor="orange"
//           logoclass="text-orange-500"
//           {...register('description',{required:true})}
//           />


//           <SubmitButton
//           isSubmitting={isSubmitting}
//           innercolor="orange"
//           name="Tool"
//           />

//         </form>
//       </div>
//     </div>
//   );
// };

// export default PowerToolForm;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Drill, Zap, ArrowLeft, Search, Wallet, 
//   Wrench, IndianRupee, Hammer, Settings, Tag, Info 
// } from 'lucide-react';
// import axios from 'axios';
// import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
// import {
//   FormDescription,
//   FormInput,
//   Price,
//   Location,
//   Address,
//   Contact,
//   Condition,
//   Images,
//   SubmitButton
// } from './Utils/index.js'
// import { useForm } from 'react-hook-form';

// const PowerToolForm = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState: { isSubmitting, isSubmitSuccessful }
//   } = useForm({
//     defaultValues: {
//       category: 'power tools',
//       condition: "Excellent"
//     }
//   })

//   const dispatch = useDispatch();
//   const { selectedCategory } = useSelector((state) => state.formopendata);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (isSubmitSuccessful) {
//       reset();
//       dispatch(setSelectedCategory(null))
//     }
//   }, [isSubmitSuccessful, reset, dispatch])

//   const toolSuggestions = [
//     "Hammer Drill", "Impact Driver", "Circular Saw", "Angle Grinder", 
//     "Jigsaw", "Orbital Sander", "Mitre Saw", "Table Saw", 
//     "Generator", "Pressure Washer", "Jackhammer", "Concrete Mixer"
//   ];

//   if (selectedCategory !== 'tools') return null;

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
//       setError(error?.response?.data?.message || "Invalid submission");
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
//           Back_To_Worksite
//         </button>

//         {/* HEADER SECTION - Orange/Industrial Theme */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-orange-500 p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
//           <div className="flex items-center gap-5">
//             <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000]">
//               <Wrench size={32} strokeWidth={3} />
//             </div>
//             <div>
//               <h1 className="text-4xl font-[1000] text-white tracking-tighter uppercase italic leading-none">Tool_Registry</h1>
//               <p className="text-orange-950 font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80">Inventory // Industrial_&_Power_Tools</p>
//             </div>
//           </div>
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
//             <Zap size={16} strokeWidth={3} fill="currentColor" /> Pro_Partner
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-rose-600 border-[3px] border-slate-900 text-white font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
//             Error: {error}
//           </div>
//         )}

//         <form className="space-y-10" onSubmit={handleSubmit(submit)}>
          
//           {/* 1. TOOL IDENTITY */}
//           <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
//             <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
//               <Drill size={22} className="text-orange-600" strokeWidth={3} /> 01. Machine_Specifications
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
//               <FormInput
//                 label='Brand & Model'
//                 placeholder="e.g._bosch_hammer_drill"
//                 innercolor='orange'
//                 {...register('itemName', { required: true })}
//               />

//               <div className="space-y-3">
//                 <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
//                   <Search size={14} strokeWidth={3}/> Tool Type
//                 </label>
//                 <input 
//                   type='text'
//                   list="tool-types"
//                   placeholder="search machine..." 
//                   className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-orange-50 transition-all font-bold" 
//                   {...register('specs.toolType', { required: true })}
//                 />
//                 <datalist id="tool-types">
//                   {toolSuggestions.map((type) => (
//                     <option key={type} value={type} />
//                   ))}
//                 </datalist>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
//                   <Wallet size={14} strokeWidth={3}/> Security Deposit
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-900 font-black">₹</span>
//                   <input 
//                     type="number" 
//                     inputMode='numeric'
//                     placeholder="0.00" 
//                     className="w-full no-spinner pl-10 pr-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-orange-50 transition-all font-bold"
//                     {...register('specs.securityDeposite', { required: true })} 
//                   />
//                 </div>
//               </div>

//               <Condition
//                 innercolor="orange"
//                 register={register}
//                 watch={watch}
//                 setValue={setValue}
//               />
//             </div>
//           </div>

//           {/* 2. RENTAL LOGISTICS */}
//           <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
//             <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
//               <IndianRupee size={22} className="text-orange-600" strokeWidth={3} /> 02. Rental_Terms
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//               <Price innercolor="orange" {...register('price', { required: true })} />
//               <Contact innercolor="orange" {...register('contactNumber', { required: true })} />
//               <Location innercolor="orange" {...register('location', { required: true })} />
//             </div>

//             <Address innercolor="orange" {...register('address', { required: true })} />
//           </div>

//           {/* 3. MEDIA SECTION */}
//           <div className="neo-gallery-wrapper">
//              <Images register={register} setValue={setValue} innercolor="orange" />
//           </div>

//           {/* 4. DESCRIPTION */}
//           <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
//             <FormDescription
//               heading="Technical_Documentation"
//               placeholder="BATTERY_LIFE, INCLUDED_BITS, USAGE_RULES..."
//               innercolor="orange"
//               logoclass="text-orange-600"
//               {...register('description', { required: true })}
//             />
//           </div>

//           {/* SUBMIT BUTTON */}
//           <div className="pt-4">
//             <SubmitButton
//               isSubmitting={isSubmitting}
//               innercolor="orange"
//               name="Deploy_Tool"
//             />
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default PowerToolForm;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Drill, Zap, ArrowLeft, Search, Wallet, 
  Wrench, IndianRupee, Tag, Layers
} from 'lucide-react';
import axios from 'axios';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {
  FormDescription,
  FormInput,
  Price,
  Location,
  Address,
  Contact,
  Condition,
  Images,
  SubmitButton
} from './Utils/index.js'
import { useForm } from 'react-hook-form';

const PowerToolForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      category: 'power tools',
      condition: "Excellent"
    }
  })

  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      dispatch(setSelectedCategory(null))
    }
  }, [isSubmitSuccessful, reset, dispatch])

  const toolSuggestions = [
    "Hammer Drill", "Impact Driver", "Circular Saw", "Angle Grinder", 
    "Jigsaw", "Orbital Sander", "Mitre Saw", "Table Saw", 
    "Generator", "Pressure Washer", "Jackhammer", "Concrete Mixer"
  ];

  if (selectedCategory !== 'tools') return null;

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
      alert("Asset Deployed Successfully!");
    } catch (error) {
      setError(error?.response?.data?.message || "Registry failure");
    }
  };

  return (
    <div className="flex-grow bg-slate-50 min-h-screen overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* BACK NAV */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] font-black text-slate-900 hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-[10px] tracking-[0.2em]"
        >
          <ArrowLeft size={16} strokeWidth={3} />
         Back To Category
        </button>

        {/* INDUSTRIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-orange-500 p-8 border-[4px] border-slate-900 shadow-[10px_10px_0px_#000]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000] rotate-3">
              <Wrench size={32} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-[1000] text-white tracking-tighter uppercase italic leading-none text-shadow">Tool Listing</h1>
              {/* <p className="text-orange-950 font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-90 underline decoration-2">Industrial_Machinery_v2.0</p> */}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
            <Zap size={16} strokeWidth={3} fill="currentColor" className="text-yellow-500" /> Professional_Grade
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-600 border-[3px] border-slate-900 text-white font-[1000] uppercase text-xs shadow-[4px_4px_0px_#000]">
            CRITICAL_ERROR: {error}
          </div>
        )}

        <form className="space-y-12 pb-20" onSubmit={handleSubmit(submit)}>
          
          {/* 01. MACHINE SPECIFICATIONS */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-[1000] text-slate-900 mb-10 flex items-center gap-3 uppercase italic tracking-tighter">
              <Drill size={22} className="text-orange-600" strokeWidth={3} /> 01. Machine Specifications
            </h2>
            
            <div className="space-y-8">
              {/* Row 1: Brand & Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormInput
                  label='Brand & Model'
                  placeholder="E.G. MILWAUKEE M18 FUEL"
                  innercolor='orange'
                  {...register('itemName', { required: true })}
                />
                <Condition
                  innercolor="orange"
                  register={register}
                  watch={watch}
                  setValue={setValue}
                />
              </div>

              {/* Row 2: Aligned Tool Type & Security Deposit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-[1000] text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                    <Search size={14} strokeWidth={3}/> Machine Classification
                  </label>
                  <div className="relative group">
                    <input 
                      type='text'
                      list="tool-types"
                      placeholder="SEARCH CATEGORY..." 
                      className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-orange-50 transition-all font-bold shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1" 
                      {...register('specs.toolType', { required: true })}
                    />
                    <datalist id="tool-types">
                      {toolSuggestions.map((type) => (
                        <option key={type} value={type} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-[1000] text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                    <Wallet size={14} strokeWidth={3}/> Security Deposit
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center border-r-[3px] border-slate-900 bg-orange-400 z-10 transition-colors group-focus-within:bg-white text-slate-900 font-black">
                      ₹
                    </div>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full pl-16 pr-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-orange-50 transition-all font-bold shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                      {...register('specs.securityDeposite', { required: true })} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 02. RENTAL LOGISTICS */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-[1000] text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tighter">
              <IndianRupee size={22} className="text-orange-600" strokeWidth={3} /> 02. Rental Protocol
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <Price innercolor="orange" {...register('price', { required: true })} />
              <Contact innercolor="orange" {...register('contactNumber', { required: true })} />
              <Location innercolor="orange" {...register('location', { required: true })} />
            </div>

            <Address innercolor="orange" {...register('address', { required: true })} />
          </div>

          {/* 03. VISUAL ASSETS */}
          <Images register={register} setValue={setValue} innercolor="orange" />

          {/* 04. DOCUMENTATION */}
          <FormDescription
            heading="Technical Manifesto"
            placeholder="DESCRIBE_BATTERY_AH, VOLTAGE, INCLUDED_ACCESSORIES, AND_USAGE_RESTRICTIONS..."
            innercolor="orange"
            logoclass="text-orange-600"
            {...register('description', { required: true })}
          />

          {/* DEPLOY BUTTON */}
          <div className="flex justify-end pt-4">
            <div className="w-full md:w-80">
              <SubmitButton
                isSubmitting={isSubmitting}
                innercolor="orange"
                name="Tools"
              />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PowerToolForm;