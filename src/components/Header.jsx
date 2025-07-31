import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaClock } from 'react-icons/fa';
import logo from '../assets/logo.png';
import {
  FaBars,
  FaSearch,
  FaBell,
  FaUser,
  FaPlus,
  FaClipboardList,
  FaWallet,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import axios from 'axios';

export default function Header({
  searchTerm,
  setSearchTerm,
  priceFilter,
  setPriceFilter,
  durationFilter,
  setDurationFilter,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const notificationRef = useRef(null);

  const handleMenuClick = (path) => {
    setShowMenu(false);
    if (path === '/') {
      localStorage.removeItem('user')
    }
    navigate(path);
  };

  useEffect(() => {

    const userData = localStorage.getItem('user');
    if (userData) {

      setUser(JSON.parse(userData).user);
      console.log(JSON.parse(userData))
      setTimeout(() => {
        setHasNotifications(true);
      }, 2000);
    }
    console.log(user)
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    try {
      axios.get('http://127.0.0.1:8000/api/notifications', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
        },
      }).then((res) => {
        console.log(res.data.data)

        setNotifications(res.data.data)

      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {

    }

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md" style={{ backgroundColor: '#FBF6E3' }}>
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="logo" className="h-16 w-auto object-contain" />
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-3 flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-10 py-2 border border-[#FD7924] rounded-md focus:ring-2 focus:ring-[#FD7924] text-[#262626]"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#FD7924]" />
        </div>

        {/* Price Filter */}
        <div className="relative">
          <FaDollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#FD7924] text-sm" />
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="pl-7 pr-3 py-2 border border-[#FD7924] rounded-md text-sm text-[#262626] bg-[#F7E9CC]"
          >
            <option value="">Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Duration Filter */}
        {/* <div className="relative">
          <FaClock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#FD7924] text-sm" />
          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="pl-7 pr-3 py-2 border border-[#FD7924] rounded-md text-sm text-[#262626] bg-[#F7E9CC]"
          >
            <option value="">Time</option>
            <option value="short">Short</option>
            <option value="long">Long</option>
          </select>
        </div> */}
      </div>

      {/* Notifications + Profile + Menu */}
      <div className="relative flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setHasNotifications(false);
            }}
          >
            <FaBell className="w-5 h-5 text-[#FD7924]" />
            {hasNotifications && (
              <>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md border z-50">
              <div className="p-3 border-b font-semibold text-[#262626]">Notifications</div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((note, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm hover:bg-[#F7E9CC] text-[#262626] border-b last:border-none"
                  >
                    {note.content}
                  </li>
                ))}
              </ul>
              {/* <div className="text-center text-sm text-[#FD7924] hover:underline p-2 cursor-pointer">
                View all
              </div> */}
            </div>
          )}
        </div>

        <div className='flex'>
          {user.role == 'admin' ? (
            <button
              type="button"
              className="w-full py-3 px-3 bg-[#FD7924] text-white rounded-full hover:bg-[#e7671b] transition" onClick={() => navigate('/admin/users')}
            >
              Dashboard
            </button>
          ) : (null)}

        </div>
        {/* Profile + Menu Button */}
        {user ? (
          <div className="flex items-center gap-2">

            <div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FD7924] cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <img
                src={user.profile.picture_url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="text-xl text-[#FD7924]"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaBars />
            </button>
          </div>
        ) : (null)}


        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute top-full right-0 mt-2 bg-white border shadow-lg rounded-md w-40 z-50">
            {[
              { label: 'Profile', path: '/profile', icon: <FaUser className="mr-2" /> },
              { label: 'Add Service', path: '/add-service', icon: <FaPlus className="mr-2" /> },
              { label: 'My Orders', path: '/my-orders', icon: <FaClipboardList className="mr-2" /> },
              { label: 'Wallet', path: '/wallet', icon: <FaWallet className="mr-2" /> },
              { label: 'Settings', path: '/settings', icon: <FaCog className="mr-2" /> },
              { label: 'Log Out', path: '/', icon: <FaSignOutAlt className="mr-2" /> },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.path)}
                className="flex items-center w-full text-left px-4 py-2 hover:bg-[#F7E9CC] text-sm text-[#262626]"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}