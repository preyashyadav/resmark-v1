import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import TransactionForm from "./components/TransactionForm";
import Loader from "./components/Loader";
import Header from "./components/header/Header";
import Quiz from "./components/quiz/Quiz";
import UserDashboard from "./components/user-dashboard/UserDashboard";
import Attendance from "./components/attendance/Attendance";
import Admin from "./components/admin/Admin";
import BlockchainEarth from "./components/blockchain-earth/BlockchainEarth";

// Backend Data Fetching
import { fetchData } from "./api";

// Protected Route Component to ensure only authenticated users can access certain routes
const ProtectedRoute = ({
  element,
  isAuthenticated,
  redirectTo = "/login",
}) => {
  return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAfterLogin, setIsLoadingAfterLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null); // Track username
  const navigate = useNavigate();

  // Check if the user is already logged in by checking localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername); // Set username from localStorage
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (authToken, userName) => {
    setIsLoadingAfterLogin(true);
    setToken(authToken);
    setUsername(userName); // Set the username upon login
    localStorage.setItem("token", authToken);
    localStorage.setItem("username", userName); // Save username to localStorage

    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoadingAfterLogin(false);
      navigate("/dashboard"); // Redirect to the dashboard after login
    }, 2000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUsername(null); // Clear username
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login"); // Redirect to login page after logout
  };

  const [data, setData] = useState("");

  useEffect(() => {
    fetchData()
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <div
        className="blockchain-earth"
        data-sphere-color="#0d7ffa"
        data-sphere-width="400"
      ></div>

      {isLoadingAfterLogin && <Loader />}

      {!isLoadingAfterLogin && (
        <>
          <BlockchainEarth />
          <Routes>
            <Route
              path="/quiz"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Header
                        isAuthenticated={isAuthenticated}
                        onLogout={handleLogout}
                        username={username}
                      />{" "}
                      <Quiz />
                    </>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Header
                        isAuthenticated={isAuthenticated}
                        onLogout={handleLogout}
                        username={username}
                      />{" "}
                      <Attendance />
                    </>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={
                    <>
                      {" "}
                      <Header
                        isAuthenticated={isAuthenticated}
                        onLogout={handleLogout}
                        username={username}
                      />{" "}
                      <UserDashboard />
                    </>
                  }
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/test" element={<TransactionForm />} />
          </Routes>
        </>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
