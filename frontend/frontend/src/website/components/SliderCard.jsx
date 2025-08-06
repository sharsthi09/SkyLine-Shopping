import React from "react";
import { Heart, ShoppingCart, Search } from "lucide-react";

const SliderCard = ({ product }) => {
  return (
   <div className="border rounded-lg bg-white w-full">
      <div className="relative w-full h-[400px] group overflow-hidden rounded-xl shadow-lg shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover scale-100 hover:scale-105 duration-500"
        />

        <div className="absolute bottom-[-100px] px-[50px] left-0 right-0 bg-white bg-opacity-90 flex justify-around items-center h-20 transition-all duration-300 group-hover:bottom-0">
          <button className="text-gray-600 hover:text-[#4B0055] transition">
            <Heart className="w-6 h-6" />
          </button>
          <button className="text-gray-600 hover:text-[#4B0055] transition">
            <ShoppingCart className="w-6 h-6" />
          </button>
          <button className="text-gray-600 hover:text-[#4B0055] transition">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4 text-center">
        <p className="text-gray-500 text-sm">{product.category}</p>
        <h4 className="text-lg font-semibold my-1 hover:text-[#660033] transition duration-300">
          <a href="#">{product.title}</a>
        </h4>
        <p className="hover:text-[#a037ae] text-[#be56cb] font-bold">
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default SliderCard;
