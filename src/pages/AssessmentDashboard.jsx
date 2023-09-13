import React from 'react'

function AssessmentDashboard() {
  return (
    <div className="Elearn-dropdown-container">
      
    <select className="dropdown" style={{fontWeight:"bold"}}>
      <option value="" disabled selected>Choose a Subject</option>
    </select>
    
    <select className="dropdown" style={{fontWeight:"bold" ,marginLeft:"3%"}}>
      <option value="" disabled selected >Choose an Exam Pack</option>
    </select>
    
</div>
  )
}

export default AssessmentDashboard