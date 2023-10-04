import React, { useEffect, useState } from 'react';
import MainHeader from '../components/MainHeader';
import MainHeader1 from '../components/MainHeader1';
import userService from '../services/userService';
import '../styles/styles.css'
import ApiCall from '../services/ApiCall';
import { useNavigate } from 'react-router-dom';
import { RiLock2Line } from "react-icons/ri";
function CreateUser() {
    const token = localStorage.getItem("token");
    const [subjectNames, setSubjectNames] = useState([]);
    const [courseList, setCourseList] = useState([]);
    const [coursePrice, setCoursePrice] = useState('');
    const [button, setButton] = useState('');
    const [expiryDateTime, setExpiryDateTime] = useState('')
    const [remainingDays, setRemainingDays] = useState('')
    const navigate = useNavigate();
    let timeout;

    function startSessionTimeout() {
        const TIMEOUT_DURATION = 30 * 60 * 1000;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            // console.log("Session timeout triggered");
            navigate('/login')

        }, TIMEOUT_DURATION);
    }

    useEffect(() => {
        // startSessionTimeout();
        getUserPurchaseElearn();
        GetAllMyCourses();
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
    }

    const GetAllMyCourses = () => {
        const url1 = 'getAllMyCourses';
        const data1 = {};
        ApiCall.GetApi('get', url1, data1, headers)
            .then((response) => {
                console.log(response);
                if (response.data.length > 0) {
                    setCourseList(response.data);
                    var crsPrice = "Free";
                    var buttonNmVar = '';

                    // Assume expiryDate is a property of each course item
                    response.data.forEach((courseItem) => {
                        if (parseInt(courseItem.userCourseTrackDto.compPages) > 0) {
                            buttonNmVar = 'Resume Learning';
                        } else {
                            buttonNmVar = 'Start Learning';
                        }

                        setCoursePrice(crsPrice);
                        setButton(buttonNmVar);

                        const expiryDateTimestamp = courseItem.expiryDate;
                        const expiryDate = new Date(expiryDateTimestamp);
                        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
                        const expiresOnString = expiryDate.toLocaleDateString(options);
                        setExpiryDateTime(expiresOnString)
                        setRemainingDays(courseItem.remainingDays)
                    });
                }
            })
            .catch((error) => {
                return error;
            });
    };


    return (
        <div>
            <div>
                <MainHeader1 />
            </div>
            <MainHeader />
            <div className="course-list">
                {courseList.length > 0 ? (
                    courseList.map((resp, index) => (
                        <div className='course-card'>
                            <div key={index} className="course-card-inner">
                                <div className='course-image'>
                                    <div className='course-badge'>
                                        {resp.noOfDays + " days course"}
                                    </div>
                                    {resp.strictModeFlag && (
                                        <div className="course-lock">
                                            <RiLock2Line />
                                        </div>
                                    )}
                                    <img src={`http://localhost:8080/icleaf${resp.bannerImgPath}`} alt={resp.courseName} />
                                </div>
                                <div className="course-details">
                                    <h6 style={{ color: '#f95502', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {resp.courseName}
                                    </h6>
                                    <h6 style={{ color: 'coral' }}>{resp.userCourseTrackDto.compPerc + "% Completed"}</h6>
                                    <p>{resp.courseDesc}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'green' }}>{coursePrice}</span>
                                        {resp.coursePrice > 0 ? (
                                            <span style={{ color: 'green' }}>{resp.coursePrice}</span>
                                        ) : (
                                            <button type='button' style={{ borderRadius: 5, border: 'none', background: '#F95502', color: 'white' }}>{button}</button>
                                        )}
                                    </div>
                                </div>
                                <div className='expiryCls'>
                                    <span>Expires on {expiryDateTime}</span>
                                    <div className='expDayCls'>
                                        <span style={{ color: "green" }}>{remainingDays} Days Remaining</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No Courses available in your account.</div>
                )}
            </div>
        </div>
    );
}

export default CreateUser;
