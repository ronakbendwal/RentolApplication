import React from 'react';
import { Mail, Lock, Chrome, Apple , User, ShieldCheck} from 'lucide-react';

const SignupForm = ({ onToggle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-blue-600 tracking-tight mb-2">Create Account</h1>
          <p className="text-gray-500 font-medium">Join Rentol to start renting today.</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Create Password"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-start gap-2 py-2">
            <input type="checkbox" className="mt-1 rounded text-blue-600 focus:ring-blue-500" />
            <p className="text-xs text-gray-500 leading-relaxed">
              I agree to the <span className="text-blue-600 underline">Terms of Service</span> and <span className="text-blue-600 underline">Privacy Policy</span>.
            </p>
          </div>

          <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? 
            <button onClick={onToggle} className="ml-1 font-bold text-blue-600 hover:underline">Log in here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm