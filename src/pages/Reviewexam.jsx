import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import ApiCall from "../services/ApiCall";
import { useLocation } from 'react-router-dom';
import "../styles/Head.css";
import logo from '../assets/images/logo-icleaf.png';
import { AiTwotoneFilter } from "react-icons/ai";
function ReviewExam() {
   const location = useLocation();
   const { reivewexamId, reivewexamPackId, reivewexamTakenId, elearnFlag } = location.state;
   const [questions, setQuestions] = useState([]);
   const [topicname, setTopicName] = useState('');

   const [items, setItems] = useState([]);
   const [qn, setqn] = useState('');
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [selectedAnswers, setSelectedAnswers] = useState([]); // Store selected answers for each question
   const [userselectedflag, setUserselectedflag] = useState('');
   const [answeredCount, setAnsweredCount] = useState(0); // Initialize answered count
   const [reviewedCount, setReviewedCount] = useState(0); // Initialize Reviewed count
   const [correctanswerexplanation, setCorrectAnswerExplanation] = useState('');
   const [examTitle, setExamTitle] = useState('');
   const method = "post";
   const token = localStorage.getItem("token");
   var formdata = new FormData();
   formdata.append("reivewexamId", reivewexamId);
   formdata.append("reivewexamPackId", reivewexamPackId);
   formdata.append("reivewexamTakenId", reivewexamTakenId);
   formdata.append("elearnFlag", elearnFlag);
   var data = new FormData();
   data.append("examId", reivewexamId);
   data.append("examPackId", reivewexamPackId);
   data.append("examTakenId", reivewexamTakenId);
   data.append("elearnFlag", elearnFlag);
   const url1 = "reviewexamAjax";
   const url2 = "getQuestionAnswerDetails";
   const headers = {
      Authorization: `Bearer ${token}`
   };

   useEffect(() => {
      reviewexamajax();
      getquestionandanswerdetails();
   }, [])
   const reviewexamajax = () => {
      ApiCall.PostApi(method, url1, formdata, headers)
         .then((response) => {
            console.log(response, "res")

         })
         .catch((error) => {
            console.log(error);
         })
   }
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
   const getquestionandanswerdetails = () => {
      ApiCall.PostApi(method, url2, data, headers)
         .then((response) => {
            console.log(response, "res")
            setExamTitle(response.data.examSettingDto.examTitle)

            console.log(examTitle)
            const questionss = response.data.questionAnswersListDto.questionAnswersDtoList;
            setQuestions(questionss)
            console.log(questionss)
            const items = response.data.questionAnswersListDto.questionAnswersDtoList;
            setItems(items);
            console.log(items);
            
            setTopicName(items[0].topicName);
            setCorrectAnswerExplanation(items[0].answerDto.correctAnswExplanation)
            setqn(response.data)
            console.log(qn);
            console.log(items.length)
            let count = 0;
            let count1 = 0;
            const questions = response.data.questionAnswersListDto.questionAnswersDtoList;
            for (let i = 0; i < questions.length; i++) {
               setSelectedAnswers(questions[i].answerDto.userSelecxtedIdx)
               console.log(selectedAnswers)
            }
            for (let i = 0; i < questions.length; i++) {
               if (questions[i].answerDto.answered === true) {
                  count++;
               }
               
            }
            for (let i = 0; i < questions.length; i++) {
               if (questions[i].reviewFlag === true)
               {
                  count1++;
               }
            }
            setAnsweredCount(count);
            setReviewedCount(count1);
            // console.log(answeredCount)
         })
         .catch((error) => {
            console.log(error);
         })
   }
   return (
      <div>
         <header className="header-main" style={{ backgroundColor: 'white' }}>
            <div className="logo">
               <img src={logo} alt="Logo" />
            </div>
            <div>
               <button style={{ backgroundColor: 'orange', height: '40px', width: '70px', border: '1px solid #dcdcdc', color: 'white', textAlign: 'center', borderRadius: '3px' }}>Close</button>
            </div>
         </header>
         <div style={{ marginTop: '3%', border: '1px solid #dcdcdc', height: '92px', width: '100%', display: 'flex' }}>
            <div style={{ backgroundColor: 'white', width: '14%' }}>
               <div style={{ textAlign: 'center', marginTop: '3%' }}><button onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  style={{ border: '1px solid orange', height: '46px', width: '140px', backgroundColor: 'white', color: 'orange' }}>« Previous Question</button></div>
            </div>
            <div style={{ width: '16%', height: '85px' }}>
               <div style={{ textAlign: 'center', marginTop: '2%' }}><span style={{ color: 'black' }}>Exam</span></div>

               <div style={{ textAlign: 'center' }}> <span style={{ color: 'orange', marginTop: '1%' }}>{examTitle}</span></div>
            </div>
            <div style={{ width: '12%', height: '85px' }}>
               <div style={{ textAlign: 'center', marginTop: '2%' }}><span style={{ color: 'black' }}>Section</span></div>

               <div style={{ textAlign: 'center' }}>  <span style={{ color: 'orange', marginTop: '1%' }}>Section:{topicname}</span></div>

            </div>
            <div style={{ width: '12%', height: '85px' }}>
               <div style={{ textAlign: 'center', marginTop: '2%' }}><span style={{ color: 'black' }}>Answered</span></div>
               <div style={{ textAlign: 'center' }}><text style={{ color: 'orange', marginTop: '1%' }}>{answeredCount}</text></div>

            </div>
            <div style={{ width: '12%', height: '85px' }}>
               <div style={{ textAlign: 'center', marginTop: '2%' }}><span style={{ color: 'black' }}>Reviewed</span></div>
               <div style={{ textAlign: 'center' }}><text style={{ color: 'orange', marginTop: '1%' }}>{reviewedCount}</text></div>
            </div>
            <div style={{ width: '12%', height: '85px' }}>
               <div style={{ textAlign: 'center', marginTop: '2%' }}><AiTwotoneFilter style={{ color: 'orange' }} /><span style={{ color: 'orange' }}>View more options</span></div>

            </div>
            <div style={{ width: '16%', height: '85px' }}>
               <div style={{ textAlign: 'center', marginTop: '3%' }}><button onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  style={{ border: '1px solid orange', height: '46px', width: '140px', backgroundColor: 'white', color: 'orange' }}>Next Question  »</button></div>

            </div>
         </div>
         <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ height: '410px', width: '80%', backgroundColor: '#f0f0f2', margin: '2%' }}>
               {questions.length > 0 && (
                  <div>
                     <div style={{ textAlign: 'center', fontSize: '1.2em', marginBottom: '10px' }}>
                        Question {currentQuestionIndex + 1} of {questions.length}
                     </div>
                     <div style={{ fontSize: '1.2em', marginBottom: '10px', fontWeight: 'bold' }}>{questions[currentQuestionIndex].questionTxt}</div>
                     <div>
                        {questions[currentQuestionIndex].answerDto.answerList.map((answer, index) => (
                           <label key={index} style={{ display: 'block', marginBottom: '10px' }}>
                              <div style={{ display: 'flex' }}>
                                 <input
                                    type="radio"
                                    name={`answer_${currentQuestionIndex}`}
                                    value={answer.answerText}
                                    checked={selectedAnswers[currentQuestionIndex] === answer.answerText}

                                    style={{ marginRight: '10px', width: '20px', height: '20px' }}
                                 />
                                 {answer.answerText}
                                 {selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].answerDto.userSelecxtedIdx && (
                                    <div style={{ width: '120px', height: '36px', backgroundColor: '#ff704d', marginLeft: '2%' }}>
                                       Your Answer
                                    </div>
                                 )}
                                 {answer.correctAnswerFlag === true && (
                                    <div style={{ width: '120px', height: '36px', backgroundColor: '#1affff', marginLeft: '2%' }}>
                                       Correct Answer
                                    </div>
                                 )}
                              </div>
                           </label>

                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
         <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ height: '100px', width: '80%', backgroundColor: '#c3e6cb', margin: '2%' }}>
               <div style={{ margin: '1.4%' }}> <label style={{ fontSize: '15px', color: '#00c8c9' }}>ANSWER EXPLANATION</label> </div>
               <div style={{ margin: '1.4%' }}>  <span style={{ fontSize: '15px' }}>{correctanswerexplanation}</span> </div>
            </div>
         </div>
      </div>
   )
}
export default ReviewExam;