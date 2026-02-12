// import React, { useState } from 'react';
// import {Link, useNavigate} from 'react-router-dom'
// import { Mail, Lock, Chrome, Apple , User, ShieldCheck, PhoneCall, Home} from 'lucide-react';
// import {useForm} from 'react-hook-form'
// import {Input} from '../index.js';
// import { useDispatch } from 'react-redux';
// import { login,logout } from '../../redux/Feature/Auth.js';
// import axios from 'axios';
// const SignupForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState:{errors,isSubmitting}
//   }=useForm();
//   const dispatch=useDispatch()
//   const navigate=useNavigate();
//   const [error,setError]=useState("");
//   const submit= async(data)=>{
//     setError("");
//     try{
//         //api call comes here for creating user account 
//       const response= await axios.post("/api/user/signup",data)
//       const CreatedUserData=response.data
//         dispatch(login(CreatedUserData))
//         navigate('/')
//     }catch(error){
//       setError(error?.response?.data?.message || "Signup failed")
//       dispatch(logout())
//     }
//   }
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-black text-blue-600 tracking-tight mb-2">Create Account</h1>
//           <p className="text-gray-500 font-medium">Join Rentol to start renting today.</p>
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit(submit)}>
//           <div className="relative">
//             <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input
//             placeholder="Full Name"
//             {...register('fullname',{
//               required:true,
//               minLength:{value:3, message:"Enter Correct Name"}
//             })}/>
//             {errors.fullname && <p>{errors.fullname.message}</p>}
//           </div>

//           <div className="relative">
//             <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="email" 
//               placeholder="Enter Email"
//               {...register('email',{
//               required:true,
//               validate:(value)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.
//                 test(value) || "Enter Correct Email Address",
//             })}
//             />
//             {errors.email && <p>{errors.email.message}</p> }
//           </div>

//           <div className="relative">
//             <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="text" 
//               placeholder="User Name"
//               {...register('username',{
//               required:true,
//               minLength:{value:3, message:"Use Long Username"}
//             })}
//             />
//             {errors.username && <p>{errors.username.message}</p>}
//           </div>

//           <div className="relative">
//             <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type='tel'
//               placeholder="Enter Phone Number"
//               {...register('phonenumber',{
//               required:true,
//             })}
//             />
//           </div>

//           <div className="relative">
//             <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="password" 
//               placeholder="Create Password"
//               {...register('passward',{
//               required:true,
//             })}
//             />
//           </div>

//           <div className="flex items-start gap-2 py-2">
//             <input type="checkbox" className="mt-1 rounded text-blue-600 focus:ring-blue-500" />
//             <p className="text-xs text-gray-500 leading-relaxed">
//               I agree to the <span className="text-blue-600 underline">Terms of Service</span> and <span className="text-blue-600 underline">Privacy Policy</span>.
//             </p>
//           </div>

//           <button disabled={isSubmitting} type='submit' className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
//             Create Account
//           </button>
//         </form>

//         <div className="mt-8 pt-6 border-t border-gray-50 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account? 
//             <Link to="/login" className="ml-1 font-bold text-blue-600 hover:underline">Log in here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };





// const SignupForm2 = () => {
//   const {
//     register,
//     handleSubmit,
//     reset, // Added reset from useForm
//     formState:{
//       errors,
//       isSubmitting
//     }
//   }=useForm();
  
//   const dispatch=useDispatch()
//   const navigate=useNavigate();
//   const [error,setError]=useState("");

//   const submit= async(data)=>{
//     setError("");
//     try{
//       const response= await axios.post("/api/user/signup",data)
//       const CreatedUserData=response.data
      
//       dispatch(login(CreatedUserData))
//       reset(); // This vanishes the data from the page after a successful signup
//       navigate('/')
      
//     }catch(error){
//       setError(error?.response?.data?.message || "Signup failed")
//       dispatch(logout())
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-black text-emerald-600 tracking-tight mb-2">Create Account</h1>
//           <p className="text-gray-500 font-medium">Join Rentol to start renting today.</p>
//         </div>

//         {error && <p className="text-red-500 text-center mb-4 text-sm font-bold">{error}</p>}

//         <form className="space-y-4" onSubmit={handleSubmit(submit)}>
//           <div className="relative">
//             <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input
//             placeholder="Full Name"
//             {...register('fullname',{
//               required:true,
//               minLength:{value:3, message:"Enter Correct Name"}
//             })}/>
//             {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>}
//           </div>

//           <div className="relative">
//             <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="email" 
//               placeholder="Enter Email"
//               {...register('email',{
//               required:true,
//               validate:(value)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.
//                 test(value) || "Enter Correct Email Address",
//             })}
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p> }
//           </div>

//           <div className="relative">
//             <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="text" 
//               placeholder="User Name"
//               {...register('username',{
//               required:true,
//               minLength:{value:3, message:"Use Long Username"}
//             })}
//             />
//             {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
//           </div>

//           <div className="relative">
//             <PhoneCall className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="tel" 
//               placeholder="Enter Contact Number"
//               {...register('phonenumber',{
//               required:true,
//             })}
//             />
//           </div>

//           <div className="relative">
//             <Home className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="address" 
//               placeholder="Enter Address"
//               {...register('address',{
//               required:true,
//             })}
//             />
//             </div>

//           <div className="relative">
//             <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="password" 
//               placeholder="Create Password"
//               {...register('passward',{
//               required:true,
//             })}
//             />
//           </div>

//           <div className="flex items-start gap-2 py-2">
//             <input type="checkbox" required className="mt-1 rounded text-emerald-600 focus:ring-emerald-500" />
//             <p className="text-xs text-gray-500 leading-relaxed">
//               I agree to the <span className="text-emerald-600 underline">Terms of Service</span> and <span className="text-emerald-600 underline">Privacy Policy</span>.
//             </p>
//           </div>

//           <button disabled={isSubmitting} type='submit' className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
//             {isSubmitting ? "Processing..." : "Create Account"}
//           </button>
//         </form>

//         <div className="mt-8 pt-6 border-t border-gray-50 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account? 
//             <Link to="/login" className="ml-1 font-bold text-emerald-600 hover:underline">Log in here</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm2;




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, User, ShieldCheck, PhoneCall, Home, ArrowRight, ArrowLeft, Zap, BadgeCheck } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { Input } from '../index.js';
// import { useDispatch } from 'react-redux';
// import { login, logout } from '../../redux/Feature/Auth.js';
// import axios from 'axios';

// const SignupForm2 = () => {
//   const [step, setStep] = useState(1); // Steps: 1 (Basic), 2 (Contact), 3 (Security)
//   const { register, handleSubmit, trigger, reset, formState: { errors, isSubmitting } } = useForm();
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const nextStep = async (fields) => {
//     const isValid = await trigger(fields);
//     if (isValid) setStep((prev) => prev + 1);
//   };

//   const submit = async (data) => {
//     setError("");
//     try {
//       const response = await axios.post("/api/user/signup", data);
//       dispatch(login(response.data));
//       reset();
//       navigate('/');
//     } catch (error) {
//       setError(error?.response?.data?.message || "Signup failed");
//       dispatch(logout());
//       setStep(1); // Reset to first step on error
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] px-6 py-12 font-sans overflow-hidden">
//       {/* BACKGROUND SHAPES */}
//       <div className="fixed top-[-5%] left-[-5%] w-64 h-64 bg-emerald-200 border-[4px] border-slate-900 -rotate-12 rounded-[4rem] opacity-20 -z-10" />
//       <div className="fixed bottom-[-5%] right-[-5%] w-80 h-80 bg-indigo-300 border-[4px] border-slate-900 rotate-12 rounded-full opacity-20 -z-10" />

//       <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white border-[4px] border-slate-900 rounded-[3rem] shadow-[24px_24px_0px_#000] overflow-hidden min-h-[600px]">
        
//         {/* LEFT PANEL: Visuals */}
//         <div className="w-full md:w-2/5 bg-emerald-500 p-10 flex flex-col justify-between border-b-[4px] md:border-b-0 md:border-r-[4px] border-slate-900">
//           <div>
//             <div className="w-14 h-14 bg-white border-[3px] border-slate-900 rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#000] mb-6">
//               <Zap size={28} strokeWidth={3} className="text-emerald-500" />
//             </div>
//             <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">
//               JOIN<br/>RENTOL<span className="text-slate-900">.</span>
//             </h1>
//             <p className="text-emerald-900 text-[10px] font-black uppercase tracking-[0.3em] mt-4 leading-relaxed">
//               New_Unit_Registration // Protocol_v.4.0
//             </p>
//           </div>

//           <div className="hidden md:block space-y-4">
//              <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest bg-emerald-600/30 p-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#000]">
//                 <BadgeCheck size={18}/> Verified Equipment Pool
//              </div>
//              <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest bg-emerald-600/30 p-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#000]">
//                 <ShieldCheck size={18}/> Secure Peer-to-Peer
//              </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL: Interactive Form */}
//         <div className="w-full md:w-3/5 p-10 md:p-14 relative flex flex-col justify-center">
          
//           {/* Progress Bar */}
//           <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
//             <div 
//               className="h-full bg-indigo-500 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
//               style={{ width: `${(step / 3) * 100}%` }}
//             />
//           </div>

//           <form onSubmit={handleSubmit(submit)} className="space-y-6">
            
//             {/* STEP 1: BASIC INFO */}
//             {step === 1 && (
//               <div className="animate-in slide-in-from-right-10 duration-500">
//                 <div className="mb-8">
//                   <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Initialize_Basic</h2>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phase 01: Identity Credentials</p>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
//                     <Input placeholder="FULL_NAME" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('fullname', { required: true, minLength: 3 })} />
//                   </div>
//                   <div className="relative">
//                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
//                     <Input type="email" placeholder="EMAIL_ADDRESS" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('email', { required: true })} />
//                   </div>
//                   <button type="button" onClick={() => nextStep(['fullname', 'email'])} className="w-full py-4 bg-indigo-600 text-white border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-3">
//                     Next_Step <ArrowRight size={18} strokeWidth={3} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 2: CONTACT & LOCATION */}
//             {step === 2 && (
//               <div className="animate-in slide-in-from-right-10 duration-500">
//                 <button onClick={() => setStep(1)} className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase text-slate-400"><ArrowLeft size={14}/> Go_Back</button>
//                 <div className="mb-8">
//                   <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Locate_Unit</h2>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phase 02: Contact & Grid</p>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
//                     <Input placeholder="PHONE_NUMBER" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('phonenumber', { required: true })} />
//                   </div>
//                   <div className="relative">
//                     <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
//                     <Input placeholder="BASE_ADDRESS" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('address', { required: true })} />
//                   </div>
//                   <button type="button" onClick={() => nextStep(['phonenumber', 'address'])} className="w-full py-4 bg-indigo-600 text-white border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-3">
//                     Next_Step <ArrowRight size={18} strokeWidth={3} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 3: SECURITY */}
//             {step === 3 && (
//               <div className="animate-in slide-in-from-right-10 duration-500">
//                 <button onClick={() => setStep(2)} className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase text-slate-400"><ArrowLeft size={14}/> Go_Back</button>
//                 <div className="mb-8">
//                   <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Secure_Link</h2>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phase 03: Final Authorization</p>
//                 </div>
//                 <div className="space-y-4">
//                   <div className="relative">
//                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
//                     <Input type="password" placeholder="CREATE_PASSWORD" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('passward', { required: true })} />
//                   </div>
//                   <div className="flex items-start gap-3 p-1">
//                     <input type="checkbox" required className="mt-1 w-5 h-5 border-[3px] border-slate-900 rounded-md checked:bg-emerald-500 transition-all appearance-none checked:border-slate-900 relative after:content-['✓'] after:absolute after:hidden checked:after:block after:text-white after:text-[10px] after:left-1" />
//                     <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight leading-tight">I accept all system protocols & safety guidelines.</p>
//                   </div>
//                   <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-emerald-400 border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-[0.2em] flex items-center justify-center gap-3">
//                     {isSubmitting ? "Generating..." : "Final_Deploy"} <ShieldCheck size={18} strokeWidth={3} />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </form>

//           {/* Social Footer */}
//           <div className="mt-12 pt-8 border-t-[3px] border-slate-100 flex items-center justify-between">
//             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
//               Legacy_User? <Link to="/login" className="text-indigo-600 underline ml-2 decoration-2">Access_Here</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupForm2;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ShieldCheck, PhoneCall, Home, ArrowRight, ArrowLeft, Zap, BadgeCheck, AtSign } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '../index.js';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/Feature/Auth.js';
import axios from 'axios';

const SignupForm2 = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, trigger, reset, formState: { errors, isSubmitting } } = useForm();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const nextStep = async (fields) => {
    const isValid = await trigger(fields);
    if (isValid) setStep((prev) => prev + 1);
  };

  const submit = async (data) => {
    setError("");
    try {
      const response = await axios.post("/api/user/signup", data);
      dispatch(login(response.data));
      reset();
      navigate('/');
    } catch (error) {
      setError(error?.response?.data?.message || "Signup failed");
      dispatch(logout());
      setStep(1); 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] px-6 py-12 font-sans overflow-hidden">
      {/* BACKGROUND DECORATIONS */}
      <div className="fixed top-[-5%] left-[-5%] w-64 h-64 bg-emerald-200 border-[4px] border-slate-900 -rotate-12 rounded-[4rem] opacity-20 -z-10" />
      <div className="fixed bottom-[-5%] right-[-5%] w-80 h-80 bg-indigo-300 border-[4px] border-slate-900 rotate-12 rounded-full opacity-20 -z-10" />

      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white border-[4px] border-slate-900 rounded-[3rem] shadow-[24px_24px_0px_#000] overflow-hidden min-h-[620px]">
        
        {/* LEFT PANEL */}
        <div className="w-full md:w-2/5 bg-emerald-500 p-10 flex flex-col justify-between border-b-[4px] md:border-b-0 md:border-r-[4px] border-slate-900">
          <div>
            <div className="w-14 h-14 bg-white border-[3px] border-slate-900 rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#000] mb-6">
              <Zap size={28} strokeWidth={3} className="text-emerald-500" />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">
              JOIN<br/>RENTOL<span className="text-slate-900">.</span>
            </h1>
            <p className="text-emerald-900 text-[10px] font-black uppercase tracking-[0.3em] mt-4">New_Unit_Registration // v.4.0</p>
          </div>

          <div className="hidden md:block space-y-4">
             <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest bg-emerald-600/30 p-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#000]">
                <BadgeCheck size={18}/> Verified Equipment Pool
             </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-3/5 p-10 md:p-14 relative flex flex-col justify-center">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
            <div 
              className="h-full bg-indigo-500 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5">
            
            {/* STEP 1: IDENTITY (With Username) */}
            {step === 1 && (
              <div className="animate-in slide-in-from-right-10 duration-500">
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Initialize_Basic</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phase 01: Core Identity</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input placeholder="FULL_NAME" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('fullname', { required: true, minLength: 3 })} />
                  </div>
                  
                  {/* ADDED USERNAME FIELD BACK */}
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input placeholder="USER_NAME" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('username', { required: true, minLength: 3 })} />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input type="email" placeholder="EMAIL_ADDRESS" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('email', { required: true })} />
                  </div>
                  
                  <button type="button" onClick={() => nextStep(['fullname', 'username', 'email'])} className="w-full py-4 bg-indigo-600 text-white border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-3">
                    Next_Step <ArrowRight size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CONTACT & LOCATION */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right-10 duration-500">
                <button onClick={() => setStep(1)} className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors"><ArrowLeft size={14}/> Back_To_Identity</button>
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Locate_Unit</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phase 02: Communication Grid</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input placeholder="CONTACT_NUMBER" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('phonenumber', { required: true })} />
                  </div>
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input placeholder="BASE_ADDRESS" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('address', { required: true })} />
                  </div>
                  <button type="button" onClick={() => nextStep(['phonenumber', 'address'])} className="w-full py-4 bg-indigo-600 text-white border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-3">
                    Next_Step <ArrowRight size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SECURITY */}
            {step === 3 && (
              <div className="animate-in slide-in-from-right-10 duration-500">
                <button onClick={() => setStep(2)} className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors"><ArrowLeft size={14}/> Back_To_Location</button>
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Secure_Link</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phase 03: Final Authorization</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input type="password" placeholder="CREATE_SECURITY_KEY" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" {...register('passward', { required: true })} />
                  </div>
                  <div className="flex items-start gap-3 p-1">
                    <input type="checkbox" required className="mt-1 w-5 h-5 border-[3px] border-slate-900 rounded-md checked:bg-emerald-500 transition-all appearance-none checked:border-slate-900 relative after:content-['✓'] after:absolute after:hidden checked:after:block after:text-white after:text-[10px] after:left-1" />
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight leading-tight italic">I acknowledge and accept all system rental protocols.</p>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-emerald-400 border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-[0.2em] flex items-center justify-center gap-3">
                    {isSubmitting ? "Generating_Session..." : "Finalize_Deploy"} <ShieldCheck size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* FOOTER */}
          <div className="mt-10 pt-6 border-t-[3px] border-slate-100 flex items-center justify-between">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Legacy_User? <Link to="/login" className="text-emerald-500 underline ml-2 decoration-2 underline-offset-4">Access_Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm2;