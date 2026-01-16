import React from 'react'
import { useState } from 'react';
import { ImageIcon , Upload, X} from 'lucide-react';
const Images=({register,innercolor,setValue})=> {


  const [images, setImages] = useState([]);
  const [previews,setPreview]=useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previewURL = files.map(file => URL.createObjectURL(file));
    // setImages(prev => [...prev, ...newImages].slice(0, 6));
    setPreview(prev=>[...prev,...previewURL].slice(0,6))

    setImages(prev=>{
      const updatedImage=[...prev, ...files].slice(0,6)
      setValue('images',updatedImage)
      return updatedImage;
    })
  };
  return (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
      <ImageIcon size={20} 
      className={`text-${innercolor}-600`}/>
     Photos
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {previews.map((src, index) => (
        <div key={index} className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100 group">
          <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Preview" />
          <button onClick={() => setPreview(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors"><X size={14} /></button>
        </div>
      ))}
      {previews.length < 6 && (
        <label className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl cursor-pointer hover:border-${innercolor}-400 hover:bg-${innercolor}-50 transition-all group`}>
          <Upload size={20} className={`text-gray-400 group-hover:text-${innercolor}-500`} />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Upload</span>
          <input type="file" multiple className="hidden" onChange={handleImageUpload} 
          />
        </label>
      )}
    </div>
    <input
    type='hidden'
    {...register('images',{required:true})}
    />
  </div>
  )
}

export default Images
