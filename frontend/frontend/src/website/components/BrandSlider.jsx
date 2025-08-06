import React from "react";
import { Heart, ShoppingCart, Search } from "lucide-react";

const BrandSlider = ({ product }) => {
  return (
    <div className="rounded-lg bg-white w-full">
      <div className="relative w-full aspect-[4/5] group overflow-hidden rounded-xl shadow-lg shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full cover scale-100 hover:scale-[1.03] duration-500"
        />
      </div>
    </div>
  );
};

export default BrandSlider;
