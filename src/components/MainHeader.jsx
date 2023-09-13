import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownFill } from "react-icons/ri";
import "../styles/MainHeader.css";

const MainHeader = () => {
    const navigate = useNavigate()
    const roleId = localStorage.getItem("roleId")
    return (
        <header className="main-header">
            <nav className="menu">
                {roleId === "0" ? (
                    <ul className="menu-list">
                        <li className="menu-item has-submenu">
                            <span className="submenu-trigger">Dashboard</span>
                            <RiArrowDropDownFill className="dropdown-icon" />
                            <ul className="submenu">
                                <li className="submenu-item">
                                    <Link to="/dashboard">Courses Dashboard</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item has-submenu">
                            <span className="submenu-trigger">Buy Courses</span>
                        </li>
                        <li className="menu-item has-submenu">
                            <span className="submenu-trigger" onClick={() => { navigate('/user') }}>My Courses</span>
                        </li>
                        <li className="menu-item has-submenu">
                            <span className="submenu-trigger" onClick={() => navigate('/elearning')}>E-Resources</span>
                        </li>
                        <li className="menu-item has-submenu">
                            <span className="submenu-trigger">Exams</span>
                            <RiArrowDropDownFill className="dropdown-icon" />
                            <ul className="submenu">
                                <li className="submenu-item">
                                    <Link to="/activeexams" >Active Exam</Link>
                                </li>
                                <li className="submenu-item">
                                    <Link to="/pack">Review Completed Exams</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="menu-item has-submenu">
                            <span className="submenu-trigger" onClick={() => { navigate('/myprofile') }}>My Profile</span>
                        </li>
                    </ul>
                )
                    : (
                        <ul className="menu-list">
                            <li className="menu-item has-submenu">
                                <span className="submenu-trigger">Manage Content</span>
                                <RiArrowDropDownFill className="dropdown-icon" />
                                <ul className="submenu">
                                    <li className="submenu-item">
                                        <Link to="/exam">Manage Subject/Topic</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Manage Question Tags</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Upload Questions</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Manage Questionbank</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Manage Elearn Content</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Configure Elearn Tracking</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item has-submenu">
                                <span className="submenu-trigger">Manage Exam</span>
                                <RiArrowDropDownFill className="dropdown-icon" />
                                <ul className="submenu">
                                    <li className="submenu-item">
                                        <Link to="/exam">Create Exam</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Update Exam</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Exam Status View</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">View Exam</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item has-submenu">
                                <span className="submenu-trigger">Manage Pack</span>
                                <RiArrowDropDownFill className="dropdown-icon" />
                                <ul className="submenu">
                                    <li className="submenu-item">
                                        <Link to="/exam">Create Pack</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Update Pack</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Assign Exam</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">View Pack</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item has-submenu">
                                <span className="submenu-trigger">Manage User</span>
                                <RiArrowDropDownFill className="dropdown-icon" />
                                <ul className="submenu">
                                    <li className="submenu-item">
                                        <Link to="/exam">Create User</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">View or Update User</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Assign Pack To User</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Assign Approver</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Assign Evaluator</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item has-submenu">
                                <span className="submenu-trigger">Manage Corporate / Course</span>
                                <RiArrowDropDownFill className="dropdown-icon" />
                                <ul className="submenu">
                                    <li className="submenu-item">
                                        <Link to="/exam">Manage Corporate</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Manage Corpotate Course</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Manage User Course</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item has-submenu">
                                <span className="submenu-trigger">Manage Control</span>
                                <RiArrowDropDownFill className="dropdown-icon" />
                                <ul className="submenu">
                                    <li className="submenu-item">
                                        <Link to="/exam">Manage VCRoom</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Evaluate Answer Sheets</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Admin Exam Result Review</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Manage Consent</Link>
                                    </li>
                                    <li className="submenu-item">
                                        <Link to="/pack">Manage Certificates</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item has-submenu">
                                <span className="submenu-trigger">Manage Competency</span>
                                <RiArrowDropDownFill className="dropdown-icon" />
                                <ul className="submenu">
                                    <li className="submenu-item">
                                        <Link to="/exam">Create Competency</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    )}
            </nav>
        </header>
    );
};

export default MainHeader;
