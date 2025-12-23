import { useState } from "react";

const categories = {
  Vehicles: ["Cars", "Bikes", "Scooters", "Bicycles"],
  Properties: ["Houses", "Apartments", "PG & Hostels", "Shops"],
  Electronics: ["Mobiles", "Laptops", "TVs", "Accessories"],
  Furniture: ["Sofa", "Beds", "Dining", "Home Decor"],
  Fashion: ["Men", "Women", "Kids"],
  Services: ["Cleaning", "Repair", "Packers & Movers"],
};

function CategoryDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full ">
      {/* Trigger */}
      <div
        className="flex items-center gap-2 px-3 py-2 cursor-pointer font-semibold hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <span>All Categories</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full w-full bg-white shadow-xl z-50">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-5 gap-8">
            {Object.entries(categories).map(([title, items]) => (
              <div key={title}>
                <h3 className="font-semibold text-gray-900 mb-3">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;