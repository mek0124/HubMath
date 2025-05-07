export default function Panel2({ handleChange }) {
  return (
    <div className="flex flex-col items-center justify-evenly w-1/4 h-96 border-2 border-primary rounded-xl shadow-lg shadow-accent bg-tertiary">
      <h3 className="italic text-lg text-fontColor text-center w-full">
        Select A Game Difficulty
      </h3>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="radio"
          name="difficulty"
          value="easy"
          onClick={handleChange}

        />

        <label
          htmlFor="difficulty"
          className="italic text-mg text-FontColor text-center w-48">

          Easy
        </label>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="radio"
          name="difficulty"
          value="medium"
          onChange={handleChange}

        />

        <label
          htmlFor="difficulty"
          className="italic text-mg text-FontColor text-center w-48">

          Medium
        </label>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="radio"
          name="difficulty"
          value="hard"
          onChange={handleChange}

        />

        <label
          htmlFor="difficulty"
          className="italic text-mg text-FontColor text-center w-48">

          Hard
        </label>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="radio"
          name="difficulty"
          value="insane"
          onChange={handleChange}
        />

        <label
          htmlFor="difficulty"
          className="italic text-mg text-FontColor text-center w-48">

          Insane
        </label>
      </div>
    </div>
  );
};
