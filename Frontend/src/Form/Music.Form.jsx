// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Music, Guitar, DollarSign, Image as ImageIcon, 
//   Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
//   Info, ArrowLeft, MapPin, Tag,
//   Map, Wallet, Search, Disc,IndianRupee
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
// import {useForm} from 'react-hook-form'

// const MusicForm = () => {
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
//       category:'music',
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
//   },[])

//   const [instrumentType, setInstrumentType] = useState('');
//   const [error,setError]=useState("")

  
//   const instrumentSuggestions = [
//     "Acoustic Guitar", "Electric Guitar", "Bass Guitar", "Digital Piano",
//     "Synthesizer", "Drum Kit", "Electronic Drums", "Saxophone",
//     "Violin", "Cello", "DJ Controller", "Studio Monitor",
//     "Condenser Microphone", "Audio Interface", "Mixer", "Amplifier"
//   ];

//   // LOGIC CHECK: Using the key from your request
//   if (selectedCategory !== 'music-instruments') return null;



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
//     <div className="flex-grow bg-[#FBFAFF] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
//       <div className="max-w-4xl mx-auto">
        
//         {/* BACK BUTTON */}
//         <button 
//           onClick={() => dispatch(setSelectedCategory(null))}
//           className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-indigo-600 transition-all shadow-sm group active:scale-95"
//         >
//           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
//           Back to Categories
//         </button>

//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
//           <div className="flex items-center gap-5">
//             <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
//               <Music size={32} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">List Your Instrument</h1>
//               <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Inventory / Musical Gear / Listing</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-indigo-100">
//             <Disc size={14} className="animate-spin-slow" /> Artist Choice
//           </div>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
//           {/* 1. INSTRUMENT IDENTITY & CONDITION ROW */}
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Guitar size={20} className="text-indigo-500" /> Gear Specifications
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               <FormInput
//               label='Instrument Brand & Model'
//               placeholder="e.g. Fender Stratocaster"
//               innercolor='indigo'
//               {...register('itemName',{required:true})}
//               />

//               <Condition
//               innercolor="indigo"
//               register={register}
//               watch={watch}
//               setValue={setValue}
//               />

//               {/* SEARCHABLE INSTRUMENT TYPE */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Search size={14}/> Instrument Type</label>
//                 <input 
//                   list="music-types"
//                   placeholder="e.g. Guitar, Synth..." 
//                   className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium" 
//                   {...register('specs.instrumentType',{required:true})}
//                 />
//                 <datalist id="music-types">
//                   {instrumentSuggestions.map((type) => (
//                     <option key={type} value={type} />
//                   ))}
//                 </datalist>
//               </div>

//               {/* SECURITY DEPOSIT */}
//               <div className="space-y-2">
//                 <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Wallet size={14}/> Security Deposit</label>
//                 <div className="relative">
//                   <span className="absolute left-5 top-4 text-gray-400 font-bold">₹</span>
//                   <input type="number" placeholder="Refundable amount" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
//                   {...register('specs.securityDeposite',{required:true})} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <IndianRupee size={20} className="text-indigo-500" /> Rental & Pickup
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
   
//               <Price
//               innercolor="indigo"
//               {...register('price',{required:true })}
//               />

//               <Contact
//               innercolor="indigo"
//               {...register('contactNumber',{required:true})}
//               />


//               <Location
//               innercolor="ingigo"
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
//           heading="Item Description"
//           placeholder="Include details about strings, accessories like cases/stands, or specific sound characteristics..."
//           innercolor="indigo"
//           logoclass="text-indigo-500"
//           {...register('description',{required:true})}
//           />

//           <SubmitButton
//           innercolor="indigo"
//           isSubmitting={isSubmitting}
//           name="Instrument"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MusicForm;




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Music, Guitar, DollarSign, ArrowLeft, 
  Search, Disc, IndianRupee, Wallet, Tag, Settings, Sparkles
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
import { useForm } from 'react-hook-form'

const MusicForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting, isSubmitSuccessful }
  } = useForm({
    defaultValues: {
      category: 'music',
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

  const instrumentSuggestions = [
    "Acoustic Guitar", "Electric Guitar", "Bass Guitar", "Digital Piano",
    "Synthesizer", "Drum Kit", "Electronic Drums", "Saxophone",
    "Violin", "Cello", "DJ Controller", "Studio Monitor",
    "Condenser Microphone", "Audio Interface", "Mixer", "Amplifier"
  ];

  if (selectedCategory !== 'music-instruments') return null;

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

        {/* HEADER SECTION - Indigo Theme */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-indigo-500 p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white border-[3px] border-slate-900 flex items-center justify-center text-slate-900 shadow-[4px_4px_0px_#000]">
              <Music size={32} strokeWidth={3} />
            </div>
            <div>
              <h1 className="text-4xl font-[1000] text-white tracking-tighter uppercase italic leading-none">Instrument Listing</h1>
              {/* <p className="text-white font-black text-[10px] uppercase tracking-[0.2em] mt-2 opacity-90">Inventory // Musical Instruments</p> */}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-[3px] border-slate-900 text-slate-900 font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
            <Disc size={16} strokeWidth={3} className="animate-spin-slow" /> Artist Choice
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-600 border-[3px] border-slate-900 text-white font-black uppercase text-xs shadow-[4px_4px_0px_#000]">
            Error: {error}
          </div>
        )}

        <form className="space-y-10" onSubmit={handleSubmit(submit)}>
          
          {/* 1. INSTRUMENT IDENTITY */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <Guitar size={22} className="text-indigo-600" strokeWidth={3} /> 01. Instrument Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <FormInput
                label='Brand & Model'
                placeholder="e.g._fender_stratocaster"
                innercolor='indigo'
                {...register('itemName', { required: true })}
              />

              <Condition
                innercolor="indigo"
                register={register}
                watch={watch}
                setValue={setValue}
              />

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                  <Search size={14} strokeWidth={3}/> Instrument Type
                </label>
                <input 
                  type='text'
                  list="music-types"
                  placeholder="search instrument..." 
                  className="w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                  // "w-full px-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-indigo-50 transition-all font-bold" 
                  {...register('specs.instrumentType', { required: true })}
                />
                <datalist id="music-types">
                  {instrumentSuggestions.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-900 uppercase italic tracking-widest flex items-center gap-2">
                  <Wallet size={14} strokeWidth={3}/> Security Deposit
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-900 font-black">₹</span>
                  <input 
                    type="number" 
                    inputMode='numeric'
                    placeholder="0.00" 
                    className="w-full no-spinner pl-10 pr-5 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-indigo-50 transition-all font-bold placeholder:text-slate-300"
                    {...register('specs.securityDeposite', { required: true })} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. RENTAL & LOCATION */}
          <div className="bg-white p-8 border-[4px] border-slate-900 shadow-[8px_8px_0px_#000]">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
              <IndianRupee size={22} className="text-indigo-600" strokeWidth={3} /> 02. Rental Logistics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <Price innercolor="indigo" {...register('price', { required: true })} />
              <Contact innercolor="indigo" {...register('contactNumber', { required: true })} />
              <Location innercolor="indigo" {...register('location', { required: true })} />
            </div>

            <Address innercolor="indigo" {...register('address', { required: true })} />
          </div>

          {/* 3. MEDIA & DESCRIPTION */}
          <div className="neo-gallery-wrapper">
             <Images register={register} setValue={setValue} innercolor="indigo" />
          </div>

          <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
            <FormDescription
              heading="Item Description"
              placeholder="STRINGS, ACCESSORIES, SOUND_CHARACTERISTICS..."
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
              name="Instrument"
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default MusicForm;