import React, { useState } from 'react';
import { Search, MapPin, User, Menu, Target, ChevronDown } from 'lucide-react';

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

export default HeaderComponent;