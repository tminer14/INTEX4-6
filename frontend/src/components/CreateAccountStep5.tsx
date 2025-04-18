import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Header from "./Header";
import "../styles/CreateAccountPage.css";

interface CreateAccountStep5Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: () => Promise<void>;
  prevStep: () => void;
}

function CreateAccountStep5({ formData }: CreateAccountStep5Props) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitFinal = async () => {
    setLoading(true);
    try {
      const payload = {
        Name: formData.fullName,
        Phone: formData.phone,
        Email: formData.email,
        Password: formData.password, // Needed for IdentityUser
        Age: parseInt(formData.age) || 0,
        Gender: formData.gender,
        City: formData.address.city || "Unknown",
        State: formData.address.state || "Unknown",
        Zip: formData.address?.zip ? parseInt(formData.address.zip, 10) : 0,
        Netflix: formData.streamingServices?.includes("Netflix") ? 1 : 0,
        AmazonPrime: formData.streamingServices?.includes("Amazon Prime")
          ? 1
          : 0,
        DisneyPlus: formData.streamingServices?.includes("Disney Plus") ? 1 : 0,
        ParamountPlus: formData.streamingServices?.includes("Paramount Plus")
          ? 1
          : 0,
        Max: formData.streamingServices?.includes("Max") ? 1 : 0,
        Hulu: formData.streamingServices?.includes("Hulu") ? 1 : 0,
        AppleTV: formData.streamingServices?.includes("Apple TV") ? 1 : 0,
        Peacock: formData.streamingServices?.includes("Peacock") ? 1 : 0,
      };

      await toast.promise(axios.post("/api/TessaAccount/register", payload), {
        loading: "Creating your account...",
        success: "Account created successfully! 🎉",
        error: "Account creation failed. 🚫 Please try again.",
      });

      navigate("/login");
    } catch (error: any) {
      console.error("Error during final account creation:", error);

      if (error.response && error.response.status === 400) {
        const serverErrors = error.response.data;

        // Check if server error mentions email constraint
        if (Array.isArray(serverErrors)) {
          const duplicateEmailError = serverErrors.find((msg: string) =>
            msg.toLowerCase().includes("email")
          );

          if (duplicateEmailError) {
            toast.error(
              "Email already registered. Please log in or use a different email."
            );
            return;
          }
        }
      }

      // Fallback generic error
      toast.error("Account creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account-container">
      <Header />
      <div className="create-account-content">
        <div className="back-button" style={{ visibility: "hidden" }}></div>

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

          <h1 className="welcome-title">
            Welcome to the club, {formData.fullName.split(" ")[0]}!
          </h1>
          <p className="welcome-subtitle">
            One last step — click below to finish setting up your account.
          </p>

          <button
            className="login-button"
            onClick={handleSubmitFinal}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : "Finish Account Setup"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountStep5;
