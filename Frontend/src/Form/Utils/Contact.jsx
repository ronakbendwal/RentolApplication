import React, { useState } from 'react'
import { Phone } from 'lucide-react'
import { forwardRef } from 'react'
import { useId } from 'react'
const Contact=forwardRef(function contact({
innercolor,
className,
...props
},referance){
  const borderColorMap = {
  emerald: "focus:border-emerald-500",
  slate: "focus:border-slate-500",
  indigo: "focus:border-indigo-500",
  orange: "focus:border-orange-500",
  cyan: "focus:border-cyan-500",
  fuchsia: "focus:border-fuchsia-500",
  blue: "focus:border-blue-500",
};
  const id= useId()
  return(
  <div className="space-y-2">
    <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">Contact WhatsApp</label>
    <div className="relative">
      <Phone className="absolute left-5 top-4 text-green-500" size={18} />
      <input type="tel" placeholder="+91..."
      className={`w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none 
      ${borderColorMap[innercolor]} focus:bg-white transition-all font-medium ${className}`}
    
      ref={referance}
      {...props}
      id={id}
      />
    </div>
  </div>
  )
})

export default Contact
