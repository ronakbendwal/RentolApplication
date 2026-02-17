// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import { 
//   User, Mail, Lock, ShieldCheck, Camera, Save, 
//   ArrowLeft, Fingerprint, MapPin, CheckCircle2,
//   Eye, EyeOff, Hash
// } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import {useDispatch,useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom';
// import { FormInput} from '../Form/Utils/index.js';
// import { setUserData } from '../redux/Feature/Auth.js';
// const EditProfilePage = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     watch,
//     formState:{
//       isSubmitSuccessful,
//       isSubmitting
//     }
//   }=useForm()

//  useEffect(()=>{
//   try{
//     const fetchdata=async()=>{
//       const response=await axios.get('/api/user/current-user')
//       console.log( response.data.data)
//       reset(response.data.data)
//     }
//     fetchdata();
//   }catch(err){
//     console.log(err)
//   }},[])

//   const navigate = useNavigate();
//   const dispatch=useDispatch()
//   const {data}=useSelector((state)=>state.auth);
//   const [isSyncing, setIsSyncing] = useState(false);
//   const [otpSent, setOtpSent] = useState(false); // OTP field trigger
//   const [isVerified, setIsVerified] = useState(false); // Final verification
  
//   // Password Visibility States
//   const [showOldPass, setShowOldPass] = useState(false);
//   const [showNewPass, setShowNewPass] = useState(false);

//   const submit=async(data)=>{
//     setIsSyncing(true)
//     try{
//       const response=await axios.patch("/api/user/update-user",data);
//       dispatch(setUserData(response.data));
//       navigate('/userprofile')
//     }catch(err){
//       console.log(err)
//     }finally{
//       setIsSyncing(false)
//     }
//   }
//   return (
//     <div className="min-h-screen bg-[#f0f0f0] p-6 md:p-16 font-black text-slate-900">
//       <div className="max-w-4xl mx-auto">
        
//         {/* --- HEADER --- */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
//           <div className="bg-yellow-400 border-[5px] border-black p-6 shadow-[10px_10px_0px_#000] -rotate-1">
//             <h1 className="text-4xl md:text-5xl uppercase tracking-tighter flex items-center gap-4">
//               <Fingerprint size={48} strokeWidth={3} /> User Information
//             </h1>
//           </div>
//           <button onClick={() => navigate(-1)} className="bg-white border-[4px] border-black px-6 py-3 shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-xs flex items-center gap-2">
//             <ArrowLeft size={16} strokeWidth={3} /> Discard Changes
//           </button>
//         </div>

//         <div className="grid grid-cols-12 gap-10">
//           {/* --- LEFT: AVATAR --- */}
//           <div className="col-span-12 lg:col-span-4 flex flex-col items-center">
//             <div className="relative group">
//               <div className="w-48 h-48 bg-indigo-100 border-[6px] border-black shadow-[12px_12px_0px_#4f46e5] overflow-hidden">
//                 <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Ronak" alt="Profile" className="w-full h-full object-cover" />
//               </div>
//               <button 
//               className="absolute -bottom-4 -right-4 bg-black text-white p-4 border-[4px] border-white shadow-[6px_6px_0px_#4f46e5] hover:scale-110 transition-transform">
//                 <Camera size={24} />
//               </button>
//             </div>
//           </div>

//           {/* --- RIGHT: DATA --- */}
//           <div className="col-span-12 lg:col-span-8 space-y-10">
//             {/* BASIC BIO DATA */}
//             <div className="bg-white border-[6px] border-black p-8 shadow-[12px_12px_0px_#000]">
//               <h2 className="text-xl uppercase mb-8 flex items-center gap-3 border-b-[4px] border-black pb-2 w-fit"><User size={20} className="text-indigo-600" /> Basic Bio Data</h2>
//               <form className="space-y-6" onSubmit={handleSubmit(submit)} >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                   <div className="group">
//                     {/* <label className="block text-xs uppercase mb-2 ml-1">Username</label> */}
//                     <FormInput 
//                     type="text" 
//                     placeholder="@ronak_dev" 
//                     label="UserName"
//                     {...register("username",{required:true})}
//                     />
//                     </div>
//                   <div className="group">
//                     <FormInput
//                     type="text" 
//                     placeholder="Enter Full Name"
//                     label="Full Name"
//                     {...register("fullname",{required:true})} 
//                    />  
//                    </div>
//                 </div>
//                   <div className="group">
//                     <FormInput
//                     type="tel" 
//                     label="Phone No."
//                     placeholder="+91 xxxxxxxxxx"
//                     {...register("phonenumber",{required:true})} 
//                    />              
//                   </div>
//                 <div className="group">
//                   <div className="relative">
//                     <FormInput 
//                     type="text" 
//                     placeholder='Enter Your Email'
//                     label="Email.."
//                     {...register("email",{required:true})}
//                     />
//                     <Mail className="absolute right-4 top-11 text-indigo-600" size={20} />
//                     </div>
//                 </div>
//                 <div className="group">
//                   {/* <label className="block text-xs uppercase mb-2 ml-1">Premanent Address</label> */}
//                   <div className="relative">
//                     <FormInput 
//                     type="text" 
//                     placeholder='Enter Your Address'
//                     label="Permanent Address"
//                     {...register("address",{required:true})}

//                     />
//                     <MapPin className="absolute right-4 top-11 text-indigo-600" size={20} />
//                     </div>
//                 </div>
//             <button 
//               type='submit'

//               disabled={isSubmitting} 
//               className="w-full bg-black text-white border-[4px] border-black p-6 uppercase font-[1000] tracking-widest text-lg shadow-[10px_10px_0px_#4f46e5] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-4">
//               {isSyncing ? "Syncing..." : "Save Changes"} <Save size={24} />
//             </button>
//               </form>
//             </div>



//           </div>
//         </div>
//       </div>
//     </div> 
//   );
// };

// export default EditProfilePage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, Mail, Save, ArrowLeft, Fingerprint, MapPin, 
  ShieldAlert, Settings, Zap, Globe
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../Form/Utils/index.js';
import { setUserData } from '../redux/Feature/Auth.js';

const EditProfilePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  useEffect(() => {
    try {
      const fetchdata = async () => {
        const response = await axios.get('/api/user/current-user');
        reset(response.data.data);
      };
      fetchdata();
    } catch (err) {
      console.log(err);
    }
  }, [reset]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSyncing, setIsSyncing] = useState(false);

  const submit = async (data) => {
    setIsSyncing(true);
    try {
      const response = await axios.patch("/api/user/update-user", data);
      dispatch(setUserData(response.data));
      navigate('/userprofile');
    } catch (err) {
      console.log(err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-6 md:p-16 font-black text-slate-900 selection:bg-yellow-400">
      <div className="max-w-5xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="bg-yellow-400 border-[5px] border-black p-6 shadow-[10px_10px_0px_#000] -rotate-1 relative overflow-hidden group">
             <Zap className="absolute -right-4 -top-4 text-black opacity-10 group-hover:rotate-12 transition-transform" size={120} />
            <h1 className="text-4xl md:text-5xl uppercase tracking-tighter flex items-center gap-4 relative z-10">
              <Fingerprint size={48} strokeWidth={3} /> Identity_Hub
            </h1>
          </div>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-white border-[4px] border-black px-8 py-4 shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all uppercase text-sm flex items-center gap-2 group"
          >
            <ArrowLeft size={20} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> Discard_Changes
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          
          {/* --- LEFT: SECURITY ACCESS PANEL --- */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-indigo-600 border-[6px] border-black p-8 shadow-[12px_12px_0px_#000] sticky top-10">
              <div className="mb-8 border-b-4 border-black pb-4">
                <Settings size={40} className="text-white mb-4" />
                <h3 className="text-white text-2xl uppercase leading-tight">Security Access Protocol</h3>
              </div>
              
              <p className="text-indigo-200 text-xs uppercase mb-8 leading-relaxed italic">
                Authorized override for system credentials and sensitive data management.
              </p>

              <button 
                onClick={() => navigate('/change-password')} // Adjust path as per your routing
                className="w-full bg-yellow-400 border-[4px] border-black p-5 uppercase font-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 group"
              >
                <ShieldAlert size={24} className="group-hover:animate-pulse" /> Change_Password
              </button>

              <div className="mt-12 flex gap-2">
                <div className="h-3 w-3 bg-red-500 border-2 border-black rounded-full animate-pulse"></div>
                <div className="h-3 w-3 bg-green-500 border-2 border-black rounded-full"></div>
                <div className="h-3 w-3 bg-yellow-500 border-2 border-black rounded-full"></div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: INFORMATION FORM --- */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white border-[6px] border-black p-8 shadow-[12px_12px_0px_#000] relative">
              <div className="absolute -top-4 -right-4 bg-black text-white px-4 py-1 uppercase text-[10px] tracking-widest">
                System_v2.0
              </div>

              <h2 className="text-2xl uppercase mb-10 flex items-center gap-3 border-b-[6px] border-black pb-4 w-full">
                <User size={28} className="text-indigo-600" strokeWidth={3} /> Core_Bio_Data
              </h2>

              <form className="space-y-8" onSubmit={handleSubmit(submit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <FormInput 
                      type="text" 
                      placeholder="@ronak_dev" 
                      label="Public_Handle"
                      {...register("username", { required: true })}
                    />
                  </div>
                  <div className="group">
                    <FormInput
                      type="text" 
                      placeholder="Legal Full Name"
                      label="Identity_Name"
                      {...register("fullname", { required: true })} 
                    />  
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group relative">
                    <FormInput
                      type="tel" 
                      label="Contact_Line"
                      placeholder="+91 xxxxxxxxxx"
                      {...register("phonenumber", { required: true })} 
                    />  
                  </div>
                  <div className="group relative">
                    <FormInput 
                      type="text" 
                      placeholder='Active Email Sync'
                      label="Access_Email"
                      {...register("email", { required: true })}
                    />
                    <Mail className="absolute right-4 top-12 text-indigo-600" size={20} strokeWidth={3} />
                  </div>
                </div>

                <div className="group relative">
                  <FormInput 
                    type="text" 
                    placeholder='Current Operational Base'
                    label="Geographic_Location"
                    {...register("address", { required: true })}
                  />
                  <MapPin className="absolute right-4 top-12 text-indigo-600" size={20} strokeWidth={3} />
                </div>

                <div className="pt-6">
                  <button 
                    type='submit'
                    disabled={isSubmitting} 
                    className="w-full bg-black text-white border-[4px] border-black p-8 uppercase font-black tracking-[0.2em] text-2xl shadow-[12px_12px_0px_#4f46e5] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all flex items-center justify-center gap-6 group"
                  >
                    {isSyncing ? "Syncing_Protocol..." : "Commit_Changes"} 
                    <Save size={32} className="group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
            
            {/* FOOTER DECOR */}
            <div className="mt-8 flex justify-between items-center text-[10px] uppercase font-black text-slate-400">
               <div className="flex items-center gap-2"><Globe size={12} /> Global_Server_Active</div>
               <div>Ujjain_Node_7880</div>
            </div>
          </div>

        </div>
      </div>
    </div> 
  );
};

export default EditProfilePage;






            {/* SECURITY PROTOCOL */}
             {/* <div className="bg-indigo-600 border-[6px] border-black p-8 shadow-[12px_12px_0px_#000] rotate-1">
              <h2 className="text-xl uppercase mb-8 text-white flex items-center gap-3"><ShieldCheck size={20} className="text-yellow-400" /> Security Protocol</h2>
              
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-xs uppercase mb-2 ml-1 text-indigo-100">Old Access Key</label>
                  <div className="flex gap-3">
                    <div className="relative flex-grow">
                      <input 
                        type={showOldPass ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full bg-white border-[4px] border-black p-4 focus:outline-none font-bold pr-12"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowOldPass(!showOldPass)}
                        className="absolute right-4 top-4 text-slate-400 hover:text-black transition-colors"
                      >
                        {showOldPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="bg-yellow-400 border-[4px] border-black px-6 font-[1000] uppercase text-xs shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                    >
                      Verify
                    </button>
                  </div>
                </div>

                {otpSent && !isVerified && (
                  <div className="bg-white border-[4px] border-black p-4 animate-in slide-in-from-top-2 duration-300">
                    <label className="block text-[10px] uppercase mb-2 font-black text-indigo-600 tracking-tighter italic">Verification Code Sent To Email</label>
                    <div className="flex gap-3">
                       <div className="relative flex-grow">
                          <input type="text" placeholder="X-X-X-X" className="w-full border-b-4 border-black p-2 focus:outline-none font-black text-center tracking-[0.5em] uppercase" />
                          <Hash className="absolute left-2 top-2 text-slate-300" size={16} />
                       </div>
                       <button 
                        onClick={() => setIsVerified(true)} 
                        className="bg-black text-white px-4 py-2 text-[10px] uppercase">
                        Confirm
                      </button>
                    </div>
                  </div>
                )}

                <div className="group">
                  <label className="block text-xs uppercase mb-2 ml-1 text-indigo-100">NewAccess Key</label>
                  <div className="relative">
                    <input 
                      type={showNewPass ? "text" : "password"} 
                      placeholder="••••••••"
                      disabled={!isVerified}
                      className={`w-full bg-white border-[4px] border-black p-4 focus:bg-yellow-50 focus:outline-none font-bold pr-12 ${!isVerified && 'opacity-50 cursor-not-allowed'}`}
                    />
                    <button 
                      type="button"
                      disabled={!isVerified}
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-4 top-4 text-slate-400 hover:text-black transition-colors"
                    >
                      {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
