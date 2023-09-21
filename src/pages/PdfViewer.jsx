import React, { useState, useEffect } from "react";
import { Modal, IconButton, Button, Grid } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/Header.css"

const PdfModal = ({ open, handleClose, pdfFile, currentPageIndex, setCurrentPageIndex }) => {
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        if (open) {
            setCurrentPageIndex(0);
        }
    }, [open, setCurrentPageIndex]);

    if (!pdfFile || !pdfFile.hasOwnProperty("pageImgUrlList")) {
        return (
            <Modal open={open} onClose={handleClose}>
                <div style={{ background: "black" }}>
                    <p style={{ color: "white" }}>Error: PDF file data is missing or invalid.</p>
                    <Button style={{ color: "white" }} onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Modal>
        );
    }

    const { pageImgUrlList } = pdfFile;

    const handleNextPage = () => {
        if (currentPageIndex < pageImgUrlList.length - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    const handleZoomIn = () => {
        const newZoomLevel = zoomLevel + 0.1;
        if (newZoomLevel <= 2.0) {
            setZoomLevel(newZoomLevel);
        }
    };

    const handleZoomOut = () => {
        const newZoomLevel = zoomLevel - 0.2;
        if (newZoomLevel >= 0.2) {
            setZoomLevel(newZoomLevel);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <div style={{ background: "black", height: "100%", display: "flex", flexDirection: "column" }}>
                <div
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: "9999",
                    }}
                >
                    <IconButton onClick={handleZoomIn} style={{ color: 'white' }}>
                        <ZoomInIcon />
                    </IconButton>
                    <IconButton onClick={handleZoomOut} style={{ color: 'white' }}>
                        <ZoomOutIcon />
                    </IconButton>
                    <IconButton onClick={handleClose} style={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container spacing={2} style={{ marginTop: '5px', flex: 1 }}>
                    <Grid item xs={2}>
                    <div style={{ overflowY: "auto", maxHeight: "900px", height: "fit-content" }} className="custom-scrollbar">                            <div style={{ paddingRight: "10px" }}>
                                {pageImgUrlList.map((url, index) => (
                                    <div key={index} onClick={() => setCurrentPageIndex(index)}>
                                        <img
                                            src={url}
                                            alt={`Page ${index + 1}`}
                                            style={{
                                                padding: "10px",
                                                width: "50%",
                                                cursor: "pointer",
                                                border: currentPageIndex === index ? "1px solid white" : "none",
                                            }}
                                        />
                                        <div style={{ color: "white", textAlign: "center" }}>{index + 1}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </Grid>

                    <Grid item xs={9}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <IconButton onClick={handlePreviousPage}>
                                <NavigateBeforeIcon />
                            </IconButton>
                            <div style={{ position: "relative" }}>
                                <img
                                    src={pageImgUrlList[currentPageIndex]}
                                    alt={`Page ${currentPageIndex + 1}`}
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "90vh",
                                        objectFit: "contain",
                                        transform: `scale(${zoomLevel})`,
                                    }}
                                />
                            </div>
                            <IconButton onClick={handleNextPage}>
                                <NavigateNextIcon />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    );
};

export default PdfModal;
