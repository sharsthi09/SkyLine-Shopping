import React, { useContext, useEffect, useState } from 'react';
import { FaHeart, FaShoppingBag, FaCheck, FaTimes, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { Context } from '../../MainContext';
import { useOutletContext, useParams } from 'react-router-dom';



const ProductDetail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Beige');
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const { product_id } = useParams();
  const { fetchProduct, allProduct, API_URL } = useContext(Context);
  const [product, setProduct] = useState(null);
  const { addToCart, addToWishlist } = useContext(Context);

  useEffect(() => {
    const getProduct = async () => {
      const result = await fetchProduct(product_id);
      console.log("Fetched product 👉", result);  // check if it’s coming
      setProduct(result);
    };

    getProduct();
  }, [product_id]);

  if (!product) {
    return <div className="text-center p-20">Loading product...</div>;
  }

  const images = product
    ? [...new Set([product.main_img, ...(product.other_img || [])])]
    : [];

  const handleAddToCart = () => {
    alert('Added to Cart!');
  };

  const handleAddToWishlist = () => {
    alert('Added to Wishlist!');
  };

  return (
    <>
      <style>{`
        .swiper-slide {
          background: transparent !important;
        }
        .swiper-slide::before, .swiper-slide::after {
          content: none !important;
          background: none !important;
          opacity: 1 !important;
          pointer-events: none !important;
        }
        .swiper-wrapper, .swiper-container {
          background: transparent !important;
        }
        .swiper-slide:focus, .swiper-slide:hover {
          outline: none;
          box-shadow: none;
          opacity: 1 !important;
          filter: none !important;
          background: transparent !important;
        }
        .swiper-slide-thumb-active {
          opacity: 1 !important;
          filter: none !important;
          background: transparent !important;
          transform: scale(1.05);
          border-color: black !important;
          box-shadow: none !important;
        }
          .swiper-button-next,
  .swiper-button-prev {
    color: white !important;
  }
      `}</style>

      <div className="max-w-7xl mx-auto p-5 md:px-20 lg:p-10  pb-[90px] lg:pb-[200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 items-start">
          {/* Swiper section */}
          <div>
            <Swiper
              loop
              spaceBetween={10}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="rounded-xl overflow-hidden"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${API_URL}/images/product/${img}`}
                    alt={`Product ${index}`}
                    className="w-full h-[420px] md:h-[650px] object-fill"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              breakpoints={{
                0: {
                  slidesPerView: 3, // 👈 for mobile
                },
                768: {
                  slidesPerView: 4, // 👈 for laptop (md breakpoint and up)
                },
              }}
              freeMode
              watchSlidesProgress
              modules={[Thumbs]}
              className="mt-5"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`relative w-full h-36 md:h-40 overflow-hidden rounded-lg cursor-pointer border transition-transform duration-300 ${activeIndex === index ? 'scale-105' : 'opacity-70'
                      }`}
                  >
                    <img
                      src={`${API_URL}/images/product/${img}`}
                      alt={`Thumb ${index}`}
                      className="w-full h-full object-fill"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div className="flex flex-col md:mt-10 justify-center items-center">
            <h2 className="text-3xl font-bold text-[#4B0055] mb-2">{product.productName}</h2>
            <p className="text-lg text-center text-gray-600">{product.productSlug}</p>

            {/* Price */}
            <div className="flex items-center space-x-4 mt-4 mb-4">
              <span className="text-2xl font-bold text-red-500">${product.final_price}</span>
              <span className="line-through text-gray-500">${product.original_price}</span>
            </div>

            {/* Color Selector */}
            <div className="mb-5">
              <h4 className="text-lg font-medium mb-2 text-center">Color</h4>
              <div className="flex items-center gap-3">
                {product?.colors?.map((color) => (
                  <div
                    key={color._id}
                    onClick={() => setSelectedColor(color.colorName)}
                    className={`w-10 h-10 rounded-full border-2 cursor-pointer ${selectedColor === color.colorName ? 'border-black' : 'border-gray-300'
                      }`}
                    style={{ backgroundColor: color.colorCode }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-5">
              <h4 className="text-lg font-medium mb-2 text-center">Select Size</h4>
              <div className="flex items-center gap-3 flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border ${selectedSize === size ? 'bg-black text-white' : 'text-black'
                      } flex items-center justify-center transition hover:bg-slate-200`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center space-x-2 mb-4">
              {product.stock ? (
                <span className="flex items-center text-green-600 font-medium">
                  <FaCheck className="mr-1" /> In Stock
                </span>
              ) : (
                <span className="flex items-center text-red-600 font-medium">
                  <FaTimes className="mr-1" /> Out of Stock
                </span>
              )}
            </div>

            {/* Long Description */}
            {/* Collapsible Sections */}
            <div className="w-full border-t border-b my-6">
              <div
                className="flex justify-between items-center py-4 cursor-pointer"
                onClick={() => setActiveSection(activeSection === 'details' ? '' : 'details')}
              >
                <h4 className="text-lg font-semibold">Product Details</h4>
                <span>{activeSection === 'details' ? '-' : '+'}</span>
              </div>
              {activeSection === 'details' && (
                <div className="pb-4 text-gray-700">
                  {product.short_description}
                </div>
              )}

              <div
                className="flex justify-between items-center py-4 cursor-pointer border-t"
                onClick={() => setActiveSection(activeSection === 'description' ? '' : 'description')}
              >
                <h4 className="text-lg font-semibold">Product Description</h4>
                <span>{activeSection === 'description' ? '-' : '+'}</span>
              </div>
              {activeSection === 'description' && (
                <div className="pb-4 text-gray-700">
                  <p>{product.long_description}</p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-5 mb-6 w-[180px] flex-col">
              <button
                onClick={() =>
                  addToCart({ id: product._id, discount: product.discount_percentage, title: product.productName, img: API_URL + `/images/product/` + product.main_img, price: product.final_price })
                }
                className="flex justify-center items-center px-5 py-3 rounded-full  bg-[#e5ac00] hover:bg-[#e5ac00d2] text-white transition"
              >
                <FaShoppingBag className="mr-2" /> Add to Cart
              </button>
              <button
                onClick={() =>
                  addToWishlist({
                    id: product._id,
                    title: product.productName,
                    img: API_URL + `/images/product/` + product.main_img,
                    price: product.final_price
                  })
                }
                className="flex justify-center items-center px-5 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                <FaHeart className="mr-2" /> Add to Wishlist
              </button>
            </div>

            {/* Top Selling / Active */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>Top Selling: {product.top_selling ? 'Yes' : 'No'}</p>
              <p>Active: {product.status ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>

        {/* Ratings */}
        <div className="mt-16 border-t pt-10">
          {/* Mobile Top Bar */}
          <div className='flex md:hidden justify-between mb-4'>
            <h2 className="text-2xl font-bold mb-3">Ratings</h2>
            <div>
              <div className="flex items-center text-3xl font-bold text-green-600">
                3.3 <FaStar className="ml-2 text-green-600" />
              </div>
              <p className="mt-2 text-sm text-gray-700 font-normal">255 Customers</p>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold mb-6 md:block hidden">Ratings</h2>

          {/* Ratings Grid */}
          <div className="grid md:grid-cols-3 gap-8 text-sm">

            {/* Average Rating */}
            <div className='md:block hidden'>
              <div className="flex items-center text-3xl font-bold text-green-600">
                3.3 <FaStar className="ml-2 text-green-600" />
              </div>
              <p className="mt-2">255 Customers</p>
            </div>

            {/* Rating Distribution */}
            <div>
              <h4 className="font-semibold mb-2">Rating Distribution</h4>
              {[
                { star: 5, percent: 29 },
                { star: 4, percent: 24 },
                { star: 3, percent: 15 },
                { star: 2, percent: 9 },
                { star: 1, percent: 22 },
              ].map(({ star, percent }) => (
                <div key={star} className="flex items-center mb-1">
                  <span className="w-8">{star}★</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded mx-2">
                    <div
                      className="bg-yellow-600 h-2 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span>{percent}%</span>
                </div>
              ))}
            </div>

            {/* Customer Opinion */}
            <div>
              <h4 className="font-semibold mb-2">Customer Opinion</h4>

              {/* Product Fit */}
              <p className="font-medium">How was the Product fit?</p>
              {[
                { label: 'Perfect', percent: 62 },
                { label: 'Loose', percent: 17 },
                { label: 'Tight', percent: 6 },
                { label: 'Too Loose', percent: 6 },
                { label: 'Too Tight', percent: 5 },
              ].map(({ label, percent }) => (
                <div key={label} className="flex items-center mb-1">
                  <span className="w-24">{label}</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded mx-2">
                    <div
                      className="bg-yellow-600 h-2 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span>{percent}%</span>
                </div>
              ))}


            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;


