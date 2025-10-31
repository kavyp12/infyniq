// Sidebar.tsx - Create this new file

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, PlusCircle, LogOut, Database } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/ai-assistant', icon: MessageSquare, label: 'AI Assistant' },
    { to: '/setup', icon: PlusCircle, label: 'New Database' },
  ];

  return (
    <aside className="w-20 bg-white border-r border-gray-300 flex flex-col items-center py-6 space-y-6 shadow-sm product-sans">
      <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center border border-indigo-200">
        <Database className="w-6 h-6 text-indigo-600" />
      </div>

      <nav className="flex flex-col items-center space-y-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `p-3 rounded-lg transition-colors duration-200 relative group ${
                isActive ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
            title={link.label}
          >
            <link.icon className="w-6 h-6" />
            <span className="absolute left-full ml-4 px-2 py-1 bg-white text-gray-900 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-300 shadow-md">
              {link.label}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="p-3 rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors duration-200 relative group"
          title="Logout"
        >
          <LogOut className="w-6 h-6" />
          <span className="absolute left-full ml-4 px-2 py-1 bg-white text-gray-900 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-300 shadow-md">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;