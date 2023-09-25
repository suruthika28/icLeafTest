import React, { useEffect, useState } from 'react';
import MainHeader from '../components/MainHeader';
import MainHeader1 from '../components/MainHeader1';
import userService from '../services/userService';
import '../styles/styles.css'
import ApiCall from '../services/ApiCall';
import { useNavigate } from 'react-router-dom';
function CreateUser() {
    const token = localStorage.getItem("token");
    const [subjectNames, setSubjectNames] = useState([]);
    const navigate = useNavigate();
    let timeout;

    function startSessionTimeout() {
        const TIMEOUT_DURATION = 5 * 60 * 1000;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            // console.log("Session timeout triggered");
            navigate('/login')

        }, TIMEOUT_DURATION);
    }

    useEffect(() => {
        startSessionTimeout();
        getUserPurchaseElearn();
    }, []);
    const method = "post";
    const url = "getUserPurchaseElearn";
    const data = {};
    const headers = {
        Authorization: `Bearer ${token}`
    };
    const getUserPurchaseElearn = () => {
        ApiCall
            .PostApi(method, url, data, headers)
            .then((response) => {
                console.log(response);
                if (response.data.length > 0) {
                    const subNames = response.data.map(item => item.subjectName);
                    setSubjectNames(subNames);
                }
            })
            .catch((error) => {
                alert(error);
            });
        userService
            .GetAllMyCourses(token)
            .then((response) => {
                console.log(response, "all my courese")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <div>
                <MainHeader1 />
            </div>
            <MainHeader />
            <div className="subject-cards">
                {subjectNames.map((subName, index) => (
                    <div key={index} className="subject-card">
                        {subName}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateUser;
