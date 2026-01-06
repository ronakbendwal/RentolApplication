import React from 'react'
import { LogOut } from 'lucide-react'
function Logout({status}) {
  return (
  <div className="pt-6 border-t border-gray-100">
     <button onClick={()=>status(prev=> !prev)} className="flex items-center gap-3 w-full p-3   text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-colors">
      <LogOut size={20} />
      Logout
    </button>
  </div>
  )
}

export default Logout
