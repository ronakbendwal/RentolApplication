// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {useDispatch,useSelector} from 'react-redux'
// import { 
//   Car, Hammer, Bike, Camera, Smartphone, 
//   Home, Tent, Music, Search, Zap, ArrowRight,
//   Sparkles, ShieldCheck, ChevronRight, TrendingUp,Image as ImageIcon,
//   PersonStanding
// } from 'lucide-react';
// import {setSelectedCategory} from '../redux/Feature/FormOpenName.js'
// import {
//   VehicleForm,
//   PowerToolForm,
//   BikeForm,
//   SpaceForm,
//   CameraForm,
//   MusicForm,
//   OutdoorForm,
//   HelperForm,
//   TechForm
// } from '../Form/index.js';

// const  ItemCategoryPage3 = () => {
//   const { selectedCategory } = useSelector((state) => state.formopendata);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const categories = [
//     { id: 'cars', name: 'Vehicles', icon: <Car />, color: 'from-blue-500 to-cyan-500', desc: 'Cars, Trucks & Vans', popular: true },
//     { id: 'tools', name: 'Power Tools', icon: <Hammer />, color: 'from-orange-500 to-yellow-500', desc: 'Drills, Saws & More', popular: false },
//     { id: 'bikes', name: 'Bikes', icon: <Bike />, color: 'from-green-500 to-emerald-500', desc: 'Electric & Mountain', popular: true },
//     { id: 'helper', name: 'Helper', icon: <PersonStanding />, color: 'from-fuchsia-500 to-amber-400', desc: 'Helper & Labour', popular: true },
//     { id: 'electronics', name: 'Tech', icon: <Smartphone />, color: 'from-purple-500 to-indigo-500', desc: 'Consoles & Gadgets', popular: true },
//     { id: 'photography', name: 'Cameras', icon: <Camera />, color: 'from-pink-500 to-rose-500', desc: 'Lenses & Lighting', popular: false },
//     { id: 'outdoor', name: 'Outdoor', icon: <Tent />, color: 'from-teal-500 to-emerald-500', desc: 'Tents & Gear', popular: false },
//     { id: 'music-instruments', name: 'Music', icon: <Music />, color: 'from-red-500 to-orange-500', desc: 'Guitars & Keyboards', popular: false },
//     { id: 'realestate', name: 'Spaces', icon: <Home />, color: 'from-indigo-500 to-blue-500', desc: 'Studios & Offices', popular: false },
//     { id: 'personal', name: 'Personal Item', icon: <Home />, color: 'from-indigo-500 to-blue-500', desc: 'Studios & Offices', popular: false },
//   ];

//   const filteredCategories = categories.filter(cat => 
//     cat.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-[#FAFAFB] overflow-x-hidden">
//       {/* Decorative Background Glows (Only visible when no category is selected) */}
//       {!selectedCategory && (
//         <>
//           <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] -z-10" />
//           <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-[120px] -z-10" />
//         </>
//       )}

//       <div className={`flex flex-col lg:flex-row min-h-screen transition-all duration-700 ease-in-out ${selectedCategory ? 'gap-0' : 'max-w-4xl mx-auto pt-10 px-4'}`}>
        
//         {/* LEFT SIDE: CATEGORY LIST */}
//         <div className={`transition-all duration-700 p-6 ${selectedCategory ? 'lg:w-[450px] bg-white border-r border-gray-100 overflow-y-auto shrink-0' : 'w-full'}`}>
          
//           <div className={`${selectedCategory ? 'mb-8' : 'text-center mb-16'}`}>
//             {!selectedCategory && (
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-6 animate-bounce">
//                 <Sparkles size={16} className="text-blue-600" />
//                 <span className="text-xs font-black text-gray-600 uppercase tracking-widest">Start Earning Today</span>
//               </div>
//             )}
            
//             <h1 className={`${selectedCategory ? 'text-3xl' : 'text-5xl md:text-6xl'} font-[1000] text-gray-900 leading-tight tracking-tighter transition-all duration-500`}>
//               {selectedCategory ? 'Select Category' : "What's in your Garage?"}
//             </h1>

//             {/* Luxury Search Bar */}
//             <div className={`relative group mx-auto transition-all duration-500 ${selectedCategory ? 'mt-6' : 'max-w-2xl mt-8'}`}>
//               <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
//               <div className={`relative flex items-center bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 ${selectedCategory ? 'rounded-2xl px-4 py-3' : 'rounded-[2rem] px-6 py-5'}`}>
//                 <Search className="text-gray-400 mr-4" size={selectedCategory ? 20 : 24} />
//                 <input 
//                   type="text" 
//                   placeholder="Search categories..."
//                   className={`w-full outline-none font-medium text-gray-800 placeholder-gray-400 ${selectedCategory ? 'text-lg' : 'text-xl'}`}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* MAIN CATEGORY LIST */}
//           <div className="grid grid-cols-1 gap-5">
//             {filteredCategories.map((cat, idx) => (
//               <div
//                 key={cat.id}
//                 onClick={() => dispatch(setSelectedCategory(cat.id))}
//                 style={{ transitionDelay: `${idx * 40}ms` }}
//                 className={`group relative rounded-[2.2rem] transition-all duration-500 cursor-pointer flex items-center gap-5 border-2 
//                   ${selectedCategory === cat.id 
//                     ? 'bg-blue-50/50 border-blue-600 shadow-xl p-6' 
//                     : `bg-white border-transparent shadow-sm hover:border-blue-100 ${selectedCategory ? 'p-4' : 'p-6 md:p-8'}`
//                   } ${loading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
//               >
//                 {/* Icon */}
//                 <div className={`shrink-0 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${selectedCategory ? 'w-12 h-12' : 'w-16 h-16 md:w-20 md:h-20'}`}>
//                   {React.cloneElement(cat.icon, { size: selectedCategory ? 22 : 30, strokeWidth: 2.5 })}
//                 </div>

//                 {/* Content */}
//                 <div className="flex-grow space-y-0.5">
//                   <div className="flex items-center gap-2">
//                     <h3 className={`${selectedCategory ? 'text-lg' : 'text-2xl'} font-black text-gray-900 transition-all`}>{cat.name}</h3>
//                     {!selectedCategory && cat.popular && (
//                       <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
//                         <TrendingUp size={12} /> Popular
//                       </span>
//                     )}
//                   </div>
//                   <p className={`text-gray-500 font-medium leading-relaxed ${selectedCategory ? 'text-xs' : 'text-sm'}`}>
//                     {cat.desc}
//                   </p>
//                 </div>

//                 {/* Arrow */}
//                 <div className={`rounded-full flex items-center justify-center transition-all duration-300 ${selectedCategory === cat.id ? 'bg-blue-600 text-white w-10 h-10' : 'bg-gray-50 text-gray-300 w-12 h-12'}`}>
//                   {selectedCategory === cat.id ? <ChevronRight size={20} /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Bottom Promo (Only visible if nothing selected) */}
//           {!selectedCategory && (
//             <div className="mt-24 relative rounded-[4rem] bg-gray-900 p-12 overflow-hidden shadow-3xl text-center md:text-left">
//               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
//                 <div className="space-y-4">
//                   <h2 className="text-4xl font-black text-white">Still unsure?</h2>
//                   <p className="text-gray-400 text-lg">Our AI can help categorize your item instantly.</p>
//                 </div>
//                 <button className="px-10 py-5 bg-blue-600 text-white font-black rounded-3xl flex items-center gap-3 hover:scale-105 transition-all">
//                   <Sparkles size={20}/> Use AI Assistant
//                 </button>
//               </div>
//               <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" />
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDE: FORMS (Scrollable area) */}
//         {selectedCategory && (
//           <div className="flex-grow overflow-y-auto bg-white">
//             {selectedCategory==='cars' && <VehicleForm />}
//             {selectedCategory==='tools' && <PowerToolForm />}
//             {selectedCategory==='bikes' && <BikeForm />}
//             {selectedCategory==='realestate' &&<SpaceForm />}
//             {selectedCategory==='photography' &&<CameraForm />}
//             {selectedCategory==='music-instruments' &&<MusicForm />}
//             {selectedCategory==='outdoor' && <OutdoorForm />}
//             {selectedCategory==='helper' && <HelperForm />}
//             {selectedCategory==='electronics' && <TechForm />}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ItemCategoryPage3






//updated 3rd
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Car, Hammer, Bike, Camera, Smartphone, 
  Home, Tent, Music, Search, Zap, ArrowRight,
  Sparkles, ChevronRight, TrendingUp, PersonStanding, X
} from 'lucide-react';
import { setSelectedCategory } from '../redux/Feature/FormOpenName.js';
import {
  VehicleForm, PowerToolForm, BikeForm, SpaceForm, 
  CameraForm, MusicForm, OutdoorForm, HelperForm, TechForm
} from '../Form/index.js';

const ItemCategoryPage3 = () => {
  const { selectedCategory } = useSelector((state) => state.formopendata);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!selectedCategory) return; // form open nahi hai to listener mat lagao
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        dispatch(setSelectedCategory(null));
      }
    };
    window.addEventListener("keydown", handleEsc);
    // cleanup (VERY IMPORTANT 🔥)
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedCategory, dispatch]);

  const categories = [
    { id: 'cars', name: 'Vehicles', icon: <Car />, color: 'from-blue-500 to-cyan-400', desc: 'Cars, Trucks & Vans', popular: true },
    { id: 'tools', name: 'Power Tools', icon: <Hammer />, color: 'from-orange-500 to-amber-400', desc: 'Drills, Saws & More', popular: false },
    { id: 'bikes', name: 'Bikes', icon: <Bike />, color: 'from-emerald-500 to-teal-400', desc: 'Electric & Mountain', popular: true },
    { id: 'helper', name: 'Helper', icon: <PersonStanding />, color: 'from-rose-500 to-pink-400', desc: 'Helper & Labour', popular: true },
    { id: 'electronics', name: 'Tech', icon: <Smartphone />, color: 'from-indigo-600 to-violet-500', desc: 'Consoles & Gadgets', popular: true },
    { id: 'photography', name: 'Cameras', icon: <Camera />, color: 'from-slate-700 to-slate-500', desc: 'Lenses & Lighting', popular: false },
    { id: 'outdoor', name: 'Outdoor', icon: <Tent />, color: 'from-lime-500 to-emerald-400', desc: 'Tents & Gear', popular: false },
    { id: 'music-instruments', name: 'Music', icon: <Music />, color: 'from-red-600 to-orange-500', desc: 'Guitars & Keyboards', popular: false },
    { id: 'realestate', name: 'Spaces', icon: <Home />, color: 'from-blue-600 to-indigo-400', desc: 'Studios & Offices', popular: false },
  ];

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden">
      
      <div className={`flex flex-col lg:flex-row min-h-screen transition-all duration-700 ${selectedCategory ? 'gap-0' : 'max-w-4xl mx-auto pt-16 px-6'}`}>
        
        {/* LEFT SIDE: CATEGORY LIST */}
        <div className={`transition-all duration-700 ${selectedCategory ? 'lg:w-[480px] bg-white border-r-4 border-slate-900 overflow-y-auto p-8 shadow-2xl' : 'w-full'}`}>
          
          <div className={`${selectedCategory ? 'mb-10' : 'text-center mb-16'}`}>
            {!selectedCategory && (
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-400 border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] mb-8">
                <Sparkles size={16} strokeWidth={3} className="text-white" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">Start Earning Today</span>
              </div>
            )}
            
            <h1 className={`${selectedCategory ? 'text-3xl' : 'text-6xl md:text-7xl'} font-[1000] text-slate-900 tracking-tighter uppercase italic leading-[0.85] transition-all`}>
              {selectedCategory ? 'Category' : "List Your Item"}
            </h1>

            {/* SEARCH BOX: Full Rounded */}
            <div className={`relative group mx-auto transition-all duration-500 ${selectedCategory ? 'mt-8' : 'max-w-2xl mt-12'}`}>
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 z-10">
                <Search size={selectedCategory ? 20 : 26} strokeWidth={3} />
              </div>
              <input 
                type="text" 
                placeholder="SEARCH_UNITS..."
                className={`w-full bg-white border-[3px] border-slate-900 rounded-full shadow-[6px_6px_0px_#000] outline-none font-bold text-slate-900 placeholder-slate-300 uppercase tracking-widest transition-all focus:shadow-none focus:translate-x-1 focus:translate-y-1 ${selectedCategory ? 'pl-16 pr-8 py-4 text-sm' : 'pl-20 pr-10 py-5 text-lg'}`}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* CATEGORY LIST: Single Column Layout Forced */}
          <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
            {filteredCategories.map((cat, idx) => (
              <div
                key={cat.id}
                onClick={() => dispatch(setSelectedCategory(cat.id))}
                className={`group relative rounded-[2.5rem] transition-all duration-500 cursor-pointer flex items-center gap-6 border-[3px] border-slate-900 
                  ${selectedCategory === cat.id 
                    ? 'bg-indigo-600 text-white shadow-none translate-x-1 translate-y-1' 
                    : `bg-white text-slate-900 shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${selectedCategory ? 'p-5' : 'p-8'}`
                  } ${loading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}
              >
                {/* Icon Container */}
                <div className={`shrink-0 rounded-[1.8rem] bg-gradient-to-br ${cat.color} flex items-center justify-center text-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] group-hover:rotate-6 transition-all duration-500 ${selectedCategory ? 'w-16 h-16' : 'w-24 h-24'}`}>
                  {React.cloneElement(cat.icon, { size: selectedCategory ? 28 : 40, strokeWidth: 2.5 })}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3">
                    <h3 className={`${selectedCategory ? 'text-xl' : 'text-3xl'} font-black uppercase tracking-tighter leading-none transition-all`}>{cat.name}</h3>
                    {!selectedCategory && cat.popular && (
                      <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">Hot</span>
                    )}
                  </div>
                  <p className={`font-bold uppercase tracking-widest mt-2 opacity-60 leading-tight ${selectedCategory ? 'text-[10px]' : 'text-xs'}`}>
                    {cat.desc}
                  </p>
                </div>

                <div className={`rounded-2xl border-2 border-slate-900 flex items-center justify-center transition-all ${selectedCategory === cat.id ? 'bg-white text-indigo-600 w-10 h-10' : 'bg-slate-50 text-slate-300 w-14 h-14'}`}>
                  <ChevronRight size={24} strokeWidth={4} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: FORMS */}
        {selectedCategory && (
          <div className="flex-grow overflow-y-auto bg-white p-10 lg:p-20">
            <div className="max-w-4xl mx-auto">
              {/* Form Header */}
              <div className="mb-12 flex items-center justify-between border-b-[6px] border-slate-900 pb-8">
                <div>
                  <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Listing Unit.</h2>
                  <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] mt-2 italic">Status: Secure Form</p>
                </div>
                <button 
                  onClick={() => dispatch(setSelectedCategory(null))}
                
                  className="w-14 h-14 border-[3px] border-slate-900 bg-rose-400 rounded-2xl shadow-[5px_5px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center"
                >
                  <X size={28} strokeWidth={4} />
                </button>
              </div>

              {/* Forms Rendering */}
              <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                {selectedCategory==='cars' && <VehicleForm />}
                {selectedCategory==='tools' && <PowerToolForm />}
                {selectedCategory==='bikes' && <BikeForm />}
                {selectedCategory==='realestate' &&<SpaceForm />}
                {selectedCategory==='photography' &&<CameraForm />}
                {selectedCategory==='music-instruments' &&<MusicForm />}
                {selectedCategory==='outdoor' && <OutdoorForm />}
                {selectedCategory==='helper' && <HelperForm />}
                {selectedCategory==='electronics' && <TechForm />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCategoryPage3;
