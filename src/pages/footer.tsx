// footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');

        .product-sans {
          font-family: 'Product Sans', sans-serif;
        }
      `}</style>

      <footer className="bg-black text-white product-sans py-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
            
            {/* Logo and Description Column */}
            <div className="md:col-span-1">

              <Link to="/" className="flex items-center gap-1.5">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <img 
                    src="/datomly logo.png" 
                    alt="Datomly Logo" 
                    className="w-8 h-8 object-contain" 
                  />
                </div>

                <span className="text-[30px] font-semibold text-white leading-none">
                  datomly
                </span>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed mt-3">
                datomly is a product developed and owned by datomly, Inc.
              </p>

              {/* Accelerators */}
              <div className="mt-8">
                <h3 className="text-white font-semibold mb-4">Accelerators</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Microsoft</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Google for Startups</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">NVIDIA Inception Program</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Easy setup
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Solutions Column */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Solutions</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Retail/QSR: Papa Johns Case Blog Study
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Legal Tech: Legal Decoder Case Study
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Streaming and Entertainment: Plex Case Study
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Gov Tech: Orange County Courts Case Study
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 datomly
              </p>
              <div className="flex flex-wrap gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  DPA
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Vulnerability Disclosure Program
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
