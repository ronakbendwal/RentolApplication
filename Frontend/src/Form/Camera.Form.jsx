// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Camera, DollarSign, Image as ImageIcon, 
//   Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
//   Info, Star, ArrowLeft, MapPin, Map, Video, 
//   Settings, Maximize, Aperture, Briefcase, Focus, Search
// } from 'lucide-react';
// import axios from'axios';
// import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
// import {
//   FormInput,
//   FormDescription,
//   Price,Location,
//   Address,
//   Contact, 
//   Condition,
//   Images,
//   SubmitButton
// } from './Utils/index.js'
// import {useForm} from 'react-hook-form'

// const CameraForm = () => {
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
//       category:'camera',
//       condition:"Excellent"
//     }
//   })

//   const dispatch = useDispatch();
//   const { selectedCategory } = useSelector((state) => state.formopendata);
//   useEffect(()=>{
//     if(isSubmitSuccessful){
//       reset()
//       dispatch(setSelectedCategory(null))
//     }
//   },[isSubmitSuccessful]);


//   // State to track the custom lens input
//   const [lensInput, setLensInput] = useState('');
//   const [error,setError]=useState("")
//   const cameraTypes = [
//     "DSLR Camera", "Mirrorless Camera", "Cinema Camera", 
//     "Action Camera (GoPro)", "Instax / Polaroid", "Point & Shoot", 
//     "360 Degree Camera", "Medium Format"
//   ];

//   const lensOptions = [
//     "Body Only (No Lens)",
//     "Sony FE 24-70mm f/2.8 GM", "Canon RF 24-70mm f/2.8L", "Sigma 24-70mm f/2.8 Art",
//     "Prime - 35mm f/1.4", "Prime - 50mm f/1.8", "Prime - 85mm f/1.4", "Prime - 100mm Macro",
//     "Zoom - 16-35mm Wide", "Zoom - 70-200mm Telephoto", "Zoom - 100-400mm Super Tele",
//     "Fish-eye Lens", "Anamorphic Lens 35mm", "Tilt-Shift 24mm", "Kit Lens 18-55mm"
//   ];
 
//   if (selectedCategory !== 'photography') return null;


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
//     <div className="flex-grow bg-[#F9FAFB] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
//       <div className="max-w-4xl mx-auto">
        
//         {/* BACK BUTTON */}
//         <button 
//           onClick={() => dispatch(setSelectedCategory(null))}
//           className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-slate-900 transition-all shadow-sm active:scale-95"
//         >
//           <ArrowLeft size={18} />
//           Back to Categories
//         </button>

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-100">
//               <Camera size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-black text-gray-900 tracking-tight">Gear Details</h1>
//               <p className="text-gray-500 font-medium text-xs uppercase tracking-widest">Listing / Photography & Video</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm">
//             <Video size={16} fill="currentColor" /> Pro Equipment
//           </div>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
//           {/* 1. GEAR IDENTITY */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Settings size={20} className="text-slate-700" /> Technical Specs
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormInput
//               label='Camera Brand & Model'
//               placeholder="e.g. Sony A7IV"
//               innercolor='slate'
//               {...register('itemName',{required:true})}
//               />

//               <Condition
//               innercolor="slate"
//               register={register}
//               watch={watch}
//               setValue={setValue}/>

//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Aperture size={14}/> Body Type</label>
//                 <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-slate-500 focus:bg-white transition-all font-medium appearance-none"
//                 {...register('specs.type',{required:true})}>
//                   <option value="">Select Category</option>
//                   {cameraTypes.map((type) => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* ENHANCED AUTOCOMPLETE LENS FIELD */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Focus size={14}/> Included Lens</label>
//                 <div className="relative">
//                   <Search className="absolute left-5 top-4 text-gray-300" size={18} />
//                   <input 
//                     type='text'
//                     list="lens-suggestions"
//                     placeholder="Type to search or add custom lens..." 
//                     className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-slate-500 focus:bg-white transition-all font-medium" 
//                     {...register('specs.includedlens',{required:true})}
//                   />
//                   <datalist id="lens-suggestions">
//                     {lensOptions.map((lens) => (
//                       <option key={lens} value={lens} />
//                     ))}
//                   </datalist>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 2. RENTAL & LOCATION */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <DollarSign size={20} className="text-slate-700" /> Rental & Pickup Details
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
 

//               <Price
//               innercolor="slate"
//               {...register('price',{required:true})}
//               />
              

//               <Contact
//               innercolor="slate"
//               {...register('contactNumber',{required:true})}
//               />


//               <Location
//               innercolor="slate"
//               {...register('location',{required:true})}
//               />
//             </div>

//             <Address
//             innercolor="slate"
//             {...register('address',{required:true})}
//             />
//           </div>

//           {/* 3. GALLERY */}
//           <Images
//           register={register}
//           setValue={setValue}
//           innercolor="slate"
//           />

//           {/* 4. DESCRIPTION */}
//           <FormDescription
//           heading="Bundle Details"
//           placeholder="Mention extra batteries, memory cards, or tripod..."
//           innercolor="slate"
//           logoclass="text-slate-700"
//           {...register('description',{
//           required:true})}
//           />

//           <SubmitButton
//           innercolor="slate"
//           isSubmitting={isSubmitting}
//           name="Camera"
//           />

//         </form>
//       </div>
//     </div>
//   );
// };

// export default CameraForm;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Camera, DollarSign, X, ArrowLeft, Video, 
  Settings, Aperture, Focus, Search, Sparkles, Tag, Navigation
} from 'lucide-react';
import axios from 'axios';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {
  FormInput,
  FormDescription,
  Price, Location,
  Address,
  Contact, 
  Condition,
  Images,
  SubmitButton
} from './Utils/index.js'
import { useForm } from 'react-hook-form'

const CameraForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      category: 'camera',
      condition: "Excellent"
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
  }, [isSubmitSuccessful, reset, dispatch]);

  const cameraTypes = [
    "DSLR Camera", "Mirrorless Camera", "Cinema Camera", 
    "Action Camera (GoPro)", "Instax / Polaroid", "Point & Shoot", 
    "360 Degree Camera", "Medium Format"
  ];

  const lensOptions = [
    "Body Only (No Lens)",
    "Sony FE 24-70mm f/2.8 GM", "Canon RF 24-70mm f/2.8L", "Sigma 24-70mm f/2.8 Art",
    "Prime - 35mm f/1.4", "Prime - 50mm f/1.8", "Prime - 85mm f/1.4"
  ];

  if (selectedCategory !== 'photography') return null;

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
      if (data.images) {
        data.images.forEach((file) => fd.append("images", file));
      }
      await axios.post("/api/user/rentoutitem", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    } catch (error) {
      setError(error?.response?.data?.message || "Invalid submission");
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

        {/* HEADER SECTION - Slate/Black Theme */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-800 p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000]">
              <Camera size={32} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-4xl font-[1000] text-white tracking-tighter uppercase italic leading-none">Camera Listing</h1>
              {/* <p className="text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80">Category // Photography_&_Video</p> */}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
            <Video size={16} strokeWidth={3} /> Status: Pro Equipment
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500 border-[3px] border-slate-900 text-white font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
            Error: {error}
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit(submit)}>
          
          {/* 1. TECHNICAL SPECS */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <Settings size={22} className="text-slate-600" strokeWidth={3} /> 01. Optical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <FormInput
                label='Camera Model'
                placeholder="sony_a7_iv"
                innercolor='slate'
                {...register('itemName', { required: true })}
              />

              <Condition
                innercolor="slate"
                register={register}
                watch={watch}
                setValue={setValue}
              />

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 italic uppercase tracking-widest flex items-center gap-2">
                  <Camera size={14} strokeWidth={3}/> Body Type
                </label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                    {...register('specs.type', { required: true })}
                  >
                    <option value="">Select Category</option>
                    {cameraTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                  <Focus size={14} strokeWidth={3}/> Lens
                </label>
                <div className="relative">
                  <input 
                    type='text'
                    list="lens-Suggestions"
                    placeholder="search Lens..." 
                    className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                    // "w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-slate-100 transition-all font-bold placeholder:text-slate-300" 
                    {...register('specs.includedlens', { required: true })}
                  />
                  <datalist id="lens-suggestions">
                    {lensOptions.map((lens) => (
                      <option key={lens} value={lens} />
                    ))}
                  </datalist>
                </div>
              </div>
            </div>
          </div>

          {/* 2. RENTAL & PICKUP */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <DollarSign size={22} className="text-slate-600" strokeWidth={3} /> 02. Rental Logistics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <Price innercolor="slate" {...register('price', { required: true })} />
              <Contact innercolor="slate" {...register('contactNumber', { required: true })} />
              <Location innercolor="slate" {...register('location', { required: true })} />
            </div>

            <Address innercolor="slate" {...register('address', { required: true })} />
          </div>

          {/* 3. GALLERY */}
          <div className="neo-gallery-wrapper">
             <Images register={register} setValue={setValue} innercolor="slate" />
          </div>

          {/* 4. DESCRIPTION */}
          <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
            <FormDescription
              heading="Unit Documentation"
              placeholder="BATTERIES, SD_CARDS, TRIPOD..."
              innercolor="slate"
              logoclass="text-slate-900"
              {...register('description', { required: true })}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <SubmitButton
              isSubmitting={isSubmitting}
              innercolor="slate"
              name="Camera"
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default CameraForm;

