import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function TimeModal({ isOpen, onClose, onSave }) {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Animation effect when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSave = () => {
    const totalSeconds = (minutes * 60) + seconds;
    onSave(totalSeconds);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-primary via-secondary to-tertiary rounded-xl shadow-2xl border-y-2 border-accent p-6 w-full max-w-md transform transition-all duration-500 scale-100 opacity-100 animate-fadeIn"
      >
        <div className="flex justify-between items-center mb-4 border-b border-accent pb-3">
          <div className="flex items-center">
            <div className="bg-accent bg-opacity-20 p-2 rounded-full mr-3">
              <FontAwesomeIcon icon={faClock} className="text-accent text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-fontColor">Set Time Limit</h2>
          </div>
          <button
            onClick={onClose}
            className="text-fontColor hover:text-accent transition-colors p-1 rounded-full hover:bg-accent hover:bg-opacity-10"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-fontColor opacity-80 mb-4">
            Set the time limit for each question in the game.
          </p>

          <div className="flex items-center justify-center space-x-4 my-6">
            <div className="flex flex-col items-center">
              <label className="text-fontColor text-sm mb-2">Minutes</label>
              <input
                type="number"
                min="0"
                max="10"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                className="bg-secondary bg-opacity-50 border-2 border-accent rounded-lg p-3 w-24 text-center text-fontColor text-2xl focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="text-fontColor text-3xl font-bold">:</div>

            <div className="flex flex-col items-center">
              <label className="text-fontColor text-sm mb-2">Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                className="bg-secondary bg-opacity-50 border-2 border-accent rounded-lg p-3 w-24 text-center text-fontColor text-2xl focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-accent text-fontColor hover:bg-accent hover:bg-opacity-20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-accent text-primary hover:bg-opacity-90 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
