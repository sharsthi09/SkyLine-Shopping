import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../MainContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditColor() {
  const { API_URL, Color_URL, toastMsg, fetchColor } = useContext(Context);

  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(true);

  const colorName = useRef();
  const colorSlug = useRef();
  const colorCode = useRef();
  const { color_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadColor = async () => {
      setLoading(true);
      const data = await fetchColor(color_id);
      if (data) setColor(data);
      setLoading(false);
    };
    loadColor();
  }, [color_id]);

  const createSlug = () => {
    colorSlug.current.value = colorName.current.value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const editColor = (event) => {
    event.preventDefault();
    const colorData = {
      colorName: event.target.colorName.value,
      colorSlug: event.target.colorSlug.value,
      colorCode: event.target.colorCode.value,
    };

    axios
      .put(`${API_URL + Color_URL}/edit/${color_id}`, colorData)
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          event.target.reset();
          navigate('/admin/color');
        }
      })
      .catch((error) => {
        console.log(error);
        toastMsg(error?.response?.data?.msg || 'Something went wrong', 0);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e132a] flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Loading color data...</div>
      </div>
    );
  }

  if (!color) {
    return (
      <div className="min-h-screen bg-[#0e132a] flex items-center justify-center">
        <div className="text-red-400 text-lg">Color not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e132a] pb-[170px] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[#0B1739] hover:bg-[#182852] text-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Edit Color</h2>

        {/* key forces re-mount with fresh defaultValues once data is loaded */}
        <form key={color._id} onSubmit={editColor}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Color Name</label>
            <input
              type="text"
              name="colorName"
              ref={colorName}
              defaultValue={color.colorName}
              onChange={createSlug}
              placeholder="Enter color name"
              className="w-full px-4 py-2 rounded-md bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Color Slug</label>
            <input
              type="text"
              name="colorSlug"
              ref={colorSlug}
              readOnly
              defaultValue={color.colorSlug}
              placeholder="auto-generated-slug"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 text-gray-300 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Auto-generated from the color name</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Pick a Color</label>
            <input
              type="color"
              name="colorCode"
              ref={colorCode}
              defaultValue={color.colorCode}
              className="w-full h-12 rounded cursor-pointer bg-[#0f172a]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 transition text-white font-semibold"
          >
            Update Color
          </button>
        </form>
      </div>
    </div>
  );
}
