// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   PersonStanding, ShieldCheck, Car, Briefcase, DollarSign, Image as ImageIcon, 
//   Upload, X, ArrowRight, MessageCircle, Info, ArrowLeft, MapPin, 
//   User, Search, Star, Clock, Heart, CheckCircle2
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
//   Images,
//   SubmitButton
// } from './Utils/index.js'
// import {useForm} from 'react-hook-form'

// const HelperForm = () => {
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
//       category:'helper'
//     }
//   })
//   const dispatch = useDispatch();
//   const { selectedCategory } = useSelector((state) => state.formopendata);

//   useEffect(()=>{
//     if(isSubmitSuccessful){
//       reset();
//       dispatch(setSelectedCategory(null));
//     }
//   },[isSubmitSuccessful])

//   const [gender, setGender] = useState('Male');
//   const [error,setError]=useState("")
//   const [serviceType, setServiceType] = useState('');
//   const [experience, setExperience] = useState('1-2 Years');

//   const experienceLevels = ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"];
//   const genders = ["Male", "Female", "Other"];
  
//   const serviceSuggestions = [
//     "Personal Driver", "Security Guard", "Home Helper", "Delivery Partner",
//     "Warehouse Labor", "Event Staff", "Cleaning Service", "Gardener",
//     "Construction Worker", "Office Assistant", "Babysitter", "Elderly Care"
//   ];

//   if (selectedCategory !== 'helper') return null;


//   const changeGender=(props)=>{
//     setGender(props)
//     setValue('specs.gender',props)
//   }


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
//     console.log("error aaya he ")
//     console.log("ERROR:", error);
//     setError(error?.response?.data?.message || "Invalid credentials");
//   }
// };

//   return (
//     <div className="flex-grow bg-[#FFFBF7] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
//       <div className="max-w-4xl mx-auto">
        
//         {/* BACK BUTTON */}
//         <button 
//           onClick={() => dispatch(setSelectedCategory(null))}
//           className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-fuchsia-600 transition-all shadow-sm group active:scale-95"
//         >
//           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
//           Back to Categories
//         </button>

//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-5">
//             <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-amber-400 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-fuchsia-100">
//               <PersonStanding size={32} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">Register as a Helper</h1>
//               <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Services / Labor / Profile Listing</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-amber-100">
//             <CheckCircle2 size={14} /> Verified Provider
//           </div>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
//           {/* 1. SERVICE IDENTITY & GENDER */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <User size={20} className="text-fuchsia-500" /> Personal Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormInput
//               label='Service Title / Name'
//               placeholder='e.g. Professional Driver for Luxury Cars'
//               innercolor='fuchsia'
//               {...register('itemName',{required:true})}
//               />

//               {/* GENDER SELECTION (On the right) */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1">Gender</label>
//                 <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
//                   {genders.map((item) => (
//                     <button 
//                       key={item}
//                       type="button"
//                       onClick={() => changeGender(item)}
//                       className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${gender === item ? 'bg-white text-fuchsia-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
//                     >
//                       {item}
//                     </button>
//                   ))}
//                 </div>
//                 <input
//                 type='hidden'
//                 {...register('specs.gender',{required:true})}/>
//               </div>

//               {/* SEARCHABLE SERVICE TYPE */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Search size={14}/> Primary Skill / Role</label>
//                 <input 
//                   type='text'
//                   list="service-types"
//                   placeholder="e.g. Security, Driver..." 
//                   className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium" 
//                   {...register('specs.servicesHave',{required:true})}
//                 />
//                 <datalist id="service-types">
//                   {serviceSuggestions.map((type) => (
//                     <option key={type} value={type} />
//                   ))}
//                 </datalist>
//               </div>

//               {/* EXPERIENCE SELECTION */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1">Experience Level</label>
//                 <select 
//                   className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium appearance-none"
//                   {...register('specs.exprience',{required:true})}
//                 >
//                   {experienceLevels.map((lvl) => (
//                     <option key={lvl} value={lvl}>{lvl}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Briefcase size={20} className="text-fuchsia-500" /> Rates & Location
//             </h2>
            
//             <div  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

//               <Price
//               innercolor="fuchsia"
//               {...register('price',{required:true})}
//               />


//               <Contact
//               innercolor="fuchsia"
//               {...register('contactNumber',{required:true})}
//               />


//               <Location
//               innercolor="fuchsia"
//               {...register('location',{required:true})}
//               />


//             </div>
//               <Address
//               innercolor="fuchsia"
//               {...register('address',{required:true})}
//               />


//             <div className="flex items-center gap-4 p-4 bg-fuchsia-50 rounded-2xl border border-fuchsia-100 text-fuchsia-700">
//                <Clock size={20} />
//                <p className="text-xs font-bold uppercase tracking-tight">Standard Shift: 8 Hours (Overtime negotiable)</p>
//             </div>
//           </div>

//           <Images
//           register={register}
//           setValue={setValue}
//           innercolor="fuchsia"
//           />


//           <FormDescription
//           heading="Professional Summary"
//           placeholder="Describe your skills, previous work experience, or specific tools you can operate..." 
//           innercolor="fuchsia"
//           logoclass="text-fuchsia-500"
//           {...register('description',{
//           required:true})}
//           />


//           <SubmitButton
//           isSubmitting={isSubmitting}
//           innercolor="fuchsia"
//           name="Work"
//           />

//         </form>
//       </div>
//     </div>
//   );
// };

// export default HelperForm;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  PersonStanding, Briefcase, DollarSign, ArrowLeft, 
  User, Search, Clock, CheckCircle2, Tag, Navigation
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
  Images,
  SubmitButton
} from './Utils/index.js'
import { useForm } from 'react-hook-form'

const HelperForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      category: 'helper',
      specs: { gender: 'Male' }
    }
  })

  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  const [gender, setGender] = useState('Male');
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      dispatch(setSelectedCategory(null));
    }
  }, [isSubmitSuccessful, reset, dispatch])

  const experienceLevels = ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"];
  const genders = ["Male", "Female", "Other"];
  const serviceSuggestions = [
    "Personal Driver", "Security Guard", "Home Helper", "Delivery Partner",
    "Warehouse Labor", "Event Staff", "Cleaning Service", "Gardener"
  ];

  if (selectedCategory !== 'helper') return null;

  const changeGender = (val) => {
    setGender(val);
    setValue('specs.gender', val);
  }

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

        {/* HEADER SECTION - Fuchsia/Pink Theme */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-rose-400 p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000]">
              <PersonStanding size={32} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-4xl font-[1000] text-slate-900 tracking-tighter uppercase italic leading-none">Helper Listing</h1>
              {/* <p className="text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-80">Category // Labor_&_Staffing</p> */}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
            <CheckCircle2 size={16} strokeWidth={3} /> Verified_Provider
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-600 border-[3px] border-slate-900 text-white font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
            Error: {error}
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit(submit)}>
          
          {/* 1. PERSONAL DETAILS */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <User size={22} className="text-rose-600" strokeWidth={3} /> 01. Profile Specs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <FormInput
                label='Service Title'
                placeholder="e.g._professional_driver"
                innercolor='rose'
                {...register('itemName', { required: true })}
              />

              {/* <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest">Gender Type</label>
                <div className="w-full px-5 py-2 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                // "flex gap-2 p-1 bg-slate-100 border-[3px] border-slate-900"
                >
                  {genders.map((item) =>{
                    const isActive=gender===item;
                    return(
                      <button 
                      key={item}
                      type="button"
                      onClick={() => changeGender(item)}
                      className={`flex-1 py-3 text-[11px] font-[1000] uppercase tracking-tighter transition-all duration-100
                      ${
                         isActive
                        ? "bg-rose-400 text-slate-900 border-[2px] border-slate-900"
                        : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                        // gender === item ? 'bg-rose-400 text-slate-900' : 'text-slate-400 hover:text-slate-600'
                      }
                      `}
                    >
                      {item}
                    </button>
                    )

                  })}
                </div>
                <input type='hidden' {...register('specs.gender', { required: true })} />
              </div> */}
              <div className="space-y-3">
              {/* Neo-Brutalist Label */}
              <label className="text-xs font-[1000] text-slate-900 uppercase tracking-[0.15em] ml-1 italic">
              Select Gender
              </label>

              {/* Main Container: Aligned with Form Shadows */}
              <div className="flex p-1.5 bg-slate-50 border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] transition-all">
              {genders.map((item) => {
                const isActive = gender === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setValue('specs.gender', item); // React Hook Form integration
                      // Agar aapka local state 'gender' hai toh usey bhi update karein
                      changeGender(item); 
                    }}
                    className={`
                      flex-1 py-3 text-[11px] font-[1000] uppercase tracking-tighter transition-all duration-100
                      ${
                        isActive
                          ? "bg-rose-400 text-slate-900 border-[2px] border-slate-900 shadow-[2px_2px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                          : "text-slate-400 hover:text-slate-900 hover:bg-slate-200"
                      }
                    `}
                  >
                    {item}
                  </button>
                );
              })}
              </div>

              {/* Hidden Input for Form Submission */}
              <input 
              type='hidden' 
              {...register('specs.gender', { required: true })} 
              />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <Search size={14} strokeWidth={3}/> Skill / Exprience-On
                </label>
                <input 
                  type='text'
                  list="service-types"
                  placeholder="search_role..." 
                  className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                  {...register('specs.servicesHave', { required: true })}
                />
                <datalist id="service-types">
                  {serviceSuggestions.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"
                >
                  <Navigation size={14} strokeWidth={3}/> Experience
                </label>
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                  {...register('specs.exprience', { required: true })}
                >
                  {experienceLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. RATES & LOCATION */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <Briefcase size={22} className="text-rose-600" strokeWidth={3} /> 02. Compensation_Setup
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <Price innercolor="rose" {...register('price', { required: true })} />
              <Contact innercolor="rose" {...register('contactNumber', { required: true })} />
              <Location innercolor="rose" {...register('location', { required: true })} />
            </div>

            <Address innercolor="rose" {...register('address', { required: true })} />

            <div className="mt-6 flex items-center gap-4 p-4 bg-slate-900 text-white border-[3px] border-slate-900">
               <Clock size={20} strokeWidth={3} className="text-rose-400" />
               <p className="text-[10px] font-black uppercase tracking-widest">Shift_Standard: 8_Hours_Cycle</p>
            </div>
          </div>

          {/* 3. IMAGES & DESCRIPTION */}
          <div className="neo-gallery-wrapper">
             <Images register={register} setValue={setValue} innercolor="rose" />
          </div>

          <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
            <FormDescription
              heading="Professional Summary"
              placeholder="SKILLS, PREVIOUS_WORK, TOOLS_YOU_CAN_OPERATE..."
              innercolor="rose"
              logoclass="text-rose-600"
              {...register('description', { required: true })}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <SubmitButton
              isSubmitting={isSubmitting}
              innercolor="rose"
              name="Service"
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default HelperForm;