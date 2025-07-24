import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, Trash2 } from 'lucide-react';
import { Context } from '../../MainContext';


export default function CartDrawer() {
  const {
    isCartOpen,
    handleCloseCart,
    cartItems,
    updateCartQuantity,
    removeFromCart,
    API_URL
  } = useContext(Context);
  

  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const verifyLogin = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate(`/userlogin?ref=cart`);
    }
  };

  const totalMRP = Math.round(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const discount = Math.round(
    cartItems.reduce((acc, item) => {
      console.log(item)
      const itemDiscount = (item.price * ((item.discount || 0) / 100)) * item.quantity;
      return acc + itemDiscount;
    }, 0)
  );

  const totalAmount = totalMRP - discount;

  return (
    <>
      {isCartOpen && <div onClick={handleCloseCart} className="fixed inset-0 bg-black/30 z-40"></div>}

      <div className={`fixed top-0 right-0 w-[340px] md:w-full md:max-w-md h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#4B0055]">Your Cart</h2>
          <button onClick={handleCloseCart}><X className="w-5 h-5 hover:text-red-600" /></button>
        </div>

        <div className="px-6 py-4 overflow-y-auto h-[calc(100%-250px)] space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-sm">Cart is Empty</p>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 border rounded-lg p-3 hover:shadow-sm transition">
                <div className="w-24 h-28 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={item.img.startsWith("http") ? item.img : `${API_URL}/images/product/${item.img}`} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">₹{item.price} × {item.quantity}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2 border px-2 py-1 rounded-md">
                      <button onClick={() => updateCartQuantity(item.id, -1)} className="text-sm px-1">-</button>
                      <span className="text-sm">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 1)} className="text-sm px-1">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t px-6 py-4 bg-gray-50">
          <h3 className="text-sm font-semibold mb-4 text-[#4B0055]">
            PRICE DETAILS ({cartItems.length} Item{cartItems.length !== 1 ? 's' : ''})
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Total MRP</span><span className="font-medium">₹{totalMRP}</span></div>
            <div className="flex justify-between text-yellow-600"><span>Discount</span><span>-₹{discount}</span></div>
            <div className="border-t pt-3 flex justify-between font-semibold text-base"><span>Total Amount</span><span>₹{totalAmount}</span></div>
          </div>
          <button onClick={verifyLogin} className="w-full mt-5 bg-[#e5ac00] hover:bg-[#e5ac00d2] text-white py-2 rounded-md text-sm font-semibold">
            PLACE ORDER
          </button>
        </div>
      </div>
    </>
  );
}
