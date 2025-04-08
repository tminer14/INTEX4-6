import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/CreateAccountPage.css";

interface CreateAccountStep4Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void; // <-- ADD THIS
}


function CreateAccountStep4({
  formData,
  setFormData,
  nextStep,
  prevStep,
  setStep,
}: CreateAccountStep4Props) {
  const navigate = useNavigate();

  const firstName = formData.fullName?.split(" ")[0] || "";
  const lastName = formData.fullName?.split(" ")[1] || "";

  const handleEdit = (field: string) => {
    if (["firstName", "lastName", "email", "phone"].includes(field)) {
      setStep(1);
    } else if (
      ["age", "gender", "street", "city", "state", "zip"].includes(field)
    ) {
      setStep(2);
    } else if (field === "otherServices") {
      setStep(3);
    }
  };

  return (
    <div className="create-account-container">
      <Header />
      <div className="create-account-content">
        <div onClick={prevStep} className="back-button">
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
            <circle cx="375.5" cy="17.5" r="17.5" fill="#237881"></circle>
            <circle
              cx="564.5"
              cy="17.5"
              r="16"
              fill="#87B5BA"
              stroke="#237881"
              strokeWidth="3"
            ></circle>
          </svg>
        </div>

        <div className="form-container review-container">
          <h1 className="form-title">Please Review Your Information</h1>
          <p className="review-subtitle">
            Click on the pencil to edit anything
          </p>

          <div className="review-grid">
            <div className="review-item">
              <div className="review-label">First Name:</div>
              <div className="review-value">{firstName}</div>
              <div
                className="edit-icon"
                onClick={() => handleEdit("firstName")}
              >
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">Last Name:</div>
              <div className="review-value">{lastName}</div>
              <div className="edit-icon" onClick={() => handleEdit("lastName")}>
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">Email:</div>
              <div className="review-value">{formData.email}</div>
              <div className="edit-icon" onClick={() => handleEdit("email")}>
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">Phone Number:</div>
              <div className="review-value">{formData.phone}</div>
              <div className="edit-icon" onClick={() => handleEdit("phone")}>
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">Street Address:</div>
              <div className="review-value">{formData.address?.street}</div>
              <div className="edit-icon" onClick={() => handleEdit("street")}>
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">City:</div>
              <div className="review-value">{formData.address?.city}</div>
              <div className="edit-icon" onClick={() => handleEdit("city")}>
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">State:</div>
              <div className="review-value">{formData.address?.state}</div>
              <div className="edit-icon" onClick={() => handleEdit("state")}>
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">Zip:</div>
              <div className="review-value">{formData.address?.zip}</div>
              <div className="edit-icon" onClick={() => handleEdit("zip")}>
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">Age:</div>
              <div className="review-value">{formData.age}</div>
              <div className="edit-icon" onClick={() => handleEdit("age")}>
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">Gender:</div>
              <div className="review-value">{formData.gender}</div>
              <div className="edit-icon" onClick={() => handleEdit("gender")}>
                ✏️
              </div>
            </div>
            <div className="review-item">
              <div className="review-label">Other Services:</div>
              <div className="review-value">
                {formData.streamingServices?.join(", ")}
              </div>
              <div
                className="edit-icon"
                onClick={() => handleEdit("otherServices")}
              >
                ✏️
              </div>
            </div>
          </div>

          <button onClick={nextStep} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountStep4;
