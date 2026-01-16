import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Building, MapPin, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, Star, ArrowLeft, Layers, Maximize, Tag, 
  Lock, Landmark, Home, Map,
} from 'lucide-react';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {FormInput,FormDescription, Price,Location,Address,Contact
} from './Utils/index.js'
import {useForm} from 'react-hook-form'
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
      category:'space'
    }
  })
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  
  const [images, setImages] = useState([]);
  const [previewImage,setPreviewImage]=useState([]);
  const spaceTypes = [
    "Residential Home", "Apartment/Flat", "Single Room", "Guest House", 
    "Hostel Room", "Commercial Shop", "Office Space", "Warehouse", 
    "Open Land", "Residential Plot", "Showroom", "Event Hall"
  ];

  if (selectedCategory !== 'realestate') return null;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const prevImages = files.map(file => URL.createObjectURL(file));
    setPreviewImage(prev => [...prev, ...prevImages].slice(0, 8));
    setImages((prev)=>{
      const uploadedImage=[...prev,...files].slice(0,8);
      setValue('images',uploadedImage);
      return uploadedImage
    })
  };

  const submit=(data)=>{
    //api call comes here
    console.log(data)
  }

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

        {/* HEADER SECTION */}
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
              {...register('itemname',{required:true})}
              />

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Maximize size={14}/> Total Area (Sq. Ft / Sq. Yard)</label>
                <input type="text" placeholder="e.g. 1200 sq ft" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
                 {...register('size',{required:true})} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Layers size={14}/> Space Type</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium appearance-none"
                {...register('type',{required:true})}>
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

          {/* 2. LEASE & LOCATION (Updated Section) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-indigo-600" /> Lease & Location
            </h2>
            
            {/* 3-Column Utility Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">Rent Amount</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">₹</span>
                  <input type="number" placeholder="0" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-black text-lg"
                  {...register('price',{required:true})} />
                </div>
              </div> */}

              <Price
              innercolor="indigo"
              {...register('price',{required:true})}
              />
              
              {/* <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">Contact WhatsApp</label>
                <div className="relative">
                  <MessageCircle className="absolute left-5 top-4 text-green-500" size={18} />
                  <input type="tel" placeholder="+91..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium" 
                  {...register('contact-number',{required:true})}/>
                </div>
              </div> */}

              <Contact
              innercolor="orange"
              {...register('contact-number',{required:true})}
              />

              {/* <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">City / Area</label>
                <div className="relative">
                  <Home className="absolute left-5 top-4 text-indigo-400" size={18} />
                  <input type="text" placeholder="e.g. Manhattan" className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium" 
                  {...register('location',{required:true})}/>
                </div>
              </div> */}

              <Location
              innercolor="indigo"
              {...register('location',{required:true})}
              />

            </div>

            {/* Address Field Added Below */}
            {/* <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">Full Street Address</label>
              <div className="relative">
                <Map className="absolute left-5 top-4 text-gray-400" size={18} />
                <input type="text" placeholder="Plot No, Street Name, Landmark..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium" 
                {...register('address',{required:true})}/>
              </div>
            </div> */}

            <Address
            innercolor="indigo"
            {...register('address',{required:true})}
            />

          </div>

          {/* 3. GALLERY */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><ImageIcon size={20} className="text-indigo-600" /> Property Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {previewImage.map((src, index) => (
                <div key={index} className="relative aspect-video rounded-2xl overflow-hidden group border border-gray-100">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Preview" />
                  <button onClick={() => setPreviewImage(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full transition-colors"><X size={14} /></button>
                </div>
              ))}
              {images.length < 8 && (
                <label className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-2xl cursor-pointer hover:border-indigo-400 transition-all group">
                  <Upload size={20} className="text-gray-400" />
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
            <input
            type='hidden'
            {...register('images',{required:true})}
            />
          </div>

          {/* 4. DESCRIPTION */}
          {/* <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Info size={20} className="text-indigo-600" /> Detailed Description</h2>
            <textarea rows="4" placeholder="Mention amenities (WiFi, Power Backup), nearby landmarks, or rules for guests..." className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium resize-none"
            {...register('description',{required:true})}></textarea>
          </div> */}

          <FormDescription
          heading="Detailed Description"
          placeholder="Mention amenities (WiFi, Power Backup), nearby landmarks, or rules for guests..."
          innercolor="indigo"
          logoclass="text-indigo-600"
          {...register('description',{required:true})}
          />

          {/* SUBMIT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100"><ShieldCheck size={20} /></div>
              <p className="text-[11px] text-gray-400 font-bold leading-tight max-w-[200px]">By listing, you agree to our verified property standards.</p>
            </div>
            <button type='submit' disabled={isSubmitting} className="w-full md:w-auto px-16 py-5 bg-indigo-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
              Post Listing <ArrowRight size={20} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SpaceForm;