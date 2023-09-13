import React, { useState } from "react";
import "../styles/styles.css";
import MainHeader from "../components/MainHeader";
import MainHeader1 from "../components/MainHeader1";
import { useNavigate } from "react-router-dom";
import ApiCall from "../services/ApiCall";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [RetypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append('currentPasswrd', currentPassword);
    data.append('newPasswrd', newPassword);
    data.append('RetypePasswrd', RetypePassword);
    const url = "changepassword";
    const method = "post";
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ApiCall
            .PostApi(method, url, data, headers)
            .then((response) => {
                if (response.data.responseStatusCode === 200) {
                    alert(response.data.responseData.Status);
                    navigate('/login');
                } else {
                    alert(response.data.responseData.Status);
                }
                console.log(response);
            })
            .catch((error) => {
                alert(error);
            });
        setIsPasswordChanged(true);
        setError("");
    };

    return (
        <div>
            <MainHeader1 />
            <MainHeader />
            <div
                style={{
                    height: '90vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className="change-password-container">
                    <h2 style={{ fontWeight: 'bold', color: '#C77E23' }}>Change Password</h2>
                    <form onSubmit={handleSubmit} className="password-form">
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="retype Password"
                                value={RetypePassword}
                                onChange={(e) => setRetypePassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: '#C77E23',
                                color: 'white',
                                border: 'none',
                                marginTop: '19px',
                            }}
                        >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
