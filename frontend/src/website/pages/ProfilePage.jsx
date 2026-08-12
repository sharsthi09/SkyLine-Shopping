import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Context } from "../../MainContext";

export default function ProfilePage() {
    const user = useSelector((state) => state.user.data);
    const [activeTab, setActiveTab] = useState("personal");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { API_URL } = useContext(Context);

    useEffect(() => {
        if (activeTab === "orders" && user) {
            setLoading(true);
            axios
                .get(`${API_URL}/order/my-orders?userId=${user._id}`)
                .then((res) => {
                    setOrders(res.data.orders || []);
                })
                .catch((err) => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [activeTab, user]);

    return (
        <div className="max-w-4xl mx-auto my-[250px] mt-[50px] p-4 sm:p-6 lg:p-10 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-semibold text-[#4B0055]">My Profile</h2>
                <div className="flex gap-2 border border-gray-300 rounded-md overflow-hidden">
                    <button
                        onClick={() => setActiveTab("personal")}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "personal"
                            ? "bg-gradient-to-r from-[#e5ac00] via-[#f9cf26] to-[#e5ac00] text-white"
                            : "bg-white text-[#4B0055] hover:bg-gray-100"
                            }`}
                    >
                        Personal Information
                    </button>
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`px-4 py-2 text-sm font-medium ${activeTab === "orders"
                            ? "bg-gradient-to-r from-[#e5ac00] via-[#f9cf26] to-[#e5ac00] text-white"
                            : "bg-white text-[#4B0055] hover:bg-gray-100"
                            }`}
                    >
                        My Orders
                    </button>
                </div>
            </div>

            {activeTab === "personal" && user && (
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <FaUser className="text-[#4B0055] text-xl" />
                        <p className="text-gray-700 text-lg font-medium">{user.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdEmail className="text-[#4B0055] text-xl" />
                        <p className="text-gray-700 text-lg">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdPhone className="text-[#4B0055] text-xl" />
                        <p className="text-gray-700 text-lg">{user.contact || "N/A"}</p>
                    </div>
                    <div>
                        <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-800">Shipping Addresses</h3>
                        {user.shipping_address?.length ? (
                            user.shipping_address.map((addr, idx) => (
                                <div key={idx} className="p-4 mb-2 border rounded-md bg-gray-50 space-y-1 text-gray-700">
                                    <p><MdLocationOn className="inline text-[#4B0055] mr-1" />{addr.addressLine1}</p>
                                    {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                                    <p>{addr.city}, {addr.state} - {addr.postalCode}</p>
                                    <p>{addr.country}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No saved addresses.</p>
                        )}
                    </div>
                </div>
            )}

            {activeTab === "orders" && (
                <div>
                    {loading ? (
                        <p className="text-gray-500">Loading orders...</p>
                    ) : orders.length ? (
                        <div className="space-y-4">
                            {orders.map((o) => (
                                <div key={o._id} className="p-4 border rounded-md shadow-sm bg-gray-50">
                                    <div className="flex justify-between">
                                        <p><strong>Order ID:</strong> {o._id}</p>
                                        <p><strong>Date:</strong> {new Date(o.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p><strong>Status:</strong> {["Pending", "Paid", "Processing", "Shipped", "Delivered"][o.order_status] || "Unknown"}</p>
                                    <p><strong>Total:</strong> ₹{o.order_total.toFixed(2)}</p>
                                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {o.product_details.map((pd, idx) => {
                                            const imageUrl = `${API_URL}/images/product/${pd.main_img}`;
                                            return (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <img src={imageUrl} alt={pd.product_id.name} className="w-16 h-16 object-cover rounded" />
                                                    <div>
                                                        <p className="font-medium">{pd.product_id.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            Qty: {pd.qty} × ₹{pd.price} = ₹{pd.total.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">You have no orders.</p>
                    )}
                </div>
            )}
        </div>
    );
}
