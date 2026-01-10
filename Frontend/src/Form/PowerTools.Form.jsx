import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Hammer, Drill, Zap, HardHat, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, Star, ArrowLeft, MapPin, Settings, Wrench, Tag,
  Phone, Briefcase, Map
} from 'lucide-react';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';

const PowerToolForm = () => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  
  const [images, setImages] = useState([]);
  const [activeSafety, setActiveSafety] = useState([]);
  const [condition, setCondition] = useState('Like New');

  const safetyGear = ["Safety Glasses", "Work Gloves", "Ear Protection", "Dust Mask", "Hard Hat", "Carry Case"];
  const conditions = ["Brand New", "Like New", "Good", "Well Used"];

  if (selectedCategory !== 'tools') return null;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages].slice(0, 6));
  };

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

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* 1. TOOL IDENTITY & CONDITION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Drill size={20} className="text-orange-500" /> Tool Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Brand & Model Name</label>
                <input type="text" placeholder="e.g. Bosch Professional Hammer Drill" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Tool Condition</label>
                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  {conditions.map((item) => (
                    <button 
                      key={item}
                      type="button"
                      onClick={() => setCondition(item)}
                      className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${condition === item ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. PRICING, LOCATION & CONTACT (Updated Section) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign size={20} className="text-orange-500" /> Rental Terms
            </h2>
            
            {/* 3-Column Utility Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">Rate / Day</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">$</span>
                  <input type="number" placeholder="0" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-black text-lg" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">WhatsApp / Phone</label>
                <div className="relative">
                  <MessageCircle className="absolute left-5 top-4 text-green-500" size={18} />
                  <input type="tel" placeholder="+1..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">City / Area</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-4 text-red-400" size={18} />
                  <input type="text" placeholder="e.g. Brooklyn" className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium" />
                </div>
              </div>
            </div>

            {/* Address Field Added Below */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">Full Pickup Address</label>
              <div className="relative">
                <Map className="absolute left-5 top-4 text-gray-400" size={18} />
                <input type="text" placeholder="Workshop No, Street Name, Nearby Landmark..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-orange-500 focus:bg-white transition-all font-medium" />
              </div>
            </div>
          </div>

          {/* 3. SAFETY GEAR SELECTION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HardHat size={20} className="text-orange-500" /> Included Gear
            </h2>
            <div className="flex flex-wrap gap-3">
              {safetyGear.map(item => (
                <button 
                  key={item} 
                  type="button" 
                  onClick={() => setActiveSafety(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])}
                  className={`px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all border ${activeSafety.includes(item) ? 'bg-orange-500 border-orange-500 text-white shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 4. GALLERY */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><ImageIcon size={20} className="text-orange-500" /> Equipment Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((src, index) => (
                <div key={index} className="relative aspect-square rounded-3xl overflow-hidden group border border-gray-100">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Tool" />
                  <button onClick={() => setImages(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full"><X size={14} /></button>
                </div>
              ))}
              {images.length < 6 && (
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl cursor-pointer hover:border-orange-400 transition-all group">
                  <Upload size={20} className="text-gray-400 group-hover:text-orange-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase mt-2">Upload</span>
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          {/* 5. DESCRIPTION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Info size={20} className="text-orange-500" /> Technical Description</h2>
            <textarea 
              rows="4" 
              placeholder="Describe condition, battery life, included bits, and usage rules..." 
              className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:border-orange-500 focus:bg-white transition-all font-medium resize-none"
            ></textarea>
          </div>

          {/* 6. SUBMIT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 shrink-0 border border-orange-100"><ShieldCheck size={20} /></div>
              <p className="text-[11px] text-gray-400 font-bold leading-tight max-w-[200px]">By listing, you agree to Rentol's machinery safety standards.</p>
            </div>
            <button className="w-full md:w-auto px-14 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
              Confirm & List <ArrowRight size={20} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PowerToolForm;