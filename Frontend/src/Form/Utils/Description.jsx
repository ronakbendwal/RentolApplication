import { Info } from "lucide-react";
import { forwardRef, useId } from "react";
const FormDescription=forwardRef(function formdescription({
heading,
placeholder,
logoclass,
innercolor,
className="",
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
  const id=useId()
return( 
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
             <Info size={20} 
             className={logoclass} />
             {heading}
           </h2>
           <textarea
            rows="4" 
            placeholder={placeholder}
            className={`w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none 
            ${borderColorMap[innercolor]} focus:bg-white transition-all font-medium resize-none ${className}`}
            ref={referance}
            id={id}
            {...props}
            >
           </textarea>
          </div>
)
}
)
export default FormDescription;