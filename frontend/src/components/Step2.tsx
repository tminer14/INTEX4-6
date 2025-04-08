import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  age: string;
  gender: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

function Step2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Navigate to next step
    // navigate('/step3');
  };

  return (
    <div className="create-account-container">
      <div className="create-account-content">
        <div className="back-button" onClick={() => navigate(-1)}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
            height="68"
            viewBox="0 0 771 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="17.5" cy="50.5" r="17.5" fill="#87B5BA" />
            <circle
              cx="17.5"
              cy="50.5"
              r="17.5"
              fill="black"
              fillOpacity="0.2"
            />
            <line
              x1="35"
              y1="49.5"
              x2="179"
              y2="49.5"
              stroke="#237881"
              strokeWidth="3"
            />
            <circle cx="753.5" cy="50.5" r="17.5" fill="#87B5BA" />
            <circle
              cx="196.5"
              cy="50.5"
              r="16.5"
              fill="#87B5BA"
              stroke="#237881"
              strokeWidth="2"
            />
            <circle cx="375.5" cy="50.5" r="17.5" fill="#87B5BA" />
            <circle cx="564.5" cy="50.5" r="17.5" fill="#87B5BA" />
            <text
              fill="#F5F5F5"
              xmlSpace="preserve"
              style={{
                whiteSpace: "pre",
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              x="190"
              y="19.2727"
            >
              2
            </text>
            <text
              fill="#F5F5F5"
              xmlSpace="preserve"
              style={{
                whiteSpace: "pre",
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              x="13"
              y="19.2727"
            >
              1
            </text>
          </svg>
        </div>

        <h1 className="page-title">Create An Account</h1>

        <form onSubmit={handleSubmit} className="create-account-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="streetAddress">Street Address</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="zip">Zip</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="next-button">
              Next
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .create-account-container {
          display: flex;
          flex-direction: column;
          background-color: #022B3B;
          font-family: Inter, sans-serif;
          padding: 50px;
          min-height: 100vh;
        }

        .create-account-content {
          position: relative;
          width: 100%;
        }

        .back-button {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          cursor: pointer;
        }

        .progress-indicator {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .page-title {
          color: #F5F5F5;
          font-size: 32px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 40px;
        }

        .create-account-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 520px;
          margin: 0 auto;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-row {
          display: flex;
          gap: 20px;
        }

        .form-row .form-group {
          flex: 1;
        }

        label {
          color: #F5F5F5;
          font-size: 14px;
        }

        input {
          width: 100%;
          height: 53px;
          border-radius: 10px;
          background-color: #D6E6E8;
          padding: 0 16px;
          border: none;
          font-size: 16px;
        }

        input:focus {
          outline: none;
          box-shadow: 0 0 0 2px #87B5BA;
        }

        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }

        .next-button {
          width: 248px;
          height: 61px;
          background-color: #FC7853;
          border-radius: 10px;
          color: #FFF;
          font-size: 20px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .next-button:hover {
          background-color: #e66a47;
        }

        .next-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px #FFF;
        }
      `}</style>
    </div>
  );
}

export default Step2;
