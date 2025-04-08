import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/CreateAccountPage.css";

function CreateAccountStep2() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Account creation step 2 form submitted");
    // Navigate to next step
    navigate("/signup/step3");
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
            <circle cx="17.5" cy="17.5" r="17.5" fill="#87B5BA"></circle>
            <circle cx="753.5" cy="17.5" r="17.5" fill="#87B5BA"></circle>
            <circle
              cx="196.5"
              cy="17.5"
              r="16"
              fill="#227780"
              stroke="#237881"
              strokeWidth="3"
            ></circle>
            <circle cx="375.5" cy="17.5" r="17.5" fill="#87B5BA"></circle>
            <circle cx="564.5" cy="17.5" r="17.5" fill="#87B5BA"></circle>
          </svg>
        </div>

        <div className="form-container">
          <h1 className="form-title">Create An Account</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input type="text" id="age" className="form-input" required />
                </div>

                <div className="form-group">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="streetAddress" className="form-label">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input type="text" id="zip" className="form-input" required />
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

export default CreateAccountStep2;
