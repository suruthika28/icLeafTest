import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiMore2Fill, RiArrowDropDownFill} from "react-icons/ri";
import "../styles/Head.css";
import logo from '../assets/images/logo-icleaf.png';

const MainHeader1 = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegisteration = () => {
        navigate('/register')
    }

    const handleHome = () => {
        navigate('/home');
    }

    const handleChangePassword = () => {
        navigate('/changepassword');
    }

    const handleRegister = () => {
        navigate('/myprofile');
    }
    return (
        <header className="header-main">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <nav className="menu">
                {/* menu */}
            </nav>
            <div className="profile">
                <div className="profile-icon">
                    {location.pathname === "/home" || location.pathname === "/" ? (
                        <div className="auth-buttons">
                            <button className="auth-button" onClick={handleLogin}>Login</button>
                            <button className="auth-button" onClick={handleRegisteration}>Register</button>
                        </div>
                    ) : location.pathname === "/login" || location.pathname === "/register" ? (
                        <button className="auth-button" onClick={handleHome}>Home</button>
                    ) : (
                        <div className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <RiMore2Fill color="black" size={24} />
                            {isDropdownOpen && (
                                <div className="dropdown-content">
                                    <button className="dropdown-option" onClick={handleRegister}>My Profile</button>
                                    <button className="dropdown-option" onClick={handleChangePassword}>Change Password</button>
                                    <button className="dropdown-option" onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </header>
    );
};

export default MainHeader1;
