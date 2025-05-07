export default function Panel1({ handleChange }) {
  return (
    <div className="flex flex-col items-center justify-evenly w-1/4 h-96 border-2 border-primary rounded-xl shadow-lg shadow-accent bg-tertiary">
      <h3 className="italic text-lg text-fontColor text-center w-full">
        Select A Game Mode
      </h3>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="radio"
          name="mode"
          value="addition"
          onClick={handleChange}
          className=""

        />

        <label
          htmlFor="mode"
          className="italic text-mg text-FontColor text-center w-48">

          Addition
        </label>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="radio"
          name="mode"
          value="subtraction"
          onChange={handleChange}
          className=""

        />

        <label
          htmlFor="mode"
          className="italic text-mg text-FontColor text-center w-48">

          Subtraction
        </label>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="radio"
          name="mode"
          value="multiplication"
          onChange={handleChange}
          className=""

        />

        <label
          htmlFor="mode"
          className="italic text-mg text-FontColor text-center w-48">

          Multiplication
        </label>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <input
          type="radio"
          name="mode"
          value="division"
          onChange={handleChange}
          className=""
        />

        <label
          htmlFor="mode"
          className="italic text-mg text-FontColor text-center w-48">

          Division
        </label>
      </div>
    </div>
  );
};
