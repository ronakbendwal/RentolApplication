// import React, { useState, useRef, useEffect } from 'react';
// import { User, Mail, MessageCircle, MapPin, Camera, Save, X, Edit3, Settings2, ShieldCheck, ArrowRight, Trash2 } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// const UserProfile = () => {


//   const [CurrentData,SetCurrentData]=useState({});
//   const [error,setError]=useState("");
//   useEffect(()=>{
//     const fetchUser=async ()=>{
//     setError("");
//     try{
//       const response=await axios.get("/api/user/current-user")
//       console.log(response)
//       const data=response.data;
//       console.log(data)
//       SetCurrentData(data);
//     }catch(error){
//       setError("UserProfile :: APICalling :: Error ::",error.message);
//     }}
//     fetchUser();
//   },[])
//   const {
//     register,
//     handleSubmit,
//     formState:{
//       isSubmitting,
//       errors,
//     }
//   }=useForm()


//   const [isEditing, setIsEditing] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const fileInputRef = useRef(null);
 

//   const changeProfileImage = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl);
//     }
//   };

//   const removeProfileImage = (e) => {
//     e.stopPropagation(); // Prevents triggering the file input if layered
//     setProfileImage(null);
//     if (fileInputRef.current) fileInputRef.current.value = ""; 
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   const submit=()=>{
//     console.log('ho gaya bhai')
//   }
  

//   return (
//     <div className="min-h-screen bg-[#f0f4f8] text-slate-900 font-sans selection:bg-emerald-100">
//       {/* Fixed: changed onClick to onChange */}
//       <input
//         type='file'
//         onChange={changeProfileImage}
//         ref={fileInputRef}
//         accept="image/*"
//         className="hidden"
//       />

//       <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-200/30 blur-[120px] rounded-full" />
//       <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-blue-200/20 blur-[100px] rounded-full" />

//       <div className="relative max-w-6xl mx-auto px-6 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
          
//           <div className="lg:w-1/3">
//             <div className="sticky top-12 space-y-6">
//               <div className="group relative w-full aspect-square bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] shadow-2xl shadow-emerald-900/5 p-8 flex flex-col items-center justify-center text-center">
                
//                 <div className="relative mb-6">
//                   <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-200 overflow-hidden">
//                     {profileImage ? (
//                       <img
//                         src={profileImage}
//                         alt="Profile"
//                         className="w-32 h-32 object-cover"
//                       />
//                     ) : (
//                       <User size={60} strokeWidth={1.5} />
//                     )}
//                   </div>

//                   {/* Edit Controls Overlay */}
//                   {isEditing && (
//                     <div className="absolute -bottom-2 -right-2 flex flex-col gap-2">
//                       {/* Upload Button */}
//                       <button 
//                         onClick={triggerFileInput} 
//                         className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg hover:scale-110 transition-all"
//                         title="Upload New Photo"
//                       >
//                         <Camera size={20} />
//                       </button>
                      
//                       {/* Remove Button - Only shows if there is an image */}
//                       {profileImage && (
//                         <button 
//                           onClick={removeProfileImage} 
//                           className="p-3 bg-red-500 text-white rounded-2xl shadow-lg hover:scale-110 transition-all border-2 border-white"
//                           title="Remove Photo"
//                         >
//                           <Trash2 size={20} />
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 <h2 className="text-3xl font-black tracking-tight leading-tight">{CurrentData.username}</h2>
//                 <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Verified Professional</p>
                
//                 <div className="mt-8 pt-8 border-t border-slate-100 w-full flex justify-around">
//                   <div className="text-center">
//                     <p className="text-xl font-black">2026</p>
//                     <p className="text-[10px] uppercase font-bold text-slate-400">Joined</p>
//                   </div>
//                 </div>
//               </div>

//               <button 
//                 onClick={() => setIsEditing(!isEditing)}
//                 className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl border ${
//                   isEditing 
//                   ? "bg-white border-red-100 text-red-500 hover:bg-red-50" 
//                   : "bg-slate-900 border-slate-900 text-white hover:shadow-emerald-200/50"
//                 }`}
//               >
//                 {isEditing ? <><X size={18} /> Discard Changes</> : <><Settings2 size={18} /> Account Settings</>}
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Keeping your Information Mesh as is */}

//           <form className="lg:w-2/3 space-y-8" onSubmit={handleSubmit(submit)}>

//             <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[3rem] p-8 md:p-14 shadow-xl">
//               <div className="flex items-center justify-between mb-12">
//                 <h3 className="text-2xl font-black flex items-center gap-3">
//                    Core Identity <span className="w-12 h-1 bg-emerald-500 rounded-full" />
//                 </h3>
//               </div>
              
//               <div className="space-y-12">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
//                   <ProfileField label="Display Name"  icon={<User size={18}/>} value={CurrentData.username} isEditing={isEditing} />
//                   <ProfileField label="Email Protocol" icon={<Mail size={18}/>} value={CurrentData.email} isEditing={isEditing} />
                  
//                   <div className="space-y-3">
//                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secure WhatsApp</label>
//                     <div className={`flex items-center gap-4 transition-all pb-4 border-b-2 ${isEditing ? 'border-emerald-500' : 'border-slate-200'}`}>
//                       <div className="flex items-center gap-2 text-emerald-500">
//                         <MessageCircle size={20} />
//                         <span className="font-black text-lg">+91</span>
//                       </div>
//                       <input 
//                         disabled={!isEditing}
//                         defaultValue="9876543210"
//                         className="bg-transparent text-xl font-bold outline-none w-full disabled:text-slate-800"
//                       />
//                     </div>
//                   </div>

//                   <ProfileField label="Geo Location" icon={<MapPin size={18}/>} value="Ujjain, India" isEditing={isEditing} />
//                 </div>
//               </div>

//               {isEditing && (
//                 <div className="mt-16 flex justify-end">
//                   <button 
//                   type='submit'
//                   className="group bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all flex items-center gap-3 shadow-2xl shadow-emerald-200"
//                   >
//                     Confirm Updates <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProfileField = ({ label,registername, icon, value, isEditing }) =>(
//   <div className="space-y-3">
//     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{label}</label>
//     <div className={`flex items-center gap-4 transition-all pb-4 border-b-2 ${isEditing ? 'border-emerald-500' : 'border-slate-200'}`}>
//       <span className="text-slate-400">{icon}</span>
//       <input 
//         disabled={!isEditing}
//         defaultValue={value}
//         className="bg-transparent text-xl font-bold outline-none w-full disabled:text-slate-800"
//       />
//     </div>
//   </div>
// )

// export default UserProfile;



import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, MessageCircle, MapPin, Camera, X, Edit3, ArrowRight, Trash2, Check, Home } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../redux/Feature/ProfilePicture';

const UserProfile = () => {
  const {data,status}=useSelector((state)=>state.auth)
  if(!status) return;
  const [CurrentData, SetCurrentData] = useState({});
  const [error, setError] = useState("");
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const {profileImage} = useSelector((state)=>state.profilepicture)
  const fileInputRef = useRef(null);
  const currentUserData=data?.data;

  const createdAt=currentUserData?.createdAt
  const dateObj=new Date(createdAt);
  const properDate=dateObj?.toLocaleDateString() || "";

 const {location}=useSelector((state)=>state.location)
 const dispatch=useDispatch()

  const changeProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(setProfileImage(imageUrl));
      setShowPhotoOptions(false); // Close menu after selection
    }
  };

  const removeProfileImage = () => {
    dispatch(setProfileImage(null));
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowPhotoOptions(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-900 font-sans selection:bg-emerald-100">
      <input
        type="file"
        onChange={changeProfileImage}
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
      />

      {/* Glassmorphism Background Decor */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-emerald-200/30 blur-[120px] rounded-full" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-blue-200/20 blur-[100px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Clean Identity Block */}
          <div className="lg:w-1/3">
            <div className="sticky top-12">
              <div className="relative w-full aspect-square bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] shadow-2xl shadow-emerald-900/5 p-8 flex flex-col items-center justify-center text-center">
                
                {/* Profile Picture & Integrated Edit Logo */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-xl shadow-emerald-200 overflow-hidden border-4 border-white">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={60} strokeWidth={1.5} />
                    )}
                  </div>

                  {/* The Integrated Edit Logo (FAB) */}
                  <button 
                    onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                    className={`absolute -bottom-2 -right-2 p-3 rounded-2xl shadow-lg transition-all z-20 border-2 border-white ${
                        showPhotoOptions ? "bg-red-500 text-white" : "bg-slate-900 text-white hover:bg-emerald-600"
                    }`}
                  >
                    {showPhotoOptions ? <X size={18} /> : <Edit3 size={18} />}
                  </button>

                  {/* Floating Mini Menu for Photo Options */}
                  {showPhotoOptions && (
                    <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3 animate-in fade-in slide-in-from-left-4 duration-200">
                      <button 
                        onClick={triggerFileInput}
                        className="p-3 bg-slate-900 text-white rounded-xl shadow-xl hover:bg-emerald-600 border border-emerald-100"
                        title="Change Image"
                      >
                        <Camera size={18} />
                      </button>
                      {profileImage && (
                        <button 
                          onClick={removeProfileImage}
                          className="p-3 bg-white text-red-500 rounded-xl shadow-xl hover:bg-red-50 border border-red-100"
                          title="Remove Image"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <h2 className="text-3xl font-black tracking-tight leading-tight">
                {currentUserData?.username || "User"}</h2>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Active Member</p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100 w-full">
                  <p className="text-xm uppercase font-black mb-1 tracking-tighter">Member Since</p>
                  <p className="text-[10px] font-black text-slate-700 font-mono">{properDate || "000000"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Strictly Data View */}
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-[3rem] p-8 md:p-14 shadow-xl">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black flex items-center gap-3">
                   Core Identity <span className="w-12 h-1 bg-emerald-500 rounded-full" />
                </h3>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-[10px] uppercase">
                    <Check size={12} /> Data Verified
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <DataField label="Display Name" icon={<User size={18}/>} value={currentUserData?.fullname} />
                <DataField label="Email Protocol" icon={<Mail size={18}/>} value={currentUserData?.email} />
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secure WhatsApp</label>
                  <div className="flex items-center gap-4 transition-all pb-4 border-b-2 border-slate-200/60">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <MessageCircle size={20} />
                      <span className="font-black text-lg">+91</span>
                    </div>
                    <span className="text-xl font-bold text-slate-800">{currentUserData?.phonenumber || "---"}</span>
                  </div>
                </div>

                <DataField label="Geo Location" icon={<MapPin size={18}/>} value={location || "---"} />
              </div>
              <div className='mt-10' >
                <DataField label="Address.." icon={<Home size={18}/>} value={currentUserData?.address }/>
              </div>


              {/* Success Notification for Image selection
              {profileImage && !CurrentData.profilePic && (
                <div className="mt-12 p-6 bg-emerald-500 rounded-[2rem] flex items-center justify-between text-white shadow-xl shadow-emerald-200">
                    <p className="font-bold text-sm uppercase tracking-wider">New Profile Image Ready</p>
                    <button className="px-6 py-2 bg-white text-emerald-600 rounded-xl font-black text-xs uppercase hover:scale-105 transition-all">
                        Sync with Server
                    </button>
                </div>
              )} */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Stateless Data Display Component
const DataField = ({ label, icon, value }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{label}</label>
    <div className="flex items-center gap-4 pb-4 border-b-2 border-slate-200/60">
      <span className="text-slate-400">{icon}</span>
      <span className="text-xl font-bold text-slate-800">{value || "---"}</span>
    </div>
  </div>
);

export default UserProfile;

