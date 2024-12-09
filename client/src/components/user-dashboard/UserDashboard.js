import { useEffect, useState } from "react";
import { fetchUserData } from "../../api/user";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        console.log("Fetched user data:", data); // Log the entire response to check its structure
        setUserData(data); // Set the entire array of users
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="dashboard-cover">
      <div className="dashboard-container">
        <h1>Preyash's Dashbaord</h1>
        {userData.length > 0 ? (
          <div className="dashboard-content">
            <div className="section">
              {/* Table displaying the user's data */}
              <table>
                <thead>
                  <tr>
                    <th>Your Public Key</th>
                    <th>Quiz Marks</th>
                    <th>Regsitered Courses</th>
                    <th>Grade</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user._id}>
                      {/* Public Key */}
                      <td>{user.publicKey}</td>

                      {/* Quiz Marks */}
                      <td>
                        {Object.entries(user.quiz).map(([quiz, mark]) => (
                          <div key={quiz}>
                            {quiz}: {mark}
                          </div>
                        ))}
                      </td>

                      {/* Courses, Grades, and Attendance */}
                      <td>
                        {user.class.map((course, index) => (
                          <div key={index}>{course}</div>
                        ))}
                      </td>
                      <td>
                        {user.grade.map((grade, index) => (
                          <div key={index}>{grade}</div>
                        ))}
                      </td>
                      <td>
                        {user.attendance.map((att, index) => (
                          <div key={index}>{att}%</div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
