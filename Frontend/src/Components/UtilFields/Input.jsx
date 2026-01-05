import React, { forwardRef, useId } from 'react'

const Input =forwardRef(function input({
  type='text',
  className="",
  placeholder,
},referance) {
  const id=useId();
  return (
    <input 
    type={type} 
    placeholder={placeholder}
    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
    focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${className}`}
    ref={referance}
    id={id}
    />
  )
})

export default Input
