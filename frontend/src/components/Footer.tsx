"use client";

import { Link } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../assets/Logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={logo} alt="Logo" className="footer-logo" />
        <Link to="/about" className="footer-link">
          About Us
        </Link>
        <Link to="/privacy" className="footer-link">
          Privacy Policy
        </Link>
        <Link to="/signup" className="footer-link">
          Sign UP
        </Link>
        <Link to="/admin" className="footer-admin-button">
          Admin Login
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
