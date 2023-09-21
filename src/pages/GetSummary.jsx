import React from 'react'
import '../styles/styles.css'
import MainHeader1 from '../components/MainHeader1'
import MainHeader from '../components/MainHeader'
import { useNavigate } from 'react-router-dom'
function GetSummary() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    const url = "examtakenAjaxCommon";
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
                        <div style={{ backgroundColor: "white", padding: "30px" }}>
                            <div style={{ paddingBottom: "3px" }}>
                                <label>Exam : </label>
                                <h4>    </h4>
                            </div>
                            <div style={{ paddingBottom: "3px" }}>
                                <label>Start Time : </label>
                                <h4>   </h4>
                            </div>
                            <div style={{ paddingBottom: "10px" }}>
                                <label>End Time : </label>
                                <h4>   </h4>
                            </div>
                        </div>
                    </div>


                    <div style={{ flexDirection: "column" }}>
                        <h4>Showing 1 to 1 of entires</h4>
                        <input style={{ width: "10%", marginLeft: "80%", padding: "10px" }} placeholder='Enter search items'></input>
                    </div>

                    <div>
                        <table style={{ backgroundColor: "white", borderTop: '1px solid black' }}>
                            <thead style={{ borderBottom: '1px solid black', textAlign: "center", border: "5px", borderColor: "black" }}>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Topic</th>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Questions</th>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Answered</th>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Correct Answers</th>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Wrong Answers</th>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Unanswered</th>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Justify answered</th>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Reviews Questions</th>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Total Marks</th>
                                <th style={{ padding: "5px", borderBottom: '1px solid black' }}>Marks obtained</th>
                            </thead>
                            <tbody style={{ borderTop: '1px solid black' }}>
                                <tr style={{ justifyContent: "center", alignItems: "center", borderTop: '1px solid black' }}>
                                    <td style={{ padding: "5px" }}> Basics</td>
                                    <td style={{ padding: "5px" }}>3</td>
                                    <td style={{ padding: "5px" }}>3</td>
                                    <td style={{ padding: "5px" }}>3</td>
                                    <td style={{ padding: "5px" }}>0</td>
                                    <td style={{ padding: "5px" }}>0</td>
                                    <td style={{ padding: "5px" }}>0</td>
                                    <td style={{ padding: "5px" }}>0</td>
                                    <td style={{ padding: "5px" }}>3</td>
                                    <td style={{ padding: "5px" }}>3</td>
                                </tr>


                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GetSummary