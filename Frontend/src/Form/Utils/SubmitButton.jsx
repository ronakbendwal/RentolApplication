// import React from 'react'
// import { ShieldCheck,ArrowRight } from 'lucide-react'
// const SubmitButton=({innercolor,isSubmitting,name})=> {

// const badgeColorMap = {
//   emerald: "bg-emerald-50 text-emerald-600 border border-emerald-100",
//   slate: "bg-slate-50 text-slate-600 border border-slate-100",
//   indigo: "bg-indigo-50 text-indigo-600 border border-indigo-100",
//   orange: "bg-orange-50 text-orange-600 border border-orange-100",
//   cyan: "bg-cyan-50 text-cyan-600 border border-cyan-100",
//   fuchsia: "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100",
//   blue: "bg-blue-50 text-blue-600 border border-blue-100",
// };
// return (
//  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
//        <div className="flex items-center gap-3">
//       <div 
//          className={`w-10 h-10  rounded-full flex items-center justify-center ${badgeColorMap[innercolor]}`}>
//          <ShieldCheck 
//          size={20} />
//          </div> 
//            <p 
//            className="text-[11px] text-gray-400 font-bold leading-tight max-w-[200px]">
//            Safety is priority. Ensure brakes and tires are checked before listing.
//            </p> 
//          </div>
//       <button 
//       disabled={isSubmitting} 
//       onClick={()=>console.log("inside submit button")}
//       type='submit' 
//       className="w-full md:w-auto px-14 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
//         List My {name}
//         <ArrowRight size={20} />
//       </button>
//   </div>
//   )
// }

// export default SubmitButton


import React from 'react'
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react'

const SubmitButton = ({ innercolor, isSubmitting, name }) => {

  const accentColorMap = {
    emerald: "bg-emerald-400",
    slate: "bg-slate-400",
    indigo: "bg-indigo-400",
    orange: "bg-orange-400",
    cyan: "bg-cyan-400",
    fuchsia: "bg-fuchsia-400",
    blue: "bg-blue-400",
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-40 py-10  mt-10">
      
      {/* Safety Notice - Brutalist Style */}
      <div className="flex items-center gap-4 group">
        <div className={`w-12 h-12 border-[3px] border-slate-900 flex items-center justify-center shadow-[3px_3px_0px_#000] ${accentColorMap[innercolor] || 'bg-yellow-400'}`}>
          <ShieldCheck size={24} strokeWidth={3} className="text-slate-900" />
        </div> 
        <div className="max-w-[240px]">
          <p className="text-[10px] text-slate-900 font-[1000] uppercase tracking-tighter leading-none italic">
            Safety_Protocol_v3.1
          </p>
          <p className="text-[11px] text-slate-500 font-bold leading-tight mt-1 uppercase">
            Verify all mechanical components and safety gear before finalizing the registry.
          </p> 
        </div>
      </div>

      {/* Main Submit Button */}
      <button 
        disabled={isSubmitting} 
        type='submit' 
        className={`
          relative w-full md:w-auto px-10 py-5 
          border-[4px] border-slate-900 font-[1000] uppercase tracking-widest text-sm
          transition-all duration-100 flex items-center justify-center gap-4
          ${isSubmitting 
            ? "bg-slate-200 text-slate-400 cursor-not-allowed translate-x-0 translate-y-0 shadow-none" 
            : `bg-slate-900 text-white hover:bg-slate-800 shadow-[6px_6px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1`
          }
        `}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} strokeWidth={3} />
            Listing...
          </>
        ) : (
          <>
            {name ? (`List My ${name?.toUpperCase()}`) : "SAVE CHANGES"}
            <ArrowRight size={20} strokeWidth={3} />
          </>
        )}
        
        {/* Decorative corner dots for industrial look */}
        {!isSubmitting && (
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-slate-900"></div>
        )}
      </button>
    </div>
  )
}

export default SubmitButton
