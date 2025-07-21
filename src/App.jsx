import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import NProgress from "nprogress";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HomePage from './pages/HomePage';
import EmailConfirmPage from './pages/EmailConfirmPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ServiceList from './components/ServiceList';
import ServiceDetails from './pages/ServiceDetails';
import AddServices from './pages/AddServices';
import MyOrders from './pages/MyOrders';
import LandingPage from './pages/LandingPage';
import WalletPage from './pages/WalletPage';
import SettingsPage from './pages/SettingsPage';
import AdminLayout from './admin/AdminLayout';
import ManageUser from './admin/ManageUser';
import ManageServices from './admin/ManageServices';
import ManageCategories from './admin/ManageCategories';
import EditServicePage from './pages/EditServicePage';
function App() {
  
 
  // ✅ 1. الحالة العامة للوضع الداكن
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ✅ 2. تطبيق الوضع الداكن على عنصر <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/register" element={<RegisterPage darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/privacy" element={<PrivacyPolicy darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/home" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/confirm-email" element={<EmailConfirmPage darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/profile" element={<ProfilePage darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/edit-profile" element={<EditProfilePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/change-password" element={<ChangePasswordPage darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/services/:id" element={<ServiceDetails darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/add-service" element={<AddServices darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/my-orders" element={<MyOrders darkMode={darkMode} setDarkMode={setDarkMode} />} />

      
        <Route path="/" element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/wallet" element={<WalletPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/settings" element={<SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/admin/users" element={<ManageUser />}/>
        <Route path="/admin/services" element ={<ManageServices/>}/>
        <Route path="/admin/categories" element={<ManageCategories/>} />
        <Route path="/edit-service/:id" element={<EditServicePage/>}/>
        
      </Routes>
      <ToastContainer position="top-center" autoClose={2000}/>
    </Router>
  );
}

export default App;