import React from 'react'
import { forwardRef } from 'react'
import { useId } from 'react'
import {} from 'lucide-react'
const Images= forwardRef(function images({
logoclass,
heading,
previews,
setPreview,
comparelength,
handleImageUpload
},referance) {
  const id=useId();
  return (

  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
    <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><ImageIcon size={20} 
    className={logoclass} />{heading}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {previews.map((src, index) => (
        <div key={index} className="relative aspect-square rounded-3xl overflow-hidden border border-gray-100 group">
          <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Preview" />
          <button onClick={() => setPreview(prev => prev.filter((_, i) => i !== index))} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors"><X size={14} /></button>
        </div>
      ))}
      {previews.length < {comparelength} && (
        <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all group">
          <Upload size={20} className={`text-gray-400 group-hover:${innerclass}`} />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Upload</span>
          <input type="file" multiple className="hidden" onChange={handleImageUpload} 
          />
        </label>
      )}
    </div>
  </div>

  )
})

export default Images