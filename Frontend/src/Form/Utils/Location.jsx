// import { MapPin } from 'lucide-react'
// import { forwardRef } from 'react'
// import { useId } from 'react'
// const Location=forwardRef(function Location({
//   innercolor,
//   className,
//   ...props
//  },referance){
//   const borderColorMap = {
//   emerald: "focus:border-emerald-500",
//   slate: "focus:border-slate-500",
//   indigo: "focus:border-indigo-500",
//   orange: "focus:border-orange-500",
//   cyan: "focus:border-cyan-500",
//   fuchsia: "focus:border-fuchsia-500",
//   blue: "focus:border-blue-500",
// };
// const id=useId();

// return (

// <div className="space-y-2">
//   <label 
//   className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight"
//   >City / Area
//   </label>
//   <div className="relative">
//     <MapPin 
//     className="absolute left-5 top-4 text-red-400" 
//     size={18} 
//     />
//     <input 
//     type="text" 
//     placeholder="City / Area" 
//     className={`w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none  
//     ${borderColorMap[innercolor]} focus:bg-white transition-all font-medium ${className}`}
//     {...props}
//     id={id}
//     ref={referance}
//     />
//   </div>
// </div>

// )
// })

// export default Location


import { MapPin } from 'lucide-react'
import { forwardRef, useId } from 'react'

const Location = forwardRef(function Location({
  innercolor,
  className = "",
  ...props
}, reference) {
  
  // Neo-Brutalist Focus Tints (matching the project-wide theme)
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
      {/* Neo-Brutalist Label: Bold and Technical */}
      <label 
        htmlFor={id}
        className="text-xs font-[1000] text-slate-900 uppercase tracking-widest ml-1 flex items-center gap-2 italic"
      >
        <MapPin size={14} strokeWidth={3} className="text-rose-500" />
        City / State
      </label>

      <div className="relative group">
        {/* MapPin Icon with Heavy Weight */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
          <MapPin 
            className="text-rose-500 group-focus-within:animate-bounce transition-all duration-300" 
            size={18} 
            strokeWidth={3} 
          />
        </div>

        <input 
          id={id}
          ref={reference}
          type="text" 
          placeholder="ITEM LOCATION..." 
          className={`
            w-full pl-14 pr-5 py-4 
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
        
      </div>
    </div>
  )
})

export default Location