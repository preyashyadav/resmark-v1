import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // Import the CSS file
import ResMarkLogo from "../../assets/images/resmark-logo-bg-less.png";

const Admin = () => {
  const [quizFile, setQuizFile] = useState(null);
  const [isQuizLive, setIsQuizLive] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setQuizFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (quizFile) {
      setIsQuizLive(true);
    }
  };

  const handleLogout = () => {
    // Logic for logout (clear authentication, redirect to login page, etc.)
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="header-content">
          <div className="emoji">
            {" "}
            <img src={ResMarkLogo} className="resmark-logo" />{" "}
          </div>{" "}
          <span className="admin-hello">Hello Admin</span>
          <span>Students View</span>
          <span>Quiz View</span>
          <span>Attendance View</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="admin-cover">
        <h1>Admin Panel - Quiz Upload</h1>
        <div className="admin-cover-2">
          <div className="file-upload-container">
            <input
              type="file"
              accept=".json,.csv,.xlsx" // Example file types (adjust based on your needs)
              onChange={handleFileChange}
            />
          </div>
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        </div>
      </div>

      {isQuizLive && (
        <div className="quiz-status">
          <p>Quiz is live!</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
