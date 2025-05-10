import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faKey,
  faArrowLeft,
  faCheck,
  faExclamationTriangle,
  faIdCard,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

import api from '../../hooks/api';
import FormInput from "../../components/FormInput";
import ActionButton from "../../components/ActionButton";

export default function Forgot() {
  const [forgotType, setForgotType] = useState(null); // 'username' or 'password'
  const [postData, setPostData] = useState({
    username: '',
    emailAddress: '',
  });

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (forgotType === 'password' && postData.username.trim() === "") {
      showErrorSuccess("Username is required to reset your password!", false, true);
      setIsLoading(false);
      return;
    }

    if (forgotType === 'username' && postData.emailAddress.trim() === "") {
      showErrorSuccess("Email address is required to recover your username!", false, true);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/forgot', {
        ...postData,
        forgotType
      });

      if (response.status === 201) {
        showErrorSuccess(response.data.message, true, false);
      } else {
        showErrorSuccess(response.data.message, false, true);
      };
    } catch (err) {
      console.error(err);
      showErrorSuccess(err.message, false, true);
    } finally {
      setIsLoading(false);
    }
  };

  const showErrorSuccess = (msg, success, fail) => {
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

  // Initial selection screen
  if (!forgotType) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-8">
        <div className="w-full max-w-md bg-gradient-to-br from-primary via-secondary to-tertiary rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 border-b border-accent">
            <div className="flex justify-between items-center">
              <h1 className="text-fontColor text-3xl font-bold">Account Recovery</h1>
              <Link to="/auth/login" className="text-accent hover:text-fontColor transition-colors">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to Login
              </Link>
            </div>
            <p className="text-fontColor opacity-80 mt-2">What do you need help with?</p>
          </div>

          <div className="p-8 space-y-6">
            <div
              onClick={() => setForgotType('username')}
              className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-accent"
            >
              <div className="flex items-center">
                <div className="bg-accent bg-opacity-20 p-4 rounded-full mr-4">
                  <FontAwesomeIcon icon={faIdCard} className="text-accent text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fontColor mb-1">I forgot my username</h3>
                  <p className="text-fontColor opacity-80">We'll help you recover your username using your email address</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setForgotType('password')}
              className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-accent"
            >
              <div className="flex items-center">
                <div className="bg-accent bg-opacity-20 p-4 rounded-full mr-4">
                  <FontAwesomeIcon icon={faKey} className="text-accent text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-fontColor mb-1">I forgot my password</h3>
                  <p className="text-fontColor opacity-80">We'll send you a password reset link to your email address</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link to="/auth/login" className="text-accent hover:text-fontColor transition-colors">
                Return to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Username or password recovery form
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-8">
      <div className="w-full max-w-md bg-gradient-to-br from-primary via-secondary to-tertiary rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 border-b border-accent">
          <div className="flex justify-between items-center">
            <h1 className="text-fontColor text-3xl font-bold">
              {forgotType === 'username' ? 'Recover Username' : 'Reset Password'}
            </h1>
            <button
              onClick={() => setForgotType(null)}
              className="text-accent hover:text-fontColor transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back
            </button>
          </div>
          <p className="text-fontColor opacity-80 mt-2">
            {forgotType === 'username'
              ? 'Enter your email address to recover your username'
              : 'Enter your username to reset your password'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {forgotType === 'password' && (
            <div className="mb-4">
              <FormInput
                icon={faUser}
                type="text"
                name="username"
                placeholder="Your Username"
                value={postData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {forgotType === 'username' && (
            <div className="mb-4">
              <FormInput
                icon={faEnvelope}
                type="email"
                name="emailAddress"
                placeholder="Your Email Address"
                value={postData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>
          )}

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

          <div className="pt-4">
            <ActionButton
              text={forgotType === 'username' ? 'Recover Username' : 'Reset Password'}
              icon={forgotType === 'username' ? faIdCard : faKey}
              type="submit"
              fullWidth
              isLoading={isLoading}
              variant="primary"
              size="lg"
            />
          </div>

          <div className="text-center mt-6">
            <p className="text-fontColor">
              Remember your credentials?{" "}
              <Link to="/auth/login" className="text-accent hover:text-white font-bold transition-colors">
                Login
              </Link>
            </p>
          </div>
        </form>

        <div className="bg-secondary bg-opacity-50 p-4 text-center border-t border-accent">
          <p className="text-fontColor text-sm flex items-center justify-center">
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-accent" />
            Need more help? <Link to="/support" className="text-accent hover:underline ml-1">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
