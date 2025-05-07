import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Panel1 from "../../components/panel1";
import Panel2 from "../../components/panel2";


export default function GameMenu() {
  const [gameInfo, setGameInfo] = useState({
    mode: '',
    difficulty: '',
    numOfQuestions: 0,
  });

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [resultText, setResultText] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGameInfo({
      ...gameInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (gameInfo.mode.trim() === "" || gameInfo.difficulty.trim() === "" || gameInfo.numOfQuestions === 0) {
      showErrorSuccess("All Options Are Required!", false, true);
    };

    return navigate("/game/play", { state: { gameInfo }});
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
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="font-bold text-3xl text-fontColor text-center w-full pt-4">
          Let's Play A Game!!!
        </h1>
      </div>

      <div className="flex flex-col items-center justify-evenly w-full flex-grow">
        <div className="flex flex-row items-center justify-evenly w-full">
          <Panel1 handleChange={handleChange} />
          <Panel2 handleChange={handleChange} />
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

        <div className="flex flex-row items-center justify-evenly w-1/3 flex-shrink-0">
          <button
            onClick={handleSubmit}
            className="w-48 h-12 rounded-full bg-accent text-fontColor border-2 border-primary transform transition duration-300 ease-in-out hover:border-accent hover:bg-secondary hover:shadow-lg hover:scale-105 text-xl font-bold text-center">

            Play!
          </button>
        </div>
      </div>
    </div>
  );
};
