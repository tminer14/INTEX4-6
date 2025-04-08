import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import "../styles/CreateAccountPage.css";

function CreateAccountStep5() {
  const navigate = useNavigate();
  // In a real application, this would come from context or state management
  // For this example, we're using a mock value
  const [firstName, setFirstName] = useState("John");

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="create-account-container">
      <Header />
      <div className="create-account-content">
        <div className="back-button" style={{ visibility: "hidden" }}>
          {/* Hidden back button to maintain layout consistency */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="back-arrow"
          >
            <path
              d="M38 24H10M10 24L24 38M10 24L24 10"
              stroke="#F5F5F5"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>

        <div className="progress-indicator">
          <svg
            width="771"
            height="35"
            viewBox="0 0 771 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="dots"
          >
            <circle cx="17.5" cy="17.5" r="17.5" fill="#237881"></circle>
            <circle
              cx="753.5"
              cy="17.5"
              r="16"
              fill="#87B5BA"
              stroke="#237881"
              strokeWidth="3"
            ></circle>
            <circle cx="196.5" cy="17.5" r="17.5" fill="#237881"></circle>
            <circle cx="375.5" cy="17.5" r="17.5" fill="#237881"></circle>
            <circle cx="564.5" cy="17.5" r="17.5" fill="#237881"></circle>
          </svg>
        </div>

        <div className="success-container">
          <div className="success-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 24L22 28L30 20M42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C33.9411 6 42 14.0589 42 24Z"
                stroke="#87B5BA"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="welcome-title">Welcome to the club, {firstName}!</h1>
          <p className="welcome-subtitle">
            Login to find your new favorite film
          </p>

          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountStep5;
