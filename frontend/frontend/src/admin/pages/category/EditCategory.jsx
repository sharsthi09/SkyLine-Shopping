import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../../MainContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function EditCategory() {
  const { toastMsg, API_URL, Category_URL, fetchCategory, allCategory } = useContext(Context);
  const { category_id } = useParams();
  const navigate = useNavigate();

  // Controlled form state — populated once allCategory loads
  const [formData, setFormData] = useState({
    categoryname: '',
    categoryslug: '',
  });


const [categoryImage, setCategoryImage] = useState("");
const token = useSelector(
  (state) => state.admin.token
);

useEffect(() => {
  const getCategory = async () => {
    const data = await fetchCategory(category_id);

    console.log("CATEGORY DATA =>", data);

    if (data) {
      setFormData({
        categoryname: data.categoryname || "",
        categoryslug: data.categoryslug || "",
      });

      setCategoryImage(data.categoryimage || "");
    }
  };

  getCategory();
}, [category_id]);

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData({
      categoryname: name,
      categoryslug: createSlug(name),
    });
  };

  const editCategory = (event) => {
    event.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('categoryname', formData.categoryname);
    formDataObj.append('categoryslug', formData.categoryslug);
    const imageFile = event.target.categoryimage.files[0];
    if (imageFile) {
      formDataObj.append('categoryimage', imageFile);
    }

    axios
      .put(`${API_URL + Category_URL}/edit/${category_id}`, formDataObj,
 {
   headers: {
     Authorization: token,
     "Content-Type": "multipart/form-data"
   }
 })
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          event.target.reset();
          navigate('/admin/category');
        }
      })
      .catch((error) => {
        console.log(error);
        toastMsg(error.response?.data?.msg || 'Error', 0);
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0e132a]">
      <div className="w-full max-w-xl bg-[#0B1739] hover:bg-[#182852] text-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Edit Category</h2>
        <form className="space-y-5" onSubmit={editCategory}>
          <div>
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              name="categoryname"
              type="text"
              placeholder="Enter category name"
              value={formData.categoryname}
              onChange={handleNameChange}
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              readOnly
              name="categoryslug"
              type="text"
              placeholder="auto-generated-slug"
              value={formData.categoryslug}
              onChange={() => {}}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-300 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">This will be automatically generated from the category name</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category Image</label>
            <input
              name="categoryimage"
              type="file"
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white file:bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 file:text-white file:px-4 file:py-1 file:rounded-md file:border-0 file:cursor-pointer"
            />
          </div>
          {categoryImage && (
            <div>
              <img
                src={`${API_URL}/images/category/${categoryImage}`}
                alt="category"
                className="w-32 mt-2 rounded-lg object-cover border border-gray-700"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 transition duration-300 font-semibold"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
}
