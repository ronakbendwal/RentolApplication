import React from 'react'
import { LogOut } from 'lucide-react'
import {useSelector, useDispatch } from 'react-redux'
import { setSideBarStatus ,setLogoutStatus} from '../../redux/Feature/Status';

function Logout() {
  const {sideBarComponentStatus}=useSelector((state)=>state.componentstatus)
  const {logoutComponentStatus}=useSelector((state)=>state.componentstatus)

  const dispatch=useDispatch()
  return (
  <div className="pt-6 border-t border-gray-100">
     <button onClick={()=>{
      dispatch(setLogoutStatus(!logoutComponentStatus))
      console.log("in logout button component")
      dispatch(setSideBarStatus(!sideBarComponentStatus))
     }} className="flex items-center gap-3 w-full p-3   text-red-500 font-semibold hover:bg-red-50 rounded-xl transition-colors">
      <LogOut size={20} />
      Logout
    </button>
  </div>
  )
}

export default Logout
