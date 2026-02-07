import React, { useState, useEffect } from 'react';
import { 
  Plus, MoreVertical, Eye, Edit3, Trash2, PackageOpen, 
  Search, Filter, IndianRupee, BarChart3, TrendingUp, CheckCircle2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { YourItemCard,SkeletonCard} from '../Components/index.js';
import { useSelector,useDispatch } from 'react-redux';
import { setYourItem } from '../redux/Feature/YourItem.js';
import axios from 'axios';
const YourItem = () => {

  
  const navigate= useNavigate();
  const dispatch=useDispatch();
  const [searchTerm,setSearchTerm]=useState("");
  const {fetchedData,loading}=useSelector((state)=>state.youritem);


  useEffect(() => {
    const dataFetching=async()=>{
      const rawData=await axios.get('/api/user/getyouritem');
      const itemData=rawData.data.data
      dispatch(setYourItem(itemData))
    }
    dataFetching();
  }, []);

  const filteredItem = fetchedData?.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm?.toLowerCase())
  )


  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/20 blur-[100px] rounded-full -z-10" />

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">Storefront</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Your Listings</h1>
          </div>
          
          <button
          onClick={()=>navigate('/categorypage')}
           className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
            <Plus size={18} /> Add New Asset
          </button>
        </div>



        {/* Search Bar */}
        <div className="flex gap-4 mb-10">
          <div className="flex-grow relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, category or ID..." 
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[1.5rem] outline-none focus:ring-4 ring-emerald-500/5 transition-all font-bold text-slate-700 shadow-sm"
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-6 bg-white border border-slate-100 rounded-[1.5rem] text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <Filter size={18} /> <span className="text-xs font-black uppercase hidden sm:block">Filter</span>
          </button>
        </div>

        {/* List Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => <SkeletonCard key={n} />)}
          </div>
        ) : fetchedData?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItem?.map((item)=>(
            <YourItemCard 
            key={item?._id} 
            data={item}
            />
            ))}  
          </div>
        )}
      </main>

      {/* Sticky Footer */}
      <footer className="bg-white border-t border-slate-100 py-10 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg" />
                <span className="font-black text-xl tracking-tighter italic">RENTOL.</span>
            </div>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
            © 2026 Rentol India • Ujjain Node • Licensed Protocol
            </p>
        </div>
      </footer>
    </div>
  );
};

/* --- UI COMPONENTS --- */


const EmptyState = () => {
  const navigate= useNavigate()
  return(
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-24 h-24 bg-black rounded-[2rem] shadow-xl flex items-center justify-center text-slate-200 mb-6 border border-slate-50">
      <PackageOpen size={48} strokeWidth={1} />
    </div>
    <h3 className="text-2xl font-black text-slate-800">Your Shelf is Empty</h3>
    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 mb-8">Start earning today by listing your items</p>
    <button 
    onClick={()=>{navigate("/categorypage")}}
    className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-xl shadow-slate-200 active:scale-95">
      Post Your First Item
    </button>
  </div>
)
}

export default YourItem;
