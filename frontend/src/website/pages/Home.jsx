"use client";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Heart, ShoppingCart, Search, ChevronLeft, ChevronRight } from "lucide-react";

import { FiSearch, FiShoppingCart, FiHeart } from "react-icons/fi";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

// background banner image
import image1 from '../images/hello1.png';

// slider images
import slide1 from '../images/slider1.jpg';
import slide2 from '../images/slider2.jpg';
import slide3 from '../images/slider3.jpg';
import slide4 from '../images/slider4.jpg';
import slide5 from '../images/slider5.jpg';
import slide6 from '../images/slider6.jpg';
import slide7 from '../images/slider7.jpg';
import dis1 from '../images/dic1.jpg';
import dis2 from '../images/disc2.jpg';
import dis3 from '../images/disc3.png';
import dis4 from '../images/disc4.png';
import dis5 from '../images/disc5.jpg';
import dis6 from '../images/disc6.jpg';
import dis1_tab from '../images/disc1_tab.png';
import dis2_tab from '../images/disc2_tab.jpg';
import dis3_tab from '../images/disc3_tab.png';
import dis4_tab from '../images/disc4_tab.png';
import dis5_tab from '../images/disc5_tab.jpg';
import dis6_tab from '../images/disc6_tab.jpg';
import dis1_mob from '../images/disc1_mob.jpg';
import dis2_mob from '../images/disc2_mob.jpg';
import dis3_mob from '../images/disc3_mob.jpg';
import dis4_mob from '../images/disc4_mob.jpg';
import dis5_mob from '../images/disc5_mob.jpg';
import dis6_mob from '../images/disc6_mob.jpg';
import best1 from '../images/best1.jpg';
import best2 from '../images/best2.jpg';
import best3 from '../images/best3.jpg';
import best4 from '../images/best4.jpg';
import best5 from '../images/best5.jpg';
import best6 from '../images/best6.jpg';
import brand1 from '../images/brand1.webp';
import brand6 from '../images/brand6.webp';
import brand7 from '../images/brand7.webp';
import brand8 from '../images/brand8.webp';
import brand9 from '../images/brand9.webp';
import brand2 from '../images/brand2.webp';
import brand4 from '../images/brand4.webp';
import brand10 from '../images/brand10.webp';
import brand11 from '../images/brand11.webp';
import brand12 from '../images/brand12.webp';
import brand5 from '../images/brand5.webp';
import cat1 from '../images/cat1.png';
import cat2 from '../images/cat2.png';
import cat4 from '../images/cat4.png';
import cat5 from '../images/cat5.png';
import cat6 from '../images/cat6.png';
import cat7 from '../images/cat7.png';
import cat8 from '../images/cat8.jpg';
import cat9 from '../images/cat9.jpg';
import cat10 from '../images/cat10.jpg';
import trend1 from '../images/trend1.webp';
import trend2 from '../images/trend2.webp';
import trend3 from '../images/trend3.webp';
import trend4 from '../images/trend4.webp';
import trend5 from '../images/trend5.webp';
import trend6 from '../images/trend6.webp';
import trend7 from '../images/trend7.webp';
import trend8 from '../images/trend8.webp';

import SliderCard from "../components/sliderCard";
import BrandSlider from "../components/BrandSlider";
import { Link } from "react-router-dom";






export default function Home() {

  const images = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];
  const slides = [
    {
      small: dis1_mob,
      medium: dis1_tab,
      large: dis1,
    },
    {
      small: dis2_mob,
      medium: dis2_tab,
      large: dis2,
    },
    {
      small: dis3_mob,
      medium: dis3_tab,
      large: dis3,
    },
    {
      small: dis4_mob,
      medium: dis4_tab,
      large: dis4,
    },
    {
      small: dis5_mob,
      medium: dis5_tab,
      large: dis5,
    },
    {
      small: dis6_mob,
      medium: dis6_tab,
      large: dis6,
    },

  ];
  const slides1 = [
    { image: best1, title: " Home Living Furnishings ", category: "Home Decor", price: "$49.99" ,link:"shop/home-living-furniture"},
    { image: best2, title: "Men Pink Viscose Kurta", category: "Mens Ethnic", price: "$149.00"  ,link:"shop/mens-ethnic" },
    { image: best3, title: "Libas Printed Pink Kurta", category: "Womens Ethnic", price: "$89.99"  ,link:"shop/women-ethnic"},
    { image: best4, title: "Dyed V-neck Maxi Dress", category: "Party Wear", price: "$39.00"  ,link:"shop/women-dresses"},
    { image: best5, title: "Abstract Printed Wall Sticker", category: "Wall Sticker", price: "$59.95"  ,link:"shop/wall-stickers"},
    { image: best6, title: "Mens Shirts", category: "Mens Wear", price: "$119.00"  ,link:"shop/mens-shirts"}
  ]; 

  const slides2 = [
    { image: brand10, title: " Home Living Furnishings ", category: "Home Decor", price: "$49.99" },
    { image: brand11, title: "Men Pink Viscose Kurta", category: "Mens Ethnic", price: "$149.00" },
    { image: brand12, title: "Libas Printed Pink Kurta", category: "Womens Ethnic", price: "$89.99" },
    { image: brand5, title: "Dyed V-neck Maxi Dress", category: "Party Wear", price: "$39.00" },
    { image: brand4, title: "Abstract Printed Wall Sticker", category: "Wall Sticker", price: "$59.95" },
    { image: brand2, title: "Wall Art", category: "Art", price: "$119.00" },
    { image: brand6, title: "Wall Art", category: "Art", price: "$119.00" },
    { image: brand7, title: "Wall Art", category: "Art", price: "$119.00" }
  ];

  const slides3 = [
    { image: cat7, title: "Libas Printed Pink Kurta", category: "Womens Ethnic", price: "$89.99",link:"shop/coord-sets" },
    { image: cat6, title: "Dyed V-neck Maxi Dress", category: "Party Wear", price: "$39.00",link:"shop/women-ethnic" },
    { image: cat5, title: "Abstract Printed Wall Sticker", category: "Wall Sticker", price: "$59.95" ,link:"shop/women-bottoms"},
    { image: cat4, title: "Wall Art", category: "Art", price: "$119.00" ,link:"shop/women-ethnic"},
    { image: cat2, title: "Wall Art", category: "Art", price: "$119.00",link:"shop/women-dresses" },
    { image: cat1, title: "Wall Art", category: "Art", price: "$119.00",link:"shop/women-shirts" }
  ];

  const slides4 = [
    { image: trend8, title: " Home Living Furnishings ", category: "Home Decor", price: "$49.99" },
    { image: trend3, title: "Men Pink Viscose Kurta", category: "Mens Ethnic", price: "$149.00" },
    { image: trend1, title: "Libas Printed Pink Kurta", category: "Womens Ethnic", price: "$89.99" },
    { image: trend5, title: "Dyed V-neck Maxi Dress", category: "Party Wear", price: "$39.00" },
    { image: trend4, title: "Abstract Printed Wall Sticker", category: "Wall Sticker", price: "$59.95" },
    { image: trend2, title: "Wall Art", category: "Art", price: "$119.00" },
    { image: trend6, title: "Wall Art", category: "Art", price: "$119.00" },
    { image: trend7, title: "Wall Art", category: "Art", price: "$119.00" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timeoutRef = useRef(null);
  const delay = 3000;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        // Check bounds and reverse direction if needed
        if (prevIndex === slides.length - 1) {
          setDirection(-1);
          return prevIndex - 1;
        } else if (prevIndex === 0) {
          setDirection(1);
          return prevIndex + 1;
        } else {
          return prevIndex + direction;
        }
      });
    }, delay);

    return () => resetTimeout();
  }, [currentIndex, direction]);

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const bestSellerScrollRef = useRef(null);
  const risingStarsScrollRef = useRef(null);


  const categoryScrollRef = useRef(null);

  const scroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        ref.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        ref.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
      console.log("Scroll position:", ref.current.scrollLeft);
    }
  };




  return (
    <div className=" pb-[90px] lg:pb-[200px]">
      {/* hero section starts */}
      <div className="relative w-full h-[680px] md:h-[750px] mb-36 ">
        {/* Background Image */}
        <img
          src={image1}
          alt="Wave Banner"
          className="absolute inset-0 w-full h-full object-cover mt-[20px]"
        />

        {/* Slider */}
        <div className="absolute top-[270px] md:top-[310px] left-0 w-[100%] h-[400px] overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 200,
              modifier: 2,
              slideShadows: false,
            }}
            className="w-full h-full"
          >
            {images.map((src, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
                style={{
                  width: "300px",
                  height: "400px",
                }}
              >
                <Link to={'/shop'}>
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl transition-all duration-700"
                />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>


        </div>

        {/* heading */}
        <div className=" md:h-[200px] h-[160px] absolute md:px-0 px-[30px] top-[40px] lg:top-[50px] lg:left-[330px] flex flex-col justify-center items-center">
          <div className="md:text-4xl text-xl mb-3 font-semibold bg-gradient-to-r from-[#e5ac00] via-[#f9cf26] to-[#e5ac00] bg-clip-text text-transparent">Shop is fun</div>
          <div className="md:text-6xl text-center text-4xl font-extrabold text-[#4B0055]">Browse Our Premium Product</div>
          <Link to={'/shop'}>
          <div className="w-[140px] h-[40px] bg-[#e5ac00] text-xl text-white flex justify-center items-center rounded-full mt-6 hover:border hover:border-[#e5ac00] hover:bg-[#f8d56d] scale-100 hover:scale-105 duration-700 hover:text-[#4B0055]">Shop Now</div></Link>
        </div>
      </div>
      {/* hero section starts */}

      {/* best seller starts */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="container px-4">
          {/* Section Heading */}
          <div className="px-[12px] mb-3 flex flex-col justify-start">
            <p className="text-gray-500">Popular Item in the market</p>
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#4B0055]">Best</span>{" "}
              <span className="bg-gradient-to-r from-[#e5ac00] via-[#f9cf26] to-[#e5ac00] bg-clip-text text-transparent">
                Sellers
              </span>
            </h2>
          </div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 mb-[100px]">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => scroll("left", bestSellerScrollRef)}
              className="z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll("right", bestSellerScrollRef)}
              className="z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronRight />
            </button>
          </div>

          <div
            ref={bestSellerScrollRef}
            className="flex gap-4 overflow-x-auto px-2 scroll-smooth scrollbar-hide"
          >
            {slides1.map((product, index) => (
              <div
                key={index}
                className="
        min-w-[calc(100%_-_1rem)] 
        sm:min-w-[calc(50%_-_0.5rem)] 
        md:min-w-[calc(33.333%_-_0.666rem)] 
        lg:min-w-[calc(25%_-_0.75rem)]
      "
              >
                <Link to={`${product.link}`}>
                <SliderCard product={product} /></Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* best seller ends */}

      {/* rising stars starts */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="container px-4">
          {/* Section Heading */}
          <div className="px-[12px] mb-3 flex flex-col justify-start">

            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#4B0055]">Global</span> <span className="bg-gradient-to-r from-[#e5ac00] via-[#f9cf26] to-[#e5ac00] bg-clip-text text-transparent">Brands</span>
            </h2>
          </div>
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 mb-[100px]">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => scroll("left", risingStarsScrollRef)}
              className="z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll("right", risingStarsScrollRef)}
              className="z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronRight />
            </button>
          </div>

          <div
            ref={risingStarsScrollRef}
            className="flex gap-4 overflow-x-auto px-2 scroll-smooth scrollbar-hide"
          >
            {slides2.map((product, index) => (
              <div
                key={index}
                className="cover
        min-w-[calc(100%_-_1rem)]
        sm:min-w-[calc(50%_-_0.5rem)]
        md:min-w-[calc(33.333%_-_0.666rem)]
        lg:min-w-[calc(25%_-_0.75rem)]
      "
              >
                <Link to={'/shop'}>
                <BrandSlider product={product} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
      {/* rising stars ends */}

      {/* shop by category starts */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="container px-4">
          {/* Section Heading */}
          <div className="px-[12px] mb-3 flex flex-col justify-start">

            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#4B0055]">Shop By</span> <span className="bg-gradient-to-r from-[#e5ac00] via-[#f9cf26] to-[#e5ac00] bg-clip-text text-transparent">Categories</span>
            </h2>
          </div>
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 mb-[100px]">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => scroll("left", categoryScrollRef)}
              className="z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll("right", categoryScrollRef)}
              className="z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronRight />
            </button>
          </div>

          <div
            ref={categoryScrollRef}
            className="flex gap-4 overflow-x-auto px-2 scroll-smooth scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {slides3.map((product, index) => (
              <div
                key={index}
                className="
        min-w-[calc(100%_-_1rem)]
        sm:min-w-[calc(50%_-_0.5rem)]
        md:min-w-[calc(33.333%_-_0.666rem)]
        lg:min-w-[calc(25%_-_0.75rem)]
      "
              >
                <Link to={`${product.link}`}>
                <BrandSlider product={product} /></Link>
              </div>
            ))}
          </div>

        </div>
      </div>
      {/* shop by category ends */}


      {/* trends starts */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="container px-4">
          {/* Section Heading */}
          <div className="px-[12px] mb-3 flex flex-col justify-start">

            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#4B0055]">Rising</span> <span className="bg-gradient-to-r from-[#e5ac00] via-[#f9cf26] to-[#e5ac00] bg-clip-text text-transparent">Stars</span>
            </h2>
          </div>
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 mb-[100px]">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => scroll("left", categoryScrollRef)}
              className="z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scroll("right", categoryScrollRef)}
              className="z-10 bg-white shadow p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronRight />
            </button>
          </div>

          <div
            ref={categoryScrollRef}
            className="flex gap-4 overflow-x-auto px-2 scroll-smooth scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {slides4.map((product, index) => (
              <div
                key={index}
                className="
        min-w-[calc(100%_-_1rem)]
        sm:min-w-[calc(50%_-_0.5rem)]
        md:min-w-[calc(33.333%_-_0.666rem)]
        lg:min-w-[calc(25%_-_0.75rem)]
      "
              >
                <Link to={'/shop'}>
                <BrandSlider product={product} /></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* trends ends */}

      {/* disc slider starts */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="container px-4">
          <div className="px-[12px] mb-3 flex flex-col justify-start">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#4B0055]">Explore</span>{" "}
              <span className="bg-gradient-to-r from-[#e5ac00] via-[#f9cf26] to-[#e5ac00] bg-clip-text text-transparent">
                More
              </span>
            </h2>
          </div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                <Link to={'/shop'}>
                {/* Mobile Image (shown only on mobile) */}
                <img
                  src={slide.small}
                  alt={`Slide ${index} mobile`}
                  className="block sm:hidden w-full h-[250px] object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                />

                {/* Tablet Image (shown only on tablet) */}
                <img
                  src={slide.medium}
                  alt={`Slide ${index} tablet`}
                  className="hidden md:block lg:hidden w-full h-[300px] object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                />

                {/* Desktop Image (shown only on desktop) */}
                <img
                  src={slide.large}
                  alt={`Slide ${index} desktop`}
                  className="hidden lg:block w-full h-[400px] object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                />
                </Link>
              </div>
            ))}

          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
            <div
              className="h-full bg-[#330066] transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
            />
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
            disabled={currentIndex === 0}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
            disabled={currentIndex === slides.length - 1}
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* disc slider ends */}
    </div>

  );
}
