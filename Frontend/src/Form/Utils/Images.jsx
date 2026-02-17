// import React from 'react'
// import { useState } from 'react';
// import { ImageIcon , Upload, X} from 'lucide-react';
// const Images=({register,innercolor,setValue})=> {

//   const imageColorMap = {
//   emerald: {
//     icon: "text-emerald-600",
//     hoverBorder: "hover:border-emerald-400",
//     hoverBg: "hover:bg-emerald-50",
//     hoverIcon: "group-hover:text-emerald-500",
//   },
//   slate: {
//     icon: "text-slate-600",
//     hoverBorder: "hover:border-slate-400",
//     hoverBg: "hover:bg-slate-50",
//     hoverIcon: "group-hover:text-slate-500",
//   },
//   indigo: {
//     icon: "text-indigo-600",
//     hoverBorder: "hover:border-indigo-400",
//     hoverBg: "hover:bg-indigo-50",
//     hoverIcon: "group-hover:text-indigo-500",
//   },
//   orange: {
//     icon: "text-orange-600",
//     hoverBorder: "hover:border-orange-400",
//     hoverBg: "hover:bg-orange-50",
//     hoverIcon: "group-hover:text-orange-500",
//   },
//   cyan: {
//     icon: "text-cyan-600",
//     hoverBorder: "hover:border-cyan-400",
//     hoverBg: "hover:bg-cyan-50",
//     hoverIcon: "group-hover:text-cyan-500",
//   },
//   fuchsia: {
//     icon: "text-fuchsia-600",
//     hoverBorder: "hover:border-fuchsia-400",
//     hoverBg: "hover:bg-fuchsia-50",
//     hoverIcon: "group-hover:text-fuchsia-500",
//   },
//   blue: {
//     icon: "text-blue-600",
//     hoverBorder: "hover:border-blue-400",
//     hoverBg: "hover:bg-blue-50",
//     hoverIcon: "group-hover:text-blue-500",
//   },
// };


//   const colors=imageColorMap[innercolor]
//   const [images, setImages] = useState([]);
//   const [previews,setPreview]=useState([]);

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const previewURL = files.map(file => URL.createObjectURL(file));
//     // setImages(prev => [...prev, ...newImages].slice(0, 6));
//     setPreview(prev=>[...prev,...previewURL].slice(0,6))

//     setImages(prev=>{
//       const updatedImage=[...prev, ...files].slice(0,6)
//       setValue('images',updatedImage)
//       return updatedImage;
//     })
//   };
//   return (
//   <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
//     <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
//       <ImageIcon size={20} 
//       className={`${colors?.icon}`}/>
//      Photos
//     </h2>
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
//       {previews.map((src, index) => (
//         <div key={index} className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100 group">
//           <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Preview" />
//           <button onClick={() => setPreview(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors"><X size={14} /></button>
//         </div>
//       ))}
//       {previews.length < 6 && (
//         <label className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl cursor-pointer ${colors?.hoverBorder} ${colors?.hoverBg} transition-all group`}>
//           <Upload size={20} className={`text-gray-400 ${colors?.hoverIcon}`} />
//           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Upload</span>
//           <input type="file" multiple className="hidden" onChange={handleImageUpload} 
//           />
//         </label>
//       )}
//     </div>
//     <input
//     type='hidden'
//     {...register('images',{required:true})}
//     />
//   </div>
//   )
// }

// export default Images


import React, { useEffect, useState } from 'react'
import { Camera, Home, ImageIcon, Upload, Watch, X } from 'lucide-react';

const Images = ({ register, innercolor, setValue,watch }) => {

  const imageColorMap = {
    emerald: "bg-emerald-400 text-emerald-950",
    slate: "bg-slate-400 text-slate-950",
    indigo: "bg-indigo-400 text-indigo-950",
    orange: "bg-orange-400 text-orange-950",
    cyan: "bg-cyan-400 text-cyan-950",
    fuchsia: "bg-fuchsia-400 text-fuchsia-950",
    blue: "bg-blue-400 text-blue-950",
  };

  const activeColor = imageColorMap[innercolor] || "bg-slate-400 text-slate-950";

  const [images, setImages] = useState([]);
  const [previews, setPreview] = useState([]);
  const [initalize,setInitalize]=useState(false)

  const formimages=watch ? watch("images") :[]
  
  useEffect(()=>{

    if(!initalize && formimages?.length>0){

      const urls=formimages.map(
        object=> object.url);
      setPreview(urls);
      setImages(formimages)

      setInitalize(true)
      }
  },[formimages,initalize])


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previewURL = files.map(file => URL.createObjectURL(file));
  
    const updatedImage=[...images,...files].slice(0,6);
    setPreview(prev => [...prev, ...previewURL].slice(0, 6));
    setImages(updatedImage);
    setValue('images',updatedImage)
  };

  const removeImage = (index) => {
    const updatedImage=images.filter((_,i)=>i!==index);
    const updatedPreview=previews.filter((_,i)=>i!==index)
    setPreview(updatedPreview);
    setImages(updatedImage);
    setValue('images',updatedImage)
  };

  return (
    <div className="bg-white border-[4px] border-slate-900 shadow-[8px_8px_0px_#000] p-8">
      {/* Header Section */}
      <div 
      className="flex items-center justify-between   border-slate-900 "
      >
        <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase italic tracking-tight">
         <Camera size={22} className={`text-${innercolor}-600`} strokeWidth={3} /> 03. Item Image's
        </h2>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          Max Capacity: 06 Files
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {previews.map((src, index) => (
          <div key={index} className="relative group aspect-square bg-slate-100 border-[3px] border-slate-900 shadow-[4px_4px_0px_#000] overflow-hidden transition-transform hover:-translate-y-1">
            <img 
              src={src} 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300" 
              alt="Preview" 
            />
            {/* Delete Button - Sharp Neo Style */}
            {images.length>1 ? <button 
              type="button"
              onClick={() => removeImage(index)} 
              className="absolute top-0 right-0 bg-rose-500 border-l-[3px] border-b-[3px] border-slate-900 p-2 text-white hover:bg-rose-600 transition-colors shadow-none"
            >
              <X size={16} strokeWidth={3} />
            </button> : null}
            <div className="absolute bottom-0 left-0 right-0 bg-slate-900/10 h-1 group-hover:bg-slate-900 transition-colors" />
          </div>
        ))}

        {previews.length < 6 && (
          <label className={`
            aspect-square flex flex-col items-center justify-center 
            border-[3px] border-dashed border-slate-900 
            bg-slate-50 cursor-pointer transition-all 
            hover:bg-white hover:shadow-[4px_4px_0px_#000] hover:-translate-x-1 hover:-translate-y-1
            group active:translate-x-0 active:translate-y-0 active:shadow-none
          `}>
            <div className={`p-4 rounded-full border-[2px] border-slate-900 mb-3 group-hover:rotate-12 transition-transform ${activeColor}`}>
              <Upload size={24} strokeWidth={3} />
            </div>
            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">
              Add Media
            </span>
            <input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleImageUpload} 
              accept="image/*"
            />
          </label>
        )}
      </div>

      {/* Hidden input for React Hook Form */}
      <input type='hidden' {...register('images', { required: true })} />
    </div>
  );
}

export default Images;
