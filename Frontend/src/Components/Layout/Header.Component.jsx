
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setIsThemeOpen } from '../../redux/Feature/Theme.js';
import {
  LogoutPremissionComponent,
  UserPreview,
  Logout,
  ThemePermission,
  AddItemButton
} from '../index.js';
import { 
  Search, 
  User, 
  X,
  Package,
  ShoppingCart,
  Settings,
  Heart,
  Menu,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import LocationService from '../../services/LocationService.jsx';
import { setSideBarStatus } from '../../redux/Feature/Status.js';

const Header4 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isThemeOpen } = useSelector((state) => state.theme);
  const { status } = useSelector((state) => state.auth);
  const { sideBarComponentStatus } = useSelector((state) => state.componentstatus);

  return (
    <>
      {/* 1. SIDEBAR OVERLAY */}
      {sideBarComponentStatus && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] transition-all duration-500"
          onClick={() => dispatch(setSideBarStatus(false))}
        />
      )}

      {/* 2. SIDEBAR CONTENT */}
      <div className={`fixed top-4 right-4 bottom-4 w-85 bg-white z-[70] border-[4px] border-slate-900 rounded-[3rem] shadow-[-20px_20px_0px_#000] transform transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${sideBarComponentStatus ? 'translate-x-0' : 'translate-x-[120%]'}`}>
        <div className="p-8 flex flex-col h-full relative overflow-hidden">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none text-outline-sm">Console</h2>
              <p className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.3em] mt-1 italic font-mono">System_v.4.0</p>
            </div>
            <button 
              onClick={() => dispatch(setSideBarStatus(false))}
              className="p-3 bg-white border-[3px] border-slate-900 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              <X size={20} strokeWidth={3} />
            </button>
          </div>

          {status && (
            <div className="mb-8 p-1 bg-slate-900 rounded-[2.2rem] shadow-[6px_6px_0px_#10b981]">
               <div className="bg-white rounded-[2rem] p-4 border-2 border-slate-900">
                  <UserPreview />
               </div>
            </div>
          )}

          <nav className="space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
            <SidebarLink onclick={() => { navigate('/userprofile'); dispatch(setSideBarStatus(false)); }} icon={<User size={18}/>} label="Profile" desc="Identity Config" />
            <SidebarLink onclick={() => { navigate('/youritem'); dispatch(setSideBarStatus(false)); }} icon={<Package size={18}/>} label="Your Item" desc="Inventory" />
            <SidebarLink onclick={() => { navigate('/wishlist'); dispatch(setSideBarStatus(false)); }} icon={<Heart size={18}/>} label="Wish List" desc="Saved Vault" />
            {/* <SidebarLink onclick={() => { dispatch(setIsThemeOpen(!isThemeOpen)); dispatch(setSideBarStatus(false)); }} icon={<Settings size={18}/>} label="Settings" desc="Preferences" />
            <SidebarLink onclick={() => { dispatch(setSideBarStatus(false)); }} icon={<ShoppingCart size={18}/>} label="Orders" desc="Transactions" /> */}
          </nav>

          <div className="pt-6 mt-4 border-t-[3px] border-slate-900">
            <Logout />
          </div>
        </div>
      </div>

      <ThemePermission />
      <LogoutPremissionComponent />

      {/* 3. MAIN HEADER */}
            <nav className="sticky top-0 z-50 w-full bg-[#F0F0F0] pt-4 pb-2 px-6">
            {/* REMOVED 'overflow-hidden' FROM THIS DIV */}
            <div className="max-w-[1440px] mx-auto bg-white border-[3px] border-slate-900 rounded-[2.5rem] shadow-[8px_8px_0px_#000] px-6 lg:px-10 h-20 flex items-center relative">
            <div className="flex items-center justify-between w-full gap-4">
            
            {/* LEFT: LOGO */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-400 border-[3px] border-slate-900 rounded-xl flex items-center justify-center shadow-[3px_3px_0px_#000]">
                <Zap size={20} fill="currentColor" strokeWidth={2.5} className="text-slate-900" />
              </div>
              <Link to='/' className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">
                RENTOL<span className="text-emerald-500">.</span>
              </Link>
            </div>
   
            {/* MIDDLE: SEPARATED FIELDS */}
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-2xl h-12"> 
              
              {/* SEARCH FIELD */}
              <div className="flex items-center flex-1 bg-slate-50 border-[3px] border-slate-900 rounded-2xl overflow-hidden shadow-[4px_4px_0px_#000] group focus-within:shadow-none focus-within:translate-x-1 focus-within:translate-y-1 transition-all h-full">
                <div className="pl-4 pr-2 flex items-center">
                  <Search size={18} strokeWidth={3} className="text-slate-400 group-focus-within:text-emerald-500" />
                </div>
                <input 
                  type="text" 
                  placeholder="FIND GEAR..." 
                  className="w-full bg-transparent outline-none font-black text-[11px] uppercase tracking-widest placeholder:text-slate-300"
                />
              </div>

              {/* LOCATION FIELD - Wrapper (No extra borders here, already in component) */}
              <div className="relative h-full">
                <LocationService />
              </div>
              
            </div>

            {/* RIGHT: ACTIONS */}
            <div className="flex items-center gap-4">
              {status ? (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block">
                    <AddItemButton />
                  </div>
                  
                  <button 
                    onClick={() => dispatch(setSideBarStatus(!sideBarComponentStatus))}
                    className={`group relative flex items-center gap-2 p-1 border-[3px] border-slate-900 rounded-full transition-all duration-300 active:scale-90 ${sideBarComponentStatus ? 'bg-indigo-600' : 'bg-white shadow-[5px_5px_0px_#000] hover:translate-y-1 hover:shadow-none'}`}
                  >
                    <span className={`hidden lg:block text-[10px] font-black uppercase tracking-widest pl-4 pr-1 ${sideBarComponentStatus ? 'text-white' : 'text-slate-900'}`}>
                      {sideBarComponentStatus ? 'Close' : 'Menu'}
                    </span>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${sideBarComponentStatus ? 'bg-white text-indigo-600' : 'bg-slate-900 text-white'}`}>
                      {sideBarComponentStatus ? <X size={20} strokeWidth={3} /> : <LayoutDashboard size={18} strokeWidth={2.5} />}
                    </div>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-900">Login</Link>
                  <Link to="/signup" className="px-7 py-3.5 bg-indigo-600 text-white border-[3px] border-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">SignUp</Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav> 
    </>
  );
};

const SidebarLink = ({ onclick, icon, label, desc }) => (
  <button 
    onClick={onclick} 
    className="group flex items-center justify-between w-full p-4 bg-white border-[3px] border-slate-900 rounded-[1.8rem] shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-50 border-2 border-slate-900 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-[2px_2px_0px_#000] group-hover:shadow-none">
        {icon}
      </div>
      <div className="text-left">
        <p className="font-black text-[11px] uppercase tracking-wider text-slate-900 leading-none">{label}</p>
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{desc}</p>
      </div>
    </div>
    <div className="w-6 h-6 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-all">
       <div className="w-1.5 h-1.5 bg-slate-200 rounded-full group-hover:bg-indigo-600" />
    </div>
  </button>
);

export default Header4;

