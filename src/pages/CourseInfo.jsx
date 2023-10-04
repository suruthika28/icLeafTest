import React, { useState, useEffect } from "react";
import ApiCall from "../services/ApiCall";
import MainHeader1 from "../components/MainHeader1";
import MainHeader from "../components/MainHeader";
import "../styles/styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock } from "@mui/icons-material";
import { RiLock2Fill, RiLock2Line } from "react-icons/ri";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import ArticleIcon from '@mui/icons-material/Article';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function CourseInfo(props) {
    const location = useLocation()
    const { corpCourseId } = location.state;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [courseListView, setCourseListView] = useState([]);
    const [bannerImg, setBannerImg] = useState('');
    const [courseName, setCourseName] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [courseInfo, setCourseInfo] = useState('');
    const [btn, setBtn] = useState('');

    const [content, setContent] = useState('');
    const [pptCount, setPptCount] = useState('');
    const [pdfCount, setPdfCount] = useState('');
    const [videoCount, setVideoCount] = useState('');
    const [audioCount, setAudioCount] = useState('')
    const [fcardCount, setFcardCount] = useState('')
    const [examCount, setExamCount] = useState('')
    const [assignmentCount, setAssignmentCount] = useState('');
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
                setCourseInfo(response.data.courseDesc);
                setContent(response.data.noOfDays);
                if (response.data.pptCount > 0) {
                    setPptCount(response.data.pptCount > 5 ? (response.data.pptCount - (response.data.pptCount % 5)) : response.data.pptCount)
                }
                if (response.data.pdfCount > 0) {
                    setPdfCount(response.data.pdfCount > 5 ? (response.data.pdfCount - (response.data.pdfCount % 5)) : response.data.pdfCount)
                }
                if (response.data.videoCount > 0) {
                    setVideoCount(response.data.videoCount > 5 ? (response.data.videoCount - (response.data.videoCount % 5)) : response.data.videoCount)
                }
                if (response.data.fcardCount > 0) {
                    setFcardCount(response.data.fcardCount > 5 ? (response.data.fcardCount - (response.data.fcardCount % 5)) : response.data.fcardCount)
                }
                if (response.data.examCount > 0) {
                    setExamCount(response.data.examCount > 5 ? (response.data.examCount - (response.data.examCount % 5)) : response.data.examCount)
                }
                if (response.data.assignmentCountInCourse > 0) {
                    setAssignmentCount(response.data.assignmentCountInCourse > 5 ? (response.data.assignmentCountInCourse - (response.data.assignmentCountInCourse % 5)) : response.data.assignmentCountInCourse)
                }
                if (response.data.coursePrice > 0) {
                    setCoursePrice(`₹${response.data.coursePrice}`);
                } else {
                    setCoursePrice("Free");
                }

                if (response.data.assignedFlg == true) {
                    if (response.data.expired == true) {
                        if (response.data.coursePrice > 0) {
                            setBtn("Expired");
                        } else {
                            setBtn("Expired");
                        }
                    } else {
                        if (response.data.coursePrice > 0) {
                            setBtn("Enroll Now");
                        } else {
                            setBtn("Enroll Now");
                        }
                    }
                } else {
                    if (response.data.course > 0) {
                        setBtn("Enroll Now");
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
                    <div style={{ padding: '20px', width: '750px' }}>
                        <div style={{ position: 'relative', backgroundColor: 'rgb(249, 248, 248)' }}>
                            <h2 style={{ color: 'coral' }}>Course Feature</h2>
                            <div className="flex-container">
                                <div style={{ margin: '40px 60px' }}>
                                    <div style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: 'gray',
                                        margin: '0 auto'
                                    }}>
                                        <RiLock2Fill></RiLock2Fill>
                                    </div>
                                    <div>
                                        <span>Strict Mode</span>
                                    </div>
                                </div>
                                <div style={{ margin: '40px 60px' }}>
                                    <div style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: 'gray',
                                        margin: '0 auto'
                                    }}>
                                        <SchoolIcon></SchoolIcon>
                                    </div>
                                    <div>
                                        <span>Experts Support</span>
                                    </div>
                                </div>
                                <div style={{ margin: '40px 60px' }}>
                                    <div style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: 'gray',
                                        margin: '0 auto'
                                    }}>
                                        <CodeOffIcon></CodeOffIcon>
                                    </div>
                                    <div>
                                        <span>Online Complier</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-container">
                                <div style={{ margin: '40px 43px' }}>
                                    <div style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: 'gray',
                                        margin: '0 auto'
                                    }}>
                                        <QuestionAnswerIcon></QuestionAnswerIcon>
                                    </div>
                                    <div>
                                        <span>Queries Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div style={{ backgroundColor: 'rgb(249, 248, 248)' }}>
                                {/* third div */}
                                <div style={{ padding: '20px', marginTop: '38px' }}>
                                    <h2 style={{ color: 'coral' }}>About this course</h2>
                                    <p style={{ textAlign: 'justify', fontSize: '14px', lineHeight: '16px' }}>{courseInfo}</p>
                                </div>
                            </div>
                        </div>
                    </div>





                    {/* Second div */}
                    <div
                        style={{
                            padding: "20px",
                            height: "600px",
                            backgroundColor: "rgb(249 248 248)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <h2 style={{ color: "coral" }}>Content Details</h2>
                        {content > 0 && (
                            <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "12px",
                                    }}
                                >
                                    <TextSnippetIcon
                                        style={{
                                            fontSize: "24px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <h6>Content</h6>
                                    <text style={{ fontSize: "15px" }}>{`${content}+ Days Content`}</text>
                                </div>
                            </div>
                        )}
                        {pptCount > 0 && (
                            <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "12px",
                                    }}
                                >
                                    <InsertDriveFileIcon
                                        style={{
                                            fontSize: "24px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <h6>PPT</h6>
                                    <text style={{ fontSize: "15px" }}>{`${pptCount}+ Documents`}</text>
                                </div>
                            </div>
                        )}
                        {pdfCount > 0 && (
                            <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "12px",
                                    }}
                                >
                                    <PictureAsPdfIcon
                                        style={{
                                            fontSize: "24px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <h6>PDF</h6>
                                    <text style={{ fontSize: "15px" }}>{`${pdfCount}+ Documents`}</text>
                                </div>
                            </div>
                        )}
                        {videoCount > 0 && (
                            <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "12px",
                                    }}
                                >
                                    <VideoFileIcon
                                        style={{
                                            fontSize: "24px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <h6>Video</h6>
                                    <text style={{ fontSize: "15px" }}>{`${videoCount}+ Videos`}</text>
                                </div>
                            </div>
                        )}
                        {fcardCount > 0 && (
                            <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "12px",
                                    }}
                                >
                                    <ArticleIcon
                                        style={{
                                            fontSize: "24px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <h6>Flash Cards</h6>
                                    <text style={{ fontSize: "15px" }}>{`${fcardCount}+ Cards`}</text>
                                </div>
                            </div>
                        )}
                        {examCount > 0 && (
                            <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "12px",
                                    }}
                                >
                                    <SaveAsIcon
                                        style={{
                                            fontSize: "24px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <h6>Assessments</h6>
                                    <text style={{ fontSize: "15px" }}>{`${examCount}+ Assessments`}</text>
                                </div>
                            </div>
                        )}
                        {assignmentCount > 0 && (
                            <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: "2px solid #ccc",
                                        backgroundColor: '#ccc',
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "12px",
                                    }}
                                >
                                    <CodeIcon
                                        style={{
                                            fontSize: "24px",
                                        }}
                                    />
                                </div>
                                <div>
                                    <h6>Assignments</h6>
                                    <text style={{ fontSize: "15px" }}>{`${assignmentCount}+ Assignments`}</text>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseInfo;
