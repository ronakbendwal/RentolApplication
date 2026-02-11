// import React from 'react'
// import { Link } from 'react-router-dom'
// import { CircleFadingPlus } from 'lucide-react';

// function AddItemButton() {
//   return (
//     <div className="flex items-center">
//       <Link 
//         to='/categorypage' 
//         className="flex items-center gap-2.5 pl-2 pr-5 py-1.5 bg-emerald-600 hover:bg-slate-900 text-white rounded-full shadow-lg shadow-emerald-100 transition-all duration-300 active:scale-95 group"
//       >
//         {/* Icon Container with Notification Dot */}
//         <div className="relative bg-white/20 p-1.5 rounded-full group-hover:bg-emerald-500 transition-colors">
//           <CircleFadingPlus 
//              size={18} 
//              className="transition-transform duration-500 group-hover:rotate-90" 
//           />
          
//           {/* Animated Notification Dot */}
//           {/* <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200 border-2 border-emerald-600"></span>
//           </span> */}
//         </div>

//         {/* Styled Text */}
//         <div className="flex flex-col items-start">
//           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-100 group-hover:text-emerald-400 leading-none mb-0.5 transition-colors">
//             Item
//           </span>
//           {/* <span className="text-[13px] font-bold leading-none tracking-tight">
//             Item
//           </span> */}
//         </div>
//       </Link>
//     </div>
//   )
// }

// export default AddItemButton


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
        {/* ICON BLOCK - Sharp & Contrasty */}
        <div className="bg-emerald-400 border-[2.5px] border-slate-900 p-2 rounded-full shadow-[2px_2px_0px_#000] group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
          <Plus 
             size={18} 
             strokeWidth={4}
             className="transition-transform duration-500 group-hover:rotate-180" 
          />
        </div>

        {/* TEXT BLOCK - Bold Brutalist Style */}
        <div className="flex flex-col items-start">
          {/* <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-500 transition-colors leading-none mb-1">
            Publish
          </span> */}
          <span className="text-xs font-black uppercase tracking-widest text-slate-900 leading-none">
          Item
          </span>
        </div>

        {/* Subtle Background Glow on Hover */}
        <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
      </Link>
    </div>
  )
}

export default AddItemButton;
