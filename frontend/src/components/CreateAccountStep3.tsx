import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/CreateAccountPage.css";
import { useState } from "react";

function CreateAccountStep3() {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Account creation step 3 form submitted");
    console.log("Selected streaming services:", selectedServices);
    // Navigate to next step
    navigate("/signup/step4");
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  return (
    <div className="create-account-container">
      <Header />
      <div className="create-account-content">
        <div className="back-button" onClick={handleBackClick}>
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
            <circle cx="753.5" cy="17.5" r="17.5" fill="#87B5BA"></circle>
            <circle cx="196.5" cy="17.5" r="17.5" fill="#237881"></circle>
            <circle
              cx="375.5"
              cy="17.5"
              r="16"
              fill="#87B5BA"
              stroke="#237881"
              strokeWidth="3"
            ></circle>
            <circle cx="564.5" cy="17.5" r="17.5" fill="#87B5BA"></circle>
          </svg>
        </div>

        <div className="form-container">
          <h1 className="form-title">Create An Account</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-fields streaming-services">
              <h2 className="streaming-title">
                Select all other streaming services you have:
              </h2>
              <p className="streaming-subtitle">
                This helps us show you unique films.
              </p>

              <div className="streaming-options">
                <div className="streaming-option">
                  <div
                    className={`checkbox ${selectedServices.includes("Netflix") ? "checked" : ""}`}
                    onClick={() => toggleService("Netflix")}
                  ></div>
                  <label onClick={() => toggleService("Netflix")}>
                    Netflix
                  </label>
                </div>

                <div className="streaming-option">
                  <div
                    className={`checkbox ${selectedServices.includes("Paramount Plus") ? "checked" : ""}`}
                    onClick={() => toggleService("Paramount Plus")}
                  ></div>
                  <label onClick={() => toggleService("Paramount Plus")}>
                    Paramount Plus
                  </label>
                </div>

                <div className="streaming-option">
                  <div
                    className={`checkbox ${selectedServices.includes("Amazon Prime") ? "checked" : ""}`}
                    onClick={() => toggleService("Amazon Prime")}
                  ></div>
                  <label onClick={() => toggleService("Amazon Prime")}>
                    Amazon Prime
                  </label>
                </div>

                <div className="streaming-option">
                  <div
                    className={`checkbox ${selectedServices.includes("Max") ? "checked" : ""}`}
                    onClick={() => toggleService("Max")}
                  ></div>
                  <label onClick={() => toggleService("Max")}>Max</label>
                </div>

                <div className="streaming-option">
                  <div
                    className={`checkbox ${selectedServices.includes("Hulu") ? "checked" : ""}`}
                    onClick={() => toggleService("Hulu")}
                  ></div>
                  <label onClick={() => toggleService("Hulu")}>Hulu</label>
                </div>

                <div className="streaming-option">
                  <div
                    className={`checkbox ${selectedServices.includes("Apple TV") ? "checked" : ""}`}
                    onClick={() => toggleService("Apple TV")}
                  ></div>
                  <label onClick={() => toggleService("Apple TV")}>
                    Apple TV
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="next-button">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountStep3;
