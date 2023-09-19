import React, { useState } from "react";

const QuizModal = ({ open, handleClose }) => {
    return (
        <div className={`modal ${open ? "open" : ""}`}>
            <div className="modal-content" style={{ width: "50%", height: "50%" }}>
                <div className="modal-header">
                    <h2>Quiz Modal</h2>
                    <button onClick={handleClose}>Close</button>
                </div>
                <div className="modal-body">
                    <p>Quiz content goes here.</p>
                </div>
            </div>
        </div>
    );
};

export default QuizModal;
