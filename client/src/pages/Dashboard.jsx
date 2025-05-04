import { useEffect, useState } from "react";
import { getCurrentUser } from "../auth";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUsers([currentUser]);
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container">
        <h1>Dashboard</h1>

        {users.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <div
                className="user"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "25px",
                }}
              >
                <h3 style={{ margin: 0 }}>{user.name}</h3>
                <span style={{ fontSize: "1.2rem", color: "#00bcd4" }}>👤</span>
              </div>

              <p>
                <strong>Department:</strong> {user.department || "N/A"}
              </p>

              <div style={{ marginTop: "10px" }}>
                <p style={{ marginBottom: "6px" }}>
                  <strong>Treatment:</strong>
                </p>
                <div
                  style={{
                    backgroundColor: "#2c2c2c",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#f1f1f1",
                    lineHeight: "1.4",
                    whiteSpace: "pre-line",
                  }}
                >
                  {user.treatment || "N/A"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
