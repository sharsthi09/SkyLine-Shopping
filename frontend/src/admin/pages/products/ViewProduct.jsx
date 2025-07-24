import React, { useContext, useEffect } from 'react';
import {
  FaCheck, FaStar, FaEdit, FaEye, FaTrash, FaTimes, FaImages, FaPlus
} from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { Context } from '../../../MainContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactDOMServer from 'react-dom/server';

export default function ViewProduct() {
  const { fetchProduct, allProduct, API_URL, Product_URL, toastMsg } = useContext(Context);
  console.log(allProduct)

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Do you want to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(API_URL + Product_URL + "/delete/" + id).then(success => {
          toastMsg(success.data.msg, success.data.status);
          if (success.data.status === 1) {
            fetchProduct();
          }
        }).catch(error => console.log(error));
      }
    });
  };

  const viewProduct = (productData, API_URL) => {
  Swal.fire({
    html: ReactDOMServer.renderToString(
      <ProductPopUp productData={productData} API_URL={API_URL} />
    ),
    showConfirmButton: false,
    showCloseButton: true,
    background: "transparent",
    customClass: {
      popup: 'bg-transparent shadow-none p-0',
      closeButton: 'w-2 h-2 text-red-500 hover:text-red-700'
    },
    width: 'auto',
  });
};



  const updateProduct = (id, flag) => {
    axios.patch(API_URL + Product_URL + `/update/${id}`, { flag }).then(success => {
      toastMsg(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        fetchProduct();
      }
    }).catch(error => console.log(error));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="p-6 bg-[#0e132a] min-h-screen text-white rounded-xl shadow-xl">
      <div className="bg-[#0B1739] hover:bg-[#182852] p-6 rounded-xl shadow-lg mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-purple-400 text-3xl">🛍️</span> Product Management
          </h2>
          <p className="text-sm text-gray-400 mt-1">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-[#0f172a] text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring focus:border-blue-500 w-64"
          />
          <Link to="add">
            <button className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 text-white px-2 flex py-2 rounded-md font-medium transition duration-200">
              <FaPlus className='mt-1' /><span>Add Product</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-[#1e293b] overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm bg-[#0B1739] text-white">
          <thead className="bg-[#0d172d] text-white">
            <tr>
              {["Name", "Price", "Category", "Color", "Image", "Stock", "Actions"].map((head) => (
                <th key={head} className="py-3 px-4 text-left">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(allProduct) && allProduct.map((productData) => (
              <tr key={productData._id} className="border-t border-[#334155] hover:bg-[#182852] transition">
                <td className="py-3 px-4">{productData.productName}</td>
                <td className="py-3 px-4">
                  <div className="text-blue-400 font-semibold">${productData.final_price}</div>
                  <div className="text-sm text-gray-400 line-through">${productData.original_price}</div>
                  <div className="text-green-400 text-xs">({productData.discount_percentage}% off)</div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-blue-800 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                    {productData.category_id?.categoryname}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {productData.colors.map((c, i) => (
                    <span key={i} className="mr-1">{c.colorName}</span>
                  ))}
                </td>
                <td className="py-3 px-4">
                  <img src={API_URL + `/images/product/${productData.main_img}`} alt="Product" className="w-12 h-12 object-cover rounded-lg" />
                </td>
                <td className="py-3 px-4">
                  <span
                    onClick={() => updateProduct(productData._id, 1)}
                    className={`cursor-pointer px-3 py-1 rounded-full text-xs font-semibold ${productData.stock ? 'bg-gradient-to-b from-teal-900 via-emerald-600 to-emerald-300 hover:from-teal-950 hover:via-emerald-700 hover:to-emerald-400' : 'bg-gradient-to-b from-gray-900 via-gray-600 to-gray-300 hover:from-gray-950 hover:via-gray-700 hover:to-gray-400'}`}>
                    {productData.stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button onClick={() => updateProduct(productData._id, 2)} className=" p-2 rounded"
                    style={{
                      background: 'linear-gradient(to bottom, #004d00, #006600, #004d00)'
                    }}>
                    {productData.status ? <FaCheck /> : <FaTimes />}
                  </button>
                  <button
                    onClick={() => updateProduct(productData._id, 3)}
                    className="bg-gradient-to-b from-orange-300 via-orange-400 to-orange-500 hover:from-orange-400 hover:to-orange-600 p-2 rounded text-white"
                  >
                    {productData.top_selling ? <FaStar /> : <FaRegStar />}
                  </button>

                  <Link to={`images/${productData._id}`}>
                    <button className="bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 hover:from-purple-500 hover:to-purple-700 p-2 rounded text-white">
                      <FaImages />
                    </button>
                  </Link>

                  <Link to={`edit/${productData._id}`}>
                    <button className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 p-2 rounded text-white">
                      <FaEdit />
                    </button>
                  </Link>

                  <button
                    onClick={() => viewProduct(productData, API_URL)}
                    className="bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 p-2 rounded text-white"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => deleteProduct(productData._id)}
                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 p-2 rounded"
                  >
                    <FaTrash />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductPopUp({ productData, API_URL }) {
  return (
    <div className="bg-gradient-to-tr from-[#081028] to-[#1b274c] text-white rounded-2xl w-full max-w-[1360px] p-8 max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Side: Main + Other Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className=" p-4 rounded-xl transition-transform duration-300 hover:scale-105">
            <div className=" h-[450px] flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={`${API_URL}/images/product/${productData.main_img}`}
                alt={productData.productName}
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          {productData.other_img?.length > 0 && (
            <div>
              <p className="text-sm text-white mb-2">Other Images</p>
              <div className="flex gap-4 flex-wrap">
                {productData.other_img.map((img, index) => (
                  <img
                    key={index}
                    src={`${API_URL}/images/product/${img}`}
                    alt={`Other ${index}`}
                    className="w-20 h-20 object-cover rounded-lg bg-[#182852] transition-transform duration-300 hover:scale-105"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Product Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{productData.productName}</h2>
            <p className="text-sm text-gray-400 italic">Slug: {productData.productSlug}</p>
          </div>

          <div className="bg-white bg-opacity-5 p-4 rounded-lg">
            <p className="text-lg text-white font-semibold mb-1">Short Description</p>
            <p className="text-gray-300">{productData.short_description}</p>
          </div>

          <div className="bg-white bg-opacity-5 p-4 rounded-lg">
            <p className="text-lg text-white font-semibold mb-1">Long Description</p>
            <p className="text-gray-300">{productData.long_description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-300">Original Price</p>
              <p className="text-green-400 line-through">${productData.original_price}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-300">Discount</p>
              <p className="text-red-400">{productData.discount_percentage}% OFF</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-300">Final Price</p>
              <p className="text-blue-400 font-bold text-xl">${productData.final_price}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Activation Toggle */}
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Activation</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={productData.status}
                  readOnly
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-green-500 relative transition-colors">
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                </div>
                <span className="ml-3 text-sm font-medium text-green-400">
                  {productData.status ? "Active" : "Inactive"}
                </span>
              </label>
            </div>

            {/* Stock Toggle */}
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Stock Status</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={productData.stock}
                  readOnly
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-green-400 relative transition-colors">
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                </div>
                <span className="ml-3 text-sm font-medium text-green-300">
                  {productData.stock ? "In Stock" : "Out of Stock"}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





