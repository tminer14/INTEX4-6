import { useState, useEffect } from "react";
import "../styles/CookiesPopup.css";
import cookieIcon from "../assets/cookie-icon.png";
import closeIcon from "../assets/close-icon.png";

function CookiesPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the popup after a short delay
    const timer = setTimeout(() => {
      // Check if user has already made a choice
      const cookieChoice = localStorage.getItem("cookieChoice");
      if (!cookieChoice) {
        setIsVisible(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieChoice", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieChoice", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookies-popup">
      <div className="cookies-popup-content">
        <div className="cookies-popup-left">
          <div className="cookies-header">
            <div className="cookies-title">Cookies</div>
            <img src={cookieIcon} alt="Cookie icon" className="cookie-icon" />
          </div>
          <div className="cookies-message">
            We use cookies to make your experience better
          </div>
        </div>
        <div className="cookies-popup-right">
          <img
            src={closeIcon}
            alt="Close"
            className="close-icon"
            onClick={handleReject}
          />
          <div className="cookies-buttons">
            <button className="accept-button" onClick={handleAccept}>
              Accept
            </button>
            <button className="reject-button" onClick={handleReject}>
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookiesPopup;
