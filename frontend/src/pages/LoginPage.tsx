import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/LoginPage.css";
import Cookies from "js-cookie"; // NEW: import js-cookie

function LoginPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted");

    // NEW: Set initial points if not already set
    if (!Cookies.get("userPoints")) {
      Cookies.set("userPoints", "100", { expires: 7 }); // Start with 100 points, expires in 7 days
      console.log("Points cookie set to 100");
    }

    // Redirect to homepage or wherever you want
    navigate("/dashboard");
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
              ></path>
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
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
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
