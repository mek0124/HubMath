import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown, faSkull, faGaugeHigh, faFire, faBolt } from '@fortawesome/free-solid-svg-icons';

export default function Panel2({ handleChange, selectedDifficulty }) {
  return (
    <div className="flex flex-col items-center justify-center w-full md:w-64 h-full bg-tertiary bg-opacity-80 border-2 border-primary rounded-xl shadow-lg shadow-accent p-3">
      <div className="flex items-center justify-center mb-2 w-full">
        <div className="bg-accent bg-opacity-20 p-2 rounded-full mr-2">
          <FontAwesomeIcon icon={faGaugeHigh} className="text-accent text-lg" />
        </div>
        <h3 className="text-lg font-bold text-fontColor">
          Select Level
        </h3>
      </div>

      <div className="w-full border-t border-accent pt-2 mb-2"></div>

      <div className="space-y-2 w-full">
        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedDifficulty === 'easy' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="easy"
            type="radio"
            name="difficulty"
            value="easy"
            onChange={handleChange}
            checked={selectedDifficulty === 'easy'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="easy"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedDifficulty === 'easy' ? 'bg-green-400 bg-opacity-40' : 'bg-green-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faSmile} className={`text-green-400 ${selectedDifficulty === 'easy' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedDifficulty === 'easy' ? 'font-bold' : ''}`}>Easy</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedDifficulty === 'medium' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="medium"
            type="radio"
            name="difficulty"
            value="medium"
            onChange={handleChange}
            checked={selectedDifficulty === 'medium'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="medium"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedDifficulty === 'medium' ? 'bg-yellow-400 bg-opacity-40' : 'bg-yellow-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faMeh} className={`text-yellow-400 ${selectedDifficulty === 'medium' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedDifficulty === 'medium' ? 'font-bold' : ''}`}>Medium</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedDifficulty === 'hard' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="hard"
            type="radio"
            name="difficulty"
            value="hard"
            onChange={handleChange}
            checked={selectedDifficulty === 'hard'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="hard"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedDifficulty === 'hard' ? 'bg-orange-400 bg-opacity-40' : 'bg-orange-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faFrown} className={`text-orange-400 ${selectedDifficulty === 'hard' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedDifficulty === 'hard' ? 'font-bold' : ''}`}>Hard</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedDifficulty === 'expert' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="expert"
            type="radio"
            name="difficulty"
            value="expert"
            onChange={handleChange}
            checked={selectedDifficulty === 'expert'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="expert"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedDifficulty === 'expert' ? 'bg-amber-500 bg-opacity-40' : 'bg-amber-500 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faFire} className={`text-amber-500 ${selectedDifficulty === 'expert' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedDifficulty === 'expert' ? 'font-bold' : ''}`}>Expert</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedDifficulty === 'master' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="master"
            type="radio"
            name="difficulty"
            value="master"
            onChange={handleChange}
            checked={selectedDifficulty === 'master'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="master"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedDifficulty === 'master' ? 'bg-purple-500 bg-opacity-40' : 'bg-purple-500 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faBolt} className={`text-purple-500 ${selectedDifficulty === 'master' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedDifficulty === 'master' ? 'font-bold' : ''}`}>Master</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedDifficulty === 'insane' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="insane"
            type="radio"
            name="difficulty"
            value="insane"
            onChange={handleChange}
            checked={selectedDifficulty === 'insane'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="insane"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedDifficulty === 'insane' ? 'bg-red-400 bg-opacity-40' : 'bg-red-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faSkull} className={`text-red-400 ${selectedDifficulty === 'insane' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedDifficulty === 'insane' ? 'font-bold' : ''}`}>Insane</span>
          </label>
        </div>
      </div>
    </div>
  );
};
