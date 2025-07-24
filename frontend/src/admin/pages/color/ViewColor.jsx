import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../MainContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FaPlus } from "react-icons/fa6";

export default function ViewColor() {
  const { fetchColor, allColor, API_URL, Color_URL, toastMsg } = useContext(Context)

  const deleteColor = (id) => {
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
        axios.delete(API_URL + Color_URL + `/delete/${id}`).then(success => {
          toastMsg(success.data.msg, success.data.status);
          if (success.data.status === 1) {
            fetchColor();
          }
        }).catch(console.log)
      }
    });
  }

  const statusChange = (id) => {
    axios.patch(API_URL + Color_URL + `/status/${id}`).then(success => {
      toastMsg(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        fetchColor();
      }
    }).catch(console.log)
  }

  useEffect(() => {
    fetchColor()
  }, [])

  return (
    <div className="min-h-screen bg-[#0e132a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#0B1739] hover:bg-[#182852] p-6 rounded-xl mb-6 shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">🎨 Color Management</h2>
            <p className="text-sm text-gray-400">Manage your product colors</p>
          </div>
          <Link to="add">
            <button className="bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 text-white px-2 flex py-2 rounded-md font-medium transition duration-200">
              <FaPlus className='mt-1' /><span>Add Color</span>
            </button>
          </Link>
        </div>

        <div className="bg-[#1e293b] rounded-xl overflow-x-auto shadow-lg">
          <table className="min-w-full text-sm text-left bg-[#0B1739]">
            <thead className="bg-[#0d172d] text-white">
              <tr>
                <th className="px-6 py-3">Color Name</th>
                <th className="px-6 py-3">Slug</th>
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Preview</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {
                Array.isArray(allColor) && allColor.map((color, index) => (
                  <tr key={index} className="hover:bg-[#182852] border-t border-[#334155] transition">
                    <td className="px-6 py-4 font-medium">{color.colorName}</td>
                    <td className="px-6 py-4">{color.colorSlug}</td>
                    <td className="px-6 py-4 text-[#94a3b8]">{color.colorCode}</td>
                    <td className="px-6 py-4">
                      <div className="w-6 h-6 rounded-full mx-auto border" style={{ backgroundColor: color.colorCode }}></div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => statusChange(color._id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 justify-center text-white
      ${color.colorStatus
                            ? 'bg-gradient-to-b from-green-300 via-green-400 to-green-500 hover:from-green-400 hover:to-green-600'
                            : 'bg-gradient-to-b from-red-300 via-red-400 to-red-500 hover:from-red-400 hover:to-red-600'
                          }`}
                      >
                        <span className="text-lg">{color.colorStatus ? '✅' : '❌'}</span>
                        {color.colorStatus ? 'Active' : 'Inactive'}
                      </button>
                    </td>


                    <td className="px-6 py-4 space-x-2">
                      <Link to={`edit/${color._id}`}>
                        <button className=" text-white px-3 py-1 rounded shadow inline-flex items-center gap-1"
                          style={{
                            background: 'linear-gradient(to bottom, #004d00, #006600, #004d00)'
                          }}>

                          ✏️ Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteColor(color._id)}
                        className=" text-white px-3 py-1 rounded shadow inline-flex items-center gap-1"
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
    </div>
  )
}
