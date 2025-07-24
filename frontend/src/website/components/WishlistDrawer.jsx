import React, { useContext } from 'react';
import { X } from 'lucide-react';
import { Context } from '../../MainContext';


export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    handleCloseWishlist,
    wishlistItems,
    addToCart,
    removeFromWishlist,
    handleOpenCart, API_URL
  } = useContext(Context);

  return (
    <>
      {isWishlistOpen && <div onClick={handleCloseWishlist} className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>}
      <div className={`fixed top-0 right-0 md:w-96 w-80 h-full bg-white z-50 shadow-lg transition-transform duration-500 ${isWishlistOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold text-[#4B0055]">My Wishlist ({wishlistItems.length})</h2>
          <button onClick={handleCloseWishlist}><X size={24} /></button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-80px)] space-y-4">
          {wishlistItems.length === 0 ? (
            <p className="text-gray-600">Wishlist is Empty</p>
          ) : (
            wishlistItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 border-b pb-4">
                <img src={item.img.startsWith("http") ? item.img : `${API_URL}/images/product/${item.img}`} alt="" className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  <button
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                      handleOpenCart();
                    }}
                    className="mt-2 border px-2 bg-[#ebcc6f] text-white rounded-md hover:bg-[#e5ac00]"
                  >
                    Add to Cart
                  </button>
                </div>
                <button onClick={() => removeFromWishlist(item.id)}><X size={20} /></button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
