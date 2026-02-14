import React ,{useState,useEffect}from 'react';
import { MapPin, Heart, Star, Zap } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const GuestItemCard = ({ item }) => {
  console.log(item)
  const navigate=useNavigate()
  if (item.status === 'Inactive') return null;

  return (
    <div 
      className="group relative bg-white border-2 border-slate-900 rounded-[2.5rem] p-4 transition-all duration-300 hover:-translate-y-2 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#6366f1] cursor-pointer"
    >
      
      {/* Image Container */}
      <div className="relative aspect-[10/11] overflow-hidden rounded-[2rem] border-2 border-slate-900 bg-slate-100">
        <img 
          src={item.images?.[0]?.url} 
          alt={item.itemName}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Top Actions: Rating & Wishlist */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <div className="px-3 py-1 bg-white border-2 border-slate-900 rounded-full flex items-center gap-1.5 shadow-[3px_3px_0px_#000]">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[11px] font-black text-slate-900">{item?.averageRating || "4.5" }</span>
          </div>

        </div>

        {/* Floating Category Tag */}
        <div className="absolute bottom-3 left-3">
          <div className="px-3 py-1 bg-emerald-400 border-2 border-slate-900 rounded-lg text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-[3px_3px_0px_#000]">
            {item?.category}
          </div>
        </div>
      </div>

      {/* Item Details */}
      <div className="mt-5 px-1 pb-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-black text-slate-900 tracking-tighter truncate uppercase leading-none">
            {item.itemName}
          </h3>
          
          <div className="flex items-center gap-1 text-slate-500 mt-1">
            <MapPin size={13} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest"></span>
          </div>
        </div>

        {/* Pricing & CTA Section */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Per Day</span>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{item.price}</span>
            </div>
          </div>

          <button 
          onClick={()=>navigate('/login')}
          className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 shadow-[4px_4px_0px_#10B981] hover:bg-slate-800 transition-all active:translate-y-1 active:shadow-none"
          >
            <Zap size={14} className="fill-yellow-400 text-yellow-400" />
            <span>Login For RentOut</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const GuestItemPreview = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const itemResponse = await axios.get('/api/user/getallitem');
        const itemdata = itemResponse?.data.data;
        setItems(itemdata);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchFunction();
  }, [dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            Featured <br />
            <span className="text-indigo-600">Listings</span>
          </h2>
          {/* Decorative underline/bar */}
          <div className="h-3 w-1/2 bg-yellow-400 border-2 border-slate-900 mt-2 shadow-[4px_4px_0px_#000]"></div>
        </div>

        <div className="hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
            Explore the best rentals
          </p>
          <div className="h-[2px] w-full bg-slate-200"></div>
        </div>
      </div>

      {/* ITEMS GRID */}
      {items.length === 0 ? (
        <div className="text-center py-32 border-4 border-dashed border-slate-200 rounded-[3rem]">
          <p className="text-2xl font-black uppercase text-slate-300 tracking-widest">
            No items available right now
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items?.map((item) => (
            <GuestItemCard key={item?._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};


export {
  GuestItemCard,
  GuestItemPreview
}