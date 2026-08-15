import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FaUser, FaPlus, FaTrash, FaTimes  } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Context } from "../../MainContext";
import { updateUser } from "../../redux/reducers/UserSlice";

const EMPTY_FORM = {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
};

export default function ProfilePage() {
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("personal");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { API_URL, toastMsg, IMAGE_BASE_URL } = useContext(Context);

    // ── NEW: address form state ──
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // ── UNCHANGED: fetch orders ──
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
    }, [activeTab, user, API_URL]);

    // ── NEW: form helpers ──
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

    const handleAddAddress = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
        setSubmitting(true);
        try {
            const res = await axios.post(`${API_URL}/user/add-address/${user._id}`, formData);
            if (res.data.status === 1) {
                dispatch(updateUser(res.data.user));
                toastMsg("Address added successfully!", true);
                setFormData(EMPTY_FORM);
                setShowAddressForm(false);
                setFormErrors({});
            } else {
                toastMsg("Failed to add address. Please try again.");
            }
        } catch (err) {
            console.error(err);
            toastMsg("Server error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteAddress = async (index) => {
        if (!window.confirm("Delete this address?")) return;
        try {
            const res = await axios.delete(`${API_URL}/user/delete-address/${user._id}/${index}`);
            if (res.data.status === 1) {
                dispatch(updateUser(res.data.user));
                toastMsg("Address removed.", true);
            }
        } catch (err) {
            console.error(err);
            toastMsg("Failed to delete address.");
        }
    };

    const inputClass = (field) =>
        `w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B0055] ${
            formErrors[field] ? "border-red-500" : "border-gray-300"
        }`;

    return (
        <div className="max-w-4xl mx-auto my-[250px] mt-[50px] p-4 sm:p-6 lg:p-10 bg-white rounded-md shadow-md">
            {/* ── UNCHANGED: tab header ── */}
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

            {/* ── UNCHANGED: personal info tab ── */}
            {activeTab === "personal" && user && (
                <div className="space-y-4">
                    {/* UNCHANGED: name / email / phone */}
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

                    {/* ── UPDATED: shipping addresses section ── */}
                    <div>
                        {/* section header — NEW: Add Address button added */}
                        <div className="flex items-center justify-between mt-6 mb-3">
                            <h3 className="text-lg font-semibold text-gray-800">Shipping Addresses</h3>
                            <button
                                onClick={() => {
                                    setShowAddressForm((prev) => !prev);
                                    setFormData(EMPTY_FORM);
                                    setFormErrors({});
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-[#4B0055] to-[#7d3f96] text-white rounded-md hover:opacity-90 transition"
                            >
                                 {showAddressForm ? <FaTimes className="text-xs" /> : <FaPlus className="text-xs" />}

                                {showAddressForm ? "Cancel" : "Add Address"}
                            </button>
                        </div>

                        {/* UPDATED: existing addresses — trash icon added, rest unchanged */}
                        {user.shipping_address?.length ? (
                            user.shipping_address.map((addr, idx) => (
                                <div key={idx} className="p-4 mb-2 border rounded-md bg-gray-50 space-y-1 text-gray-700 relative">
                                    {/* NEW: delete button */}
                                    <button
                                        onClick={() => handleDeleteAddress(idx)}
                                        className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
                                        title="Delete address"
                                    >
                                        <FaTrash size={13} />
                                    </button>
                                    {/* UNCHANGED: address lines */}
                                    <p><MdLocationOn className="inline text-[#4B0055] mr-1" />{addr.addressLine1}</p>
                                    {addr.addressLine2 && <p className="pl-5">{addr.addressLine2}</p>}
                                    <p className="pl-5">{addr.city}, {addr.state} - {addr.postalCode}</p>
                                    <p className="pl-5">{addr.country}</p>
                                </div>
                            ))
                        ) : (
                            /* UPDATED: empty state with prompt instead of plain text */
                            !showAddressForm && (
                                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
                                    <MdLocationOn className="mx-auto text-gray-300 text-4xl mb-2" />
                                    <p className="text-gray-500 mb-3">No saved addresses yet.</p>
                                    <button
                                        onClick={() => setShowAddressForm(true)}
                                        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#4B0055] to-[#7d3f96] text-white rounded-md hover:opacity-90 transition"
                                    >
                                        + Add Your First Address
                                    </button>
                                </div>
                            )
                        )}

                        {/* NEW: inline add-address form */}
                        {showAddressForm && (
                            <div className="mt-4 p-5 border border-[#4B0055]/30 rounded-lg bg-purple-50 space-y-4">
                                <h4 className="text-base font-semibold text-[#4B0055]">New Shipping Address</h4>

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
                                    {formErrors.addressLine1 && <p className="text-red-500 text-xs mt-1">{formErrors.addressLine1}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address Line 2 <span className="text-gray-400 text-xs">(optional)</span>
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
                                        {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State / Province / Region <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="State / Province / Region"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={inputClass("state")}
                                        />
                                        {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
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
                                        {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
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
                                        {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-1">
                                    <button
                                        onClick={handleAddAddress}
                                        disabled={submitting}
                                        className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-[#4B0055] to-[#7d3f96] text-white rounded-md hover:opacity-90 transition disabled:opacity-60"
                                    >
                                        {submitting ? "Saving..." : "Save Address"}
                                    </button>
                                    <button
                                        onClick={() => { setShowAddressForm(false); setFormData(EMPTY_FORM); setFormErrors({}); }}
                                        className="px-5 py-2 text-sm font-medium border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── COMPLETELY UNCHANGED: orders tab ── */}
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
                                            const imageUrl = `${IMAGE_BASE_URL}/images/product/${pd.main_img}`;
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
