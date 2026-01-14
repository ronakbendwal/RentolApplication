import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Compass, Tent, Mountain, Wind, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, ArrowLeft, MapPin, Tag, Map, Wallet, Search, Trees,
  IndianRupee
} from 'lucide-react';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {FormInput,FormDescription,Price} from './Utils/index.js'
import { useForm } from 'react-hook-form';

const OutdoorForm = () => {
   const {
       register,
       handleSubmit,
       reset,
       setValue,
       formState:{
         errors,
         isSubmitting,
         isSubmitSuccessful
        }
   } =useForm({
    defaultValues:{
      category:'outdoor'
    }
   })
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  useEffect(()=>{
    if(isSubmitSuccessful){
      reset()
      dispatch(setSelectedCategory(null))
    }
  })
  const [images, setImages] = useState([]);
  const [previewImage,setPreviewImage]=useState([])
  const [condition, setCondition] = useState('Good');
  const [equipmentType, setEquipmentType] = useState('');

  const conditions = ["Brand New", "Like New", "Good", "Rugged"];
  
  // Predefined outdoor equipment types for search suggestions
  const equipmentSuggestions = [
    "Camping Tent", "Hiking Backpack", "Sleeping Bag", "Kayak",
    "Paddleboard (SUP)", "Mountain Bike", "Portable Grill", "Binoculars",
    "Climbing Harness", "Portable Power Station", "Cooler Box", "Camping Stove",
    "Snowshoes", "Trekking Poles", "Fishing Rod", "Hammock"
  ];

  if (selectedCategory !== 'outdoor') return null;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const prevImages = files.map(file => URL.createObjectURL(file));
    setPreviewImage(prev => [...prev, ...prevImages].slice(0, 6));
    setImages((prev)=>{
      const uploadedImage=[...prev,...files].slice(0,6);
      setValue('images',uploadedImage);
      return uploadedImage
    })
  };

  const changeCondition=(props)=>{
    setCondition(props)
    setValue('condition',props)
  }

  const submit=(data)=>{
    //api call comes here 
    console.log(data)
  }

  return (
    <div className="flex-grow bg-[#F7FCF9] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-emerald-600 transition-all shadow-sm group active:scale-95"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </button>

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-100">
              <Tent size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">List Outdoor Gear</h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Inventory / Adventure / Listing</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-emerald-100">
            <Trees size={14} /> Eco Explorer
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
          {/* 1. EQUIPMENT IDENTITY & CONDITION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Compass size={20} className="text-emerald-500" /> Gear Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
              <FormInput
              placeholder="e.g. North Face Stormbreak 2"
              label='Brand & Gear Name'
              innercolor='emerald'
              {...register('itemname',{required:true})}
              />

              {/* CONDITION (On the right) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Gear Condition</label>
                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  {conditions.map((item) => (
                    <button 
                      key={item}
                      type="button"
                      onClick={() => changeCondition(item)}
                      className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${condition === item ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <input
                type='hidden'
                {...register('condition',{required:true})}/>
              </div>

              {/* SEARCHABLE TYPE FIELD */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Search size={14}/> Equipment Type</label>
                <input 
                  list="outdoor-types"
                  placeholder="e.g. Tent, Kayak..." 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium" 
                  {...register('equipment-type',{required:true})}
                />
                <datalist id="outdoor-types">
                  {equipmentSuggestions.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
              </div>

              {/* SECURITY DEPOSIT */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Wallet size={14}/> Security Deposit</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">₹</span>
                  <input type="number" placeholder="Refundable amount" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium" 
                  {...register('security-amount',{required:true})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. RENTAL TERMS & LOCATION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <IndianRupee size={20} className="text-emerald-500" /> Rental & Pickup
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">Price / Day</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">₹</span>
                  <input type="number" placeholder="0" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-black text-lg" 
                  {...register('price',{required:true})}/>
                </div>
              </div> */}

                <Price
                innercolor="emerald"
                  {...register('price',{ required:true})}
                />

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">WhatsApp / Phone</label>
                <div className="relative">
                  <MessageCircle className="absolute left-5 top-4 text-green-500" size={18} />
                  <input type="tel" placeholder="+91..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium" 
                  {...register('contact-number',{required:true})}/>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">City / Area</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-4 text-red-400" size={18} />
                  <input type="text" placeholder="e.g. Denver, CO" className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                  {...register('location',{required:true})} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">Pickup Address</label>
              <div className="relative">
                <Map className="absolute left-5 top-4 text-gray-400" size={18} />
                <input type="text" placeholder="Street Name, Apt, Landmark..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
                {...register('address',{required:true})} />
              </div>
            </div>
          </div>

          {/* 3. GALLERY */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><ImageIcon size={20} className="text-emerald-500" /> Gear Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewImage.map((src, index) => (
                <div key={index} className="relative aspect-square rounded-3xl overflow-hidden group border border-gray-100">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Outdoor Gear" />
                  <button onClick={() => setPreviewImage(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full transition-colors hover:bg-red-500"><X size={14} /></button>
                </div>
              ))}
              {images.length < 6 && (
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl cursor-pointer hover:border-emerald-400 transition-all group">
                  <Upload size={20} className="text-gray-400 group-hover:text-emerald-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase mt-2">Add Photo</span>
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
            <input
            type='hidden'
            {...register('images',{required:true})}/>
          </div>

          {/* 4. DESCRIPTION */}
          {/* <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Info size={20} className="text-emerald-500" /> Description & Rules</h2>
            <textarea 
              rows="4" 
              placeholder="Tell borrowers about weight limits, weather resistance, or cleaning requirements..." 
              className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium resize-none"
              {...register('description',{required:true})}
            ></textarea>
          </div> */}

          <FormDescription
          heading=" Description & Rules"
          placeholder="Tell borrowers about weight limits, weather resistance, or cleaning requirements..."
          innercolor="emerald"
          logoclass="text-emerald-500"
          {...register('description',{required:true})}
          />

          {/* 5. SUBMIT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100"><ShieldCheck size={20} /></div>
              <p className="text-[11px] text-gray-400 font-bold leading-tight max-w-[200px]">By listing, you verify gear is sanitized and safe for use.</p>
            </div>
            <button type='submit' disabled={isSubmitting} className="w-full md:w-auto px-14 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
              List Gear <ArrowRight size={20} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default OutdoorForm;