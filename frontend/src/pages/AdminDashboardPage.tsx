import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboardPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/Logo.png";

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Implementation for signing out
    console.log("Sign out clicked");
    navigate("/");
  };

  const navigateToMovies = () => {
    navigate("/admin/movies");
  };

  const navigateToUsers = () => {
    navigate("/admin/users");
  };

  // In a real application, you would get the admin's name from authentication context or API
  const [adminName, setAdminName] = useState<string>("");

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await axios.get(
          "https://your-backend-url.com/Movies/GetUserFullName",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const name = response.data.fullName;
        setAdminName(name && name.trim() !== "" ? name : "Admin");
      } catch (error) {
        console.error("Failed to fetch admin name:", error);
        setAdminName("Admin"); // Optional: fallback even if fetch fails
      }
    };

    fetchAdminName();
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="header-actions">
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </header>
      <main className="admin-content">
        <div className="welcome-message">
          <span>Welcome, </span>
          <span className="admin-name">{adminName}</span>
          <span>!</span>
        </div>
        <div className="navigation-container">
          <div className="navigation-buttons">
            <button className="nav-button" onClick={navigateToMovies}>
              View Movies
            </button>
            <button className="nav-button" onClick={navigateToUsers}>
              View Users
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
