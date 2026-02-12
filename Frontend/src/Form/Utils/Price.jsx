// import React, { forwardRef } from 'react'
// import { IndianRupee } from 'lucide-react'
// import { useId } from 'react'
// const Price=forwardRef(function price({
//   innercolor,
//   className="",
//   ...props
// },referance){
//     const borderColorMap = {
//   emerald: "focus:border-emerald-500",
//   slate: "focus:border-slate-500",
//   indigo: "focus:border-indigo-500",
//   orange: "focus:border-orange-500",
//   cyan: "focus:border-cyan-500",
//   fuchsia: "focus:border-fuchsia-500",
//   blue: "focus:border-blue-500",
// };
//   const id=useId()
//   return (
//   <div className="space-y-2">
//       <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">
//       Price / Day
//       </label>
//       <div className="relative">
//         <span className="absolute left-5 top-4 text-gray-400 font-bold">
//           <IndianRupee size={15}/>
//         </span>
//         <input type="number" placeholder="0" className={`w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none ${borderColorMap[innercolor]} focus:bg-white transition-all font-black text-lg 
//         ${className}`}
//         id={id}
//         ref={referance}
//         {...props}
//         />
//       </div>             
//   </div>
//   )
// })

// export default Price

// import React, { forwardRef, useId } from 'react'
// import { IndianRupee } from 'lucide-react'

// const Price = forwardRef(function price({
//   innercolor,
//   className = "",
//   ...props
// }, reference) {

//   // Neo-Brutalist Focus Tints
//   const focusBgMap = {
//     emerald: "focus:bg-emerald-50",
//     slate: "focus:bg-slate-100",
//     indigo: "focus:bg-indigo-50",
//     orange: "focus:bg-orange-50",
//     cyan: "focus:bg-cyan-50",
//     fuchsia: "focus:bg-fuchsia-50",
//     blue: "focus:bg-blue-50",
//   };



//   const id = useId()

//   return (
//     <div className="space-y-3">
//       {/* Neo-Brutalist Label: Aggressive Bold & Uppercase */}
//       <label 
//         htmlFor={id}
//         className="text-xs font-[1000] text-slate-900 uppercase tracking-widest ml-1 flex items-center gap-2 italic"
//       >
//         <div className="w-2 h-2 bg-slate-900 rotate-45"></div>
//         Daily_Rental_Rate
//       </label>

//       <div className="relative group">
//         {/* Currency Icon Section - Boxed Style */}
//         <div className={`absolute left-0 top-0 h-full w-14 flex items-center justify-center border-r-[3px] border-slate-900 bg-amber-400 z-10 transition-colors group-focus-within:bg-white`}>
//           <IndianRupee size={20} strokeWidth={3} className="text-slate-900" />
//         </div>

//         <input 
//           type="number" 
//           placeholder="0.00" 
//           id={id}
//           ref={reference}
//           className={`
//             w-full pl-20 pr-5 py-4 
//             bg-slate-50 border-[3px] border-slate-900 
//             outline-none transition-all duration-100
//             font-[1000] text-2xl text-slate-900 placeholder:text-slate-200
//             shadow-[6px_6px_0px_#000]
//             focus:shadow-none focus:translate-x-1 focus:translate-y-1
//             ${focusBgMap[innercolor] || "focus:bg-white"} 
//             ${className}
//           `}
//           {...props}
//         />

//         {/* Floating Unit Indicator */}
//         <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
//           <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter opacity-40">
//             Per_24Hrs
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// })

// export default Price


import React, { forwardRef, useId } from 'react'
import { IndianRupee } from 'lucide-react'

const Price = forwardRef(function price({
  innercolor,
  className = "",
  ...props
}, reference) {

  // Neo-Brutalist Focus Tints
  const focusBgMap = {
    emerald: "focus:bg-emerald-50",
    slate: "focus:bg-slate-100",
    indigo: "focus:bg-indigo-50",
    orange: "focus:bg-orange-50",
    cyan: "focus:bg-cyan-50",
    fuchsia: "focus:bg-fuchsia-50",
    blue: "focus:bg-blue-50",
  };

  const id = useId()

  return (
    <div className="space-y-3">
      {/* Label adjusted to match exactly with Contact/Location */}
      <label 
        htmlFor={id}
        className="text-xs font-[1000] text-slate-900 uppercase tracking-widest ml-1 flex items-center gap-2 italic"
      >
        <IndianRupee size={14} strokeWidth={3} className="text-slate-900" />
        Daily Rental Rate
      </label>

      <div className="relative group">
        {/* Currency Box: Matches Height and Border of other fields */}
        <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center border-r-[3px] border-slate-900 bg-amber-400 z-10 transition-colors group-focus-within:bg-white">
          <IndianRupee size={16} strokeWidth={3} className="text-slate-900" />
        </div>

        <input 
          type="number"
          inputMode="numeric"
          placeholder="0.00" 
          id={id}
          ref={reference}
          className={`
            w-full pl-16 pr-5 py-4 
            no-spinner
            bg-slate-50 border-[3px] border-slate-900 
            outline-none transition-all duration-100
            font-bold text-slate-900 placeholder:text-slate-300
            shadow-[4px_4px_0px_#000]
            focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5
            ${focusBgMap[innercolor] || "focus:bg-white"} 
            ${className}
          `}
          {...props}
        />

        {/* Floating Unit Indicator - Subtle match */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none hidden md:block">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
            /DAY
          </span>
        </div>
      </div>
    </div>
  )
})

export default Price
