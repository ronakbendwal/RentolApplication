// import { forwardRef, useId } from 'react'

// const FormInput=forwardRef(function input({
//   placeholder,
//   label,
//   type='text',
//   className="",
//   innercolor,
//   ...props
// },referance){
//   const borderColorMap = {
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
//     <div className="space-y-2">
//        <label
//         htmlFor={id}
//         className="text-sm font-bold text-gray-700 ml-1">
//          {label}
//        </label>
//     <input 
//      type={type} 
//      placeholder={placeholder}
//      className={`w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none  
//      ${borderColorMap[innercolor]} focus:bg-white transition-all font-medium ${className}`} 
//      id={id}
//      ref={referance}
//      {...props}
//   />
//    </div>
//   )
// })

// export default FormInput


import { forwardRef, useId } from 'react'

const FormInput = forwardRef(function input({
  placeholder,
  label,
  type = 'text',
  className = "",
  innercolor,
  ...props
}, reference) {

  // Neo-Brutalist Focus Backgrounds (matching the form theme)
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
      {/* Neo-Brutalist Label: Bold, Uppercase, and Spaced */}
      <label
        htmlFor={id}
        className="text-xs font-[1000] text-slate-900 uppercase tracking-[0.15em] ml-1 italic"
      >
        {label || "INPUT FIELD"}
      </label>

      <div className="relative group">
        <input 
          type={type} 
          placeholder={placeholder?.toUpperCase() || "ENTER DATA..."}
          id={id}
          ref={reference}
          className={`
            w-full px-5 py-4 
            bg-slate-50 border-[3px] border-slate-900 
            outline-none transition-all duration-100
            font-bold text-slate-900 placeholder:text-slate-300
            shadow-[4px_4px_0px_#000]
            focus:shadow-none focus:translate-x-1 focus:translate-y-1
            ${focusBgMap[innercolor] || "focus:bg-white"} 
            ${className}
          `} 
          {...props}
        />
        
        {/* Decorative corner accent - common in neo-brutalist designs */}
        <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-slate-900 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
      </div>
    </div>
  )
})

export default FormInput
