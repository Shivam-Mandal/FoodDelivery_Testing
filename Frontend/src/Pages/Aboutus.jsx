import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF,FaInstagram,FaTwitter } from 'react-icons/fa';
const AboutUs = () => {
  useEffect(()=>{
    window.scrollTo({top:0})
  })
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to FlavorFeet, your premier destination for delicious food delivered right to your doorstep.
        </p>
      </div>
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
          <p className="mt-4 text-gray-700">
            FlavorFeet was born out of a passion for great food and the desire to make it accessible to everyone, no matter where they are. Founded by a group of food enthusiasts with diverse culinary backgrounds, we saw an opportunity to bridge the gap between the best local restaurants and food lovers who crave quality and convenience. Since our inception, we have been dedicated to transforming the food delivery landscape, one meal at a time.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">What We Offer</h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li>
              <strong>Curated Menus:</strong> We partner with top local restaurants and chefs to offer a wide range of cuisines, from comforting classics to exotic delicacies. Our curated menus ensure that there's something for everyone, no matter your taste or dietary preference.
            </li>
            <li>
              <strong>Quality and Freshness:</strong> At FlavorFeet, quality is paramount. We work closely with our partners to ensure that every dish is prepared with the freshest ingredients and the highest culinary standards. Your food arrives not just quickly, but perfectly fresh and delicious.
            </li>
            <li>
              <strong>Easy Ordering:</strong> Our user-friendly platform makes it simple to browse, select, and order your favorite meals. Whether you’re at home, at the office, or on the go, FlavorFeet is designed to provide a seamless and enjoyable experience.
            </li>
            <li>
              <strong>Reliable Delivery:</strong> Our efficient delivery network ensures that your food arrives hot and on time. We take pride in our punctuality and the professionalism of our delivery team, so you can relax and focus on enjoying your meal.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Our Values</h2>
          <ul className="mt-4 space-y-4 text-gray-700">
            <li>
              <strong>Customer-Centric:</strong> Your satisfaction is our top priority. We are committed to providing exceptional service and responding promptly to your needs and feedback.
            </li>
            <li>
              <strong>Community Focused:</strong> We support local businesses and believe in fostering strong community relationships. By partnering with local restaurants, we help sustain and grow the local food economy.
            </li>
            <li>
              <strong>Innovation Driven:</strong> We are constantly exploring new ways to enhance your dining experience. From advanced technology solutions to expanding our culinary offerings, we strive to stay at the forefront of the food delivery industry.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Join the FlavorFeet Family</h2>
          <p className="mt-4 text-gray-700">
            At FlavorFeet, we are more than just a food delivery service; we are a community of food lovers dedicated to making every meal a delightful experience. Whether you are looking for a quick lunch, a family dinner, or catering for a special event, FlavorFeet is here to serve you with excellence and care.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="mt-4 text-gray-700">
            For any inquiries or feedback, please reach out to us at <Link to="mailto:support@flavorfeet.com" className="text-blue-500 underline">support@flavorfeet.com</Link> or call us at (123) 456-7890.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Follow Us</h2>
          <p className="mt-4 text-gray-700">
            Stay connected and get the latest updates by following us on social media:
          </p>
          <ul className="mt-4 flex space-x-6">
            <li>
              <Link to="https://www.facebook.com/FlavorFeet" className="text-blue-500 hover:text-blue-700">
                <FaFacebookF size={24} />
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/FlavorFeet" className="text-pink-500 hover:text-pink-700">
                <FaInstagram size={24} />
              </Link>
            </li>
            <li>
              <Link to="https://www.twitter.com/FlavorFeet" className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={24} />
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
