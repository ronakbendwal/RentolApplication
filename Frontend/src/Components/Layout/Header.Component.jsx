import React, { useEffect, useState } from 'react';
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
  Heart
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => dispatch(setSideBarStatus(false))}
        />
      )}

      {/* 2. SIDEBAR CONTENT */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${sideBarComponentStatus ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Account</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage your profile</p>
            </div>
            <button 
              onClick={() => dispatch(setSideBarStatus(false))}
              className="p-3 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {status && <div className="mb-8"><UserPreview /></div>}

          <nav className="space-y-2 flex-grow">
            <SidebarLink onclick={() => { navigate('/userprofile'); dispatch(setSideBarStatus(false)); }} icon={<User size={20}/>} label="Profile" />
            <SidebarLink onclick={() => { navigate('/youritem'); dispatch(setSideBarStatus(false)); }} icon={<Package size={20}/>} label="Your Items" />
            <SidebarLink onclick={() => { navigate('/wishlist'); dispatch(setSideBarStatus(false)); }} icon={<Heart size={20}/>} label="Wishlist" />
            <SidebarLink onclick={() => { dispatch(setIsThemeOpen(!isThemeOpen)); dispatch(setSideBarStatus(false)); }} icon={<Settings size={20}/>} label="Preferences" />
            <SidebarLink onclick={() => { dispatch(setSideBarStatus(false)); }} icon={<ShoppingCart size={20}/>} label="Orders" />

          </nav>
          <div className="pt-6 border-t border-slate-100">
            <Logout />
          </div>
        </div>
      </div>

      <ThemePermission />
      <LogoutPremissionComponent />

      {/* 3. MAIN HEADER */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-24 gap-8">
            
            {/* LEFT: LOGO */}
            <div className="flex-shrink-0">
              <Link to='/' className="text-3xl font-black tracking-tighter text-emerald-600">
                RENTOL<span className="text-slate-900">.</span>
              </Link>
            </div>

            {/* MIDDLE: UNIFIED SEARCH & LOCATION DOCK */}
            {/* MIDDLE: THE UNIFIED PREMIUM DOCK */}
          <div className="hidden md:flex flex-1 items-center justify-center max-w-4xl relative z-[100] px-4">
            <div className="relative flex items-center w-full bg-slate-100/40 backdrop-blur-md border border-slate-200/50 rounded-2xl p-1.5 transition-all duration-500 
                hover:bg-slate-100/80 hover:border-slate-300
                focus-within:bg-white focus-within:ring-[6px] focus-within:ring-emerald-500/10 focus-within:border-emerald-500 focus-within:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]
                group">
    
    {/* SEARCH SECTION */}
    <div className="relative flex-[2] flex items-center group/search">
      <div className="absolute left-4 flex items-center justify-center pointer-events-none">
        <Search 
          size={18} 
          className="text-slate-400 group-focus-within/search:text-emerald-600 group-focus-within/search:scale-110 transition-all duration-300" 
        />
      </div>

      <input 
        type="text" 
        placeholder="Search for rentals..." 
        className="w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none focus:ring-0 font-bold text-slate-800 placeholder:text-slate-400 text-sm tracking-tight"
      />
    </div>

    {/* GLASS DIVIDER */}
    <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-slate-200 to-transparent mx-2" />

    {/* LOCATION SECTION */}
    <div className="relative flex-1 min-w-[180px]">
      <LocationService />
    </div>

    {/* INTERACTIVE GLOW LINE */}
    <div className="absolute bottom-0 left-6 right-6 h-[2px] w-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent group-focus-within:w-[calc(100%-48px)] transition-all duration-700 ease-out" />
  </div>
</div>



            {/* RIGHT: USER ACTIONS DOCK */}
            <div className="flex items-center gap-4">
              {status ? (
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-full p-1 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="hidden sm:flex items-center px-2">
                    <AddItemButton />
                  </div>
                  
                  <div className="w-[1px] h-6 bg-slate-200 mx-1" />

                  <button 
                    onClick={() => dispatch(setSideBarStatus(!sideBarComponentStatus))}
                    className={`
                      group flex items-center gap-3 py-1 pr-1 pl-4 rounded-full transition-all duration-500
                      ${sideBarComponentStatus ? 'bg-slate-900' : 'bg-white shadow-sm border border-slate-50'}
                    `}
                  >
                    <span className={`hidden lg:block text-[10px] font-black uppercase tracking-widest ${sideBarComponentStatus ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {sideBarComponentStatus ? 'Active' : 'Account'}
                    </span>

                    <div className={`
                      relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500
                      ${sideBarComponentStatus ? 'bg-emerald-500 rotate-[360deg]' : 'bg-slate-900'}
                    `}>
                      <User size={16} fill="currentColor" className={sideBarComponentStatus ? 'text-white' : 'text-slate-200'} />
                      {!sideBarComponentStatus && (
                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full">
                           <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="px-6 py-3 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-emerald-600 transition-all">Log in</Link>
                  <Link to="/signup" className="px-8 py-4 bg-slate-900 hover:bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-95">Join Now</Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};

const SidebarLink = ({ onclick, icon, label }) => (
  <button onClick={onclick} className="group flex items-center gap-4 w-full p-4 text-slate-600 font-bold text-sm hover:bg-emerald-50 hover:text-emerald-600 rounded-[1.5rem] transition-all">
    <span className="text-slate-300 group-hover:text-emerald-500 transition-colors">{icon}</span>
    {label}
  </button>
);

export default Header4;
