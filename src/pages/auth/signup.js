import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUserPlus, faArrowLeft, faCheck, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

import api from '../../hooks/api';
import FormInput from "../../components/FormInput";
import ActionButton from "../../components/ActionButton";

export default function SignUp() {
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [resultText, setResultText] = useState('');

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setNewUser({
        ...newUser,
        [name]: value,
      });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (newUser.username.trim() === "" || newUser.password.trim() === "") {
      showErrorSuccess("All Entries Required!", false, true);
      setIsLoading(false);
      return;
    };

    if (newUser.password !== confirmPassword) {
      showErrorSuccess("Passwords Do Not Match", false, true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/sign-up", newUser);

      if (response.status === 201) {
        showErrorSuccess(response.data.message, true, false);
      } else {
        showErrorSuccess(response.data.message, false, true);
      }
    } catch (err) {
      console.error(err);
      showErrorSuccess(err.message, false, true);
    } finally {
      setIsLoading(false);
    }
  };

  const showErrorSuccess = (msg = "Sum Ting Wong", success, fail) => {
    setResultText(msg);

    if (!success) {
      setIsError(true);
    } else {
      setIsSuccess(true);
    }

    setTimeout(() => {
      if (isError) {
        setIsError(false);
      } else if (isSuccess) {
        setIsSuccess(false);
        return navigate("/auth/login");
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-8">
      <div className="w-full max-w-md bg-gradient-to-br from-primary via-secondary to-tertiary rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 border-b border-accent">
          <div className="flex justify-between items-center">
            <h1 className="text-fontColor text-3xl font-bold">Create Account</h1>
            <Link to="/" className="text-accent hover:text-fontColor transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back
            </Link>
          </div>
          <p className="text-fontColor opacity-80 mt-2">Join Hub Math and start your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="mb-4">
            <FormInput
              icon={faUser}
              type="text"
              name="username"
              placeholder="Create Username"
              value={newUser.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <FormInput
              icon={faLock}
              type="password"
              name="password"
              placeholder="Create Password"
              value={newUser.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <FormInput
              icon={faLock}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error and Success Messages */}
          {isError && (
            <div className="flex items-center p-3 mb-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-100 animate-fadeIn">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 text-red-300" />
              <span>{resultText}</span>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center p-3 mb-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-100 animate-fadeIn">
              <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-300" />
              <span>{resultText}</span>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <ActionButton
              text="Cancel"
              icon={faTimes}
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="flex-1"
            />

            <ActionButton
              text="Create Account"
              icon={faUserPlus}
              type="submit"
              isLoading={isLoading}
              variant="primary"
              size="lg"
              className="flex-1"
            />
          </div>

          <div className="text-center mt-6">
            <p className="text-fontColor">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-accent hover:text-white font-bold transition-colors">
                Login
              </Link>
            </p>
          </div>
        </form>

        <div className="bg-secondary bg-opacity-50 p-4 text-center border-t border-accent">
          <p className="text-fontColor text-sm">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
