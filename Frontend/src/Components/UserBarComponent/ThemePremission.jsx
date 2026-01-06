
import React from 'react'
import { SunMoon,X,Moon,Sun} from 'lucide-react' 
import {useSelector,useDispatch} from 'react-redux'
import setThemeMode from '../../redux/Feature/Theme.js'
function ThemePermission() {
  
  const dispatch=useDispatch()
  const {themeMode}=useSelector((state)=>state.theme)
  const onChangeBtn=(e)=>{
    const checked=e.target.checked;
    if(checked){
      dispatch((setThemeMode("dard")))
    }else{
      dispatch(setThemeMode("light"))
    }
  }

  return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md animate-in fade-in duration-300"
        // onClick={} // Close if they click outside the box
      />

      {/* 2. Modal Square Component */}
      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
        
        {/* Close Icon (Optional) */}
        <button 
          // onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Warning Icon */}
        <div className={`w-16 h-16  ${themeMode==="dark"? " bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {themeMode==="dark" ? <SunMoon size={32} /> : <Sun size={32}/>}
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Change the apperence
        </h2>
        <p className="text-gray-500 mb-8">
          You can change the apperence / theme here
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={onChangeBtn}
                checked={themeMode=== "dark"}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">Toggle Theme</span>
        </label>
       
        </div>
      </div>
    </div>
  )
}

export default ThemePermission;
