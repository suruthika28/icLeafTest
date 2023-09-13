import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import { useLocation } from 'react-router-dom';
import Head from '../components/Head';
import ApiCall from '../services/ApiCall';

function ExamCard() {
    const location = useLocation();
    const token = localStorage.getItem("token");
    const [examTitle, setExamTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [topicName, setTopicName] = useState('')
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers for each question
    const [answeredCount, setAnsweredCount] = useState(0); // Initialize answered count

    const {
        examPackId,
        examId,
        examTakenId,
        elearnFlag,
        activeexam,
    } = location.state;
    const data = new FormData();
    data.append('examId', examId)
    data.append('examPackId', examPackId);
    data.append('examTakenId', examTakenId);
    data.append('elearnFlag', elearnFlag);
    data.append('activeexam', activeexam)
    const url = "getQuestionAnswerDetails"
    const method = "post"
    const headers = {
        Authorization: `Bearer ${token}`
    }
    useEffect(() => {
        ApiCall
            .PostApi(method, url, data, headers)
            .then((response) => {
                console.log(response, "getQuest");
                setExamTitle(response.data.examSettingDto.examTitle)
                setQuestions(response.data.questionAnswersListDto.questionAnswersDtoList);
                setTopicName(response.data.questionAnswersListDto.questionAnswersDtoList[0].topicName)
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestionIndex]: answer,
        });

        // Increment answered count when a radio button is selected
        setAnsweredCount(answeredCount + 1);
    };

    return (
        <div>
            <Head />
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                fontSize: '1.2em',
                color: 'gray',
                marginTop: '5%',
                margin: '10px',
            }}>
                <div>
                    Exam
                    <br />
                    {examTitle}
                </div>
                <div>
                    Section
                    <br />
                    {topicName}
                </div>
                <div>
                    Answered
                    <br />
                    {answeredCount}
                </div>
                <div>Bookmarked</div>
                <div>Timer</div>
            </div>
            <div style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                margin: '10px',
                marginTop: '5%',
            }}>
                {questions.length > 0 && (
                    <div>
                        <div style={{ textAlign: 'center', fontSize: '1.2em', marginBottom: '10px' }}>
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </div>
                        <div style={{ fontSize: '1.2em', marginBottom: '10px', fontWeight: 'bold' }}>{questions[currentQuestionIndex].questionTxt}</div>
                        <div>
                            {questions[currentQuestionIndex].answerDto.answerList.map((answer, index) => (
                                <label key={index} style={{ display: 'block', marginBottom: '10px' }}>
                                    <input
                                        type="radio"
                                        name={`answer_${currentQuestionIndex}`}
                                        value={answer.answerText}
                                        checked={selectedAnswers[currentQuestionIndex] === answer.answerText}
                                        onChange={() => handleAnswerSelect(answer.answerText)}
                                        style={{ marginRight: '10px', width: '20px', height: '20px' }}
                                    />
                                    {answer.answerText}
                                </label>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <button
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                                style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                                style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
                            >
                                Next
                            </button>
                        </div>
                        {/* <div style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
                            Answered: {answeredCount} / {questions.length}
                        </div> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExamCard;
