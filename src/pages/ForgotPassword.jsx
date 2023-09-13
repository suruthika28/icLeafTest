import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css"
import MainHeader1 from '../components/MainHeader1';
import ApiCall from '../services/ApiCall';
function ForgotPassword() {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJtb2JpbGVOdW1iZXIiOiI4OTU2Nzg2Nzg5IiwiZW1haWwiOiJoYXJpdmFzaGluaUBpbmZvY2FyZWVyaW5kaWEuY29tIiwidXNlcklkIjoyMTk3LCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjkzODk0MzU1fQ.c_alDJ4v2It97X7noqFFJVfqMvwhLNkm2_uwPIbzmFo"
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const data = {
    }
    const url = `forgetpassword?userName=${userName}`;
    
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const method = "post";
    const handleFunction = (event) => {
        event.preventDefault();
        ApiCall.PostApi(method, url, data, headers)
            .then((response) => {
                if (response.data.responseStatusCode === 200) {
                    alert(response.data.responseData.Status)
                    console.log(response);
                    navigate('/login');
                }
                else {
                    alert(response.data.responseData.Status)
                }
            })
            .catch((error) => {
                alert(error);
            });
    };


    return (
        <div>
            <MainHeader1 />
            <div
                style={{
                    height: '90vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className='login-card'>
                    <h2 style={{ fontWeight: 'bold', color: '#C77E23' }}>Get Your Password</h2>
                    <p style={{ color: 'gray' }}>Lost your password? Please enter your user name. You will receive a link to create a new password via email.</p>
                    <form onSubmit={handleFunction}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            style={{
                                width: '95%',
                                height: '30px',
                                marginBottom: '16px',
                                padding: '8px',
                                borderRadius: 5,
                            }}
                        />
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
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
