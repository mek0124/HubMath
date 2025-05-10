import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faQuestionCircle,
  faClock,
  faVolumeHigh,
  faVolumeMute,
  faBell,
  faBellSlash,
  faMedal,
  faRankingStar
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import TimeModal from './TimeModal';

export default function Panel3({ handleChange }) {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [settings, setSettings] = useState({
    questions: '10',
    timed: false,
    sound: true,
    notifications: false,
    leaderboard: true,
    hints: false
  });
  return (
    <div className="flex flex-col items-center justify-center w-full md:w-64 h-full bg-tertiary bg-opacity-80 border-2 border-primary rounded-xl shadow-lg shadow-accent p-3">
      <div className="flex items-center justify-center mb-2 w-full">
        <div className="bg-accent bg-opacity-20 p-2 rounded-full mr-2">
          <FontAwesomeIcon icon={faGear} className="text-accent text-lg" />
        </div>
        <h3 className="text-lg font-bold text-fontColor">
          Game Settings
        </h3>
      </div>

      <div className="w-full border-t border-accent pt-2 mb-2"></div>

      <div className="space-y-2 w-full">
        {/* Questions selector */}
        <div className="flex items-center justify-between p-2 hover:bg-secondary hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-accent">
          <div className="flex items-center">
            <div className="bg-blue-400 bg-opacity-20 p-1.5 rounded-full mr-2">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-blue-400" />
            </div>
            <span className="text-fontColor">Questions</span>
          </div>
          <select
            name="questions"
            value={settings.questions}
            onChange={(e) => {
              setSettings({...settings, questions: e.target.value});
              handleChange(e);
            }}
            className="bg-secondary bg-opacity-50 text-fontColor rounded p-1 border border-accent"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

        {/* Timed Mode toggle */}
        <div
          className="flex items-center justify-between p-2 hover:bg-secondary hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-accent"
          onClick={() => {
            // If turning on timed mode, open the modal
            if (!settings.timed) {
              setIsTimeModalOpen(true);
            } else {
              // If turning off, just update the state
              const newSettings = {...settings, timed: false};
              setSettings(newSettings);
              handleChange({
                target: {
                  name: 'time',
                  value: ''
                }
              });
            }
          }}
        >
          <div className="flex items-center">
            <div className="bg-green-400 bg-opacity-20 p-1.5 rounded-full mr-2">
              <FontAwesomeIcon icon={faClock} className="text-green-400" />
            </div>
            <span className="text-fontColor">Timed Mode</span>
          </div>
          <div className={`w-10 h-5 rounded-full relative ${settings.timed ? 'bg-green-500' : 'bg-gray-400'}`}>
            <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all ${settings.timed ? 'right-0.5' : 'left-0.5'}`}></div>
          </div>
        </div>

        {/* Sound toggle */}
        <div
          className="flex items-center justify-between p-2 hover:bg-secondary hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-accent"
          onClick={() => {
            const newSettings = {...settings, sound: !settings.sound};
            setSettings(newSettings);
            handleChange({
              target: {
                name: 'sound',
                value: newSettings.sound ? 'on' : 'off'
              }
            });
          }}
        >
          <div className="flex items-center">
            <div className="bg-purple-400 bg-opacity-20 p-1.5 rounded-full mr-2">
              <FontAwesomeIcon icon={settings.sound ? faVolumeHigh : faVolumeMute} className="text-purple-400" />
            </div>
            <span className="text-fontColor">Sound</span>
          </div>
          <div className={`w-10 h-5 rounded-full relative ${settings.sound ? 'bg-green-500' : 'bg-gray-400'}`}>
            <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all ${settings.sound ? 'right-0.5' : 'left-0.5'}`}></div>
          </div>
        </div>

        {/* Notifications toggle */}
        <div
          className="flex items-center justify-between p-2 hover:bg-secondary hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-accent"
          onClick={() => {
            const newSettings = {...settings, notifications: !settings.notifications};
            setSettings(newSettings);
            handleChange({
              target: {
                name: 'notifications',
                value: newSettings.notifications ? 'on' : 'off'
              }
            });
          }}
        >
          <div className="flex items-center">
            <div className="bg-yellow-400 bg-opacity-20 p-1.5 rounded-full mr-2">
              <FontAwesomeIcon icon={settings.notifications ? faBell : faBellSlash} className="text-yellow-400" />
            </div>
            <span className="text-fontColor">Notifications</span>
          </div>
          <div className={`w-10 h-5 rounded-full relative ${settings.notifications ? 'bg-green-500' : 'bg-gray-400'}`}>
            <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all ${settings.notifications ? 'right-0.5' : 'left-0.5'}`}></div>
          </div>
        </div>

        {/* Leaderboard toggle */}
        <div
          className="flex items-center justify-between p-2 hover:bg-secondary hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-accent"
          onClick={() => {
            const newSettings = {...settings, leaderboard: !settings.leaderboard};
            setSettings(newSettings);
            handleChange({
              target: {
                name: 'leaderboard',
                value: newSettings.leaderboard ? 'on' : 'off'
              }
            });
          }}
        >
          <div className="flex items-center">
            <div className="bg-red-400 bg-opacity-20 p-1.5 rounded-full mr-2">
              <FontAwesomeIcon icon={settings.leaderboard ? faRankingStar : faMedal} className="text-red-400" />
            </div>
            <span className="text-fontColor">Leaderboard</span>
          </div>
          <div className={`w-10 h-5 rounded-full relative ${settings.leaderboard ? 'bg-green-500' : 'bg-gray-400'}`}>
            <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all ${settings.leaderboard ? 'right-0.5' : 'left-0.5'}`}></div>
          </div>
        </div>

        {/* Add a 6th option - Hints toggle */}
        <div
          className="flex items-center justify-between p-2 hover:bg-secondary hover:bg-opacity-30 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-accent"
          onClick={() => {
            const newSettings = {...settings, hints: !settings.hints};
            setSettings({...settings, hints: !settings.hints});
            handleChange({
              target: {
                name: 'hints',
                value: newSettings.hints ? 'on' : 'off'
              }
            });
          }}
        >
          <div className="flex items-center">
            <div className="bg-amber-400 bg-opacity-20 p-1.5 rounded-full mr-2">
              <FontAwesomeIcon icon={faQuestionCircle} className="text-amber-400" />
            </div>
            <span className="text-fontColor">Show Hints</span>
          </div>
          <div className={`w-10 h-5 rounded-full relative ${settings.hints ? 'bg-green-500' : 'bg-gray-400'}`}>
            <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all ${settings.hints ? 'right-0.5' : 'left-0.5'}`}></div>
          </div>
        </div>
      </div>

      {/* Time Modal */}
      <TimeModal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        onSave={(timeInSeconds) => {
          const newSettings = {...settings, timed: true};
          setSettings(newSettings);
          handleChange({
            target: {
              name: 'time',
              value: `${timeInSeconds}`
            }
          });
        }}
      />
    </div>
  );
};
