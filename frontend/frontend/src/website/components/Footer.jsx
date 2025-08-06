import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import footerimg from '../images/footer.png';

export default function Footer() {
  return (
    <div>
      <footer className="shadow-sm bg-gradient-to-r from-[#660033] via-[#4B0055] to-[#330066] h-auto px-6 md:px-16 lg:px-24 pt-28 pb-12 text-white relative">
        <div className="container mx-auto px-4 relative">

          {/* Sofa Image */}
          <div className="hidden lg:block absolute top-[-180px] left-[890px] w-[480px] h-[700px]">
            <img src={footerimg} alt="Sofa" className="w-full h-full" />
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-wrap mb-12">
            <div className="w-full lg:w-[800px]">
              <div className="bg-white/10 p-6 rounded-lg shadow-md backdrop-blur-sm">
                <h3 className="flex items-center text-xl font-semibold mb-4 text-white">
                  <span className="mr-2 text-2xl text-white">
                    <HiOutlineMail />
                  </span>
                  <span>Subscribe to Newsletter</span>
                </h3>

                <form className="flex flex-row flex-wrap gap-3">
                  <input
                    type="text"
                    className="flex-1 bg-white/20 text-white placeholder-gray-300 border border-white/30 px-4 py-2 rounded-md focus:outline-none"
                    placeholder="Enter your name"
                  />
                  <input
                    type="email"
                    className="flex-1 bg-white/20 text-white placeholder-gray-300 border border-white/30 px-4 py-2 rounded-md focus:outline-none"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="bg-white text-[#330066] px-5 py-2 rounded-md hover:bg-gray-100 flex items-center justify-center"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Main Content */}
          <div className="flex flex-wrap gap-10 mb-12">
            {/* Brand and Description */}
            <div className="w-full lg:w-1/3">
              <div className="mb-4">
                <a href="#" className="text-2xl font-bold text-white">
                  SKYLINE<span className="text-pink-300">.</span>
                </a>
              </div>
              <p className="mb-4 text-gray-200">
                Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio
                quis nisl dapibus malesuada...
              </p>
              <ul className="flex gap-4 text-xl text-white">
                <li><a href="#" className="hover:text-pink-300"><FaFacebookF /></a></li>
                <li><a href="#" className="hover:text-pink-300"><FaTwitter /></a></li>
                <li><a href="#" className="hover:text-pink-300"><FaInstagram /></a></li>
                <li><a href="#" className="hover:text-pink-300"><FaLinkedinIn /></a></li>
              </ul>
            </div>

            {/* Footer Links */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                ["About us", "Services", "Blog", "Contact us"],
                ["Support", "Knowledge base", "Live chat"],
                ["Jobs", "Our team", "Leadership", "Privacy Policy"],
                ["Mens", "Womens", "Home Living"]
              ].map((group, index) => (
                <ul key={index} className="space-y-2 text-gray-200">
                  {group.map((item, i) => (
                    <li key={i}>
                      <a href="#" className="hover:underline hover:text-white">{item}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-6 text-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-center md:text-left mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} All Rights Reserved.
              </p>
              <ul className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm">
                <li><a href="#" className="hover:underline hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
