import { Link } from 'react-router-dom';


export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <div className="flex flex-col items-center justify-center w-[50%]">
        <h1 className="font-bold text-fontColor text-4xl text-center w-full">
          Welcome To Hub Math!
        </h1>

        <h3 className="italic text-fontColor text-md text-center w-full">
          A Math Game For Ages 3+
        </h3>
      </div>

      <div className="flex flex-row items-center justify-evenly w-[79%] h-52">
        <Link to="/auth/sign-up"
          className="font-bold text-xl text-fontColor text-center border-2 border-tertiary w-80 p-1 rounded-xl transform transition duration-300 ease-in-out hover:bg-tertiary hover:shadow-lg hover:scale-105">
            New Account
        </Link>

        <Link to="/auth/login"
          className="font-bold text-xl text-fontColor text-center border-2 border-tertiary w-80 p-1 rounded-xl transform transition duration-300 ease-in-out hover:bg-tertiary hover:shadow-lg hover:scale-105">
            Login
        </Link>

        <Link to="/game/menu"
          className="font-bold text-xl text-fontColor text-center border-2 border-tertiary w-80 p-1 rounded-xl transform transition duration-300 ease-in-out hover:bg-tertiary hover:shadow-lg hover:scale-105">
            Let's Play!
        </Link>
      </div>
    </div>
  );
};
