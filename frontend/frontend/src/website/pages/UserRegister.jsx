import axios from 'axios';
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import { Context } from '../../MainContext';
import { login } from '../../redux/reducers/UserSlice';

export default function UserRegister() {
const { toastMsg, API_URL, handleOpenCart } = useContext(Context);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams]=useSearchParams();
  

    const userRegister = (event) => {
        event.preventDefault();
        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };
        axios
            .post(API_URL + '/user/create', data)
            .then((success) => {
                toastMsg(success.data.msg, success.data.status);
                if (success.data.status == 1) {
                    dispatch(login({ data: success.data.user, token: success.data.token }));
                    if(searchParams.get('ref')=='cart'){
                        navigate('/');
                        handleOpenCart();
                    }
                    else{
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
                        <form onSubmit={userRegister}>
                        <h2 className="text-2xl text-[#424553] font-bold mb-6 text-center">Create a New Account</h2>

                        {/* Name Input */}
                        <div className="mb-4">
                            <label className="block text-[#535665] mb-1">Name</label>
                            <input
                                name='name'
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border border-[#E9EAEC] p-3 rounded focus:outline-none focus:ring-1 focus:ring-pink-300"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-[#535665] mb-1">Email</label>
                            <input
                                name='email'
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-[#E9EAEC] p-3 rounded focus:outline-none focus:ring-1 focus:ring-pink-300"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label className="block text-[#535665] mb-1">Password</label>
                            <input
                                name='password'
                                type="password"
                                placeholder="Enter your password"
                                className="w-full border border-[#E9EAEC] p-3 rounded focus:outline-none focus:ring-1 focus:ring-pink-300"
                            />
                        </div>

                        {/* Register Button */}
                        <button className="w-full bg-[#93959E] text-white py-3 rounded font-semibold hover:bg-[#717279]">
                            Register
                        </button>

                        {/* Login Link */}
                        <p className="text-sm text-center text-[#424553] mt-4">
                            Already have an account?{' '}
                            <Link to={`/userlogin?${searchParams.toString()}`}>
                                <span className="text-[#ba31cc] font-medium hover:underline">Login</span></Link>
                        </p>
                         </form>
                    </div>
               
            </div>
        </div>
    )
}
