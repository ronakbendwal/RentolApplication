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
      <div className="fixed top-20 left-20 w-40 h-40 bg-emerald-300 border-[4px] border-slate-900 -rotate-12 rounded-3xl opacity-20 -z-10" />
      <div className="fixed bottom-20 right-20 w-60 h-60 bg-indigo-400 border-[4px] border-slate-900 rotate-12 rounded-full opacity-20 -z-10" />

      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white border-[4px] border-slate-900 rounded-[3rem] shadow-[20px_20px_0px_#000] overflow-hidden min-h-[500px]">
        
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

        <div className="w-full md:w-3/5 p-10 md:p-14 relative flex flex-col justify-center">
          
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