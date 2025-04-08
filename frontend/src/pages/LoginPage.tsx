import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/LoginPage.css";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔥 Send real login request to backend
      const response = await axios.post(
        "https://localhost:7026/api/account/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      // Save token
      localStorage.setItem("authToken", token);

      // Set points cookie if not already set
      if (!Cookies.get("userPoints")) {
        Cookies.set("userPoints", "100", { expires: 7 });
      }

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="login-container">
        <div className="login-card">
          <div className="back-button" onClick={handleBackClick}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38 24H10M10 24L24 38M10 24L24 10"
                stroke="#1E1E1E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="login-content">
            <h1 className="login-title">Welcome Back!</h1>
            <p className="login-subtitle">
              Let's get you watching your new favorite show.
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-help">
                <a href="#" className="help-link">
                  Need help logging in?
                </a>
              </div>

              <button type="submit" className="sign-in-btn">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
