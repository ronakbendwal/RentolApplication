import React from 'react'
import { Camera,X,Save } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { setYourItemEditPageStatus } from '../redux/Feature/Status.js';
import { useState } from 'react';
function YourItemEditPage() {
  const {editStatus}=useSelector((state)=>state.youritemeditpagestatus)
  const dispatch=useDispatch();
  if(!editStatus) return ;
  return (
    <>
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Blur Background */}
          <div 
            className="absolute inset-0 bg-transparant-100/60 backdrop-blur-md transition-opacity"
            onClick={() => dispatch(setYourItemEditPageStatus(!editStatus))}
          />

          {/* Edit Form Card */}
          <div className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Edit Asset</h2>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Update your Rentol listing</p>
                </div>
                <button 
                  onClick={() => dispatch(setYourItemEditPageStatus(!editStatus))}
                  className="p-3 bg-slate-100 text-slate-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Image Edit Preview */}
                <div className="relative h-40 w-full rounded-[2rem] overflow-hidden group border-4 border-slate-50">
                  <img className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>

                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Title</label>
                    <input 
                      type="text" 
                      // value={} 
                      // onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 ring-emerald-500/20 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Price / Day</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 ring-emerald-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Category</label>
                   <select className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 focus:ring-2 ring-emerald-500/20 outline-none appearance-none">
                      <option>Photography</option>
                      <option>Electronics</option>
                      <option>Vehicle</option>
                   </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex gap-3">
                <button 
                  onClick={() => dispatch(setYourItemEditPageStatus(!editStatus))}
                  className="flex-grow py-4 bg-slate-100 text-slate-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all"
                >
                  Discard
                </button>
                <button className="flex-grow py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default YourItemEditPage


