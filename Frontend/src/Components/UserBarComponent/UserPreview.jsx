import React from 'react'
import { User } from 'lucide-react'
function UserPreview() {
  return (
     <div className="flex items-center gap-4 mb-8 p-4 bg-blue-50 rounded-2xl">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <User size={24} />
            </div>
            <div>
              <p className="font-bold text-gray-900">Ishika Borasi</p>
              {/* <p className="text-xs text-blue-600">Premium Member</p> */}
            </div>
          </div>
  )
}

export default UserPreview
