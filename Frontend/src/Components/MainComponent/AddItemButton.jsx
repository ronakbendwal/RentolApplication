import React from 'react'
import {Link} from 'react-router-dom'
function AddItemButton() {
  return (
    <div>
      <Link to='/categorypage' className="px-6 py-2.5 bg-emerald-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-100 transition-all active:scale-95">
         Add Item
      </Link>
    </div>
  )
}

export default AddItemButton
