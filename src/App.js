import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import Header from './components/header';
import Landing from './pages/landing';
import SignUp from './pages/auth/signup';
import Login from './pages/auth/login';
import Forgot from "./pages/auth/forgot";
import GameMenu from "./pages/game/menu";
import GamePlay from "./pages/game/play";
import WelcomeModal from "./components/WelcomeModal";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showHelpButton, setShowHelpButton] = useState(false);

  // Show modal on initial load
  useEffect(() => {
    // Small delay to ensure the app is fully loaded
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    // Show the help button after the modal is closed
    setShowHelpButton(true);
  };

  // Handle reopening the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/auth">
          <Route path="sign-up" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot" element={<Forgot />} />
        </Route>

        <Route path="/game">
          <Route path="menu" element={<GameMenu />} />
          <Route path="play" element={<GamePlay />} />
        </Route>
      </Routes>

      {/* Welcome Modal */}
      {showModal && <WelcomeModal onClose={handleCloseModal} />}

      {/* Cute Help Button */}
      {showHelpButton && (
        <button
          onClick={handleOpenModal}
          className="fixed bottom-6 right-6 bg-transparent border-2 border-accent text-accent hover:text-white hover:bg-accent/30 rounded-full w-14 h-14 flex items-center justify-center shadow-md transform transition-all duration-300 hover:scale-110 hover:rotate-12 z-40 group animate-bounce"
          aria-label="Open information modal"
        >
          <div className="absolute -top-10 right-0 bg-primary/80 text-fontColor text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md border border-accent">
            About Hub Math
          </div>
          <FontAwesomeIcon icon={faInfoCircle} className="text-2xl" />
        </button>
      )}
    </div>
  );
};