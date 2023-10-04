import React, { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import MainHeader1 from "../components/MainHeader1";
import userService from "../services/userService";
import PdfModal from "./PdfViewer";
import "../styles/styles.css";
import { Typography, Card, CardContent, Divider } from "@mui/material";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import ApiCall from "../services/ApiCall";
import { useNavigate } from "react-router-dom";
import PptModal from "./PptViewer";
import QuizModal from "./QuizModal";
import { Modal, ModalBody, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Elearning() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [subject, setSubject] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    const [topicName, setTopicName] = useState([]);
    const [selectedTopicId, setSelectedTopicId] = useState("");
    const [elearnContentType, setElearnContentType] = useState("pdf");
    const [pdfFiles, setPdfFiles] = useState([]);
    const [pptFiles, setPptFiles] = useState([]);
    const [videoFiles, setVideoFiles] = useState([]);
    const [audioFiles, setAudioFiles] = useState([]);
    const [quizFiles, setQuizFiles] = useState([]);
    const [contentType, setContentType] = useState('');
    const [pdfIndex, setPdfIndex] = useState(0); // Index of the currently displayed PDF
    const [pptIndex, setPptIndex] = useState(0);
    const [instructionsVisible, setInstructionsVisible] = useState(true);
    const [elearningContentVisible, setElearningContentVisible] = useState(false);
    const [isPdfContentAvailable, setIsPdfContentAvailable] = useState(false);
    const [isPptContentAvailable, setIsPptContentAvailable] = useState(false);
    const [isVideoContentAvailable, setIsVideoContentAvailable] = useState(false);
    const [isAudioContentAvailable, setIsAudioContentAvailable] = useState(false);
    const [isMindMapContentAvailable, setIsMindMapContentAvailable] = useState(false);
    const [isFCardContentAvailable, setIsFCardContentAvailable] = useState(false);

    const [activeContentType, setActiveContentType] = useState("pdf"); // Default to "pdf"
    const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

    const [activeKeywordId, setActiveKeywordId] = useState(null);
    const [elearnFCardDtos, setElearnFCardDtos] = useState([]);
    const [isFCardOpen, setIsFCardOpen] = useState(false);

    const [videoVisible, setVideoVisible] = useState(false);
    const [selectedAudioUrl, setSelectedAudioUrl] = useState("");
    const [audioPlayerVisible, setAudioPlayerVisible] = useState(false);

    const handleVideoCardClick = (fileUrl) => {
        setSelectedVideoUrl(fileUrl);
        setVideoVisible(true);
    };
    const handleAudioCardClick = (audioUrl) => {
        setSelectedAudioUrl(audioUrl);
        setAudioPlayerVisible(true);
    };

    const handleBackButtonClick = () => {
        setVideoVisible(false);
    };

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
        setSelectedTopicId("");

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

    const formdata = new FormData();
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
                setPdfIndex(0);
                setPptFiles(response.data.elearnPptContentDetailsDtos || []);
                setIsPptContentAvailable(
                    response.data.elearnPptContentDetailsDtos !== null &&
                    response.data.elearnPptContentDetailsDtos.length > 0
                );
                setAudioFiles(response.data.elearnAudioContentDetailsDtos || []);
                setIsAudioContentAvailable(
                    response.data.elearnAudioContentDetailsDtos !== null &&
                    response.data.elearnAudioContentDetailsDtos.length > 0
                );
                setVideoFiles(response.data.elearnVideoContentDetailsDtos || []);
                setIsVideoContentAvailable(
                    response.data.elearnVideoContentDetailsDtos !== null &&
                    response.data.elearnVideoContentDetailsDtos.length > 0
                );
                setQuizFiles(response.data.elearnQuizContentDetailsDtos || [])
                setContentType(response.data.elearnQuizContentDetailsDtos.contentType)
                setIsMindMapContentAvailable(
                    response.data.elearnMindMapContentDetailsDtos !== null &&
                    response.data.elearnMindMapContentDetailsDtos.length > 0
                );
                setElearnFCardDtos(response.data.elearnFCardDtos || []);
                setIsFCardContentAvailable(
                    response.data.elearnFCardDtos !== null &&
                    response.data.elearnFCardDtos.length > 0
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        const url2 = 'getElearnQuiz'
        const method = 'post'
        const formdata = new FormData();
        formdata.append("subjectId", selectedSubjectId);
        formdata.append("topicId", selectedTopicId);
        formdata.append("fileName");
        formdata.append("contentType")

    }

    const hideInstructions = () => {
        setElearnContentType("pdf");
        setInstructionsVisible(false);
        setElearningContentVisible(true);
        getAllELearnContent();
    };

    const handlePdfItemClick = (index) => {
        setPdfIndex(index);
    };
    const handlePptItemClick = (index) => {
        setPptIndex(index);
    };
    const openFCard = (fcard) => {
        setActiveKeywordId(fcard.id);
        setIsFCardOpen(true);
    };
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const openPdfModal = (pdfFile, pageIndex) => {
        setSelectedPdfFile(pdfFile);
        setCurrentPageIndex(pageIndex);
        setPdfModalOpen(true);
    };

    const openPptModal = (pptFile, pageIndex) => {
        setSelectedPptFile(pptFile);
        setCurrentPageIndex(pageIndex);
        setPptModalOpen(true);
    };
    const [activeTitleIndex, setActiveTitleIndex] = useState(0);

    const handleSliderArrowClick = (direction) => {
        if (direction === "next") {
            setActiveTitleIndex((prevIndex) =>
                prevIndex < elearnFCardDtos.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (direction === "prev") {
            setActiveTitleIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        }
    };

    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [selectedPdfFile, setSelectedPdfFile] = useState(null);

    const [pptModalOpen, setPptModalOpen] = useState(false);
    const [selectedPptFile, setSelectedPptFile] = useState(null);

    const closePdfModal = () => {
        setSelectedPdfFile(null);
        setPdfModalOpen(false);
    };
    const closePptModal = () => {
        setSelectedPptFile(null);
        setPptModalOpen(false);
    };
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [quizModalOpen, setQuizModalOpen] = useState(false);



    const closeQuizModal = () => {
        setQuizModalOpen(false);
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
                        <ol style={{ marginTop: "10px", paddingLeft: "20px" }}>
                            <li style={{ marginBottom: "10px", lineHeight: "1.8", color: "GrayText" }}>
                                Except as permitted by the copyright law applicable to you,
                                you may not reproduce or communicate any of the content on this website,
                                including files downloadable from this website,
                                without the permission of the copyright owner.
                            </li>
                            <li style={{ marginBottom: "10px", lineHeight: "1.8", color: "GrayText" }}>
                                You must not copy, reproduce, republish, upload, post,
                                transmit or distribute such material in any way,
                                including by email or other electronic means and
                                You must not assist any other person to do so.
                            </li>
                            <li style={{ marginBottom: "10px", lineHeight: "1.8", color: "GrayText" }}>
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
                                className={`content-tab ${activeContentType === "pdf" ? "active" : ""}`}
                                onClick={() => setActiveContentType("pdf")}
                            >
                                PDF Courses Readiness
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "ppt" ? "active" : ""}`}
                                onClick={() => setActiveContentType("ppt")}
                            >
                                <Typography variant="inherit">Instructor Tool</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "video" ? "active" : ""}`}
                                onClick={() => setActiveContentType("video")}
                            >
                                <Typography variant="inherit">Trainers in Action</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "audio" ? "active" : ""}`}
                                onClick={() => setActiveContentType("audio")}
                            >
                                <Typography variant="inherit">Listen To Trainers</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "quiz" ? "active" : ""}`}
                                onClick={() => setActiveContentType("quiz")}
                            >
                                <Typography variant="inherit">Check Your Readiness</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "fcard" ? "active" : ""}`}
                                onClick={() => setActiveContentType("fcard")}
                            >
                                <Typography variant="inherit">Know The Key Terms</Typography>
                            </div>
                            <div
                                className={`content-tab ${activeContentType === "questions" ? "active" : ""}`}
                                onClick={() => setActiveContentType("questions")}
                            >
                                <Typography variant="inherit" onClick={() => navigate('/activeexams')}>Assess Yourself</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="pre-courses-details">
                        {activeContentType === "pdf" && (

                            <div className="pdf-details">
                                <Typography variant="h6">Pre-Courses Readiness</Typography>
                                <div className="pdf-files">
                                    {pdfFiles.map((pdf, index) => (
                                        <Card
                                            key={index}
                                            className="pdf-card"
                                            onClick={() => openPdfModal(pdf, 0)}
                                        >
                                            {pdf.thumbnailImgStr && (
                                                <div>
                                                    <img
                                                        src={pdf.thumbnailImgStr}
                                                        alt="PDF Preview"
                                                        style={{ width: "200px", height: "150px" }}
                                                    />
                                                    <Divider />
                                                    <p>{pdf.fileName.split(".")[0]}</p>
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {pdfModalOpen && selectedPdfFile && (
                            <PdfModal
                                open={pdfModalOpen}
                                handleClose={closePdfModal}
                                pdfFile={selectedPdfFile}
                                currentPageIndex={currentPageIndex}
                                setCurrentPageIndex={setCurrentPageIndex}
                            />
                        )}
                        {activeContentType === "ppt" && (
                            <div className="pdf-details">
                                <Typography variant="h6">Instructor Tool</Typography>
                                <div className="pdf-files">
                                    {pptFiles.map((ppt, index) => (
                                        <Card
                                            key={index}
                                            className="pdf-card"
                                            onClick={() => openPdfModal(ppt, 0)}
                                        >
                                            {ppt.thumbnailImgStr && (
                                                <div>
                                                    <img
                                                        src={ppt.thumbnailImgStr}
                                                        alt="PDF Preview"
                                                        style={{ width: "200px", height: "150px" }}
                                                    />
                                                    <Divider />
                                                    <p>{ppt.fileName.split(".")[0]}</p>
                                                </div>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                        {pptModalOpen && selectedPptFile && (
                            <PptModal
                                open={pptModalOpen}
                                handleClose={closePdfModal}
                                pdfFile={selectedPdfFile}
                                currentPageIndex={currentPageIndex}
                                setCurrentPageIndex={setCurrentPageIndex}
                            />
                        )}


                        {activeContentType === "video" && (
                            <div className="video-details">
                                <Typography variant="h6">Trainer in Action</Typography>
                                {videoVisible ? (
                                    <div className="video-container">
                                        <button
                                            onClick={handleBackButtonClick}
                                            style={{
                                                borderRadius: "5px",
                                                border: "none",
                                                padding: "10px",
                                                background: "#F95502",
                                                color: "white",
                                                cursor: "pointer",
                                                marginTop: '10px',
                                                marginBottom: "20px",
                                            }}
                                        >
                                            Back
                                        </button>
                                        <div className="video-player">
                                            <video controls width="640" height="360">
                                                <source src={selectedVideoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="video-files">

                                        {isVideoContentAvailable &&
                                            videoFiles.map((video, index) => (
                                                <Card
                                                    style={{ backgroundColor: '#004E67' }}
                                                    key={index}
                                                    className="video-card"
                                                    onClick={() => handleVideoCardClick(video.fileUrl)}
                                                >
                                                    <div className="video-card-content">
                                                        <p style={{ color: 'white' }}>{video.fileName.split(".")[0]}</p>
                                                        <div className="pause-icon">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                width="55px"
                                                                height="30px"
                                                            >
                                                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="white" />
                                                                <path d="M8 5v14l11-7z" fill="#004E67" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeContentType === "audio" && (
                            <div className="audio-details">
                                <Typography variant="h6">Listen to Trainers</Typography>
                                {audioFiles.map((audio, index) => (
                                    <Card
                                        style={{ backgroundColor: '#004E67' }}
                                        key={index}
                                        className="audio-card"
                                        onClick={() => handleAudioCardClick(audio.fileUrl)}
                                    >
                                        <div className="video-card-content">
                                            <p style={{ color: 'white' }}>{audio.fileName.split(".")[0]}</p>
                                            <div className="pause-icon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    width="55px"
                                                    height="30px"
                                                >
                                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="white" />
                                                    <path d="M8 5v14l11-7z" fill="#004E67" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                                {audioPlayerVisible && (
                                    <div className="audio-player">
                                        <audio controls>
                                            <source src={selectedAudioUrl} type="audio/mpeg" />
                                            Your browser does not support the audio tag.
                                        </audio>
                                    </div>
                                )}
                            </div>
                        )}


                        {activeContentType === "quiz" && (
                            <div className="quiz-details">
                                <Typography variant="h6">Check Your Readiness</Typography>
                                {quizFiles.map((quiz, index) => (
                                    <Card
                                        style={{ backgroundColor: 'white' }}
                                        key={index}
                                        className="quiz-card"
                                        onClick={handleShow}
                                    >
                                        <div className="quiz-card-content">
                                            <div style={{ display: 'flex', alignItems: 'center', background: '#004E67', borderRadius: '50%', width: '90px', height: '90px', marginTop: '10%' }}>
                                                <div style={{ color: 'white', fontSize: '70px', fontWeight: 'bold', margin: '0 auto' }}>?</div>
                                            </div>
                                            <Divider className="quiz-card-divider" />
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Typography
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={handleShow}
                                                >
                                                    Check
                                                </Typography>
                                            </div>
                                        </div>
                                    </Card>
                                ))}

                            </div>
                        )}

                        {/* <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sample Modal</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                This is a simple Bootstrap modal in a React app.
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal> */}
                        <Modal show={show} size="lg" centered animation onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                    <button type="button" className="btn-close" style={{ fontSize: '14px' }} onClick={handleClose}></button>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Button>Score</Button>
                            </Modal.Body>
                        </Modal>
                        {activeContentType === "fcard" && (
                            <div className="fcard-details">
                                <div className="slider-arrow prev" onClick={() => handleSliderArrowClick("prev")}>
                                    &lt;
                                </div>
                                <div className="fcard-description-title">
                                    <div className="title">{elearnFCardDtos[activeTitleIndex].keyword}</div>
                                </div>
                                <div className="slider-arrow next" onClick={() => handleSliderArrowClick("next")}>
                                    &gt;
                                </div>
                                {isFCardOpen && activeKeywordId !== null && (
                                    <div className="fcard-description">
                                        <div className="fcard-description-content">
                                            {elearnFCardDtos[activeTitleIndex].description}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Elearning;
