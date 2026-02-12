


// const Condition = ({ innercolor ,register, setValue, watch }) => {
//   const textColorMap = {
//   emerald: "text-emerald-600",
//   slate: "text-slate-600",
//   indigo: "text-indigo-600",
//   orange: "text-orange-600",
//   cyan: "text-cyan-600",
//   fuchsia: "text-fuchsia-600",
//   blue: "text-blue-600",
// };
//   const conditions = ["Good", "Bad", "Excellent"];
//   const condition = watch("condition");

//   const changeCondition = (value) => {
//     setValue("condition", value);
//   };

//   return (
//     <div className="space-y-2">
//       <label className="text-sm font-bold text-gray-700 ml-1">
//         Condition
//       </label>

//       <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
//         {conditions.map((item) => (
//           <button
//             key={item}
//             type="button"
//             onClick={() => changeCondition(item)}
//             className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all
//               ${
//                 condition === item
//                   ? `bg-white ${textColorMap[innercolor]} shadow-sm`
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//           >
//             {item}
//           </button>
//         ))}
//       </div>

//       {/* Registered field */}
//       <input
//         type="hidden"
//         {...register("condition", { required:true })}
//       />
//     </div>
//   );
// };

// export default Condition;

import React from 'react'

const Condition = ({ innercolor, register, setValue, watch }) => {
  // Neo-Brutalist Color Map for Active State
  const bgColorMap = {
    emerald: "bg-emerald-400",
    slate: "bg-slate-400",
    indigo: "bg-indigo-400",
    orange: "bg-orange-400",
    cyan: "bg-cyan-400",
    fuchsia: "bg-fuchsia-400",
    blue: "bg-blue-400",
  };

  const conditions = ["Bad", "Good", "Excellent"];
  const currentCondition = watch("condition");

  const changeCondition = (value) => {
    setValue("condition", value);
  };

  return (
    <div className="space-y-3">
      {/* Neo-Brutalist Label */}
      <label className="text-xs font-[1000] text-slate-900 uppercase tracking-widest ml-1 italic">
        Equipment Status
      </label>

      <div className="flex bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] p-1 overflow-hidden">
        {conditions.map((item) => {
          const isActive = currentCondition === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => changeCondition(item)}
              className={`
                flex-1 py-3 text-[11px] font-[1000] uppercase tracking-tighter transition-all duration-100
                ${
                  isActive
                    ? `${bgColorMap[innercolor] || 'bg-slate-900'} text-slate-900 border-[2px] border-slate-900`
                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                }
              `}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Hidden input for React Hook Form registration */}
      <input
        type="hidden"
        {...register("condition", { required: true })}
      />
    </div>
  );
};

export default Condition;