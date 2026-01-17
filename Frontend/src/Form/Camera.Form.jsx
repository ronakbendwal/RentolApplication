import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Camera, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, Star, ArrowLeft, MapPin, Map, Video, 
  Settings, Maximize, Aperture, Briefcase, Focus, Search
} from 'lucide-react';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {
  FormInput,
  FormDescription,
  Price,Location,
  Address,
  Contact, 
  Condition,
  Images,
  SubmitButton
} from './Utils/index.js'
import {useForm} from 'react-hook-form'

const CameraForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState:{
      errors,
      isSubmitting,
      isSubmitSuccessful
    }
  }=useForm({
    defaultValues:{
      category:'camera',
      condition:"Excellent"
    }
  })

  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  useEffect(()=>{
    if(isSubmitSuccessful){
      reset()
      dispatch(setSelectedCategory(null))
    }
  },[isSubmitSuccessful]);


  // State to track the custom lens input
  const [lensInput, setLensInput] = useState('');
  
  const cameraTypes = [
    "DSLR Camera", "Mirrorless Camera", "Cinema Camera", 
    "Action Camera (GoPro)", "Instax / Polaroid", "Point & Shoot", 
    "360 Degree Camera", "Medium Format"
  ];

  const lensOptions = [
    "Body Only (No Lens)",
    "Sony FE 24-70mm f/2.8 GM", "Canon RF 24-70mm f/2.8L", "Sigma 24-70mm f/2.8 Art",
    "Prime - 35mm f/1.4", "Prime - 50mm f/1.8", "Prime - 85mm f/1.4", "Prime - 100mm Macro",
    "Zoom - 16-35mm Wide", "Zoom - 70-200mm Telephoto", "Zoom - 100-400mm Super Tele",
    "Fish-eye Lens", "Anamorphic Lens 35mm", "Tilt-Shift 24mm", "Kit Lens 18-55mm"
  ];
 
  if (selectedCategory !== 'photography') return null;



  const submit=(data)=>{
    //api call come here
    console.log(data)
  }


  return (
    <div className="flex-grow bg-[#F9FAFB] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-slate-900 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft size={18} />
          Back to Categories
        </button>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-100">
              <Camera size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Gear Details</h1>
              <p className="text-gray-500 font-medium text-xs uppercase tracking-widest">Listing / Photography & Video</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm">
            <Video size={16} fill="currentColor" /> Pro Equipment
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
          {/* 1. GEAR IDENTITY */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Settings size={20} className="text-slate-700" /> Technical Specs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
              label='Camera Brand & Model'
              placeholder="e.g. Sony A7IV"
              innercolor='slate'
              {...register('itemname',{required:true})}
              />

              <Condition
              innercolor="slate"
              register={register}
              watch={watch}
              setValue={setValue}/>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Aperture size={14}/> Body Type</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-slate-500 focus:bg-white transition-all font-medium appearance-none"
                {...register('type',{required:true})}>
                  <option value="">Select Category</option>
                  {cameraTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* ENHANCED AUTOCOMPLETE LENS FIELD */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Focus size={14}/> Included Lens</label>
                <div className="relative">
                  <Search className="absolute left-5 top-4 text-gray-300" size={18} />
                  <input 
                    type='text'
                    list="lens-suggestions"
                    placeholder="Type to search or add custom lens..." 
                    className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-slate-500 focus:bg-white transition-all font-medium" 
                    {...register('included-lens',{required:true})}
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

          {/* 2. RENTAL & LOCATION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign size={20} className="text-slate-700" /> Rental & Pickup Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
 

              <Price
              innercolor="slate"
              {...register('price',{required:true})}
              />
              

              <Contact
              innercolor="slate"
              {...register('contactnumber',{required:true})}
              />


              <Location
              innercolor="slate"
              {...register('location',{required:true})}
              />
            </div>

            <Address
            innercolor="slate"
            {...register('address',{required:true})}
            />
          </div>

          {/* 3. GALLERY */}
          <Images
          register={register}
          setValue={setValue}
          innercolor="slate"
          />

          {/* 4. DESCRIPTION */}
          <FormDescription
          heading="Bundle Details"
          placeholder="Mention extra batteries, memory cards, or tripod..."
          innercolor="slate"
          logoclass="text-slate-700"
          {...register('description',{
          required:true})}
          />

          <SubmitButton
          innercolor="slate"
          isSubmitting={isSubmitting}
          />

        </form>
      </div>
    </div>
  );
};

export default CameraForm;