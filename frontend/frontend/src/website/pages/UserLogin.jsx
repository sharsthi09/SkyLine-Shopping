import React, { useContext } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Context } from '../../MainContext';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/UserSlice';
import axios from 'axios';

export default function UserLogin() {

  const { toastMsg, API_URL, handleOpenCart, cartItems, setCartFromDB, moveWishlistToDb, wishlistItems } = useContext(Context);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const userLogin = (event) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    axios
      .post(API_URL + '/user/login', data)
      .then((success) => {
        toastMsg(success.data.msg, success.data.status);
        if (success.data.status == 1) {
          dispatch(login({ data: success.data.user, token: success.data.token }));

          axios.post(API_URL + `/user/movetodb/${success.data.user._id}`, cartItems).then(
            (res) => {
              console.log(res.data.latestCart)
              setCartFromDB(res.data.latestCart);
            }
          ).catch(
            (err) => {
              console.log(err)
            }
          )

          // Move wishlist to DB
          moveWishlistToDb(wishlistItems, success.data.user._id); // <-- pass userId here



          if (searchParams.get('ref') == 'cart') {
            navigate('/');
            handleOpenCart();
          }
          else {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={{ background: 'linear-gradient(to bottom right, #fbc2eb, #fcd5ce, #f8edeb)' }}>
      <div className="min-h-screen flex items-center justify-center px-10 lg:px-0">

        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
          <form onSubmit={userLogin}>
            <h2 className="text-2xl text-[#424553] font-bold mb-6 text-center">Login to Your Account</h2>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-[#535665] mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-[#E9EAEC] p-3 rounded focus:outline-none focus:ring-1 focus:ring-pink-300"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-[#535665] mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full border border-[#E9EAEC] p-3 rounded focus:outline-none focus:ring-1 focus:ring-pink-300"
              />
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-[#424553] text-sm">
                <input type="checkbox" className="mr-2" style={{ accentColor: '#ba31cc' }} />
                Remember me
              </label>
              <a href="#" className="text-sm text-[#ba31cc] hover:underline">Forgot Password?</a>
            </div>

            {/* Login Button */}
            <button className="w-full bg-[#93959E] text-white py-3 rounded font-semibold hover:bg-[#717279]">
              Login
            </button>

            {/* Register Link */}
            <p className="text-sm text-center text-[#424553] mt-4">
              Don’t have an account?{' '}
              <Link to={`/userregister?${searchParams.toString()}`}>
                <span className="text-[#ba31cc] font-medium hover:underline">Register</span></Link>
            </p></form>
        </div>
      </div>
    </div>
  )
}
