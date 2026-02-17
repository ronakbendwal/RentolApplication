import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { setLogoutStatus } from '../../redux/Feature/Status.js';
import { X,LogOut } from 'lucide-react';
import axios from 'axios'
import {logout} from '../../redux/Feature/Auth.js'
import {useNavigate} from 'react-router-dom';

function LogoutPremissionComponent() {
    
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const {logoutComponentStatus}=useSelector((state)=>state.componentstatus)
  if(!logoutComponentStatus) return null;

  const onCancel= () =>dispatch(setLogoutStatus(!logoutComponentStatus))

  const onConfirm=async() => {
    console.log("Logged out!")
    await axios.post('/api/user/logout-user',{}, { withCredentials: true })
    dispatch(logout())
    dispatch(setLogoutStatus(!logoutComponentStatus));
    navigate("/")
   }
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onCancel} // Close if they click outside the box
      />

      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Warning Icon */}
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <LogOut size={32} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Do you want to logout?
        </h2>
        <p className="text-gray-500 mb-8">
          You will need to enter your details again to access your account.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-100 active:scale-95"
          >
            Yes, Logout
          </button>
          
          <button 
            onClick={onCancel}

            className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all active:scale-95"
          >
            No, Stay logged in
          </button>
        </div>
      </div>
    </div>
  )
}

export default LogoutPremissionComponent
