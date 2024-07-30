import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTaskContext } from "../../context/TaskContext";
import apiServices from "../../services/apiService";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { roleList, updateContextData } = useTaskContext();
  const navigate = useNavigate();

  useEffect(() => {
    updateContextData();
  }, [updateContextData]);

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const validateUsername = () => {
    if (username.trim() === "") {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
  };

  const handleRoleChange = (roleid) => {
    setSelectedRole(roleid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateUsername();

    if (!emailError && !passwordError && !confirmPasswordError && !usernameError) {
      const userData = {
        username,
        email,
        password,
        role_id: selectedRole,
      };

      apiServices
        .post("/register", userData)
        .then(() => {
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setSelectedRole("");
          setRegistrationSuccess(true);
        })
        .catch((error) => {
          console.error("Registration error:", error);
          // Handle error scenarios if needed
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setRegistrationSuccess(false);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-neutral rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={validateUsername}
              required
            />
          </label>
          {usernameError && <p className="text-xs text-red-500">{usernameError}</p>}

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
              required
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
              required
            />
          </label>
          {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validateConfirmPassword}
              required
            />
          </label>
          {confirmPasswordError && <p className="text-xs text-red-500">{confirmPasswordError}</p>}

          <div className="mt-4">
            <select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="input input-bordered w-full"
              required
            >
              <option value="">Select a role</option>
              {roleList.map((role) => (
                <option key={role.roleid} value={role.roleid}>
                  {role.rolename}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <Link to="/login" className="link link-hover">
              Already registered? Login here
            </Link>
          </div>
        </form>
      </div>

      {registrationSuccess && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Registration Successful</h3>
            <p className="py-4">Successfully registered!</p>
            <div className="modal-action">
              <button className="btn" onClick={handleModalClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
