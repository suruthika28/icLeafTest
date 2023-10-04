import React, { useEffect, useState } from "react";
import '../styles/styles.css'
import MainHeader1 from '../components/MainHeader1'
import MainHeader from '../components/MainHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import ApiCall from '../services/ApiCall';

function GetSummary(props) {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const [summaryDetails, setSummaryDetails] = useState({});
    const { examTakenId } = location.state;

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/activeexams');
    }

    useEffect(() => {
        getGetSummaryDetails();
    }, []);

    const getGetSummaryDetails = async () => {
        const url = "examtakenAjaxCommon";
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const params = {
            examTakenId: examTakenId
        };
        try {
            const response = await ApiCall.GetApi('GET', url, params, headers);
            console.log(response.data.objectiveResult);
            const summarydata = response.data.objectiveResult;
            setSummaryDetails(summarydata);

        } catch (error) {
            console.log(error);
        }
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
    
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
    
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    };
    
    return (
        <div>
            <MainHeader1 />
            <MainHeader />
            <div className="cardContainer">
                <div className="additionalDiv">

                    <div style={{ display: "flex", justifyContent: "right", marginTop: "5%" }}>
                        <button style={{ backgroundColor: "#f95502", color: "white", border: 0, padding: "10px" }} onClick={handleBack}>Go Back</button>
                    </div>


                    <div style={{ width: "80%" }}>
                        <div class="card-header">
                            <h4 style={{ color: "white" }}>Exam Info</h4>
                        </div>

                        <div style={{ backgroundColor: "white", padding: "30px", marginBottom: "5%" }}>
                            {Array.isArray(summaryDetails) && summaryDetails.map((summary, index) => (
                                <div key={index}>
                                  
                                    <div style={{ paddingBottom: "3px" }}>
                                        <label>Exam : {summary.examName}</label>
                                       <h1></h1>
                                    </div>
                                    <div style={{ paddingBottom: "3px" }}>
                                        <label>Start Time : {formatTimestamp(summary.startDateTime)}</label>
                                        <h1></h1>
                                    </div>
                                    <div style={{ paddingBottom: "10px" }}>
                                        <label>End Time :{formatTimestamp(summary.endDateTime)}</label>
                                        <h1></h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
                        <h4 style={{ alignSelf: "flex-start", alignItems: "center" }}>Showing 1 to 1 of entries</h4>
                        <input style={{ width: "13%", padding: "10px", alignItems: "center", marginTop: "-1%" }} placeholder='Enter search items...' />
                    </div>




                    <div>
                        <div>
                            <table style={{ backgroundColor: "white", borderTop: '1px solid black', width: "100%", marginBottom: "5%" }}>
                            <thead style={{ borderBottom: '1px solid black', textAlign: "center", border: "5px", borderColor: "black" }}>
                                    <th style={{ padding: "5px" }}>Topic</th>
                                    <th style={{ padding: "5px" }}>Questions</th>
                                    <th style={{ padding: "5px" }}>Answered</th>
                                    <th style={{ padding: "5px" }}>Correct Answers</th>
                                    <th style={{ padding: "5px" }}>Wrong Answers</th>
                                    <th style={{ padding: "5px" }}>Unanswered</th>
                                    <th style={{ padding: "5px" }}>Justify answered</th>
                                    <th style={{ padding: "5px" }}>Reviews Questions</th>
                                    <th style={{ padding: "5px" }}>Total Marks</th>
                                    <th style={{ padding: "5px" }}>Marks obtained</th>
                                </thead>
                                <tbody style={{ borderTop: '1px solid black' }}>
                                    {Array.isArray(summaryDetails) && summaryDetails.map((summary, index) => (
                                        <tr key={index}>
                                            <td style={{ padding: "8px" }}>{summary.topicName}</td>
                                            <td style={{ padding: "8px" }}>{summary.noOfQuestn}</td>
                                            <td style={{ padding: "8px" }}>{summary.answered}</td>
                                            <td style={{ padding: "8px" }}>{summary.correctAnswr}</td>
                                            <td style={{ padding: "8px" }}>{summary.wrongAnswr}</td>
                                            <td style={{ padding: "8px" }}>{summary.unAnswrdQuestions}</td>
                                            <td style={{ padding: "8px" }}>{summary.justifyAnswr}</td>
                                            <td style={{ padding: "8px" }}>{summary.reviewedAnswr}</td>
                                            <td style={{ padding: "8px" }}>{summary.marks}</td>
                                            <td style={{ padding: "8px" }}>{summary.marksObtained}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div>
                        <div>
                            <label>
                                Show
                                <select style={{ width: "6%", height: "32px" }}>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="-1">All</option>
                                </select>
                                entries
                            </label>
                        </div>
                    </div>



                    <div style={{ width: "80%" }}>
                        <div class="card-header">
                            <h4 style={{ color: "white" }}>Over All Results</h4>
                        </div>
                        <div style={{ backgroundColor: "white", padding: "30px" }}>
                            {Array.isArray(summaryDetails) && summaryDetails.map((summary, index) => (
                                <div key={index}>
                                    <div style={{ paddingBottom: "3px" }}>
                                        <label>Exam Exam : {summary.examName}</label>
                                        <h2>  </h2>
                                    </div>
                                    <div style={{ paddingBottom: "3px" }}>
                                        <label>Total Questions : {summary.noOfQuestn}</label>
                                        <h4>   </h4>
                                    </div>
                                    <div style={{ paddingBottom: "10px" }}>
                                        <label>Total Marks : {summary.marks}</label>
                                        <h4>   </h4>
                                    </div>
                                    <div style={{ paddingBottom: "10px" }}>
                                        <label>Objective Questions : {summary.noOfQuestn}</label>
                                        <h4>   </h4>
                                    </div>
                                    <div style={{ paddingBottom: "10px" }}>
                                        <label>Marks Obtained : {summary.marksObtained}</label>
                                        <h4>   </h4>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>


                    <div style={{ width: "80%", flexDirection: "row", alignItems: "center" }}>
                        <div class="card-header">
                            <h4 style={{ color: "white" }}>Advanced Filter</h4>
                        </div>
                        <div style={{ backgroundColor: "white", padding: "30px", flexDirection: "row" }}>
                            <select style={{ fontWeight: "bold", width: "30%", marginRight: "30px", height: "40px" }}>
                                <option value="" disabled selected>Please Select a Tag</option>
                            </select>
                            <select style={{ fontWeight: "bold", width: "30%", height: "40px" }}>
                                <option value="" disabled selected></option>
                            </select>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default GetSummary