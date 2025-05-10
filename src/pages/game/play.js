import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faHome,
  faCheck,
  faTimes,
  faClock,
  faHeart,
  faFire,
  faBolt,
  faVolumeHigh,
  faVolumeMute,
  faPause,
  faPlay,
  faLightbulb,
  faQuestion,
  faTrophy,
  faChartLine,
  faGaugeHigh
} from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

// Game components
import ActionButton from "../../components/ActionButton";

export default function GamePlay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  // Default game info if none is provided
  const defaultGameInfo = {
    mode: 'addition',
    difficulty: 'medium',
    questions: '10',
    time: '',
    sound: 'on',
    leaderboard: 'on',
    notifications: '',
    hints: ''
  };

  // Game state
  const [gameInfo, setGameInfo] = useState(location.state?.gameInfo || defaultGameInfo);
  const [gameState, setGameState] = useState('countdown'); // countdown, playing, paused, completed
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isMuted, setIsMuted] = useState(gameInfo.sound !== 'on');

  // Refs
  const answerInputRef = useRef(null);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  // Sound effects with error handling
  const createSafeAudio = (src) => {
    const audio = new Audio(src);
    // Add error handling to prevent uncaught errors
    audio.addEventListener('error', (e) => {
      console.warn(`Audio file ${src} could not be loaded:`, e);
    });
    return audio;
  };

  const correctSound = useRef(createSafeAudio('/sounds/correct.mp3'));
  const wrongSound = useRef(createSafeAudio('/sounds/wrong.mp3'));
  const countdownSound = useRef(createSafeAudio('/sounds/countdown.mp3'));
  const startSound = useRef(createSafeAudio('/sounds/start.mp3'));
  const completeSound = useRef(createSafeAudio('/sounds/complete.mp3'));

  // Initialize game
  useEffect(() => {
    // Start countdown
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          setGameState('playing');
          if (!isMuted) {
            try {
              startSound.current.play().catch(e => console.warn('Error playing start sound:', e));
            } catch (e) {
              console.warn('Error playing start sound:', e);
            }
          }
          generateQuestion();
          return 0;
        }
        if (!isMuted) {
          try {
            countdownSound.current.play().catch(e => console.warn('Error playing countdown sound:', e));
          } catch (e) {
            console.warn('Error playing countdown sound:', e);
          }
        }
        return prev - 1;
      });
    }, 1000);

    // Set time limit if timed mode is enabled
    if (gameInfo.time) {
      setTimeLeft(parseInt(gameInfo.time));
    }

    return () => {
      clearInterval(countdownRef.current);
      clearInterval(timerRef.current);
    };
  }, [gameInfo.time, isMuted]);

  // Timer for timed mode
  useEffect(() => {
    if (gameState === 'playing' && gameInfo.time && timeLeft !== null) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleGameOver();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [gameState, gameInfo.time, timeLeft]);

  // Focus on input when question changes
  useEffect(() => {
    if (gameState === 'playing' && answerInputRef.current) {
      answerInputRef.current.focus();
    }
  }, [currentQuestion, gameState, answerInputRef]);

  // Handle game completion
  const handleGameComplete = useCallback(() => {
    clearInterval(timerRef.current);
    setGameState('completed');
    if (!isMuted) {
      try {
        completeSound.current.play().catch(e => console.warn('Error playing complete sound:', e));
      } catch (e) {
        console.warn('Error playing complete sound:', e);
      }
    }
    setShowConfetti(true);
  }, [isMuted, completeSound, timerRef]);

  // Handle game over
  const handleGameOver = useCallback(() => {
    clearInterval(timerRef.current);
    setGameState('gameover');
  }, [timerRef]);

  // Generate a new math question based on the selected mode
  const generateQuestion = () => {
    let num1, num2, operation, answer, question;

    // Determine operation based on mode
    if (gameInfo.mode === 'random') {
      const operations = ['addition', 'subtraction', 'multiplication', 'division'];
      operation = operations[Math.floor(Math.random() * operations.length)];
    } else {
      operation = gameInfo.mode;
    }

    // Generate numbers based on difficulty
    const difficultyFactors = {
      easy: { max: 10, min: 1 },
      medium: { max: 20, min: 5 },
      hard: { max: 50, min: 10 },
      expert: { max: 100, min: 20 },
      master: { max: 200, min: 50 },
      insane: { max: 500, min: 100 }
    };

    const factor = difficultyFactors[gameInfo.difficulty] || difficultyFactors.medium;

    switch (operation) {
      case 'addition':
        num1 = Math.floor(Math.random() * factor.max) + factor.min;
        num2 = Math.floor(Math.random() * factor.max) + factor.min;
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;

      case 'subtraction':
        num1 = Math.floor(Math.random() * factor.max) + factor.min + factor.max;
        num2 = Math.floor(Math.random() * factor.max) + factor.min;
        if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
        answer = num1 - num2;
        question = `${num1} - ${num2} = ?`;
        break;

      case 'multiplication':
        num1 = Math.floor(Math.random() * (factor.max / 5)) + Math.max(1, factor.min / 5);
        num2 = Math.floor(Math.random() * (factor.max / 5)) + Math.max(1, factor.min / 5);
        answer = num1 * num2;
        question = `${num1} × ${num2} = ?`;
        break;

      case 'division':
        num2 = Math.floor(Math.random() * (factor.max / 10)) + Math.max(1, factor.min / 10);
        answer = Math.floor(Math.random() * (factor.max / 5)) + Math.max(1, factor.min / 5);
        num1 = num2 * answer; // Ensure clean division
        question = `${num1} ÷ ${num2} = ?`;
        break;

      default:
        num1 = Math.floor(Math.random() * factor.max) + factor.min;
        num2 = Math.floor(Math.random() * factor.max) + factor.min;
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
    }

    setCurrentQuestion({ question, answer, operation });
    setUserAnswer('');
    setShowHint(false);
  };

  // Handle user answer submission
  const handleSubmit = useCallback((e) => {
    e && e.preventDefault();

    if (gameState !== 'playing') return;

    const userAnswerNum = parseInt(userAnswer);
    const isCorrect = userAnswerNum === currentQuestion?.answer;

    if (isCorrect) {
      // Play sound effect
      if (!isMuted) {
        try {
          correctSound.current.play().catch(e => console.warn('Error playing correct sound:', e));
        } catch (e) {
          console.warn('Error playing correct sound:', e);
        }
      }

      // Update score and streak
      setScore(prev => prev + (10 * (streak + 1)));
      setStreak(prev => prev + 1);

      // Show confetti for correct answers
      if (streak >= 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }

      // Check if game is completed
      if (gameInfo.mode !== 'endless' && questionNumber >= parseInt(gameInfo.questions)) {
        handleGameComplete();
        return;
      }

      // Generate next question
      setQuestionNumber(prev => prev + 1);
      generateQuestion();
    } else {
      // Play sound effect
      if (!isMuted) {
        try {
          wrongSound.current.play().catch(e => console.warn('Error playing wrong sound:', e));
        } catch (e) {
          console.warn('Error playing wrong sound:', e);
        }
      }

      // Reduce lives and reset streak
      setLives(prev => prev - 1);
      setStreak(0);

      // Check if game over
      if (lives <= 1) {
        handleGameOver();
        return;
      }

      setUserAnswer('');
    }
  }, [
    gameState,
    userAnswer,
    currentQuestion,
    isMuted,
    correctSound,
    wrongSound,
    streak,
    gameInfo.mode,
    gameInfo.questions,
    questionNumber,
    lives,
    handleGameComplete,
    handleGameOver
  ]);



  // Format time in seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle sound
  const toggleSound = () => {
    setIsMuted(prev => !prev);
  };

  // Toggle pause
  const togglePause = useCallback(() => {
    if (gameState === 'playing') {
      clearInterval(timerRef.current);
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
      if (gameInfo.time && timeLeft > 0) {
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              handleGameOver();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  }, [gameState, gameInfo.time, timeLeft, timerRef, handleGameOver]);

  // Show hint
  const toggleHint = () => {
    if (gameInfo.hints === 'on') {
      setShowHint(prev => !prev);
    }
  };

  // Restart game
  const restartGame = useCallback(() => {
    setGameState('countdown');
    setCountdown(3);
    setScore(0);
    setLives(3);
    setStreak(0);
    setQuestionNumber(1);
    setShowConfetti(false);
    setShowHint(false);

    if (gameInfo.time) {
      setTimeLeft(parseInt(gameInfo.time));
    }

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          setGameState('playing');
          if (!isMuted) {
            try {
              startSound.current.play().catch(e => console.warn('Error playing start sound:', e));
            } catch (e) {
              console.warn('Error playing start sound:', e);
            }
          }
          generateQuestion();
          return 0;
        }
        if (!isMuted) {
          try {
            countdownSound.current.play().catch(e => console.warn('Error playing countdown sound:', e));
          } catch (e) {
            console.warn('Error playing countdown sound:', e);
          }
        }
        return prev - 1;
      });
    }, 1000);
  }, [gameInfo.time, isMuted, startSound, countdownSound, countdownRef]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-2 overflow-hidden">
      {/* Confetti effect for correct answers and game completion */}
      {showConfetti && <Confetti width={width} height={height} recycle={gameState === 'completed'} />}

      <div className="w-full max-w-7xl bg-gradient-to-br from-primary via-secondary to-tertiary rounded-2xl shadow-2xl overflow-hidden mx-4 relative">
        {/* Game header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-3 border-b border-accent">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/game/menu" className="text-accent hover:text-fontColor transition-colors mr-4">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back
              </Link>
              <h1 className="text-fontColor text-2xl font-bold">Math Challenge</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSound}
                className="text-accent hover:text-fontColor transition-colors"
              >
                <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeHigh} className="mr-2" />
                {isMuted ? 'Unmute' : 'Mute'}
              </button>

              {gameState === 'playing' && (
                <button
                  onClick={togglePause}
                  className="text-accent hover:text-fontColor transition-colors"
                >
                  <FontAwesomeIcon icon={faPause} className="mr-2" />
                  Pause
                </button>
              )}

              {gameState === 'paused' && (
                <button
                  onClick={togglePause}
                  className="text-accent hover:text-fontColor transition-colors"
                >
                  <FontAwesomeIcon icon={faPlay} className="mr-2" />
                  Resume
                </button>
              )}

              <Link to="/" className="text-accent hover:text-fontColor transition-colors">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </Link>
            </div>
          </div>
        </div>

        {/* Game content */}
        <div className="p-4">
          {/* Game stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
              <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Score</p>
              <div className="text-2xl font-bold text-fontColor flex items-center justify-center">
                <FontAwesomeIcon icon={faTrophy} className="text-yellow-400 mr-2" />
                {score}
              </div>
            </div>

            <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
              <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Lives</p>
              <div className="text-2xl font-bold text-fontColor flex items-center justify-center">
                <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-2" />
                {lives}
              </div>
            </div>

            <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
              <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Streak</p>
              <div className="text-2xl font-bold text-fontColor flex items-center justify-center">
                <FontAwesomeIcon icon={faFire} className="text-orange-500 mr-2" />
                {streak}
              </div>
            </div>

            {gameInfo.time && (
              <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Time</p>
                <div className="text-2xl font-bold text-fontColor flex items-center justify-center">
                  <FontAwesomeIcon icon={faClock} className="text-green-400 mr-2" />
                  {formatTime(timeLeft)}
                </div>
              </div>
            )}

            {!gameInfo.time && (
              <div className="bg-tertiary bg-opacity-70 p-3 rounded-lg text-center border border-primary shadow-md">
                <p className="text-fontColor text-xs font-bold mb-1 uppercase tracking-wider">Question</p>
                <div className="text-2xl font-bold text-fontColor flex items-center justify-center">
                  <FontAwesomeIcon icon={faQuestion} className="text-blue-400 mr-2" />
                  {questionNumber}/{gameInfo.mode === 'endless' ? '∞' : gameInfo.questions}
                </div>
              </div>
            )}
          </div>

          {/* Countdown screen */}
          {gameState === 'countdown' && (
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-4xl font-bold text-fontColor mb-8">Get Ready!</h2>
              <div className="text-9xl font-bold text-accent animate-pulse">
                {countdown}
              </div>
              <p className="text-fontColor text-xl mt-8">
                {gameInfo.mode === 'random' ? 'Random Operations' : `${gameInfo.mode.charAt(0).toUpperCase() + gameInfo.mode.slice(1)} Problems`}
              </p>
              <p className="text-fontColor text-xl">
                Difficulty: {gameInfo.difficulty.charAt(0).toUpperCase() + gameInfo.difficulty.slice(1)}
              </p>
            </div>
          )}

          {/* Playing screen */}
          {(gameState === 'playing' || gameState === 'paused') && currentQuestion && (
            <div className="flex flex-col items-center justify-center">
              {/* Question card */}
              <div className={`bg-tertiary bg-opacity-80 p-8 rounded-xl border-2 border-accent shadow-lg w-full max-w-2xl mx-auto mb-8 transform transition-all duration-300 ${gameState === 'paused' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                <h2 className="text-4xl md:text-6xl font-bold text-fontColor text-center mb-8">
                  {currentQuestion.question}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                  <input
                    ref={answerInputRef}
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={gameState === 'paused'}
                    className="bg-secondary bg-opacity-50 border-2 border-accent rounded-lg p-4 w-full max-w-md text-center text-fontColor text-3xl focus:outline-none focus:ring-2 focus:ring-accent mb-6"
                    placeholder="Enter your answer"
                  />

                  <div className="flex space-x-4">
                    <ActionButton
                      text="Submit"
                      icon={faCheck}
                      onClick={handleSubmit}
                      disabled={gameState === 'paused' || !userAnswer}
                      variant="primary"
                      size="lg"
                    />

                    {gameInfo.hints === 'on' && (
                      <button
                        type="button"
                        onClick={toggleHint}
                        disabled={gameState === 'paused'}
                        className="px-6 py-3 rounded-lg bg-amber-500 text-primary hover:bg-opacity-90 transition-colors flex items-center"
                      >
                        <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                        Hint
                      </button>
                    )}
                  </div>
                </form>

                {/* Hint display */}
                {showHint && (
                  <div className="mt-6 p-4 bg-amber-500 bg-opacity-20 border border-amber-500 rounded-lg text-amber-100 animate-fadeIn">
                    <p className="text-center">
                      {currentQuestion.operation === 'addition' && 'Try adding the numbers digit by digit.'}
                      {currentQuestion.operation === 'subtraction' && 'Remember to borrow if needed.'}
                      {currentQuestion.operation === 'multiplication' && 'You can break this down into smaller multiplications.'}
                      {currentQuestion.operation === 'division' && 'Think of this as how many times the divisor goes into the dividend.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Pause overlay */}
              {gameState === 'paused' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                  <div className="bg-tertiary bg-opacity-90 p-8 rounded-xl border-2 border-accent shadow-lg text-center">
                    <h2 className="text-4xl font-bold text-fontColor mb-6">Game Paused</h2>
                    <p className="text-fontColor text-xl mb-8">Take a breath and continue when you're ready!</p>
                    <ActionButton
                      text="Resume"
                      icon={faPlay}
                      onClick={togglePause}
                      variant="primary"
                      size="lg"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Game completed screen */}
          {gameState === 'completed' && (
            <div className="flex flex-col items-center justify-center py-10">
              <h2 className="text-5xl font-bold text-fontColor mb-8 animate-bounce">Congratulations!</h2>

              <div className="bg-tertiary bg-opacity-80 p-8 rounded-xl border-2 border-accent shadow-lg w-full max-w-2xl mx-auto mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-secondary bg-opacity-50 p-4 rounded-lg text-center">
                    <p className="text-fontColor text-sm mb-1 uppercase tracking-wider">Final Score</p>
                    <div className="text-4xl font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon icon={faTrophy} className="text-yellow-400 mr-2" />
                      {score}
                    </div>
                  </div>

                  <div className="bg-secondary bg-opacity-50 p-4 rounded-lg text-center">
                    <p className="text-fontColor text-sm mb-1 uppercase tracking-wider">Highest Streak</p>
                    <div className="text-4xl font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon icon={faFire} className="text-orange-500 mr-2" />
                      {streak}
                    </div>
                  </div>

                  <div className="bg-secondary bg-opacity-50 p-4 rounded-lg text-center">
                    <p className="text-fontColor text-sm mb-1 uppercase tracking-wider">Questions</p>
                    <div className="text-4xl font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon icon={faQuestion} className="text-blue-400 mr-2" />
                      {questionNumber - 1}/{gameInfo.questions}
                    </div>
                  </div>

                  <div className="bg-secondary bg-opacity-50 p-4 rounded-lg text-center">
                    <p className="text-fontColor text-sm mb-1 uppercase tracking-wider">Difficulty</p>
                    <div className="text-4xl font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon icon={faGaugeHigh} className="text-accent mr-2" />
                      {gameInfo.difficulty.charAt(0).toUpperCase() + gameInfo.difficulty.slice(1)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                  <ActionButton
                    text="Play Again"
                    icon={faPlay}
                    onClick={restartGame}
                    variant="primary"
                    size="lg"
                  />

                  <Link to="/game/menu">
                    <button className="w-full px-6 py-3 rounded-lg border border-accent text-fontColor hover:bg-accent hover:bg-opacity-20 transition-colors flex items-center justify-center">
                      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                      Back to Menu
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Game over screen */}
          {gameState === 'gameover' && (
            <div className="flex flex-col items-center justify-center py-10">
              <h2 className="text-5xl font-bold text-red-500 mb-8">Game Over!</h2>

              <div className="bg-tertiary bg-opacity-80 p-8 rounded-xl border-2 border-accent shadow-lg w-full max-w-2xl mx-auto mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-secondary bg-opacity-50 p-4 rounded-lg text-center">
                    <p className="text-fontColor text-sm mb-1 uppercase tracking-wider">Final Score</p>
                    <div className="text-4xl font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon icon={faTrophy} className="text-yellow-400 mr-2" />
                      {score}
                    </div>
                  </div>

                  <div className="bg-secondary bg-opacity-50 p-4 rounded-lg text-center">
                    <p className="text-fontColor text-sm mb-1 uppercase tracking-wider">Questions Answered</p>
                    <div className="text-4xl font-bold text-fontColor flex items-center justify-center">
                      <FontAwesomeIcon icon={faQuestion} className="text-blue-400 mr-2" />
                      {questionNumber - 1}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
                  <ActionButton
                    text="Try Again"
                    icon={faPlay}
                    onClick={restartGame}
                    variant="primary"
                    size="lg"
                  />

                  <Link to="/game/menu">
                    <button className="w-full px-6 py-3 rounded-lg border border-accent text-fontColor hover:bg-accent hover:bg-opacity-20 transition-colors flex items-center justify-center">
                      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                      Back to Menu
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
