import React from 'react'
import { ShieldCheck,ArrowRight } from 'lucide-react'
const SubmitButton=({innercolor,isSubmitting})=> {

const badgeColorMap = {
  emerald: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  slate: "bg-slate-50 text-slate-600 border border-slate-100",
  indigo: "bg-indigo-50 text-indigo-600 border border-indigo-100",
  orange: "bg-orange-50 text-orange-600 border border-orange-100",
  cyan: "bg-cyan-50 text-cyan-600 border border-cyan-100",
  fuchsia: "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-100",
  blue: "bg-blue-50 text-blue-600 border border-blue-100",
};
return (
 <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
       <div className="flex items-center gap-3">
      <div 
         className={`w-10 h-10  rounded-full flex items-center justify-center ${badgeColorMap[innercolor]}`}>
         <ShieldCheck 
         size={20} />
         </div> 
           <p 
           className="text-[11px] text-gray-400 font-bold leading-tight max-w-[200px]">
           Safety is priority. Ensure brakes and tires are checked before listing.
           </p> 
         </div>
      <button 
      disabled={isSubmitting} 
      type='submit' 
      className="w-full md:w-auto px-14 py-5 bg-gray-900 hover:bg-black text-white font-black rounded-full shadow-2xl transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
        List My Bike 
        <ArrowRight size={20} />
      </button>
  </div>
  )
}

export default SubmitButton
