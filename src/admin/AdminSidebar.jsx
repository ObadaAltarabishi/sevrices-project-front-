import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaThLarge, FaUsers, FaCogs,
  FaClipboardList
} from 'react-icons/fa';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/admin/services',
      label: 'Manage Services',
      icon: <FaCogs />,
    },
    {
      path: '/admin/users',
      label: 'Manage Users',
      icon: <FaUsers />,
    },
    {
      path: '/admin/categories',
      label: 'Manage Categories',
      icon: <FaThLarge />,
    },
    {
      path:'/admin/orders',
      label:'Manage Orders',
      icon:<FaClipboardList/>

    },
  ];

  return (
    <aside className="w-64 bg-gradient-to-r from-[#d29851] to-[#FEF8E7] text-[#262626] p-6 min-h-screen shadow-md">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#0f0e0e] text-center">Admin Panel</h1>
      </div>
      <nav className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition duration-200 ${
              location.pathname === item.path
                ? 'bg-[#FD7924] text-white'
                : 'hover:bg-[#FD7924]/20 hover:text-[#FD7924]'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;