import React, { useContext, useEffect } from 'react';
import { Context } from '../../MainContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/AdminSlice';

export default function Login() {
  const { toastMsg, API_URL } = useContext(Context);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.data);
  const lsData = JSON.parse(localStorage.getItem('adminData'));

  const adminLogin = (event) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    axios
      .post(API_URL + '/admin/login', data)
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(login({ data: success.data.admin, token: success.data.token }));
          navigate('/admin');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (admin || lsData) {
      navigate('/admin');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F2C] flex items-center justify-center">
      <div className="bg-[#0F173A] p-10 rounded-xl shadow-xl max-w-md w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">LogIn</h2>

         <div className="flex items-center my-4">
          <div className="flex-grow h-[0.2px] bg-[#AEB9E1]"></div>
          <span className="text-[#AEB9E1] text-lg mx-2">LogIn with</span>
          <div className="flex-grow h-[0.2px] bg-[#AEB9E1]"></div>
        </div>

        <form className="space-y-4" onSubmit={adminLogin}>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Your Email"
              className="w-full px-4 py-2 bg-transparent border  border-[#AEB9E1] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Your Password"
              className="w-full px-4 py-2 bg-transparent text-white border border-[#AEB9E1] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 bg-transparent text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="ml-2 text-gray-300">Remember me</span>
            </label>
            <a href="#" className="text-[#CB3CDF] hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-r from-[#CB3CFF] to-[#7F25FB] rounded-md hover:from-purple-600 hover:to-pink-600"
          >
            Submit
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/admin/signup" className="text-[#CB3CDF] hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
