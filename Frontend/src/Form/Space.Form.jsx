import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Building, MapPin, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, Star, ArrowLeft, Layers, Maximize, Tag, 
  Lock, Landmark, Home, Map,
} from 'lucide-react';
import axios from 'axios';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {
  FormInput,
  FormDescription,
  Price,
  Location,
  Address,
  Contact,
  Images,
  SubmitButton
} from './Utils/index.js';
import {useForm} from 'react-hook-form';


const SpaceForm = () => {
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
  }=useForm({
    defaultValues:{
      category:'space',
    }
  })


  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);

  useEffect(() => {
  if (isSubmitSuccessful) {
      reset();
      dispatch(setSelectedCategory(null));
    }
  }, [isSubmitSuccessful]);
  
  const spaceTypes = [
    "Residential Home", "Apartment/Flat", "Single Room", "Guest House", 
    "Hostel Room", "Commercial Shop", "Office Space", "Warehouse", 
    "Open Land", "Residential Plot", "Showroom", "Event Hall"
  ];
  const [error,setError]=useState("");

  if (selectedCategory !== 'realestate') return null;



 const submit = async (data) => {
  console.log("RAW FORM DATA:", data);
  setError("");

  try {
    const fd = new FormData();

    // append normal fields
    Object.keys(data).forEach((key) => {
      if (key !== "images" && key !== "specs") {
        fd.append(key, data[key]);
      }
    });

    // append specs (nested object)
    if (data.specs) {
      Object.keys(data.specs).forEach((k) => {
        fd.append(`specs[${k}]`, data.specs[k]);
      });
    }

    // append images
    if (data?.images && data.images.length >= 0) {
      data.images.forEach((file) => {
        fd.append("images", file);
      });
    }

    const response = await axios.post(
      "/api/user/rentoutitem",
      fd,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log("SUCCESS:", response.data);

  } catch (error) {
    console.log("ERROR:", error);
    setError(error?.response?.data?.message || "Invalid credentials");
  }
};

  return (
    <div className="flex-grow bg-[#F9FAFF] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft size={18} />
          Back to Categories
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
              <Landmark size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-[1000] text-gray-900 tracking-tight">Space Listing</h1>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Inventory / Real Estate / Add New</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-2xl font-black text-xs uppercase border border-indigo-100">
            <Star size={14} fill="currentColor" /> Verified Listing
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(submit)}>
          
          {/* 1. PROPERTY IDENTITY & AREA */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Tag size={20} className="text-indigo-600" /> Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
              label='Listing Title'
              placeholder="e.g. Cozy Guest House in Downtown"
              innercolor='indigo'
              {...register('itemName',{required:true})}
              />

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Maximize size={14}/> Total Area (Sq. Ft / Sq. Yard)</label>
                <input type="text" placeholder="e.g. 1200 sq ft" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
                 {...register('specs.size',{required:true})} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Layers size={14}/> Space Type</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium appearance-none"
                {...register('specs.type',{required:true})}>
                  <option value="">Select Category</option>
                  {spaceTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Lock size={14}/> Security Deposit (Refundable)</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">$</span>
                  <input type="number" placeholder="0.00" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium" 
                  {...register('deposite',{required:true})}/>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-indigo-600" /> Lease & Location
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Price
              innercolor="indigo"
              {...register('price',{required:true})}
              />
  
              <Contact
              innercolor="orange"
              {...register('contact-number',{required:true})}
              />

              <Location
              innercolor="indigo"
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
          heading="Detailed Description"
          placeholder="Mention amenities (WiFi, Power Backup), nearby landmarks, or rules for guests..."
          innercolor="indigo"
          logoclass="text-indigo-600"
          {...register('description',{required:true})}
          />


          <SubmitButton
          innercolor="indigo"
          isSubmitting={isSubmitting}
          name="Space"
          />

        </form>
      </div>
    </div>
  );
};

export default SpaceForm;