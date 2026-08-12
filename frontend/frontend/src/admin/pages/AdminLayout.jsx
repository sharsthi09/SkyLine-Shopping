import React, { useState } from 'react';
import AdminSideBar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSideBar collapsed={collapsed} />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        <AdminHeader toggleSidebar={toggleSidebar} />
        <div className="bg-[#081027]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
