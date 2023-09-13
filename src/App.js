// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateUser from './pages/CreateUser';
import ChangePassword from './pages/ChangePassword';
import MyProfile from './pages/MyProfile';
import ForgotPassword from './pages/ForgotPassword';
import ActiveExams from './pages/ActiveExams';
import StartExam from './pages/StartExam';
import ExamCard from './pages/ExamCard';
import Elearning from './pages/Elearning';
import CoursesDashboard from './pages/CoursesDashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}
        />
        <Route path="/home" element={<Home />}
        />
        <Route path="/login" element={<Login />}
        />
        <Route path="/forgetpass" element={<ForgotPassword />}
        />
        <Route path="/changepassword" element={<ChangePassword />}
        />
        <Route path="/register" element={<Register />}
        />
        <Route path="/myprofile" element={<MyProfile />}
        />
        <Route path="/user" element={<CreateUser />}
        />
        <Route path="/activeexams" element={<ActiveExams />}
        />
        <Route path="/startexam" element={<StartExam />}
        />
        <Route path="/exam-card" element={<ExamCard />}
        />
        <Route path="/elearning" element={<Elearning />}
        />
        <Route path="/dashboard" element={<CoursesDashboard/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
