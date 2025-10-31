import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X } from 'lucide-react';

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const LogoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="white" />
    <circle cx="20" cy="20" r="8" fill="black" />
  </svg>
);

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const email = localStorage.getItem('user_email');
    setIsAuthenticated(!!userId);
    setUserEmail(email || '');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserEmail('');
    setIsMobileMenuOpen(false);
    navigate('/signin');
  };

  const navLinks = [
    { name: 'Product', hasDropdown: true, href: '/product' },
    // { name: 'Solutions', hasDropdown: true, href: '#' },
    // { name: 'Resources', hasDropdown: true, href: '#' },
    // { name: 'Company', hasDropdown: true, href: '#' },
    // { name: 'Pricing', hasDropdown: false, href: '#' },
  ];

  // Add Dashboard link only for authenticated users
  if (isAuthenticated) {
    navLinks.push({ name: 'Dashboard', hasDropdown: false, href: '/dashboard' });
  }

  // Add AI Assistant link
  navLinks.push({ name: 'AI Assistant', hasDropdown: false, href: '/AIassistant' });

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
            <Link to="/" className="flex items-center gap-2">
              <LogoIcon />
              <span className="text-xl font-semibold text-white">infyniq</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-10 text-sm font-medium text-white">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className="flex items-center transition hover:text-gray-300"
                    >
                      {link.name}
                      {link.hasDropdown && <ChevronDownIcon />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <User className="w-4 h-4" />
                    <span className="max-w-[150px] truncate">{userEmail}</span>
                  </div>
                  
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-full bg-gray-800 hover:bg-gray-700 px-5 py-2.5 text-sm font-medium text-white transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Sign In Link */}
                  <Link 
                    to="/signin" 
                    className="text-sm font-medium text-white transition hover:text-gray-300"
                  >
                    Sign in
                  </Link>
                  
                  {/* Get Started Button */}
                  <Link
                    to="/signup"
                    className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-100"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-gray-300 transition"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-800">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center text-sm font-medium text-white hover:text-gray-300 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                      {link.hasDropdown && <ChevronDownIcon />}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Auth Section */}
              <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <User className="w-4 h-4" />
                      <span className="truncate">{userEmail}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-gray-800 hover:bg-gray-700 px-5 py-2.5 text-sm font-medium text-white transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="block text-center text-sm font-medium text-white hover:text-gray-300 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="block text-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-100 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;