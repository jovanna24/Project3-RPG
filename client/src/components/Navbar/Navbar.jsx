import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import User from "../../assets/User.svg";
import { useState, useEffect } from "react";
import SignUpForm from '../SignupForm/SignupForm.jsx';
import LoginForm from '../LoginForm/LoginForm.jsx';
import auth from "../../utils/auth";

const Navbar = () => {
    const [menu, setMenu] = useState("home"); // State to track which menu is active
    const [token, setToken] = useState(auth.getToken()); // Get token from local storage
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate(); // Use navigate hook from react-router-dom

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    };

    const handleLoginClose = () => {
        setShowLogin(false);
        setShowSignUp(false);
    };
    
    const handleSignUpClose = () => {
        setShowSignUp(false);
        setShowLogin(false);
    };

    return (
        <div className="navbar">
            <Link to="/">
                <img src={Logo} alt="logo" className="navbar-logo" />
            </Link>
            <ul className="navbar-menu">
                <Link to="/">
                    <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li>
                </Link>
                <a
                    href="profile"
                    onClick={() => setMenu("profile")}
                    className={menu === "profile" ? "active" : ""}
                >
                    Profile
                </a>
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
                                <button onClick={() => { setShowLogin(true); setShowSignUp(false); }}>Sign In</button>
                                <button onClick={() => { setShowSignUp(true); setShowLogin(false); }}>Sign Up</button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="navbar-profile">
                        <img src={User} alt="user" />
                        <ul className="nav-profile-dropdown">
                            {/* <hr /> */}
                            {/* <li onClick={logout}>
                                <p>Logout</p>
                            </li> */}
                        </ul>
                    </div>
                )}
            </div>

            {/* Conditional rendering of LoginForm and SignUpForm */}
            {showLogin && <LoginForm onClose={handleLoginClose} />}
            {showSignUp && <SignUpForm onClose={handleSignUpClose} />}
        </div>
    );
};

export default Navbar;
