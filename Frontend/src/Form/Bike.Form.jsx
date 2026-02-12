// import React, { useState ,useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Bike, DollarSign, Image as ImageIcon, 
//   Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
//   Info, Star, ArrowLeft, MapPin, Calendar, Tag, Navigation,
//   Layers, Map, // Added Map icon
//   Phone
// } from 'lucide-react';
// import axios from 'axios';
// import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
// import { useForm } from 'react-hook-form';
// import {
//   FormInput,
//   FormDescription,
//   Price,
//   Contact,
//   Location,
//   Address,
//   Condition,
//   Images,
//   SubmitButton
// } from './Utils/index.js'



// const BikeForm = () => {

//   const { selectedCategory } = useSelector((state) => state.formopendata);
//   if (selectedCategory !== 'bikes') return null;

//   const {
//      register,
//      reset,
//      handleSubmit,
//      setValue,
//      watch,
//      formState:{
//        errors,
//        isSubmitting,
//        isSubmitSuccessful
//       }
//   } =useForm({
//     defaultValues:{
//       category:"Bike",
//       condition:"Excellent"
//     }
//   })

//   const [err,setError]=useState("")

//   useEffect(() => {
//   if (isSubmitSuccessful) {
//     reset();
//     dispatch(setSelectedCategory(null));
//   }
//   }, [isSubmitSuccessful]);

//   const dispatch = useDispatch();
  
//   const bikeTypes = [
//     "Mountain Bike (MTB)", "Road Bike", "Hybrid/City Bike", 
//     "Electric Bike (e-Bike)", "Electric Scooter", "Cruiser", 
//     "BMX", "Folding Bike", "Gravel Bike", "Fat Tire Bike"
//   ];

// const submit = async (data) => {
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
//     if (data.images && data.images.length > 0) {
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
//     <div className="flex-grow bg-[#F7FCF9] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
//       <div className="max-w-4xl mx-auto">
        
//         {/* BACK BUTTON */}
//         <button 
//           onClick={() => dispatch(setSelectedCategory(null))}
//           className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-emerald-600 transition-all shadow-sm active:scale-95"
//         >
//           <ArrowLeft size={18} />
//           Back to Categories
//         </button>

//         {/* HEADER SECTION */}
//         <div 
//         className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100">
//               <Bike size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black text-gray-900 tracking-tight">Bike Details</h1>
//               <p className="text-gray-500 font-medium text-xs uppercase tracking-widest">Listing / Bikes & Scooters</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-sm">
//             <Navigation size={16} fill="currentColor" /> Adventure Ready
//           </div>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
//           {/* 1. IDENTITY & CONDITION BAR */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Tag size={20} className="text-emerald-600" /> Basic Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               <FormInput
//               label='Bike Model / Brand'
//               placeholder="e.g. Trek Marlin 7"
//               innercolor='emerald'
//               {...register('itemName',{
//                 required:true
//               })}
//               />

//               <Condition
//               innercolor="emerald"
//               register={register}
//               setValue={setValue}
//               watch={watch}
//               />

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Calendar size={14}/> Purchase Year</label>
//                 <input type="number" placeholder="2024" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
//                 {...register('specs.purchaseyear',{
//                   required:true
//                 })} />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Layers size={14}/> Bike Type</label>
//                 <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium appearance-none"
//                 {...register('specs.biketype',{
//                   required:true
//                 })}>
//                   <option value="">Select Type</option>
//                   {bikeTypes.map((type) => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* 2. RENTAL & PICKUP DETAILS */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <DollarSign size={20} className="text-emerald-600" /> Rental & Pickup Details
//             </h2>
            
//             {/* 3-Column Utility Row */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">



//               <Price
//               innercolor="emerald"
//               {...register('price',{required:true })
//               }/>



//               <Contact
//               innercolor="emerald"
//               {...register('contactNumber',{ required:true})}
//               />

//               <Location
//               innercolor="emerald"
//               {...register('location',{required:true})}
//               />


//             </div>
//             {/* Full Street Address Field Added Here */}
//             <Address
//             innercolor="emerald"
//             {...register('address',{required:true})}
//             />


//           </div>

//           {/* 3. GALLERY */}
//           <Images
//           register={register}
//           setValue={setValue}
//           innercolor="emerald"
//           />

//           {/* 4. DESCRIPTION */}

//           <FormDescription
//           heading="Gear & Details"
//           placeholder="Mention frame size, included accessories (helmet, lock), and any usage rules..."
//           innercolor="emerald"
//           logoclass="text-emerald-600"
//           {...register('description',{
//               required:true
//             })}
//           />


//           <SubmitButton
//           isSubmitting={isSubmitting}
//           innercolor="emerald"
//           name="Bike"
//           />

//         </form>
//       </div>
//     </div>
//   );
// };

// export default BikeForm;









import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Bike,ArrowRight
  , DollarSign, ArrowLeft, Tag, Calendar, Layers, Navigation, X
} from 'lucide-react';
import axios from 'axios';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import { useForm } from 'react-hook-form';
import {
  FormInput,
  FormDescription,
  Price,
  Contact,
  Location,
  Address,
  Condition,
  Images,
  SubmitButton
} from './Utils/index.js';

const BikeForm = () => {
  const { selectedCategory } = useSelector((state) => state.formopendata);
  const dispatch = useDispatch();
  
  if (selectedCategory !== 'bikes') return null;

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      category: "Bike",
      condition: "Excellent"
    }
  });

  const [err, setError] = useState("");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      dispatch(setSelectedCategory(null));
    }
  }, [isSubmitSuccessful, reset, dispatch]);

  const bikeTypes = [
    "Mountain Bike (MTB)", "Road Bike", "Hybrid/City Bike", 
    "Electric Bike (e-Bike)", "Electric Scooter", "Cruiser", 
    "BMX", "Folding Bike", "Gravel Bike", "Fat Tire Bike"
  ];

  const submit = async (data) => {
    setError("");
    try {
      const fd = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "images" && key !== "specs") {
          fd.append(key, data[key]);
        }
      });
      if (data.specs) {
        Object.keys(data.specs).forEach((k) => {
          fd.append(`specs[${k}]`, data.specs[k]);
        });
      }
      if (data.images && data.images.length > 0) {
        data.images.forEach((file) => {
          fd.append("images", file);
        });
      }

      await axios.post("/api/user/rentoutitem", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex-grow bg-white min-h-screen overflow-y-auto p-4 md:p-8 animate-in slide-in-from-right duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON - Neo Brutalist Style */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-6 py-3 mb-8 bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] font-black text-slate-900 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={18} strokeWidth={3} />
          Back To Category
        </button>

        {/* HEADER SECTION - High Contrast */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-emerald-400 p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000]">
              <Bike size={32} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter uppercase italic leading-none">Bike Listiing</h1>
              {/* <p className="text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80">Category // Gear_And_Mobility</p> */}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
            <Navigation size={16} strokeWidth={3} /> Status: Ready_To_Deploy
          </div>
        </div>

        {err && (
          <div className="mb-6 p-4 bg-rose-500 border-[3px] border-slate-900 text-white font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
            Error: {err}
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit(submit)}>
          
          {/* 1. IDENTITY & CONDITION */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <Tag size={22} className="text-emerald-500" strokeWidth={3} /> 01. Basic Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <FormInput
                label='Bike Model / Brand'
                placeholder="trek_marlin_7"
                innercolor='emerald'
                {...register('itemName', { required: true })}
                className="neo-input" 
              />

              <Condition
                innercolor="emerald"
                register={register}
                setValue={setValue}
                watch={watch}
              />

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                  <Calendar size={14} strokeWidth={3}/> Purchase Year
                </label>
                <input 
                  type="number" 
                  placeholder="2024" 
                  className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                  {...register('specs.purchaseyear', { required: true })} 
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                  <Layers size={14} strokeWidth={3}/> Bike Type
                </label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                    {...register('specs.biketype', { required: true })}
                  >
                    <option value="">Select Type..</option>
                    {bikeTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ArrowRight size={18} className="rotate-90" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. RENTAL & PICKUP */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <DollarSign size={22} className="text-emerald-500" strokeWidth={3} /> 02. Rental Logistics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <Price innercolor="emerald" {...register('price', { required: true })} />
              <Contact innercolor="emerald" {...register('contactNumber', { required: true })} />
              <Location innercolor="emerald" {...register('location', { required: true })} />
            </div>

            <Address innercolor="emerald" {...register('address', { required: true })} />
          </div>

          {/* 3. GALLERY */}
          <div className="neo-gallery-wrapper">
             <Images register={register} setValue={setValue} innercolor="emerald" />
          </div>

          {/* 4. DESCRIPTION */}
          <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
            <FormDescription
              heading="Unit Documentation"
              placeholder="FRAME_SIZE, ACCESSORIES (HELMET/LOCK), USAGE_RULES..."
              innercolor="emerald"
              logoclass="text-emerald-500"
              {...register('description', { required: true })}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <SubmitButton
              isSubmitting={isSubmitting}
              innercolor="emerald"
              name="Bike"
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default BikeForm;

