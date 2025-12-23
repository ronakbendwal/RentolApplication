
import { Link,} from "react-router-dom";
import { useState } from "react";
import CategoryDropdown from "./CategoryDropDown";
const Header = () => {

  const [profileOpen,setProfileOpen]=useState(false)


  return (
      <header className="w-full bg-white shadow-md sticky top-0 z-50">
      
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 tracking-wide">
          Rentol
        </div>

        {/* Search + Location */}
        <div className="flex items-center gap-3 w-[45%]">
          <input
            type="text"
            placeholder="Search items to rent..."
            className="flex-1 px-4 py-2 border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
           />

          <button
           className="px-4 py-2 bg-blue-600 rounded-full text-white text-sm font-medium hover:bg-blue-700 transition"
           >
           Search
          </button>

          <select className=" px-4 py-2 border rounded-130 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <option>Your Location</option>
            <option>Indore</option>
            <option>Bhopal</option>
            <option>Ujjain</option>
          </select>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 relative">

          {/* Put Item Button */}
          <Link
            className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium shadow-sm"
          >
            + Rent
          </Link>

          {/* Profile Button */}
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-500 transition"
          >
            <span className="font-semibold text-gray-700">R</span>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-14 w-52 bg-white border rounded-lg shadow-lg overflow-hidden animate-fadeIn">
              <Link
              className="block px-4 py-3 hover:bg-gray-100 transition">
              See Profile
              </Link>

              <Link
              className="block px-4 py-3 hover:bg-gray-100 transition">
              Your Items
              </Link>

              <Link
              className="block px-4 py-3 hover:bg-gray-100 transition">
               Cart
              </Link>
              <button
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Category Bar */}
      <div className="border-t bg-gray-50 px-4 py-2">
        <CategoryDropdown/>
      </div>
      
       
      </header>
    // <header>
    //   <nav className="bg-white border-b fixed w-full top-0 z-50">
    //     <div className="max-w-7xl mx-auto px-4">
    //       <div className="flex justify-between items-center h-16">

    //         {/* Logo */}
    //         <Link to="/" className="text-2xl font-bold text-blue-600">
    //           Rentol
    //         </Link>

    //         {/* Nav Items */}
    //         <ul className="flex items-center gap-6">
    //           {navItem.map((item) =>
    //             item.activate ? (
    //               <li key={item.name}>
    //                 <button
    //                   onClick={() => navigate(item.url)}
    //                   className="text-gray-700 font-medium hover:text-blue-600 transition"
    //                 >
    //                   {item.name}
    //                 </button>
    //               </li>
    //             ) : null
    //           )}

    //           {/* Logout */}
    //           {Authstatus && (
    //             <>
                
                
    //             <button onClick={()=>{navigate('/postform')}}>RentOut</button>
    //               <LogoutButton />
    //           </>
    //           )}
    //         </ul>

    //       </div>
    //     </div>
    //   </nav>
    // </header>
  );
};

export default Header;