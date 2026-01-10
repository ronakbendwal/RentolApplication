import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  PersonStanding, ShieldCheck, Car, Briefcase, DollarSign, Image as ImageIcon, 
  Upload, X, ArrowRight, MessageCircle, Info, ArrowLeft, MapPin, 
  User, Search, Star, Clock, Heart, CheckCircle2
} from 'lucide-react';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';

const HelperForm = () => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.formopendata);
  
  const [images, setImages] = useState([]);
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages].slice(0, 3)); // Usually fewer photos needed for profiles
  };

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

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* 1. SERVICE IDENTITY & GENDER */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-fuchsia-500" /> Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* SERVICE TITLE */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Service Title / Name</label>
                <input type="text" placeholder="e.g. Professional Driver for Luxury Cars" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium" />
              </div>

              {/* GENDER SELECTION (On the right) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Gender</label>
                <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                  {genders.map((item) => (
                    <button 
                      key={item}
                      type="button"
                      onClick={() => setGender(item)}
                      className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${gender === item ? 'bg-white text-fuchsia-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* SEARCHABLE SERVICE TYPE */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"><Search size={14}/> Primary Skill / Role</label>
                <input 
                  list="service-types"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  placeholder="e.g. Security, Driver..." 
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium" 
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
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium appearance-none"
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">Rate / Day</label>
                <div className="relative">
                  <span className="absolute left-5 top-4 text-gray-400 font-bold">$</span>
                  <input type="number" placeholder="0" className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-black text-lg" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">WhatsApp / Phone</label>
                <div className="relative">
                  <MessageCircle className="absolute left-5 top-4 text-green-500" size={18} />
                  <input type="tel" placeholder="+1..." className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">Service City</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-4 text-red-400" size={18} />
                  <input type="text" placeholder="e.g. Miami, FL" className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-fuchsia-50 rounded-2xl border border-fuchsia-100 text-fuchsia-700">
               <Clock size={20} />
               <p className="text-xs font-bold uppercase tracking-tight">Standard Shift: 8 Hours (Overtime negotiable)</p>
            </div>
          </div>

          {/* 3. PROFILE PHOTOS */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><ImageIcon size={20} className="text-fuchsia-500" /> Profile Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((src, index) => (
                <div key={index} className="relative aspect-[3/4] rounded-3xl overflow-hidden group border border-gray-100">
                  <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Helper Profile" />
                  <button onClick={() => setImages(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full transition-colors hover:bg-red-500"><X size={14} /></button>
                </div>
              ))}
              {images.length < 3 && (
                <label className="aspect-[3/4] flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl cursor-pointer hover:border-fuchsia-400 transition-all group">
                  <Upload size={20} className="text-gray-400 group-hover:text-fuchsia-500" />
                  <span className="text-[10px] font-black text-gray-400 uppercase mt-2 text-center px-2">Upload Clear Photo</span>
                  <input type="file" multiple className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          {/* 4. ABOUT SERVICES */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Info size={20} className="text-fuchsia-500" /> Professional Summary</h2>
            <textarea 
              rows="4" 
              placeholder="Describe your skills, previous work experience, or specific tools you can operate..." 
              className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:border-fuchsia-500 focus:bg-white transition-all font-medium resize-none"
            ></textarea>
          </div>

          {/* 5. SUBMIT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 shrink-0 border border-amber-100"><ShieldCheck size={20} /></div>
              <p className="text-[11px] text-gray-400 font-bold leading-tight max-w-[200px]">Background check and ID verification may be required for helpers.</p>
            </div>
            <button className="w-full md:w-auto px-14 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
              List Profile <ArrowRight size={20} />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default HelperForm;