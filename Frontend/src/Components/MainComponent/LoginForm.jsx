// import React, { useState } from 'react';
// import { Mail, Lock, Chrome, Apple } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { Link ,useNavigate} from 'react-router-dom';
// import {Input} from '../index.js';
// import { useSelector,useDispatch } from 'react-redux';
// import { login,logout } from '../../redux/Feature/Auth.js';
// import axios from 'axios';
// const LoginForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState:{
//       errors,
//       isSubmitting
//     }
//   }=useForm()
//   const dispatch=useDispatch()
//   const navigate=useNavigate()
//   const [error,setError]=useState("")
//   //api calling for login user
//   const submit=async(data)=>{
//     setError("")
//     try{
//       const response=await axios.post('/api/user/login',data)
//       const LoginUserData=response.data;
//       console.log(LoginUserData)
//       dispatch(login(LoginUserData))
//       navigate('/');
//     //use when api call
//     }catch(error){
//       setError(   error?.response?.data?.message || "Invalid credentials")
//       dispatch(logout());
//     }
//   }
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-black text-emerald-600 tracking-tight mb-2">RENTOL.</h1>
//           <p className="text-gray-500 font-medium">Welcome back! Please enter your details.</p>
//         </div>

//         <form className="space-y-5" onSubmit={handleSubmit(submit)}>
//           <div className="relative">
//             <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="email" 
//               placeholder="Email address"
//               {...register('email',{
//                 required:true
//               })}
//             />
//           </div>

//           <div className="relative">
//             <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
//             <Input 
//               type="password" 
//               placeholder="Password"
//               {...register('passward',{
//                 required:true
//               })}
//             />
//           </div>

//           <div className="flex justify-end">
//             <button className="text-sm font-bold text-emerald-600 hover:underline">Forgot password?</button>
//           </div>

//           <button type='submit' disabled={isSubmitting} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
//             Sign In
//           </button>
//         </form>

//         <div className="relative my-8 text-center">
//           <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
//           <span className="relative px-4 bg-white text-xs text-gray-400 uppercase font-bold">Or continue with</span>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-8">
//           <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
//             <Chrome size={18} className="text-red-500" /> Google
//           </button>
//           <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
//             <Apple size={18} fill="black" /> Apple
//           </button>
//         </div>

//         <p className="text-center text-sm text-gray-600">
//           Don't have an account? 
//           <Link to="/signup" className="ml-1 font-bold text-emerald-600 hover:underline">Create Account</Link>
//         </p>
//       </div>
//     </div>
//   );
// };
// export default LoginForm


// import React, { useState } from 'react';
// import { Mail, Lock, Chrome, Apple, ArrowRight, ShieldCheck } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import { Input } from '../index.js';
// import { useDispatch } from 'react-redux';
// import { login, logout } from '../../redux/Feature/Auth.js';
// import axios from 'axios';

// const LoginForm = () => {
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const submit = async (data) => {
//     setError("");
//     try {
//       const response = await axios.post('/api/user/login', data);
//       const LoginUserData = response.data;
//       dispatch(login(LoginUserData));
//       navigate('/');
//     } catch (error) {
//       setError(error?.response?.data?.message || "Invalid credentials");
//       dispatch(logout());
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] px-4 font-sans">
//       <div className="max-w-md w-full bg-white border-[4px] border-slate-900 rounded-[2.5rem] shadow-[16px_16px_0px_#000] p-10 relative overflow-hidden">
        
//         {/* TOP ACCENT DECORATION */}
//         <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500 border-b-[4px] border-l-[4px] border-slate-900 -mr-8 -mt-8 rotate-45" />

//         <div className="text-center mb-10 relative z-10">
//           <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-400 border-[3px] border-slate-900 rounded-2xl shadow-[4px_4px_0px_#000] mb-4">
//             <ShieldCheck size={28} strokeWidth={3} className="text-slate-900" />
//           </div>
//           <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
//             RENTOL<span className="text-emerald-500">.</span>
//           </h1>
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Authentication_Required</p>
//         </div>

//         {error && (
//           <div className="mb-6 p-3 bg-rose-100 border-[3px] border-rose-600 rounded-xl text-rose-600 text-[11px] font-black uppercase tracking-widest text-center shadow-[4px_4px_0px_rgba(225,29,72,0.2)]">
//             Error: {error}
//           </div>
//         )}

//         <form className="space-y-6" onSubmit={handleSubmit(submit)}>
//           <div className="space-y-2">
//             <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Identity_Mail</label>
//             <div className="relative group">
//               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
//               <Input 
//                 type="email" 
//                 placeholder="USER@SYSTEM.COM"
//                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest placeholder:text-slate-300 focus:bg-white focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all shadow-[4px_4px_0px_#000]"
//                 {...register('email', { required: true })}
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Security_Key</label>
//             <div className="relative group">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
//               <Input 
//                 type="password" 
//                 placeholder="••••••••"
//                 className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest placeholder:text-slate-300 focus:bg-white focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all shadow-[4px_4px_0px_#000]"
//                 {...register('passward', { required: true })}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-slate-900 transition-colors underline underline-offset-4 decoration-2">Forgot_Access?</button>
//           </div>

//           <button 
//             type='submit' 
//             disabled={isSubmitting} 
//             className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-[0.2em] text-[12px] border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-3 group"
//           >
//             {isSubmitting ? "Processing..." : "Authorize_Session"}
//             <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
//           </button>
//         </form>

//         <div className="relative my-10 text-center">
//           <div className="absolute inset-0 flex items-center"><div className="w-full border-t-[3px] border-slate-100"></div></div>
//           <span className="relative px-4 bg-white text-[9px] text-slate-400 uppercase font-black tracking-[0.3em]">Protocol_Split</span>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-8">
//           <SocialButton icon={<Chrome size={18} strokeWidth={3} />} label="Google" />
//           <SocialButton icon={<Apple size={18} strokeWidth={3} fill="currentColor" />} label="Apple" />
//         </div>

//         <p className="text-center text-[11px] font-black uppercase tracking-widest text-slate-500">
//           New_Unit? 
//           <Link to="/signup" className="ml-2 text-emerald-500 hover:text-emerald-600 underline underline-offset-4 decoration-[3px]">Register_Here</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// const SocialButton = ({ icon, label }) => (
//   <button className="flex items-center justify-center gap-2 py-3.5 bg-white border-[3px] border-slate-900 rounded-2xl shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black text-[10px] uppercase tracking-widest text-slate-900">
//     {icon} {label}
//   </button>
// );

// export default LoginForm;


import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ArrowLeft, ShieldCheck, Zap, KeyRound, Apple} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../index.js';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/Feature/Auth.js';
import axios from 'axios';

const LoginForm = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Password
  const { register, handleSubmit, trigger, formState: { isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const nextStep = async () => {
    const isValid = await trigger('email');
    if (isValid) setStep(2);
  };

  const submit = async (data) => {
    setError("");
    try {
      const response = await axios.post('/api/user/login', data);
      dispatch(login(response.data));
      navigate('/');
    } catch (error) {
      setError(error?.response?.data?.message || "Access Denied");
      setStep(1); // Reset to first step on error
      dispatch(logout());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F0F0] px-6 py-12 font-sans overflow-hidden">
      {/* BACKGROUND DECORATION - Neo-Brutalist Shapes */}
      <div className="fixed top-20 left-20 w-40 h-40 bg-emerald-300 border-[4px] border-slate-900 -rotate-12 rounded-3xl opacity-20 -z-10" />
      <div className="fixed bottom-20 right-20 w-60 h-60 bg-indigo-400 border-[4px] border-slate-900 rotate-12 rounded-full opacity-20 -z-10" />

      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white border-[4px] border-slate-900 rounded-[3rem] shadow-[20px_20px_0px_#000] overflow-hidden min-h-[500px]">
        
        {/* LEFT PANEL: Brand & Visuals */}
        <div className="w-full md:w-2/5 bg-indigo-600 p-10 flex flex-col justify-between border-b-[4px] md:border-b-0 md:border-r-[4px] border-slate-900">
          <div>
            <div className="w-14 h-14 bg-white border-[3px] border-slate-900 rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#000] mb-6">
              <Zap size={28} strokeWidth={3} className="text-indigo-600" />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">
              RENTOL<span className="text-emerald-400">.</span>
            </h1>
            <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.3em] mt-4 leading-relaxed">
              Secure_Access_Portal // System_v.4.0
            </p>
          </div>

          <div className="hidden md:block">
            <div className="p-4 bg-indigo-800 border-[3px] border-slate-900 rounded-2xl shadow-[4px_4px_0px_#000]">
              <p className="text-white text-[9px] font-black uppercase tracking-widest italic leading-tight">
                "Speed is the new currency. Rent gear, build dreams."
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Interactive Form */}
        <div className="w-full md:w-3/5 p-10 md:p-14 relative flex flex-col justify-center">
          
          {/* Progress Bar Component */}
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
            <div 
              className="h-full bg-emerald-400 transition-all duration-700 ease-out"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-8">
            {step === 1 ? (
              <div className="animate-in slide-in-from-right-10 duration-500">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Identify_User</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 01: Universal Identity Link</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={20} strokeWidth={3} />
                    <Input 
                      type="email" 
                      placeholder="ENTER_EMAIL_ADDRESS"
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border-[3px] border-slate-900 rounded-[1.5rem] font-black text-[12px] uppercase tracking-widest transition-all shadow-[6px_6px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                      {...register('email', { required: true })}
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={nextStep}
                    className="w-full py-4 bg-emerald-400 border-[3px] border-slate-900 rounded-[1.5rem] shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-[0.2em] flex items-center justify-center gap-3"
                  >
                    Next_Phase <ArrowRight size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in slide-in-from-right-10 duration-500">
                <button 
                  onClick={() => setStep(1)}
                  className="mb-6 flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <ArrowLeft size={14} strokeWidth={3} /> Back_To_Identity
                </button>
                
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">Verify_Key</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 02: Encryption Protocol</p>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={20} strokeWidth={3} />
                    <Input 
                      type="password" 
                      placeholder="ENTER_PASS_KEY"
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border-[3px] border-slate-900 rounded-[1.5rem] font-black text-[12px] uppercase tracking-widest transition-all shadow-[6px_6px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1"
                      {...register('passward', { required: true })}
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-indigo-600 text-white border-[3px] border-slate-900 rounded-[1.5rem] shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-[0.2em] flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? "Syncing..." : "Final_Authorization"}
                    <ShieldCheck size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Social Footer */}
          <div className="mt-12 pt-8 border-t-[3px] border-slate-100 flex items-center justify-between">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              No_Account? <Link to="/signup" className="text-emerald-500 underline ml-2 decoration-2">Join_Units</Link>
            </p>
            <div className="flex gap-3">
              <button className="p-2 border-[2px] border-slate-900 rounded-lg hover:bg-slate-50 transition-colors shadow-[3px_3px_0px_#000] active:shadow-none"><Apple size={14}/></button>
              <button className="p-2 border-[2px] border-slate-900 rounded-lg hover:bg-slate-50 transition-colors shadow-[3px_3px_0px_#000] active:shadow-none"><Apple size={14}/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;