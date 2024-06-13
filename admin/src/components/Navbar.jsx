import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {Link, useLoaderData, useLocation} from 'react-router-dom'
import { assets } from '../assets/assets';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  return (
    <nav className="p-4 flex items-center justify-between">
      <div className="text-2xl font-bold">
      <Link to="/" className="flex items-center">
            <img 
              src={assets.logo} 
              alt="Logo" 
              className="w-24 sm:w-32 md:w-36 lg:w-44 xl:w-48 border-none" 
            />
          </Link>
          <p className='text-sm mx-3'>Admin Panel</p>
      </div>
      <ul className="flex space-x-4">
        <li><Link to="/add" className={`${location.pathname === "/add" ? "underline underline-offset-8  text-orange-400" : "hover:text-gray-500"}`}>Add Items</Link></li>
        <li><Link to="/list" className={`${location.pathname === "/list" ? "underline underline-offset-8 text-orange-400" : "hover:text-gray-500"}`}>List Items</Link></li>
        <li><Link to="/orders" className={`${location.pathname === "/orders" ? "underline underline-offset-8 text-orange-400" : "hover:text-gray-500"}`}>Orders</Link></li>
      </ul>
      <div className="relative">
      <FaUserCircle
          size={40}
          className="cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
            <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
            <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
