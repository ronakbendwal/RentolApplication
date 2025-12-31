import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black tracking-tight text-white mb-6">
              RENTOL<span className="text-blue-500">.</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
              The world's most versatile rental marketplace. From everyday tools to luxury properties, we connect owners with seekers in a trusted, local community.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h3 className="text-white font-bold mb-6">Rent Items</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Properties & Spaces</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cars & Vehicles</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Bikes & Scooters</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Tools & Equipment</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Personal Items</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white font-bold mb-6">Company</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Rentol</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">List your Item</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-blue-500 mt-1" />
                <span>support@rentol.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-blue-500 mt-1" />
                <span>+1 (555) 000-RENT</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-500 mt-1" />
                <span>123 Rental Way,<br />San Francisco, CA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2024 Rentol Inc. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;