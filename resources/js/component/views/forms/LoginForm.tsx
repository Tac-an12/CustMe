import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user?.role?.rolename) {
        case "Admin":
          navigate("/admin");
          break;
        case "User":
          navigate("/user");
          break;
        case "Graphic Designer":
          navigate("/graphic-designer");
          break;
        case "Printing Shop":
          navigate("/printing-shop");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, navigate]);

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      try {
        const isLoggedIn = await login(email, password);
        if (!isLoggedIn) {
          setEmailError("Invalid email or password");
          setPasswordError("Invalid email or password");
        }
      } catch (error) {
        console.error("An error occurred during login:", error);
        setEmailError("An unexpected error occurred. Please try again later.");
        setPasswordError("An unexpected error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-neutral rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                disabled={isLoading}
              />
            </label>
            {emailError && <p className="text-xs text-red-500">{emailError}</p>}

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                disabled={isLoading}
              />
            </label>
            {passwordError && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}

            <Link to="/register" className="link link-warning">
              Not yet Registered? Register here
            </Link>

            <button
              type="submit"
              className="btn btn-secondary btn-xs sm:btn-sm md:btn-sm lg:btn-md"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner loading-md"></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
