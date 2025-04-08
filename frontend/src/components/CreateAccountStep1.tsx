import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/CreateAccountPage.css";

function CreateAccountStep1() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Account creation form submitted");
    navigate("/signup/step2");
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
            />
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
            <circle
              cx="17.5"
              cy="17.5"
              r="16"
              fill="#87B5BA"
              stroke="#237881"
              strokeWidth="3"
            />
            <circle cx="196.5" cy="17.5" r="17.5" fill="#87B5BA" />
            <circle cx="375.5" cy="17.5" r="17.5" fill="#87B5BA" />
            <circle cx="564.5" cy="17.5" r="17.5" fill="#87B5BA" />
            <circle cx="753.5" cy="17.5" r="17.5" fill="#87B5BA" />
          </svg>
        </div>

        <div className="form-container">
          <h1 className="form-title">Create An Account</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-row center-row">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Password & Confirm Password */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    required
                  />
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

export default CreateAccountStep1;
