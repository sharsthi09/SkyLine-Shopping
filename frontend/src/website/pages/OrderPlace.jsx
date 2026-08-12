import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import cat1 from '../images/thank.jpg';

export default function OrderPlace() {
  const { order_id } = useParams();

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 pb-10 pt-8 lg:pt-0"
     style={{ background: 'linear-gradient(to bottom right, #fbc2eb, #fcd5ce, #f8edeb)' }}>

      <div className="bg-white shadow-xl rounded-lg max-w-3xl w-full overflow-hidden md:flex">
        {/* Left Section - Image */}
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center text-center">
          <img
            src={cat1}
            alt="Shopping Bags"
            className="w-full h-full rounded-lg object-contain"
          />
        </div>

        {/* Right Section - Message */}
        <div className="md:w-1/2 p-8 text-center">
          <CheckCircle className="mx-auto text-green-500 w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Thank You for Your Purchase!
          </h2>
          <p className="text-gray-600 mb-4">
            Your order <span className="font-semibold text-[#4B0055]">{order_id}</span> has been successfully placed. We’ll notify you within 5 days when it ships.
          </p>
          <p className="text-gray-500 mb-6">
            If you have any questions or queries, feel free to contact us.
          </p>
          <Link to={'/shop'}>
          <button className="px-4 py-2 bg-gradient-to-r from-[#7d3f96] via-[#af08af] to-[#af08af] text-white rounded hover:opacity-90">
            Continue Shopping
          </button></Link>
        </div>
      </div>
    </div>
  );
}
