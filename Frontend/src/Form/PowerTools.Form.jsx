import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Hammer, Drill, Zap, HardHat, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, Star, ArrowLeft, MapPin, Settings, Wrench, Tag,
  Phone, Briefcase, Map, Wallet, Search, // Added Wallet and Search
  IndianRupee
} from 'lucide-react';
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
    formState:{
      errors,
      isSubmitting,
      isSubmitSuccessful
    }
  }=useForm({
    defaultValues:{
      category:'power tools',
      condition:"Excellent"
    }
  })
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  
  useEffect(()=>{
    if(isSubmitSuccessful){
      reset();
      dispatch(setSelectedCategory(null))
    }
  },[isSubmitSuccessful])

  const [activeSafety, setActiveSafety] = useState([]);
  const [toolType, setToolType] = useState(''); // State for custom tool type

  const toolSuggestions = [
    "Hammer Drill", "Impact Driver", "Circular Saw", "Angle Grinder", 
    "Jigsaw", "Orbital Sander", "Mitre Saw", "Table Saw", 
    "Reciprocating Saw", "Nail Gun", "Air Compressor", "Generator",
    "Pressure Washer", "Jackhammer", "Ladder", "Concrete Mixer"
  ];

  if (selectedCategory !== 'tools') return null;

  const submit=(data)=>{
    //api call comes here
    console.log(data)
  }

  return (
    <div className="flex-grow bg-[#FDFCFB] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-orange-600 transition-all shadow-sm group active:scale-95"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </button>

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-orange-100">
              <Wrench size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">List Your Equipment</h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Inventory / Power Tools / Listing</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-orange-100">
            <Zap size={14} fill="currentColor" /> Pro Partner
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
          {/* 1. TOOL IDENTITY & CONDITION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Drill size={20} className="text-orange-500" /> Tool Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
              label='Brand & Model Name'
              placeholder="e.g. Bosch Professional Hammer Drill"
              innercolor='orange'
              {...register('itemname',{required:true})}
              />

              {/* SEARCHABLE TOOL TYPE FIELD */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Search size={14}/> Tool Type</label>
                <input 
                   type='text'
                  list="tool-types"
                  placeholder="e.g. Drill, Saw..." 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium" 
                  {...register('tool-type',{required:true})}
                />
                <datalist id="tool-types">
                  {toolSuggestions.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
              </div>

              {/* SECURITY DEPOSIT FIELD */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Wallet size={14}/> Security Deposit</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">₹</span>
                  <input type="number" placeholder="Refundable amount" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium"
                  {...register('security-deposite',{required:true})} />
                </div>
              </div>


              <Condition
              innercolor="orange"
              register={register}
              watch={watch}
              setValue={setValue}
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <IndianRupee size={20} className="text-orange-500" /> Rental Terms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

              <Price
              innercolor="orange"
              {...register('price',{required:true})}
              />

              <Contact
              innercolor="orange"
              {...register('contact-number',{required:true})}
              />

              <Location
              innercolor="orange"
              {...register('location',{required:true})}
              />
            </div>
            <Address
            innercolor="orange"
            {...register('address',{required:true})}
            />

          </div>

          <Images
          register={register}
          setValue={setValue}
          innercolor="orange"
          />

          <FormDescription
          heading="Technical Description"
          placeholder="Describe condition, battery life, included bits, and usage rules..."
          innercolor="orange"
          logoclass="text-orange-500"
          />


          <SubmitButton
          isSubmitting={isSubmitting}
          innercolor="orange"
          />

        </form>
      </div>
    </div>
  );
};

export default PowerToolForm;