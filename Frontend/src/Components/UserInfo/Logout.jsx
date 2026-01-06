import React from 'react'
import { LogOut } from 'lucide-react'
import {useSelector, useDispatch } from 'react-redux'
import { setIsLogoutConform } from '../../redux/Feature/LogoutUi'
function Logout() {
  const IsLogoutConform=useSelector((state)=>state.logoutState.isLogoutConform)
  console.log(IsLogoutConform)
  const dispatch=useDispatch()
  return (
  <div className="pt-6 border-t border-gray-100">
     <button onClick={()=>dispatch(setIsLogoutConform(!IsLogoutConform))} className="flex items-center gap-3 w-full p-3   text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-colors">
      <LogOut size={20} />
      Logout
    </button>
  </div>
  )
}

export default Logout
