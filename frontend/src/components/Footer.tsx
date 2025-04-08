"use client";

import { Link, useNavigate } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../assets/Logo.png";
import { jwtDecode } from "jwt-decode"; // ✅ correct way

function Footer() {
  const navigate = useNavigate();

  let isAdmin = false;

  // 🧠 Check if user has Admin role
  const token = localStorage.getItem("authToken");
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const roles =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      const rolesArray = Array.isArray(roles) ? roles : [roles]; // handle single or multiple roles
      isAdmin = rolesArray.includes("Administrator");

      console.log("Decoded token:", decodedToken);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="Logo"
          className="footer-logo"
        />
        <Link to="/privacy" className="footer-link">
          Privacy Policy
        </Link>
        <Link to="/signup/step1" className="footer-link">
          Sign Up
        </Link>
        {/* Only show Admin Dashboard button if user is Administrator */}
        {isAdmin && (
          <Link to="/admin" className="footer-admin-button">
            Admin Dashboard
          </Link>
        )}
      </div>
    </footer>
  );
}

export default Footer;
