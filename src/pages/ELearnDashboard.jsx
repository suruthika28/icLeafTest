import React, { useEffect, useState } from "react";
import { GetApi, PostApi } from '../services/ApiCall';
import userService from "../services/userService";

function ELearnDashboard() {
  const token = localStorage.getItem("token");
  const [subjectNames, setSubjectNames] = useState([]);
  const [subject, setSubject] = useState([]);
  const [elearnDetails, setElearnDetails] = useState([]);
  const [topicName, setTopicName] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');

  useEffect(() => {
    getElearnDetails();
  }, []);

  const url = "getUserPurchaseElearn";
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const data = {};

  const getElearnDetails = async () => {
    try {
      const response = await PostApi('POST', url, data, headers);
      setSubject(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubjectSelect = (event) => {
    console.log('Selected subject:', event.target.value);
    const selectedSubjectId = event.target.value;
    setSelectedSubjectId(selectedSubjectId);
    setSelectedTopicId('');
    setTopicName([]);
  
    if (selectedSubjectId) {
      userService
        .Gettopiclistforelearn(token, selectedSubjectId)
        .then((response) => {
          setTopicName(response.data);
        })
        .catch((error) => {
        });
    } else {
      setTopicName([]);
    }
  };
  
  const handleTopicSelect = async (event) => {
    const selectedTopicId = event.target.value;
    setSelectedTopicId(selectedTopicId);
    
    const url = "userdashelearndetails";
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const params = {
      subjectId: selectedSubjectId
    };
    try {
      const response = await GetApi('GET', url, params, headers);
      console.log(response);
      setElearnDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const elearnDetailsArray = Object.entries(elearnDetails).map(([key, value]) => ({
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
        <select className="dropdown" style={{ fontWeight: "bold", marginLeft: "3%" }} onChange={handleTopicSelect}>
          <option value="" disabled selected>Choose a Topic</option>
          {topicName.map((topic) => (
            <option key={topic.topicId} value={topic.topicId}>
              {topic.topicName}
            </option>
          ))}
        </select>
      </div>
      <div className="elearn-details">
        {elearnDetailsArray.map((item, index) => (
          <div key={index} className="card card-body shadow-v2 elearn-box">
            <h3>{item.key}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ELearnDashboard;
