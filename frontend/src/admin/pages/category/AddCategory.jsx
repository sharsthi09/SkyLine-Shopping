import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { Context } from '../../../MainContext';
import { useSelector } from 'react-redux';

export default function AddCategory() {
  const categoryname = useRef();
  const categoryslug = useRef();
  const categoryimage = useRef();

  const { toastMsg, API_URL, Category_URL } = useContext(Context);
  const token = useSelector((state) => state.admin.token);

  const creatSlug = () => {
    categoryslug.current.value = categoryname.current.value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const addCategory = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("categoryname", categoryname.current.value);
    formData.append("categoryslug", categoryslug.current.value);
    formData.append("categoryimage", event.target.categoryimage.files[0]);

    axios
      .post(`${API_URL + Category_URL}/create`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          event.target.reset();
        }
      })
      .catch((error) => {
        toastMsg(error.data?.msg || "Error", error.data?.status || 0);
      });
  };

  return (
    <div className="h-screen flex items-center pb-[170px] justify-center bg-[#0e132a]">
      <div className="w-full max-w-xl bg-[#0B1739] hover:bg-[#182852] text-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Add New Category</h2>
        <form className="space-y-5" onSubmit={addCategory}>
          <div>
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              onChange={creatSlug}
              name="categoryname"
              ref={categoryname}
              type="text"
              placeholder="Enter category name"
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              readOnly
              name="categoryslug"
              ref={categoryslug}
              type="text"
              placeholder="auto-generated-slug"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-300 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">This will be automatically generated from the category name</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category Image</label>
            <input
              ref={categoryimage}
              name="categoryimage"
              type="file"
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white file:bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 file:text-white file:px-4 file:py-1 file:rounded-md file:border-0 file:cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 transition duration-300 font-semibold"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}
