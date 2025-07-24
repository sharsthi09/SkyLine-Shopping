import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { X, Trash2 } from "lucide-react";
import { Context } from '../../MainContext';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CartDrawer from '../components/CartDrawer';
import WishlistDrawer from '../components/WishlistDrawer';


export default function WebsiteLayout() {



  return (
    <div className='font-playfair'>
      <Header
      />
      <CartDrawer/>
      <WishlistDrawer/>

      <Outlet />

      <Footer />
    </div>
  );
}



