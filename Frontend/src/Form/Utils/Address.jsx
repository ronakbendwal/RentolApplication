import React, { forwardRef, useId } from 'react'
import { Map } from 'lucide-react';
const Address=forwardRef(function Address({
  innercolor,
  className,
  ...props
},referance) {
  const borderColorMap = {
  emerald: "focus:border-emerald-500",
  slate: "focus:border-slate-500",
  indigo: "focus:border-indigo-500",
  orange: "focus:border-orange-500",
  cyan: "focus:border-cyan-500",
  fuchsia: "focus:border-fuchsia-500",
  blue: "focus:border-blue-500",
};
  const id =useId();
  return (
   <div className="space-y-2">
    <label 
    htmlFor={id}
    className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5"
    >Full Pickup Address
    </label>
      <div 
      className="relative">
        <Map 
        className="absolute left-5 top-4 text-gray-400" 
        size={18}/>
        <input 
        type="text" 
        placeholder="House No, Street Name, Landmark..." 
        className={`w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none 
        ${borderColorMap[innercolor]} focus:bg-white transition-all font-medium ${className}`}
        {...props}
        id={id}
        ref={referance}
        />
      </div>
   </div>
  )
})

export default Address
