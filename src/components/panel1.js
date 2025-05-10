import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faDivide, faCalculator, faShuffle, faInfinity } from '@fortawesome/free-solid-svg-icons';

export default function Panel1({ handleChange, selectedMode }) {
  return (
    <div className="flex flex-col items-center justify-center w-full md:w-64 h-full bg-tertiary bg-opacity-80 border-2 border-primary rounded-xl shadow-lg shadow-accent p-3">
      <div className="flex items-center justify-center mb-2 w-full">
        <div className="bg-accent bg-opacity-20 p-2 rounded-full mr-2">
          <FontAwesomeIcon icon={faCalculator} className="text-accent text-lg" />
        </div>
        <h3 className="text-lg font-bold text-fontColor">
          Select Mode
        </h3>
      </div>

      <div className="w-full border-t border-accent pt-2 mb-2"></div>

      <div className="space-y-2 w-full">
        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedMode === 'addition' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="addition"
            type="radio"
            name="mode"
            value="addition"
            onChange={handleChange}
            checked={selectedMode === 'addition'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="addition"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedMode === 'addition' ? 'bg-blue-400 bg-opacity-40' : 'bg-blue-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faPlus} className={`text-blue-400 ${selectedMode === 'addition' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedMode === 'addition' ? 'font-bold' : ''}`}>Addition</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedMode === 'subtraction' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="subtraction"
            type="radio"
            name="mode"
            value="subtraction"
            onChange={handleChange}
            checked={selectedMode === 'subtraction'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="subtraction"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedMode === 'subtraction' ? 'bg-purple-400 bg-opacity-40' : 'bg-purple-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faMinus} className={`text-purple-400 ${selectedMode === 'subtraction' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedMode === 'subtraction' ? 'font-bold' : ''}`}>Subtraction</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedMode === 'multiplication' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="multiplication"
            type="radio"
            name="mode"
            value="multiplication"
            onChange={handleChange}
            checked={selectedMode === 'multiplication'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="multiplication"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedMode === 'multiplication' ? 'bg-yellow-400 bg-opacity-40' : 'bg-yellow-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faTimes} className={`text-yellow-400 ${selectedMode === 'multiplication' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedMode === 'multiplication' ? 'font-bold' : ''}`}>Multiplication</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedMode === 'division' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="division"
            type="radio"
            name="mode"
            value="division"
            onChange={handleChange}
            checked={selectedMode === 'division'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="division"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedMode === 'division' ? 'bg-green-400 bg-opacity-40' : 'bg-green-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faDivide} className={`text-green-400 ${selectedMode === 'division' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedMode === 'division' ? 'font-bold' : ''}`}>Division</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedMode === 'random' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="random"
            type="radio"
            name="mode"
            value="random"
            onChange={handleChange}
            checked={selectedMode === 'random'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="random"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedMode === 'random' ? 'bg-pink-400 bg-opacity-40' : 'bg-pink-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faShuffle} className={`text-pink-400 ${selectedMode === 'random' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedMode === 'random' ? 'font-bold' : ''}`}>Random</span>
          </label>
        </div>

        <div className={`flex items-center p-2 rounded-lg transition-colors cursor-pointer border ${selectedMode === 'endless' ? 'bg-secondary bg-opacity-50 border-accent shadow-md' : 'border-transparent hover:bg-secondary hover:bg-opacity-30 hover:border-accent'}`}>
          <input
            id="endless"
            type="radio"
            name="mode"
            value="endless"
            onChange={handleChange}
            checked={selectedMode === 'endless'}
            className="w-4 h-4 accent-accent cursor-pointer"
          />
          <label
            htmlFor="endless"
            className="flex items-center text-fontColor ml-3 cursor-pointer w-full">
            <div className={`${selectedMode === 'endless' ? 'bg-cyan-400 bg-opacity-40' : 'bg-cyan-400 bg-opacity-20'} p-1.5 rounded-full mr-2 transition-all duration-300`}>
              <FontAwesomeIcon icon={faInfinity} className={`text-cyan-400 ${selectedMode === 'endless' ? 'text-lg' : ''}`} />
            </div>
            <span className={`${selectedMode === 'endless' ? 'font-bold' : ''}`}>Endless</span>
          </label>
        </div>
      </div>
    </div>
  );
};
