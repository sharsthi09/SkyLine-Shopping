import React, { useContext, useEffect, useState } from 'react'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import img6 from "../images/product-item-1.jpg";
import { FaTags } from "react-icons/fa";
import cat1 from '../images/cat1.png';
import cat2 from '../images/cat2.png';

import banner from '../images/shop_banner.jpg';
import { X, Trash2 } from "lucide-react";
import { Link, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaPinterest, FaGooglePlusG } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { Context } from '../../MainContext';


const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`bg-[#e5ac00] text-white w-[150px] px-4 py-2 rounded hover:opacity-80 transition ${className}`}
  >
    {children}
  </button>
);

export default function Shop() {

  const {
    addToCart,
    addToWishlist,
    wishlistItems,
  } = useContext(Context)

  const [priceRange, setPriceRange] = useState([100, 10000]);
  const [previewProduct, setPreviewProduct] = useState(null); // <-- NEW modal state
  const [limit, setLimit] = useState(10);
  const { categoryslug } = useParams();
  const [productColor, setProductColor] = useState(null);
  const navigate = useNavigate();


  const handleViewProduct = (product_id) => {
    navigate(`/product/${product_id}`);
  };

  // console.log(productColor)

  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(limit)
  const { toastMsg,
    fetchCategory,
    allCategory,
    API_URL,
    Category_URL,
    Color_URL,
    fetchColor,
    allColor,
    Product_URL,
    fetchProduct,
    allProduct } = useContext(Context);

    // console.log(allProduct)

  useEffect(
    () => {
      fetchCategory();
      fetchColor();
      if (searchParams.get('limit')) {
        setLimit(searchParams.get('limit'));
      }

      // Color
      if (searchParams.get('color')) {
        setProductColor(searchParams.get('color'));
      }

      // Price range
      if (searchParams.get('minPrice') && searchParams.get('maxPrice')) {
        setPriceRange([
          Number(searchParams.get('minPrice')),
          Number(searchParams.get('maxPrice')),
        ]);
      }

    }, []
  )

  useEffect(
    () => {
      const query = {};
      if (categoryslug) query.category = categoryslug;
      if (productColor) {
        query.productColor = productColor;
      }
      if (priceRange) {
        query.minPrice = priceRange[0];
        query.maxPrice = priceRange[1];
      }
      query.limit = limit;


      setSearchParams(query);
      fetchProduct(null, limit, categoryslug, productColor, priceRange[0], priceRange[1]);
    }, [limit, categoryslug, productColor, priceRange]
  )

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };


  // New function to open preview modal
  const openPreviewModal = (product) => {
    setPreviewProduct(product);
  };

  // New function to close preview modal
  const closePreviewModal = () => {
    setPreviewProduct(null);
  };



  return (
    <div className="relative container mx-auto pb-[90px] lg:pb-[200px]">

      {/* Show ProductPreview modal only when previewProduct is set */}
      {previewProduct && (
        <Modal onClose={closePreviewModal}>
          <ProductPreview product={previewProduct} />
        </Modal>
      )}

      <div className="flex flex-col md:flex-row">


        {/* Main Content */}
        <div className="md:w-3/4 w-full order-1 md:order-1">
          {/* Banner */}
          <div
            className="relative h-[250px] bg-cover bg-center"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-[#4B0055] font-alice">All Products</h1>
            </div>
          </div>


          {/* Mobile filter */}
          <details className="md:hidden mb-4 ml-5">
            <summary className="text-xl font-semibold text-[#4B0055]">Filters</summary>
            <div className="mt-4 border-t pt-4">
              <FilterContent priceRange={priceRange} onChange={handleSliderChange} allCategory={allCategory} allColor={allColor} setProductColor={setProductColor} productColor={productColor} />
            </div>
          </details>

          {/* Top bar */}
          <div className="flex justify-between items-center mb-6 px-4">
            <p className="text-gray-600">Showing 36 products</p>
            <div>
              <label className="mr-2 text-gray-600">View:</label>
              <select
                value={limit}
                className="border border-gray-300 rounded p-1 px-4"
                onChange={(e) => setLimit(parseInt(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={45}>45</option>
              </select>
            </div>

          </div>

          {/* Products Grid */}
          <div className="flex flex-wrap justify-start px-2 sm:px-4">
            {
              // console.log(allProduct)
              Array.isArray(allProduct) &&
              allProduct.map(
                (product, index) => {
                  const offerPrice = (product.original_price * product.discount_percentage / 100);
                  // console.log(product._id)
                  return (
                    <div className="w-1/2 sm:w-1/3 lg:w-1/4 p-2">
                      <div className="bg-white shadow-md rounded-lg overflow-hidden group relative">
                        <div className="relative overflow-hidden group">
                          <span className="block relative">
                            <img
                              src={API_URL + `/images/product/` + product.main_img}
                              alt="Product"
                              className="w-full h-56 lg:h-80 cover transition-transform duration-300 group-hover:scale-105 group-hover:hidden"
                            />
                            <img
                              src={API_URL + `/images/product/` + product.other_img[0]}
                              alt="Product"
                              className="w-full h-56 lg:h-80 cover transition-transform duration-300 group-hover:scale-105 hidden group-hover:block"
                            />
                          </span>

                          {/* Action Buttons */}
                          <div className="absolute inset-0 flex items-end pb-7 justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <AiOutlineArrowsAlt
                              onClick={() =>
                                openPreviewModal({
                                  id: product.category_id,
                                  name: product.productName,
                                  title: product.category_id.categoryname,
                                  images: product.other_img.map(img => API_URL + `/images/product/` + img),
                                  price: product.final_price,
                                  mrp: product.original_price,
                                  offer: `${product.discount_percentage}% OFF`,
                                  colors: product.colors.map(c => c.colorCode),  // or you can map to class names if needed
                                  sizes: ['S', 'M', 'L', 'XL'],
                                })

                              }
                              className="w-10 h-10 bg-white p-2 text-black rounded-full translate-y-[50px] group-hover:translate-y-0 duration-200 hover:bg-[#e5ac00] hover:text-white hover:rotate-180 cursor-pointer"
                            />
                            {wishlistItems.find(item => item.id === product._id) ? (
                              <FaHeart
                                className="w-10 h-10 bg-[#e5ac00] p-2 text-white rounded-full translate-y-[50px] group-hover:translate-y-0 duration-500 rotate-[360deg] cursor-pointer"
                              />
                            ) : (
                              <FaHeart
                                onClick={() =>
                                  addToWishlist({
                                    id: product._id,
                                    title: product.productName,
                                    img: API_URL + `/images/product/` + product.main_img,
                                    price: product.final_price
                                  })
                                }
                                className="w-10 h-10 bg-white p-2 text-black rounded-full translate-y-[50px] group-hover:translate-y-0 duration-500 hover:bg-[#e5ac00] hover:text-white hover:rotate-[360deg] cursor-pointer"
                              />
                            )}

                            <FaShoppingBag
                              onClick={() =>
                                addToCart({ id: product._id, discount: product.discount_percentage, title: product.productName, img: API_URL + `/images/product/` + product.main_img, price: product.final_price })
                              }
                              className="w-10 h-10 bg-white p-2 text-black rounded-full translate-y-[50px] group-hover:translate-y-0 duration-1000 hover:bg-[#e5ac00] hover:text-white hover:rotate-[360deg] cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Product Info */}
                        <div onClick={() => handleViewProduct(product._id)}>
                          <div className="text-center p-3">
                            <h6 className="text-sm font-semibold text-[#e5ac00] uppercase tracking-wide">
                              {product.productName}
                            </h6>
                            <h3 className="text-lg font-medium text-[#4B0055] mt-1 mb-2">
                              {product.category_id?.categoryname}
                            </h3>
                            <div className="text-base text-gray-800 font-semibold hidden group-hover:block duration-500">
                              ₹{product.final_price}{' '}
                              <span className="line-through text-gray-500 text-sm ml-1">₹{product.original_price}</span>{' '}
                              <span className="text-yellow-600 text-sm font-medium ml-1">(`${product.discount_percentage}% off`)</span>
                            </div>
                            <div className="text-[#e5ac00] mt-2 justify-center items-center gap-2 text-sm font-semibold hidden group-hover:flex duration-500">
                              <FaTags /> Offer Price: ₹{offerPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              )
            }


          </div>

          <div className='flex justify-center items-center'>
            <div onClick={() => setLimit(prev => parseInt(prev) + 5)}
              className='flex justify-center items-center px-5 py-3 rounded-md mt-10  bg-[#e5ac00] hover:bg-[#e5ac00d2] text-white transition'>Load More</div>
          </div>
        </div>

        {/* Sidebar Filters */}
        <div className="md:w-1/4 w-full p-4 order-2 md:order-2 mb-[200px]">


          {/* Desktop filter */}
          <div className="hidden md:block sticky top-0" >
            <FilterContent priceRange={priceRange} onChange={handleSliderChange} allCategory={allCategory} allColor={allColor} setProductColor={setProductColor} productColor={productColor} />
          </div>
        </div>
      </div>
    </div>
  );
}


function FilterContent({ priceRange, onChange, allCategory, allColor, setProductColor, productColor }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <div className="border p-6 rounded">
      <h2 className="text-2xl font-bold mb-7 text-[#4B0055]">Filters</h2>

      <h3 className="mb-3 text-sm uppercase text-[#4B0055] font-semibold">Categories</h3>
      <ul className="list-none mb-4 space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">

        {/* All Products */}
        <li
          onClick={() => setSelectedCategory('all')}
          className="relative overflow-hidden cursor-pointer p-2 rounded-md justify-between text-gray-700 flex group transition-colors duration-300"
        >
          <Link to={`/shop`} className="flex w-full justify-between items-center">
            <div
              className={`absolute inset-0 bg-gradient-to-r from-[#efd791] via-[#fbd22e] to-[#d7a50e] transform transition-transform duration-500 ease-out rounded-md ${selectedCategory === 'all' ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'
                }`}
            />
            <span className={`relative z-10 ${selectedCategory === 'all' ? 'text-[#4B0055]' : 'group-hover:text-[#4B0055]'}`}>
              All Products
            </span>
          </Link>
        </li>

        {/* Categories */}
        {Array.isArray(allCategory) &&
          allCategory.map((category, index) => (
            <li
              key={index}
              onClick={() => setSelectedCategory(category.categoryslug)}
              className="relative overflow-hidden cursor-pointer p-2 rounded-md justify-between text-gray-700 flex group transition-colors duration-300"
            >
              <Link to={`/shop/${category.categoryslug}`} className="flex w-full justify-between items-center">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#efd791] via-[#fbd22e] to-[#d7a50e] transform transition-transform duration-500 ease-out rounded-md ${selectedCategory === category.categoryslug
                    ? 'translate-x-0'
                    : '-translate-x-full group-hover:translate-x-0'
                    }`}
                />
                <span
                  className={`relative z-10 ${selectedCategory === category.categoryslug
                    ? 'text-[#4B0055]'
                    : 'group-hover:text-[#4B0055]'
                    }`}
                >
                  {category.categoryname}
                </span>
                <span
                  className={`relative z-10 ${selectedCategory === category.categoryslug
                    ? 'text-[#4B0055]'
                    : 'group-hover:text-[#4B0055]'
                    }`}
                >
                  ({category.productCount})
                </span>
              </Link>
            </li>
          ))}
      </ul>


      <h3 className="mb-3 text-sm uppercase text-[#4B0055] font-semibold">Filter by Price</h3>
      <Slider
        range
        min={0}
        max={40000}
        defaultValue={[200, 9000]}
        value={priceRange}
        onChange={onChange}
        trackStyle={[{ backgroundColor: '#e5ac00' }]}
        handleStyle={[
          { borderColor: '#e5ac00', backgroundColor: '#e5ac00' },
          { borderColor: '#e5ac00', backgroundColor: '#e5ac00' },
        ]}
        railStyle={{ backgroundColor: '#e5e7eb' }}
      />
      <input
        type="text"
        className="w-full bg-white border-0 mt-2 text-gray-800"
        value={`₹${priceRange[0]} - ₹${priceRange[1]}`}
        disabled
      />

      <h3 className="mb-3 mt-5 text-sm uppercase text-[#4B0055] font-semibold">Color</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
        {
          Array.isArray(allColor) &&
          allColor.map((color, idx) => (
            <div
              key={idx}
              onClick={() => setProductColor(color._id)}
              className="relative overflow-hidden cursor-pointer p-2 rounded-md flex justify-between items-center group transition-colors duration-300"
            >
              {/* animated gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#efd791] via-[#fbd22e] to-[#d7a50e] transform transition-transform duration-500 ease-out rounded-md ${productColor === color._id
                  ? 'translate-x-0'
                  : '-translate-x-full group-hover:translate-x-0'
                  }`}
              />
              {/* color name */}
              <span
                className={`relative z-10 text-gray-700 ${productColor === color._id
                  ? 'text-[#4B0055]'
                  : 'group-hover:text-[#4B0055]'
                  }`}
              >
                {color.colorName}
              </span>

              {/* color dot */}
              <span
                className={`relative z-10 w-6 h-6 rounded-full border border-black transition-transform duration-300 mr-2 ${productColor === color._id
                  ? 'border-yellow-400 scale-110'
                  : 'group-hover:scale-105'
                  }`}
                style={{ backgroundColor: color.colorCode }}
              />
            </div>
          ))
        }
      </div>


    </div>
  );
}



// Modal wrapper to show modal overlay and close on background click or close button
function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto relative p-6"
        onClick={e => e.stopPropagation()} // prevent closing modal when clicking inside content
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

// Your existing ProductPreview component (no changes)
const ProductPreview = ({ product }) => {

  console.log(product)
  const [selectedImage, setSelectedImage] = useState(product?.images ? product.images[0] : "");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : "");


  useEffect(() => {
    if (product?.images) {
      setSelectedImage(product.images[0]);
    }
    if (product?.sizes) {
      setSelectedSize(product.sizes[0]);
    }
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  return (
    <div className=" md:flex justify-between font-josefin lg:p-7 p-4">
      <div className="flex md:flex-col md:w-[100px] pl-6 md:pl-0 space-x-4 md:space-x-0 md:space-y-4 mb-5 md:mb-0">
        {product.images && product.images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`cursor-pointer w-16 h-16 border ${selectedImage === img ? "border-[#e5ac00]" : "border-gray-200"} rounded-lg overflow-hidden`}
          >
            <img
              src={img}
              alt={`thumbnail-${index}`}
              className={`object-cover w-full h-full transition-transform duration-300 ${selectedImage === img ? "scale-110" : ""}`}
            />
          </div>
        ))}
      </div>

      <div className="col-span-2 rounded-lg overflow-hidden md:mb-0 mb-7 md:ml-5">
        <img
          src={selectedImage}
          alt="selected"
          className="w-full md:w-[280px] lg:w-full h-[300px] md:mb-0 lg:h-[500px] object-contain rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-5 md:w-[350px] md:ml-16 lg:ml-24 text-center">
        <h1 className="text-3xl font-bold text-[#4B0055]">{product.name}</h1>
        <p className="text-gray-600 text-lg">{product.title}</p>

        <div>
          <span className="text-3xl font-bold mr-2 text-[#e5ac00]">₹{product.price}</span>
          <span className="line-through text-gray-500">₹{product.mrp}</span>
          <span className="text-green-600 font-semibold ml-2">{product.offer}</span>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Color</h3>
          <div className="flex space-x-3 justify-center items-center">
            {product.colors?.map((color, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full cursor-pointer border border-gray-400 hover:border-[#e5ac00] duration-300 scale-100 hover:scale-105"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>

        </div>
        <div>
          <h3 className="font-semibold mb-2">Size</h3>
          <select
            className="border rounded p-2 w-[60px]"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {product.sizes?.map((size, idx) => (
              <option key={idx} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Quantity</h3>
          <div className="flex items-center space-x-3 justify-center">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >-</button>
            <input
              type="number"
              className="w-12 text-center border rounded"
              value={quantity}
              min={1}
              onChange={e => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 1) setQuantity(val);
              }}
            />
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >+</button>
          </div>
        </div>

        <div className="flex space-x-5 mt-5 justify-center">
          <FaFacebook className="cursor-pointer text-2xl text-gray-500 hover:text-black duration-300 " />
          <FaTwitter className="cursor-pointer text-2xl text-gray-500 hover:text-black duration-300 " />
          <FaPinterest className="cursor-pointer text-2xl text-gray-500 hover:text-black duration-300 " />
          <FaGooglePlusG className="cursor-pointer text-2xl text-gray-500 hover:text-black duration-300 " />
        </div>
      </div>
    </div>
  );
};
