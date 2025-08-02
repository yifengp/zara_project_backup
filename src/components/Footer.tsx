import React from 'react';
import { Twitter, Linkedin, Facebook, Github, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Help */}
          <div>
            <h4 className="text-sm font-medium mb-6 tracking-wide text-gray-500 uppercase">HELP</h4>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#" className="hover:text-black transition-colors text-sm">MY ZARA ACCOUNT</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">ITEMS AND SIZES</a></li>
              <li>
                <a href="#" className="hover:text-black transition-colors text-sm flex items-center gap-2">
                  GIFT OPTIONS
                  <span className="bg-green-600 text-white px-2 py-1 text-xs rounded">New</span>
                </a>
              </li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">SHIPPING</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">PAYMENT AND INVOICES</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">MY PURCHASES</a></li>
            </ul>
          </div>
          
          {/* Follow Us */}
          <div>
            <h4 className="text-sm font-medium mb-6 tracking-wide text-gray-500 uppercase">FOLLOW US</h4>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#" className="hover:text-black transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">Newsletter</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">TIKTOK</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">INSTAGRAM</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">FACEBOOK</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">X</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">PINTEREST</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-sm font-medium mb-6 tracking-wide text-gray-500 uppercase">COMPANY</h4>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#" className="hover:text-black transition-colors text-sm">ABOUT US</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">JOIN LIFE</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">OFFICES</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">STORES</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">WORK WITH US</a></li>
            </ul>
          </div>
          
          {/* Policies */}
          <div>
            <h4 className="text-sm font-medium mb-6 tracking-wide text-gray-500 uppercase">POLICIES</h4>
            <ul className="space-y-4 text-gray-700">
              <li><a href="#" className="hover:text-black transition-colors text-sm">PRIVACY POLICY</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">PURCHASE CONDITIONS</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">PRIVACY MANAGEMENT</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">GIFT CARD CONDITIONS</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">TERMS AND CONDITIONS OF USE</a></li>
              <li><a href="#" className="hover:text-black transition-colors text-sm">USE OF THE GIFT VIDEO</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p className="text-sm">&copy; 2025 All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Social media icons */}
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;