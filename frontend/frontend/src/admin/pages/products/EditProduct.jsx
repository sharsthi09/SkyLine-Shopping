import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { Context } from '../../../MainContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
  const {
    allCategory,
    fetchCategory,
    fetchProduct,
    allProduct,
    allColor,
    fetchColor,
    API_URL,
    toastMsg,
    Product_URL,
  } = useContext(Context);

  const [selectColor, setSelectColor] = useState([]);
  const { product_id } = useParams();
  const navigate = useNavigate();

  const productName = useRef();
  const productSlug = useRef();
  const original_price = useRef();
  const discount_percentage = useRef();
  const final_price = useRef();
  const short_description = useRef();
  const long_description = useRef();

  useEffect(() => {
    fetchCategory();
    fetchColor();
    fetchProduct(product_id);
  }, []);

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

  const editProduct = (event) => {
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
      .put(`${API_URL + Product_URL}/edit/${product_id}`, formData)
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          event.target.reset();
          navigate('/admin/product');
        }
      })
      .catch((error) => {
        toastMsg(error.data.msg, error.data.status);
      });
  };

  return (
    <div className="p-8 bg-[#0e132a]">
      <div className="max-w-6xl mx-auto bg-[#0B1739] hover:bg-[#182852] text-white p-8 rounded-2xl shadow-2xl pt-7">
        <h2 className="text-3xl font-semibold mb-8 text-gray-100">Edit Product</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={editProduct}>
          <Input
            label="Product Name"
            refObj={productName}
            name="productName"
            onChange={creatSlug}
            defaultValue={allProduct.productName}
          />

          <Input
            label="Slug"
            refObj={productSlug}
            name="productSlug"
            readOnly
            defaultValue={allProduct.productSlug}
            className="bg-gray-800 border-gray-600 text-gray-300 cursor-not-allowed"
          />

          <Input
            label="Original Price"
            refObj={original_price}
            name="original_price"
            type="number"
            onChange={calculate}
            defaultValue={allProduct.original_price}
          />

          <Input
            label="Discount Percentage"
            refObj={discount_percentage}
            name="discount_percentage"
            type="number"
            onChange={calculate}
            defaultValue={allProduct.discount_percentage}
          />

          <Input
            label="Final Price"
            refObj={final_price}
            name="final_price"
            type="number"
            readOnly
            defaultValue={allProduct.final_price}
            className="bg-gray-800 border-gray-600 text-gray-300 cursor-not-allowed"
          />

          <div>
            <label className="block text-sm mb-1 text-gray-300">Category</label>
            <Select
              name="category_id"
              className="text-black"
              defaultValue={allCategory
                .filter((cat) => cat._id === allProduct.category_id)
                .map((cat) => ({
                  value: cat._id,
                  label: cat.categoryname,
                }))}
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
              className="text-black"
              onChange={(options) => setSelectColor(options.map((opt) => opt.value))}
              defaultValue={allProduct.colors?.map((colorId) => {
                const color = allColor.find((c) => c._id === colorId);
                return color ? { value: color._id, label: color.colorName } : null;
              }).filter(Boolean)}
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
            {allProduct.main_img && (
              <img
                src={API_URL + `/images/product/${allProduct.main_img}`}
                alt="product"
                className="mt-2 w-16 h-20 object-cover rounded"
              />
            )}
          </div>

          <Textarea
            label="Short Description"
            refObj={short_description}
            name="short_description"
            rows={2}
            defaultValue={allProduct.short_description}
          />

          <Textarea
            label="Long Description"
            refObj={long_description}
            name="long_description"
            rows={4}
            defaultValue={allProduct.long_description}
          />

          <div className="col-span-full text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 transition px-6 py-2 rounded-lg shadow-md font-medium"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Input = ({ label, refObj, name, type = 'text', onChange, readOnly = false, defaultValue = '', className = '' }) => (
  <div>
    <label className="block text-sm mb-1 text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      ref={refObj}
      readOnly={readOnly}
      onChange={onChange}
      defaultValue={defaultValue}
      className={`w-full p-2 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${readOnly ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
    />
  </div>
);

const Textarea = ({ label, refObj, name, rows = 3, defaultValue = '', className = '' }) => (
  <div className="col-span-full">
    <label className="block text-sm mb-1 text-gray-300">{label}</label>
    <textarea
      name={name}
      ref={refObj}
      rows={rows}
      defaultValue={defaultValue}
      className={`w-full p-2 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  </div>
);
