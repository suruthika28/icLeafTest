import React, { useState, useEffect } from "react";
import ApiCall from "../services/ApiCall";
import MainHeader1 from "../components/MainHeader1";
import MainHeader from "../components/MainHeader";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import { LockClock, LockClockTwoTone, LockOpenOutlined } from "@mui/icons-material";
import { RiLock2Line } from "react-icons/ri";

function BuyCourses() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [courseList, setCourseList] = useState([]);
    const [coursePrice, setCoursePrice] = useState('');
    useEffect(() => {
        getUserCourseList();
    }, []);

    const method = "post";
    const url = "getCourseList";
    const data = {};

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const getUserCourseList = () => {
        ApiCall.PostApi(method, url, data, headers)
            .then((response) => {
                console.log(response);
                setCourseList(response.data);
                var crsPrice = "Free"
                if (response.data.coursePrice > 0) {
                    setCoursePrice(response.data.coursePrice)
                }
                else {
                    setCoursePrice(crsPrice)
                }
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleView = (id) => {
        console.log(id)
        navigate('/courseInfo', { state: { "corpCourseId": id } });
    }

    return (
        <div>
            <div>
                <MainHeader1 />
            </div>
            <MainHeader />
            <div className="course-list">
                {courseList.map((course) => (
                    <div className="course-card" key={course.courseId}>
                        <div className="course-card-inner">
                            <div className="course-image">
                                <div className="course-badge">
                                    {course.noOfDays + " days course"}
                                </div>
                                {course.strictModeFlag && (
                                    <div className="course-lock">
                                        <RiLock2Line />
                                    </div>
                                )}
                                <img src={`http://localhost:8080/icleaf${course.bannerImgPath}`} alt={course.courseName} />
                            </div>
                            <div className="course-details">
                                <h4 style={{ color: '#f95502', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {course.courseName}
                                </h4>
                                <p>{course.courseDesc}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'green' }}>{coursePrice}</span>
                                    {course.coursePrice > 0 ? (
                                        <span style={{ color: 'green' }}>{course.coursePrice}</span>
                                    ) : (
                                        <button style={{ borderRadius: 5, border: 'none', background: '#F95502', color: 'white' }} onClick={() => handleView(course.id)}>View</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BuyCourses;
