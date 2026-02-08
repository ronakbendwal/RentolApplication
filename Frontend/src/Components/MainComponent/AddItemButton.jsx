import React from 'react'
import { Link } from 'react-router-dom'
import { CircleFadingPlus } from 'lucide-react';

function AddItemButton() {
  return (
    <div className="flex items-center">
      <Link 
        to='/categorypage' 
        className="flex items-center gap-2.5 pl-2 pr-5 py-1.5 bg-emerald-600 hover:bg-slate-900 text-white rounded-full shadow-lg shadow-emerald-100 transition-all duration-300 active:scale-95 group"
      >
        {/* Icon Container with Notification Dot */}
        <div className="relative bg-white/20 p-1.5 rounded-full group-hover:bg-emerald-500 transition-colors">
          <CircleFadingPlus 
             size={18} 
             className="transition-transform duration-500 group-hover:rotate-90" 
          />
          
          {/* Animated Notification Dot */}
          {/* <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200 border-2 border-emerald-600"></span>
          </span> */}
        </div>

        {/* Styled Text */}
        <div className="flex flex-col items-start">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-100 group-hover:text-emerald-400 leading-none mb-0.5 transition-colors">
            Item
          </span>
          {/* <span className="text-[13px] font-bold leading-none tracking-tight">
            Item
          </span> */}
        </div>
      </Link>
    </div>
  )
}

export default AddItemButton
