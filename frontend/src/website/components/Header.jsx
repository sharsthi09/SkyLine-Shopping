import React, { useContext, useEffect, useState } from "react";
import img1 from "../images/skyline.png";
import img2 from "../images/download.png";
import img3 from "../images/skyline_shopping.png";
import img4 from "../images/banner-image-5.jpg";
import img5 from "../images/banner-image-4.jpg";
import img6 from "../images/kid1.jpg";
import img7 from "../images/kids-3.jpg";
import img8 from "../images/home-living.jpg";
import { IoMdSearch } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/reducers/UserSlice";
import { Context } from "../../MainContext";


export default function Header() {
  const { handleOpenCart, handleOpenWishlist, cartItems } = useContext(Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.data);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleSubMenu = () => {
    setOpenSubMenu(prev => !prev);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    const lsData = JSON.parse(localStorage.getItem('userLogin'));
    const lsToken = localStorage.getItem('userToken');
    if (lsData) {
      dispatch(login({ data: lsData, token: lsToken }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userToken');
    dispatch(login({ data: null, token: null }));
    navigate(`/userlogin?ref=home`);
  };



  // Toggle function
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  return (
    <div className="w-full">
      {/* top section */}
      <div className="w-full shadow-sm bg-gradient-to-r from-[#660033] via-[#4B0055] to-[#330066] h-20 flex items-center justify-between lg:pr-[30px] pr-4 md:pr-6 ">
        <div className=" lg:hidden pl-3 text-white text-3xl group cursor-pointer" onClick={toggleMobileMenu}>
          <IoMenu />
        </div>
        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-50 lg:hidden ">
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 -z-10 lg:hidden" onClick={toggleMobileMenu}></div>
            <div className="shadow-sm bg-gradient-to-r from-[#660033] via-[#4B0055] to-[#330066] text-white text-xl md:w-96 w-64 h-full p-5 overflow-y-auto duration-700 pr-6">

              <ul className="md:text-2xl md:pt-11">
                <li>
                  <div className=" flex z-30 lg:hidden bg-gray-800 rounded-md w-[210px] md:w-[340px] lg:w-[610px] h-10 bg-opacity-50">
                    <div className="w-[50px] flex items-center justify-center mr-3 ml-2"><IoMdSearch className="text-2xl text-white" /></div>
                    <input type="text" className="w-[330px] bg-transparent outline-none text-white" placeholder="Search skyline.in" />
                  </div>
                </li>
                <li><div className="relative group h-20 pt-7">
                  <Link to={''}>
                    <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full">Home</span></Link>
                </div></li>
                <li>
                  <div className="relative group h-20 pt-4">
                    <Link to={'shop/mens-shorts'}>
                      <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full " onClick={toggleSubMenu}>Men</span></Link>
                  </div>
                </li>
                <li><div className="relative group h-20 pt-4">
                  <Link to={'shop/women-tops'}>
                    <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full " onClick={toggleSubMenu}>Women</span></Link>
                </div>
                </li>
                <li><div className="relative group h-20 pt-4">
                  <Link to={'shop'}>
                    <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full " onClick={toggleSubMenu}>Kids</span></Link></div>
                </li>
                <li><div className="relative group h-20 pt-4">
                  <Link to={'shop'}>
                    <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full " onClick={toggleSubMenu}>Home & Kitchen</span></Link></div>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="h-12 w-[195px] lg:w-[250px] lg:h-16">
          <img
            src={img3}
            alt=""
            className=" w-full h-full cover "
          /></div>

        <div className=" hidden lg:flex justify-between items-center text-white w-[450px] h-20 gap-4">
          <div className="relative group h-20 pt-7">
            <Link to={''}>
              <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full">Home</span></Link>
          </div>
          <div className="relative group h-20 pt-7">
            <Link to={'shop/mens-shorts'}>
              <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full">Men</span></Link>
            <div className="absolute top-[79px] left-[-20px] bg-white z-20 w-[880px] h-[530px] rounded-b-md opacity-0 scale-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto  origin-top-left transition-all duration-700 shadow-lg flex">
              <div className=" w-[350px] h-full flex items-center justify-center">
                <img src={img5} alt="" className="w-[250px]" />
              </div>
              <div className="px-5 pt-9 w-[350px] h-full text-black">
                <ul>
                  <h1 className="text-xl mb-3 text-[#660033]">Topwear</h1>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">T-Shirts</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Casual Shirts</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Formal Shirts</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">SweatShirts</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Sweaters</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Jackets</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Blazers & Coats</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Suits</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Rain Jacket</li>
                </ul>
              </div>
              <div className="px-5 pt-9 w-[350px] h-full text-black">
                <ul>
                  <h1 className="text-xl mb-3 text-[#660033]">BottomWear</h1>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Jeans</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Casual Trousers</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Shorts</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Formal Trousers</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Track Pants & Joggers</li>
                </ul>
                <ul className="mt-4">
                  <h1 className="text-xl mb-3 text-[#660033]">Footwear</h1>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Casual Shoes</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Sports Shoes</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Formal Shoes</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Sneakers</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Sandals & Floaters</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Flip Flops</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Socks</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="relative group h-20 pt-7">
            <Link to={'shop/women-tops'}>
              <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full">Women</span></Link>
            <div className="absolute top-[79px] left-[-20px] bg-white z-20 w-[880px] h-[450px] rounded-b-md opacity-0 scale-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto  origin-top-left transition-all duration-700 shadow-lg flex">
              <div className=" w-[350px] h-full flex items-center justify-center">
                <img src={img4} alt="" className="w-[250px]" />
              </div>
              <div className="px-5 pt-9 w-[350px] h-full text-black">
                <ul>
                  <h1 className="text-xl mb-3 text-[#660033]">Indian & Fusion Wear</h1>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Kurtas & Suits</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Kurtis, Tunics & Tops</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Sarees</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Ethnic Wear</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Leggings, Salwars & Churidars</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Skirts & Palazzos</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Dress Materials</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Lehenga Cholis</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Dupattas & Shawls</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Jackets</li>
                </ul>
              </div>
              <div className="px-5 pt-9 w-[350px] h-full text-black">
                <ul>
                  <h1 className="text-xl mb-3 text-[#660033]">Gadgets</h1>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Headphones</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Smart Wearables</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Fitness Gadgets</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Speakers</li>
                </ul>
                <ul className="mt-4">
                  <h1 className="text-xl mb-3 text-[#660033]">Jewellery</h1>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Fashion Jewellery</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Fine Jewellery</li>
                  <li className="w-fit mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Earrings</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="relative group h-20 pt-7">
            <Link to={'shop/kids-dresses'}>
              <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full">Kids</span></Link>
            <div className="absolute top-[79px] left-[-90px] bg-white z-20 w-[880px] h-[450px] rounded-b-md opacity-0 scale-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto  origin-top-left transition-all duration-700 shadow-lg flex">
              <div className=" w-[350px] h-full flex items-start justify-center">
                <img src={img6} alt="" className="w-[250px] mt-5" />
              </div>
              <div className="px-5 pt-9 w-[260px] h-full text-black">
                <ul>
                  <h1 className="text-xl mb-3 text-[#660033]">Girl Clothing</h1>
                  <li className="mb-1 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full w-fit after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Dresses</li>
                  <li className="mb-1 w-fit relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Tops</li>
                  <li className="mb-1 w-fit relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Lenhenga Choli</li>
                  <li className="mb-1 w-fit relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Kurta Sets</li>
                  <li className="mb-1 w-fit relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Skirts & Shorts</li>
                  <h1 className="text-xl mt-6 mb-3 text-[#660033]">Boys Clothing</h1>
                  <li className="mb-1 w-fit relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">T-shirts</li>
                  <li className="mb-1 w-fit relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Shorts</li>
                  <li className="mb-1 w-fit relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Jeans</li>
                  <li className="mb-1 w-fit relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500">Ethnic Wear</li>
                </ul>
              </div>
              <div className=" w-[350px] h-full flex items-start justify-center">
                <img src={img7} alt="" className="w-[340px] mt-[140px] h-[290px] mr-[20px]" />
              </div>
            </div>
          </div>
          <div className="relative group h-20 pt-7">
            <Link to={'shop/home-living-furniture'}>
              <span className="mb-2 relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:bg-gradient-to-r after:from-pink-500 after:to-yellow-500 after:duration-300 hover:after:w-full">Home & Kitchen</span></Link>
            <div className="absolute top-[79px] left-[-170px] bg-white z-20 w-[880px] h-[450px] rounded-b-md opacity-0 scale-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto  origin-top-left transition-all duration-700 shadow-lg flex">
              <div className=" w-[840px] h-full flex items-center justify-center">
                <img src={img8} alt="" className="w-[800px] h-[410px] ml-9" />
              </div>
            </div>
          </div>
        </div>


        <div className="hidden lg:flex bg-gray-600 lg:w-[380px] h-10 rounded-md bg-opacity-50">
          <div className="w-[50px] flex items-center justify-center"><IoMdSearch className="text-2xl text-white" /></div>
          <input type="text" className="w-[330px] bg-transparent outline-none text-white" placeholder="Search skyline.in" />
        </div>
        <div className="flex gap-1 lg:ml-0 ml-10 md:ml-96 justify-center">
          <div className="flex mt-1 items-center justify-center group lg:w-[40px] lg:h-[40px] lg:mt-1 w-[30px] h-[30px] rounded-full">
            <FaRegHeart className="text-white text-xl lg:text-3xl mt-1 block group-hover:hidden transition duration-700" />
            <FaHeart className="text-white text-xl lg:text-3xl mt-1 hidden group-hover:block transition duration-700 cursor-pointer" onClick={handleOpenWishlist} />
          </div>
          <div className="relative mt-2">
            <div className="absolute left-[15px] top-[-7px] lg:top-[-10px] lg:left-[22px] text-red-500 text-xs pt-1 lg:pt-0 lg:text-lg pb-1 lg:pb-2  flex justify-center items-center font-semibold border w-[15px] h-[15px]  lg:w-[20px] lg:h-[20px] rounded-full bg-white"> {cartItems.length}</div>
            <TiShoppingCart className="text-white lg:text-4xl text-2xl lg:mt-0 cursor-pointer" onClick={handleOpenCart} />
          </div>

          {
            user ? (
              <div className="relative lg:hidden mt-2 ml-2 text-white">
                {/* User Icon */}
                <div
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex gap-1 cursor-pointer"
                >
                  <FaUser className="mt-1" />
                </div>

                {/* Dropdown (only visible when showDropdown is true) */}
                {showDropdown && (
                  <div className="absolute top-[36px] right-0 w-[180px] bg-white text-black shadow-lg rounded-md z-50">
                    <div className="px-4 py-2 border-b text-sm">Hello, {user?.name}</div>
                    <Link
                      to="/user/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Visit My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={`/userlogin?ref=home`}>
                <div className="flex lg:hidden gap-1 mt-2 ml-2 text-white rounded-sm">
                  <FaUser className="mt-1" />
                </div>
              </Link>
            )}

          {
            user ? (
              <div className="relative group hidden lg:flex items-center mt-2 ml-2 cursor-pointer">
                <div className="flex gap-1 items-center text-white bg-gray-700 hover:bg-gray-500 px-3 py-1 rounded-sm">
                  <FaUser className="mt-1" />
                  <span>Profile</span>
                </div>
                {/* Dropdown on hover */}
                <div className="absolute top-[42px] right-0 w-[180px] bg-white text-black shadow-lg rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
                  <div className="px-4 py-2 border-b text-sm">Hello, {user?.name}</div>
                  <Link to={"/profile"} className="block px-4 py-2 hover:bg-gray-100 text-sm">Visit My Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <Link to={`/userlogin?ref=home`}>
                <div className="hidden lg:flex gap-1 mt-2 ml-2 text-white bg-red-500 h-[36px] hover:bg-red-300 px-3 py-1 rounded-sm">
                  <FaUser className="mt-1" /> LogIn
                </div>
              </Link>
            )
          }

        </div>


      </div>


      {/* bottom section */}
      <div className="relative md:h-10 h-7 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e5ac00] via-[#f9cf26] to-[#e5ac00] opacity-80"></div>
        <div className="relative z-10 flex items-center h-full text-white uppercase">
          <div className="flex whitespace-nowrap animate-marquee lg:space-x-48 space-x-11 md:space-x-28">
            <div className="mx-4">Flat <span className="text-lg md:text-2xl">100</span> OFF On All Products - USECODE : <span className="font-bold">SKYSHOP</span> <span className="text-2xl">100</span></div>
            <div className="mx-4">Flat <span className="text-lg md:text-2xl">200</span> OFF On All Products - USECODE : <span className="font-bold">SKYSHOP</span> <span className="text-2xl">200</span></div>
            <div className="mx-4">Flat <span className="text-lg md:text-2xl">100</span> OFF On All Products - USECODE : <span className="font-bold">SKYSHOP</span> <span className="text-2xl">100</span></div>
            <div className="mx-4">Flat <span className="text-lg md:text-2xl">200</span> OFF On All Products - USECODE : <span className="font-bold">SKYSHOP</span> <span className="text-2xl">200</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
