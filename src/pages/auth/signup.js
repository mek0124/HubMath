import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from '../../hooks/api';


export default function SignUp() {
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [resultText, setResultText] = useState('');

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

    if (newUser.username.trim() === "" || newUser.password.trim() === "") {
      showErrorSuccess("All Entries Required!", false, true);
    };

    if (newUser.password !== confirmPassword) {
      showErrorSuccess("Passwords Do Not Match", false, true);
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
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <form 
        className="flex flex-col items-center justify-evenly w-1/3 h-[350px] border-2 border-accent rounded-xl bg-tertiary p-2"
        onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="font-bold text-fontColor text-3xl">
            Create A New Account
          </h1>
        </div>

        <div className="flex flex-col items-center justify-evenly w-full flex-grow">
          <div className="flex flex-row items-center justify-center w-full">
            <input
              placeholder="Create Username"
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleChange}
              className="text-xl text-fontColor bg-gray-500 border-2 border-secondary rounded-xl p-1 w-[50%] text-center transform transition duration-300 ease-in-out hover:bg-secondary hover:shadow-lg hover:scale-105 focus:bg-accent focus:text-black"
              
            />
          </div>

          <div className="flex flex-row items-center justify-center w-full">
            <input
              placeholder="Create Password"
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              className="text-xl text-fontColor bg-gray-500 border-2 border-secondary rounded-xl p-1 w-[50%] text-center transform transition duration-300 ease-in-out hover:bg-secondary hover:shadow-lg hover:scale-105 focus:bg-accent focus:text-black"
              
            />
          </div>

          <div className="flex flex-row items-center justify-center w-full">
            <input
              placeholder="Confirm Password"
              type="confirmPassword"
              name="confirmPassword"
              value={newUser.confirmPassword}
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

        <div className="flex flex-row items-center justify-evenly w-full flex-shrink-0">
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
      </form>
    </div>
  );
};
