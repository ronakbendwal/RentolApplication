import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import {Quote,ThumbsUp, Star, ArrowLeft, MessageSquare, Filter, User } from 'lucide-react';

const ItemFeedbackPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/user/getfeedback/${id}`).then((res) => {
      setFeedback(res.data.data);
      setLoading(false);
    });
  }, [id]);

    const cardAccents = ["shadow-[#6366f1]", "shadow-[#10B981]", "shadow-[#FACC15]", "shadow-[#F43F5E]"];


  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20">
      
      {/* 1. HEADER SECTION */}
      <header className="bg-white border-b-4 border-slate-900 p-8 lg:p-12 mb-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-4 hover:gap-4 transition-all"
            >
              <ArrowLeft size={16} /> Back to Item
            </button>
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
              User <span className="text-indigo-600">Feedback</span>
            </h1>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-yellow-400 border-2 border-slate-900 p-6 rounded-2xl shadow-[6px_6px_0px_#000] flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-black leading-none">{feedback.length}</p>
              <p className="text-[9px] font-black uppercase tracking-widest mt-1">Total Reviews</p>
            </div>
            <div className="h-12 w-[2px] bg-slate-900 opacity-20" />
            <div className="flex flex-col items-center">
              <div className="flex gap-1 text-slate-900">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest mt-1">Average Quality</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6">
        
        {/* Filter Bar */}
        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2">
            <button className="px-6 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">All</button>
            <button className="px-6 py-2 bg-white border-2 border-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Latest</button>
            <button className="px-6 py-2 bg-white border-2 border-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Highest Rated</button>
        </div>

        {/* FEEDBACK GRID */}
        {loading ? (
            <div className="text-center py-20 font-black uppercase animate-pulse">Loading Feedback...</div>
        ) :  feedback.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-10">
            {feedback.map((fb, index) => (
                <div 
                  key={fb._id} 
                  className={`bg-white border-4 border-slate-900 p-8 rounded-[2.5rem] flex flex-col justify-between hover:-translate-y-2 transition-all cursor-default ${cardAccents[index % cardAccents.length]}`}
                  style={{ boxShadow: `10px 10px 0px 0px currentColor` }} // Dynamic shadow color via tailwind or style
                >
                    <div className="text-inherit"> {/* Uses parent color for shadow reference */}
                        <div className="flex justify-between items-start mb-8 text-slate-900">
                            <div className="flex items-center gap-4">
                                {fb?.user.image ? (
                                    <img src={fb.user.image.url} className="w-14 h-14 border-2 border-slate-900 rounded-2xl object-cover shadow-[4px_4px_0px_#000]" alt="user" />
                                ) : (
                                    <div className="w-14 h-14 bg-slate-100 border-2 border-slate-900 rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#000]">
                                        <User size={24} />
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-black uppercase text-base tracking-tight leading-none">{fb.user.fullname}</h4>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Verified Experience</p>
                                </div>
                            </div>
                            <Quote size={32} className="text-slate-100 fill-slate-100" />
                        </div>

                        <div className="relative mb-6">
                            <p className="text-xl font-bold text-slate-800 leading-tight">
                                “{fb.comment}”
                            </p>
                        </div>
                    </div>

                    <div className="pt-6 border-t-4 border-slate-900 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400">
                           {new Date(fb.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-2 border-slate-900 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-400 transition-colors">
                           <ThumbsUp size={12} /> Helpful
                        </button>
                    </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="text-center py-32 bg-slate-50 border-4 border-dashed border-slate-300 rounded-[4rem]">
                <MessageSquare size={64} className="mx-auto text-slate-200 mb-6" />
                <p className="text-3xl font-black uppercase text-slate-300 tracking-tighter text-balance">No stories shared yet. <br/> Be the first one!</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default ItemFeedbackPage;




// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from 'axios';
// import { Star, ArrowLeft, MessageSquare, User, ThumbsUp, Quote } from 'lucide-react';

// const ItemFeedbackPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [feedback, setFeedback] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`/api/user/getfeedback/${id}`).then((res) => {
//       setFeedback(res.data.data);
//       setLoading(false);
//     });
//   }, [id]);

//   // Accent colors for the hard shadows to make the grid pop
//   const cardAccents = ["shadow-[#6366f1]", "shadow-[#10B981]", "shadow-[#FACC15]", "shadow-[#F43F5E]"];

//   return (
//     <div className="min-h-screen bg-[#FDFDFD] text-slate-900 pb-20">
      
//       {/* 1. STICKY NAV TOP BAR */}
//       <nav className="sticky top-0 z-50 bg-white border-b-4 border-slate-900 px-6 py-4">
//         <div className="max-w-6xl mx-auto flex justify-between items-center">
//             <button 
//               onClick={() => navigate(-1)} 
//               className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:translate-y-1 transition-all"
//             >
//               <ArrowLeft size={14} /> Back
//             </button>
//             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Community Reviews</span>
//         </div>
//       </nav>

//       {/* 2. HERO HEADER SECTION */}
//       <header className="px-6 py-12 lg:py-20 max-w-6xl mx-auto">
//         <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
//           <div className="max-w-2xl">
//             <h1 className="text-6xl lg:text-9xl font-black uppercase tracking-[ -0.05em] leading-[0.8] mb-6">
//               REAL <br/> <span className="text-indigo-600">VOICES.</span>
//             </h1>
//             <p className="text-xl font-bold text-slate-500 uppercase tracking-tight">
//               Showing {feedback.length} verified experiences from our community.
//             </p>
//           </div>

//           {/* DYNAMIC RATING SUMMARY */}


//           //           <div className="bg-yellow-400 border-2 border-slate-900 p-6 rounded-2xl shadow-[6px_6px_0px_#000] flex items-center gap-6">
// //             <div className="text-center">
// //               <p className="text-4xl font-black leading-none">{feedback.length}</p>
// //               <p className="text-[9px] font-black uppercase tracking-widest mt-1">Total Reviews</p>
// //             </div>
// //             <div className="h-12 w-[2px] bg-slate-900 opacity-20" />
// //             <div className="flex flex-col items-center">
// //               <div className="flex gap-1 text-slate-900">
// //                 <Star size={20} fill="currentColor" />
// //                 <Star size={20} fill="currentColor" />
// //                 <Star size={20} fill="currentColor" />
// //                 <Star size={20} fill="currentColor" />
// //                 <Star size={20} />
// //               </div>
// //               <p className="text-[9px] font-black uppercase tracking-widest mt-1">Average Quality</p>
// //             </div>
// //           </div>
// //         </div>
//       </header>

//       {/* 3. MAIN CONTENT GRID */}
//       <main className="max-w-6xl mx-auto px-6">
//         {loading ? (
//             <div className="flex flex-col items-center py-20 gap-4">
//                 <div className="w-16 h-16 border-8 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
//                 <p className="font-black uppercase tracking-widest text-slate-400">Fetching Data...</p>
//             </div>
//         ) : feedback.length > 0 ? (
//             <div className="grid md:grid-cols-2 gap-10">
//             {feedback.map((fb, index) => (
//                 <div 
//                   key={fb._id} 
//                   className={`bg-white border-4 border-slate-900 p-8 rounded-[2.5rem] flex flex-col justify-between hover:-translate-y-2 transition-all cursor-default ${cardAccents[index % cardAccents.length]}`}
//                   style={{ boxShadow: `10px 10px 0px 0px currentColor` }} // Dynamic shadow color via tailwind or style
//                 >
//                     <div className="text-inherit"> {/* Uses parent color for shadow reference */}
//                         <div className="flex justify-between items-start mb-8 text-slate-900">
//                             <div className="flex items-center gap-4">
//                                 {fb?.user.image ? (
//                                     <img src={fb.user.image.url} className="w-14 h-14 border-2 border-slate-900 rounded-2xl object-cover shadow-[4px_4px_0px_#000]" alt="user" />
//                                 ) : (
//                                     <div className="w-14 h-14 bg-slate-100 border-2 border-slate-900 rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#000]">
//                                         <User size={24} />
//                                     </div>
//                                 )}
//                                 <div>
//                                     <h4 className="font-black uppercase text-base tracking-tight leading-none">{fb.user.fullname}</h4>
//                                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">Verified Experience</p>
//                                 </div>
//                             </div>
//                             <Quote size={32} className="text-slate-100 fill-slate-100" />
//                         </div>

//                         <div className="relative mb-6">
//                             <p className="text-xl font-bold text-slate-800 leading-tight">
//                                 “{fb.comment}”
//                             </p>
//                         </div>
//                     </div>

//                     <div className="pt-6 border-t-4 border-slate-900 flex items-center justify-between">
//                         <span className="text-[10px] font-black uppercase text-slate-400">
//                            {new Date(fb.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
//                         </span>
//                         <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-2 border-slate-900 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-400 transition-colors">
//                            <ThumbsUp size={12} /> Helpful
//                         </button>
//                     </div>
//                 </div>
//             ))}
//             </div>
//         ) : (
//             <div className="text-center py-32 bg-slate-50 border-4 border-dashed border-slate-300 rounded-[4rem]">
//                 <MessageSquare size={64} className="mx-auto text-slate-200 mb-6" />
//                 <p className="text-3xl font-black uppercase text-slate-300 tracking-tighter text-balance">No stories shared yet. <br/> Be the first one!</p>
//             </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ItemFeedbackPage;