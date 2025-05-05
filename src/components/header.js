import AppIcon from '../assets/images/app-icon.png';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <div className="flex flex-row items-center justify-center w-full flex-shrink-0 border-b-2 border-b-tertiary">
      <div className="flex flex-row items-center justify-center w-auto">
        <img
          src={AppIcon}
          width="80"
          height="80"
          alt="Hub Math Icon"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col items-start justify-center w-full">
        <h1 className="font-bold text-3xl text-fontColor">
          Hub Math
        </h1>

        <h3 className="text-xs text-fontColor">
          We Just Do Math :P
        </h3>
      </div>
<Link to="/auth/signup">Sign Up</Link>
    </div>
  );
};