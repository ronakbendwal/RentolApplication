import React, { useState } from 'react'

function Contact() {
  const [Value,setValue]=useState(null)
  return (
  <div className="space-y-2">
  <label className="text-sm font-bold text-gray-700 ml-1 text-xs uppercase tracking-tight">
    Contact / WhatsApp
  </label>
  <div className="relative">
    <MessageCircle className="absolute left-5 top-4 text-green-500" size={18} />
    <input type="tel" placeholder="Enter Contact/Whatsaap Number..."
    className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium"
    onChange={(e)=>{
      const enterdValue= e.target.value.replace("\/D/g","")
      if(enterdValue.length===10){
        setValue("+91",enterdValue)
      }
    }}
    />
  </div>
</div>
  )
}

export default Contact
