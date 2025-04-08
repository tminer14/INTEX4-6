import { useState } from "react";
import CreateAccountStep1 from "./CreateAccountStep1";
import CreateAccountStep2 from "./CreateAccountStep2";
import CreateAccountStep3 from "./CreateAccountStep3";
import CreateAccountStep4 from "./CreateAccountStep4";
import CreateAccountStep5 from "./CreateAccountStep5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "https://localhost:7026";
axios.defaults.withCredentials = true;

function CreateAccountWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    age: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleFinalSubmit = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("🚫 Email and password are required.");
      return;
    }

    try {
      const result = await toast.promise(
        axios.post("/api/account/register", { email, password }),
        {
          loading: "✨ Creating your account...",
          success: "🎉 Account created successfully!",
          error: (err) => {
            console.error("Registration error:", err);
            if (err.response) {
              if (
                err.response.data &&
                Array.isArray(err.response.data) &&
                err.response.data[0]?.description
              ) {
                return `🚫 ${err.response.data[0].description}`;
              } else if (typeof err.response.data === "string") {
                return `🚫 ${err.response.data}`;
              } else {
                return "🚫 Registration failed. Please try again.";
              }
            } else {
              return "🚫 Network error. Please try again.";
            }
          },
        },
        {
          success: {
            duration: 4000,
            icon: "🔥",
          },
          error: {
            duration: 5000,
            icon: "❗",
          },
          loading: {
            duration: Infinity, // Loading stays until finished
          },
        }
      );

      // 🌟 SUCCESS CASE - "result" contains the Axios response
      localStorage.setItem("token", result.data.token);

      toast.success("🚀 You are now logged in! Redirecting...", {
        duration: 3000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Unexpected error outside toast.promise:", error);
      // No manual toast needed because toast.promise already showed the error
    }
  };

  return (
    <>
      {step === 1 && (
        <CreateAccountStep1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <CreateAccountStep2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <CreateAccountStep3
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <CreateAccountStep4
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && (
        <CreateAccountStep5
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleFinalSubmit}
          prevStep={prevStep}
        />
      )}
    </>
  );
}

export default CreateAccountWizard;
