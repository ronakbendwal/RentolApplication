// import React, { forwardRef, useId } from 'react'
// import { Map } from 'lucide-react';
// const Address=forwardRef(function Address({
//   innercolor,
//   className,
//   ...props
// },referance) {
//   const borderColorMap = {
//   emerald: "focus:border-emerald-500",
//   slate: "focus:border-slate-500",
//   indigo: "focus:border-indigo-500",
//   orange: "focus:border-orange-500",
//   cyan: "focus:border-cyan-500",
//   fuchsia: "focus:border-fuchsia-500",
//   blue: "focus:border-blue-500",
// };
//   const id =useId();
//   return (
//    <div className="space-y-2">
//     <label 
//     htmlFor={id}
//     className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"
//     >Full Pickup Address
//     </label>
//       <div 
//       className="relative">
//         <Map 
//         className="absolute left-5 top-4 text-gray-400" 
//         size={18}/>
//         <input 
//         type="text" 
//         placeholder="House No, Street Name, Landmark..." 
//         className={`w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none 
//         ${borderColorMap[innercolor]} focus:bg-white transition-all font-medium ${className}`}
//         {...props}
//         id={id}
//         ref={referance}
//         />
//       </div>
//    </div>
//   )
// })

// export default Address


import React, { forwardRef, useId } from 'react'
import { Home, Map } from 'lucide-react';

const Address = forwardRef(function Address({
  innercolor,
  className = "",
  ...props
}, reference) {
  
  // Neo-Brutalist Focus Background Colors (matching the specific form theme)
  const focusBgMap = {
    emerald: "focus:bg-emerald-50",
    slate: "focus:bg-slate-100",
    indigo: "focus:bg-indigo-50",
    orange: "focus:bg-orange-50",
    cyan: "focus:bg-cyan-50",
    fuchsia: "focus:bg-fuchsia-50",
    blue: "focus:bg-blue-50",
  };

  const id = useId();

  return (
    <div className="space-y-3">
      {/* Neo-Brutalist Label: Small, Bold, Uppercase, and Spaced */}
      <label 
        htmlFor={id}
        className="text-xs font-[1000] text-slate-900 uppercase italic tracking-widest flex items-center gap-2 ml-1"
      >
        <Home size={14} strokeWidth={3} className="text-slate-900" />
        Pickup Address
      </label>

      <div className="relative group">
        {/* The Icon - Bold stroke to match the theme */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
          <Home
            className={`text-${innercolor}-900 opacity-40 group-focus-within:opacity-100 transition-opacity`}
            size={18} 
            strokeWidth={3} 
          />
        </div>

        <input 
          id={id}
          ref={reference}
          type="text" 
          placeholder="HOUSE NO, STREET, LANDMARK..." 
          className={`
            w-full px-10 py-4 bg-slate-50 border-[3px] border-slate-900 outline-none focus:bg-blue-50 transition-all font-bold appearance-none shadow-[4px_4px_0px_#000] focus:shadow-none focus:translate-x-1 focus:translate-y-1

            ${focusBgMap[innercolor] || "focus:bg-white"} 
            ${className}
          `}
          {...props}
        />
        
        {/* Subtle decorative element common in Neo-Brutalism: Bottom line pop */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-900 opacity-10 group-focus-within:opacity-30"></div>
      </div>
    </div>
  )
})

export default Address


