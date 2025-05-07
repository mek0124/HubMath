import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from '../../hooks/authContext';


export default function SignUp() {
  const [postData, setPostData] = useState({
    username: '',
    password: '',
  });

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [resultText, setResultText] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPostData({
      postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (postData.username.trim() === "" || postData.password.trim() === "") {
      showErrorSuccess("All Entries Required!", false, true);
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
    };
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

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <form
        onSubmit={handleSubmit} 
        className="flex flex-col items-center justify-evenly w-1/3 h-1/2 border-2 border-accent rounded-xl bg-tertiary p-2">
        <div className="flex flex-col items-center justify-center w-full">
          <h3 className="font-bold text-fontColor text-3xl">
            Login To Continue
          </h3>
        </div>
        
        <div className="flex flex-col items-center justify-evenly w-full flex-grow">
          <div className="flex flex-row items-center justify-center w-full">
            <input
              placeholder="Enter Username..."
              type="text"
              name="username"
              value={postData.username}
              onChange={handleChange}
              className="text-xl text-fontColor bg-gray-500 border-2 border-secondary rounded-xl p-1 w-[50%] text-center transform transition duration-300 ease-in-out hover:bg-secondary hover:shadow-lg hover:scale-105 focus:bg-accent focus:text-black"
            />
          </div>

          <div className="flex flex-row items-center justify-center w-full">
            <input
              placeholder="Enter Password..."
              type="password"
              name="password"
              value={postData.password}
              onChange={handleChange}
              className="text-xl text-fontColor bg-gray-500 border-2 border-secondary rounded-xl p-1 w-[50%] text-center transform transition duration-300 ease-in-out hover:bg-secondary hover:shadow-lg hover:scale-105 focus:bg-accent focus:text-black"
            />
          </div>
        </div>

        {isError && (
          <div className="flex flex-col items-center justify-center w-[50%] bg-red-400 text-black rounded-xl">
            {resultText}
          </div>
        )}

        {isSuccess && (
          <div className="flex flex-col items-center justify-center w-[50%] bg-green-400 text-black rounded-xl">
            {resultText}
          </div>
        )}

        <div className="flex flex-col items-center justify-evenly w-full flex-shrink-0 mt-2">
          <div className="flex flex-row items-center justify-evenly w-full mb-2">
            <button 
              type="button"
              onClick={() => navigate("/")}
              className="w-48 h-12 rounded-full bg-accent text-fontColor border-2 border-primary transform transition duration-300 ease-in-out hover:border-accent hover:bg-secondary hover:shadow-lg hover:scale-105 text-xl font-bold text-center">
              
              Cancel
            </button>

            <button
              type="submit"
              className="w-48 h-12 rounded-full bg-accent text-fontColor border-2 border-primary transform transition duration-300 ease-in-out hover:border-accent hover:bg-secondary hover:shadow-lg hover:scale-105 text-xl font-bold text-center">

              Create
            </button>
          </div>

          <div className="flex flex-row items-center justify-evenly w-full">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-48 h-12 rounded-full bg-accent text-fontColor border-2 border-primary transform transition duration-300 ease-in-out hover:border-accent hover:bg-secondary hover:shadow-lg hover:scale-105 text-xl font-bold text-center">

              Forgot
            </button>

            <button
              type="button"
              onClick={() => navigate("/auth/sign-up")}
              className="w-48 h-12 rounded-full bg-accent text-fontColor border-2 border-primary transform transition duration-300 ease-in-out hover:border-accent hover:bg-secondary hover:shadow-lg hover:scale-105 text-xl font-bold text-center">

              New Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
