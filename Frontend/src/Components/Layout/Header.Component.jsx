import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from'react-router-dom';
import { setIsThemeOpen } from '../../redux/Feature/Theme.js';
import {
  LogoutPremissionComponent,
  UserPreview,
  Logout,
  ThemePermission,
  AddItemButton
} from '../index.js';
import { 
  Plus,
  Search, 
  MapPin,
  User, 
  Menu, 
  Target, 
  ChevronDown,
  X,
  Package,
  ShoppingCart,
  Settings,
  Heart,
  SunMoon
 } from 'lucide-react';
import { useDispatch,useSelector} from 'react-redux';
import LocationService from '../../services/LocationService.jsx';
import { setSideBarStatus } from '../../redux/Feature/Status.js';
const Header4 = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {isThemeOpen}=useSelector((state)=>state.theme)
  const {status}=useSelector((state)=>state.auth)
  const [showLocationModal, setShowLocationModal] = useState(false);
  const {sideBarComponentStatus}=useSelector((state)=>state.componentstatus)
  
 
  return (
    <>
      {/* 1. SIDEBAR OVERLAY (Background Dim) */}
       {sideBarComponentStatus && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={()=>dispatch(setSideBarStatus(!sideBarComponentStatus))}
        />
      )}


      {/* 2. SIDEBAR CONTENT */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${sideBarComponentStatus ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          {/* Sidebar Header */}


          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">Account</h2>
            <button 
              onClick={()=>dispatch(setSideBarStatus(!sideBarComponentStatus))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Preview */}
          {status && <UserPreview/>}

          {/* Sidebar Links */}
          <nav className="space-y-2 flex-grow">

            <SidebarLink onclick={
              ()=>{
                navigate('/youritem')
                dispatch(setSideBarStatus(!sideBarComponentStatus))
              }
              }icon={<Package size={20}/>} label="Your Items" />

            <SidebarLink onclick={
              ()=>{
               setActiveComponent('CartItem')
               dispatch(setSideBarStatus(!sideBarComponentStatus))
              }
              }icon={<ShoppingCart size={20}/>} label="Cart Items" />

            <SidebarLink  onclick={
              ()=>{
              navigate('/userprofile') 
              dispatch(setSideBarStatus(!sideBarComponentStatus))
              }} icon={<User size={20}/>} label="Profile" />

            <SidebarLink onclick={
              ()=>{
                dispatch(setIsThemeOpen(!isThemeOpen))
                dispatch(setSideBarStatus(!sideBarComponentStatus))
              }
              } icon={<Settings size={20}/>} label="Preferences" />

            <SidebarLink icon={<Heart size={20}/>} label="Wishlist" />
          </nav>
           <Logout/>
        </div>

      </div>
      <ThemePermission/>
      <LogoutPremissionComponent/>


      {/* 3. MAIN HEADER */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-6">
            
            {/* LOGO */}
            <div className="flex-shrink-0">
              <Link to='/' className="text-2xl font-black tracking-tight text-emerald-600 cursor-pointer">
                RENTOL<span className="text-gray-900">.</span>
              </Link>
            </div>

            {/* SEARCH AREA (Unchanged) */}
            <div className="hidden md:flex flex-1 items-center gap-4 max-w-4xl">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for cars, tools, bikes..." 
                  className="block w-full pl-12 pr-24 py-3 bg-gray-50 border border-gray-200 rounded-2xl leading-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 sm:text-sm transition-all"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-sm">
                  Search
                </button>
              </div>

              {/* Location Selector */}

              <LocationService/>
            </div>

            {/* USER ACTIONS (Clicking this opens sidebar) */}
           { status && <div className="flex items-center gap-4">
                 <AddItemButton/>
                <div 
                onClick={()=>dispatch(setSideBarStatus(!sideBarComponentStatus))}
                className="flex items-center gap-2 border border-gray-200 rounded-full p-1.5 pl-3 hover:shadow-md transition-all cursor-pointer bg-white"
              >
                <Menu size={18} className="text-gray-600" />
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                  <User size={20} fill="currentColor" />
                </div>
              </div>
            </div>}


            {!status && <div className="flex items-center gap-3">
                  <Link
                  to="/login"
                   className="px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-xl transition-all"
                  >Log in  </Link>
                 <Link
                 to="/signup"
                 className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md shadow-blue-100 transition-all active:scale-95"
                  > Sign up </Link>
             </div>}
          </div>
        </div>
      </nav>
    </>
  );
};

// Simple Helper Component for Sidebar Links
const SidebarLink = ({ onclick,icon, label}) => (
  <button onClick={onclick} className="flex items-center gap-3 w-full p-3 text-gray-700 font-medium hover:bg-gray-50 hover:text-emerald-600 rounded-xl transition-all">
    <span className="text-gray-400">{icon}</span>
    {label}
  </button>
);

export default Header4;



























































































const HeaderComponent = () => {
  const [showLocationModal, setShowLocationModal] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* 1. LOGO */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-black tracking-tight text-blue-600 cursor-pointer">
              RENTOL<span className="text-gray-900">.</span>
            </h1>
          </div>

          {/* 2. SEARCH AREA */}
          <div className="hidden md:flex flex-1 items-center gap-4 max-w-4xl">
            
            {/* Item Search Bar with Integrated Button */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search for cars, tools, bikes..." 
                className="block w-full pl-12 pr-24 py-3 bg-gray-50 border border-gray-200 rounded-2xl leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm transition-all"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-sm">
                Search
              </button>
            </div>

            {/* Separate Location Selector */}
            <div className="relative w-60">
              <div 
                onClick={() => setShowLocationModal(!showLocationModal)}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer hover:border-gray-300 transition-all"
              >
                <MapPin size={18} className="text-gray-400" />
                <div className="flex-1 truncate">
                  <span className="text-sm font-medium text-gray-700">Select Location</span>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${showLocationModal ? 'rotate-180' : ''}`} />
              </div>

              {/* Location Dropdown */}
              {showLocationModal && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-50">
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-3 text-sm text-blue-600 font-bold hover:bg-blue-50 rounded-xl transition-colors">
                      <Target size={18} />
                      Current Location
                    </button>
                    <div className="h-px bg-gray-100 my-1" />
                    <input 
                      type="text"
                      placeholder="Type city or zip..."
                      className="w-full px-3 py-2 text-sm border-none focus:ring-0 placeholder-gray-400"
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. USER ACTIONS */}
          <div className="flex items-center gap-4">
            <button className="hidden lg:block text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors">
              Rent out your gear
            </button>
            
            <div className="flex items-center gap-2 border border-gray-200 rounded-full p-1.5 pl-3 hover:shadow-md transition-all cursor-pointer bg-white">
              <Menu size={18} className="text-gray-600" />
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                <User size={20} fill="currentColor" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

