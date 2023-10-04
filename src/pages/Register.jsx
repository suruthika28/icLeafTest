import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making API requests

import '../styles/styles.css';
import MainHeader1 from '../components/MainHeader1';
import ApiCall from '../services/ApiCall';

function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [allowPromotions, setAllowPromotions] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [usernameAvailability, setUsernameAvailability] = useState('');

    const handleAcceptTermsChange = () => {
        setAcceptTerms(!acceptTerms);
    };

    const handleAllowPromotionsChange = () => {
        setAllowPromotions(!allowPromotions);
    };

    const consentChkFlg = true;
    const autoProcessChkFlg = false;
    const data = new FormData();
    data.append('userName', username);
    data.append('password', password);
    data.append('reEnterPassword', reEnterPassword);
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('mobileNumber', mobileNumber);
    data.append('emailAddress', emailAddress);
    data.append('consentChkFlg', consentChkFlg);
    data.append('autoProcessChkFlg', autoProcessChkFlg);

    const url = 'userregister';
    const method = 'post';
    const headers = null;
    const url1 = 'useravailablecheck';
    const formdata = new FormData();
    formdata.append('userName', username);
    useEffect(() => {
        // Function to check username availability
        const checkUsernameAvailability = async () => {
            ApiCall.PostApi(method, url1, formdata, headers)
                .then((response) => {
                    // Check if the response has data.value
                    if (response.data.value !== '') {
                        setUsernameError(username+' is available.');
                    } else {
                        setUsernameError('Username is available.');
                    }
                })
                .catch((error) => {
                    console.error('Error checking username availability:', error);
                })
        };

        // Check username availability only if the username is not empty
        if (username !== '') {
            checkUsernameAvailability();
        }
    }, [username]); // Trigger the effect whenever username changes

    const handleRegister = async (event) => {
        event.preventDefault();
        if (username === '') {
            alert('Please fill the username');
        } else if (firstName === '') {
            alert('Please fill firstname');
        } else if (lastName === '') {
            alert('Please fill lastname');
        } else if (mobileNumber === '') {
            alert('Plese fill mobile number');
        } else if (emailAddress === '') {
            alert('Please fill email address');
        } else if (password === '') {
            alert('Please fill password');
        } else if (reEnterPassword === '') {
            alert('Please re enter the password');
        } else if (password !== reEnterPassword) {
            alert('Password mismatch');
        } else if (!acceptTerms) {
            alert('You must accept the terms and conditions to register.');
        } else if (!allowPromotions) {
            alert('You must accept allow your process data for any promotion');
        } else if (usernameAvailability === 'Username is not available.') {
            alert('Username is not available. Please choose another username.');
        } else {
            ApiCall.PostApi(method, url, data, headers)
                .then((response) => {
                    console.log(
                        username,
                        password,
                        reEnterPassword,
                        firstName,
                        lastName,
                        mobileNumber,
                        emailAddress,
                        'dssvsvsfdsd'
                    );
                    if (response) {
                        alert('success');
                        navigate('/login');
                    }
                })
                .catch((error) => {
                    console.error('Registration failed:', error);
                });
        }
    };

    const handleUsernameBlur = () => {
        if (username.length < 3) {
            setUsernameError('Username should have at least 3 characters.');
        } else if (username.startsWith(' ')) {
            setUsernameError('Username cannot have space.');
        } else {
            setUsernameError('');
        }
    };

    return (
        <div>
            <MainHeader1 />
            <div className="registration-container">
                <div className="registration-card">
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="input-row">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                style={{
                                    width: '95%',
                                    height: '30px',
                                    padding: '8px',
                                    borderRadius: 5,
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                style={{
                                    width: '95%',
                                    height: '30px',
                                    padding: '8px',
                                    borderRadius: 5,
                                }}
                            />
                        </div>
                        <div className="input-row">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={handleUsernameBlur}
                                style={{
                                    width: '100%',
                                    height: '30px',
                                    padding: '8px',
                                    borderRadius: 5,
                                }}
                            />
                            {usernameAvailability && (
                                <div
                                    className="username-availability"
                                    style={{
                                        color:
                                            usernameAvailability === 'Username is available.'
                                                ? 'green'
                                                : 'red',
                                    }}
                                >
                                    {usernameAvailability}
                                </div>
                            )}
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '95%',
                                    height: '30px',
                                    padding: '8px',
                                    borderRadius: 5,
                                }}
                            />
                        </div>
                        {usernameError && (
                            <div className="error-message" style={{ color: 'red' }}>
                                {usernameError}
                            </div>
                        )}
                        <div className="input-row">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={reEnterPassword}
                                onChange={(e) => setReEnterPassword(e.target.value)}
                                style={{
                                    width: '95%',
                                    height: '30px',
                                    padding: '8px',
                                    borderRadius: 5,
                                }}
                            />
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                // onKeyDown={preventSpaceInput} 
                                style={{
                                    width: '95%',
                                    height: '30px',
                                    padding: '8px',
                                    borderRadius: 5,
                                }}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </div>
                        <div className="input-row">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                style={{
                                    width: '95%',
                                    height: '30px',
                                    padding: '8px',
                                    borderRadius: 5,
                                }}
                            />
                        </div>
                        <div className="profile-row-label">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={handleAcceptTermsChange}
                                />
                                I have read and accept Click Here
                            </label>
                        </div>
                        <div className="profile-row-label">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={allowPromotions}
                                    onChange={handleAllowPromotionsChange}
                                />
                                I allow you to process my data for any promotions
                            </label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                style={{
                                    padding: '10px',
                                    background: '#C77E23',
                                    color: 'white',
                                    border: 'none',
                                    marginTop: '19px',
                                }}
                            >
                                Register
                            </button>
                        </div>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            Already have an account? <a href="/login">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
