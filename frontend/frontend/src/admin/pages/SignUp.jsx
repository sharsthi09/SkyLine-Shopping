import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../MainContext";



const SignUp = () => {
  const navigate = useNavigate();
    const { toastMsg, API_URL } = useContext(Context);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple frontend validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/admin/create`, formData);
      if (res.data.status === 1) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/admin/login"), 1500);
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#081028]">
      <div className="bg-[#0B1739] p-8 rounded-xl w-[450px] shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">SignUp</h2>

        <div className="flex gap-7 mb-6">
          <button className="flex-1 bg-[#0A1330] text-white flex items-center justify-center gap-2 py-2 rounded-lg">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google" />
            Signup with Google
          </button>
          <button className="flex-1 bg-[#0A1330] text-white flex items-center j  ustify-center gap-2 py-2 rounded-lg">
            <img src="https://img.icons8.com/ios-filled/16/ffffff/mac-os.png" alt="apple" />
            Signup with Apple
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-[#AEB9E1]"></div>
          <span className="text-[#AEB9E1] text-lg mx-2">or Signup with</span>
          <div className="flex-grow h-px bg-[#AEB9E1]"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-2 mb-4 rounded bg-transparent border border-[#AEB9E1] text-white focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-2 mb-4 rounded bg-transparent border border-[#AEB9E1] text-white focus:outline-none"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Your Password"
            className="w-full p-2 mb-4 rounded bg-transparent border border-[#AEB9E1] text-white focus:outline-none"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            className="w-full p-2 mb-4 rounded bg-transparent border border-[#AEB9E1] text-white focus:outline-none"
            value={formData.phone}
            onChange={handleChange}
          />

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-400 text-sm mb-3">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium"
          >
            Submit
          </button>
        </form>

        <p className="text-[#AEB9E1] text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-[#CB3CDF] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
