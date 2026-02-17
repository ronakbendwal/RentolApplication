import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Trash2, Plus, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { setYourItemEditPageStatus } from "../../redux/Feature/Status.js";
import axios from 'axios';
const EditItemImages = ({ existingImages=[], itemId }) => {
  console.log(itemId)
  const dispatch = useDispatch();
  const  {YIEPStatus}= useSelector((state)=>state.componentstatus)
  const [isSyncing, setIsSyncing] = useState(false);
  const [oldImages, setOldImages]=useState(existingImages)
  const [newImages,setNewImages]=useState([])
  // Jab YIEPStatus false ho toh component render nahi hoga (Open/Close Logic)
  if (YIEPStatus===null) return null;


  console.log(oldImages)
  const removeOldImage = (publicid) => {
    setOldImages((prev) =>
      prev.filter((img) => img.publicid !== publicid)
    );
  };

  const removeNewImage = (index) => {
    setNewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

    const addImageHandler = (e) => {
    const files = Array.from(e.target.files);
    const previewFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setNewImages((prev) => [...prev, ...previewFiles]);
  };

  const saveImages = async () => {
    try {
      setIsSyncing(true);
      // form data
      const formData = new FormData();
      formData.append("itemId", itemId);
      // old images send karo
      formData.append("oldImages",JSON.stringify(oldImages));
      // new images send karo
      newImages.forEach((img) => {formData.append("images", img.file)})

      //api call here
      const response=await axios.patch(`/api/user/uploadimages/${itemId}`,formData)
      console.log(response.data.data)
    dispatch(setYourItemEditPageStatus(null))
    }catch(err){
      console.log(err)
    }finally{
      setIsSyncing(false)
    }}

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop: Aapke logout overlay jaisa solid dark effect */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => dispatch(setYourItemEditPageStatus(null))}
      ></div>

      {/* OVERLAY CONTENT */}
      <div className="relative w-full max-w-2xl bg-white border-[6px] border-black shadow-[15px_15px_0px_#000] p-8 md:p-10 animate-in zoom-in duration-200">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div className="bg-yellow-400 border-[4px] border-black p-4 shadow-[6px_6px_0px_#000] -rotate-1">
            <h2 className="text-2xl font-[1000] uppercase tracking-tighter flex items-center gap-3">
              <ImageIcon size={28} /> Rental Gallery Manager
            </h2>
            <p className="text-[10px] font-black uppercase mt-1 opacity-70">ID: {itemId?.slice(-8)}</p>
          </div>
          
          <button 
            onClick={() => dispatch(setYourItemEditPageStatus(null))}
            className="p-3 bg-black text-white border-[3px] border-white shadow-[4px_4px_0px_#facc15] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
          {oldImages?.map((img, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-slate-100 border-[4px] border-black shadow-[4px_4px_0px_#000] overflow-hidden">
                <img src={img.url} alt="asset" className="w-full h-full object-cover" />
              </div>
              {/* Delete Mini Button */} 
              <button 
              onClick={()=>removeOldImage(img.publicid)}
              className="absolute -top-2 -right-2 w-10 h-10 bg-rose-500 text-white border-[3px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all">
                <Trash2 size={16} strokeWidth={3} />
              </button>
            </div>
          ))}

          {/* new images */}
          {newImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.preview}
                className="h-32 w-full object-cover"
              />
              <button
                onClick={() =>
                  removeNewImage(index)
                }
                className="absolute top-0 right-0 bg-red-500 text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {/* Add New Slot */}
          <label className="aspect-square border-[4px] border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
             <Plus size={32} className="text-slate-400" />
             <span className="text-[10px] uppercase font-black text-slate-400">Add New image</span>
             <input type="file" className="hidden" onChange={addImageHandler} />
          </label>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col md:flex-row gap-4 border-t-[4px] border-black border-dashed pt-8">
           <button
           onClick={saveImages}
            disabled={isSyncing}
            className="flex-1 py-5 bg-indigo-600 text-white border-[4px] border-black font-[1000] uppercase tracking-widest text-sm shadow-[6px_6px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-3"
           >
             {isSyncing ? <RefreshCw className="animate-spin" /> : "Save Images"}
           </button>
           
           <button 
             onClick={() => dispatch(setYourItemEditPageStatus(null))}
             className="px-8 py-5 bg-white border-[4px] border-black font-[1000] uppercase text-sm tracking-widest"
           >
             Discard
           </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemImages;