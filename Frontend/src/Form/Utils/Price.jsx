import React, { forwardRef } from 'react'
import { IndianRupee } from 'lucide-react'
import { useId } from 'react'
const Price=forwardRef(function price({
  innercolor,
  className="",
  ...props
},referance){

  const id=useId()
  return (
  <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">
      Price / Day
      </label>
      <div className="relative">
        <span className="absolute left-5 top-4 text-gray-400 font-bold">
          <IndianRupee size={15}/>
        </span>
        <input type="number" placeholder="0" className={`w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-${innercolor}-500 focus:bg-white transition-all font-black text-lg 
        ${className}`}
        id={id}
        ref={referance}
        {...props}
        />
      </div>             
  </div>
  )
})

export default Price
