import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted");
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
