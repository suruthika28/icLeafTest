import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';

import userService from '../services/userService';
import ExamCard from './ExamCard';
import ApiCall from '../services/ApiCall';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '60%',
    height: '60%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    zIndex: '1000',
  },
};

Modal.setAppElement('#root');

function StartExam() {
  const [elearnFlag, setElearnFlag] = useState('')
  const location = useLocation();
  const loca = location.state;
  const examId = loca.examId;
  const examPackId = loca.examPackId;
  const [examTakenId, setExamTakenId] = useState(0)
  const activeexam = true
  const token = localStorage.getItem("token");
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [showNextPage, setShowNextPage] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleCancel = () => {
    closeModal();
    navigate(-1);
  }

  const handelStartExam = () => {
    closeModal();
    // setShowNextPage(true);
    navigate('/exam-card', {
      state: {
        examPackId,
        examId,
        examTakenId,
        elearnFlag,
        activeexam,
      },
    });
  }

  useEffect(() => {
    openModal();

    return () => closeModal();
  }, []);

  const getInstructions = () => {
    userService
      .getExamInstructions(token, examId)
      .then((response) => {
        console.log("Instructions :", response)
        setInstructions(response.data);
      })
  }

  const openModal = () => {
    setModalIsOpen(true);
    getInstructions();
    const method = "post"
    const url = "startExamDto"
    const data = new FormData();
    data.append('examId', examId);
    data.append('examPackId', examPackId);
    data.append('examTakenId', examTakenId);
    const headers = {
      Authorization: `Bearer ${token}`
    };
    ApiCall
      .PostApi(method, url, data, headers)
      .then((response) => {
        setElearnFlag(response.data.elearnFlag)
        setExamTakenId(response.data.examTakenId)
        console.log(response, "StartExamDto")
      })
      .catch((error) => {
        alert(error)
      })
    // userService
    // .getQuestionAnswerDetail(token, examId, examPackId, examTakenId, elearnFlag, activeexam)
    // .then((response) => {
    //     console.log(response,"getQuest")
    // })
    // .catch((error) => {
    //     console.log(error)
    // })
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Sample Modal"
      >
        <h2 style={{ textAlign: 'center' }}>Instructions</h2>
        <ol style={{ marginTop: '10px', paddingLeft: '20px' }}>
          {instructions.map((instruction, idx) => (
            <li key={idx} style={{ marginBottom: '10px' }}>
              {instruction}
            </li>
          ))}
        </ol>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleCancel} style={{ borderRadius: 5, border: 'none', padding: '10px', background: '#F95502', color: 'white' }}
          >Cancel</button>
          <button onClick={handelStartExam} style={{ borderRadius: 5, border: 'none', padding: '10px', background: '#F95502', color: 'white' }}
          >Start Exam</button>
        </div>
      </Modal>
      {/* {showNextPage && (
        <div>
          <ExamCard examPackId={examPackId} examId={examId} examTakenId={examTakenId} elearnFlag={elearnFlag} activeexam={activeexam} />
        </div>
      )} */}
    </div>
  );
}

export default StartExam;
