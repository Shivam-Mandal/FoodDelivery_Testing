import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="py-10 bg-black text-white flex flex-col md:flex-row justify-between items-center px-5 md:px-20 w-full" id='contact-service'>
      <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
        <div className="rounded-full p-2 bg-white mb-4">
          <img src={assets.logo} className="w-40" alt="FlavorFeet Logo" />
        </div>
        <p className="text-center md:text-left max-w-xs">
          Welcome to FlavorFeet, where we believe that every meal should be an adventure for your taste buds. Our mission is to bring you a diverse array of delicious dishes crafted with the freshest ingredients, ensuring that each bite is a flavorful experience.
        </p>
      </div>
      <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
        <h3 className="font-bold mb-2">Explore</h3>
        <ul className="space-y-1">
          <li><Link to="/menu" className="hover:underline">Menu</Link></li>
          <li><Link to="/about" className="hover:underline">About Us</Link></li>
          <li><Link to="/#services" className="hover:underline">Services</Link></li>
          <li><Link to="/#contact" className="hover:underline">Contact</Link></li>
        </ul>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <h3 className="font-bold mb-2">Get in Touch</h3>
        <ul className="space-y-1">
          <li><Link href="" className="hover:underline">info@flavorfeet.com</Link></li>
          <li><Link href="" className="hover:underline">+1 234 567 890</Link></li>
          <li><Link to="" className="hover:underline">Our Locations</Link></li>
          <li><Link to="" className="hover:underline">Support</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
