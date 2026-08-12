// require('dotenv').config()
import React, { useContext, useState } from "react";
import { SiSpringsecurity } from "react-icons/si";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GiCycle } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Context } from "../../MainContext";
import { BsCashCoin } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { Wallet } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import slide1 from '../images/skyline1_shopping.png';
// import { notify } from "../../../../backend/routers/OrderRouter";


export default function CheckOut() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [addressError, setAddressError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const navigate = useNavigate();
  const { error, isLoading, Razorpay } = useRazorpay();
  const {
      setCartItems,toastMsg
    } = useContext(Context);
  

  const user = useSelector((state) => state.user.data);
  const { cartItems, API_URL } = useContext(Context);
  console.log(user);

  const totalMRP = Math.round(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const discount = Math.round(
    cartItems.reduce((acc, item) => {
      const itemDiscount = (item.price * ((item.discount || 0) / 100)) * item.quantity;
      return acc + itemDiscount;
    }, 0)
  );

  const totalAmount = totalMRP - discount;

  const orderPlace = () => {
    let hasError = false;

    if (!selectedAddress) {
      setAddressError("Please select an address.");
      hasError = true;
    } else {
      setAddressError("");
    }

    // ✅ Corrected check for payment selection
    if (selectedPayment === null) {
      setPaymentError("Please select a payment method.");
      hasError = true;
    } else {
      setPaymentError("");
    }


    if (hasError) return;

    axios
      .post(`${API_URL}/order/order-place`, {
        user_id: user._id,
        order_total: totalAmount,
        payment_mode: selectedPayment,
        shipping_details: selectedAddress,
      })
      .then((success) => {
        if (success.data.status == 1) {
          if (selectedPayment == 0) {
            toastMsg(success.data.msg);
            navigate(`/orderplace/${success.data.order_id}`)
            setCartItems([]); 
          }
          else {
            handlePayment(success.data.razorpay_order.order_id, success.data.razorpay_order.razorpay_order)
          }

        }
      })
      .catch((error) => {
        console.log(error)
      });
  };

const handlePayment = async (order_id, razorpay_order_id) => {
  const options = {
    key: "rzp_test_cAD28PjybvVNm7",
    currency: "INR",
    name: "SkyLine Shopping",
    image: slide1,
    order_id: razorpay_order_id,
    handler: async function (response) {
      console.log("Payment success response:", response);
      try {
        const res = await axios.post(`${API_URL}/order/payment-success`, {
          order_id,
          razorpay_response: response,
          user_id: user?._id,
        });

        console.log("Payment API Response:", res.data);

        if (res.data.status == 1) {
          toastMsg(res.data.msg);         // ✅ fixed
          setCartItems([]);               // ✅ will now run
          navigate(`/orderplace/${order_id}`); // ✅ now works
        } else {
          toastMsg("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Payment Success API Error:", error);
        toastMsg("Payment succeeded but server error occurred");
      }
    },
    prefill: {
      name: user?.name,
      email: user?.email,
      contact: user?.contact,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", function (response) {
    toastMsg("Payment Failed");
    console.log("Payment failed:", response);
  });

  rzp1.open();
};


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col justify-between  pb-[90px] lg:pb-[200px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Select Delivery Address</h1>
          <button className="hidden lg:block px-4 py-2 bg-gradient-to-r from-[#7d3f96] via-[#af08af] to-[#af08af] text-white rounded hover:opacity-90">
            + Add New Address
          </button>
          <button className="lg:hidden px-4 py-2 bg-gradient-to-r from-[#7d3f96] via-[#af08af] to-[#af08af] text-white rounded hover:opacity-90">
            +
          </button>
        </div>

        {/* Address + Price Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Address Section */}
          <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Select Address</h2>
            {user?.shipping_address?.map((item) => (
              <div
                key={item.id}
                className={`p-4 border rounded-lg mb-3 cursor-pointer ${selectedAddress?.id === item.id
                  ? "border-[#7d3f96] bg-pink-50"
                  : "border-gray-300"
                  }`}
                onClick={() => setSelectedAddress(item)}
              >
                <p className="font-medium">{item.addressLine1}</p>
                {item.addressLine2 && <p>{item.addressLine2}</p>}
                <p>{`${item.city}, ${item.state} - ${item.postalCode}`}</p>
                <p>{item.country}</p>
              </div>
            ))}
            {addressError && (
              <p className="text-red-600 text-sm mt-1">{addressError}</p>
            )}

            {/* Payment Section */}
            <h2 className="text-xl font-semibold mt-8 mb-4">Select Payment Method</h2>
            <div className="space-y-3">
              <div
                className={`p-4 border rounded-lg cursor-pointer flex items-center gap-3 ${selectedPayment === 0
                  ? "border-green-700 bg-green-50"
                  : "border-gray-300"
                  }`}
                onClick={() => setSelectedPayment(0)}
              >
                <BsCashCoin className="text-2xl text-green-700" />
                <span className="text-lg">Cash on Delivery</span>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer flex items-center gap-3 ${selectedPayment === 1
                  ? "border-green-700 bg-green-50"
                  : "border-gray-300"
                  }`}
                onClick={() => setSelectedPayment(1)}
              >
                <Wallet className="text-2xl text-blue-700" />
                <span className="text-lg">Online Payment</span>
              </div>
            </div>

            {paymentError && <p className="text-red-600 mt-2">{paymentError}</p>}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow border">
              <h2 className="text-lg font-semibold mb-3">
                Price Details ({cartItems.length} Item
                {cartItems.length > 1 ? "s" : ""})
              </h2>
              <div className="flex justify-between text-sm mb-2">
                <span>Total MRP</span>
                <span>₹{totalMRP}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Discount on MRP</span>
                <span className="text-green-600">-₹{discount}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold text-base mb-4">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
              <button
                onClick={orderPlace}
                className="w-full py-2 bg-gradient-to-r from-[#7d3f96] via-[#af08af] to-[#af08af] text-white font-medium rounded hover:opacity-90"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Assurance */}
      <div className="mt-10 px-4 sm:px-10 md:px-20 border-t pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-10 text-center text-sm text-gray-700">

        <div className="flex items-center gap-2">
          <SiSpringsecurity className="h-10 w-10 text-yellow-700" />
          <span className="text-lg text-yellow-700">Secure Payments</span>
        </div>
        <div className="flex items-center gap-2">
          <BsCashCoin className="h-10 w-10 text-yellow-700" />
          <span className="text-lg text-yellow-700">Cash on Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <IoCheckmarkDoneCircle className="h-10 w-10 text-yellow-700" />
          <span className="text-lg text-yellow-700">Assured Quality</span>
        </div>
        <div className="flex items-center gap-2">
          <GiCycle className="h-10 w-10 text-yellow-700" />
          <span className="text-lg text-yellow-700">Easy Returns</span>
        </div>
      </div>
    </div>
  );
}
