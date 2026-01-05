import React from 'react';
import { Mail, Lock, Chrome, Apple } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Input from '../UtilFields/Input';
const LoginForm = ({ onToggle }) => {
  const {
    register,
    handleSubmit,
    formState:{
      errors,
      isSubmitting
    }
  }=useForm()
  const submit=(data)=>{
    console.log(data)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-blue-600 tracking-tight mb-2">RENTOL.</h1>
          <p className="text-gray-500 font-medium">Welcome back! Please enter your details.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(submit)}>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <Input 
              type="email" 
              placeholder="Email address"
              {...register('email',{
                required:true
              })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <Input 
              type="password" 
              placeholder="Password"
              {...register('passward',{
                required:true
              })}
            />
          </div>

          <div className="flex justify-end">
            <button className="text-sm font-bold text-blue-600 hover:underline">Forgot password?</button>
          </div>

          <button type='submit' disabled={isSubmitting} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
            Sign In
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative px-4 bg-white text-xs text-gray-400 uppercase font-bold">Or continue with</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
            <Chrome size={18} className="text-red-500" /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
            <Apple size={18} fill="black" /> Apple
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account? 
          <button onClick={onToggle} className="ml-1 font-bold text-blue-600 hover:underline">Sign up for free</button>
        </p>
      </div>
    </div>
  );
};





export default LoginForm