import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import User from "../../assets/User.svg";
import { useState, useEffect } from "react";
import SignUpForm from "../SignupForm/SignupForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import auth from "../../utils/auth";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [token, setToken] = useState(auth.getToken());
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = auth.getToken(); // Consistent token retrieval
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLoginClose = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  const handleSignUpClose = () => {
    setShowSignUp(false);
    setShowLogin(false);
  };

  const userId = token ? auth.getProfile()._id : ""; // Get user ID from token if available

  return (
    <div className="navbar">
      <Link to="/">
        <img src={Logo} alt="logo" className="navbar-logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          <li>Home</li>
        </Link>
        <Link
          to={`/profile`}
          onClick={() => setMenu("profile")}
          className={menu === "profile" ? "active" : ""}
        >
          <li>Profile</li>
        </Link>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        {!token ? (
          <div className="navbar-auth-buttons">
            {!showSignUp && !showLogin && (
              <>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setShowSignUp(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setShowSignUp(true);
                    setShowLogin(false);
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="navbar-profile">
            <img src={User} alt="user" />
            <ul className="nav-profile-dropdown">
              {/* Add logout functionality or other actions here */}
              {/* <hr /> */}
              {/* <li onClick={logout}>
                <p>Logout</p>
              </li> */}
            </ul>
          </div>
        )}
      </div>

      {showLogin && <LoginForm onClose={handleLoginClose} />}
      {showSignUp && <SignUpForm onClose={handleSignUpClose} />}
    </div>
  );
};

export default Navbar;
