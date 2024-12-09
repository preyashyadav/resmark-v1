import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ResMarkLogo from "../../assets/images/resmark-logo-bg-less.png";

const Header = ({ isAuthenticated, onLogout, username }) => {
  return (
    <header className="header">
      <nav>
        <div className="emoji">
          {" "}
          <img src={ResMarkLogo} className="resmark-logo" />{" "}
        </div>{" "}
        {/* Emoji on the left */}
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/test">Help</Link>
          {/* Conditional rendering of login/logout button */}
          {isAuthenticated ? (
            <>
              <span className="username">Hello, Preyash</span>{" "}
              {/* Display username */}
              <button className="btn btn-outline-danger" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-outline-success" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
