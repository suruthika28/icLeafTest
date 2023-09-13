import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiMore2Fill, RiArrowDropDownFill} from "react-icons/ri";
import "../styles/Head.css";
import logo from '../assets/images/logo-icleaf.png';

const Head = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
                    <button 
                        style={{
                            backgroundColor: "yellow",
                            border: "none",
                            padding: "10px 20px",
                            marginRight: "10px", // Add spacing between buttons
                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // Add a mild shadow
                        }}
                    >
                        Save & Exit
                    </button>
                    <button 
                        style={{
                            backgroundColor: "red",
                            border: "none",
                            padding: "10px 20px",
                            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // Add a mild shadow
                        }}
                    >
                        Submit Exam
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Head;
