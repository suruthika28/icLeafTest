import React, { useEffect, useState } from "react";
import { GetApi, PostApi } from '../services/ApiCall';

function AssessmentDashboard() {
  const token = localStorage.getItem("token");
  const [subject, setSubject] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedExamPackId, setSelectedExamPackId] = useState('');
  const [examPack, setExamPack] = useState([]);
  const [assesmentData, setAssessmentData] = useState([]);

  useEffect(() => {
    getSubjects();
    //getAssessmentDetails();
    getSubjectAssessmentDetails();
  }, []);

  //Get Subject List 
  const getSubjects = async () => {
    const url = "activeexamsDto";
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const data = {};

    try {
      const response = await PostApi('POST', url, data, headers);
      setSubject(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // Get Exam Pack List
  const handleSubjectSelect = async (event) => {
    const selectedSubjectId = event.target.value;
    setSelectedSubjectId(selectedSubjectId);
    //console.log(selectedSubjectId);

    const url = "activeexampack";
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const data = new FormData();
    data.append('categoryid', selectedSubjectId);

    try {
      const response = await PostApi('POST', url, data, headers);
      console.log(response.data);
      setExamPack(response.data);
      setSelectedExamPackId('');
    } catch (error) {
      console.log(error);
    }
  }

  // Get Assessment Details
  const handleExamPackSelect = async (event) => {
    const selectedExamPackId = event.target.value;
    setSelectedExamPackId(selectedExamPackId);

    const url = "userassessmentdashinit";
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const params = {
      subjectId: selectedSubjectId,
      exampackId: selectedExamPackId,
      examMode: 0
    }

    try {
      const response = await GetApi('GET', url, params, headers);
      console.log(response.data);
      setAssessmentData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Get Subject Assessment Details
  const getSubjectAssessmentDetails = async () => {
    setSelectedSubjectId(selectedSubjectId);
    const subjectId = selectedSubjectId;
    console.log(subjectId);

    const url = "userassessmentdashinit";
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const params = {
      subjectId: subjectId
    }
    try {
      const response = await GetApi('GET', url, params, headers);
      console.log(response.data);
      setAssessmentData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const assessmentDetailsArray = Object.entries(assesmentData).map(([key, value]) => ({
    key,
    value
  }));

  return (
    <div>
      <div className="Elearn-dropdown-container">
        <select className="dropdown" style={{ fontWeight: "bold" }} onChange={handleSubjectSelect}>
          <option value="" disabled selected>Choose a Subject</option>
          {subject.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subjectName}
            </option>
          ))}
        </select>

          <select className="dropdown" style={{ fontWeight: "bold", marginLeft: "3%" }} onChange={handleExamPackSelect}>
            <option value="" disabled selected>Choose an Exam Pack</option>
            {examPack.map((examPack) => (
              <option key={examPack.id} value={examPack.id}>
                {examPack.name}
              </option>
            ))}
          </select>
        

        {selectedExamPackId && (
          <select className="dropdown" style={{ fontWeight: "bold", marginLeft: "3%" }}>
             <option value="" disabled selected>Practise Mode</option>
          </select>
        )}
      </div>
      

      <div className="elearn-details">
        {assessmentDetailsArray.map((item, index) => (
          <div key={index} className="card card-body shadow-v2 elearn-box">
            <h3>{item.key}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AssessmentDashboard;
