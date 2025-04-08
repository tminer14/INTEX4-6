import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminUsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      if (!token || token === "undefined") {
        console.warn("No token found, redirecting to login.");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(
          "https://localhost:7026/api/Account/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error: any) {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized, redirecting to login.");
          navigate("/");
        }
      }
    };

    // **DELAY fetchUsers slightly after mount**
    setTimeout(fetchUsers, 100); // 100ms is enough
  }, [navigate]);


  const handleSignOut = () => {
    localStorage.removeItem("token");
    console.log("Sign out clicked");
    navigate("/");
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <button className="sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </header>

      <main className="admin-content">
        <h1 className="page-title">Users</h1>
        <div className="movie-table-container">
          <div className="movie-table">
            <div className="table-header">
              <div className="header-id">ID</div>
              <div className="header-name">Name</div>
              <div className="header-email">Email</div>
              <div className="header-role">Role</div>
              <div className="header-status">Status</div>
              <div className="header-action">Action</div>
            </div>
            {users.map((user: any, index: number) => (
              <div key={user.id} className="table-row">
                <div className="cell-id">{index + 1}</div>
                <div className="cell-name">{user.name}</div>
                <div className="cell-email">{user.email}</div>
                <div className="cell-role">{user.role}</div>
                <div className="cell-status">{user.status}</div>
                <div className="cell-action">
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUsersPage;
