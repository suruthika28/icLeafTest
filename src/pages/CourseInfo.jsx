import React, { useState, useEffect } from "react";
import ApiCall from "../services/ApiCall";
import MainHeader1 from "../components/MainHeader1";
import MainHeader from "../components/MainHeader";
import "../styles/styles.css";
import { useLocation, useNavigate } from "react-router-dom";

function CourseInfo(props) {
    const location = useLocation()
    const { corpCourseId } = location.state;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [courseListView, setCourseListView] = useState([]);
    const [bannerImg, setBannerImg] = useState('');
    const [courseName, setCourseName] = useState('');
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

            })
            .catch((error) => {
                alert(error);
            });
    };


    return (
        <div>
            <div>
                <MainHeader1 />
            </div>
            <MainHeader />
            <div>
                <div>
                    <div className="course-image">
                        <img src={`http://localhost:8080/icleaf${bannerImg}`} alt={courseName} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseInfo;
