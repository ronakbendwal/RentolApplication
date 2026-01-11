import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Camera, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, Star, ArrowLeft, MapPin, Map, Video, 
  Settings, Maximize, Aperture, Briefcase, Focus, Search
} from 'lucide-react';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import FormInput from './Util.Field.jsx';
import {useForm} from 'react-hook-form'

const CameraForm = () => {
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
      category:'camera'
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

  
  const [images, setImages] = useState([]);
  const [previewImage,setPreviewImage]=useState([])
  const [condition, setCondition] = useState('Excellent');
  // State to track the custom lens input
  const [lensInput, setLensInput] = useState('');

  const conditions = ["New", "Excellent", "Good", "Used"];
  
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

  const handleImageUpload = (e) => {

    const files = Array.from(e.target.files);

    const previewImageURL = files.map(file => URL.createObjectURL(file));

    setPreviewImage(prev => [...prev, ...previewImageURL].slice(0, 6));

    setImages(prev=>{
      const uploadedImage=[...prev, ...files].slice(0,6);
      setValue('images',uploadedImage)
      return uploadedImage;
    })

  };

  const submit=(data)=>{
    //api call come here
    console.log(data)
  }

  const changeCondition=(props)=>{
    setCondition(props)
    setValue('condition',props)
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

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Condition</label>
                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  {conditions.map((item) => (
                    <button 
                      key={item}
                      type="button"
                      onClick={() =>changeCondition(item)}
                      className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${condition === item ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <input
                type='hidden'
                {...register('condition',{required:true})}
                />
              </div>

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
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">Price / Day</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">₹</span>
                  <input type="number" placeholder="0" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-slate-500 focus:bg-white transition-all font-black text-lg" 
                  {...register('price',{required:true})}/>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">WhatsApp / Phone</label>
                <div className="relative">
                  <MessageCircle className="absolute left-5 top-4 text-green-500" size={18} />
                  <input type="tel" placeholder="+1..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-slate-500 focus:bg-white transition-all font-medium" 
                  {...register('contactnumber',{required:true})}/>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">City / Area</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-4 text-red-400" size={18} />
                  <input type="text" placeholder="e.g. Studio District" className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-slate-500 focus:bg-white transition-all font-medium" 
                  {...register('location',{required:true})}/>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">Full Pickup Address</label>
              <div className="relative">
                <Map className="absolute left-5 top-4 text-gray-400" size={18} />
                <input type="text" placeholder="Studio/House No, Street Name, Landmark..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-slate-500 focus:bg-white transition-all font-medium"
                {...register('address',{required:true})} />
              </div>
            </div>
          </div>

          {/* 3. GALLERY */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><ImageIcon size={20} className="text-slate-700" /> Equipment Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {previewImage.map((src, index) => (
                <div key={index} className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100 group">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Gear" />
                  <button onClick={() => setPreviewImage(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors"><X size={14} /></button>
                </div>
              ))}
              {images.length < 6 && (
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-all group">
                  <Upload size={20} className="text-gray-400 group-hover:text-slate-700" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Upload</span>
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
            <input
            type='hidden'
            {...register('images',{required:true})}/>
          </div>

          {/* 4. DESCRIPTION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Briefcase size={20} className="text-slate-700" /> Bundle Details</h2>
            <textarea rows="4" placeholder="Mention extra batteries, memory cards, or tripod..." className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:border-slate-500 focus:bg-white transition-all font-medium resize-none"
            {...register('description',{required:true})}></textarea>
          </div>

          {/* SUBMIT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 border border-slate-100"><ShieldCheck size={20} /></div>
              <p className="text-[11px] text-gray-400 font-bold leading-tight max-w-[200px]">Ensure the sensor is clean and lenses are dust-free.</p>
            </div>
            <button type='submit' disabled={isSubmitting} className="w-full md:w-auto px-14 py-5 bg-slate-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
              List My Gear <ArrowRight size={20} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CameraForm;