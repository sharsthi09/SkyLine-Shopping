import React, { useContext, useState } from "react";
import { SiSpringsecurity } from "react-icons/si";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GiCycle } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { Context } from "../../MainContext";
import { BsCashCoin } from "react-icons/bs";
import { Wallet } from "lucide-react";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRazorpay } from "react-razorpay";
import slide1 from "../images/skyline1_shopping.png";
import { updateUser } from "../../redux/reducers/UserSlice";

const EMPTY_FORM = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

export default function CheckOut() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [addressError, setAddressError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Razorpay } = useRazorpay();
  const { setCartItems, toastMsg, cartItems, API_URL } = useContext(Context);

  const user = useSelector((state) => state.user.data);

  // ── Address form state ──
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // ── Price calculations ──
  const totalMRP = Math.round(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const discount = Math.round(
    cartItems.reduce((acc, item) => {
      const itemDiscount =
        (item.price * ((item.discount || 0) / 100)) * item.quantity;
      return acc + itemDiscount;
    }, 0)
  );

  const totalAmount = totalMRP - discount;

  // ── Address form helpers ──
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.addressLine1.trim()) errors.addressLine1 = "Address Line 1 is required";
    if (!formData.city.trim())         errors.city         = "City is required";
    if (!formData.state.trim())        errors.state        = "State / Province is required";
    if (!formData.postalCode.trim())   errors.postalCode   = "ZIP / Postal Code is required";
    if (!formData.country.trim())      errors.country      = "Country is required";
    return errors;
  };

  const inputClass = (field) =>
    `w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7d3f96] ${
      formErrors[field] ? "border-red-500" : "border-gray-300"
    }`;

  const handleSaveAddress = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${API_URL}/user/add-address/${user._id}`,
        formData
      );
      if (res.data.status === 1) {
        dispatch(updateUser(res.data.user));
        toastMsg("Address saved!", true);
        // auto-select the newly added address
        const saved =
          res.data.user.shipping_address[
            res.data.user.shipping_address.length - 1
          ];
        setSelectedAddress(saved);
        setAddressError("");
        setFormData(EMPTY_FORM);
        setFormErrors({});
        setShowAddressForm(false);
      } else {
        toastMsg("Could not save address.");
      }
    } catch (err) {
      console.error(err);
      toastMsg("Server error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAddress = async (idx, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this address?")) return;
    try {
      const res = await axios.delete(
        `${API_URL}/user/delete-address/${user._id}/${idx}`
      );
      if (res.data.status === 1) {
        dispatch(updateUser(res.data.user));
        if (selectedAddress === user.shipping_address[idx])
          setSelectedAddress(null);
        toastMsg("Address removed.", true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ── Order placement ──
  const orderPlace = () => {
    let hasError = false;

    if (!selectedAddress) {
      setAddressError("Please select an address.");
      hasError = true;
    } else {
      setAddressError("");
    }

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
            navigate(`/orderplace/${success.data.order_id}`);
            setCartItems([]);
          } else {
            handlePayment(
              success.data.razorpay_order.order_id,
              success.data.razorpay_order.razorpay_order
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ── Razorpay handler ──
  const handlePayment = async (order_id, razorpay_order_id) => {
    const options = {
      key: "rzp_test_cAD28PjybvVNm7",
      currency: "INR",
      name: "SkyLine Shopping",
      image: slide1,
      order_id: razorpay_order_id,
      handler: async function (response) {
        try {
          const res = await axios.post(`${API_URL}/order/payment-success`, {
            order_id,
            razorpay_response: response,
            user_id: user?._id,
          });
          if (res.data.status == 1) {
            toastMsg(res.data.msg);
            setCartItems([]);
            navigate(`/orderplace/${order_id}`);
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
      notes: { address: "Razorpay Corporate Office" },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      toastMsg("Payment Failed");
      console.log("Payment failed:", response);
    });
    rzp1.open();
  };

  const userAddresses = user?.shipping_address || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col justify-between pb-[90px] lg:pb-[200px]">
      <div>
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Select Delivery Address</h1>
          <button
            onClick={() => {
              setShowAddressForm((p) => !p);
              setFormData(EMPTY_FORM);
              setFormErrors({});
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-[#7d3f96] to-[#af08af] text-white rounded-md hover:opacity-90 transition"
          >
            {showAddressForm ? (
              <FaTimes className="text-xs" />
            ) : (
              <FaPlus className="text-xs" />
            )}
            <span className="hidden sm:inline">
              {showAddressForm ? "Cancel" : "Add Address"}
            </span>
          </button>
        </div>

        {/* ── Grid layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Address + Payment Section */}
          <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow">

            {/* ── Inline add-address form ── */}
            {showAddressForm && (
              <div className="mb-6 p-5 border border-[#7d3f96]/30 rounded-lg bg-purple-50 space-y-4">
                <h2 className="text-base font-semibold text-[#4B0055]">
                  New Shipping Address
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    placeholder="Street address, P.O. box, company name, c/o"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className={inputClass("addressLine1")}
                  />
                  {formErrors.addressLine1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.addressLine1}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2{" "}
                    <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className={inputClass("addressLine2")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={inputClass("city")}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State / Province / Region{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State / Province / Region"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={inputClass("state")}
                    />
                    {formErrors.state && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP / Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="ZIP / Postal Code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={inputClass("postalCode")}
                    />
                    {formErrors.postalCode && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.postalCode}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={inputClass("country")}
                    />
                    {formErrors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.country}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleSaveAddress}
                    disabled={submitting}
                    className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-[#7d3f96] via-[#af08af] to-[#af08af] text-white rounded-md hover:opacity-90 transition disabled:opacity-60"
                  >
                    {submitting ? "Saving..." : "Save Address"}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddressForm(false);
                      setFormData(EMPTY_FORM);
                      setFormErrors({});
                    }}
                    className="px-5 py-2 text-sm font-medium border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* ── Address list heading ── */}
            <h2 className="text-xl font-semibold mb-4">Select Address</h2>

            {/* ── Empty state ── */}
            {userAddresses.length === 0 && !showAddressForm && (
              <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg mb-4">
                <MdLocationOn className="mx-auto text-gray-300 text-4xl mb-2" />
                <p className="text-gray-500 mb-3">No saved addresses found.</p>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center gap-1 mx-auto px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#7d3f96] to-[#af08af] text-white rounded-md hover:opacity-90 transition"
                >
                  <FaPlus className="text-xs" /> Add Delivery Address
                </button>
              </div>
            )}

            {/* ── Address cards ── */}
            {userAddresses.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 border rounded-lg mb-3 cursor-pointer relative ${
                  selectedAddress === item
                    ? "border-[#7d3f96] bg-pink-50"
                    : "border-gray-300"
                }`}
                onClick={() => {
                  setSelectedAddress(item);
                  setAddressError("");
                }}
              >
                {/* Delete button */}
                <button
                  onClick={(e) => handleDeleteAddress(idx, e)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
                  title="Delete address"
                >
                  <FaTrash size={13} />
                </button>

                {/* Address display */}
                <p className="font-medium pr-6">
                  <MdLocationOn className="inline text-[#7d3f96] mr-1" />
                  {item.addressLine1}
                </p>
                {item.addressLine2 && (
                  <p className="pl-5">{item.addressLine2}</p>
                )}
                <p className="pl-5">{`${item.city}, ${item.state} - ${item.postalCode}`}</p>
                <p className="pl-5">{item.country}</p>

                {/* Selected badge */}
                {selectedAddress === item && (
                  <span className="mt-2 inline-block text-xs font-semibold text-[#7d3f96] bg-purple-100 px-2 py-0.5 rounded-full">
                    ✓ Selected
                  </span>
                )}
              </div>
            ))}

            {addressError && (
              <p className="text-red-600 text-sm mt-1">{addressError}</p>
            )}

            {/* ── Payment Section ── */}
            <h2 className="text-xl font-semibold mt-8 mb-4">
              Select Payment Method
            </h2>
            <div className="space-y-3">
              <div
                className={`p-4 border rounded-lg cursor-pointer flex items-center gap-3 ${
                  selectedPayment === 0
                    ? "border-green-700 bg-green-50"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedPayment(0)}
              >
                <BsCashCoin className="text-2xl text-green-700" />
                <span className="text-lg">Cash on Delivery</span>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer flex items-center gap-3 ${
                  selectedPayment === 1
                    ? "border-green-700 bg-green-50"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedPayment(1)}
              >
                <Wallet className="text-2xl text-blue-700" />
                <span className="text-lg">Online Payment</span>
              </div>
            </div>

            {paymentError && (
              <p className="text-red-600 mt-2">{paymentError}</p>
            )}
          </div>

          {/* ── Price Summary ── */}
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

      {/* ── Footer Assurance ── */}
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
