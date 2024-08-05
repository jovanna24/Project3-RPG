import './Footer.css';
import Logo from '../../assets/Logo.svg';
import Ig_Icon from '../../assets/ig_icon.svg';
import X_icon from '../../assets/x_icon.svg';
import LinkedIn_icon from '../../assets/linkedin_icon.svg';

const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-conent-left">
                <img src={Logo} alt="logo" className='footer-logo' />
                <div className="footer-social-icons">
                    <img src={Ig_Icon} alt="instagram" />
                    <img src={X_icon} alt="x" />
                    <img src={LinkedIn_icon} alt="linkedin" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>
                    GET IN TOUCH
                </h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@RPG.com</li>
                </ul>
            </div>
        </div>
        <div className="copyright">
            <p className="footer-copyright">Copyright 2024 © RPG.com - All Rights Reserved.</p>
            </div>
    </div>
  )
}

export default Footer;
