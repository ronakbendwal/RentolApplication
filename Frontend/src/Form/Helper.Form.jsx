import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  PersonStanding, ShieldCheck, Car, Briefcase, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, MessageCircle, Info, ArrowLeft, MapPin, 
  User, Search, Star, Clock, Heart, CheckCircle2
} from 'lucide-react';
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
import {useForm} from 'react-hook-form'

const HelperForm = () => {
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
  }=useForm()
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset();
      dispatch(setSelectedCategory(null));
    }
  },[isSubmitSuccessful])

  const [gender, setGender] = useState('Male');
  const [serviceType, setServiceType] = useState('');
  const [experience, setExperience] = useState('1-2 Years');

  const experienceLevels = ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"];
  const genders = ["Male", "Female", "Other"];
  
  const serviceSuggestions = [
    "Personal Driver", "Security Guard", "Home Helper", "Delivery Partner",
    "Warehouse Labor", "Event Staff", "Cleaning Service", "Gardener",
    "Construction Worker", "Office Assistant", "Babysitter", "Elderly Care"
  ];

  if (selectedCategory !== 'helper') return null;


  const changeGender=(props)=>{
    setGender(props)
    setValue('gender',props)
  }

  const submit=(data)=>{
    //api call come here
    console.log(data)
  }

  return (
    <div className="flex-grow bg-[#FFFBF7] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-fuchsia-600 transition-all shadow-sm group active:scale-95"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </button>

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-amber-400 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-fuchsia-100">
              <PersonStanding size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">Register as a Helper</h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Services / Labor / Profile Listing</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-amber-100">
            <CheckCircle2 size={14} /> Verified Provider
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
          {/* 1. SERVICE IDENTITY & GENDER */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-fuchsia-500" /> Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
              label='Service Title / Name'
              placeholder='e.g. Professional Driver for Luxury Cars'
              innercolor='fuchsia'
              {...register('Personname',{required:true})}
              />

              {/* GENDER SELECTION (On the right) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Gender</label>
                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  {genders.map((item) => (
                    <button 
                      key={item}
                      type="button"
                      onClick={() => changeGender(item)}
                      className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${gender === item ? 'bg-white text-fuchsia-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <input
                type='hidden'
                {...register('gender',{required:true})}/>
              </div>

              {/* SEARCHABLE SERVICE TYPE */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Search size={14}/> Primary Skill / Role</label>
                <input 
                  type='text'
                  list="service-types"
                  placeholder="e.g. Security, Driver..." 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium" 
                  {...register('services-have',{required:true})}
                />
                <datalist id="service-types">
                  {serviceSuggestions.map((type) => (
                    <option key={type} value={type} />
                  ))}
                </datalist>
              </div>

              {/* EXPERIENCE SELECTION */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Experience Level</label>
                <select 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium appearance-none"
                  {...register('exprience',{required:true})}
                >
                  {experienceLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. PRICING & AVAILABILITY */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase size={20} className="text-fuchsia-500" /> Rates & Location
            </h2>
            
            <div  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

              <Price
              innercolor="fuchsia"
              {...register('price',{required:true})}
              />


              <Contact
              innercolor="fuchsia"
              {...register('contactnumber',{required:true})}
              />


              <Location
              innercolor="fuchsia"
              {...register('location',{required:true})}
              />

            </div>

            <div className="flex items-center gap-4 p-4 bg-fuchsia-50 rounded-2xl border border-fuchsia-100 text-fuchsia-700">
               <Clock size={20} />
               <p className="text-xs font-bold uppercase tracking-tight">Standard Shift: 8 Hours (Overtime negotiable)</p>
            </div>
          </div>

          {/* 3. PROFILE PHOTOS */}
          <Images
          register={register}
          setValue={setValue}
          innercolor="fuchsia"
          />

          {/* 4. ABOUT SERVICES */}

          <FormDescription
          heading="Professional Summary"
          placeholder="Describe your skills, previous work experience, or specific tools you can operate..." 
          innercolor="fuchsia"
          logoclass="text-fuchsia-500"
          {...register('description',{
          required:true})}
          />

          {/* 5. SUBMIT */}
          {/* <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 shrink-0 border border-amber-100"><ShieldCheck size={20} /></div>
              <p className="text-[11px] text-gray-400 font-bold leading-tight max-w-[200px]">Background check and ID verification may be required for helpers.</p>
            </div>
            <button type='submit' disabled={isSubmitting} className="w-full md:w-auto px-14 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
              List Profile <ArrowRight size={20} />
            </button>
          </div> */}
          <SubmitButton
          isSubmitting={isSubmitting}
          innercolor="fuchsia"
          />



        </form>
      </div>
    </div>
  );
};

export default HelperForm;