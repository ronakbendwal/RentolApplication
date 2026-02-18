import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Eye, EyeOff, Mail, Lock, User, ShieldCheck, PhoneCall, Home, ArrowRight, ArrowLeft, Zap, BadgeCheck, AtSign,AlertTriangle,XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '../index.js';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/Feature/Auth.js';
import axios from 'axios';

const SignupForm2 = () => {
  const [step, setStep] = useState(1);
  const [showOldPass, setShowOldPass] = useState(false); // State for toggle
  const { 
    register, 
    handleSubmit, 
    trigger, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Error, setError] = useState("");

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
        {Error && (
          <div className="fixed top-27 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md animate-in fade-in zoom-in slide-in-from-top-10 duration-300">
            <div className="bg-red-500  rounded-full shadow-[10px_10px_0px_#000]  p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-white">
                <AlertTriangle size={32} strokeWidth={3} className="shrink-0" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Security_Alert</p>
                  <p className="text-sm font-black uppercase leading-tight">{Error}</p>
                </div>
              </div>
              <button 
                onClick={() => setError("")}
                className=" rounded-full text-white p-2  hover:bg-white hover:text-black transition-colors "
              >
                <XCircle size={30} />
              </button>
            </div>
          </div>
        )}
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
            <p className="text-emerald-900 text-[10px] font-black uppercase tracking-[0.3em] mt-4">Registration Unit </p>
          </div>

          <div className="hidden md:block space-y-4">
             <div className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest bg-emerald-600/30 p-3 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_#000]">
                <BadgeCheck size={18}/> Verified Equipment Pool
             </div>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-10 md:p-14 relative flex flex-col justify-center">
          
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
            <div 
              className="h-full bg-indigo-500 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5">
            
            {step === 1 && (
              <div className="animate-in slide-in-from-right-10 duration-500">
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Enter Core Identity</h2>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input 
                    placeholder="FULL NAME" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" 
                    {...register('fullname', { 
                      required: "Full Name Is Required", 
                      minLength:{
                        value:3,
                        message:"Name Is Too Short , Enter Correct Name"
                      }})} />
                  </div>
                  {errors.fullname && (
                    <p className="text-red-500 text-xs font-bold">
                      {errors.fullname.message}
                    </p>
                  )}                  
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input 
                    placeholder="USER NAME" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" 
                    {...register('username', { 
                      required: "User Name Is Required", 
                      minLength:{
                        value:3, 
                        message:"enter correct name"
                      }
                      })} />
                  </div>
                  {errors.fullname && (
                    <p className="text-red-500 text-xs font-bold">
                      {errors.fullname.message}
                    </p>
                  )} 
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input 
                    type="email" 
                    placeholder="EMAIL" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" 
                    {...register('email', { 
                      required:"Email Is Required",
                      pattern: {
                        value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                        message:"Enter Correct Email"
                      } })} />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs font-bold">
                      {errors.email.message}
                    </p>
                  )}
                  
                  <button type="button" onClick={() => nextStep(['fullname', 'username', 'email'])} className="w-full py-4 bg-indigo-600 text-white border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-3">
                    Next... <ArrowRight size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-right-10 duration-500">
                <button onClick={() => setStep(1)} className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors"><ArrowLeft size={14}/> Back To Basic</button>
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Location / Contact</h2>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input 
                    placeholder="CONTACT NUMBER" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" 
                    {...register('phonenumber', { 
                      required:" Phone Number Missing",
                      pattern:{
                        value:/^[6-9]\d{9}$/,
                        message:"Enter Correct Phone Number"
                      }
                      })} />
                  </div>
                  {errors.phonenumber && (
                    <p className="text-red-500 text-xs font-bold">
                      {errors.phonenumber.message}
                    </p>
                  )}
                  <div className="relative">
                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    <Input 
                    placeholder="Home ADDRESS" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" 
                    {...register('address', { 
                      required: "Enter Address"
                      })} />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-xs font-bold">
                      {errors.address.message}
                    </p>
                  )}
                  <button type="button" onClick={() => nextStep(['phonenumber', 'address'])} className="w-full py-4 bg-indigo-600 text-white border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-3">
                    Next... <ArrowRight size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in slide-in-from-right-10 duration-500">
                <button onClick={() => setStep(2)} className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors"><ArrowLeft size={14}/> Back to Info</button>
                <div className="mb-6">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Password</h2>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 z-10" size={18} strokeWidth={3} />
                    {/* TYPE CHANGED TO DYNAMIC showOldPass */}
                    <Input 
                      type={showOldPass ? "text" : "password"} 
                      placeholder="Create Password" 
                      className="w-full pl-12 pr-12 py-4 bg-slate-50 border-[3px] border-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_#000]" 
                      {...register('passward', { 
                        required: "Password Missing" ,
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                          message:
                          "Password must include letter, number, special character and be at least 8 characters"
                        }
                      })} 
                    />
                   
                    {/* UNHIDE BUTTON ADDED */}
                    <button 
                      type="button"
                      onClick={() => setShowOldPass(!showOldPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-900 z-10 hover:text-indigo-600 transition-colors"
                    >
                      {showOldPass ? <Eye size={18} strokeWidth={3} /> : <EyeOff size={18} strokeWidth={3} />}
                    </button>
                  </div>
                   {errors.passward && (
                    <p className="text-red-500  text-xs font-bold">
                      {errors.passward.message}
                    </p>
                   )}
                  <div className="flex items-start gap-3 p-1">
                    <input type="checkbox" required className="mt-1 w-5 h-5 border-[3px] border-slate-900 rounded-md checked:bg-emerald-500 transition-all appearance-none checked:border-slate-900 relative after:content-['✓'] after:absolute after:hidden checked:after:block after:text-white after:text-[10px] after:left-1" />
                    <p className="text-[9px] py-2 font-bold text-slate-500 uppercase tracking-tight leading-tight italic">I acknowledge and accept all system rental protocols.</p>
                  </div>
                  <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full py-4 bg-emerald-400 border-[3px] border-slate-900 rounded-2xl shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-[12px] tracking-[0.2em] flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? "Loading..." : "Create Account"} <ShieldCheck size={18} strokeWidth={3} />
                </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-10 pt-6 border-t-[3px] border-slate-100 flex items-center justify-between">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              Already Have Account? <Link to="/login" className="text-emerald-500 underline ml-2 decoration-2 underline-offset-4">SignUp</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm2;