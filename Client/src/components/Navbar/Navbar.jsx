import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import User from '../../assets/User.svg';
import AuthPopup from '../auth/AuthPopup';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [token, setToken] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  const closePopup = () => {
    setShowAuthPopup(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={Logo} alt="logo" className="navbar-logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/">
          <li onClick={() => setMenu('home')}>Home</li>
        </Link>
        <a
          href="#app-download"
          onClick={() => setMenu('profile')}
          className={menu === 'profile' ? 'active' : ''}
        >
          Profile
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu('mobile-app')}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu('contact-us')}
          className={menu === 'contact-us' ? 'active' : ''}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        {!token ? (
          <button onClick={() => setShowAuthPopup(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={User} alt="" />
            <ul className="nav-profile-dropdown">
              <hr />
              <li onClick={logout}>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      {showAuthPopup && <AuthPopup closePopup={closePopup} />} {/* Conditionally render the AuthPopup component */}
    </div>
  );
};

export default Navbar;
