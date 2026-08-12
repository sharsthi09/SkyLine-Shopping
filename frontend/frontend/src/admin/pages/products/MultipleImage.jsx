import axios from 'axios';
import React, { useContext } from 'react';
import { Context } from '../../../MainContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function MultipleImage() {
  const { API_URL, Product_URL, toastMsg } = useContext(Context);
  const { product_id } = useParams();
  const navigate = useNavigate();

  const uploadImages = (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (let image of event.target.other_img.files) {
      formData.append('other_img', image);
    }

    axios
      .post(`${API_URL + Product_URL}/multipleImages/${product_id}`, formData)
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          event.target.reset();
          navigate('/admin/product');
        }
      })
      .catch((error) => {
        console.log(error);
        toastMsg(error.data?.msg || 'Upload failed', error.data?.status || 0);
      });
  };

  return (
    <div className="p-8 bg-[#0e132a] min-h-screen">
      <div className="max-w-6xl mx-auto bg-[#0B1739] hover:bg-[#182852] text-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-semibold mb-8 text-gray-100">Upload Other Images</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={uploadImages}>
          {/* File Upload */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className="block text-sm mb-1 text-gray-300">Other Images</label>
            <input
              multiple
              type="file"
              name="other_img"
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white file:bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 file:text-white file:px-4 file:py-1 file:rounded-md file:border-0 file:cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 transition px-6 py-2 rounded-lg shadow-md font-medium"
            >
              Upload Images
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
