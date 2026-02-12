// import React, { useState ,useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Cpu, Smartphone, Laptop, Tv, DollarSign, Image as ImageIcon, 
//   Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
//   Info, ArrowLeft, MapPin, Tag, Map, Wallet, Search, 
//   Zap, HardDrive, ShieldAlert,
//   IndianRupee,
//   IndianRupeeIcon
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
//   SubmitButton,
// } from './Utils/index.js'
// import {useForm} from 'react-hook-form'

// const TechForm = () => {
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
//       category:'tech',
//       condition:"Excellent"
//     }
//   })
//   const dispatch = useDispatch();
//   const { selectedCategory } = useSelector((state) => state.formopendata);
  
//   useEffect(()=>{
//       if(isSubmitSuccessful){
//         reset();
//         dispatch(setSelectedCategory(null))
//       }
//     },[isSubmitSuccessful])

//   const [techType, setTechType] = useState('');
//   const [hasWarranty, setHasWarranty] = useState(false);
//   const [error,setError]=useState("")

  
//   const techSuggestions = [
//     "MacBook Pro", "Gaming Laptop", "iPhone / Smartphone", "iPad / Tablet",
//     "DSLR Camera", "Mirrorless Camera", "PlayStation 5", "Xbox Series X",
//     "Nintendo Switch", "4K Projector", "VR Headset", "Drone (DJI)",
//     "Bluetooth Speaker", "Graphics Card (GPU)", "Smart Watch", "GoPro"
//   ];

//   if (selectedCategory !== 'electronics') return null;



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
//           className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-cyan-600 transition-all shadow-sm group active:scale-95"
//         >
//           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
//           Back to Categories
//         </button>

//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-5">
//             <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-cyan-500 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-cyan-100">
//               <Cpu size={32} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">List Your Tech</h1>
//               <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Inventory / Electronics / Gadgets</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-cyan-100">
//             <Zap size={14} className="fill-cyan-600" /> High Demand
//           </div>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Smartphone size={20} className="text-cyan-600" /> Device Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               <FormInput
//               label="Brand & Model"
//               placeholder="e.g. Sony A7III or MacBook Air M2"
//               innercolor='cyan'
//               {...register('itemName',{required:true})}
//               />


//               <Condition
//               innercolor="cyan"
//               register={register}
//               watch={watch}
//               setValue={setValue}
//               />

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Search size={14}/> Electronic Type</label>
//                 <input 
//                   type='text'
//                   list="tech-types"
//                   placeholder="e.g. Laptop, Camera, Drone..." 
//                   className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-cyan-500 focus:bg-white transition-all font-medium" 
//                   {...register('specs.type',{required:true})}
//                 />
//                 <datalist id="tech-types">
//                   {techSuggestions.map((type) => (
//                     <option key={type} value={type} />
//                   ))}
//                 </datalist>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">Security Deposit</label>
//                 <div className="relative">
//                   <Wallet className="absolute left-5 top-4 text-amber-500" size={18} />
//                   <input type="number" placeholder="Amt" className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-cyan-500 focus:bg-white transition-all font-medium"
//                   {...register('specs.Deposite',{required:true})} />
//                 </div>
//               </div>

//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <IndianRupee size={20} className="text-cyan-600" /> Rental Terms
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//               <Price
//               innercolor="cyan"
//               {...register('price',{required:true})} 
//               />

//               <Contact
//               innercolor="cyan"
//               {...register('contactNumber',{required:true})}
//               />

//               <Location
//               innercolor="cyan"
//               {...register('location',{request:true})}/>

//            </div>
//             <Address
//             innercolor="cyan"
//             {...register('address',{required:true})}
//             />
//           </div>


//           <Images
//           register={register}
//           setValue={setValue}
//           innercolor="cyan"
//           />


//           <FormDescription
//           heading="Additional Details"
//           placeholder="List accessories included (chargers, cases, cables) and any software details..."
//           innercolor="cyan"
//           logoclass="text-cyan-600"
//           {...register('description',{required:true})}
//           />


//           <SubmitButton
//           isSubmitting={isSubmitting}
//           innercolor="cyan"
//           name="Tech Item"
//           />

//         </form>
//       </div>
//     </div>
//   );
// };

// export default TechForm;


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Cpu, Smartphone, ArrowLeft, Search, Wallet, 
  Zap, IndianRupee, Laptop, Tv, HardDrive, ShieldAlert 
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
  SubmitButton,
} from './Utils/index.js'
import { useForm } from 'react-hook-form'

const TechForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      category: 'tech',
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

  const techSuggestions = [
    "MacBook Pro", "Gaming Laptop", "iPhone / Smartphone", "iPad / Tablet",
    "DSLR Camera", "Mirrorless Camera", "PlayStation 5", "Xbox Series X",
    "Nintendo Switch", "4K Projector", "VR Headset", "Drone (DJI)",
    "Bluetooth Speaker", "Graphics Card (GPU)", "Smart Watch", "GoPro"
  ];

  if (selectedCategory !== 'electronics') return null;

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
      setError(error?.response?.data?.message || "Transmission error");
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

        {/* HEADER SECTION - Cyan/Electric Theme */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-cyan-400 p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000]">
              <Cpu size={32} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter uppercase italic leading-none">Gadget Listing</h1>
              {/* <p className="text-cyan-900 font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80">Inventory // Electronics_&_Digital</p> */}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
            <Zap size={16} strokeWidth={3} fill="currentColor" /> High Demand
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-600 border-[3px] border-slate-900 text-white font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
            Error: {error}
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit(submit)}>
          
          {/* 1. DEVICE IDENTITY */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <Smartphone size={22} className="text-cyan-600" strokeWidth={3} /> 01. Device Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <FormInput
                label='Brand & Model'
                placeholder="e.g._macbook_pro_m3"
                innercolor='cyan'
                {...register('itemName', { required: true })}
              />

              <Condition
                innercolor="cyan"
                register={register}
                watch={watch}
                setValue={setValue}
              />

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                  <Search size={14} strokeWidth={3}/> Electronic Type
                </label>
                <input 
                  type='text'
                  list="tech-types"
                  placeholder="Search Category..." 
                  className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                  {...register('specs.type', { required: true })}
                />
                <datalist id="tech-types">
                  {techSuggestions.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                  <Wallet size={14} strokeWidth={3}/> Security Deposit
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-900 font-black">₹</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    inputMode='numeric' 
                    className="w-full no-spinner px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                    // "w-full pl-10 pr-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-cyan-50 transition-all font-bold"
                    {...register('specs.Deposite', { required: true })} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. RENTAL LOGISTICS */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <IndianRupee size={22} className="text-cyan-600" strokeWidth={3} /> 02. Rental Protocols
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <Price innercolor="cyan" {...register('price', { required: true })} />
              <Contact innercolor="cyan" {...register('contactNumber', { required: true })} />
              <Location innercolor="cyan" {...register('location', { required: true })} />
            </div>

            <Address innercolor="cyan" {...register('address', { required: true })} />
          </div>

          {/* 3. MEDIA ASSETS */}
          <div className="neo-gallery-wrapper">
             <Images register={register} setValue={setValue} innercolor="cyan" />
          </div>

          {/* 4. DESCRIPTION */}
          <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
            <FormDescription
              heading="Technical Manifesto"
              placeholder="ACCESSORIES, CHARGERS, SOFTWARE_VERSION, USAGE_LIMITS..."
              innercolor="cyan"
              logoclass="text-cyan-600"
              {...register('description', { required: true })}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <SubmitButton
              isSubmitting={isSubmitting}
              innercolor="cyan"
              name="Device"
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default TechForm;