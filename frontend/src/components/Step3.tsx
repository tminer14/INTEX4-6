import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface StreamingService {
  name: string;
  checked: boolean;
}

function Step3() {
  const navigate = useNavigate();
  const [streamingServices, setStreamingServices] = useState<
    StreamingService[]
  >([
    { name: "Netflix", checked: false },
    { name: "Paramount Plus", checked: false },
    { name: "Amazon Prime", checked: false },
    { name: "Max", checked: false },
    { name: "Hulu", checked: false },
    { name: "Apple TV", checked: false },
  ]);

  const handleCheckboxChange = (index: number) => {
    setStreamingServices((prev) => {
      const newServices = [...prev];
      newServices[index] = {
        ...newServices[index],
        checked: !newServices[index].checked,
      };
      return newServices;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedServices = streamingServices
      .filter((service) => service.checked)
      .map((service) => service.name);
    console.log("Selected streaming services:", selectedServices);
    // Navigate to next step or complete registration
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
            <circle cx="17.5" cy="17.5" r="17.5" fill="#87B5BA" />
            <circle
              cx="17.5"
              cy="17.5"
              r="17.5"
              fill="black"
              fillOpacity="0.2"
            />
            <circle cx="196.5" cy="17.5" r="17.5" fill="#87B5BA" />
            <circle
              cx="196.5"
              cy="17.5"
              r="17.5"
              fill="black"
              fillOpacity="0.2"
            />
            <circle
              cx="375.5"
              cy="17.5"
              r="16.5"
              fill="#87B5BA"
              stroke="#237881"
              strokeWidth="2"
            />
            <circle cx="564.5" cy="17.5" r="17.5" fill="#87B5BA" />
            <circle cx="753.5" cy="17.5" r="17.5" fill="#87B5BA" />
          </svg>
        </div>

        <h1 className="page-title">Create An Account</h1>

        <div className="streaming-services-section">
          <h2 className="section-title">
            Select all other streaming services you have:
          </h2>
          <p className="section-subtitle">
            This helps us show you unique films.
          </p>

          <form onSubmit={handleSubmit} className="streaming-services-form">
            <div className="checkboxes-container">
              {streamingServices.map((service, index) => (
                <label key={service.name} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={service.checked}
                    onChange={() => handleCheckboxChange(index)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">{service.name}</span>
                </label>
              ))}
            </div>

            <div className="button-container">
              <button type="submit" className="next-button">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .create-account-container {
          display: flex;
          flex-direction: column;
          background-color: #022B3B;
          font-family: Inter, sans-serif;
          padding: 50px;
          min-height: 100vh;
          color: #F5F5F5;
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
          margin-bottom: 40px;
        }

        .page-title {
          font-size: 32px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 24px;
          color: #F5F5F5;
        }

        .streaming-services-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 422px;
          margin: 0 auto;
        }

        .section-title {
          font-size: 20px;
          margin-bottom: 10px;
          text-align: center;
          color: #F5F5F5;
        }

        .section-subtitle {
          font-size: 12px;
          margin-bottom: 30px;
          text-align: center;
          color: #F5F5F5;
        }

        .streaming-services-form {
          width: 100%;
        }

        .checkboxes-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .checkbox-input {
          width: 19px;
          height: 19px;
          border: 1px solid #AAA9A9;
          background-color: #BED5EA;
          cursor: pointer;
          margin: 0;
        }

        .checkbox-input:checked {
          border-color: #BED5EA;
          background-color: #BED5EA;
        }

        .checkbox-text {
          font-size: 14px;
          color: #F5F5F5;
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

export default Step3;
