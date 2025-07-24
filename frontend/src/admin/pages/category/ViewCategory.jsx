import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../MainContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaPlus } from "react-icons/fa6";


export default function ViewCategory() {
  const { fetchCategory, allCategory, API_URL, Category_URL, toastMsg } = useContext(Context);
   

  const deleteCategory = (id) => {
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
        axios.delete(`${API_URL}${Category_URL}/delete/${id}`).then((success) => {
          toastMsg(success.data.msg, success.data.status);
          if (success.data.status === 1) fetchCategory();
        }).catch((error) => console.log(error));
      }
    });
  };

  const statusChange = (id) => {
    axios.patch(`${API_URL}${Category_URL}/status/${id}`).then((success) => {
      toastMsg(success.data.msg, success.data.status);
      if (success.data.status === 1) fetchCategory();
    }).catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#0e132a] min-h-screen text-white">
      <div className="bg-[#0B1739] hover:bg-[#182852] p-6 rounded-xl shadow-lg mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-purple-400 text-3xl">📁</span> Category Management
          </h2>
          <p className="text-sm text-gray-400 mt-1">Manage and organize your product categories</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search categories..."
            className="bg-[#0f172a] text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring focus:border-blue-500 w-64"
          />
          <Link to="add">
            <button className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 text-white px-2 flex py-2 rounded-md font-medium transition duration-200">
              <FaPlus className='mt-1' /><span>Add Category</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-[#1e293b] rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full text-sm text-left bg-[#0B1739]">
          <thead className="bg-[#0d172d] text-white">
            <tr>
              <th className="px-4 py-3 text-center">S.No.</th>
              <th className="px-4 py-3">Category Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(allCategory) && allCategory.map((categoryItem, categoryIndex) => (
                <tr key={categoryItem._id} className="border-t border-[#334155] text-center hover:bg-[#182852]">
                  <td className="px-4 py-3">{categoryIndex + 1}</td>
                  <td className="px-4 py-3 font-medium">{categoryItem.categoryname}</td>
                  <td className="px-4 py-3">{categoryItem.categoryslug}</td>
                  <td className="px-4 py-3">
                    <img
                      src={`${API_URL}/images/category/${categoryItem.categoryimage}`}
                      alt="category"
                      className="h-10 w-10 rounded-md object-cover mx-auto"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {
                      categoryItem.categorystatus ? (
                        <button
                          onClick={() => statusChange(categoryItem._id)}
                          className=" px-3 py-1 rounded-md text-white"
                          style={{
                            background: 'linear-gradient(to bottom, #003333, #008080, #33FFCC)'
                          }}
                        >
                          ✅ Active
                        </button>
                      ) : (
                        <button
                          onClick={() => statusChange(categoryItem._id)}
                          className=" px-3 py-1 rounded-md text-white"
                          style={{
                            background: 'linear-gradient(to bottom, #8B0000, #FF0000, #8B0000)'
                          }}
                        >
                          ❌ Inactive
                        </button>
                      )
                    }
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <Link to={`edit/${categoryItem._id}`}>
                      <button className="-700 px-3 py-1 rounded-md text-white"
                        style={{
                          background: 'linear-gradient(to bottom, #004d00, #006600, #004d00)'
                        }}>
                        ✏️ Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteCategory(categoryItem._id)}
                      className=" px-3 py-1 rounded-md text-white"
                      style={{
                            background: 'linear-gradient(to bottom, #8B0000, #FF0000, #8B0000)'
                          }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
