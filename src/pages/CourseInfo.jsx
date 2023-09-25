import React, { useState, useEffect } from "react";
import ApiCall from "../services/ApiCall";
import MainHeader1 from "../components/MainHeader1";
import MainHeader from "../components/MainHeader";
import "../styles/styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock } from "@mui/icons-material";

function CourseInfo(props) {
    const location = useLocation()
    const { corpCourseId } = location.state;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [courseListView, setCourseListView] = useState([]);
    const [bannerImg, setBannerImg] = useState('');
    const [courseName, setCourseName] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [btn, setBtn] = useState(''); // Define btn as a state variable

    useEffect(() => {
        getUserCourseListView();
    }, []);

    const method = "get";
    const url = `getCourseDetail?corpCourseId=${corpCourseId}`;
    const data = {};

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const getUserCourseListView = () => {
        ApiCall.GetApi(method, url, data, headers)
            .then((response) => {
                console.log(response);
                setBannerImg(response.data.bannerImgPath);
                setCourseName(response.data.courseName);

                if (response.data.coursePrice > 0) {
                    setCoursePrice(`₹${response.data.coursePrice}`);
                } else {
                    setCoursePrice("Free");
                }

                if (response.data.assignedFlg == true) {
                    if (response.data.expired == true) {
                        if (response.data.coursePrice > 0) {
                            setBtn("Expired"); // Update btn state with "Expired"
                        } else {
                            setBtn("Expired");
                        }
                    } else {
                        if (response.data.coursePrice > 0) {
                            setBtn("Enroll Now"); // Update btn state with "Enroll Now"
                        } else {
                            setBtn("Enroll Now");
                        }
                    }
                } else {
                    if (response.data.course > 0) {
                        setBtn("Enroll Now"); // Update btn state with "Enroll Now"
                    } else {
                        setBtn("Enroll Now");
                    }
                }
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div>
            <MainHeader1 />
            <MainHeader />

            <div className="courseinfo-card-container">
                <div className="courseinfo-card">
                    <img src={`http://localhost:8080/icleaf${bannerImg}`} alt={courseName} />
                    <div style={{ padding: '20px' }}>
                        <h2 style={{ color: 'coral' }}>{courseName}</h2>
                        <text style={{ fontSize: '15px' }}>contains assessments, e-resources & a course</text>
                        <p style={{ color: 'green', fontSize: '18px' }}>{coursePrice}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'gray' }}>* enroll now and start access this course</span>
                            <button style={{ borderRadius: 5, border: 'none', padding: '10px', background: '#F95502', color: 'white', height: '40px' }}>
                                {btn}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="courseinfo-card-container">
                <div style={{ display: 'flex' }}>
                    {/* First div */}
                    <div style={{ padding: '20px' }}>
                        <div style={{ backgroundColor: '#DCDCDC' }}>
                            <h2 style={{ color: 'coral' }}>Course Feature</h2>
                            <div >
                                <Lock style={{ backgroundColor: 'gray', borderRadius: 50,width:'7%' ,textAlign:'center'}} size='12px'></Lock>
                                <text>Strict Mode</text>
                            </div>
                        </div>
                        <div>
                            <div>
                                {/*third div*/}
                                <div style={{ padding: '20px' }}>
                                    <h2 style={{ color: 'coral' }}>{courseName}</h2>
                                    <text style={{ fontSize: '15px' }}>contains assessments, e-resources & a course</text>
                                    <p style={{ color: 'green', fontSize: '18px' }}>{coursePrice}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'gray' }}>* enroll now and start access this course</span>
                                        <button style={{ borderRadius: 5, border: 'none', padding: '10px', background: '#F95502', color: 'white', height: '40px' }}>
                                            {btn}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second div */}
                    <div style={{ padding: '20px', height: '600px', backgroundColor: '#DCDCDC' }}>
                        <h2 style={{ color: 'coral' }}>{courseName}</h2>
                        <text style={{ fontSize: '15px' }}>contains assessments, e-resources & a course</text>
                        <p style={{ color: 'green', fontSize: '18px' }}>{coursePrice}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'gray' }}>* enroll now and start access this course</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseInfo;
