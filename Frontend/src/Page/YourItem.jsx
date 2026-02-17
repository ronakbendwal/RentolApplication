// import React, { useState, useEffect } from 'react';
// import { 
//   Plus, MoreVertical, Eye, Edit3, Trash2, PackageOpen, 
//   Search, Filter, IndianRupee, BarChart3, TrendingUp, CheckCircle2 
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { YourItemCard,SkeletonCard} from '../Components/index.js';
// import { useSelector,useDispatch } from 'react-redux';
// import { setYourItem } from '../redux/Feature/YourItem.js';
// import axios from 'axios';
// const YourItem = () => {

  
//   const navigate= useNavigate();
//   const dispatch=useDispatch();
//   const [searchTerm,setSearchTerm]=useState("");
//   const {fetchedData,loading}=useSelector((state)=>state.youritem);


//   useEffect(() => {
//     const dataFetching=async()=>{
//       const rawData=await axios.get('/api/user/getyouritem');
//       const itemData=rawData.data.data
//       dispatch(setYourItem(itemData))
//     }
//     dataFetching();
//   }, []);

//   const filteredItem = fetchedData?.filter(item => 
//     item.itemName.toLowerCase().includes(searchTerm?.toLowerCase())
//   )


//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
//       {/* Background Decor */}
//       <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 blur-[120px] rounded-full -z-10" />
//       <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/20 blur-[100px] rounded-full -z-10" />

//       <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        
//         {/* Top Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//                 <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">Storefront</span>
//             </div>
//             <h1 className="text-4xl font-black tracking-tight text-slate-900">Your Listings</h1>
//           </div>
          
//           <button
//           onClick={()=>navigate('/categorypage')}
//            className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
//             <Plus size={18} /> Add New Asset
//           </button>
//         </div>



//         {/* Search Bar */}
//         <div className="flex gap-4 mb-10">
//           <div className="flex-grow relative">
//             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input 
//               type="text" 
//               placeholder="Search by name, category or ID..." 
//               className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 ring-emerald-500/5 transition-all font-bold text-slate-700 shadow-sm"
//               onChange={(e)=>setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button className="px-6 bg-white border border-slate-100 rounded-[1.5rem] text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
//             <Filter size={18} /> <span className="text-xs font-black uppercase hidden sm:block">Filter</span>
//           </button>
//         </div>

//         {/* List Content */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1, 2, 3].map(n => <SkeletonCard key={n} />)}
//           </div>
//         ) : fetchedData?.length === 0 ? (
//           <EmptyState />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredItem?.map((item)=>(
//             <YourItemCard 
//             key={item?._id} 
//             data={item}
//             />
//             ))}  
//           </div>
//         )}
//       </main>

//       {/* Sticky Footer */}
//       <footer className="bg-white border-t border-slate-100 py-10 px-6 mt-12">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
//             <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-emerald-500 rounded-lg" />
//                 <span className="font-black text-xl tracking-tighter italic">RENTOL.</span>
//             </div>
//             <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
//             © 2026 Rentol India • Ujjain Node • Licensed Protocol
//             </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// /* --- UI COMPONENTS --- */


// const EmptyState = () => {
//   const navigate= useNavigate()
//   return(
//   <div className="flex flex-col items-center justify-center py-24 text-center">
//     <div className="w-24 h-24 bg-black rounded-[2rem] shadow-xl flex items-center justify-center text-slate-200 mb-6 border border-slate-50">
//       <PackageOpen size={48} strokeWidth={1} />
//     </div>
//     <h3 className="text-2xl font-black text-slate-800">Your Shelf is Empty</h3>
//     <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 mb-8">Start earning today by listing your items</p>
//     <button 
//     onClick={()=>{navigate("/categorypage")}}
//     className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl shadow-slate-200 active:scale-95">
//       Post Your First Item
//     </button>
//   </div>
// )
// }

// export default YourItem;


//2nd one 

import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, PackageOpen, Fingerprint, LayoutGrid 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { YourItemCard, SkeletonCard } from '../Components/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { setYourItem } from '../redux/Feature/YourItem.js';
import {EditItemImages} from '../Components/index.js';
import axios from 'axios';

const YourItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const {YIEPStatus} =useSelector((state)=>state.componentstatus)
  const { fetchedData, loading } = useSelector((state) => state.youritem);

  useEffect(() => {
    const dataFetching = async () => {
      try {
        const rawData = await axios.get('/api/user/getyouritem');
        const itemData = rawData.data.data;
        dispatch(setYourItem(itemData));
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    dataFetching();
  }, [dispatch,YIEPStatus]);

  const filteredItem = fetchedData?.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  let data;
  if(YIEPStatus){
    data=fetchedData.filter((item)=>item._id ===YIEPStatus)
  }

  console.log(data, "from item component")

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col font-sans selection:bg-yellow-400">
      
      {/* 1. SECTION HEADER (Consistent with Profile/Listings) */}
      <header className="bg-white border-b-8 border-slate-900 p-8 lg:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none rotate-12">
            <LayoutGrid size={400} />
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-400 border-2 border-slate-900 text-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] rounded-md shadow-[3px_3px_0px_#000]">
                Vendor_Mode
              </span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              Your <span className="text-indigo-600">Assets</span>
            </h1>
          </div>
          
          <button
            onClick={() => navigate('/categorypage')}
            className="group flex items-center gap-3 bg-yellow-400 border-4 border-slate-900 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-sm shadow-[8px_8px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95"
          >
            <Plus size={20} strokeWidth={3} /> Add New Listing
          </button>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        
        {/* 2. NEO-BRUTALIST SEARCH BAR */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <div className="flex-grow relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 z-10">
              <Search size={22} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              placeholder="Search assets by name or ID..." 
              className="w-full pl-16 pr-6 py-6 bg-white border-4 border-slate-900 rounded-[2rem] outline-none focus:bg-indigo-50 transition-all font-black text-slate-900 shadow-[8px_8px_0px_#000] placeholder:text-slate-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="h-[76px] px-10 bg-white border-4 border-slate-900 rounded-[2rem] text-slate-900 shadow-[8px_8px_0px_#000] hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 active:translate-y-1 active:shadow-none">
            <Filter size={20} strokeWidth={3} /> 
            <span className="text-xs font-black uppercase">Filter</span>
          </button>
        </div>

        {/* 3. LIST CONTENT */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(n => <SkeletonCard key={n} />)}
          </div>
        ) : fetchedData?.length === 0 ? (

          <EmptyState />

        ) : filteredItem?.length===0 ? (

           <NoMatchState searchTerm={searchTerm} />

        ) :
        (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItem?.map((item) => (
              <div key={item?._id} className="hover:rotate-1 transition-transform">
                <YourItemCard data={item} />
              </div>
            ))}  
          </div>
        )}

       {YIEPStatus===data?.[0]?._id && <EditItemImages
        existingImages={data?.[0]?.images} // Yahan aapko wo item pass karna hoga jo edit ho raha hai
        itemId={data?.[0]?._id}/>
      }
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t-8 border-slate-900 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-600 border-4 border-slate-900 rounded-xl shadow-[4px_4px_0px_#000]" />
                <span className="font-black text-3xl tracking-tighter uppercase italic">Rentol.</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-slate-900 font-black text-[11px] uppercase tracking-[0.2em] mb-1">
                © 2026 Rentol India • Decentralized Rental Protocol
              </p>
              <div className="flex justify-center md:justify-end gap-4 text-[10px] font-black uppercase text-indigo-600">
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Support</a>
              </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

/* --- UI COMPONENTS --- */

const EmptyState = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center border-8 border-dashed border-slate-200 rounded-[4rem] bg-white/50">
      <div className="w-32 h-32 bg-slate-900 border-4 border-slate-900 rounded-[3rem] shadow-[12px_12px_0px_#FACC15] flex items-center justify-center text-white mb-8 rotate-3">
        <PackageOpen size={56} strokeWidth={2.5} />
      </div>
      <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Your Shelf is Empty</h3>
      <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] mt-3 mb-10 max-w-xs leading-relaxed">
        Don't let your assets gather dust. Start earning today.
      </p>
      <button 
        onClick={() => navigate("/categorypage")}
        className="flex items-center gap-3 bg-indigo-600 text-white border-4 border-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:translate-y-1 hover:shadow-none transition-all shadow-[8px_8px_0px_#000]"
      >
        Post Your First Item
      </button>
    </div>
  );
}

const NoMatchState = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center border-8 border-dashed border-indigo-200 rounded-[4rem] bg-white/50">
      <div className="w-28 h-28 bg-indigo-600 border-4 border-slate-900 rounded-[3rem] shadow-[12px_12px_0px_#FACC15] flex items-center justify-center text-white mb-8 rotate-3">
        <Fingerprint size={48} strokeWidth={2.5} />
      </div>
      <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
        No Match Found
      </h3>
      <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] mt-3 mb-10 max-w-md leading-relaxed">
        No assets matched "<span className="text-indigo-600">{searchTerm}</span>"
      </p>
    </div>
  );
};


export default YourItem;


