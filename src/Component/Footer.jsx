import React from 'react'

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>
       <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Rentol</h2>
          <p className="mt-4 text-sm">
            Rentol is a peer-to-peer rental platform where users can rent out
            or rent personal items, properties, vehicles, and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/rentals" className="hover:text-white">Browse Rentals</Link></li>
            <li><Link to="/add-item" className="hover:text-white">List an Item</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/category/property" className="hover:text-white">Property</Link></li>
            <li><Link to="/category/cars" className="hover:text-white">Cars</Link></li>
            <li><Link to="/category/items" className="hover:text-white">Personal Items</Link></li>
            <li><Link to="/category/others" className="hover:text-white">Others</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@rentol.com</li>
            <li>Phone: +91 9XXXX XXXXX</li>
            <li>Location: India</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Rentol. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Footer