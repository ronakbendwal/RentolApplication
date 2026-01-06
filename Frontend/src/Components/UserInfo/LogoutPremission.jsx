import React, { useState } from 'react'
import LogoutModal from '../MainComponent/LogoutConfirmation';
function LogoutPremission() {
  const [showLogoutConfirm,setShowLogoutConfirm]=useState(false)
  return (
    <>
    {showLogoutConfirm && <LogoutModal isOpen={showLogoutConfirm} 
       onCancel={() => setShowLogoutConfirm(false)}
       onConfirm={() => {
       console.log("Logged out!");
            // Add your logout logic here
       setShowLogoutConfirm(false);
       }}/>}
   </>
  )
}

export default LogoutPremission
