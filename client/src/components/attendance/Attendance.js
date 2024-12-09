import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Attendance.css";

// Class locations with coordinates
const classLocations = {
  "ECS 265 001 - Art Hall": {
    lat: 38.53897506153586,
    lon: -121.74849862059538,
  },
  "ECS 289H 001 - Cruess Hall": { lat: 38.5432437, lon: -121.754709 },
  "Test Location - Atrium 200": { lat: 38.54575, lon: -121.761024 },
};

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const classes = Object.keys(classLocations);

  // Function to calculate distance between two coordinates
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const handleAttendance = () => {
    if (selectedClass) {
      // Get the selected class's location
      const classLocation = classLocations[selectedClass];

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            const distance = getDistance(
              userLat,
              userLon,
              classLocation.lat,
              classLocation.lon
            );
            setUserLocation({ lat: userLat, lon: userLon }); // Store user location

            if (distance < 0.5) {
              setAttendanceStatus(`Attendance marked for ${selectedClass}!`);
            } else {
              setAttendanceStatus(
                "Attendance can only be taken from within the class proximity!"
              );
            }
          },
          () => {
            setAttendanceStatus(
              "Unable to retrieve location. Please allow location access."
            );
          }
        );
      } else {
        setAttendanceStatus("Geolocation is not supported by this browser.");
      }
    }
  };

  useEffect(() => {
    // Automatically get user's location when the component is mounted
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <div className="attendance-cover">
      <div className="attendance-container">
        <h1 className="selection-text">Mark Your Attendance</h1>
        <div className="attendance-views">
          <div className="form-container">
            <div className="class-select">
              <label htmlFor="class-select">Select Your Class:</label>
              <select
                id="class-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="select-class"
              >
                <option value="">-- Select --</option>
                {classes.map((classItem, index) => (
                  <option key={index} value={classItem}>
                    {classItem}
                  </option>
                ))}
              </select>
            </div>
            <button className="mark-attendance" onClick={handleAttendance}>
              Mark Attendance
            </button>

            {attendanceStatus && (
              <div
                className={`attendance-status ${
                  attendanceStatus.includes("marked") ? "success" : "error"
                }`}
              >
                <p>{attendanceStatus}</p>
              </div>
            )}
          </div>

          {/* Display Map */}
          {userLocation && (
            <div className="map-container">
              <MapContainer
                center={[userLocation.lat, userLocation.lon]} // Center on user's location
                zoom={25}
                style={{ height: "295px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Use CircleMarker for a dot marker for user's location */}
                <CircleMarker
                  center={[userLocation.lat, userLocation.lon]}
                  radius={2.5}
                  color="red"
                  fillOpacity={1}
                >
                  <Popup>Your current location</Popup>
                </CircleMarker>

                {/* Render Class Location on map when a class is selected */}
                {selectedClass && (
                  <>
                    <Marker
                      position={[
                        classLocations[selectedClass].lat,
                        classLocations[selectedClass].lon,
                      ]}
                    >
                      <Popup>{selectedClass}</Popup>
                    </Marker>
                    <Circle
                      center={[
                        classLocations[selectedClass].lat,
                        classLocations[selectedClass].lon,
                      ]}
                      radius={20} // 10 meters
                      fillOpacity={0.2}
                    />
                  </>
                )}
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
