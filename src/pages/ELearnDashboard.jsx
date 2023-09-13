import React from 'react'

function ELearnDashboard() {
  return (
    <div className="Elearn-dropdown-container">
      
    <select className="dropdown" style={{fontWeight:"bold"}}>
      <option value="" disabled selected>Choose a Subject</option>
    </select>
    
    <select className="dropdown" style={{fontWeight:"bold" ,marginLeft:"3%"}}>
      <option value="" disabled selected >Choose a Topic</option>
    </select>
    
</div>
  )
}

export default ELearnDashboard