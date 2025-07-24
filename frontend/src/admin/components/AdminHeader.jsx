import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/reducers/AdminSlice';
import { FaBell, FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoIosMenu } from "react-icons/io";

export default function AdminHeader({ toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.data);
  const [searchTerm, setSearchTerm] = useState('');

  const adminLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement your search functionality here
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-tr from-[#081028] to-[#1b274c] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-6">
        <IoIosMenu
          onClick={toggleSidebar}
          className="cursor-pointer text-2xl text-white hover:text-gray-300 transition"
        />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for..."
            className="bg-transparent border border-gray-700 text-white placeholder-gray-400 rounded-md pl-10 pr-4 py-2 w-[550px] focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <img
          src="https://flagcdn.com/in.svg"
          alt="Language"
          className="w-6 h-6 rounded-sm"
        />
        <FaBell className="text-gray-300 w-5 h-5 cursor-pointer hover:text-white transition" />
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="admin"
            className="rounded-full w-9 h-9 object-cover border-2 border-white"
          />
          <span className="font-medium">{admin?.name || 'Admin'}</span>
        </div>
        <button
          onClick={adminLogout}
          className="ml-2 bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 px-3 py-1.5 rounded-md flex items-center gap-1"
        >
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}