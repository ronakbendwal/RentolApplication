import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Bike, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, ShieldCheck, MessageCircle, 
  Info, Star, ArrowLeft, MapPin, Calendar, Tag, Navigation,
  Layers
} from 'lucide-react';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';

const BikeForm = () => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  
  const [images, setImages] = useState([]);
  const [condition, setCondition] = useState('Excellent');

  const conditions = ["Brand New", "Excellent", "Good", "Used"];
  
  // Comprehensive list of bike types
  const bikeTypes = [
    "Mountain Bike (MTB)", "Road Bike", "Hybrid/City Bike", 
    "Electric Bike (e-Bike)", "Electric Scooter", "Cruiser", 
    "BMX", "Folding Bike", "Gravel Bike", "Fat Tire Bike"
  ];

  if (selectedCategory !== 'bikes') return null;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages].slice(0, 6));
  };

  return (
    <div className="flex-grow bg-[#F7FCF9] h-screen overflow-y-auto p-4 md:p-12 animate-in slide-in-from-right duration-700">
      <div className="max-w-4xl mx-auto">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => dispatch(setSelectedCategory(null))}
          className="flex items-center gap-2 px-5 py-3 mb-8 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 hover:text-emerald-600 transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft size={18} />
          Back to Categories
        </button>

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100">
              <Bike size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Bike Details</h1>
              <p className="text-gray-500 font-medium text-xs uppercase tracking-widest">Listing / Bikes & Scooters</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-sm">
            <Navigation size={16} fill="currentColor" /> Adventure Ready
          </div>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* 1. IDENTITY & CONDITION BAR */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Tag size={20} className="text-emerald-600" /> Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Bike Model / Brand</label>
                <input type="text" placeholder="e.g. Trek Marlin 7" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Condition</label>
                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  {conditions.map((item) => (
                    <button 
                      key={item}
                      type="button"
                      onClick={() => setCondition(item)}
                      className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${condition === item ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Calendar size={14}/> Purchase Year</label>
                <input type="number" placeholder="2024" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Layers size={14}/> Bike Type</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium appearance-none">
                  <option value="">Select Type</option>
                  {bikeTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. OPTIMIZED 3-COLUMN UTILITY ROW */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign size={20} className="text-emerald-600" /> Rental Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase">Price / Day</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">$</span>
                  <input type="number" placeholder="0" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-black text-lg" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase">Contact WhatsApp</label>
                <div className="relative">
                  <MessageCircle className="absolute left-5 top-4 text-green-500" size={18} />
                  <input type="tel" placeholder="+1..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-4 text-red-400" size={18} />
                  <input type="text" placeholder="City / Area" className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. GALLERY */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><ImageIcon size={20} className="text-emerald-600" /> Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {images.map((src, index) => (
                <div key={index} className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100 group">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Preview" />
                  <button onClick={() => setImages(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors"><X size={14} /></button>
                </div>
              ))}
              {images.length < 6 && (
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all group">
                  <Upload size={20} className="text-gray-400 group-hover:text-emerald-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Upload</span>
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          {/* 4. DESCRIPTION */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Info size={20} className="text-emerald-600" /> Gear & Details</h2>
            <textarea rows="4" placeholder="Mention frame size, included accessories (helmet, lock), and any usage rules..." className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium resize-none"></textarea>
          </div>

          {/* SUBMIT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100"><ShieldCheck size={20} /></div>
              <p className="text-[11px] text-gray-400 font-bold leading-tight max-w-[200px]">Safety is priority. Ensure brakes and tires are checked.</p>
            </div>
            <button className="w-full md:w-auto px-14 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
              List My Bike <ArrowRight size={20} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BikeForm;