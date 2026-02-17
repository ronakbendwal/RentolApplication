import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react';

function AddItemButton() {
  return (
    <div className="flex items-center">
      <Link 
        to='/categorypage' 
        className="group flex items-center gap-3 pl-1.5 pr-6 py-1.5 bg-white border-[3px] border-slate-900 rounded-full shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95 overflow-hidden relative"
      >
        <div className="bg-emerald-400 border-[2.5px] border-slate-900 p-2 rounded-full shadow-[2px_2px_0px_#000] group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
          <Plus 
             size={18} 
             strokeWidth={4}
             className="transition-transform duration-500 group-hover:rotate-180" 
          />
        </div>

        <div className="flex flex-col items-start">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-500 transition-colors leading-none mb-1">
            Publish
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-slate-900 leading-none">
          Item
          </span>
        </div>

        <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
      </Link>
    </div>
  )
}

export default AddItemButton;
