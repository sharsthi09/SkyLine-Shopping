import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoIosColorPalette } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { FaBagShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/reducers/AdminSlice';
import { FiLogOut } from 'react-icons/fi'; 

export default function AdminSideBar({ collapsed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const admin = useSelector((state) => state.admin.data);
  const token = useSelector((state) => state.admin.token);

  const lsData = JSON.parse(localStorage.getItem('adminData'));
  const lsToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!admin && !lsData) {
      navigate('/admin/login');
    } else {
      dispatch(login({ data: lsData, token: lsToken }));
    }
  }, []);

  const adminLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const navMenu = [
    {
      path: '/admin',
      name: 'Dashboard',
      icon: <FaHome />,
      color: 'text-[#8F5FE8]'
    },
    {
      path: '/admin/category',
      name: 'Category',
      icon: <BiSolidCategoryAlt />,
      color: 'text-[#F8A304]'
    },
    {
      path: '/admin/color',
      name: 'Color',
      icon: <IoIosColorPalette />,
      color: 'text-[#0090E7]'
    },
    {
      path: '/admin/product',
      name: 'Products',
      icon: <AiFillProduct />,
      color: 'text-[#F53839]'
    }
  ];

  return (
    <div
      className={`h-screen fixed bg-gradient-to-br from-[#081028] to-[#1c243c] text-white flex flex-col justify-between transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        <div className="flex items-center px-6 py-6 text-2xl font-bold border-b border-[#2E3445]">
          <FaBagShopping className="mr-3 text-white text-xl" />
          {!collapsed && <span>SKYLINE</span>}
        </div>

        <nav className="flex flex-col mt-6">
          {navMenu.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link to={item.path} key={index}>
                <div
                  className={`flex items-center px-6 py-3 transition-all space-x-3 ${
                    isActive
                      ? 'bg-gradient-to-br from-[#161b28] to-[#1e2b54] text-white rounded-e-3xl mr-2'
                      : 'hover:bg-gradient-to-br from-[#181f31] to-[#1e2b54] rounded-e-3xl text-gray-300 mr-2'
                  }`}
                >
                  <div
                    className={`${item.color} bg-[#3a3d48] rounded-full w-[32px] h-[32px] flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  {!collapsed && <span>{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-6 py-4 border-t border-[#2E3445] mb-[20px]">
        <button
          onClick={adminLogout}
          className="w-full py-3 text-lg bg-gradient-to-br from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium shadow-md"
        >
          {!collapsed ? 'Log Out' : <FiLogOut className="mx-auto text-xl" />}
        </button>
      </div>
    </div>
  );
}
