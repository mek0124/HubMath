import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faGamepad,
  faBrain,
  faExclamationTriangle,
  faHome,
  faUserCircle,
  faSignOutAlt,
  faCog,
  faPlus,
  faMinus,
  faTimes,
  faDivide,
  faSmile,
  faMeh,
  faFrown,
  faSkull,
  faShuffle,
  faInfinity,
  faClock,
  faFire,
  faBolt,
  faVolumeHigh,
  faVolumeMute,
  faRankingStar,
  faMedal,
  faBell,
  faBellSlash,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

import Panel1 from "../../components/panel1";
import Panel2 from "../../components/panel2";
import Panel3 from "../../components/panel3";
import ActionButton from "../../components/ActionButton";
import { useAuth } from "../../hooks/authContext";

// Helper function to format time in seconds to MM:SS format
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function GameMenu() {
  const [gameInfo, setGameInfo] = useState({
    mode: '',
    difficulty: '',
    questions: '10',
    time: '',
    sound: 'on',
    leaderboard: 'on',
    notifications: '',
    hints: ''
  });

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState('');
  const [selectedPanel, setSelectedPanel] = useState(null);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Animation effect for panels
  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedPanel('mode');
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGameInfo({
      ...gameInfo,
      [name]: value,
    });

    // Auto-advance to next panel
    if (name === 'mode' && selectedPanel === 'mode') {
      setTimeout(() => setSelectedPanel('difficulty'), 300);
    } else if (name === 'difficulty' && selectedPanel === 'difficulty') {
      setTimeout(() => setSelectedPanel('settings'), 300);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (gameInfo.mode.trim() === "" || gameInfo.difficulty.trim() === "") {
      showError("Please select both a game mode and difficulty level!");
      setIsLoading(false);
      return;
    }

    // Make sure questions is set
    if (!gameInfo.questions) {
      setGameInfo({...gameInfo, questions: '10'});
    }

    // Short delay for better UX
    setTimeout(() => {
      setIsLoading(false);
      navigate("/game/play", { state: { gameInfo }});
    }, 500);
  };

  const showError = (msg) => {
    setResultText(msg);
    setIsError(true);

    setTimeout(() => {
      setIsError(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-2">
      <div className="w-full max-w-7xl bg-gradient-to-br from-primary via-secondary to-tertiary rounded-2xl shadow-2xl overflow-hidden mx-4">
        <div className="bg-gradient-to-r from-primary to-secondary p-3 border-b border-accent">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faGamepad} className="text-accent text-2xl mr-3" />
              <h1 className="text-fontColor text-2xl font-bold">Game Setup</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/" className="text-accent hover:text-fontColor transition-colors">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>

              {user ? (
                <div className="flex items-center">
                  <span className="text-fontColor mr-3">
                    <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                    {user.username}
                  </span>
                  <button
                    onClick={logout}
                    className="text-accent hover:text-fontColor transition-colors"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/auth/login" className="text-accent hover:text-fontColor transition-colors">
                  <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="text-center mb-3">
            <h2 className="text-3xl font-bold text-fontColor mb-1">Let's Play Math!</h2>
            <p className="text-fontColor opacity-80">Choose your game mode and difficulty to begin</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Game Mode, Difficulty, and Settings panels */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mx-auto flex-wrap">
              <div className={`transform transition-all duration-500 ${selectedPanel === 'mode' ? 'scale-105' : 'scale-100'}`}>
                <Panel1
                  handleChange={handleChange}
                  selectedMode={gameInfo.mode}
                />
              </div>

              <div className={`transform transition-all duration-500 ${selectedPanel === 'difficulty' ? 'scale-105' : 'scale-100'}`}>
                <Panel2
                  handleChange={handleChange}
                  selectedDifficulty={gameInfo.difficulty}
                />
              </div>

              <div className={`transform transition-all duration-500 ${selectedPanel === 'settings' ? 'scale-105' : 'scale-100'}`}>
                <Panel3 handleChange={handleChange} />
              </div>
            </div>

            {/* Game Summary underneath */}
            <div className="w-full">
              <div className="bg-secondary bg-opacity-50 p-4 rounded-xl border-2 border-primary shadow-lg shadow-accent">
                <h3 className="text-lg font-bold text-fontColor mb-3 flex items-center border-b border-accent pb-2">
                  <FontAwesomeIcon icon={faBrain} className="mr-2 text-accent text-xl" />
                  Game Summary
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                    <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Mode</p>
                    <div className="text-lg font-bold text-fontColor">
                      {gameInfo.mode ? (
                        <div className="flex items-center justify-center">
                          {gameInfo.mode === 'addition' && <FontAwesomeIcon icon={faPlus} className="text-blue-400 mr-2" />}
                          {gameInfo.mode === 'subtraction' && <FontAwesomeIcon icon={faMinus} className="text-purple-400 mr-2" />}
                          {gameInfo.mode === 'multiplication' && <FontAwesomeIcon icon={faTimes} className="text-yellow-400 mr-2" />}
                          {gameInfo.mode === 'division' && <FontAwesomeIcon icon={faDivide} className="text-green-400 mr-2" />}
                          {gameInfo.mode === 'random' && <FontAwesomeIcon icon={faShuffle} className="text-pink-400 mr-2" />}
                          {gameInfo.mode === 'endless' && <FontAwesomeIcon icon={faInfinity} className="text-cyan-400 mr-2" />}
                          <span className="capitalize">{gameInfo.mode}</span>
                        </div>
                      ) : (
                        <span className="opacity-60">Not selected</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                    <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Difficulty</p>
                    <div className="text-lg font-bold text-fontColor">
                      {gameInfo.difficulty ? (
                        <div className="flex items-center justify-center">
                          {gameInfo.difficulty === 'easy' && <FontAwesomeIcon icon={faSmile} className="text-green-400 mr-2" />}
                          {gameInfo.difficulty === 'medium' && <FontAwesomeIcon icon={faMeh} className="text-yellow-400 mr-2" />}
                          {gameInfo.difficulty === 'hard' && <FontAwesomeIcon icon={faFrown} className="text-orange-400 mr-2" />}
                          {gameInfo.difficulty === 'expert' && <FontAwesomeIcon icon={faFire} className="text-amber-500 mr-2" />}
                          {gameInfo.difficulty === 'master' && <FontAwesomeIcon icon={faBolt} className="text-purple-500 mr-2" />}
                          {gameInfo.difficulty === 'insane' && <FontAwesomeIcon icon={faSkull} className="text-red-400 mr-2" />}
                          <span className="capitalize">{gameInfo.difficulty}</span>
                        </div>
                      ) : (
                        <span className="opacity-60">Not selected</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                    <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Questions</p>
                    <div className="text-lg font-bold text-fontColor">
                      {gameInfo.questions || '10'}
                    </div>
                  </div>
                </div>

                {/* Settings Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Time limit display */}
                  <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                    <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Time Limit</p>
                    <div className="text-lg font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon icon={faClock} className="text-green-400 mr-2" />
                      {gameInfo.time ? formatTime(parseInt(gameInfo.time)) : 'No Limit'}
                    </div>
                  </div>

                  {/* Sound setting */}
                  <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                    <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Sound</p>
                    <div className="text-lg font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={gameInfo.sound === 'on' ? faVolumeHigh : faVolumeMute}
                        className={`${gameInfo.sound === 'on' ? 'text-purple-400' : 'text-gray-400'} mr-2`}
                      />
                      {gameInfo.sound === 'on' ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>

                  {/* Leaderboard setting */}
                  <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                    <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Leaderboard</p>
                    <div className="text-lg font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={gameInfo.leaderboard === 'on' ? faRankingStar : faMedal}
                        className={`${gameInfo.leaderboard === 'on' ? 'text-red-400' : 'text-gray-400'} mr-2`}
                      />
                      {gameInfo.leaderboard === 'on' ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>

                {/* Additional settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Notifications setting */}
                  <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                    <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Notifications</p>
                    <div className="text-lg font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={gameInfo.notifications === 'on' ? faBell : faBellSlash}
                        className={`${gameInfo.notifications === 'on' ? 'text-yellow-400' : 'text-gray-400'} mr-2`}
                      />
                      {gameInfo.notifications === 'on' ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>

                  {/* Hints setting */}
                  <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                    <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Hints</p>
                    <div className="text-lg font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className={`${gameInfo.hints === 'on' ? 'text-amber-400' : 'text-gray-400'} mr-2`}
                      />
                      {gameInfo.hints === 'on' ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ActionButton
                    text="Start Game"
                    icon={faPlay}
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    variant="primary"
                    size="lg"
                    className="w-full md:w-1/2 lg:w-1/3"
                  />
                </div>
              </div>
            </div>
          </div>

          {isError && (
            <div className="flex items-center p-3 my-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-100 animate-fadeIn max-w-xl mx-auto">
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 text-red-300" />
              <span>{resultText}</span>
            </div>
          )}
        </div>

        <div className="bg-secondary bg-opacity-50 p-2 text-center border-t border-accent">
          <p className="text-fontColor text-xs flex items-center justify-center">
            <FontAwesomeIcon icon={faCog} className="mr-2 text-accent" />
            <span>Game settings can be customized in your profile</span>
          </p>
        </div>
      </div>
    </div>
  );
};
