import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function CreateAccountPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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
    // Handle form submission
    console.log("Form submitted:", formData);
    // Navigate to next step
    // navigate('/next-step');
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
            height="35"
            viewBox="0 0 771 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="17.5"
              cy="17.5"
              r="16.5"
              fill="#87B5BA"
              stroke="#237881"
              strokeWidth="2"
            />
            <circle cx="753.5" cy="17.5" r="17.5" fill="#87B5BA" />
            <circle cx="196.5" cy="17.5" r="17.5" fill="#87B5BA" />
            <circle cx="375.5" cy="17.5" r="17.5" fill="#87B5BA" />
            <circle cx="564.5" cy="17.5" r="17.5" fill="#87B5BA" />
          </svg>
        </div>

        <h1 className="page-title">Create An Account</h1>

        <form onSubmit={handleSubmit} className="create-account-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
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

export default CreateAccountPage;
