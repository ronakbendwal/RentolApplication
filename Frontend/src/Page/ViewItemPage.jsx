import React, { useState, useEffect } from 'react';
import { 
  MapPin, Star, Heart, Share2, ShieldCheck, 
  ArrowLeft, Zap, Phone, Box, Info, Layout,Mail,
  ChevronLeft, ChevronRight, Camera
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FeedBackComponent } from '../Components';
const ViewItemPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [ratingStars,setRatingStars]=useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [comment,setComment]=useState()
  const [data,setdata]=useState(null);
  const {id}=useParams()



  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) setIsVisible(false);
      else setIsVisible(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);


  
  useEffect(()=>{
    const fetchData=async()=>{
      const response=await axios.get(`/api/user/getitem/${id}`);
      setdata(response.data.data.currentitem);
      setRatingStars(response.data.data.userRating)
    }
    fetchData();
  },[id])


  if(!data){
  return (
    <div className="text-center py-20 font-black uppercase animate-pulse">Loading Items...</div>
  );
  }

  const rateitem=async(ratingValue)=>{
    try{
      const response=await axios.post(`/api/user/rate-item/${data?._id}`,{ratingValue});
      setRatingStars(response.data.data.rating)
      setdata(response.data.data.item)
    }catch(err){
      console.log(err)
    }
  }

  const submitComment=async()=>{
    try{
    const response=await axios.post(`/api/user/feedback/${data._id}`,{comment})
    setdata(response?.data.data)
    setComment("")
    
    }catch(err){
      console.log(err)
    }
  }

  const nextImage = () => {
    setCurrentIdx((prev) => (prev === data.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIdx((prev) => (prev === 0 ? data.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20">
      
      {/* 1. NAV */}
      <nav className={`fixed top-6 inset-x-10 z-[100] flex justify-between transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-20'}`}>
        <button onClick={() => navigate(-1)} className="px-24 pr-25 py-5 bg-white border-2 border-slate-900 rounded-full font-black text-[10px] uppercase tracking-widest shadow-[4px_4px_0px_#000]">
          Back
        </button>
      </nav>

      {/* 2. GALLERY */}


        {/* <section className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-fit lg:h-[70vh]">
      <div className="lg:col-span-2 relative group border-4 border-slate-900 rounded-[3rem] overflow-hidden shadow-[12px_12px_0px_#000]">
        <img 
          src={data?.images?.[0]?.url} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          alt="main product" 
        />
        <div className="absolute top-6 left-6 bg-emerald-400 border-2 border-slate-900 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[4px_4px_0px_#000]">
          Original Media
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-6">
        <div className="flex-1 bg-indigo-600 border-4 border-slate-900 rounded-[3rem] p-8 flex flex-col justify-end shadow-[12px_12px_0px_#000] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
                <Layout size={200} strokeWidth={3} />
            </div>
            <h3 className="text-white text-4xl font-black uppercase tracking-tighter leading-none mb-2 relative z-10">
                Premium <br/> Quality
            </h3>
            <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em] relative z-10">
                Verified Listing
            </p>
        </div>
        
        <div className="h-1/3 bg-yellow-400 border-4 border-slate-900 rounded-[3rem] p-8 flex items-center justify-center shadow-[12px_12px_0px_#000]">
            <div className="text-center">
                <p className="font-black text-2xl uppercase tracking-tighter italic">1 of 1</p>
                <p className="text- [9px] font-black uppercase opacity-60">Single Edition View</p>
            </div>
        </div>
      </div>
    </section> */}


      <section className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-fit lg:h-[70vh]">
        
        {/* LEFT COLUMN: THE SLIDER (Badi Image ki jagah) */}
        <div className="lg:col-span-2 relative group border-4 border-slate-900 rounded-[3rem] overflow-hidden shadow-[12px_12px_0px_#000] bg-slate-100">
          
          {/* Image Rendering with Slide Animation logic */}
          <div className="relative w-full h-full overflow-hidden">
              <img 
                src={data?.images?.[currentIdx]?.url} 
                key={currentIdx} // Key change trigger simple transition
                className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" 
                alt={`product-view-${currentIdx}`} 
              />
          </div>

          {/* NAVIGATION BUTTONS (Neo-Brutalist Style) */}
          {data?.images?.length > 1 && (
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button 
                onClick={prevImage}
                className="pointer-events-auto w-12 h-12 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all hover:bg-yellow-400"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
              <button 
                onClick={nextImage}
                className="pointer-events-auto w-12 h-12 bg-white border-2 border-slate-900 rounded-xl flex items-center justify-center shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all hover:bg-yellow-400"
              >
                <ChevronRight size={24} strokeWidth={3} />
              </button>
            </div>
          )}

          {/* IMAGE COUNTER BADGE */}
          <div className="absolute bottom-6 right-6 bg-slate-900 text-white px-4 py-2 rounded-xl font-black text-[12px] border-2 border-white shadow-xl">
            {currentIdx + 1} / {data?.images?.length}
          </div>

          <div className="absolute top-6 left-6 bg-emerald-400 border-2 border-slate-900 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[4px_4px_0px_#000]">
            {data?.images?.length > 1 ? 'Multi-View Gallery' : 'Original Media'}
          </div>
        </div>

        {/* RIGHT COLUMN: FIXED DECORATION (Jesa tune kaha tha, no change here) */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="flex-1 bg-indigo-600 border-4 border-slate-900 rounded-[3rem] p-8 flex flex-col justify-end shadow-[12px_12px_0px_#000] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-10 rotate-12">
                  <Layout size={200} strokeWidth={3} />
              </div>
              <h3 className="text-white text-4xl font-black uppercase tracking-tighter leading-none mb-2 relative z-10">
                  Premium <br/> Quality
              </h3>
              <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em] relative z-10">
                  Verified Listing
              </p>
          </div>
          
          <div className="h-1/3 bg-yellow-400 border-4 border-slate-900 rounded-[3rem] p-8 flex items-center justify-center shadow-[12px_12px_0px_#000]">
              <div className="text-center">
                  <p className="font-black text-2xl uppercase tracking-tighter italic flex items-center gap-2 justify-center">
                      <Camera size={20} /> {data?.images?.length} SHOTS
                  </p>
                  <p className="text-[9px] font-black uppercase opacity-60">High-Res Capture</p>
              </div>
          </div>
        </div>
      </section>



      {/* 3. CONTENT AREA */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 mt-12">
        
        {/* HEADER SECTION */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-emerald-400 border-2 border-slate-900 text-[9px] font-black uppercase tracking-widest rounded-md shadow-[3px_3px_0px_#000]">{data?.status}</span>
            <span className="px-3 py-1 bg-white border-2 border-slate-900 text-[9px] font-black uppercase tracking-widest rounded-md shadow-[3px_3px_0px_#000]">{data?.condition}</span>
            <span className="px-3 py-1 bg-white border-2 border-slate-900 text-[9px] font-black uppercase tracking-widest rounded-md shadow-[3px_3px_0px_#000]">{data?.category}</span>
            <div className="flex items-center gap-1.5 ml-2">
              <Star size={14} className="fill-yellow-400" />
              <span className="text-[11px] font-black uppercase">{data?.averageRating} ({data?.ratingCount})</span>
            </div>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-[0.8] mb-4">
            {data?.itemName}
          </h1>
          <div className="flex items-center gap-2 text-slate-600 font-black uppercase text-[12px] tracking-widest">
            <MapPin size={18} className="text-emerald-500" />
            {data?.location}
          </div>
        </div>

        {/* MATCHED THREE-COLUMN DASHBOARD */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* COLUMN 1: SPECS (Neo-Brutalist) */}
          <div className="lg:col-span-3 bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-[8px_8px_0px_#000]">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2 underline decoration-2 decoration-emerald-500">
              <Box size={14} /> Specifications
            </h4>
            <div className="space-y-6">
              {Object?.entries(data?.specs).map(([key, value]) => (
                <div key={key}>
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">{key}</p>
                  <p className="text-lg font-black text-slate-900 tracking-tight leading-none">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: DESCRIPTION (Neo-Brutalist) */}
          <div className="lg:col-span-5 bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-[8px_8px_0px_#6366f1]">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2 underline decoration-2 decoration-indigo-500">
              <Info size={14} /> Description
            </h4>
            <p className="text-xl font-bold text-slate-700 leading-tight mb-8">
              {data?.description}
            </p>
            <div className="pt-6 border-t-2 border-slate-900">
               <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Pickup Location</p>
               <p className="text-sm font-bold text-slate-600 uppercase tracking-tighter leading-none">{data?.address}</p>
            </div>
          </div>

          {/* COLUMN 3: PRICING (Original Neo-Brutalist) */}
          <div className="lg:col-span-4 bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-[8px_8px_0px_#10B981]">
            <div className="space-y-1 mb-8">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Daily Rental Rate</p>
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">₹{data?.price}</h2>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b-2 border-slate-100">
                <span className="text-[10px] font-black uppercase text-slate-400">Security Deposit</span>
                <span className="text-lg font-black italic underline">₹{data?.specs?.securityDeposite}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Refundable Deposit</span>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-5 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] shadow-[4px_4px_0px_#10B981] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2">
               <Zap size={16} fill="currentColor" /> Help...
            </button>
          </div>
        </div>


        <div className="mt-12 bg-white border-2 border-slate-900 rounded-[2rem] p-8 shadow-[8px_8px_0px_#000] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-fit px-6 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-2xl border-2 border-slate-900 shadow-[4px_4px_0px_#10B981]">
            {data?.owner?.username?.charAt(0)}
          </div>
          <div>
            <h4 className="text-xl font-black tracking-tight text-slate-900 leading-none mb-2 uppercase">
              {data?.owner?.username}
            </h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Joined {new Date(data?.owner?.createdAt).getFullYear()}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          {/* EMAIL BUTTON */}
          <a 
            href={`mailto:${data?.owner?.email}`} 
            className="flex-1 md:flex-none px-8 py-4 bg-yellow-400 border-2 border-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center flex items-center justify-center gap-2"
          >
            <Mail size={16} /> {data.owner.email}
          </a>

          {/* CALL BUTTON */}
          <a 
            href={`tel:${data?.contactNumber}`} 
            className="flex-1 md:flex-none px-8 py-4 bg-emerald-400 border-2 border-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center flex items-center justify-center gap-2"
          >
            <Phone size={14} /> Call {data?.contactNumber}
          </a>
        </div>
      </div>


        {/* 5. FEEDBACK & RATING SECTION */}
        <section className="mt-12">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left: Rating Input */}
            <div className="lg:col-span-5 bg-white border-2 border-slate-900 rounded-[2.5rem] p-10 shadow-[8px_8px_0px_#FACC15]">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Rate this Item</h3>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-8 text-balance">
                Your feedback helps the community make better rental decisions.
              </p>

              <div className="space-y-8">
                {/* Star Picker */}
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-900 mb-3">Overall Satisfaction</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => rateitem(star)} className="group active:scale-90 transition-transform">
                        <Star size={32} className={`transition-all duration-300 ${star <= ratingStars ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200 group-hover:text-yellow-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-900 block mb-2">Share your experience</label>
                    <textarea
                    onKeyDown={async(e)=>{
                      if(e.key==="Enter" && !e.shiftKey){
                        e.preventDefault()
                        await submitComment()
                      }
                    }}
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    placeholder="What did you think of the performance, condition, and host?"
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-2xl p-4 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white transition-all min-h-[120px]"
                    />
                  </div>
                  
                  <button 
                  
                  onClick={()=>submitComment()}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-[4px_4px_0px_#FACC15] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Summary / Recent Reviews */}
            <div className="lg:col-span-7 bg-white border-2 border-slate-900 rounded-[2.5rem] p-10 shadow-[8px_8px_0px_#000]">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Recent Reviews ({data.feedback.length})</h3>
                <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-black">{data.averageRating}</span>
                </div>
              </div>

              <div className="space-y-8">
                {/* Example Review 1 */}

                <FeedBackComponent data={data}/>

                {data?.feedback?.length > 2 && (
                <button
                    onClick={() => navigate(`/comments/${data._id}`)}
                    className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                    View all {data.feedback.length} feedback →
                  </button>
                )}

              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default ViewItemPage