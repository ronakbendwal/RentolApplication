import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { 
  Car, Hammer, Bike, Camera, Smartphone, 
  Home, Tent, Music, Search, Zap, ArrowRight,
  Sparkles, ShieldCheck, ChevronRight, TrendingUp,Image as ImageIcon
} from 'lucide-react';
import {setSelectedCategory} from '../redux/Feature/FormOpenName.js'
import {
  VehicleForm,
  PowerToolForm,
  BikeForm,
  SpaceForm,
  CameraForm
} from '../Form/index.js';
///
// import React, { useState, useEffect } from 'react';
// import { 
//   Car, Hammer, Bike, Smartphone, Camera, Tent, Music, Home,
//   ,ChevronRight,
// } from 'lucide-react';

const ItemCategoryPage= () => {
  
  const {selectedCategory}=useSelector((state)=>state.formopendata)
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch=useDispatch()

  const categories = [
    { id: 'cars', name: 'Vehicles', icon: <Car />, color: 'from-blue-500 to-cyan-500', desc: 'Cars, Trucks & Vans' },
    { id: 'tools', name: 'Power Tools', icon: <Hammer />, color: 'from-orange-500 to-yellow-500', desc: 'Drills, Saws & More' },
    { id: 'bikes', name: 'Bikes', icon: <Bike />, color: 'from-green-500 to-emerald-500', desc: 'Electric & Mountain' },
    { id: 'electronics', name: 'Tech', icon: <Smartphone />, color: 'from-purple-500 to-indigo-500', desc: 'Consoles & Gadgets' },
    { id: 'photography', name: 'Cameras', icon: <Camera />, color: 'from-pink-500 to-rose-500', desc: 'Lenses & Lighting' },
    { id: 'camping', name: 'Outdoor', icon: <Tent />, color: 'from-teal-500 to-emerald-500', desc: 'Tents & Gear' },
    { id: 'instruments', name: 'Music', icon: <Music />, color: 'from-red-500 to-orange-500', desc: 'Guitars & Keyboards' },
    { id: 'realestate', name: 'Spaces', icon: <Home />, color: 'from-indigo-500 to-blue-500', desc: 'Studios & Offices' },
  ];

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSafety = (item) => {
    setActiveSafety(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] overflow-x-hidden">
      <div className={`flex flex-col lg:flex-row min-h-screen transition-all duration-700 ease-in-out ${selectedCategory ? 'gap-0' : 'max-w-4xl mx-auto pt-10 px-4'}`}>
        
        {/* LEFT SIDE: CATEGORY LIST */}
        <div className={`transition-all duration-700 p-6 ${selectedCategory ? 'lg:w-[400px] bg-white border-r border-gray-100 h-screen overflow-y-auto' : 'w-full'}`}>
          <div className={`${selectedCategory ? 'mb-8' : 'text-center mb-16'}`}>
            <h1 className={`${selectedCategory ? 'text-2xl' : 'text-5xl md:text-6xl'} font-[1000] text-gray-900 leading-tight tracking-tighter`}>
              {selectedCategory ? 'Select Category' : 'List your Item'}
            </h1>
            <div className="relative group mt-6">
              <input type="text" placeholder="Search categories..." className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm outline-none" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredCategories.map((cat) => (
              <div key={cat.id} onClick={() => dispatch(setSelectedCategory(cat.id))} className={`group relative rounded-[2rem] p-5 border-2 transition-all cursor-pointer flex items-center gap-5 ${selectedCategory===cat.id ? 'bg-blue-50/50 border-blue-600 shadow-lg' : 'bg-white border-transparent shadow-sm hover:border-blue-100'}`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white`}>{cat.icon}</div>
                <div className="flex-grow"><h3 className="text-lg font-black text-gray-900">{cat.name}</h3></div>
                <ChevronRight size={20} className={selectedCategory === cat.id ? 'text-blue-600' : 'text-gray-300'} />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: FORMS */}
        <VehicleForm/>
        <PowerToolForm/>
        <BikeForm/>
        <SpaceForm/>
        <CameraForm/>
 
      </div>
    </div>
  );
};
const EnhancedCategoryPage2 = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulated entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'cars', name: 'Vehicles', icon: <Car />, color: 'from-blue-500 to-cyan-500', desc: 'Cars, Trucks & Vans', popular: true },
    { id: 'tools', name: 'Power Tools', icon: <Hammer />, color: 'from-orange-500 to-yellow-500', desc: 'Drills, Saws & More', popular: false },
    { id: 'bikes', name: 'Bikes', icon: <Bike />, color: 'from-green-500 to-emerald-500', desc: 'Electric & Mountain', popular: true },
    { id: 'electronics', name: 'Tech', icon: <Smartphone />, color: 'from-purple-500 to-indigo-500', desc: 'Consoles & Gadgets', popular: true },
    { id: 'photography', name: 'Cameras', icon: <Camera />, color: 'from-pink-500 to-rose-500', desc: 'Lenses & Lighting', popular: false },
    { id: 'camping', name: 'Outdoor', icon: <Tent />, color: 'from-teal-500 to-emerald-500', desc: 'Tents & Gear', popular: false },
    { id: 'instruments', name: 'Music', icon: <Music />, color: 'from-red-500 to-orange-500', desc: 'Guitars & Keyboards', popular: false },
    { id: 'realestate', name: 'Spaces', icon: <Home />, color: 'from-indigo-500 to-blue-500', desc: 'Studios & Offices', popular: false },
  ];

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFB] pb-20 pt-10 px-4 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto"> {/* Changed max-width to make vertical list look better */}
        
        {/* HEADER SECTION */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6 animate-bounce">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-xs font-black text-gray-600 uppercase tracking-widest">Start Earning Today</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-[1000] text-gray-900 leading-tight mb-8 tracking-tighter">
            What's in your <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Garage?</span>
          </h1>

          {/* Luxury Search Bar */}
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
            <div className="relative flex items-center bg-white border border-gray-100 rounded-[2rem] px-6 py-5 shadow-2xl shadow-gray-200/50">
              <Search className="text-gray-400 mr-4" size={24} />
              <input 
                type="text" 
                placeholder="Search categories..."
                className="w-full outline-none text-xl font-medium text-gray-800 placeholder-gray-400"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <kbd className="hidden md:block px-3 py-1 bg-gray-50 border border-gray-200 text-gray-400 rounded-lg text-xs font-bold font-sans">ESC</kbd>
            </div>
          </div>
        </div>

        {/* MAIN CATEGORY VERTICAL GRID */}
        <div className="grid grid-cols-1 gap-6"> {/* Changed to grid-cols-1 for vertical layout */}
          {filteredCategories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/list-item/${cat.id}`)}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`group relative bg-white rounded-[2.5rem] p-6 md:p-8 border border-transparent hover:border-blue-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-20px_rgba(59,130,246,0.15)] transition-all duration-500 cursor-pointer flex flex-col md:flex-row items-center gap-6 ${loading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
            >
              {/* Left Side: Icon */}
              <div className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-3xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {React.cloneElement(cat.icon, { size: 30, strokeWidth: 2.5 })}
              </div>

              {/* Center: Content */}
              <div className="flex-grow text-center md:text-left space-y-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h3 className="text-2xl font-black text-gray-900">{cat.name}</h3>
                  {cat.popular && (
                    <span className="inline-flex items-center w-fit mx-auto md:mx-0 gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      <TrendingUp size={12} /> Popular
                    </span>
                  )}
                </div>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Right Side: Arrow and Action Text */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="hidden md:block text-xs font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Select
                </span>
                <div className="w-12 h-12 bg-gray-50 group-hover:bg-blue-600 rounded-full flex items-center justify-center text-gray-300 group-hover:text-white shadow-sm transition-all duration-300">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM PROMO CARD */}
        <div className="mt-24 relative rounded-[4rem] bg-gray-900 p-12 overflow-hidden shadow-3xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-blue-400 border border-white/5">
                <ShieldCheck size={20} />
                <span className="text-sm font-bold">100% Secure Rentals</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white max-w-xl">
                Still unsure where to <span className="text-blue-500">list it?</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-md">Our AI can help categorize your item based on a photo. Just drop it in and we'll handle the rest.</p>
            </div>
            
            <button className="group relative px-12 py-6 bg-blue-600 rounded-3xl overflow-hidden hover:scale-105 transition-all">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-white font-black text-lg flex items-center gap-3">
                    <Sparkles /> Use AI Assistant
                </span>
            </button>
          </div>
          
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        </div>
      </div>
    </div>
  );
};
const EnhancedCategoryPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulated entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'cars', name: 'Vehicles', icon: <Car />, color: 'from-blue-500 to-cyan-500', desc: 'Cars, Trucks & Vans', popular: true },
    { id: 'tools', name: 'Power Tools', icon: <Hammer />, color: 'from-orange-500 to-yellow-500', desc: 'Drills, Saws & More', popular: false },
    { id: 'bikes', name: 'Bikes', icon: <Bike />, color: 'from-green-500 to-emerald-500', desc: 'Electric & Mountain', popular: true },
    { id: 'electronics', name: 'Tech', icon: <Smartphone />, color: 'from-purple-500 to-indigo-500', desc: 'Consoles & Gadgets', popular: true },
    { id: 'photography', name: 'Cameras', icon: <Camera />, color: 'from-pink-500 to-rose-500', desc: 'Lenses & Lighting', popular: false },
    { id: 'camping', name: 'Outdoor', icon: <Tent />, color: 'from-teal-500 to-emerald-500', desc: 'Tents & Gear', popular: false },
    { id: 'instruments', name: 'Music', icon: <Music />, color: 'from-red-500 to-orange-500', desc: 'Guitars & Keyboards', popular: false },
    { id: 'realestate', name: 'Spaces', icon: <Home />, color: 'from-indigo-500 to-blue-500', desc: 'Studios & Offices', popular: false },
  ];

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFB] pb-20 pt-10 px-4 overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6 animate-bounce">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-xs font-black text-gray-600 uppercase tracking-widest">Start Earning Today</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-[1000] text-gray-900 leading-tight mb-8 tracking-tighter">
            What's in your <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Garage?</span>
          </h1>

          {/* Luxury Search Bar */}
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
            <div className="relative flex items-center bg-white border border-gray-100 rounded-[2rem] px-6 py-5 shadow-2xl shadow-gray-200/50">
              <Search className="text-gray-400 mr-4" size={24} />
              <input 
                type="text" 
                placeholder="Search categories..."
                className="w-full outline-none text-xl font-medium text-gray-800 placeholder-gray-400"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <kbd className="hidden md:block px-3 py-1 bg-gray-50 border border-gray-200 text-gray-400 rounded-lg text-xs font-bold font-sans">ESC</kbd>
            </div>
          </div>
        </div>

        {/* MAIN CATEGORY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredCategories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/list-item/${cat.id}`)}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`group relative bg-white rounded-[3rem] p-10 border border-transparent hover:border-blue-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-20px_rgba(59,130,246,0.15)] transition-all duration-500 cursor-pointer ${loading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
            >
              {/* Top Row: Icon and Popular Tag */}
              <div className="flex justify-between items-start mb-10">
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {React.cloneElement(cat.icon, { size: 30, strokeWidth: 2.5 })}
                </div>
                {cat.popular && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    <TrendingUp size={12} /> Popular
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  {cat.name}
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              {/* Action Reveal on Hover */}
              <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Select Category</span>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                   <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM PROMO CARD */}
        <div className="mt-24 relative rounded-[4rem] bg-gray-900 p-12 overflow-hidden shadow-3xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-blue-400 border border-white/5">
                <ShieldCheck size={20} />
                <span className="text-sm font-bold">100% Secure Rentals</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white max-w-xl">
                Still unsure where to <span className="text-blue-500">list it?</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-md">Our AI can help categorize your item based on a photo. Just drop it in and we'll handle the rest.</p>
            </div>
            
            <button className="group relative px-12 py-6 bg-blue-600 rounded-3xl overflow-hidden hover:scale-105 transition-all">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-white font-black text-lg flex items-center gap-3">
                    <Sparkles /> Use AI Assistant
                </span>
            </button>
          </div>
          
          {/* Abstract background shapes */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        </div>
      </div>
    </div>
  );
};


export {
  EnhancedCategoryPage2,
  EnhancedCategoryPage,
  ItemCategoryPage
};