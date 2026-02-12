// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { setIsThemeOpen } from '../../redux/Feature/Theme.js';
// import {
//   LogoutPremissionComponent,
//   UserPreview,
//   Logout,
//   ThemePermission,
//   AddItemButton
// } from '../index.js';
// import { 
//   Search, 
//   User, 
//   X,
//   Package,
//   ShoppingCart,
//   Settings,
//   Heart
//  } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import LocationService from '../../services/LocationService.jsx';
// import { setSideBarStatus } from '../../redux/Feature/Status.js';

// const Header4 = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isThemeOpen } = useSelector((state) => state.theme);
//   const { status } = useSelector((state) => state.auth);
//   const { sideBarComponentStatus } = useSelector((state) => state.componentstatus);

//   return (
//     <>
//       {/* 1. SIDEBAR OVERLAY */}
//       {sideBarComponentStatus && (
//         <div 
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
//           onClick={() => dispatch(setSideBarStatus(false))}
//         />
//       )}

//       {/* 2. SIDEBAR CONTENT */}
//       <div className={`fixed top-0 right-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${sideBarComponentStatus ? 'translate-x-0' : 'translate-x-full'}`}>
//         <div className="p-8 flex flex-col h-full">
//           <div className="flex justify-between items-center mb-10">
//             <div>
//               <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Account</h2>
//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage your profile</p>
//             </div>
//             <button 
//               onClick={() => dispatch(setSideBarStatus(false))}
//               className="p-3 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {status && <div className="mb-8"><UserPreview /></div>}

//           <nav className="space-y-2 flex-grow">
//             <SidebarLink onclick={() => { navigate('/userprofile'); dispatch(setSideBarStatus(false)); }} icon={<User size={20}/>} label="Profile" />
//             <SidebarLink onclick={() => { navigate('/youritem'); dispatch(setSideBarStatus(false)); }} icon={<Package size={20}/>} label="Your Items" />
//             <SidebarLink onclick={() => { navigate('/wishlist'); dispatch(setSideBarStatus(false)); }} icon={<Heart size={20}/>} label="Wishlist" />
//             <SidebarLink onclick={() => { dispatch(setIsThemeOpen(!isThemeOpen)); dispatch(setSideBarStatus(false)); }} icon={<Settings size={20}/>} label="Preferences" />
//             <SidebarLink onclick={() => { dispatch(setSideBarStatus(false)); }} icon={<ShoppingCart size={20}/>} label="Orders" />

//           </nav>
//           <div className="pt-6 border-t border-slate-100">
//             <Logout />
//           </div>
//         </div>
//       </div>

//       <ThemePermission />
//       <LogoutPremissionComponent />

//       {/* 3. MAIN HEADER */}
//       <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
//         <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
//           <div className="flex items-center justify-between h-24 gap-8">
            
//             {/* LEFT: LOGO */}
//             <div className="flex-shrink-0">
//               <Link to='/' className="text-3xl font-black tracking-tighter text-emerald-600">
//                 RENTOL<span className="text-slate-900">.</span>
//               </Link>
//             </div>

//             {/* MIDDLE: UNIFIED SEARCH & LOCATION DOCK */}
//             {/* MIDDLE: THE UNIFIED PREMIUM DOCK */}
//           <div className="hidden md:flex flex-1 items-center justify-center max-w-4xl relative z-[100] px-4">
//             <div className="relative flex items-center w-full bg-slate-100/40 backdrop-blur-md border border-slate-200/50 rounded-2xl p-1.5 transition-all duration-500 
//                 hover:bg-slate-100/80 hover:border-slate-300
//                 focus-within:bg-white focus-within:ring-[6px] focus-within:ring-emerald-500/10 focus-within:border-emerald-500 focus-within:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]
//                 group">
    
//     {/* SEARCH SECTION */}
//     <div className="relative flex-[2] flex items-center group/search">
//       <div className="absolute left-4 flex items-center justify-center pointer-events-none">
//         <Search 
//           size={18} 
//           className="text-slate-400 group-focus-within/search:text-emerald-600 group-focus-within/search:scale-110 transition-all duration-300" 
//         />
//       </div>

//       <input 
//         type="text" 
//         placeholder="Search for rentals..." 
//         className="w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none focus:ring-0 font-bold text-slate-800 placeholder:text-slate-400 text-sm tracking-tight"
//       />
//     </div>

//     {/* GLASS DIVIDER */}
//     <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-slate-200 to-transparent mx-2" />

//     {/* LOCATION SECTION */}
//     <div className="relative flex-1 min-w-[180px]">
//       <LocationService />
//     </div>

//     {/* INTERACTIVE GLOW LINE */}
//     <div className="absolute bottom-0 left-6 right-6 h-[2px] w-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent group-focus-within:w-[calc(100%-48px)] transition-all duration-700 ease-out" />
//   </div>
// </div>



//             {/* RIGHT: USER ACTIONS DOCK */}
//             <div className="flex items-center gap-4">
//               {status ? (
//                 <div className="flex items-center bg-slate-50 border border-slate-100 rounded-full p-1 shadow-sm hover:shadow-md transition-all duration-300">
//                   <div className="hidden sm:flex items-center px-2">
//                     <AddItemButton />
//                   </div>
                  
//                   <div className="w-[1px] h-6 bg-slate-200 mx-1" />

//                   <button 
//                     onClick={() => dispatch(setSideBarStatus(!sideBarComponentStatus))}
//                     className={`
//                       group flex items-center gap-3 py-1 pr-1 pl-4 rounded-full transition-all duration-500
//                       ${sideBarComponentStatus ? 'bg-slate-900' : 'bg-white shadow-sm border border-slate-50'}
//                     `}
//                   >
//                     <span className={`hidden lg:block text-[10px] font-black uppercase tracking-widest ${sideBarComponentStatus ? 'text-emerald-400' : 'text-slate-500'}`}>
//                       {sideBarComponentStatus ? 'Active' : 'Account'}
//                     </span>

//                     <div className={`
//                       relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500
//                       ${sideBarComponentStatus ? 'bg-emerald-500 rotate-[360deg]' : 'bg-slate-900'}
//                     `}>
//                       <User size={16} fill="currentColor" className={sideBarComponentStatus ? 'text-white' : 'text-slate-200'} />
//                       {!sideBarComponentStatus && (
//                         <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full">
//                            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
//                         </div>
//                       )}
//                     </div>
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-3">
//                   <Link to="/login" className="px-6 py-3 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-emerald-600 transition-all">Log in</Link>
//                   <Link to="/signup" className="px-8 py-4 bg-slate-900 hover:bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-95">Join Now</Link>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// const SidebarLink = ({ onclick, icon, label }) => (
//   <button onClick={onclick} className="group flex items-center gap-4 w-full p-4 text-slate-600 font-bold text-sm hover:bg-emerald-50 hover:text-emerald-600 rounded-[1.5rem] transition-all">
//     <span className="text-slate-300 group-hover:text-emerald-500 transition-colors">{icon}</span>
//     {label}
//   </button>
// );

// export default Header4;









//updated one
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
            <SidebarLink onclick={() => { dispatch(setIsThemeOpen(!isThemeOpen)); dispatch(setSideBarStatus(false)); }} icon={<Settings size={18}/>} label="Settings" desc="Preferences" />
            <SidebarLink onclick={() => { dispatch(setSideBarStatus(false)); }} icon={<ShoppingCart size={18}/>} label="Orders" desc="Transactions" />
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

