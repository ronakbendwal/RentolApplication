// import React, { useState, useRef, useEffect } from 'react';
// import { User, Mail, MessageCircle, MapPin, Camera, X, Edit3, ArrowRight, Trash2, Check, Home } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setProfileImage } from '../redux/Feature/ProfilePicture';

// const UserProfile = () => {
//   const {data,status}=useSelector((state)=>state.auth)
//   if(!status) return;
//   const [CurrentData, SetCurrentData] = useState({});
//   const [error, setError] = useState("");
//   const [showPhotoOptions, setShowPhotoOptions] = useState(false);

//   const {profileImage} = useSelector((state)=>state.profilepicture)
//   const fileInputRef = useRef(null);
//   const currentUserData=data?.data;

//   const createdAt=currentUserData?.createdAt
//   const dateObj=new Date(createdAt);
//   const properDate=dateObj?.toLocaleDateString() || "";

//  const {location}=useSelector((state)=>state.location)
//  const dispatch=useDispatch()

//   const changeProfileImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       dispatch(setProfileImage(imageUrl));
//       setShowPhotoOptions(false); // Close menu after selection
//     }
//   };

//   const removeProfileImage = () => {
//     dispatch(setProfileImage(null));
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setShowPhotoOptions(false);
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="min-h-screen bg-[#f0f4f8] text-slate-900 font-sans selection:bg-emerald-100">
//       <input
//         type="file"
//         onChange={changeProfileImage}
//         ref={fileInputRef}
//         accept="image/*"
//         className="hidden"
//       />

//       {/* Glassmorphism Background Decor */}
//       <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-200/30 blur-[120px] rounded-full" />
//       <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-blue-200/20 blur-[100px] rounded-full" />

//       <div className="relative max-w-6xl mx-auto px-6 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
          
//           {/* Left Side: Clean Identity Block */}
//           <div className="lg:w-1/3">
//             <div className="sticky top-12">
//               <div className="relative w-full aspect-square bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] shadow-2xl shadow-emerald-900/5 p-8 flex flex-col items-center justify-center text-center">
                
//                 {/* Profile Picture & Integrated Edit Logo */}
//                 <div className="relative mb-6">
//                   <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-200 overflow-hidden border-4 border-white">
//                     {data?.data.image.url ? (
//                       <img src={data.data.image.url} alt="Profile" className="w-full h-full object-cover" />
//                     ) : (
//                       <User size={60} strokeWidth={1.5} />
//                     )}
//                   </div>

//                   {/* The Integrated Edit Logo (FAB) */}
//                   <button 
//                     onClick={() => setShowPhotoOptions(!showPhotoOptions)}
//                     className={`absolute -bottom-2 -right-2 p-3 rounded-2xl shadow-lg transition-all z-20 border-2 border-white ${
//                         showPhotoOptions ? "bg-red-500 text-white" : "bg-slate-900 text-white hover:bg-emerald-600"
//                     }`}
//                   >
//                     {showPhotoOptions ? <X size={18} /> : <Edit3 size={18} />}
//                   </button>

//                   {/* Floating Mini Menu for Photo Options */}
//                   {showPhotoOptions && (
//                     <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3 animate-in fade-in slide-in-from-left-4 duration-200">
//                       <button 
//                         onClick={triggerFileInput}
//                         className="p-3 bg-slate-900 text-white rounded-xl shadow-xl hover:bg-emerald-600 border border-emerald-100"
//                         title="Change Image"
//                       >
//                         <Camera size={18} />
//                       </button>
//                       {data.data.image && (
//                         <button 
//                           onClick={removeProfileImage}
//                           className="p-3 bg-white text-red-500 rounded-xl shadow-xl hover:bg-red-50 border border-red-100"
//                           title="Remove Image"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <h2 className="text-3xl font-black tracking-tight leading-tight">
//                 {currentUserData?.username || "User"}</h2>
//                 <div className="flex items-center gap-2 mt-2">
//                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//                     <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Active Member</p>
//                 </div>
                
//                 <div className="mt-8 pt-8 border-t border-slate-100 w-full">
//                   <p className="text-xm uppercase font-black mb-1 tracking-tighter">Member Since</p>
//                   <p className="text-[10px] font-black text-slate-700 font-mono">{properDate || "000000"}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side: Strictly Data View */}
//           <div className="lg:w-2/3 space-y-8">
//             <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[3rem] p-8 md:p-14 shadow-xl">
//               <div className="flex items-center justify-between mb-12">
//                 <h3 className="text-2xl font-black flex items-center gap-3">
//                    Core Identity <span className="w-12 h-1 bg-emerald-500 rounded-full" />
//                 </h3>
//                 <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-[10px] uppercase">
//                     <Check size={12} /> Data Verified
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                 <DataField label="Display Name" icon={<User size={18}/>} value={currentUserData?.fullname} />
//                 <DataField label="Email Protocol" icon={<Mail size={18}/>} value={currentUserData?.email} />
                
//                 <div className="space-y-3">
//                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secure WhatsApp</label>
//                   <div className="flex items-center gap-4 transition-all pb-4 border-b-2 border-slate-200/60">
//                     <div className="flex items-center gap-2 text-emerald-500">
//                       <MessageCircle size={20} />
//                       <span className="font-black text-lg">+91</span>
//                     </div>
//                     <span className="text-xl font-bold text-slate-800">{currentUserData?.phonenumber || "---"}</span>
//                   </div>
//                 </div>

//                 <DataField label="Geo Location" icon={<MapPin size={18}/>} value={location || "---"} />
//               </div>
//               <div className='mt-10' >
//                 <DataField label="Address.." icon={<Home size={18}/>} value={currentUserData?.address }/>
//               </div>


//               {/* Success Notification for Image selection
//               {profileImage && !CurrentData.profilePic && (
//                 <div className="mt-12 p-6 bg-emerald-500 rounded-[2rem] flex items-center justify-between text-white shadow-xl shadow-emerald-200">
//                     <p className="font-bold text-sm uppercase tracking-wider">New Profile Image Ready</p>
//                     <button className="px-6 py-2 bg-white text-emerald-600 rounded-xl font-black text-xs uppercase hover:scale-105 transition-all">
//                         Sync with Server
//                     </button>
//                 </div>
//               )} */}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// // Stateless Data Display Component
// const DataField = ({ label, icon, value }) => (
//   <div className="space-y-3">
//     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{label}</label>
//     <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-200/60">
//       <span className="text-slate-400">{icon}</span>
//       <span className="text-xl font-bold text-slate-800">{value || "---"}</span>
//     </div>
//   </div>
// );

// export default UserProfile;



// import React, { useState, useRef } from 'react';
// import { User, Mail, MessageCircle, MapPin, Camera, X, Edit3, Trash2, Check, Home, ShieldCheck } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setProfileImage } from '../redux/Feature/ProfilePicture';

// const UserProfile = () => {
//   const { data, status } = useSelector((state) => state.auth);
//   const [showPhotoOptions, setShowPhotoOptions] = useState(false);
//   const { location } = useSelector((state) => state.location);
//   const dispatch = useDispatch();
//   const fileInputRef = useRef(null);

//   if (!status) return null;

//   const currentUserData = data?.data;
//   const properDate = new Date(currentUserData?.createdAt).toLocaleDateString() || "---";

//   const changeProfileImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       dispatch(setProfileImage(imageUrl));
//       setShowPhotoOptions(false);
//     }
//   };

//   const removeProfileImage = () => {
//     dispatch(setProfileImage(null));
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setShowPhotoOptions(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20">
//       <input type="file" onChange={changeProfileImage} ref={fileInputRef} accept="image/*" className="hidden" />

//       {/* 1. SECTION HEADER (Consistent with Listings) */}
//       <header className="bg-white border-b-4 border-slate-900 p-8 lg:p-12 mb-12">
//         <div className="max-w-6xl mx-auto">
//           <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
//             User <span className="text-indigo-600">Profile</span>
//           </h1>
//           <p className="text-[10px] font-black uppercase tracking-[0.3em] mt-4 text-slate-400">Security & Account Identity</p>
//         </div>
//       </header>

//       <div className="relative max-w-6xl mx-auto px-6">
//         <div className="flex flex-col lg:flex-row gap-12">
          
//           {/* Left Side: ID BADGE CARD */}
//           <div className="lg:w-1/3">
//             <div className="sticky top-28 bg-white border-4 border-slate-900 rounded-[3rem] p-8 shadow-[12px_12px_0px_#000] flex flex-col items-center">
              
//               {/* Profile Picture Slot */}
//               <div className="relative mb-8">
//                 <div className="w-48 h-48 bg-yellow-400 border-4 border-slate-900 rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_#6366f1]">
//                   {currentUserData?.image?.url ? (
//                     <img src={currentUserData.image.url} alt="Profile" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <User size={80} strokeWidth={3} />
//                     </div>
//                   )}
//                 </div>

//                 {/* FAB (Floating Action Button) */}
//                 <button 
//                   onClick={() => setShowPhotoOptions(!showPhotoOptions)}
//                   className={`absolute -bottom-2 -right-2 w-14 h-14 border-4 border-slate-900 rounded-2xl flex items-center justify-center transition-all z-20 shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none ${
//                       showPhotoOptions ? "bg-red-500 text-white" : "bg-emerald-400 text-slate-900"
//                   }`}
//                 >
//                   {showPhotoOptions ? <X size={24} strokeWidth={3} /> : <Edit3 size={24} strokeWidth={3} />}
//                 </button>

//                 {/* Photo Menu */}
//                 {showPhotoOptions && (
//                   <div className="absolute -right-20 top-0 flex flex-col gap-4 animate-in fade-in slide-in-from-left-4">
//                     <button onClick={() => fileInputRef.current.click()} className="w-12 h-12 bg-white border-4 border-slate-900 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_#000] hover:bg-indigo-100 transition-colors">
//                       <Camera size={20} />
//                     </button>
//                     <button onClick={removeProfileImage} className="w-12 h-12 bg-white border-4 border-slate-900 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_#000] hover:bg-red-100 text-red-500 transition-colors">
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <h2 className="text-3xl font-black uppercase tracking-tighter leading-tight text-center">
//                 {currentUserData?.username || "Guest_User"}
//               </h2>
//               <div className="flex items-center gap-2 mt-4 px-4 py-1.5 bg-slate-900 text-white rounded-full">
//                   <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
//                   <p className="text-[9px] font-black uppercase tracking-widest">Active System Status</p>
//               </div>
              
//               <div className="mt-10 pt-8 border-t-4 border-dashed border-slate-100 w-full text-center">
//                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Registration Date</p>
//                 <p className="text-xl font-black text-slate-900 mt-1">{properDate}</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Side: Data Grid */}
//           <div className="lg:w-2/3">
//             <div className="bg-white border-4 border-slate-900 rounded-[3.5rem] p-8 md:p-16 shadow-[16px_16px_0px_#FACC15]">
//               <div className="flex items-center justify-between mb-16">
//                 <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4">
//                   <ShieldCheck size={32} className="text-indigo-600" /> Account Identity
//                 </h3>
//                 <div className="hidden sm:flex items-center gap-2 px-6 py-2 bg-emerald-100 border-2 border-slate-900 rounded-xl font-black text-[10px] uppercase shadow-[4px_4px_0px_#000]">
//                     <Check size={14} strokeWidth={4} /> Verified Account
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
//                 <DataField label="Full Identification" icon={<User size={18}/>} value={currentUserData?.fullname} />
//                 <DataField label="Primary Email" icon={<Mail size={18}/>} value={currentUserData?.email} />
                
//                 <div className="space-y-4">
//                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Communication</label>
//                   <div className="flex items-center gap-4 pb-4 border-b-4 border-slate-900">
//                     <div className="flex items-center gap-2 bg-indigo-50 border-2 border-slate-900 px-3 py-1 rounded-lg">
//                       <MessageCircle size={18} className="text-indigo-600" />
//                       <span className="font-black text-sm">+91</span>
//                     </div>
//                     <span className="text-2xl font-black text-slate-800 tracking-tighter">{currentUserData?.phonenumber || "---"}</span>
//                   </div>
//                 </div>

//                 <DataField label="Regional Tag" icon={<MapPin size={18}/>} value={location || "Global"} />
//               </div>

//               <div className='mt-12'>
//                 <DataField label="Registered Physical Address" icon={<Home size={18}/>} value={currentUserData?.address }/>
//               </div>

//               <div className="mt-20 p-8 bg-indigo-600 border-4 border-slate-900 rounded-[2.5rem] shadow-[8px_8px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-6">
//                 <p className="text-white font-black text-lg uppercase leading-tight text-center md:text-left">
//                   Need to update <br/> your credentials?
//                 </p>
//                 <button className="w-full md:w-auto px-8 py-4 bg-yellow-400 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:translate-y-1 hover:shadow-none transition-all shadow-[6px_6px_0px_#000]">
//                   Edit Profile Data
//                 </button>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// const DataField = ({ label, icon, value }) => (
//   <div className="space-y-4">
//     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</label>
//     <div className="flex items-center gap-4 pb-4 border-b-4 border-slate-900 group">
//       <span className="text-slate-900 bg-slate-100 p-2 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_#000] group-hover:bg-yellow-400 transition-colors">
//         {icon}
//       </span>
//       <span className="text-2xl font-black text-slate-800 tracking-tighter truncate">{value || "---"}</span>
//     </div>
//   </div>
// );

// export default UserProfile;


// import React, { useState, useRef } from 'react';
// import { User, Mail, MessageCircle, MapPin, Camera, X, Edit3, Trash2, Check, Home, ShieldCheck, Zap, Globe, Fingerprint } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setProfileImage } from '../redux/Feature/ProfilePicture';

// const UserProfile = () => {
//   const { data, status } = useSelector((state) => state.auth);
//   const [showPhotoOptions, setShowPhotoOptions] = useState(false);
//   const { location } = useSelector((state) => state.location);
//   const dispatch = useDispatch();
//   const fileInputRef = useRef(null);

//   if (!status) return null;

//   const currentUserData = data?.data;
//   const properDate = new Date(currentUserData?.createdAt).toLocaleDateString() || "---";

//   const changeProfileImage = (event) => {
//   const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       dispatch(setProfileImage(imageUrl));
//       setShowPhotoOptions(false);
//     }
//   };

//   const removeProfileImage = () => {
//     dispatch(setProfileImage(null));
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     setShowPhotoOptions(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#F0F0F0] text-slate-900 pb-20 selection:bg-yellow-400">
//       <input type="file" onChange={(e) => {/* logic */}} ref={fileInputRef} className="hidden" />

//       {/* 1. ULTRA-BOLD HEADER */}
//       <header className="relative bg-white border-b-8 border-slate-900 p-8 lg:p-16 overflow-hidden">
//         {/* Decorative Background Pattern */}
//         <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none rotate-12">
//             <Fingerprint size={400} />
//         </div>
        
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
//           <div>
//             <div className="flex items-center gap-3 mb-4">
//                 <span className="bg-slate-900 text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] rounded-md">You Are On..</span>
//             </div>
//             <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
//                 My <span className="text-indigo-600">Identity</span>
//             </h1>
//           </div>
          
//           <div className="bg-yellow-400 border-4 border-slate-900 p-4 shadow-[8px_8px_0px_#000] -rotate-2 hidden lg:block">
//              <p className="font-black text-sm uppercase">Member Since: {properDate}</p>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
//           {/* LEFT SIDE: THE IDENTITY BADGE */}
//           <div className="lg:col-span-4">
//             <div className="bg-white border-4 border-slate-900 rounded-[3rem] p-8 shadow-[12px_12px_0px_#000] flex flex-col items-center">
              
//               <div className="relative group">
//                 {/* Profile Image with Rotating Border on Hover */}
//                 <div className="w-56 h-56 bg-slate-100 border-4 border-slate-900 rounded-[3.5rem] overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-[8px_8px_0px_#10B981]">
//                   {currentUserData?.image?.url ? (
//                     <img src={currentUserData.image.url} alt="Profile" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-slate-900">
//                       <User size={100} strokeWidth={3} />
//                     </div>
//                   )}
//                 </div>

//                 <button 
//                   onClick={() => setShowPhotoOptions(!showPhotoOptions)}
//                   className="absolute bottom-2 right-2 w-14 h-14 bg-slate-900 text-white border-4 border-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-xl"
//                 >
//                   <Camera size={24} />
//                 </button>
//               </div>
//               {/* Photo Menu */}
//               {showPhotoOptions && (
//                   <div className="absolute -right-20 top-0 flex flex-col gap-4 animate-in fade-in slide-in-from-left-4">
//                     <button onClick={() => fileInputRef.current.click()} className="w-12 h-12 bg-white border-4 border-slate-900 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_#000] hover:bg-indigo-100 transition-colors">
//                       <Camera size={20} />
//                     </button>
//                     <button onClick={removeProfileImage} className="w-12 h-12 bg-white border-4 border-slate-900 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_#000] hover:bg-red-100 text-red-500 transition-colors">
//                       <Trash2 size={20} />
//                     </button>
//                   </div>
//                 )}

//               <div className="mt-10 text-center w-full">
//                 <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-2">
//                     {currentUserData?.username}
//                 </h2>
//                 <p className="text-slate-400 font-black text-xs uppercase tracking-widest border-2 border-slate-200 rounded-full py-1 inline-block px-6">
//                     Verified Individual
//                 </p>
//               </div>

//               {/* Mini Stats Grid */}
//               <div className="grid grid-cols-2 gap-4 w-full mt-10">
//                 <div className="bg-emerald-100 border-2 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_#000]">
//                     <Zap size={20} className="mb-2" />
//                     <p className="font-black text-xl">Active</p>
//                     <p className="text-[9px] font-black uppercase opacity-60">Status</p>
//                 </div>
//                 <div className="bg-indigo-100 border-2 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_#000]">
//                     <Globe size={20} className="mb-2" />
//                     <p className="font-black text-xl">IND</p>
//                     <p className="text-[9px] font-black uppercase opacity-60">Region</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE: THE SECURE DATA VAULT */}
//           <div className="lg:col-span-8 space-y-8">
//             <div className="bg-white border-4 border-slate-900 rounded-[4rem] p-8 md:p-16 shadow-[16px_16px_0px_#6366f1] relative overflow-hidden">
                
//                 {/* Decorative Badge Overlay */}
//                 <div className="absolute top-8 right-8 rotate-12 hidden sm:block">
//                     <div className="bg-rose-500 text-white border-4 border-slate-900 px-6 py-2 rounded-xl font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
//                         Secure Data
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
//                     <DataCard label="Full Legal Name" icon={<User />} value={currentUserData?.fullname} color="bg-yellow-100" />
//                     <DataCard label="Network Address" icon={<Mail />} value={currentUserData?.email} color="bg-blue-100" />
//                     <DataCard label="Contact Direct" icon={<MessageCircle />} value={currentUserData?.phonenumber} color="bg-emerald-100" />
//                     <DataCard label="Geo-Coordinate" icon={<MapPin />} value={location} color="bg-rose-100" />
//                 </div>

//                 <div className="mt-16">
//                     <div className="p-8 border-4 border-slate-900 rounded-[2.5rem] bg-slate-50 shadow-[8px_8px_0px_#000] relative overflow-hidden group hover:bg-white transition-colors">
//                         <Home className="absolute -bottom-4 -right-4 size-32 opacity-[0.05] group-hover:scale-110 transition-transform" />
//                         <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block">Physical Registry Address</label>
//                         <p className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
//                             {currentUserData?.address || "Address Not Provided"}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="mt-16 flex flex-wrap gap-4">
//                     <button className="flex-1 bg-slate-900 text-white border-4 border-slate-900 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[8px_8px_0px_#10B981] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3">
//                         <Edit3 size={18} /> Edit Core Identity
//                     </button>
//                     <button className="px-8 py-5 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-50 hover:text-red-600 transition-colors">
//                         Logout
//                     </button>
//                 </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// const DataCard = ({ label, icon, value, color }) => (
//   <div className="group">
//     <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 block ml-2">
//         {label}
//     </label>
//     <div className={`flex items-center gap-4 p-5 border-4 border-slate-900 rounded-3xl ${color} shadow-[6px_6px_0px_#000] group-hover:-translate-y-1 transition-transform`}>
//       <div className="p-3 bg-white border-2 border-slate-900 rounded-xl shadow-[3px_3px_0px_#000]">
//         {React.cloneElement(icon, { size: 20, strokeWidth: 3 })}
//       </div>
//       <span className="text-xl font-black tracking-tighter truncate uppercase">{value || "---"}</span>
//     </div>
//   </div>
// );

// export default UserProfile;


import React, { useState, useRef } from 'react';
import { User, Mail, MessageCircle, MapPin, Camera, X, Edit3, Trash2, Home, Zap, Globe, Fingerprint } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData,logout } from '../redux/Feature/Auth';
import axios from 'axios';
const UserProfile = () => {
  const { data, status } = useSelector((state) => state.auth);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [userimage,setUserImage]=useState(null)
  const { location } = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  if (!status) return null;

  const currentUserData = data?.data;
  const properDate = new Date(currentUserData?.createdAt).toLocaleDateString() || "---";

  const changeProfileImage = async(event) => {
    const file = event.target.files[0];
    if(!file) return ;
    const imageUrl = URL.createObjectURL(file);
    setUserImage(imageUrl)

    const formData = new FormData();
    formData.append("image", file);

    const response=await axios.patch(
      '/api/user/change-image',
      formData,
      {
       headers:{
      "Content-Type": "multipart/form-data",
      },
    })
    dispatch(setUserData(response.data));
    setShowPhotoOptions(false);
  };

  const removeProfileImage = async() => {
    
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUserImage(null)
    const response=await axios.delete('/api/user/deleteimage')
    dispatch(setUserData(response.data))
    setShowPhotoOptions(false);
  };

  const deleteUser=async()=>{
    try{
      const response=await axios.delete('/api/user/delete-user');
      dispatch(logout())
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-slate-900 pb-20 selection:bg-yellow-400">
      <input type="file" onChange={changeProfileImage} ref={fileInputRef} className="hidden" accept="image/*" />

      {/* 1. HEADER */}
      <header className="relative bg-white border-b-8 border-slate-900 p-8 lg:p-16 overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none rotate-12">
            <Fingerprint size={400} />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
                <span className="bg-slate-900 text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] rounded-md">System_User_Identity</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                My <span className="text-indigo-600">Profile</span>
            </h1>
          </div>
          <div className="bg-yellow-400 border-4 border-slate-900 p-4 shadow-[8px_8px_0px_#000] -rotate-2 hidden lg:block">
             <p className="font-black text-sm uppercase">Member Since: {properDate}</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: IDENTITY BADGE */}
          <div className="lg:col-span-4">
            <div className="bg-white border-4 border-slate-900 rounded-[3rem] p-8 shadow-[12px_12px_0px_#000] flex flex-col items-center relative">
              
              <div className="relative group mb-6">
                {/* Profile Image Wrapper */}
                <div className="w-56 h-56 bg-slate-100 border-4 border-slate-900 rounded-[3.5rem] overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-[8px_8px_0px_#10B981]">
                  {userimage || currentUserData?.image?.url? (
                    <img src={userimage || currentUserData?.image?.url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-slate-900">
                      <User size={100} strokeWidth={3} />
                    </div>
                  )}
                </div>

                {/* FAB Camera Button */}
                <button 
                  onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                  className={`absolute -bottom-2 -right-2 w-14 h-14 border-4 border-slate-900 rounded-2xl flex items-center justify-center transition-all z-30 shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none ${
                    showPhotoOptions ? "bg-red-500 text-white" : "bg-emerald-400 text-slate-900"
                  }`}
                >
                  {showPhotoOptions ? <X size={24} strokeWidth={3} /> : <Camera size={24} strokeWidth={3} />}
                </button>

                {/* PHOTO MENU (NOW FIXED & ALIGNED) */}
                {showPhotoOptions && (
                  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 animate-in fade-in slide-in-from-left-4">
                    <button 
                      onClick={() => fileInputRef.current.click()} 
                      className="w-14 h-14 bg-white border-4 border-slate-900 rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_#000] hover:bg-yellow-400 transition-all hover:-translate-y-1"
                      title="Upload Photo"
                    >
                      <Camera size={24} strokeWidth={3} />
                    </button>
                    {currentUserData?.image ?                     
                    (<button 
                      onClick={removeProfileImage} 
                      className="w-14 h-14 bg-white border-4 border-slate-900 rounded-2xl flex items-center justify-center shadow-[6px_6px_0px_#000] hover:bg-rose-500 hover:text-white transition-all hover:-translate-y-1 text-rose-500"
                      title="Remove Photo"
                    >
                      <Trash2 size={24} strokeWidth={3} />
                    </button>) : null}
                  </div>
                )}
              </div>

              <div className="text-center w-full mt-4">
                <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-2">
                    {currentUserData?.username}
                </h2>
                <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                    Verified Individual
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 w-full mt-10">
                <div className="bg-emerald-100 border-2 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_#000]">
                    <Zap size={20} className="mb-2" />
                    <p className="font-black text-xl">Active</p>
                    <p className="text-[9px] font-black uppercase opacity-60">Status</p>
                </div>
                <div className="bg-indigo-100 border-2 border-slate-900 p-4 rounded-2xl shadow-[4px_4px_0px_#000]">
                    <Globe size={20} className="mb-2" />
                    <p className="font-black text-xl">IND</p>
                    <p className="text-[9px] font-black uppercase opacity-60">Region</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: DATA VAULT */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border-4 border-slate-900 rounded-[4rem] p-8 md:p-16 shadow-[16px_16px_0px_#6366f1] relative overflow-hidden">
                <div className="absolute top-8 right-8 rotate-12 hidden sm:block">
                    <div className="bg-rose-500 text-white border-4 border-slate-900 px-6 py-2 rounded-xl font-black text-xs uppercase shadow-[4px_4px_0px_#000]">
                        Secure_Entry
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <DataCard label="Identification" icon={<User />} value={currentUserData?.fullname} color="bg-yellow-100" />
                    <DataCard label="Email Protocol" icon={<Mail />} value={currentUserData?.email} color="bg-blue-100" />
                    <DataCard label="Contact Direct" icon={<MessageCircle />} value={currentUserData?.phonenumber} color="bg-emerald-100" />
                    <DataCard label="Geo-Coordinate" icon={<MapPin />} value={location} color="bg-rose-100" />
                </div>

                <div className="mt-16">
                    <div className="p-8 border-4 border-slate-900 rounded-[2.5rem] bg-slate-50 shadow-[8px_8px_0px_#000] relative overflow-hidden group hover:bg-white transition-colors">
                        <Home className="absolute -bottom-4 -right-4 size-32 opacity-[0.05] group-hover:scale-110 transition-transform" />
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 block">Primary Registry Address</label>
                        <p className="text-2xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                            {currentUserData?.address || "No Address Registered"}
                        </p>
                    </div>
                </div>

                <div className="mt-16 flex flex-wrap gap-4">
                    <button className="flex-1 bg-slate-900 text-white border-4 border-slate-900 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[8px_8px_0px_#10B981] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3">
                        <Edit3 size={18} /> Edit Profile
                    </button>
                    <button
                    onClick={()=>deleteUser()}
                     className="px-8 py-5 border-4 border-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-100 hover:text-rose-600 transition-colors">
                        Delete A/c
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataCard = ({ label, icon, value, color }) => (
  <div className="group">
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 block ml-2">
        {label}
    </label>
    <div className={`flex items-center gap-4 p-5 border-4 border-slate-900 rounded-3xl ${color} shadow-[6px_6px_0px_#000] group-hover:-translate-y-1 transition-transform`}>
      <div className="p-3 bg-white border-2 border-slate-900 rounded-xl shadow-[3px_3px_0px_#000]">
        {React.cloneElement(icon, { size: 20, strokeWidth: 3 })}
      </div>
      <span className="text-xl font-black tracking-tighter truncate uppercase">{value || "---"}</span>
    </div>
  </div>
);

export default UserProfile;





