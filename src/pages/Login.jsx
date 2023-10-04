import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css"
import MainHeader1 from '../components/MainHeader1';
import ApiCall from '../services/ApiCall';
function Login() {
    const [userName, setUserName] = useState('harivarshini');
    const [password, setPassword] = useState('varshu=1');
    const navigate = useNavigate();
    const data = {
        userName: userName,
        password: password
    };
    const url = "loginvalidation";
    const handleLogin = (event) => {
        event.preventDefault();
        ApiCall.PostApi('POST', url, data)
            .then((response) => {
                console.log(response.data);
                if (response.data.userDto) {
                    localStorage.setItem("token", response.data.userToken);
                    localStorage.setItem("userId", response.data.accountprofileDto.id);
                    localStorage.setItem("fName", response.data.accountprofileDto.firstName)
                    localStorage.setItem("lName", response.data.accountprofileDto.lastName)
                    localStorage.setItem("phone", response.data.accountprofileDto.telephone)
                    localStorage.setItem("email", response.data.accountprofileDto.emailId)
                    if (response.data.userDto.roleId === 0) {
                        localStorage.setItem("roleId", response.data.userDto.roleId);
                        navigate('/user');
                    } else {
                        localStorage.removeItem("roleId");
                        navigate('/user');
                    }
                } else {
                    console.log('User data not found in the response.');
                    alert(response.data.resMsg)
                }
            })
            .catch((error) => {
                console.log('Login failed:', error);
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
                    <h2 style={{ fontWeight: 'bold', color: '#C77E23' }}>Hi, Welcome</h2>
                    <h5 style={{ color: 'gray' }}>Enter your credentials to continue</h5>
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            style={{
                                width: '95%',
                                // height: '30px',
                                marginBottom: '16px',
                                padding: '8px',
                                borderRadius: 5,
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '95%',
                                // height: '30px',
                                padding: '8px',
                                borderRadius: 5,
                            }}
                        />
                        <div style={{ display: 'flex', marginTop: '5%' }}>
                            <a href="/forgetpass">Forgot Password ?</a>
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
                        >
                            Login
                        </button>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            Don't have an account? <a href="/register">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
