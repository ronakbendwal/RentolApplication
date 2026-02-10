import React, { useDeferredValue, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function FeedBackComponent({data}) {
  const [feedbackData,setFeedBackData]=useState([])
  useEffect(()=>{
    try{
      const fetchfeedback=async()=>{
        const response=await axios.get(`/api/user/getfeedback/${data._id}`)
        setFeedBackData(response.data.data)
      }
      fetchfeedback()
    }catch(err){
      console.log(err)
    }
  },[data])

    if (feedbackData?.length === 0) {
    return (
      <p className="text-sm font-bold text-slate-400">
        No feedback yet.
      </p>
    );
  }
  return(
    <>
  {feedbackData.slice(0 , 2).map((fb) => (
  <div key={fb._id} className="pb-8 border-b-2 border-slate-100">
    
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-3">
        
        {/* Avatar */}
         <div className="w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden bg-emerald-500 flex items-center justify-center">
         {fb.user?.image?.secure_url ? (
            <img
              src={fb.user.image.secure_url}
              alt={fb.user.fullname}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-black text-xs">
              {fb.user?.fullname?.charAt(0)}
            </span>
          )}
        </div>

        {/* Name + Time */}
        <div>
          <p className="text-sm font-black uppercase">{fb.user?.fullname}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase">
            {new Date(fb.createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>

    {/* Comment */}
    <p className="text-sm font-bold text-slate-600 leading-tight">
      “{fb.comment}”
    </p>

  </div>
))}
</>

  )
}
export default FeedBackComponent
