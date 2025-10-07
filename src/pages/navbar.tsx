// navbar.tsx
import React from 'react';

// A simple SVG icon for dropdown arrows
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// A placeholder logo icon
const LogoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="white"/>
    <circle cx="20" cy="20" r="8" fill="black"/>
  </svg>
);
  
const Navbar = () => {
  const navLinks = [
    { name: 'Product', hasDropdown: true },
    { name: 'Solutions', hasDropdown: true },
    { name: 'Resources', hasDropdown: true },
    { name: 'Company', hasDropdown: true },
    { name: 'Pricing', hasDropdown: false },
  ];
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Product+Sans&display=swap');
  
        .product-sans {
          font-family: 'Product Sans', sans-serif;
        }
      `}</style>
      
      <nav className="bg-black sticky top-0 z-50 product-sans">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex h-16 items-center justify-between">
                       
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <LogoIcon />
              <span className="text-xl font-semibold text-white">infyniq</span>
            </a>
             
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-10 text-sm font-medium text-white">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href="#" className="flex items-center transition hover:text-gray-300">
                      {link.name}
                      {link.hasDropdown && <ChevronDownIcon />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
                       
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm font-medium text-white transition hover:text-gray-300">
                Sign in
              </a>
              <a
                href="#"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-100"
              >
                Schedule a demo
              </a>
            </div>
           
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;