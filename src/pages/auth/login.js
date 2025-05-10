import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSignInAlt, faArrowLeft, faCheck, faExclamationTriangle, faUserPlus, faGamepad } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../hooks/authContext';
import FormInput from "../../components/FormInput";
import ActionButton from "../../components/ActionButton";

export default function Login() {
  const [postData, setPostData] = useState({
    username: '',
    password: '',
  });

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

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

    if (postData.username.trim() === "" || postData.password.trim() === "") {
      showErrorSuccess("All Entries Required!", false, true);
      setIsLoading(false);
      return;
    };

    try {
      const response = await login(postData);

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
        return navigate("/game/menu");
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-8">
      <div className="w-full max-w-md bg-gradient-to-br from-primary via-secondary to-tertiary rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6 border-b border-accent">
          <div className="flex justify-between items-center">
            <h1 className="text-fontColor text-3xl font-bold">Welcome Back</h1>
            <Link to="/" className="text-accent hover:text-fontColor transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back
            </Link>
          </div>
          <p className="text-fontColor opacity-80 mt-2">Login to continue your math adventure</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="mb-4">
            <FormInput
              icon={faUser}
              type="text"
              name="username"
              placeholder="Username"
              value={postData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <FormInput
              icon={faLock}
              type="password"
              name="password"
              placeholder="Password"
              value={postData.password}
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

          <div className="flex justify-end mb-2">
            <Link to="/auth/forgot" className="text-accent hover:text-fontColor text-sm transition-colors">
              Forgot password?
            </Link>
          </div>

          <ActionButton
            text="Login"
            icon={faSignInAlt}
            type="submit"
            fullWidth
            isLoading={isLoading}
            variant="primary"
            size="lg"
          />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-accent opacity-30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-tertiary text-fontColor">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ActionButton
              text="Create Account"
              icon={faUserPlus}
              onClick={() => navigate("/auth/sign-up")}
              variant="outline"
              size="md"
            />

            <ActionButton
              text="Play as Guest"
              icon={faGamepad}
              onClick={() => navigate("/game/menu")}
              variant="secondary"
              size="md"
            />
          </div>
        </form>

        <div className="bg-secondary bg-opacity-50 p-4 text-center border-t border-accent">
          <p className="text-fontColor text-sm">
            Need help? <Link to="/support" className="text-accent hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
