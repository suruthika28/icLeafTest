import React, { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import MainHeader1 from "../components/MainHeader1";
import userService from "../services/userService";
import "../styles/styles.css";
import { Typography, Card, CardContent, Divider } from "@mui/material";
import {
    Document,
    Page
} from "react-pdf"; // Import react-pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; // Import styles for react-pdf
import ApiCall from "../services/ApiCall";
import { useNavigate } from "react-router-dom";

function Elearning() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [subject, setSubject] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    const [topicName, setTopicName] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState("");
    const [elearnContentType, setElearnContentType] = useState("pdf");
    const [pdfFiles, setPdfFiles] = useState([]); // Store PDF file data
    const [videoFiles,setVideoFiles] = useState([])
    const [pdfIndex, setPdfIndex] = useState(0); // Index of the currently displayed PDF
    const [instructionsVisible, setInstructionsVisible] = useState(true);
    const [elearningContentVisible, setElearningContentVisible] = useState(false);
    const [isPdfContentAvailable, setIsPdfContentAvailable] = useState(false);
    const [isPptContentAvailable, setIsPptContentAvailable] = useState(false);
    const [isVideoContentAvailable, setIsVideoContentAvailable] = useState(false);
    const [isAudioContentAvailable, setIsAudioContentAvailable] = useState(false);
    const [isMindMapContentAvailable, setIsMindMapContentAvailable] = useState(false);
    const [isFCardDContentAvailable, setIsFCardContentAvailable] = useState(false);

    const [activeContentType, setActiveContentType] = useState("pdf"); // Default to "pdf"
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(""); // State to store selected video URL

    useEffect(() => {
        getUserPurchaseElearn();
    }, []);

    const method = "post";
    const url = "getUserPurchaseElearn";
    const data = {};
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const getUserPurchaseElearn = () => {
        ApiCall.PostApi(method, url, data, headers)
            .then((response) => {
                setSubject(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubjectSelect = (event) => {
        const selectedSubjectId = event.target.value;
        setSelectedSubjectId(selectedSubjectId);
        setSelectedTopicId(""); // Clear the selected topic when a new subject is selected

        const url1 = `gettopiclistforelearn?subjectId=${selectedSubjectId}`;
        ApiCall.PostApi(method, url1, data, headers)
            .then((response) => {
                setTopicName(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    var formdata = new FormData();
    formdata.append("subjectId", selectedSubjectId);
    formdata.append("topicId", selectedTopicId);
    formdata.append("elearnContentType", elearnContentType);
    const url2 = "getAllELearnContent";
    
    const getAllELearnContent = () => {
        ApiCall.PostApi(method, url2, formdata, headers)
            .then((response) => {
                console.log(response);
                setPdfFiles(response.data.elearnPdfContentDetailsDtos || []);
                setIsPdfContentAvailable(
                    response.data.elearnPdfContentDetailsDtos !== null &&
                    response.data.elearnPdfContentDetailsDtos.length > 0
                );
                setPdfIndex(0); // Set the initially displayed PDF to the first one
                setIsPptContentAvailable(
                    response.data.elearnPptContentDetailsDtos !== null &&
                    response.data.elearnPptContentDetailsDtos.length > 0
                );
                setIsAudioContentAvailable(
                    response.data.elearnAudioContentDetailsDtos !== null &&
                    response.data.elearnAudioContentDetailsDtos.length > 0
                );
                setVideoFiles(response.data.elearnVideoContentDetailsDtos)
                setIsVideoContentAvailable(
                    response.data.elearnVideoContentDetailsDtos !== null &&
                    response.data.elearnVideoContentDetailsDtos.length > 0
                );
                setIsMindMapContentAvailable(
                    response.data.elearnMindMapContentDetailsDtos !== null &&
                    response.data.elearnMindMapContentDetailsDtos.length > 0
                );
                setIsFCardContentAvailable(
                    response.data.elearnFCardDtos !== null &&
                    response.data.elearnFCardDtos.length > 0
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const hideInstructions = () => {
        setElearnContentType("pdf");
        setInstructionsVisible(false);
        setElearningContentVisible(true);
        getAllELearnContent();
    };

    const handlePdfItemClick = (index) => {
        setPdfIndex(index);
    };

    return (
        <div>
            <MainHeader1 />
            <MainHeader />
            <div className="card-container">
                <div className="card">
                    <div className="container-dropdown">
                        <div className="dropdown-column">
                            <label style={{ fontWeight: "bold" }}>Subject :</label>
                            <select className="dropdown" onChange={handleSubjectSelect}>
                                <option value="">Select a Subject</option>
                                {subject.map((subject) => (
                                    <option key={subject.subjectId} value={subject.subjectId}>
                                        {subject.subjectName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="dropdown-column">
                            <label style={{ fontWeight: "bold" }}>Topic :</label>
                            <select
                                className="dropdown"
                                value={selectedTopicId}
                                onChange={(e) => setSelectedTopicId(e.target.value)}
                            >
                                <option value="">Select a Topic</option>
                                {topicName.map((topic) => (
                                    <option key={topic.topicId} value={topic.topicId}>
                                        {topic.topicName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="button-column">
                            <button
                                style={{
                                    borderRadius: "5px",
                                    border: "none",
                                    padding: "10px",
                                    background: "#F95502",
                                    color: "white",
                                    cursor: "pointer",
                                    marginTop: "20px"
                                }}
                                onClick={hideInstructions}
                            >
                                Launch Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {instructionsVisible && (
                <div className="card-container">
                    <div className="card">
                        <h2>Instructions</h2>
                        <ol style={{ marginTop: '10px', paddingLeft: '20px' }}>
                            <li style={{ marginBottom: '10px', lineHeight: '1.8', color: 'GrayText' }}>
                                Except as permitted by the copyright law applicable to you,
                                you may not reproduce or communicate any of the content on this website,
                                including files downloadable from this website,
                                without the permission of the copyright owner.
                            </li>
                            <li style={{ marginBottom: '10px', lineHeight: '1.8', color: 'GrayText' }}>
                                You must not copy, reproduce, republish, upload, post,
                                transmit or distribute such material in any way,
                                including by email or other electronic means and
                                You must not assist any other person to do so.
                            </li>
                            <li style={{ marginBottom: '10px', lineHeight: '1.8', color: 'GrayText' }}>
                                Without the prior written consent of the owner,
                                modification of the materials, use of the materials on any other
                                website or networked computer environment or use of the
                                materials for any purpose other than personal, non-commercial
                                use is a violation of the copyrights, trademarks and other
                                proprietary rights, and is prohibited. Any use for which You
                                receive any remuneration, whether in money or otherwise, is a
                                commercial use for the purposes of this clause.
                            </li>
                        </ol>
                    </div>
                </div>
            )}
            {elearningContentVisible && (
                <div className="elearning-container">
                    <div className="elearning-content">
                        <label style={{ color: "coral", size: "16px" }}>E</label>
                        <label> - Learning Content</label>
                        <div className="content-tabs">
                            <div
                                className={`content-tab ${activeContentType === "pdf" ? "active" : ""
                                    }`}
                                onClick={() => setActiveContentType("pdf")}
                            >
                                PDF Content
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "ppt" ? "active" : ""
                                    }`}
                                onClick={() => setActiveContentType("ppt")}
                            >
                                <Typography variant="inherit">Instructor Tool</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "video" ? "active" : ""
                                    }`}
                                onClick={() => setActiveContentType("video")}
                            >
                                <Typography variant="inherit">Trainers in Action</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "audio" ? "active" : ""
                                    }`}
                                onClick={() => setActiveContentType("audio")}
                            >
                                <Typography variant="inherit">Listen To Trainers</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "mindmap" ? "active" : ""
                                    }`}
                                onClick={() => setActiveContentType("mindmap")}
                            >
                                <Typography variant="inherit">Check Your Readiness</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "fcard" ? "active" : ""
                                    }`}
                                onClick={() => setActiveContentType("fcard")}
                            >
                                <Typography variant="inherit">Know The Key Terms</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "questions" ? "active" : ""
                                    }`}
                                onClick={() => setActiveContentType("questions")}
                            >
                                <Typography variant="inherit" onClick={()=>navigate('/activeexams')}>Assess Yourself</Typography>
                            </div>
                            {/* Add tabs for other content types here */}
                        </div>
                    </div>
                    <div className="pre-courses-details">
                        <Typography variant="h6">Pre-Courses Details</Typography>
                        {/* Add the content for pre-courses details based on the selected tab */}
                        {activeContentType === "pdf" && (
                            <div className="pdf-details">
                                <div className="pdf-files">
                                    {pdfFiles.map((pdf, index) => (
                                        <Card
                                            key={index}
                                            className="pdf-card"
                                            onClick={() => handlePdfItemClick(index)}
                                        >
                                            <CardContent>
                                                <Typography variant="inherit">{pdf.fileName}</Typography>
                                            </CardContent>
                                            <Divider />
                                            {pdf.thumbnailImgStr && (
                                                <img
                                                    src={pdf.thumbnailImgStr}
                                                    alt="PDF Preview"
                                                    style={{ width: "200px", height: "150px" }}
                                                />
                                            )}
                                        </Card>
                                    ))}
                                </div>
                                {/* Display additional details for PDF content */}
                            </div>
                        )}
                        {activeContentType === "video" && (
                            <div className="video-details">
                                <div className="video-files">
                                    {/* Map through your video data and display video thumbnails */}
                                    {isVideoContentAvailable &&
                                        videoFiles.map((video, index) => (
                                            <Card
                                                key={index}
                                                className="video-card"
                                                onClick={() => {
                                                    // Set the selected video URL when a video is clicked
                                                    setSelectedVideoUrl(video.videoUrl);
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography variant="inherit">{video.fileName}</Typography>
                                                </CardContent>
                                                <Divider />
                                                {/* Display video thumbnails here */}
                                                {video.fileUrl && (
                                                    <img
                                                        src={video.fileUrl}
                                                        alt="Video Preview"
                                                        style={{ width: "200px", height: "150px" }}
                                                    />
                                                )}
                                            </Card>
                                        ))}
                                </div>
                                {/* Display the video player when a video URL is available */}
                                {selectedVideoUrl && (
                                    <div className="video-player">
                                        <video controls>
                                            <source src={selectedVideoUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* PDF Viewer */}
            {pdfFiles.length > 0 && (
                <div className="pdf-viewer">
                    <Document file={pdfFiles[pdfIndex].fileUrl}>
                        <Page pageNumber={1} />
                    </Document>
                </div>
            )}
        </div>
    );
}

export default Elearning;
