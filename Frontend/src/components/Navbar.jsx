import React, { useState, useEffect, useContext } from 'react';
import { FaShoppingCart, FaBars, FaTimes, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import FoodContext from '../context/FoodContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Navbar = ({ setLogin, isDarkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, setToken } = useContext(FoodContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    setIsSticky(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigation = (path, hash) => {
    navigate(path);
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <nav className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-200'} z-10 w-full ${isSticky ? 'fixed bg-gray-200' : ''} top-0`}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/" className="flex items-center">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-16 sm:w-16 md:w-24 lg:w-32 xl:w-36 border-none"
            />
          </Link>
        </div>
        <div className={`hidden md:flex space-x-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} style={{ fontFamily: 'Outfit' }}>
          <Link to="/" className={`${location.pathname === '/' ? 'underline underline-offset-8 hover:text-gray-500' : 'hover:text-gray-500'}`}>Home</Link>
          <button onClick={() => handleNavigation('/', 'explore-menu')} className={`${location.pathname === '/menu' ? 'underline underline-offset-8 hover:text-gray-500' : 'hover:text-gray-500'}`}>Menu</button>
          <button onClick={() => handleNavigation('/', 'mobile-apps')} className={`${location.pathname === '/mobile' ? 'underline underline-offset-8 hover:text-gray-500' : 'hover:text-gray-500'}`}>Mobile-app</button>
          <button onClick={() => handleNavigation('/', 'contact-service')} className={`${location.pathname === '/contact' ? 'underline underline-offset-8 hover:text-gray-500' : 'hover:text-gray-500'}`}>Contact-us</button>
          <button onClick={() => handleNavigation('/', 'services')} className={`${location.pathname === '/service' ? 'underline underline-offset-8 hover:text-gray-500' : 'hover:text-gray-500'}`}>Services</button>
          <Link to="/about" className={`${location.pathname === '/about' ? 'underline underline-offset-8 hover:text-gray-500' : 'hover:text-gray-500'}`}>About-us</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={30}
          />
          <Link to="/cart" className={`focus:outline-none ${isDarkMode ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}>
            <FaShoppingCart size={25} />
          </Link>
          {!token ? (
            <button onClick={() => setLogin(true)} className='flex items-center gap-1 bg-orange-400 rounded-3xl py-1 px-3 text-white hover:bg-orange-500'>
              sign in
            </button>
          ) : (
            <div className="relative z-10">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:text-gray-600 flex items-center`}
              >
                <FaUserAlt size={20} />
              </button>
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-md shadow-lg py-2`}>
                  <Link
                    to="/myorders"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className={`${isDarkMode ? 'text-white' : 'text-gray-800'} focus:outline-none`}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className={`md:hidden px-4 pb-4 space-y-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
          <Link to="/" onClick={toggleMenu} className="block hover:text-gray-500">Home</Link>
          <button onClick={() => handleNavigation('/', 'explore-menu')} className="block hover:text-gray-500">Menu</button>
          <button onClick={() => handleNavigation('/', 'mobile-apps')} className="block hover:text-gray-500">Mobile-app</button>
          <button onClick={() => handleNavigation('/', 'contact-service')} className="block hover:text-gray-500">Contact-us</button>
          <button onClick={() => handleNavigation('/', 'services')} className="block hover:text-gray-500">Services</button>
          <Link to="/about" onClick={toggleMenu} className="block hover:text-gray-500">About-us</Link>
          <Link to="/cart" onClick={toggleMenu} className="block hover:text-gray-500">Cart</Link>
          {!token ? (
            <>
              <button onClick={() => { setLogin(true); toggleMenu(); }} className="block hover:text-gray-500">Login</button>
              <button onClick={() => { navigate('/signup'); toggleMenu(); }} className="block hover:text-gray-500">Signup</button>
            </>
          ) : (
            <>
              <Link to="/myorders" onClick={toggleMenu} className="block hover:text-gray-500">Orders</Link>
              <button onClick={handleLogout} className="block hover:text-gray-500">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
