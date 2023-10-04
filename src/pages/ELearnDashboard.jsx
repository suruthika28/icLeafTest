import React, { useEffect, useState } from "react";
import { GetApi, PostApi } from '../services/ApiCall';

function ELearnDashboard() {
  const token = localStorage.getItem("token");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [elearnDetails, setElearnDetails] = useState(null);

  useEffect(() => {
    getAllSubjects();
  }, []);

  const getAllSubjects = async () => {
    const url = "getUserPurchaseElearn";
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const data = {};
    try {
      const response = await PostApi('POST', url, data, headers);
      setSubjects(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubjectSelect = async (event) => {
    const selectedSubjectId = event.target.value;
    setSelectedSubjectId(selectedSubjectId);
    setTopics([]);

    try {
      const url = `gettopiclistforelearn?subjectId=${selectedSubjectId}`;
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const data = {};
      const response = await PostApi('POST', url, data, headers);
      setTopics(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleTopicSelect = async (event) => {
    const selectedTopicId = event.target.value;
    setSelectedTopicId(selectedTopicId);

    const url = `userdashelearndetails?subjectId=${selectedSubjectId}`;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const params = {};
    try {
      const response = await GetApi('GET', url, params, headers);
      console.log(response);
      setElearnDetails(response.data.data); // Assuming the data is in response.data.data
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="Elearn-dropdown-container">
        <select className="dropdown" style={{ fontWeight: "bold" }} onChange={handleSubjectSelect}>
          <option value="" disabled selected>Choose a Subject</option>
          {subjects.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subjectName}
            </option>
          ))}
        </select>
        <select className="dropdown" style={{ fontWeight: "bold", marginLeft: "3%" }} onChange={handleTopicSelect}>
          <option value="" disabled selected>Choose a Topic</option>
          {topics.map((topic) => (
            <option key={topic.topicId} value={topic.topicId}>
              {topic.topicName}
            </option>
          ))}
        </select>
      </div>

      <div className="elearn-details">
        {elearnDetails && (
          Object.keys(elearnDetails).map((key) => (
            <div key={key} className="card card-body shadow-v2 elearn-box">
              <h3>{key}</h3>
              <p>{elearnDetails[key]}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default ELearnDashboard;
