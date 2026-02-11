import React from 'react'
import { User } from 'lucide-react';
import {useSelector} from 'react-redux'
function UserPreview() {
  const {data,status}=useSelector((state)=>state.auth)
  if(!status) return null
  return (
     <div className="flex items-center gap-4 mb-8 p-4 bg-blue-50 rounded-2xl">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
              { data?.data?.image?.url ? (   
              <img
              src={data?.data?.image?.url}
              className=' w-12 h-12 rounded-full'
              />
              )
                :( <User size={24} />) 
              }
            </div>
            <div>
              <p className="font-bold text-gray-900">{data?.data?.username}</p>
              {/* <p className="text-xs text-blue-600">Premium Member</p> */}
            </div>
          </div>
  )
}

export default UserPreview
