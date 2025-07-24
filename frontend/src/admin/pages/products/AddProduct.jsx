import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Context } from '../../../MainContext';
import axios from 'axios';

export default function AddProduct() {
  const { allCategory, fetchCategory, allColor, fetchColor, API_URL, toastMsg, Product_URL } = useContext(Context);
  const [selectColor, setSelectColor] = useState({});

  useEffect(() => {
    fetchCategory();
    fetchColor();
  }, []);

  const productName = useRef();
  const productSlug = useRef();
  const original_price = useRef();
  const discount_percentage = useRef();
  const final_price = useRef();
  const short_description = useRef();
  const long_description = useRef();

  const creatSlug = () => {
    productSlug.current.value = productName.current.value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const calculate = () => {
    final_price.current.value =
      original_price.current.value - (original_price.current.value * discount_percentage.current.value) / 100;
  };

  const productCategory = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName.current.value);
    formData.append('productSlug', productSlug.current.value);
    formData.append('original_price', original_price.current.value);
    formData.append('discount_percentage', discount_percentage.current.value);
    formData.append('final_price', final_price.current.value);
    formData.append('short_description', short_description.current.value);
    formData.append('long_description', long_description.current.value);
    formData.append('category_id', event.target.category_id.value);
    formData.append('colors', JSON.stringify(selectColor));
    formData.append('main_img', event.target.main_img.files[0]);

    axios
      .post(`${API_URL + Product_URL}/create`, formData)
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          event.target.reset();
        }
      })
      .catch((error) => {
        toastMsg(error.data.msg, error.data.status);
      });
  };

  return (
    <div className="p-8 bg-[#0e132a]">
      <div className="max-w-6xl mx-auto bg-[#0B1739] hover:bg-[#182852] text-white p-8 rounded-2xl shadow-2xl pt-7">
        <h2 className="text-3xl font-semibold mb-8 text-gray-100">Add Product</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={productCategory}>
          <Input
            label="Product Name"
            refObj={productName}
            name="productName"
            onChange={creatSlug}
            className="px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white placeholder-gray-400"
          />

          <Input
            label="Slug"
            refObj={productSlug}
            name="productSlug"
            readOnly
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-300 cursor-not-allowed"
          />

          <Input
            label="Original Price"
            refObj={original_price}
            name="original_price"
            type="number"
            onChange={calculate}
            className="px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white placeholder-gray-400"
          />

          <Input
            label="Discount Percentage"
            refObj={discount_percentage}
            name="discount_percentage"
            type="number"
            onChange={calculate}
            className="px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white placeholder-gray-400"
          />

          <Input
            label="Final Price"
            refObj={final_price}
            name="final_price"
            readOnly
            type="number"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-300 cursor-not-allowed"
          />

          <div>
            <label className="block text-sm mb-1 text-gray-300">Category</label>
            <Select
              name="category_id"
              className="text-black"
              options={allCategory.map((cat) => ({
                value: cat._id,
                label: cat.categoryname,
              }))}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Color</label>
            <Select
              isMulti
              closeMenuOnSelect={false}
              onChange={(options) => setSelectColor(options.map((opt) => opt.value))}
              className="text-black"
              options={allColor.map((color) => ({
                value: color._id,
                label: color.colorName,
              }))}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Main Image</label>
            <input
              type="file"
              name="main_img"
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white file:bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 file:text-white file:px-4 file:py-1 file:rounded-md file:border-0 file:cursor-pointer"
            />
          </div>

          <Textarea
            label="Short Description"
            refObj={short_description}
            name="short_description"
            rows={2}
            className="px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white placeholder-gray-400"
          />

          <Textarea
            label="Long Description"
            refObj={long_description}
            name="long_description"
            rows={4}
            className="px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white placeholder-gray-400"
          />

          <div className="col-span-full text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 transition px-6 py-2 rounded-lg shadow-md font-medium"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Input = ({ label, refObj, name, type = 'text', onChange, readOnly = false, className = '' }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      ref={refObj}
      readOnly={readOnly}
      onChange={onChange}
      className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        readOnly ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
    />
  </div>
);

const Textarea = ({ label, refObj, name, rows = 3, className = '' }) => (
  <div className="col-span-full">
    <label className="block text-sm mb-1 text-gray-300">{label}</label>
    <textarea
      name={name}
      ref={refObj}
      rows={rows}
      className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  </div>
);
