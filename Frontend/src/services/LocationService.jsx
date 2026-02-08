// import React, { useState, useEffect } from 'react'
// import {useDispatch,useSelector} from 'react-redux'
// import {  
//   MapPin,
//   Target, 
//   ChevronDown,
//   Loader2,
//   Search,
//   Navigation,
//   X
//  } from 'lucide-react';
// import {setLocation} from '../redux/Feature/Location.js'

// const LocationService = () => {
//   const [showLocationModal, setShowLocationModal] = useState(false)
//   const [loading, setLoading] = useState(false); // GPS Loading
//   const [isSearching, setIsSearching] = useState(false); // Search Loading
//   const [searchQuery, setSearchQuery] = useState(""); // Input value
//   const [suggestions, setSuggestions] = useState([]);

//   const dispatch=useDispatch()
//   const {location}=useSelector((state)=>state.location)

//   // --- LOGIC: AUTOCOMPLETE SEARCH ---
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchQuery.trim().length > 2) {
//         fetchSuggestions(searchQuery);
//       } else {
//         setSuggestions([]);
//       }
//     }, 500); // Debounce: waits 500ms after user stops typing

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchQuery]);

//   const fetchSuggestions = async (query) => {
//     setIsSearching(true);
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5&addressdetails=1`
//       );
//       const data = await response.json();
//       setSuggestions(data);
//     } catch (error) {
//       console.error("Search Error:", error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleSelectLocation = (loc) => {
//     const city = loc.address.city || loc.address.town || loc.address.village || loc.display_name.split(',')[0];
//     const state = loc.address.state ? `, ${loc.address.state}` : "";
//     dispatch(setLocation(`${city},${state}`))
//     setShowLocationModal(false);
//     setSearchQuery("");
//     setSuggestions([]);
//   };

//   // --- LOGIC: GPS DETECTION ---
//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported");
//       return;
//     }
//     setLoading(true);
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       try {
//         const response = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
//         );
//         const data = await response.json();
//         const city = data.address.city || data.address.town || data.address.village || data.address.suburb;
//         dispatch(setLocation(`${city}, ${data.address.state || ""}`))
//         setShowLocationModal(false); 
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }, () => {
//       setLoading(false);
//       alert("Please enable location permissions.");
//     });
//   };

//   return (
//     <>
//       <div className="relative w-60 ">
//         {/* TRIGGER BUTTON */}
//         <div 
//             onClick={() => setShowLocationModal(!showLocationModal)}
//             className={`group flex items-center gap-3 px-4 py-3 bg-white border rounded-2xl cursor-pointer transition-all duration-300 ${
//               showLocationModal 
//               ? 'border-emerald-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' 
//               : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
//             }`}
//         >
//           <div className={`p-1.5 rounded-lg transition-colors ${location ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'}`}>
//             <MapPin size={16} />
//           </div>
          
//           <div className="flex-1 truncate">
//             <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 leading-none mb-1">Location</p>
//             <span className={`text-sm font-bold truncate block ${location? 'text-gray-900' : 'text-gray-400'}`}>
//               {location || "Select Area"}
//             </span>
//           </div>
          
//           <ChevronDown size={16} className={`text-gray-300 transition-transform duration-500 ${showLocationModal ? 'rotate-180 text-emerald-500' : ''}`} />
//         </div>

//         {/* MODERN DROPDOWN MODAL */}
//         {showLocationModal && (
//           <div className="absolute top-full mt-3 left-0 w-[125%] bg-white/95 backdrop-blur-xl border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2rem] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
//             <div className="p-3 space-y-2">
              
//               {/* SEARCH INPUT AREA */}
//               <div className="relative group">
//                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
//                 <input 
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search city..."
//                   className="w-full pl-11 pr-10 py-4 text-sm bg-gray-50 border-none rounded-[1.2rem] focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all font-medium"
//                   autoFocus
//                 />
//                 {isSearching && (
//                     <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-emerald-500" />
//                 )}
//               </div>

//               {/* GPS BUTTON - Hides when typing to give room to suggestions */}
//               {suggestions.length === 0 && (
//                 <button 
//                     onClick={getCurrentLocation} 
//                     disabled={loading}
//                     className="w-full flex items-center justify-between px-4 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-[1.2rem] shadow-lg shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 group"
//                 >
//                     <div className="flex items-center gap-3">
//                     {loading ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
//                     <span className="text-sm font-bold">{loading ? "Locating..." : "Auto Detect"}</span>
//                     </div>
//                     {!loading && <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px] tracking-tighter">GPS</div>}
//                 </button>
//               )}

//               {/* SUGGESTIONS LIST */}
//               <div className="max-h-60 overflow-y-auto space-y-1 custom-scrollbar">
//                 {suggestions.map((loc, index) => (
//                     <button
//                         key={index}
//                         onClick={() => handleSelectLocation(loc)}
//                         className="w-full flex items-start gap-3 px-3 py-3 hover:bg-emerald-50 rounded-xl text-left transition-all group"
//                     >
//                         <MapPin size={16} className="mt-1 text-gray-300 group-hover:text-emerald-500 shrink-0" />
//                         <div className="overflow-hidden">
//                             <p className="text-sm font-bold text-gray-800 truncate">
//                                 {loc.display_name.split(',')[0]}
//                             </p>
//                             <p className="text-[10px] text-gray-400 truncate leading-tight">
//                                 {loc.display_name}
//                             </p>
//                         </div>
//                     </button>
//                 ))}
//               </div>

//               <p className="text-[10px] text-center text-gray-300 font-medium py-1">
//                 {searchQuery.length > 0 ? `Found ${suggestions.length} results` : "Start typing to search..."}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* CLICK OUTSIDE OVERLAY */}
//         {showLocationModal && (
//           <div className="fixed inset-0 z-40 bg-black/5" onClick={() => setShowLocationModal(false)} />
//         )}
//       </div>
//     </>
//   )
// };

// export default LocationService;

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {   
  MapPin,
  ChevronDown,
  Loader2,
  Search,
  Navigation
 } from 'lucide-react';
import { setLocation } from '../redux/Feature/Location.js'

const LocationService = () => {
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch()
  const { location } = useSelector((state) => state.location)

  // --- LOGIC: AUTOCOMPLETE SEARCH ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (loc) => {
    const city = loc.address.city || loc.address.town || loc.address.village || loc.display_name.split(',')[0];
    const state = loc.address.state ? `, ${loc.address.state}` : "";
    dispatch(setLocation(`${city}${state}`))
    setShowLocationModal(false);
    setSearchQuery("");
    setSuggestions([]);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        );
        const data = await response.json();
        const city = data.address.city || data.address.town || data.address.village || data.address.suburb;
        dispatch(setLocation(`${city}, ${data.address.state || ""}`))
        setShowLocationModal(false); 
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }, () => {
      setLoading(false);
      alert("Please enable location permissions.");
    });
  };

  return (
    <>
      <div className="relative">
        {/* TRIGGER BUTTON: Now transparent and integrated */}
        <div 
            onClick={() => setShowLocationModal(!showLocationModal)}
            className="group flex items-center gap-3 px-4 py-1.5 cursor-pointer transition-all duration-300 rounded-full hover:bg-white hover:shadow-sm"
        >
          <div className={`transition-colors ${location ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'}`}>
            <MapPin size={16} />
          </div>
          
          <div className="max-w-[120px] lg:max-w-[160px] truncate">
            <p className="text-[9px] uppercase tracking-[0.15em] font-black text-slate-400 leading-none mb-0.5">Location</p>
            <span className={`text-xs font-bold truncate block ${location ? 'text-slate-900' : 'text-slate-400'}`}>
              {location || "Select Area"}
            </span>
          </div>
          
          <ChevronDown size={14} className={`text-slate-300 transition-transform duration-500 ${showLocationModal ? 'rotate-180 text-emerald-500' : ''}`} />
        </div>

        {/* MODERN DROPDOWN MODAL */}
        {showLocationModal && (
          <div className="absolute top-full mt-4 right-0 w-[320px] bg-white/95 backdrop-blur-xl border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2rem] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-4 space-y-3">
              
              {/* SEARCH INPUT AREA */}
              <div className="relative group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type city or area..."
                  className="w-full pl-11 pr-10 py-3.5 text-sm bg-slate-50 border-none rounded-[1.2rem] focus:bg-white focus:ring-2 focus:ring-emerald-100 transition-all font-semibold text-slate-700"
                  autoFocus
                />
                {isSearching && (
                    <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-emerald-500" />
                )}
              </div>

              {/* GPS BUTTON */}
              {suggestions.length === 0 && (
                <button 
                    onClick={getCurrentLocation} 
                    disabled={loading}
                    className="w-full flex items-center justify-between px-5 py-4 bg-slate-900 text-white rounded-[1.2rem] shadow-lg shadow-slate-200 hover:bg-emerald-600 transition-all disabled:opacity-70 group"
                >
                    <div className="flex items-center gap-3">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} className="group-hover:rotate-12 transition-transform" />}
                    <span className="text-sm font-bold">{loading ? "Finding you..." : "Auto-detect location"}</span>
                    </div>
                </button>
              )}

              {/* SUGGESTIONS LIST */}
              <div className="max-h-60 overflow-y-auto space-y-1 custom-scrollbar">
                {suggestions.map((loc, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelectLocation(loc)}
                        className="w-full flex items-start gap-3 px-3 py-3 hover:bg-emerald-50 rounded-xl text-left transition-all group"
                    >
                        <MapPin size={16} className="mt-1 text-slate-300 group-hover:text-emerald-500 shrink-0" />
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-slate-800 truncate">
                                {loc.display_name.split(',')[0]}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                                {loc.display_name}
                            </p>
                        </div>
                    </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CLICK OUTSIDE OVERLAY */}
        {showLocationModal && (
          <div className="fixed inset-0 z-40" onClick={() => setShowLocationModal(false)} />
        )}
      </div>
    </>
  )
};

export default LocationService;





// import React, { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { MapPin, ChevronDown, Loader2, Search, Navigation } from 'lucide-react';
// import { setLocation } from '../redux/Feature/Location.js'

// const LocationService = () => {
//   const [showLocationModal, setShowLocationModal] = useState(false)
//   const [loading, setLoading] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   const dispatch = useDispatch()
//   const { location } = useSelector((state) => state.location)

//   // Auto-search logic
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchQuery.trim().length > 2) fetchSuggestions(searchQuery);
//       else setSuggestions([]);
//     }, 500);
//     return () => clearTimeout(delayDebounceFn);
//   }, [searchQuery]);

//   const fetchSuggestions = async (query) => {
//     setIsSearching(true);
//     try {
//       const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5&addressdetails=1`);
//       const data = await response.json();
//       setSuggestions(data);
//     } catch (error) { console.error(error); } finally { setIsSearching(false); }
//   };

//   const handleSelectLocation = (loc) => {
//     const city = loc.address.city || loc.address.town || loc.address.village || loc.display_name.split(',')[0];
//     const state = loc.address.state ? `, ${loc.address.state}` : "";
//     dispatch(setLocation(`${city}${state}`));
//     setShowLocationModal(false);
//     setSearchQuery("");
//   };

//   return (
//     <div className="relative w-full h-full">
//       {/* TRIGGER */}
//       <div 
//         onClick={(e) => { e.stopPropagation(); setShowLocationModal(!showLocationModal); }}
//         className={`flex items-center justify-between px-4 py-2 cursor-pointer rounded-xl transition-all duration-300 ${showLocationModal ? 'bg-emerald-50 shadow-inner' : 'hover:bg-white'}`}
//       >
//         <div className="flex items-center gap-3 overflow-hidden">
//           <MapPin size={16} className={`${location ? 'text-emerald-500' : 'text-slate-400'}`} />
//           <div className="truncate">
//             <p className="text-[10px] uppercase font-black text-slate-400 leading-none mb-0.5">Location</p>
//             <span className="text-xs font-bold text-slate-800 truncate block">
//               {location || "All Areas"}
//             </span>
//           </div>
//         </div>
//         <ChevronDown size={14} className={`text-slate-400 transition-transform duration-500 ${showLocationModal ? 'rotate-180' : ''}`} />
//       </div>

//       {/* DROPDOWN MODAL */}
//       {showLocationModal && (
//         <>
//           <div className="absolute top-[calc(100%+12px)] right-0 w-[340px] bg-white border border-slate-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] rounded-3xl p-4 z-[150] animate-in fade-in zoom-in-95 duration-200">
//             <div className="relative mb-4">
//               <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input 
//                 autoFocus
//                 type="text"
//                 placeholder="Search city..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20"
//               />
//               {isSearching && <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-emerald-500" />}
//             </div>

//             <button 
//               onClick={getCurrentLocation}
//               className="w-full flex items-center gap-3 p-4 mb-2 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-all group"
//             >
//               <Navigation size={18} className="group-hover:translate-x-1 transition-transform" />
//               <span className="text-sm font-bold">Use Current Location</span>
//             </button>

//             <div className="max-h-[240px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
//               {suggestions.map((loc, i) => (
//                 <button key={i} onClick={() => handleSelectLocation(loc)} className="w-full p-3 flex gap-3 hover:bg-slate-50 rounded-xl transition-all group text-left">
//                   <MapPin size={16} className="text-slate-300 group-hover:text-emerald-500 mt-1" />
//                   <div>
//                     <p className="text-sm font-bold text-slate-800">{loc.display_name.split(',')[0]}</p>
//                     <p className="text-[10px] text-slate-400 truncate w-[240px]">{loc.display_name}</p>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* BACKDROP TO CLOSE */}
//           <div className="fixed inset-0 z-[140]" onClick={() => setShowLocationModal(false)} />
//         </>
//       )}
//     </div>
//   )
// }

// export default LocationService;




