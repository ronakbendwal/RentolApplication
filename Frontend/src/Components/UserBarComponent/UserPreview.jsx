import React from 'react'
import { User } from 'lucide-react';
import {useSelector} from 'react-redux'
function UserPreview() {
  const {data,status}=useSelector((state)=>state.auth)
  if(!status) return null
  console.log("from user preview")
  console.log(data.data.username)
  const {profileImage}=useSelector((state)=>state.profilepicture)
  return (
     <div className="flex items-center gap-4 mb-8 p-4 bg-blue-50 rounded-2xl">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
              { profileImage ? (   
              <img
              src={profileImage}
              className=' w-12 h-12 rounded-full'
              />
              )
                :( <User size={24} />) 
              }
            </div>
            <div>
              <p className="font-bold text-gray-900">{data.data.username}</p>
              {/* <p className="text-xs text-blue-600">Premium Member</p> */}
            </div>
          </div>
  )
}

export default UserPreview
