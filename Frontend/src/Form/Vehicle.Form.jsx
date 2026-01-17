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
  Condition,
  Images,
  SubmitButton
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


  const vehicleTypes = [
    "Sedan", "SUV", "Hatchback", "Luxury / Sport", 
    "Crossover", "Convertible", "Coupe", "Mini Van",
    "Pickup Truck", "Cargo Van", "Commercial Truck",
    "Bus / Coach", "Minibus", "Ambulance / Special"
  ];

  if (selectedCategory !== 'cars') return null;

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



          <Images
          register={register}
          setValue={setValue}
          innercolor="blue"
          />

          <FormDescription
          heading="Description"
          placeholder="Tell us about the vehicle features, AC, mileage, or special rental rules..."
          innercolor="blue"
          logoclass="text-blue-600"
          {...register('description',{required:true})}
          />



          <SubmitButton
          innercolor="blue"
          isSubmitting={isSubmitting}
           />
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;
