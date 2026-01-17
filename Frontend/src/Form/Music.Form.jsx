import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Music, Guitar, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, ArrowLeft, MapPin, Tag,
  Map, Wallet, Search, Disc,IndianRupee
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
import {useForm} from 'react-hook-form'

const MusicForm = () => {
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
      category:'music',
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
  },[])

  const [instrumentType, setInstrumentType] = useState('');

  
  const instrumentSuggestions = [
    "Acoustic Guitar", "Electric Guitar", "Bass Guitar", "Digital Piano",
    "Synthesizer", "Drum Kit", "Electronic Drums", "Saxophone",
    "Violin", "Cello", "DJ Controller", "Studio Monitor",
    "Condenser Microphone", "Audio Interface", "Mixer", "Amplifier"
  ];

  // LOGIC CHECK: Using the key from your request
  if (selectedCategory !== 'music-instruments') return null;


  const submit=(data)=>{
    //api call comes here
    console.log(data)
  }
  return (
    <div className="flex-grow bg-[#FBFAFF] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-indigo-600 transition-all shadow-sm group active:scale-95"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </button>

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <Music size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">List Your Instrument</h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Inventory / Musical Gear / Listing</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-indigo-100">
            <Disc size={14} className="animate-spin-slow" /> Artist Choice
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
          {/* 1. INSTRUMENT IDENTITY & CONDITION ROW */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Guitar size={20} className="text-indigo-500" /> Gear Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <FormInput
              label='Instrument Brand & Model'
              placeholder="e.g. Fender Stratocaster"
              innercolor='indigo'
              {...register('itemname',{required:true})}
              />

              <Condition
              innercolor="indigo"
              register={register}
              watch={watch}
              setValue={setValue}
              />

              {/* SEARCHABLE INSTRUMENT TYPE */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Search size={14}/> Instrument Type</label>
                <input 
                  list="music-types"
                  placeholder="e.g. Guitar, Synth..." 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium" 
                  {...register('instrument-type',{required:true})}
                />
                <datalist id="music-types">
                  {instrumentSuggestions.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
              </div>

              {/* SECURITY DEPOSIT */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Wallet size={14}/> Security Deposit</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">₹</span>
                  <input type="number" placeholder="Refundable amount" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
                  {...register('security-deposite',{required:true})} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <IndianRupee size={20} className="text-indigo-500" /> Rental & Pickup
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
   
              <Price
              innercolor="indigo"
              {...register('price',{required:true })}
              />

              <Contact
              innercolor="indigo"
              {...register('contact number',{required:true})}
              />


              <Location
              innercolor="ingigo"
              {...register('location',{required:true})}
              />

            </div>


            <Address
            innercolor="indigo"
            {...register('address',{required:true})}
            />

          </div>


          <Images
          register={register}
          setValue={setValue}
          innercolor="indigo"
          />

          <FormDescription
          heading="Item Description"
          placeholder="Include details about strings, accessories like cases/stands, or specific sound characteristics..."
          innercolor="indigo"
          logoclass="text-indigo-500"
          {...register('description',{required:true})}
          />

          <SubmitButton
          innercolor="indigo"
          isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default MusicForm;