


const Condition = ({ innercolor ,register, setValue, watch }) => {
  const textColorMap = {
  emerald: "text-emerald-600",
  slate: "text-slate-600",
  indigo: "text-indigo-600",
  orange: "text-orange-600",
  cyan: "text-cyan-600",
  fuchsia: "text-fuchsia-600",
  blue: "text-blue-600",
};
  const conditions = ["Good", "Bad", "Excellent"];
  const condition = watch("condition");

  const changeCondition = (value) => {
    setValue("condition", value);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-gray-700 ml-1">
        Condition
      </label>

      <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
        {conditions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => changeCondition(item)}
            className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all
              ${
                condition === item
                  ? `bg-white ${textColorMap[innercolor]} shadow-sm`
                  : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Registered field */}
      <input
        type="hidden"
        {...register("condition", { required:true })}
      />
    </div>
  );
};

export default Condition;

