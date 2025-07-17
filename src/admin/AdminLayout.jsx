import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-[#FBF6E3] min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;