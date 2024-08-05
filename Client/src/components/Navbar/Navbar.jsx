import './Navbar.css'; 
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/Logo.svg'
import { useContext, useState } from 'react';

const Navbar = () => {

    const [menu, setMenu] = useState('home');
    const navigate = useNavigate();

    return(
        <div className="navbar">
            <Link to="/">Home</Link>
        </div>
    )
}