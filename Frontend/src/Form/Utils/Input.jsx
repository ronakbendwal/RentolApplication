import { forwardRef, useId } from 'react'

const FormInput=forwardRef(function input({
  placeholder,
  label,
  type='text',
  className="",
  innercolor,
  ...props
},referance){
  const id=useId()
  return (
    <div className="space-y-2">
       <label
        htmlFor={id}
        className="text-sm font-bold text-gray-700 ml-1">
         {label}
       </label>
    <input 
     type={type} 
     placeholder={placeholder}
     className={`w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-${innercolor}-500 focus:bg-white transition-all font-medium ${className}`} 
     id={id}
     ref={referance}
     {...props}
  />
   </div>
  )
})

export default FormInput
