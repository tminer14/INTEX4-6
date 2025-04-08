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
    confirmPassword: "",
    gender: "",
    age: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    streamingServices: [] as string[],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleFinalSubmit = async () => {
    const payload = {
      Name: formData.fullName,
      Email: formData.email,
      Phone: formData.phone,
      Password: formData.password,
      Age: formData.age,
      Gender: formData.gender,
      City: formData.address.city,
      State: formData.address.state,
      Zip: formData.address.zip,
      Netflix: formData.streamingServices?.includes("Netflix") || false,
      AmazonPrime:
        formData.streamingServices?.includes("Amazon Prime") || false,
      DisneyPlus: formData.streamingServices?.includes("Disney Plus") || false,
      ParamountPlus:
        formData.streamingServices?.includes("Paramount Plus") || false,
      Max: formData.streamingServices?.includes("Max") || false,
      Hulu: formData.streamingServices?.includes("Hulu") || false,
      AppleTV: formData.streamingServices?.includes("Apple TV") || false,
      Peacock: formData.streamingServices?.includes("Peacock") || false,
    };

    try {
      await toast.promise(axios.post("/api/tessaaccount/register", payload), {
        loading: "✨ Creating your account...",
        success: "🎉 Account created successfully!",
        error: "🚫 Account creation failed. Please try again.",
      });
      navigate("/login");
    } catch (error) {
      console.error("Unexpected error during final submit:", error);
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
          setStep={setStep} // <-- PASS THIS
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
