import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Car, Fuel, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, Star, ArrowLeft, MapPin, Calendar, Tag, Map,
  Layers, Wallet // Added Wallet for Security Deposit
} from 'lucide-react';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {
  FormInput, 
  FormDescription,
  Price,
  Contact,
  Address,
  Location, 
  Condition
} from './Utils/index.js'
import {useForm} from 'react-hook-form'
const VehicleForm = () => {
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
      category:'vehicle',
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
  },[isSubmitSuccessful])

  const [images, setImages] = useState([]);
  const [previewImage,setPreviewImage]=useState([])

  const vehicleTypes = [
    "Sedan", "SUV", "Hatchback", "Luxury / Sport", 
    "Crossover", "Convertible", "Coupe", "Mini Van",
    "Pickup Truck", "Cargo Van", "Commercial Truck",
    "Bus / Coach", "Minibus", "Ambulance / Special"
  ];

  if (selectedCategory !== 'cars') return null;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const prevImages = files.map(file => URL.createObjectURL(file));
    setPreviewImage(prev => [...prev, ...prevImages].slice(0, 6));
    setImages((prev)=>{
      const uploadedImage=[...prev,...files].slice(0,6)
      setValue('images',uploadedImage)
      return uploadedImage
    })
  };

  const submit =(data)=>{
    //api call come here
    console.log(data)
  }

  return (
    <div className="flex-grow bg-[#F8FAFC] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-blue-600 transition-all shadow-sm group active:scale-95"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </button>

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100">
              <Car size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Vehicle Details</h1>
              <p className="text-gray-500 font-medium text-xs uppercase tracking-widest">Listing / Vehicles / Add New</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm">
            <Star size={16} fill="currentColor" /> Premium Listing
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
          {/* 1. IDENTITY & CONDITION BAR */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Tag size={20} className="text-blue-600" /> Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
              label="Vehicle Name / Model"
              placeholder="e.g. BMW M4 Competition"
              innercolor='blue'
              {...register('itemname',{required:true})}
              />

              {/* <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Vehicle Condition</label>
                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  {conditions.map((item) => (
                    <button 
                      key={item}
                      type="button"
                      onClick={() => changeCondition(item)}
                      className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${condition === item ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <input
                type='hidden'
                {...register('condition',{required:true})}
                />
              </div> */}

              <Condition
              innercolor="blue"
              register={register}
              watch={watch}
              setValue={setValue}
              />

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Layers size={14}/> Vehicle Type</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium appearance-none"
                {...register('type',{required:true})}>
                  <option value="">Select Category</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Fuel size={14}/> Fuel Type</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium appearance-none"
                {...register('fuel-type',{required:true})}>
                  <option>Petrol</option><option>Electric</option><option>Diesel</option><option>Hybrid</option><option>CNG</option>
                </select>
              </div>

              {/* TWO COLUMN GRID FOR YEAR AND DEPOSIT */}
              <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Calendar size={14}/> Manufacturing Year</label>
                  <input type="number" placeholder="2024" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium" 
                  {...register('purchasedate',{required:true})}/>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Wallet size={14}/> Security Deposit</label>
                  <div className="relative">
                    <span className="absolute left-5 top-4 text-gray-400 font-bold">$</span>
                    <input type="number" placeholder="Refundable amount" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                    {...register('deposite',{required:true})} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ... (Rest of the code remains the same as previous) ... */}
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" /> Rental & Pickup Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Price
              innercolor="blue"
              {...register('price',{required:true})}
              />
              
              <Contact
              innercolor="blue"
              {...register('contact-number',{required:true})}
              />

              <Location
              innercolor="blue"
              {...register('location',{required:true})}
              />
            </div>

            <Address
            innercolor="blue"
            {...register('address',{required:true})}
            />
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><ImageIcon size={20} className="text-blue-600" /> High-Res Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {previewImage.map((src, index) => (
                <div key={index} className="relative aspect-square rounded-3xl overflow-hidden group border border-gray-100">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Preview" />
                  <button onClick={() => setPreviewImage(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors"><X size={14} /></button>
                </div>
              ))}
              {images.length < 6 && (
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group">
                  <Upload size={20} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Upload</span>
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
            <input
            type='hidden'
            {...register('images',{required:true})}/>
          </div>

          <FormDescription
          heading="Description"
          placeholder="Tell us about the vehicle features, AC, mileage, or special rental rules..."
          innercolor="blue"
          logoclass="text-blue-600"
          {...register('description',{required:true})}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0 border border-green-200"><ShieldCheck size={20} /></div>
              <p className="text-[11px] text-gray-400 font-medium leading-tight max-w-[200px]">Ensure registration and insurance documents are ready for verification.</p>
            </div>
            <button type='submit' disabled={isSubmitting}
            className="w-full md:w-auto px-14 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
              Post Listing <ArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;
