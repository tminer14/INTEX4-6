import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import "../styles/CreateAccountPage.css";

function CreateAccountStep4() {
  const navigate = useNavigate();
  // In a real application, this data would come from a context, redux store, or passed via props
  // For this example, we're using mock data
  const [userData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    age: "28",
    gender: "Male",
    streetAddress: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    otherServices: ["Netflix", "Hulu", "Amazon Prime"],
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Account creation finalized");
    // Navigate to final success step
    navigate("/signup/step5");
  };

  const handleEdit = (field: string) => {
    // Logic to navigate to the appropriate step for editing
    console.log(`Edit ${field}`);

    // Basic routing logic based on field type
    if (["firstName", "lastName", "email", "phone"].includes(field)) {
      navigate("/signup/step1");
    } else if (
      ["age", "gender", "streetAddress", "city", "state", "zip"].includes(field)
    ) {
      navigate("/signup/step2");
    } else if (field === "otherServices") {
      navigate("/signup/step3");
    }
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
              <div className="review-value">{userData.firstName}</div>
              <div
                className="edit-icon"
                onClick={() => handleEdit("firstName")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">Street Address:</div>
              <div className="review-value">{userData.streetAddress}</div>
              <div
                className="edit-icon"
                onClick={() => handleEdit("streetAddress")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">Last Name:</div>
              <div className="review-value">{userData.lastName}</div>
              <div className="edit-icon" onClick={() => handleEdit("lastName")}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">City:</div>
              <div className="review-value">{userData.city}</div>
              <div className="edit-icon" onClick={() => handleEdit("city")}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">Email:</div>
              <div className="review-value">{userData.email}</div>
              <div className="edit-icon" onClick={() => handleEdit("email")}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">State:</div>
              <div className="review-value">{userData.state}</div>
              <div className="edit-icon" onClick={() => handleEdit("state")}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">Phone Number:</div>
              <div className="review-value">{userData.phone}</div>
              <div className="edit-icon" onClick={() => handleEdit("phone")}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">Zip:</div>
              <div className="review-value">{userData.zip}</div>
              <div className="edit-icon" onClick={() => handleEdit("zip")}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">Age:</div>
              <div className="review-value">{userData.age}</div>
              <div className="edit-icon" onClick={() => handleEdit("age")}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">Other Services:</div>
              <div className="review-value">
                {userData.otherServices.join(", ")}
              </div>
              <div
                className="edit-icon"
                onClick={() => handleEdit("otherServices")}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>

            <div className="review-item">
              <div className="review-label">Gender:</div>
              <div className="review-value">{userData.gender}</div>
              <div className="edit-icon" onClick={() => handleEdit("gender")}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 14.375V17.5H5.625L14.8417 8.28333L11.7167 5.15833L2.5 14.375ZM17.2583 5.86667C17.5833 5.54167 17.5833 5.01667 17.2583 4.69167L15.3083 2.74167C14.9833 2.41667 14.4583 2.41667 14.1333 2.74167L12.6083 4.26667L15.7333 7.39167L17.2583 5.86667Z"
                    fill="#87B5BA"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button type="button" onClick={handleSubmit} className="next-button">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountStep4;
