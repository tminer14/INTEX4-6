"use client";

import { Link, useNavigate } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../assets/Logo.png";

function Footer() {
  const Navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        <img
          onClick={() => Navigate("/")}
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
        <Link to="/login" className="footer-admin-button">
          Admin Login
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
