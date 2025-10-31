import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Menu, X } from 'lucide-react';

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
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

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
  ];

  if (isAuthenticated) {
    navLinks.push({ name: 'Dashboard', hasDropdown: false, href: '/dashboard' });
  }

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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-10 text-[18px] font-medium text-white">
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
            <div className="hidden lg:flex items-center gap-6">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 text-gray-300 text-[16px]">
                    <User className="w-5 h-5" />
                    <span className="max-w-[180px] truncate">{userEmail}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-full bg-gray-800 hover:bg-gray-700 px-6 py-3 text-[16px] font-medium text-white transition"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/signin" 
                    className="text-[18px] font-medium text-white transition hover:text-gray-300"
                  >
                    Sign in
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="rounded-full bg-white px-6 py-3 text-[16px] font-medium text-black transition hover:bg-gray-100"
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
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-800">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center text-[18px] font-medium text-white hover:text-gray-300 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                      {link.hasDropdown && <ChevronDownIcon />}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-gray-800 space-y-4">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 text-gray-300 text-[16px]">
                      <User className="w-5 h-5" />
                      <span className="truncate">{userEmail}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-gray-800 hover:bg-gray-700 px-6 py-3 text-[16px] font-medium text-white transition"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="block text-center text-[18px] font-medium text-white hover:text-gray-300 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="block text-center rounded-full bg-white px-6 py-3 text-[16px] font-medium text-black hover:bg-gray-100 transition"
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
