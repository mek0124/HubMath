import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCalculator,
  faGamepad,
  faUsers,
  faLightbulb,
  faStar,
  faRocket,
  faMobileAlt,
  faTrophy,
  faChartLine,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import AppIcon from '../assets/images/app-icon.png';

export default function WelcomeModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('about');

  // Close the modal
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  // Animation effect when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const modal = document.getElementById('welcome-modal');
      if (modal) {
        modal.classList.add('scale-100', 'opacity-100');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-sm">
      <div
        id="welcome-modal"
        className="relative w-[90%] max-w-4xl bg-gradient-to-br from-primary via-secondary to-tertiary rounded-2xl shadow-2xl overflow-hidden transform scale-95 opacity-0 transition-all duration-500 ease-in-out"
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-fontColor hover:text-white text-2xl z-10 transform transition hover:scale-110 hover:rotate-90 duration-300"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Header with logo */}
        <div className="flex items-center justify-center pt-8 pb-4 px-8 bg-gradient-to-r from-primary to-secondary">
          <img src={AppIcon} alt="Hub Math Logo" className="w-20 h-20 rounded-full mr-4 animate-pulse" />
          <div>
            <h1 className="text-4xl font-bold text-fontColor">Hub Math</h1>
            <p className="text-fontColor italic">A Math Game For Ages 3+</p>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap border-b border-accent">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 font-bold transition-all duration-300 ${activeTab === 'about' ? 'text-white bg-tertiary border-b-2 border-accent' : 'text-fontColor hover:bg-secondary'}`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-6 py-3 font-bold transition-all duration-300 ${activeTab === 'features' ? 'text-white bg-tertiary border-b-2 border-accent' : 'text-fontColor hover:bg-secondary'}`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('howto')}
            className={`px-6 py-3 font-bold transition-all duration-300 ${activeTab === 'howto' ? 'text-white bg-tertiary border-b-2 border-accent' : 'text-fontColor hover:bg-secondary'}`}
          >
            How to Play
          </button>
          <button
            onClick={() => setActiveTab('updates')}
            className={`px-6 py-3 font-bold transition-all duration-300 ${activeTab === 'updates' ? 'text-white bg-tertiary border-b-2 border-accent' : 'text-fontColor hover:bg-secondary'}`}
          >
            Future Updates
          </button>
        </div>

        {/* Content area */}
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          {activeTab === 'about' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-fontColor mb-4">Welcome to Hub Math!</h2>
              <p className="text-fontColor text-lg">
                Hub Math is an interactive educational platform designed to make learning mathematics fun and engaging for children ages 3 and up. Our game combines colorful visuals with challenging math problems to create an immersive learning experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
                  <FontAwesomeIcon icon={faLightbulb} className="text-accent text-3xl mb-4" />
                  <h3 className="text-xl font-bold text-fontColor mb-2">Learn While Playing</h3>
                  <p className="text-fontColor">Our game is designed to make learning math concepts fun and engaging through interactive gameplay.</p>
                </div>
                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
                  <FontAwesomeIcon icon={faUsers} className="text-accent text-3xl mb-4" />
                  <h3 className="text-xl font-bold text-fontColor mb-2">For All Ages</h3>
                  <p className="text-fontColor">With multiple difficulty levels, Hub Math is perfect for children and adults looking to improve their math skills.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-fontColor mb-4">Game Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
                  <FontAwesomeIcon icon={faCalculator} className="text-accent text-3xl mb-4" />
                  <h3 className="text-xl font-bold text-fontColor mb-2">Multiple Operations</h3>
                  <p className="text-fontColor">Practice addition, subtraction, multiplication, and division in one convenient app.</p>
                </div>
                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
                  <FontAwesomeIcon icon={faGamepad} className="text-accent text-3xl mb-4" />
                  <h3 className="text-xl font-bold text-fontColor mb-2">Difficulty Levels</h3>
                  <p className="text-fontColor">Choose from Easy, Medium, Hard, or Insane difficulty levels to match your skill level.</p>
                </div>
                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
                  <FontAwesomeIcon icon={faStar} className="text-accent text-3xl mb-4" />
                  <h3 className="text-xl font-bold text-fontColor mb-2">Progress Tracking</h3>
                  <p className="text-fontColor">Create an account to track your progress and see how your math skills improve over time.</p>
                </div>
                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
                  <FontAwesomeIcon icon={faUsers} className="text-accent text-3xl mb-4" />
                  <h3 className="text-xl font-bold text-fontColor mb-2">Community</h3>
                  <p className="text-fontColor">Join our Discord community to connect with other players and share tips and strategies.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'howto' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-fontColor mb-4">How to Play</h2>
              <ol className="list-decimal list-inside space-y-4 text-fontColor">
                <li className="text-lg">
                  <span className="font-bold">Create an account</span> or play as a guest by clicking "Let's Play!"
                </li>
                <li className="text-lg">
                  <span className="font-bold">Select a game mode</span> - Choose from addition, subtraction, multiplication, or division.
                </li>
                <li className="text-lg">
                  <span className="font-bold">Choose a difficulty level</span> - Select Easy, Medium, Hard, or Insane based on your skill level.
                </li>
                <li className="text-lg">
                  <span className="font-bold">Solve the equations</span> - Answer as many questions as you can correctly to earn points.
                </li>
                <li className="text-lg">
                  <span className="font-bold">Track your progress</span> - See your improvement over time and challenge yourself to beat your high score.
                </li>
              </ol>
              <div className="mt-6 p-6 bg-secondary bg-opacity-50 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-fontColor mb-2">Ready to start?</h3>
                <p className="text-fontColor">Click the "Let's Play!" button on the home page to begin your math adventure!</p>
              </div>
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-fontColor mb-4">Coming Soon to Hub Math!</h2>
              <p className="text-fontColor text-lg mb-6">
                We're constantly working to improve Hub Math and add exciting new features. Here's a sneak peek at what's coming in future updates:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 border-l-4 border-accent">
                  <div className="flex items-center mb-4">
                    <FontAwesomeIcon icon={faMobileAlt} className="text-accent text-3xl mr-4" />
                    <h3 className="text-xl font-bold text-fontColor">Mobile App</h3>
                  </div>
                  <p className="text-fontColor">Take Hub Math with you anywhere! Our mobile app for iOS and Android will be launching soon.</p>
                  <div className="mt-2 text-xs text-accent font-bold">Coming Q3 2023</div>
                </div>

                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 border-l-4 border-accent">
                  <div className="flex items-center mb-4">
                    <FontAwesomeIcon icon={faTrophy} className="text-accent text-3xl mr-4" />
                    <h3 className="text-xl font-bold text-fontColor">Competitive Mode</h3>
                  </div>
                  <p className="text-fontColor">Challenge friends or players around the world in real-time math competitions.</p>
                  <div className="mt-2 text-xs text-accent font-bold">Coming Q4 2023</div>
                </div>

                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 border-l-4 border-accent">
                  <div className="flex items-center mb-4">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-accent text-3xl mr-4" />
                    <h3 className="text-xl font-bold text-fontColor">Advanced Topics</h3>
                  </div>
                  <p className="text-fontColor">New game modes featuring algebra, geometry, and more advanced mathematical concepts.</p>
                  <div className="mt-2 text-xs text-accent font-bold">Coming Q1 2024</div>
                </div>

                <div className="bg-secondary bg-opacity-50 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 border-l-4 border-accent">
                  <div className="flex items-center mb-4">
                    <FontAwesomeIcon icon={faChartLine} className="text-accent text-3xl mr-4" />
                    <h3 className="text-xl font-bold text-fontColor">Enhanced Analytics</h3>
                  </div>
                  <p className="text-fontColor">Detailed performance tracking with visual charts and personalized improvement suggestions.</p>
                  <div className="mt-2 text-xs text-accent font-bold">Coming Q2 2024</div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-secondary to-tertiary rounded-xl shadow-lg border border-accent">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faRocket} className="text-accent text-4xl mr-4 animate-pulse" />
                  <div>
                    <h3 className="text-2xl font-bold text-fontColor mb-2">Premium Subscription</h3>
                    <p className="text-fontColor">
                      Unlock exclusive content, remove ads, and get early access to new features with our upcoming Premium subscription.
                    </p>
                    <div className="mt-2 text-sm text-accent font-bold">Launching Q3 2023</div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-fontColor italic">Have a feature suggestion? Join our Discord community and let us know!</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with action button */}
        <div className="p-6 bg-gradient-to-r from-secondary to-primary flex justify-center">
          <button
            onClick={closeModal}
            className="px-8 py-3 bg-accent text-white font-bold rounded-full transform transition duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
