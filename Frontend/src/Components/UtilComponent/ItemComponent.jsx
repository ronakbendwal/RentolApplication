import React ,{useState,useEffect}from 'react';
import { MapPin, Heart, Star, Zap,ArrowLeft } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { wishlistapi } from '../../redux/Feature/WishList.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setWishList } from '../../redux/Feature/WishList.js';
import { setShowLocationModal } from '../../redux/Feature/Status.js';
const ItemCard2 = ({ item }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlistitem);
  const isWishlisted = wishlist?.some((i) => i._id === item?._id);
  const navigate = useNavigate();

  if (item.status === 'Inactive') return null;

  return (
    <div 
      onClick={() => navigate(`/viewitem/${item?._id}`)}
      className="group relative bg-white border-2 border-slate-900 rounded-[2.5rem] p-4 transition-all duration-300 hover:-translate-y-2 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#6366f1] cursor-pointer"
    >
      
      <div className="relative aspect-[10/11] overflow-hidden rounded-[2rem] border-2 border-slate-900 bg-slate-100">
        <img 
          src={item.images?.[0]?.url} 
          alt={item.itemName || item.itemname}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <div className="px-3 py-1 bg-white border-2 border-slate-900 rounded-full flex items-center gap-1.5 shadow-[3px_3px_0px_#000]">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[11px] font-black text-slate-900">{item?.averageRating  }</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(wishlistapi(item?._id));
            }}
            className="p-2 rounded-full bg-white border-2 border-slate-900 hover:bg-red-50 transition-all shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none"
          >
            <Heart 
              size={18} 
              className={`transition-colors duration-300 ${isWishlisted ? "fill-red-500 text-red-500" : 'text-slate-400'}`} 
            />
          </button>
        </div>

        <div className="absolute bottom-3 left-3">
          <div className="px-3 py-1 bg-emerald-400 border-2 border-slate-900 rounded-lg text-[9px] font-black text-slate-900 uppercase tracking-widest shadow-[3px_3px_0px_#000]">
            {item?.category}
          </div>
        </div>
      </div>

      <div className="mt-5 px-1 pb-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-black text-slate-900 tracking-tighter truncate uppercase leading-none">
            {item.itemName || item.itemname}
          </h3>
          
          <div className="flex items-center gap-1 text-slate-500 mt-1">
            <MapPin size={13} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">{item.location}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Per Day</span>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{item.price}</span>
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/viewitem/${item?._id}`);
            }}
            className="flex-1 py-3.5 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 shadow-[4px_4px_0px_#10B981] hover:bg-slate-800 transition-all active:translate-y-1 active:shadow-none"
          >
            <Zap size={14} className="fill-yellow-400 text-yellow-400" />
            <span>Rent</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ItemCard2;

const ItemsPreviewSection = () => {
  const [items, setItems] = useState([]);
  const {data}=useSelector((state)=>state.auth);
  const city =data?.data?.fulllocation?.address.city;
  const {showLocationModal} = useSelector((state)=>state.componentstatus)

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFunction = async () => {
      try {
      let itemResponse; 
      if(!city){
       itemResponse= await axios.get('/api/user/getallitem');
      }else{
        itemResponse=await axios.get('/api/user/getnearitem',{
          params:{
          city
          }
        })
      }
        const wishlistResponse = await axios.get('/api/user/get-wish-list');
        const itemdata = itemResponse?.data.data;
        const wishlistdata = wishlistResponse?.data.data;
        dispatch(setWishList(wishlistdata));
        setItems(itemdata);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchFunction();
  }, [data,dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            Featured <br />
            <span className="text-indigo-600">Listings</span>
          </h2>
          <div className="h-3 w-1/2 bg-yellow-400 border-2 border-slate-900 mt-2 shadow-[4px_4px_0px_#000]"></div>
        </div>

        <div className="hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
            Explore the best rentals
          </p>
          <div className="h-[2px] w-full bg-slate-200"></div>
        </div>
      </div>

      {!items || items.length === 0 ? (
        // Added flex-col, items-center aur justify-center for perfect centering
        <div className="flex flex-col items-center justify-center text-center py-32 border-4 border-dashed border-slate-200 rounded-[3rem]">
          <p className="text-2xl font-black uppercase text-slate-300 tracking-widest mb-8">
            No items available right now
          </p>
          
          <button 
            onClick={() => dispatch(setShowLocationModal(!showLocationModal))}
            className="px-12 py-5 bg-yellow-400 border-[3px] border-slate-900 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-[6px_6px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all active:scale-95 flex items-center gap-3"
          >
            Change City <ArrowLeft size={16} strokeWidth={3} className="rotate-180" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items?.map((item) => (
            <ItemCard2 key={item?._id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};


export {
  ItemCard2,
  ItemsPreviewSection,
}



