// import { Info } from "lucide-react";
// import { forwardRef, useId } from "react";
// const FormDescription=forwardRef(function formdescription({
// heading,
// placeholder,
// logoclass,
// innercolor,
// className="",
// ...props
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
// return( 
//           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//              <Info size={20} 
//              className={logoclass} />
//              {heading}
//            </h2>
//            <textarea
//             rows="4" 
//             placeholder={placeholder}
//             className={`w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none 
//             ${borderColorMap[innercolor]} focus:bg-white transition-all font-medium resize-none ${className}`}
//             ref={referance}
//             id={id}
//             {...props}
//             >
//            </textarea>
//           </div>
// )
// }
// )
// export default FormDescription;


import { Info } from "lucide-react";
import { forwardRef, useId } from "react";

const FormDescription = forwardRef(function formdescription({
  heading,
  placeholder,
  logoclass,
  innercolor,
  className = "",
  ...props
}, reference) {

  // Neo-Brutalist Focus Backgrounds
  const focusBgMap = {
    emerald: "focus:bg-emerald-50",
    slate: "focus:bg-slate-50",
    indigo: "focus:bg-indigo-50",
    orange: "focus:bg-orange-50",
    cyan: "focus:bg-cyan-50",
    fuchsia: "focus:bg-fuchsia-50",
    blue: "focus:bg-blue-50",
  };

  const id = useId();

  return (
    <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] overflow-hidden">
      {/* Header Section with Divider */}
      <div className="bg-slate-50 p-6 border-b-[4px] border-slate-900 flex items-center gap-3">
        <div className={`p-2 bg-white border-[2px] border-slate-900 shadow-[2px_2px_0px_#000] ${logoclass}`}>
          <Info size={20} strokeWidth={3} />
        </div>
        <h2 className="text-xl font-[1000] text-slate-900 uppercase italic tracking-tighter">
          {heading}
        </h2>
      </div>

      {/* Textarea Section */}
      <div className="p-6">
        <textarea
          id={id}
          ref={reference}
          rows="5"
          placeholder={placeholder?.toUpperCase()}
          className={`
            w-full px-6 py-5 
            bg-white border-[3px] border-slate-900 
            outline-none transition-all 
            font-bold text-slate-900 placeholder:text-slate-300
            shadow-[4px_4px_0px_#000]
            focus:shadow-none focus:translate-x-1 focus:translate-y-1
            ${focusBgMap[innercolor] || "focus:bg-slate-50"} 
            resize-none 
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
});

export default FormDescription;