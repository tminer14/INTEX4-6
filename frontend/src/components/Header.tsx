"use client";

import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/Logo.png";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="header-actions">
          <div className="language-selector">
            <span>Language</span>
          </div>
          <Link to="/login" className="sign-in-button">
            <span>Sign in</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
